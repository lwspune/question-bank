/**
 * Integration test for paper SITTINGS (migration 0097).
 *
 * A paper is routinely conducted more than once — batch A on Monday, batch B on
 * Thursday — and each conduct needs its own tracker exam, because a sitting owns
 * its own date, batch and results. `paper_pushes` is the vault's record of which
 * exams a paper became.
 *
 * THE SECURITY PROPERTY is that the record is reachable only through the parent
 * paper: `paper_pushes_read_scoped` mirrors the 0058 predicate rather than a
 * bare org check, so a teacher cannot read the push history of a paper the
 * papers SELECT policy already hides from them. Testing that needs TWO real
 * orgs, so "mine" and "theirs" are genuinely different rows.
 *
 * Mirrors papers-usage-rls.test.ts: service-role seeds orgs/users, per-user JWT
 * clients drive the real helpers.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { createPaper } from "@/lib/papers/admin";
import { listPaperSittings, recordPaperSitting } from "@/lib/sync/paperSittings";
import { planPush, trackerExamId } from "@/lib/sync/paperPush";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "paper-sittings-test-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);
const TEACHER_A = `sittings-teacherA-${RUN_ID}@test.local`;
const TEACHER_B = `sittings-teacherB-${RUN_ID}@test.local`;
const ORG_A = `Sittings Org A ${RUN_ID}`;
const ORG_B = `Sittings Org B ${RUN_ID}`;

describe.skipIf(!HAS_ENV)("paper_pushes — sittings of a pushed paper", () => {
  let admin: SupabaseClient;
  let teacherA: SupabaseClient;
  let teacherB: SupabaseClient;
  let orgAId: string;
  let orgBId: string;
  let teacherAId: string;
  let paperA: string;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });

    const mkUser = async (email: string) => {
      const { data } = await admin.auth.admin.createUser({
        email,
        password: PASSWORD,
        email_confirm: true,
      });
      return data.user!.id;
    };
    teacherAId = await mkUser(TEACHER_A);
    const teacherBId = await mkUser(TEACHER_B);

    const mkOrg = async (name: string) => {
      const { data } = await admin.from("organizations").insert({ name }).select("id").single();
      return data!.id as string;
    };
    orgAId = await mkOrg(ORG_A);
    orgBId = await mkOrg(ORG_B);

    await admin.from("org_members").insert([
      { user_id: teacherAId, org_id: orgAId, role: "TEACHER" },
      { user_id: teacherBId, org_id: orgBId, role: "TEACHER" },
    ]);

    const signIn = async (email: string) => {
      const c = createClient(url, anon, { auth: { persistSession: false } });
      await c.auth.signInWithPassword({ email, password: PASSWORD });
      return c;
    };
    teacherA = await signIn(TEACHER_A);
    teacherB = await signIn(TEACHER_B);

    paperA = await createPaper(teacherA, {
      orgId: orgAId,
      createdBy: teacherAId,
      title: `Sittings paper ${RUN_ID}`,
    });
  });

  afterAll(async () => {
    if (orgAId) await admin.from("organizations").delete().eq("id", orgAId);
    if (orgBId) await admin.from("organizations").delete().eq("id", orgBId);
    for (const email of [TEACHER_A, TEACHER_B]) {
      const { data } = await admin.auth.admin.listUsers();
      const u = data?.users.find((x) => x.email === email);
      if (u) await admin.auth.admin.deleteUser(u.id);
    }
  });

  it("a paper never pushed has no sittings, and plans a straight-through push", async () => {
    const sittings = await listPaperSittings(teacherA, paperA);
    expect(sittings).toEqual([]);
    expect(planPush(sittings)).toEqual({ kind: "create", sittingNo: 1 });
  });

  it("records sitting 1 on the UNSUFFIXED id — the nine live drafts depend on it", async () => {
    await recordPaperSitting(teacherA, {
      paperId: paperA,
      sittingNo: 1,
      trackerExamId: trackerExamId(paperA, 1),
      label: null,
      pushedBy: teacherAId,
    });
    const sittings = await listPaperSittings(teacherA, paperA);
    expect(sittings).toHaveLength(1);
    expect(sittings[0].examId).toBe(`exam_vault_${paperA}`);
    expect(sittings[0].sittingNo).toBe(1);
  });

  it("is idempotent — a double-click cannot mint two exams", async () => {
    await recordPaperSitting(teacherA, {
      paperId: paperA,
      sittingNo: 1,
      trackerExamId: trackerExamId(paperA, 1),
      label: null,
      pushedBy: teacherAId,
    });
    expect(await listPaperSittings(teacherA, paperA)).toHaveLength(1);
  });

  it("once a sitting exists the plan is ASK — results are not the trigger", async () => {
    // The tracker cannot know a conduct happened until the Evalbee sheet lands
    // days later, so asking on existence is what closes the overwrite window.
    const plan = planPush(await listPaperSittings(teacherA, paperA));
    expect(plan).toMatchObject({ kind: "ask", nextSittingNo: 2 });
  });

  it("a second conduct is a SECOND row and a SECOND exam, carrying its label", async () => {
    await recordPaperSitting(teacherA, {
      paperId: paperA,
      sittingNo: 2,
      trackerExamId: trackerExamId(paperA, 2),
      label: "Batch B",
      pushedBy: teacherAId,
    });
    const sittings = await listPaperSittings(teacherA, paperA);
    expect(sittings.map((s) => s.sittingNo)).toEqual([1, 2]);
    expect(sittings[1].examId).toBe(`exam_vault_${paperA}_s2`);
    expect(sittings[1].label).toBe("Batch B");
    expect(sittings[1].examId).not.toBe(sittings[0].examId);
  });

  it("ANOTHER ORG'S TEACHER SEES NOTHING — the property this table's RLS exists for", async () => {
    // Not an empty-table false green: org A demonstrably has two rows above.
    expect(await listPaperSittings(teacherB, paperA)).toEqual([]);
  });

  it("another org's teacher cannot WRITE a sitting onto someone else's paper", async () => {
    await expect(
      recordPaperSitting(teacherB, {
        paperId: paperA,
        sittingNo: 9,
        trackerExamId: `exam_vault_${paperA}_s9`,
        label: "hijack",
        pushedBy: null,
      })
    ).rejects.toThrow();
    // And the row genuinely does not exist — read back as the owner.
    const sittings = await listPaperSittings(teacherA, paperA);
    expect(sittings.some((s) => s.sittingNo === 9)).toBe(false);
  });
});
