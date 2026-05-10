/**
 * Integration test for visibility RLS — Phase A of the public-product pivot.
 *
 * Verifies that:
 *   - anon (no JWT) reads PUBLIC questions but NOT PRIVATE
 *   - anon reads options of PUBLIC questions but NOT of PRIVATE
 *   - anon reads taxonomy (exams/subjects/chapters/subtopics) for filter dropdowns
 *   - cross-org user reads PUBLIC questions of other orgs but NOT their PRIVATE
 *   - same-org admin reads BOTH their PUBLIC + PRIVATE
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "vis-test-password-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ALICE_EMAIL = `vis-alice-${RUN_ID}@test.local`;
const BOB_EMAIL = `vis-bob-${RUN_ID}@test.local`;
const ORG_A_NAME = `Vis Org A ${RUN_ID}`;
const ORG_B_NAME = `Vis Org B ${RUN_ID}`;

describe.skipIf(!HAS_ENV)("Visibility RLS (PUBLIC vs PRIVATE)", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let aliceClient: SupabaseClient;
  let bobClient: SupabaseClient;
  let aliceUserId: string;
  let bobUserId: string;
  let orgAId: string;
  let orgBId: string;
  let publicQuestionId: string;
  let privateQuestionId: string;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    admin = createClient(url, serviceRole, { auth: { persistSession: false } });

    const [{ data: alice }, { data: bob }] = await Promise.all([
      admin.auth.admin.createUser({
        email: ALICE_EMAIL,
        password: PASSWORD,
        email_confirm: true,
      }),
      admin.auth.admin.createUser({
        email: BOB_EMAIL,
        password: PASSWORD,
        email_confirm: true,
      }),
    ]);
    aliceUserId = alice.user!.id;
    bobUserId = bob.user!.id;

    const [{ data: orgA }, { data: orgB }] = await Promise.all([
      admin.from("organizations").insert({ name: ORG_A_NAME }).select("id").single(),
      admin.from("organizations").insert({ name: ORG_B_NAME }).select("id").single(),
    ]);
    orgAId = orgA!.id;
    orgBId = orgB!.id;

    await admin.from("org_members").insert([
      { org_id: orgAId, user_id: aliceUserId, role: "ADMIN" },
      { org_id: orgBId, user_id: bobUserId, role: "ADMIN" },
    ]);

    // Borrow existing taxonomy (any exam/subject/chapter is fine — visibility tests
    // don't care about taxonomy ownership).
    const { data: existingExam } = await admin
      .from("exams")
      .select("id")
      .limit(1)
      .single();
    const examId = existingExam!.id;
    const { data: existingSubject } = await admin
      .from("subjects")
      .select("id")
      .eq("exam_id", examId)
      .limit(1)
      .single();
    const subjectId = existingSubject!.id;
    const { data: existingChapter } = await admin
      .from("chapters")
      .select("id")
      .eq("subject_id", subjectId)
      .limit(1)
      .single();
    const chapterId = existingChapter!.id;

    const { data: pub } = await admin
      .from("questions")
      .insert({
        org_id: orgAId,
        exam_id: examId,
        subject_id: subjectId,
        chapter_id: chapterId,
        text: `vis PUBLIC ${RUN_ID}`,
        difficulty: "EASY",
        content_hash: `vis-pub-${RUN_ID}`,
        created_by: aliceUserId,
        visibility: "PUBLIC",
      })
      .select("id")
      .single();
    publicQuestionId = pub!.id;

    const { data: priv } = await admin
      .from("questions")
      .insert({
        org_id: orgAId,
        exam_id: examId,
        subject_id: subjectId,
        chapter_id: chapterId,
        text: `vis PRIVATE ${RUN_ID}`,
        difficulty: "EASY",
        content_hash: `vis-priv-${RUN_ID}`,
        created_by: aliceUserId,
        visibility: "PRIVATE",
      })
      .select("id")
      .single();
    privateQuestionId = priv!.id;

    await admin.from("options").insert([
      { question_id: publicQuestionId, label: "A", text: "pub-a", is_correct: true },
      { question_id: publicQuestionId, label: "B", text: "pub-b", is_correct: false },
      { question_id: publicQuestionId, label: "C", text: "pub-c", is_correct: false },
      { question_id: publicQuestionId, label: "D", text: "pub-d", is_correct: false },
      { question_id: privateQuestionId, label: "A", text: "priv-a", is_correct: true },
      { question_id: privateQuestionId, label: "B", text: "priv-b", is_correct: false },
      { question_id: privateQuestionId, label: "C", text: "priv-c", is_correct: false },
      { question_id: privateQuestionId, label: "D", text: "priv-d", is_correct: false },
    ]);

    anonClient = createClient(url, anon, { auth: { persistSession: false } });
    aliceClient = createClient(url, anon, { auth: { persistSession: false } });
    bobClient = createClient(url, anon, { auth: { persistSession: false } });
    await aliceClient.auth.signInWithPassword({
      email: ALICE_EMAIL,
      password: PASSWORD,
    });
    await bobClient.auth.signInWithPassword({
      email: BOB_EMAIL,
      password: PASSWORD,
    });
  });

  afterAll(async () => {
    if (publicQuestionId)
      await admin.from("questions").delete().eq("id", publicQuestionId);
    if (privateQuestionId)
      await admin.from("questions").delete().eq("id", privateQuestionId);
    if (orgAId) await admin.from("organizations").delete().eq("id", orgAId);
    if (orgBId) await admin.from("organizations").delete().eq("id", orgBId);
    if (aliceUserId) await admin.auth.admin.deleteUser(aliceUserId);
    if (bobUserId) await admin.auth.admin.deleteUser(bobUserId);
  });

  it("anon CAN read a PUBLIC question", async () => {
    const { data, error } = await anonClient
      .from("questions")
      .select("id, visibility")
      .eq("id", publicQuestionId);
    expect(error).toBeNull();
    expect(data?.length).toBe(1);
    expect(data?.[0].visibility).toBe("PUBLIC");
  });

  it("anon CANNOT read a PRIVATE question", async () => {
    const { data, error } = await anonClient
      .from("questions")
      .select("id")
      .eq("id", privateQuestionId);
    expect(error).toBeNull();
    expect(data?.length).toBe(0);
  });

  it("anon CAN read options of a PUBLIC question (and sees is_correct)", async () => {
    const { data, error } = await anonClient
      .from("options")
      .select("label, text, is_correct")
      .eq("question_id", publicQuestionId);
    expect(error).toBeNull();
    expect(data?.length).toBe(4);
    const labels = data!.map((o) => o.label).sort();
    expect(labels).toEqual(["A", "B", "C", "D"]);
    expect(data!.find((o) => o.label === "A")!.is_correct).toBe(true);
  });

  it("anon CANNOT read options of a PRIVATE question", async () => {
    const { data, error } = await anonClient
      .from("options")
      .select("label")
      .eq("question_id", privateQuestionId);
    expect(error).toBeNull();
    expect(data?.length).toBe(0);
  });

  it("anon CAN read taxonomy tables (for filter dropdowns)", async () => {
    const [exams, subjects, chapters, subtopics] = await Promise.all([
      anonClient.from("exams").select("id").limit(1),
      anonClient.from("subjects").select("id").limit(1),
      anonClient.from("chapters").select("id").limit(1),
      anonClient.from("subtopics").select("id").limit(1),
    ]);
    expect(exams.error).toBeNull();
    expect(subjects.error).toBeNull();
    expect(chapters.error).toBeNull();
    expect(subtopics.error).toBeNull();
    expect((exams.data?.length ?? 0) + (subjects.data?.length ?? 0)).toBeGreaterThan(0);
  });

  it("alice (org A admin) reads BOTH her PUBLIC and PRIVATE questions", async () => {
    const { data, error } = await aliceClient
      .from("questions")
      .select("id, visibility")
      .in("id", [publicQuestionId, privateQuestionId]);
    expect(error).toBeNull();
    expect(data?.length).toBe(2);
  });

  it("bob (org B admin) reads org A's PUBLIC question but NOT its PRIVATE one", async () => {
    const { data, error } = await bobClient
      .from("questions")
      .select("id, visibility")
      .in("id", [publicQuestionId, privateQuestionId]);
    expect(error).toBeNull();
    expect(data?.length).toBe(1);
    expect(data?.[0].id).toBe(publicQuestionId);
    expect(data?.[0].visibility).toBe("PUBLIC");
  });
});
