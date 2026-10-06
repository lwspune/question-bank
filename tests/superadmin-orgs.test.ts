/**
 * Superadmin organisation management: rename, delete, the deletion_protected
 * trigger (migration 0135), the per-org detail read, and promoting a member.
 *
 * Every org here is a throwaway fixture. The protection is proven on a fixture
 * flagged protected, never by pointing a delete at the seeded LWS Pune: if the
 * trigger were missing, that test would cascade the whole seeded bank away.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { deleteOrg, getOrgDetail, renameOrg } from "@/lib/superadmin/admin";
import { updateMemberRole } from "@/lib/members/admin";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
const PASSWORD = "superadmin-orgs-pw-1234";

describe.skipIf(!HAS_ENV)("superadmin organisation management", () => {
  let admin: SupabaseClient;
  const orgIds: string[] = [];
  const userIds: string[] = [];
  let subjectId: string | null = null;

  async function mkOrg(name: string): Promise<string> {
    const { data, error } = await admin.from("organizations").insert({ name }).select("id").single();
    if (error || !data) throw new Error(`fixture org: ${error?.message}`);
    orgIds.push(data.id);
    return data.id as string;
  }
  async function mkUser(tag: string): Promise<string> {
    const { data, error } = await admin.auth.admin.createUser({
      email: `sao-${tag}-${RUN_ID}@test.local`,
      password: PASSWORD,
      email_confirm: true,
    });
    if (error || !data.user) throw new Error(`fixture user: ${error?.message}`);
    userIds.push(data.user.id);
    return data.user.id;
  }
  async function orgExists(id: string) {
    const { data } = await admin.from("organizations").select("id").eq("id", id).maybeSingle();
    return !!data;
  }

  beforeAll(() => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
  });

  afterAll(async () => {
    if (orgIds.length) {
      await admin.from("organizations").update({ deletion_protected: false }).in("id", orgIds);
      await admin.from("questions").delete().in("org_id", orgIds);
      await admin.from("organizations").delete().in("id", orgIds);
    }
    if (subjectId) await admin.from("subjects").delete().eq("id", subjectId);
    for (const id of userIds) await admin.auth.admin.deleteUser(id);
  });

  describe("renameOrg", () => {
    it("renames, trimming the new name", async () => {
      const id = await mkOrg(`Rename Me ${RUN_ID}`);
      expect(await renameOrg(id, `  Renamed ${RUN_ID}  `)).toEqual({ ok: true });
      const { data } = await admin.from("organizations").select("name").eq("id", id).single();
      expect(data!.name).toBe(`Renamed ${RUN_ID}`);
    });

    it("allows a change of case on its own name", async () => {
      const id = await mkOrg(`case org ${RUN_ID}`);
      expect(await renameOrg(id, `Case Org ${RUN_ID}`)).toEqual({ ok: true });
    });

    it("refuses an empty name and another org's name (any case)", async () => {
      const a = await mkOrg(`Taken ${RUN_ID}`);
      const b = await mkOrg(`Other ${RUN_ID}`);
      expect((await renameOrg(b, "   ")).ok).toBe(false);
      expect((await renameOrg(b, `taken ${RUN_ID}`)).ok).toBe(false);
      expect(a).toBeTruthy();
    });

    it("refuses a protected org, in the app AND in the database", async () => {
      const id = await mkOrg(`Protected Rename ${RUN_ID}`);
      await admin.from("organizations").update({ deletion_protected: true }).eq("id", id);
      expect((await renameOrg(id, `Sneaky ${RUN_ID}`)).ok).toBe(false);

      const { error } = await admin
        .from("organizations")
        .update({ name: `Sneaky ${RUN_ID}` })
        .eq("id", id);
      expect(error?.message).toMatch(/protected/i);
    });
  });

  describe("deleteOrg", () => {
    it("refuses when the typed name does not match", async () => {
      const id = await mkOrg(`Confirm Me ${RUN_ID}`);
      expect((await deleteOrg(id, "Confirm Me")).ok).toBe(false);
      expect(await orgExists(id)).toBe(true);
    });

    it("refuses an org that owns questions", async () => {
      const id = await mkOrg(`Has Questions ${RUN_ID}`);
      const { data: exam } = await admin.from("exams").select("id").eq("name", "MHT-CET").single();
      const { data: subj } = await admin
        .from("subjects")
        .insert({ exam_id: exam!.id, name: `SAO Subject ${RUN_ID}` })
        .select("id")
        .single();
      subjectId = subj!.id;
      const { data: ch } = await admin
        .from("chapters")
        .insert({ subject_id: subjectId, name: `SAO Chapter ${RUN_ID}`, order_index: 0 })
        .select("id")
        .single();
      const { error } = await admin.from("questions").insert({
        org_id: id,
        exam_id: exam!.id,
        subject_id: subjectId,
        chapter_id: ch!.id,
        text: `SAO question ${RUN_ID}`,
        difficulty: "EASY",
        visibility: "PRIVATE",
        content_hash: `sao-${RUN_ID}`,
        created_by: await mkUser("author"),
      });
      expect(error).toBeNull();

      const res = await deleteOrg(id, `Has Questions ${RUN_ID}`);
      expect(res.ok).toBe(false);
      expect(await orgExists(id)).toBe(true);
    });

    it("the DATABASE refuses deleting a protected org, whatever the caller", async () => {
      const id = await mkOrg(`Protected Delete ${RUN_ID}`);
      await admin.from("organizations").update({ deletion_protected: true }).eq("id", id);
      const { error } = await admin.from("organizations").delete().eq("id", id);
      expect(error?.message).toMatch(/protected/i);
      expect(await orgExists(id)).toBe(true);
    });

    it("deletes an org without questions; its members keep their logins", async () => {
      const name = `Delete Me ${RUN_ID}`;
      const id = await mkOrg(name);
      const memberId = await mkUser("member");
      await admin.from("org_members").insert({ user_id: memberId, org_id: id, role: "TEACHER" });
      await admin.from("branches").insert({ org_id: id, name: `Branch ${RUN_ID}`, created_by: memberId });

      const before = await getOrgDetail(id);
      expect(before?.counts.branches).toBe(1);
      expect(before?.members.map((m) => m.userId)).toEqual([memberId]);

      expect(await deleteOrg(id, name)).toEqual({ ok: true });
      expect(await orgExists(id)).toBe(false);
      const { data: still } = await admin.auth.admin.getUserById(memberId);
      expect(still.user?.id).toBe(memberId);
      const { data: mem } = await admin.from("org_members").select("user_id").eq("user_id", memberId);
      expect(mem ?? []).toEqual([]);
    });
  });

  describe("member role (superadmin)", () => {
    it("promotes a lone teacher to admin", async () => {
      const id = await mkOrg(`Lone Teacher ${RUN_ID}`);
      const teacherId = await mkUser("teacher");
      const superId = await mkUser("super");
      await admin.from("org_members").insert({ user_id: teacherId, org_id: id, role: "TEACHER" });

      expect((await updateMemberRole(id, superId, teacherId, "ADMIN")).kind).toBe("ok");
      const detail = await getOrgDetail(id);
      expect(detail?.members[0].role).toBe("ADMIN");
      expect(detail?.adminCount).toBe(1);

      // ...and cannot then demote the org's only admin.
      expect((await updateMemberRole(id, superId, teacherId, "TEACHER")).kind).toBe(
        "would_remove_last_admin"
      );
    });
  });
});
