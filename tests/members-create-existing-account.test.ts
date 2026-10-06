/**
 * createMember must never take over an account that already exists.
 *
 * Until 2026-10-06 it did: given the email of an existing org-less account (a
 * self-serve student), it SET A NEW PASSWORD on that account and made it staff.
 * Any institute admin could type any student's email, choose a password and sign
 * in as them. Refusing the password write alone is not enough on the org-admin
 * path: an admin who can attach an existing account as a teacher can then use
 * resetMemberPassword (allowed for any member of their org) and get the same
 * takeover. So the org-admin path REFUSES existing accounts outright.
 *
 * The superadmin console keeps a way to promote an existing account (institute
 * staff often sign up as students before onboarding) via linkExistingAccount,
 * which adds the membership and leaves the password alone.
 *
 * The checks sign in with the ORIGINAL password: "the password is unchanged" is
 * only proven by a sign-in that still works, not by the absence of an error.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { createMember } from "@/lib/members/admin";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const ORIGINAL_PW = "student-own-pw-1234";
const ATTACKER_PW = "admin-chosen-pw-5678";
const RUN_ID = randomUUID().slice(0, 8);
const STUDENT_EMAIL = `mc-student-${RUN_ID}@test.local`;
const STAFF_EMAIL = `mc-staff-${RUN_ID}@test.local`;
const OTHER_ORG_EMAIL = `mc-other-${RUN_ID}@test.local`;
const NEW_EMAIL = `mc-new-${RUN_ID}@test.local`;

describe.skipIf(!HAS_ENV)("createMember never takes over an existing account", () => {
  let admin: SupabaseClient;
  let orgId: string;
  let otherOrgId: string;
  const userIds: string[] = [];

  async function canSignIn(email: string, password: string): Promise<boolean> {
    const c = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );
    const { error } = await c.auth.signInWithPassword({ email, password });
    return !error;
  }

  async function membershipOf(userId: string) {
    const { data } = await admin
      .from("org_members")
      .select("org_id, role")
      .eq("user_id", userId)
      .maybeSingle<{ org_id: string; role: string }>();
    return data;
  }

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
    const mkUser = async (email: string) => {
      const { data, error } = await admin.auth.admin.createUser({
        email,
        password: ORIGINAL_PW,
        email_confirm: true,
      });
      if (error || !data.user) throw new Error(`fixture user ${email}: ${error?.message}`);
      userIds.push(data.user.id);
      return data.user.id;
    };
    await mkUser(STUDENT_EMAIL);
    await mkUser(STAFF_EMAIL);
    const otherUserId = await mkUser(OTHER_ORG_EMAIL);

    const { data: org } = await admin
      .from("organizations")
      .insert({ name: `MemberCreate Org ${RUN_ID}` })
      .select("id")
      .single();
    orgId = org!.id;
    const { data: other } = await admin
      .from("organizations")
      .insert({ name: `MemberCreate Other ${RUN_ID}` })
      .select("id")
      .single();
    otherOrgId = other!.id;
    await admin
      .from("org_members")
      .insert({ user_id: otherUserId, org_id: otherOrgId, role: "TEACHER" });
  });

  afterAll(async () => {
    for (const id of [orgId, otherOrgId]) {
      if (id) await admin.from("organizations").delete().eq("id", id);
    }
    const { data } = await admin.auth.admin.listUsers({ perPage: 1000 });
    const created = (data?.users ?? []).find((u) => u.email === NEW_EMAIL);
    if (created) userIds.push(created.id);
    for (const id of userIds) await admin.auth.admin.deleteUser(id);
  });

  it("creates a brand-new account and its membership", async () => {
    const res = await createMember(orgId, {
      email: NEW_EMAIL,
      password: ORIGINAL_PW,
      name: "New Teacher",
      role: "TEACHER",
    });
    expect(res.kind).toBe("ok");
    if (res.kind !== "ok") return;
    expect(res.linked).toBe(false);
    expect((await membershipOf(res.userId))?.org_id).toBe(orgId);
    expect(await canSignIn(NEW_EMAIL, ORIGINAL_PW)).toBe(true);
  });

  it("org-admin path REFUSES an existing student account and changes nothing", async () => {
    const res = await createMember(orgId, {
      email: STUDENT_EMAIL.toUpperCase(),
      password: ATTACKER_PW,
      name: "Hijack",
      role: "TEACHER",
    });
    expect(res.kind).toBe("email_has_account");

    const studentId = userIds[0];
    expect(await membershipOf(studentId)).toBeNull();
    expect(await canSignIn(STUDENT_EMAIL, ATTACKER_PW)).toBe(false);
    expect(await canSignIn(STUDENT_EMAIL, ORIGINAL_PW)).toBe(true);
  });

  it("superadmin link adds the membership and LEAVES THE PASSWORD ALONE", async () => {
    const res = await createMember(
      orgId,
      { email: STAFF_EMAIL, password: ATTACKER_PW, name: "Linked", role: "ADMIN" },
      { linkExistingAccount: true }
    );
    expect(res.kind).toBe("ok");
    if (res.kind !== "ok") return;
    expect(res.linked).toBe(true);
    expect(res.userId).toBe(userIds[1]);
    expect((await membershipOf(res.userId))?.role).toBe("ADMIN");
    expect(await canSignIn(STAFF_EMAIL, ATTACKER_PW)).toBe(false);
    expect(await canSignIn(STAFF_EMAIL, ORIGINAL_PW)).toBe(true);
  });

  it("a member of ANOTHER org is refused on both paths", async () => {
    for (const opts of [undefined, { linkExistingAccount: true }]) {
      const res = await createMember(
        orgId,
        { email: OTHER_ORG_EMAIL, password: ATTACKER_PW, name: "X", role: "TEACHER" },
        opts
      );
      expect(res.kind).toBe("email_taken_other_org");
    }
    expect(await canSignIn(OTHER_ORG_EMAIL, ORIGINAL_PW)).toBe(true);
  });
});
