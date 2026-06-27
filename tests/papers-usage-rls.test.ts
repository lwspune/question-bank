/**
 * Integration test for getQuestionUsage (cross-paper soft-warn).
 * Proves the security-critical property: usage is org-scoped — org A never sees
 * that org B used the same PUBLIC question — and that both draft and finalized
 * papers count, with excludePaperId omitting the current paper.
 *
 * Mirrors papers-rls.test.ts: service-role seeds orgs/users/questions, per-user
 * JWT clients drive the real helpers.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { createPaper, addQuestion, finalizePaper } from "@/lib/papers/admin";
import { getQuestionUsage } from "@/lib/papers/usage";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "papers-usage-test-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);
const TEACHER_A = `papers-usage-teacherA-${RUN_ID}@test.local`;
const TEACHER_B = `papers-usage-teacherB-${RUN_ID}@test.local`;
const ORG_A = `Papers Usage Org A ${RUN_ID}`;
const ORG_B = `Papers Usage Org B ${RUN_ID}`;
const SUBJECT_NAME = `PapersUsagePhysics_${RUN_ID}`;
const CHAPTER_NAME = `PapersUsageChapter_${RUN_ID}`;

const TEMPLATE = [{ key: "phys", label: SUBJECT_NAME, targetCount: 5, assignedTo: [] }];

describe.skipIf(!HAS_ENV)("getQuestionUsage org-scoping (soft-warn)", () => {
  let admin: SupabaseClient;
  let teacherA: SupabaseClient;
  let teacherB: SupabaseClient;
  let orgAId: string;
  let orgBId: string;
  let teacherAId: string;
  let teacherBId: string;
  let q1: string;
  let q2: string;
  let draftPaperA: string;
  let finalPaperA: string;
  let paperB: string;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    admin = createClient(url, serviceRole, { auth: { persistSession: false } });

    const mkUser = async (email: string) => {
      const { data } = await admin.auth.admin.createUser({
        email,
        password: PASSWORD,
        email_confirm: true,
      });
      return data.user!.id;
    };
    teacherAId = await mkUser(TEACHER_A);
    teacherBId = await mkUser(TEACHER_B);

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

    const { data: exam } = await admin.from("exams").select("id").eq("name", "MHT-CET").single();
    const examId = exam!.id;
    const { data: subj } = await admin
      .from("subjects")
      .insert({ exam_id: examId, name: SUBJECT_NAME })
      .select("id")
      .single();
    const subjectId = subj!.id;
    const { data: ch } = await admin
      .from("chapters")
      .insert({ subject_id: subjectId, name: CHAPTER_NAME, order_index: 0 })
      .select("id")
      .single();
    const chapterId = ch!.id;

    const mkQuestion = async (n: number) => {
      const { data } = await admin
        .from("questions")
        .insert({
          org_id: orgAId,
          exam_id: examId,
          subject_id: subjectId,
          chapter_id: chapterId,
          text: `Papers usage question ${n}`,
          difficulty: "EASY",
          visibility: "PUBLIC", // PUBLIC → org B can legitimately reuse it
          content_hash: `papers-usage-${RUN_ID}-${n}`,
          created_by: teacherAId,
        })
        .select("id")
        .single();
      return data!.id as string;
    };
    q1 = await mkQuestion(1);
    q2 = await mkQuestion(2); // never added to any paper

    const signIn = async (email: string) => {
      const c = createClient(url, anon, { auth: { persistSession: false } });
      await c.auth.signInWithPassword({ email, password: PASSWORD });
      return c;
    };
    teacherA = await signIn(TEACHER_A);
    teacherB = await signIn(TEACHER_B);

    // Org A: q1 in a draft paper AND a finalized paper.
    draftPaperA = await createPaper(teacherA, {
      orgId: orgAId,
      createdBy: teacherAId,
      title: `Usage Draft A ${RUN_ID}`,
      template: TEMPLATE,
    });
    await addQuestion(teacherA, draftPaperA, q1, { addedBy: teacherAId });

    finalPaperA = await createPaper(teacherA, {
      orgId: orgAId,
      createdBy: teacherAId,
      title: `Usage Final A ${RUN_ID}`,
      template: TEMPLATE,
    });
    await addQuestion(teacherA, finalPaperA, q1, { addedBy: teacherAId });
    await finalizePaper(teacherA, finalPaperA);

    // Org B: q1 (PUBLIC) in org B's own paper.
    paperB = await createPaper(teacherB, {
      orgId: orgBId,
      createdBy: teacherBId,
      title: `Usage B ${RUN_ID}`,
      template: TEMPLATE,
    });
    await addQuestion(teacherB, paperB, q1, { addedBy: teacherBId });
  });

  afterAll(async () => {
    if (orgAId) await admin.from("organizations").delete().eq("id", orgAId);
    if (orgBId) await admin.from("organizations").delete().eq("id", orgBId);
    await admin.from("subjects").delete().eq("name", SUBJECT_NAME);
    for (const id of [teacherAId, teacherBId]) {
      if (id) await admin.auth.admin.deleteUser(id);
    }
  });

  it("reports BOTH org A papers (draft + finalized) for q1, never org B's", async () => {
    const usage = await getQuestionUsage(teacherA, [q1]);
    const refs = usage.get(q1) ?? [];
    const ids = refs.map((r) => r.paperId).sort();
    expect(ids).toEqual([draftPaperA, finalPaperA].sort());
    expect(refs.some((r) => r.paperId === paperB)).toBe(false); // org isolation
    expect(refs.find((r) => r.paperId === finalPaperA)?.status).toBe("finalized");
    expect(refs.find((r) => r.paperId === draftPaperA)?.status).toBe("draft");
  });

  it("org B sees only ITS paper for the same PUBLIC question", async () => {
    const usage = await getQuestionUsage(teacherB, [q1]);
    const ids = (usage.get(q1) ?? []).map((r) => r.paperId);
    expect(ids).toEqual([paperB]);
  });

  it("excludePaperId omits the current paper", async () => {
    const usage = await getQuestionUsage(teacherA, [q1], draftPaperA);
    const ids = (usage.get(q1) ?? []).map((r) => r.paperId);
    expect(ids).toEqual([finalPaperA]); // draft excluded
  });

  it("a question used in no paper is absent from the map", async () => {
    const usage = await getQuestionUsage(teacherA, [q2]);
    expect(usage.has(q2)).toBe(false);
  });

  it("empty input → no DB round-trip, empty map", async () => {
    const usage = await getQuestionUsage(teacherA, []);
    expect(usage.size).toBe(0);
  });
});
