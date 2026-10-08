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
 * "Unchanged" is proven by reading the account, not by signing in
 * (2026-10-08): the account's `updated_at` must be exactly what it was before,
 * which moves on a password write and on any other write (accountUpdatedAt).
 * The tests used to sign in with the old and new passwords; in a full run that
 * tripped Supabase's sign-in rate limit, the wait outran the test timeout, and
 * the retry failed on "already_member", naming nothing near the cause. Each
 * test also clears what an earlier attempt left, so a retry reports the real
 * error.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { createMember } from "@/lib/members/admin";
import { accountUpdatedAt } from "./helpers/fixture";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const ORIGINAL_PW = "student-own-pw-1234";
// Never written by the code under test; the "unchanged" checks prove it.
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
  /** Each fixture account's `updated_at` before any test ran. */
  const before = new Map<string, string>();

  async function untouched(userId: string): Promise<boolean> {
    return (await accountUpdatedAt(admin, userId)) === before.get(userId);
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
    for (const id of userIds) before.set(id, await accountUpdatedAt(admin, id));
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
    // A retry must start clean: an earlier attempt may have created it.
    const { data: listed } = await admin.auth.admin.listUsers({ perPage: 1000 });
    const leftover = (listed?.users ?? []).find((u) => u.email === NEW_EMAIL);
    if (leftover) await admin.auth.admin.deleteUser(leftover.id);

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
    const { data: made } = await admin.auth.admin.getUserById(res.userId);
    expect(made.user?.email).toBe(NEW_EMAIL);
    expect(made.user?.email_confirmed_at).toBeTruthy();
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
    expect(await untouched(studentId)).toBe(true);
  });

  it("superadmin link adds the membership and LEAVES THE PASSWORD ALONE", async () => {
    // A retry must start clean: an earlier attempt may have linked it already.
    await admin.from("org_members").delete().eq("org_id", orgId).eq("user_id", userIds[1]);

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
    expect(await untouched(res.userId)).toBe(true);
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
    expect(await untouched(userIds[2])).toBe(true);
  });
});
