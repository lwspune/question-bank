/**
 * Integration test for applyEdit — exercises the full edit flow against
 * the live DB using the service-role client. Auth/role checks happen at
 * the route layer, not here; this test verifies the data + taxonomy +
 * collision behaviour.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { applyEdit } from "@/lib/questions/applyEdit";
import { validateEditPayload } from "@/lib/questions/edit";
import { contentHash } from "@/lib/upload/hash";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);

describe.skipIf(!HAS_ENV)("applyEdit", () => {
  let admin: SupabaseClient;
  let orgId: string;
  let otherOrgId: string;
  let adminUserId: string;
  let examId: string;
  let subjectAId: string;
  let subjectBId: string;
  let chapterUnderAId: string;
  let chapterUnderBId: string;
  let subtopicUnderAId: string;
  let questionId: string;
  let neighbourQuestionId: string;
  const optionIds: Record<"A" | "B" | "C" | "D", string> = {
    A: "",
    B: "",
    C: "",
    D: "",
  };

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { data: u } = await admin.auth.admin.createUser({
      email: `edit-apply-admin-${RUN_ID}@test.local`,
      password: "edit-apply-pw-1234",
      email_confirm: true,
    });
    adminUserId = u.user!.id;

    const { data: orgs } = await admin
      .from("organizations")
      .insert([
        { name: `Edit Org A ${RUN_ID}` },
        { name: `Edit Org B ${RUN_ID}` },
      ])
      .select("id");
    orgId = orgs![0].id;
    otherOrgId = orgs![1].id;

    await admin.from("org_members").insert({
      org_id: orgId,
      user_id: adminUserId,
      role: "ADMIN",
    });

    const { data: exam } = await admin
      .from("exams")
      .select("id")
      .eq("name", "MHT-CET")
      .single();
    examId = exam!.id;

    const subjectName = `EditTestSubject_${RUN_ID}`;
    const otherSubjectName = `EditTestSubjectB_${RUN_ID}`;
    const { data: insertedSubjects } = await admin
      .from("subjects")
      .insert([
        { exam_id: examId, name: subjectName },
        { exam_id: examId, name: otherSubjectName },
      ])
      .select("id, name");
    subjectAId = insertedSubjects!.find((s) => s.name === subjectName)!.id;
    subjectBId = insertedSubjects!.find((s) => s.name === otherSubjectName)!.id;

    const { data: ch } = await admin
      .from("chapters")
      .insert([
        { subject_id: subjectAId, name: `EditTestChapterA_${RUN_ID}`, order_index: 0 },
        { subject_id: subjectBId, name: `EditTestChapterB_${RUN_ID}`, order_index: 0 },
      ])
      .select("id, subject_id");
    chapterUnderAId = ch!.find((c) => c.subject_id === subjectAId)!.id;
    chapterUnderBId = ch!.find((c) => c.subject_id === subjectBId)!.id;

    const { data: st } = await admin
      .from("subtopics")
      .insert({
        chapter_id: chapterUnderAId,
        name: `EditTestSubtopic_${RUN_ID}`,
      })
      .select("id")
      .single();
    subtopicUnderAId = st!.id;

    const initialHash = contentHash("Initial Q?", ["A1", "B1", "C1", "D1"], "A");
    const { data: q } = await admin
      .from("questions")
      .insert({
        org_id: orgId,
        exam_id: examId,
        subject_id: subjectAId,
        chapter_id: chapterUnderAId,
        subtopic_id: subtopicUnderAId,
        text: "Initial Q?",
        difficulty: "EASY",
        content_hash: initialHash,
        created_by: adminUserId,
      })
      .select("id")
      .single();
    questionId = q!.id;

    const { data: insertedOpts } = await admin
      .from("options")
      .insert([
        { question_id: questionId, label: "A", text: "A1", is_correct: true },
        { question_id: questionId, label: "B", text: "B1", is_correct: false },
        { question_id: questionId, label: "C", text: "C1", is_correct: false },
        { question_id: questionId, label: "D", text: "D1", is_correct: false },
      ])
      .select("id, label");
    for (const opt of insertedOpts!) {
      optionIds[opt.label as "A" | "B" | "C" | "D"] = opt.id;
    }

    const neighbourHash = contentHash("Neighbour?", ["x", "y", "z", "w"], "B");
    const { data: nq } = await admin
      .from("questions")
      .insert({
        org_id: orgId,
        exam_id: examId,
        subject_id: subjectAId,
        chapter_id: chapterUnderAId,
        text: "Neighbour?",
        difficulty: "EASY",
        content_hash: neighbourHash,
        created_by: adminUserId,
      })
      .select("id")
      .single();
    neighbourQuestionId = nq!.id;
    await admin.from("options").insert([
      { question_id: neighbourQuestionId, label: "A", text: "x", is_correct: false },
      { question_id: neighbourQuestionId, label: "B", text: "y", is_correct: true },
      { question_id: neighbourQuestionId, label: "C", text: "z", is_correct: false },
      { question_id: neighbourQuestionId, label: "D", text: "w", is_correct: false },
    ]);
  });

  afterAll(async () => {
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (otherOrgId) await admin.from("organizations").delete().eq("id", otherOrgId);
    if (subjectAId) await admin.from("subjects").delete().eq("id", subjectAId);
    if (subjectBId) await admin.from("subjects").delete().eq("id", subjectBId);
    if (adminUserId) await admin.auth.admin.deleteUser(adminUserId);
  });

  function buildPayload(overrides: Record<string, unknown> = {}) {
    return {
      text: "Initial Q?",
      context: null,
      difficulty: "EASY" as const,
      solution: null,
      imageUrl: null,
      subjectId: subjectAId,
      chapterId: chapterUnderAId,
      subtopicId: subtopicUnderAId,
      visibility: "PRIVATE" as const,
      correct: "A" as const,
      options: [
        { label: "A" as const, text: "A1", imageUrl: null },
        { label: "B" as const, text: "B1", imageUrl: null },
        { label: "C" as const, text: "C1", imageUrl: null },
        { label: "D" as const, text: "D1", imageUrl: null },
      ],
      ...overrides,
    };
  }

  function validate(overrides: Record<string, unknown> = {}) {
    const v = validateEditPayload(buildPayload(overrides));
    if (!v.ok) throw new Error(`fixture invalid: ${v.errors.join(", ")}`);
    return v;
  }

  it("returns not_found when the question id does not exist", async () => {
    const v = validate();
    const result = await applyEdit(
      admin,
      "00000000-0000-0000-0000-000000000000",
      orgId,
      v.payload,
      v.contentHash
    );
    expect(result.kind).toBe("not_found");
  });

  it("returns forbidden when callerOrgId does not match the question's org", async () => {
    const v = validate();
    const result = await applyEdit(
      admin,
      questionId,
      otherOrgId,
      v.payload,
      v.contentHash
    );
    expect(result.kind).toBe("forbidden");
  });

  it("returns invalid_image_path when an imageUrl references another org folder", async () => {
    const v = validate({ imageUrl: `${otherOrgId}/x.png` });
    const result = await applyEdit(
      admin,
      questionId,
      orgId,
      v.payload,
      v.contentHash
    );
    expect(result.kind).toBe("invalid_image_path");
  });

  it("returns invalid_taxonomy when chapter does not belong to subject", async () => {
    const v = validate({
      subjectId: subjectAId,
      chapterId: chapterUnderBId, // belongs to subject B
    });
    const result = await applyEdit(
      admin,
      questionId,
      orgId,
      v.payload,
      v.contentHash
    );
    expect(result.kind).toBe("invalid_taxonomy");
  });

  it("happy path: persists the new text + options + difficulty", async () => {
    const v = validate({
      text: "Updated text " + RUN_ID,
      difficulty: "HARD",
      correct: "C",
      options: [
        { label: "A" as const, text: "new A", imageUrl: null },
        { label: "B" as const, text: "new B", imageUrl: null },
        { label: "C" as const, text: "new C", imageUrl: null },
        { label: "D" as const, text: "new D", imageUrl: null },
      ],
    });
    const result = await applyEdit(
      admin,
      questionId,
      orgId,
      v.payload,
      v.contentHash
    );
    expect(result.kind).toBe("ok");

    const { data: q } = await admin
      .from("questions")
      .select("text, difficulty, content_hash")
      .eq("id", questionId)
      .single();
    expect(q!.text).toBe("Updated text " + RUN_ID);
    expect(q!.difficulty).toBe("HARD");
    expect(q!.content_hash).toBe(v.contentHash);

    const { data: opts } = await admin
      .from("options")
      .select("label, text, is_correct")
      .eq("question_id", questionId);
    const c = opts!.find((o) => o.label === "C");
    expect(c?.text).toBe("new C");
    expect(c?.is_correct).toBe(true);
    const a = opts!.find((o) => o.label === "A");
    expect(a?.is_correct).toBe(false);
  });

  it("returns duplicate when new content_hash collides with another question in the same org", async () => {
    // Edit the question to match the neighbour's exact content
    const v = validate({
      text: "Neighbour?",
      correct: "B",
      options: [
        { label: "A" as const, text: "x", imageUrl: null },
        { label: "B" as const, text: "y", imageUrl: null },
        { label: "C" as const, text: "z", imageUrl: null },
        { label: "D" as const, text: "w", imageUrl: null },
      ],
    });
    const result = await applyEdit(
      admin,
      questionId,
      orgId,
      v.payload,
      v.contentHash
    );
    expect(result.kind).toBe("duplicate");
  });
});
