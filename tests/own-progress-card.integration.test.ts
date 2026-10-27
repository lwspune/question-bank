/**
 * get_own_progress_card (migration 0191) against the TEST Supabase project,
 * called as a real signed-in student, so it meets the RLS a browser would.
 * V's "How's my progress" card reads its week, chapters and notes from it.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { mustSignIn } from "./helpers/fixture";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const EMAIL = `progress_card_${STAMP}@test.local`;
const OTHER_EMAIL = `progress_card_other_${STAMP}@test.local`;
const PASSWORD = `Pw-${STAMP}-card`;
const DAY_MS = 24 * 60 * 60 * 1000;

type Card = {
  exam_id: string | null;
  exam_name: string | null;
  week: { answered: number; right: number };
  prev: { answered: number; right: number };
  chapters: { id: string; name: string; subject: string; answered: number }[];
  notes: string[];
};

describe.skipIf(!HAS_ENV)("get_own_progress_card", () => {
  let admin: SupabaseClient;
  let student: SupabaseClient;
  let userId = "";
  let otherId = "";
  let examId = "";
  let examName = "";
  let chapterId = "";
  let examChapters = 0;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

    // Two questions of one chapter from the seeded bank.
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
    chapterId = pair[0];
    const [q1, q2] = pair[1];
    examId = q1.exam_id;
    const { data: exam } = await admin.from("exams").select("name").eq("id", examId).single();
    examName = exam!.name as string;
    const { count } = await admin
      .from("chapters")
      .select("id, subjects!inner(exam_id)", { count: "exact", head: true })
      .eq("subjects.exam_id", examId);
    examChapters = count ?? 0;

    const a = await admin.auth.admin.createUser({ email: EMAIL, password: PASSWORD, email_confirm: true });
    if (a.error) throw new Error(a.error.message);
    userId = a.data.user!.id;
    const b = await admin.auth.admin.createUser({ email: OTHER_EMAIL, password: PASSWORD, email_confirm: true });
    if (b.error) throw new Error(b.error.message);
    otherId = b.data.user!.id;

    const now = Date.now();
    const at = (msAgo: number) => new Date(now - msAgo).toISOString();
    const row = (user: string, kind: string, ref: string | null, metadata: Record<string, unknown>, created_at: string) => ({
      user_id: user,
      kind,
      ref_id: ref,
      ref_kind: ref ? "question" : null,
      metadata,
      created_at,
    });
    const { error } = await admin.from("user_activity").insert([
      // This week: q1 picked twice in the bank (1 right), q2 recovered in the drill.
      row(userId, "question_practiced", q1.id, { surface: "bank", chose: "A", correct: true }, at(0)),
      row(userId, "question_practiced", q1.id, { surface: "bank", chose: "B", correct: false }, at(0)),
      row(userId, "answer_correct", q2.id, { surface: "drill", chose: "C" }, at(3 * DAY_MS)),
      // The drill-fuel row beside a wrong BANK pick: counted by its reveal row already.
      row(userId, "answer_wrong", q1.id, { surface: "bank", chose: "B" }, at(0)),
      // A written answer read without picking: not an answer.
      row(userId, "question_practiced", q2.id, { surface: "board" }, at(0)),
      // The week before: one wrong pick.
      row(userId, "question_practiced", q2.id, { surface: "bank", chose: "B", correct: false }, at(9 * DAY_MS)),
      // Notes: a chapter page this week, an exam hub (no chapter), and one too old to count.
      row(userId, "surface_viewed", null, { surface: "notes", path: "/notes/nda-maths/statistics/mean" }, at(0)),
      row(userId, "surface_viewed", null, { surface: "notes", path: "/notes/nda" }, at(0)),
      row(userId, "surface_viewed", null, { surface: "notes", path: "/notes/nda-maths/vectors" }, at(40 * DAY_MS)),
      // Someone else's practice: never counted.
      row(otherId, "question_practiced", q1.id, { surface: "bank", chose: "A", correct: true }, at(0)),
    ]);
    if (error) throw new Error(error.message);

    student = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    await mustSignIn("progress card student", student, { email: EMAIL, password: PASSWORD });
  });

  afterAll(async () => {
    if (!admin) return;
    for (const id of [userId, otherId].filter(Boolean)) {
      await admin.from("user_activity").delete().eq("user_id", id);
      await admin.auth.admin.deleteUser(id);
    }
  });

  async function card(exam: string | null): Promise<Card> {
    const { data, error } = await student.rpc("get_own_progress_card", { p_exam_id: exam });
    if (error) throw new Error(error.message);
    return data as Card;
  }

  it("counts this week's and last week's answers in the exam by 0165's rule", async () => {
    const c = await card(examId);
    expect(c.exam_id).toBe(examId);
    expect(c.exam_name).toBe(examName);
    expect(c.week).toEqual({ answered: 3, right: 2 });
    expect(c.prev).toEqual({ answered: 1, right: 0 });
  });

  it("lists every chapter of the exam, with the distinct questions answered in each", async () => {
    const c = await card(examId);
    expect(c.chapters.length).toBe(examChapters);
    expect(c.chapters.find((x) => x.id === chapterId)?.answered).toBe(2);
    expect(c.chapters.filter((x) => x.id !== chapterId).every((x) => x.answered === 0)).toBe(true);
  });

  it("gives the notes chapters opened in the last 30 days, each once", async () => {
    expect((await card(examId)).notes).toEqual(["nda-maths/statistics"]);
  });

  it("with no exam asked, picks the one the student practises most", async () => {
    expect((await card(null)).exam_id).toBe(examId);
  });

  it("is refused to a signed-out caller", async () => {
    const anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    });
    const { error } = await anon.rpc("get_own_progress_card", { p_exam_id: examId });
    expect(error?.message).toMatch(/permission denied/i);
  });
});
