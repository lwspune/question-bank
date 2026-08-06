/**
 * Integration test for mock-attempt RLS (migration 0044).
 *
 * Verifies the load-bearing isolation property of the student-facing tables:
 *   - a student reads their OWN attempt + answers
 *   - a student CANNOT read another student's attempt or answers
 *   - a student cannot FORGE an attempt as another user (WITH CHECK user_id)
 *   - an attempt cannot be opened against a non-published mock
 *   - anon cannot open an attempt at all
 *   - mock_tests writes are service-role only (a user JWT cannot publish)
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

const PASSWORD = "mock-test-password-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ALICE_EMAIL = `mock-alice-${RUN_ID}@test.local`;
const BOB_EMAIL = `mock-bob-${RUN_ID}@test.local`;
const FUTURE = new Date(Date.now() + 3600_000).toISOString();

describe.skipIf(!HAS_ENV)("Mock attempt RLS", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let aliceClient: SupabaseClient;
  let bobClient: SupabaseClient;
  let aliceId: string;
  let bobId: string;
  let publishedMockId: string;
  let draftMockId: string;
  let questionId: string;
  let aliceAttemptId: string;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    admin = createClient(url, serviceRole, { auth: { persistSession: false } });

    const [{ data: alice }, { data: bob }] = await Promise.all([
      admin.auth.admin.createUser({ email: ALICE_EMAIL, password: PASSWORD, email_confirm: true }),
      admin.auth.admin.createUser({ email: BOB_EMAIL, password: PASSWORD, email_confirm: true }),
    ]);
    aliceId = alice.user!.id;
    bobId = bob.user!.id;

    // Borrow a real exam + a real PUBLIC question (for the answer FK).
    // Deterministic order — an unordered limit(1) picks an arbitrary exam
    // (the 2026-08-06 leaked fixture landed under MHT-CET by this accident).
    const { data: exam } = await admin.from("exams").select("id").order("name").limit(1).single();
    const { data: q } = await admin
      .from("questions")
      .select("id")
      .eq("visibility", "PUBLIC")
      // Oldest row = a stable seed question, never a parallel run's transient
      // fixture (which its afterAll could delete mid-test → FK 23503).
      .order("created_at", { ascending: true })
      .limit(1)
      .single();
    questionId = q!.id;

    const mkMock = (status: "published" | "draft", n: number) => ({
      id: randomUUID(),
      slug: `mock-rls-${status}-${RUN_ID}`,
      exam_id: exam!.id,
      paper_code: "maths",
      pyq_year: 2099,
      title: `Mock RLS ${status} ${RUN_ID}`,
      duration_secs: 9000,
      marking: { correct: 2.5, wrong: -0.83 },
      sections: [{ key: "mathematics", label: "Mathematics", count: n }],
      questions: [{ position: 1, questionId, sectionKey: "mathematics", marks: 2.5, negMarks: -0.83 }],
      total_questions: n,
      total_marks: 300,
      status,
    });
    const [{ data: pub }, { data: draft }] = await Promise.all([
      admin.from("mock_tests").insert(mkMock("published", 1)).select("id").single(),
      admin.from("mock_tests").insert(mkMock("draft", 1)).select("id").single(),
    ]);
    publishedMockId = pub!.id;
    draftMockId = draft!.id;

    anonClient = createClient(url, anon, { auth: { persistSession: false } });
    aliceClient = createClient(url, anon, { auth: { persistSession: false } });
    bobClient = createClient(url, anon, { auth: { persistSession: false } });
    await aliceClient.auth.signInWithPassword({ email: ALICE_EMAIL, password: PASSWORD });
    await bobClient.auth.signInWithPassword({ email: BOB_EMAIL, password: PASSWORD });

    // Alice opens an attempt + answers one question (through RLS as herself).
    const { data: attempt, error: aErr } = await aliceClient
      .from("mock_attempts")
      .insert({ mock_id: publishedMockId, user_id: aliceId, expires_at: FUTURE })
      .select("id")
      .single();
    expect(aErr).toBeNull();
    aliceAttemptId = attempt!.id;
    await aliceClient
      .from("attempt_answers")
      .insert({ attempt_id: aliceAttemptId, question_id: questionId, selected_label: "A" });
  });

  afterAll(async () => {
    // Deleting the mocks cascades attempts → answers.
    if (publishedMockId) await admin.from("mock_tests").delete().eq("id", publishedMockId);
    if (draftMockId) await admin.from("mock_tests").delete().eq("id", draftMockId);
    if (aliceId) await admin.auth.admin.deleteUser(aliceId);
    if (bobId) await admin.auth.admin.deleteUser(bobId);
  });

  it("a student reads their OWN attempt", async () => {
    const { data } = await aliceClient.from("mock_attempts").select("id").eq("id", aliceAttemptId);
    expect(data?.map((r) => r.id)).toContain(aliceAttemptId);
  });

  it("a student CANNOT read another student's attempt", async () => {
    const { data } = await bobClient.from("mock_attempts").select("id").eq("id", aliceAttemptId);
    expect(data ?? []).toHaveLength(0);
  });

  it("a student CANNOT read another student's answers", async () => {
    const { data } = await bobClient
      .from("attempt_answers")
      .select("attempt_id")
      .eq("attempt_id", aliceAttemptId);
    expect(data ?? []).toHaveLength(0);
  });

  it("a student cannot FORGE an attempt as another user", async () => {
    const { error } = await bobClient
      .from("mock_attempts")
      .insert({ mock_id: publishedMockId, user_id: aliceId, expires_at: FUTURE });
    expect(error).not.toBeNull(); // WITH CHECK user_id = auth.uid()
  });

  it("an attempt cannot be opened against a non-published mock", async () => {
    const { error } = await bobClient
      .from("mock_attempts")
      .insert({ mock_id: draftMockId, user_id: bobId, expires_at: FUTURE });
    expect(error).not.toBeNull();
  });

  it("anon cannot open an attempt", async () => {
    const { error } = await anonClient
      .from("mock_attempts")
      .insert({ mock_id: publishedMockId, user_id: aliceId, expires_at: FUTURE });
    expect(error).not.toBeNull();
  });

  it("anon CAN read the published mock but NOT the draft", async () => {
    const { data: pub } = await anonClient.from("mock_tests").select("id").eq("id", publishedMockId);
    expect(pub?.map((r) => r.id)).toContain(publishedMockId);
    const { data: draft } = await anonClient.from("mock_tests").select("id").eq("id", draftMockId);
    expect(draft ?? []).toHaveLength(0);
  });

  it("a student leaves + reads feedback on their OWN attempt", async () => {
    const { error } = await aliceClient
      .from("mock_feedback")
      .insert({ attempt_id: aliceAttemptId, user_id: aliceId, rating: "just_right", comment: "solid" });
    expect(error).toBeNull();
    const { data } = await aliceClient
      .from("mock_feedback")
      .select("rating, comment")
      .eq("attempt_id", aliceAttemptId)
      .maybeSingle();
    expect(data?.rating).toBe("just_right");
  });

  it("a student CANNOT leave feedback on another student's attempt", async () => {
    const { error } = await bobClient
      .from("mock_feedback")
      .insert({ attempt_id: aliceAttemptId, user_id: bobId, rating: "too_hard" });
    expect(error).not.toBeNull(); // WITH CHECK: attempt must belong to bob
  });

  it("a student CANNOT read another student's feedback", async () => {
    const { data } = await bobClient
      .from("mock_feedback")
      .select("rating")
      .eq("attempt_id", aliceAttemptId);
    expect(data ?? []).toHaveLength(0);
  });

  it("the rating CHECK rejects an unknown value", async () => {
    const { error } = await aliceClient
      .from("mock_feedback")
      .upsert(
        { attempt_id: aliceAttemptId, user_id: aliceId, rating: "meh" },
        { onConflict: "attempt_id" }
      );
    expect(error).not.toBeNull(); // mock_feedback rating CHECK
  });

  it("anon cannot leave feedback", async () => {
    const { error } = await anonClient
      .from("mock_feedback")
      .insert({ attempt_id: aliceAttemptId, user_id: aliceId, rating: "too_easy" });
    expect(error).not.toBeNull();
  });

  it("a user JWT cannot publish a mock (writes are service-role only)", async () => {
    const { error } = await aliceClient.from("mock_tests").insert({
      id: randomUUID(),
      slug: `mock-rls-forge-${RUN_ID}`,
      exam_id: (await admin.from("exams").select("id").limit(1).single()).data!.id,
      paper_code: "maths",
      pyq_year: 2099,
      title: "forged",
      duration_secs: 9000,
      marking: { correct: 1, wrong: 0 },
      total_questions: 1,
      total_marks: 1,
      status: "published",
    });
    expect(error).not.toBeNull(); // no INSERT policy → RLS denies
  });
});
