/**
 * get_own_day_card (migration 0262) against the TEST Supabase project, called
 * as a real signed-in student, so it meets the RLS a browser would. V's "Your
 * day" card reads its last-visit answers from it (lib/chat/dayCard.ts).
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { mustSignIn } from "./helpers/fixture";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = testRunId();
const EMAIL = `day_card_${STAMP}@test.local`;
const OTHER_EMAIL = `day_card_other_${STAMP}@test.local`;
const PASSWORD = `Pw-${STAMP}-day`;
const DAY_MS = 24 * 60 * 60 * 1000;
const IST_MS = 5.5 * 60 * 60 * 1000;

type DayRow = { day: string; answered: number; right: number; top_chapter: string | null; top_answered: number };
type Card = { exam_id: string | null; exam_name: string | null; days: DayRow[] };

/** Midnight today in India, as epoch ms. */
function istTodayStart(): number {
  const ist = Date.now() + IST_MS;
  return ist - (ist % DAY_MS) - IST_MS;
}
const dayKey = (ms: number) => new Date(ms + IST_MS).toISOString().slice(0, 10);

describe.skipIf(!HAS_ENV)("get_own_day_card", () => {
  let admin: SupabaseClient;
  let student: SupabaseClient;
  let userId = "";
  let otherId = "";
  let examId = "";
  let examName = "";
  let chapterName = "";
  const today = istTodayStart();

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

    const { data: qs, error: qErr } = await admin
      .from("questions")
      .select("id, exam_id, chapter_id")
      .eq("visibility", "PUBLIC")
      .not("chapter_id", "is", null)
      .limit(200);
    if (qErr) throw new Error(qErr.message);
    const byChapter = new Map<string, { id: string; exam_id: string }[]>();
    for (const q of qs ?? []) byChapter.set(q.chapter_id as string, [...(byChapter.get(q.chapter_id as string) ?? []), q as { id: string; exam_id: string }]);
    const pair = [...byChapter.entries()].find(([, list]) => list.length >= 2);
    if (!pair) throw new Error("the test bank needs a chapter with two PUBLIC questions");
    const [q1, q2] = pair[1];
    examId = q1.exam_id;
    const { data: exam } = await admin.from("exams").select("name").eq("id", examId).single();
    examName = exam!.name as string;
    const { data: ch } = await admin.from("chapters").select("name").eq("id", pair[0]).single();
    chapterName = ch!.name as string;

    const a = await admin.auth.admin.createUser({ email: EMAIL, password: PASSWORD, email_confirm: true });
    if (a.error) throw new Error(a.error.message);
    userId = a.data.user!.id;
    const b = await admin.auth.admin.createUser({ email: OTHER_EMAIL, password: PASSWORD, email_confirm: true });
    if (b.error) throw new Error(b.error.message);
    otherId = b.data.user!.id;

    const at = (ms: number) => new Date(ms).toISOString();
    const row = (user: string, kind: string, ref: string, metadata: Record<string, unknown>, created_at: string) => ({
      user_id: user,
      kind,
      ref_id: ref,
      ref_kind: "question",
      metadata,
      created_at,
    });
    const { error } = await admin.from("user_activity").insert([
      // Yesterday (India): two bank picks (1 right) and a drill fix. 23:30 IST still counts as yesterday.
      row(userId, "question_practiced", q1.id, { surface: "bank", chose: "A", correct: true }, at(today - DAY_MS + 2 * 3600_000)),
      row(userId, "question_practiced", q2.id, { surface: "bank", chose: "B", correct: false }, at(today - DAY_MS + 3 * 3600_000)),
      row(userId, "answer_wrong", q2.id, { surface: "bank", chose: "B" }, at(today - DAY_MS + 3 * 3600_000)),
      row(userId, "answer_correct", q2.id, { surface: "drill", chose: "C" }, at(today - 30 * 60_000)),
      // Three days ago: one wrong pick.
      row(userId, "question_practiced", q1.id, { surface: "bank", chose: "B", correct: false }, at(today - 3 * DAY_MS + 3600_000)),
      // Today: not part of the card, which is about the days before.
      row(userId, "question_practiced", q1.id, { surface: "bank", chose: "A", correct: true }, at(today + 60_000)),
      // Older than the lookback.
      row(userId, "question_practiced", q1.id, { surface: "bank", chose: "A", correct: true }, at(today - 40 * DAY_MS)),
      // Someone else's practice: never counted.
      row(otherId, "question_practiced", q1.id, { surface: "bank", chose: "A", correct: true }, at(today - DAY_MS + 3600_000)),
    ]);
    if (error) throw new Error(error.message);

    student = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    await mustSignIn("day card student", student, { email: EMAIL, password: PASSWORD });
  });

  afterAll(async () => {
    if (!admin) return;
    for (const id of [userId, otherId].filter(Boolean)) {
      await admin.from("user_activity").delete().eq("user_id", id);
      await admin.auth.admin.deleteUser(id);
    }
  });

  async function card(exam: string | null): Promise<Card> {
    const { data, error } = await student.rpc("get_own_day_card", { p_exam_id: exam });
    if (error) throw new Error(error.message);
    return data as Card;
  }

  it("gives each India day before today its answers and its top chapter", async () => {
    const c = await card(examId);
    expect(c.exam_id).toBe(examId);
    expect(c.exam_name).toBe(examName);
    expect(c.days).toEqual([
      { day: dayKey(today - 3 * DAY_MS), answered: 1, right: 0, top_chapter: chapterName, top_answered: 1 },
      { day: dayKey(today - DAY_MS), answered: 3, right: 2, top_chapter: chapterName, top_answered: 3 },
    ]);
  });

  it("picks the exam with the most answers in the window when none is given", async () => {
    const c = await card(null);
    expect(c.exam_id).toBe(examId);
    expect(c.days.length).toBe(2);
  });

  it("reads only the caller's own rows", async () => {
    const other = await card(examId);
    expect(other.days.reduce((n, d) => n + d.answered, 0)).toBe(4);
  });

  it("is refused to a signed-out caller", async () => {
    const anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    });
    const { error } = await anon.rpc("get_own_day_card", { p_exam_id: examId });
    expect(error).not.toBeNull();
  });
});
