/**
 * deleteQuestion — admin removes one question; options cascade via FK,
 * storage paths are returned so the route can verify cleanup happened.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { contentHash } from "@/lib/upload/hash";
import { deleteQuestion } from "@/lib/questions/deleteQuestion";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);

describe.skipIf(!HAS_ENV)("deleteQuestion", () => {
  let admin: SupabaseClient;
  let orgId: string;
  let otherOrgId: string;
  let adminUserId: string;
  let examId: string;
  let subjectId: string;
  let chapterId: string;

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { data: u } = await admin.auth.admin.createUser({
      email: `q-delete-${RUN_ID}@test.local`,
      password: "q-delete-pw-1234",
      email_confirm: true,
    });
    adminUserId = u.user!.id;

    const { data: orgs } = await admin
      .from("organizations")
      .insert([
        { name: `Q-Delete Org A ${RUN_ID}` },
        { name: `Q-Delete Org B ${RUN_ID}` },
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

    const { data: sub } = await admin
      .from("subjects")
      .insert({ exam_id: examId, name: `QD_Subject_${RUN_ID}` })
      .select("id")
      .single();
    subjectId = sub!.id;

    const { data: ch } = await admin
      .from("chapters")
      .insert({
        subject_id: subjectId,
        name: `QD_Chapter_${RUN_ID}`,
        order_index: 0,
      })
      .select("id")
      .single();
    chapterId = ch!.id;
  });

  afterAll(async () => {
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (otherOrgId) await admin.from("organizations").delete().eq("id", otherOrgId);
    if (adminUserId) await admin.auth.admin.deleteUser(adminUserId);
  });

  async function insertQuestionWithOptions(opts: {
    text: string;
    questionImage?: string | null;
    optionAImage?: string | null;
  }): Promise<string> {
    const { text, questionImage = null, optionAImage = null } = opts;
    const hash = contentHash(text, ["a", "b", "c", "d"], "A");
    const { data: q } = await admin
      .from("questions")
      .insert({
        org_id: orgId,
        exam_id: examId,
        subject_id: subjectId,
        chapter_id: chapterId,
        text,
        difficulty: "EASY",
        content_hash: hash,
        image_url: questionImage,
        created_by: adminUserId,
      })
      .select("id")
      .single();
    await admin.from("options").insert([
      {
        question_id: q!.id,
        label: "A",
        text: "a",
        is_correct: true,
        image_url: optionAImage,
      },
      { question_id: q!.id, label: "B", text: "b", is_correct: false },
      { question_id: q!.id, label: "C", text: "c", is_correct: false },
      { question_id: q!.id, label: "D", text: "d", is_correct: false },
    ]);
    return q!.id as string;
  }

  it("returns not_found for an unknown id", async () => {
    const result = await deleteQuestion(
      admin,
      "00000000-0000-0000-0000-000000000000",
      orgId
    );
    expect(result.kind).toBe("not_found");
  });

  it("returns forbidden when caller is from a different org", async () => {
    const qid = await insertQuestionWithOptions({
      text: `QD-forbidden ${RUN_ID}?`,
    });
    const result = await deleteQuestion(admin, qid, otherOrgId);
    expect(result.kind).toBe("forbidden");
    const { data: still } = await admin
      .from("questions")
      .select("id")
      .eq("id", qid)
      .maybeSingle();
    expect(still?.id).toBe(qid);
  });

  it("deletes the question and cascades options", async () => {
    const qid = await insertQuestionWithOptions({ text: `QD-happy ${RUN_ID}?` });
    const result = await deleteQuestion(admin, qid, orgId);
    expect(result.kind).toBe("ok");

    const { data: q } = await admin
      .from("questions")
      .select("id")
      .eq("id", qid)
      .maybeSingle();
    expect(q).toBeNull();

    const { data: opts } = await admin
      .from("options")
      .select("id")
      .eq("question_id", qid);
    expect(opts).toEqual([]);
  });

  it("collects image paths from question + options for storage cleanup", async () => {
    const qid = await insertQuestionWithOptions({
      text: `QD-images ${RUN_ID}?`,
      questionImage: `${orgId}/qd-img.png`,
      optionAImage: `${orgId}/qd-opt.png`,
    });
    const result = await deleteQuestion(admin, qid, orgId);
    expect(result.kind).toBe("ok");
    if (result.kind !== "ok") return;
    expect(result.removedImagePaths.sort()).toEqual([
      `${orgId}/qd-img.png`,
      `${orgId}/qd-opt.png`,
    ]);
  });
});
