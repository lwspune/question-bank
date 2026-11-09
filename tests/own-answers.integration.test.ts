/**
 * A student's answer rows are read through THEIR OWN attempts (TECH_DEBT_SPEC.md 3.2 part b).
 *
 * WHY: /drill's "already met" list and the practice builder's "skip questions I've answered"
 * read `attempt_answers` with no filter and left the access rule to drop other students' rows,
 * so Postgres read the whole table (69,104 rows on 2026-11-05) for every call: 604 ms mean in
 * pg_stat_statements. Filtering by the student's own attempt ids reads only their rows
 * (measured 16.6 -> 7.7 ms warm for the heaviest student, after migration 0218).
 *
 * Runs on the test project; skipped when its settings are missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { mustSignIn } from "./helpers/fixture";
import { readOwnAnswerRows } from "@/lib/mocks/ownAnswers";
import { loadSeenQuestionIds } from "@/lib/drill/query";
import { readAnsweredQuestionIds } from "@/lib/practiceTests/seen";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "own-answers-password-1234";
const RUN_ID = testRunId();
const ALICE_EMAIL = `own-answers-alice-${RUN_ID}@test.local`;
const BOB_EMAIL = `own-answers-bob-${RUN_ID}@test.local`;
const FUTURE = new Date(Date.now() + 3600_000).toISOString();

describe.skipIf(!HAS_ENV)("a student's own answer rows", () => {
  let admin: SupabaseClient;
  let alice: SupabaseClient;
  let bob: SupabaseClient;
  let aliceId = "";
  let bobId = "";
  const mockIds: string[] = [];
  let q: string[] = [];

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

    const [{ data: a }, { data: b }] = await Promise.all([
      admin.auth.admin.createUser({ email: ALICE_EMAIL, password: PASSWORD, email_confirm: true }),
      admin.auth.admin.createUser({ email: BOB_EMAIL, password: PASSWORD, email_confirm: true }),
    ]);
    aliceId = a.user!.id;
    bobId = b.user!.id;

    const { data: exam } = await admin.from("exams").select("id").order("name").limit(1).single();
    // Oldest PUBLIC rows: stable seed questions, never another run's transient fixture.
    const { data: qs } = await admin.from("questions").select("id").eq("visibility", "PUBLIC").order("created_at", { ascending: true }).limit(5);
    q = (qs ?? []).map((r) => r.id as string);
    expect(q).toHaveLength(5);

    for (let i = 0; i < 4; i++) {
      const { data: m, error } = await admin
        .from("mock_tests")
        .insert({
          id: randomUUID(),
          slug: `own-answers-${i}-${RUN_ID}`,
          exam_id: exam!.id,
          paper_code: "maths",
          pyq_year: 2099,
          title: `Own answers ${i} ${RUN_ID}`,
          duration_secs: 600,
          marking: { correct: 1, wrong: 0 },
          sections: [{ key: "s", label: "S", count: 1 }],
          questions: [{ position: 1, questionId: q[i], sectionKey: "s", marks: 1, negMarks: 0 }],
          total_questions: 1,
          total_marks: 1,
          status: "published",
        })
        .select("id")
        .single();
      expect(error).toBeNull();
      mockIds.push(m!.id as string);
    }

    alice = createClient(url, anon, { auth: { persistSession: false } });
    bob = createClient(url, anon, { auth: { persistSession: false } });
    await mustSignIn(ALICE_EMAIL, alice, { email: ALICE_EMAIL, password: PASSWORD });
    await mustSignIn(BOB_EMAIL, bob, { email: BOB_EMAIL, password: PASSWORD });

    const attempt = async (c: SupabaseClient, userId: string, mockId: string) => {
      const { data, error } = await c.from("mock_attempts").insert({ mock_id: mockId, user_id: userId, expires_at: FUTURE }).select("id").single();
      expect(error).toBeNull();
      return data!.id as string;
    };
    // Alice: three attempts. q0 and q1 answered, q2 only FLAGGED (reached, not answered).
    const a0 = await attempt(alice, aliceId, mockIds[0]);
    const a1 = await attempt(alice, aliceId, mockIds[1]);
    const a2 = await attempt(alice, aliceId, mockIds[2]);
    const rows: Record<string, string | boolean>[] = [
      { attempt_id: a0, question_id: q[0], selected_label: "A" },
      { attempt_id: a1, question_id: q[1], selected_label: "B" },
      { attempt_id: a2, question_id: q[2], is_flagged: true },
    ];
    for (const row of rows) {
      const { error } = await alice.from("attempt_answers").insert(row);
      expect(error).toBeNull();
    }
    // Bob: one attempt answering q3. Alice must never see it.
    const b0 = await attempt(bob, bobId, mockIds[3]);
    const { error } = await bob.from("attempt_answers").insert({ attempt_id: b0, question_id: q[3], selected_label: "C" });
    expect(error).toBeNull();
  });

  afterAll(async () => {
    for (const id of mockIds) await admin.from("mock_tests").delete().eq("id", id);
    if (aliceId) await admin.auth.admin.deleteUser(aliceId);
    if (bobId) await admin.auth.admin.deleteUser(bobId);
  });

  it("readOwnAnswerRows returns every row of the student's attempts, across id chunks", async () => {
    const rows = await readOwnAnswerRows<{ question_id: string }>(alice, aliceId, "question_id", { chunk: 1 });
    expect(rows.map((r) => r.question_id).sort()).toEqual([q[0], q[1], q[2]].sort());
  });

  it("answeredOnly drops a flag-only row", async () => {
    const rows = await readOwnAnswerRows<{ question_id: string }>(alice, aliceId, "question_id", { answeredOnly: true });
    expect(rows.map((r) => r.question_id).sort()).toEqual([q[0], q[1]].sort());
  });

  it("drill's seen set holds the student's reached questions and never another student's", async () => {
    const seen = await loadSeenQuestionIds(alice, aliceId);
    for (const id of [q[0], q[1], q[2]]) expect(seen.has(id)).toBe(true);
    expect(seen.has(q[3])).toBe(false);
  });

  it("the practice builder's answered set holds answered questions only", async () => {
    const answered = await readAnsweredQuestionIds(alice, aliceId);
    expect([...answered].sort()).toEqual([q[0], q[1]].sort());
  });

  it("a student with no attempts gets nothing, without error", async () => {
    const { data: c } = await admin.auth.admin.createUser({ email: `own-answers-carol-${RUN_ID}@test.local`, password: PASSWORD, email_confirm: true });
    try {
      expect(await readOwnAnswerRows(alice, c.user!.id, "question_id")).toEqual([]);
    } finally {
      await admin.auth.admin.deleteUser(c.user!.id);
    }
  });
});
