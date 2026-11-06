/**
 * get_own_practice_evidence (migration 0221) against the TEST Supabase
 * project, called as a real signed-in student, so it meets the RLS a browser
 * would.
 *
 * One row per question the student has ANSWERED in practice: the latest
 * graded answer on the bank, board, question of the day or drill. A plain
 * reveal, the drill-fuel row a bank pick writes beside itself, a mock's own
 * answer_wrong and another student's rows are not evidence here.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { mustSignIn, SIGN_IN_TEST_TIMEOUT_MS } from "./helpers/fixture";
import { fetchOwnPracticeEvidence } from "@/lib/performance/practiceQuery";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const EMAIL = `practice_evidence_${STAMP}@test.local`;
const OTHER_EMAIL = `practice_evidence_other_${STAMP}@test.local`;
const PASSWORD = `Pw-${STAMP}-evidence`;
const DAY_MS = 24 * 60 * 60 * 1000;

type Q = { id: string; exam: string; subject: string; chapter: string; subtopic: string };

describe.skipIf(!HAS_ENV)("get_own_practice_evidence", () => {
  let admin: SupabaseClient;
  let student: SupabaseClient;
  let userId = "";
  let otherId = "";
  let qs: Q[] = [];

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

    // Five real PUBLIC MCQs with a full taxonomy, from the seeded test bank.
    const { data, error: qErr } = await admin
      .from("questions")
      .select("id, exams(name), subjects(name), chapters(name), subtopics(name)")
      .eq("visibility", "PUBLIC")
      .eq("question_format", "mcq")
      .not("subtopic_id", "is", null)
      .limit(5);
    if (qErr) throw new Error(qErr.message);
    const name = (v: unknown) => (Array.isArray(v) ? v[0]?.name : (v as { name?: string } | null)?.name) ?? "";
    qs = (data ?? []).map((r) => ({
      id: r.id as string,
      exam: name(r.exams),
      subject: name(r.subjects),
      chapter: name(r.chapters),
      subtopic: name(r.subtopics),
    }));
    if (qs.length < 5) throw new Error(`test bank has only ${qs.length} usable questions`);

    const a = await admin.auth.admin.createUser({ email: EMAIL, password: PASSWORD, email_confirm: true });
    if (a.error) throw new Error(a.error.message);
    userId = a.data.user!.id;
    const b = await admin.auth.admin.createUser({ email: OTHER_EMAIL, password: PASSWORD, email_confirm: true });
    if (b.error) throw new Error(b.error.message);
    otherId = b.data.user!.id;

    const now = Date.now();
    const at = (days: number) => new Date(now - days * DAY_MS).toISOString();
    const row = (user: string, kind: string, q: string, metadata: Record<string, unknown>, created_at: string) => ({
      user_id: user,
      kind,
      ref_id: q,
      ref_kind: "question",
      metadata,
      created_at,
    });
    const [q1, q2, q3, q4, q5] = qs.map((q) => q.id);
    const { error } = await admin.from("user_activity").insert([
      // q1: missed in the bank, then fixed in the drill. The drill is latest.
      row(userId, "question_practiced", q1, { surface: "bank", chose: "B", correct: false }, at(5)),
      row(userId, "answer_wrong", q1, { surface: "bank", chose: "B" }, at(5)),
      row(userId, "answer_correct", q1, { surface: "drill", chose: "A" }, at(1)),
      // q2: right in the bank; a later plain reveal is not an answer.
      row(userId, "question_practiced", q2, { surface: "bank", chose: "A", correct: true }, at(3)),
      row(userId, "question_practiced", q2, { surface: "guide" }, at(1)),
      // q3: wrong in the board reader.
      row(userId, "question_practiced", q3, { surface: "board", chose: "C", correct: false }, at(2)),
      // q4: only read, and missed in a mock (the mock's own row has no surface).
      row(userId, "question_practiced", q4, { surface: "board" }, at(2)),
      row(userId, "answer_wrong", q4, {}, at(2)),
      // q5: someone else's answer.
      row(otherId, "question_practiced", q5, { surface: "bank", chose: "A", correct: true }, at(1)),
    ]);
    if (error) throw new Error(error.message);

    student = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    await mustSignIn("practice evidence student", student, { email: EMAIL, password: PASSWORD });
  });

  afterAll(async () => {
    if (!admin) return;
    for (const id of [userId, otherId].filter(Boolean)) {
      await admin.from("user_activity").delete().eq("user_id", id);
      await admin.auth.admin.deleteUser(id);
    }
  });

  it("returns one row per question answered, with its latest verdict", async () => {
    const ev = await fetchOwnPracticeEvidence(student);
    const byQ = new Map(ev.rows.map((r) => [r.q, r]));
    expect([...byQ.keys()].sort()).toEqual([qs[0].id, qs[1].id, qs[2].id].sort());
    expect(byQ.get(qs[0].id)!.ok).toBe(true);
    expect(byQ.get(qs[1].id)!.ok).toBe(true);
    expect(byQ.get(qs[2].id)!.ok).toBe(false);
  });

  it("names each question's exam, subject, chapter and subtopic through its dims", async () => {
    const ev = await fetchOwnPracticeEvidence(student);
    for (const q of qs.slice(0, 3)) {
      const r = ev.rows.find((x) => x.q === q.id)!;
      expect(ev.dims.exams[r.e]).toBe(q.exam);
      expect(ev.dims.subjects[r.s]).toBe(q.subject);
      expect(ev.dims.chapters[r.c]).toBe(q.chapter);
      expect(ev.dims.subtopics[r.t]).toBe(q.subtopic);
    }
  });

  it("dates the latest answer, not the first", async () => {
    const ev = await fetchOwnPracticeEvidence(student);
    const r = ev.rows.find((x) => x.q === qs[0].id)!;
    expect(Date.now() - Date.parse(r.at)).toBeLessThan(2 * DAY_MS);
  });

  it("shows another student only their own answers", async () => {
    const other = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    });
    await mustSignIn("practice evidence other", other, { email: OTHER_EMAIL, password: PASSWORD });
    // The other student has one bank answer of their own; it is theirs alone.
    const ev = await fetchOwnPracticeEvidence(other);
    expect(ev.rows.map((r) => r.q)).toEqual([qs[4].id]);
  }, SIGN_IN_TEST_TIMEOUT_MS);

  it("refuses a student who asks for someone else's evidence by id", async () => {
    const { error } = await student.rpc("get_student_practice_evidence", { p_user_id: otherId });
    expect(error?.message ?? "").toMatch(/permission denied/i);
  });

  it("is refused to a signed-out caller", async () => {
    const anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    });
    await expect(fetchOwnPracticeEvidence(anon)).rejects.toThrow(/permission denied/i);
  });
});
