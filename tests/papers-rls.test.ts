/**
 * RLS + data-layer integration tests for the collaborative paper builder
 * (migration 0039). Mirrors teacher-editor-rls.test.ts:
 *   service-role seeds orgs/users/questions, then per-user JWT clients drive
 *   the real src/lib/papers/admin.ts functions to prove the walls hold.
 *
 * Coverage (the security-critical paths):
 *   - an org editor can create a paper + add questions (section auto-derived)
 *   - duplicate/concurrent add is idempotent (PK + ignoreDuplicates)
 *   - cross-org READ isolation (org B can't see org A's paper)
 *   - cross-org WRITE isolation (org B can't add to org A's paper)
 *   - finalize freezes edits; reopen unblocks
 *   - delete is creator-or-admin only (a non-creator teacher is denied)
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import {
  createPaper,
  addQuestion,
  addQuestionsToPaper,
  removeQuestion,
  getPaperDetail,
  listPapers,
  finalizePaper,
  reopenPaper,
  deletePaper,
} from "@/lib/papers/admin";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "papers-rls-test-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ADMIN_A = `papers-rls-adminA-${RUN_ID}@test.local`;
const TEACHER_A = `papers-rls-teacherA-${RUN_ID}@test.local`;
const TEACHER_A2 = `papers-rls-teacherA2-${RUN_ID}@test.local`;
const TEACHER_B = `papers-rls-teacherB-${RUN_ID}@test.local`;
const ORG_A = `Papers RLS Org A ${RUN_ID}`;
const ORG_B = `Papers RLS Org B ${RUN_ID}`;
const SUBJECT_NAME = `PapersRLSPhysics_${RUN_ID}`;
const CHAPTER_NAME = `PapersRLSChapter_${RUN_ID}`;

// Template whose one section's label == our test subject, so addQuestion's
// subject->section derivation has a real target to resolve to.
const TEMPLATE = [{ key: "phys", label: SUBJECT_NAME, targetCount: 5, assignedTo: [] }];

describe.skipIf(!HAS_ENV)("papers RLS + data layer (migration 0039)", () => {
  let admin: SupabaseClient;
  let teacherA: SupabaseClient;
  let teacherA2: SupabaseClient;
  let teacherB: SupabaseClient;
  let adminA: SupabaseClient;
  let orgAId: string;
  let orgBId: string;
  let adminAId: string;
  let teacherAId: string;
  let teacherA2Id: string;
  let teacherBId: string;
  let q1: string;
  let q2: string;

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
    adminAId = await mkUser(ADMIN_A);
    teacherAId = await mkUser(TEACHER_A);
    teacherA2Id = await mkUser(TEACHER_A2);
    teacherBId = await mkUser(TEACHER_B);

    const mkOrg = async (name: string) => {
      const { data } = await admin
        .from("organizations")
        .insert({ name })
        .select("id")
        .single();
      return data!.id as string;
    };
    orgAId = await mkOrg(ORG_A);
    orgBId = await mkOrg(ORG_B);

    await admin.from("org_members").insert([
      { user_id: adminAId, org_id: orgAId, role: "ADMIN" },
      { user_id: teacherAId, org_id: orgAId, role: "TEACHER" },
      { user_id: teacherA2Id, org_id: orgAId, role: "TEACHER" },
      { user_id: teacherBId, org_id: orgBId, role: "TEACHER" },
    ]);

    const { data: exam } = await admin
      .from("exams")
      .select("id")
      .eq("name", "MHT-CET")
      .single();
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
          text: `Papers RLS question ${n}`,
          difficulty: "EASY",
          visibility: "PUBLIC",
          content_hash: `papers-rls-${RUN_ID}-${n}`,
          created_by: adminAId,
        })
        .select("id")
        .single();
      return data!.id as string;
    };
    q1 = await mkQuestion(1);
    q2 = await mkQuestion(2);

    const signIn = async (email: string) => {
      const c = createClient(url, anon, { auth: { persistSession: false } });
      await c.auth.signInWithPassword({ email, password: PASSWORD });
      return c;
    };
    adminA = await signIn(ADMIN_A);
    teacherA = await signIn(TEACHER_A);
    teacherA2 = await signIn(TEACHER_A2);
    teacherB = await signIn(TEACHER_B);
  });

  afterAll(async () => {
    // Deleting the orgs cascades papers -> paper_questions (FK ON DELETE CASCADE).
    if (orgAId) await admin.from("organizations").delete().eq("id", orgAId);
    if (orgBId) await admin.from("organizations").delete().eq("id", orgBId);
    await admin.from("subjects").delete().eq("name", SUBJECT_NAME);
    for (const id of [adminAId, teacherAId, teacherA2Id, teacherBId]) {
      if (id) await admin.auth.admin.deleteUser(id);
    }
  });

  let paperId: string;

  it("an org TEACHER can create a paper", async () => {
    paperId = await createPaper(teacherA, {
      orgId: orgAId,
      createdBy: teacherAId,
      title: `RLS Paper ${RUN_ID}`,
      template: TEMPLATE,
    });
    expect(paperId).toBeTruthy();
  });

  it("addQuestion derives the section from the question's subject", async () => {
    const { sectionKey } = await addQuestion(teacherA, paperId, q1, {
      addedBy: teacherAId,
    });
    expect(sectionKey).toBe("phys"); // SUBJECT_NAME matched TEMPLATE's label
    const detail = await getPaperDetail(teacherA, paperId);
    expect(detail?.membership).toHaveLength(1);
    expect(detail?.membership[0]).toMatchObject({ questionId: q1, sectionKey: "phys" });
  });

  it("a SECOND teacher in the same org can add to the same paper (collaboration)", async () => {
    await addQuestion(teacherA2, paperId, q2, { addedBy: teacherA2Id });
    const detail = await getPaperDetail(teacherA, paperId);
    expect(detail?.membership).toHaveLength(2);
  });

  it("duplicate add is idempotent (no error, no second row)", async () => {
    await addQuestion(teacherA, paperId, q1, { addedBy: teacherAId });
    const detail = await getPaperDetail(teacherA, paperId);
    expect(detail?.membership.filter((m) => m.questionId === q1)).toHaveLength(1);
  });

  it("bulk addQuestionsToPaper (cart commit) files, dedups, and reports counts", async () => {
    const bulkPaper = await createPaper(teacherA, {
      orgId: orgAId,
      createdBy: teacherAId,
      title: `Bulk ${RUN_ID}`,
      template: TEMPLATE,
    });
    // dup id in input → counted once
    const r1 = await addQuestionsToPaper(teacherA, bulkPaper, [q1, q2, q1], teacherAId);
    expect(r1).toEqual({ added: 2, alreadyIn: 0 });
    const d1 = await getPaperDetail(teacherA, bulkPaper);
    expect(d1?.membership).toHaveLength(2);
    // re-commit the same → all already present, no new rows
    const r2 = await addQuestionsToPaper(teacherA, bulkPaper, [q1, q2], teacherAId);
    expect(r2).toEqual({ added: 0, alreadyIn: 2 });
    const d2 = await getPaperDetail(teacherA, bulkPaper);
    expect(d2?.membership).toHaveLength(2);
  });

  it("org B teacher CANNOT see org A's paper (read isolation)", async () => {
    const detail = await getPaperDetail(teacherB, paperId);
    expect(detail).toBeNull();
    const list = await listPapers(teacherB);
    expect(list.find((p) => p.id === paperId)).toBeUndefined();
  });

  it("org B teacher CANNOT add a question to org A's paper (write isolation)", async () => {
    await expect(addQuestion(teacherB, paperId, q1, { addedBy: teacherBId })).rejects.toThrow();
    // org A still sees exactly its two questions — nothing leaked in.
    const detail = await getPaperDetail(teacherA, paperId);
    expect(detail?.membership).toHaveLength(2);
  });

  it("finalize freezes the paper: snapshot is written and edits are blocked", async () => {
    await finalizePaper(teacherA, paperId);
    const detail = await getPaperDetail(teacherA, paperId);
    expect(detail?.status).toBe("finalized");
    expect(detail?.snapshot?.orderedQuestionIds).toEqual([q1, q2]);
    await expect(removeQuestion(teacherA, paperId, q1)).rejects.toThrow(/finalized/i);
  });

  it("reopen unblocks editing", async () => {
    await reopenPaper(teacherA, paperId);
    const detail = await getPaperDetail(teacherA, paperId);
    expect(detail?.status).toBe("draft");
    expect(detail?.snapshot).toBeNull();
    // editing works again
    await removeQuestion(teacherA, paperId, q2);
    const after = await getPaperDetail(teacherA, paperId);
    expect(after?.membership).toHaveLength(1);
  });

  it("a non-creator TEACHER cannot delete the paper; an ADMIN can", async () => {
    await deletePaper(teacherA2, paperId); // RLS denies silently (0 rows)
    let detail = await getPaperDetail(teacherA, paperId);
    expect(detail).not.toBeNull(); // still there

    await deletePaper(adminA, paperId); // admin allowed
    detail = await getPaperDetail(teacherA, paperId);
    expect(detail).toBeNull();
  });
});
