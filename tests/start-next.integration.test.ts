/**
 * "Start next" reads (migration 0242), against the TEST Supabase project.
 *
 *  - get_chapter_paper_weights: each chapter's questions and marks per
 *    published past paper, from the papers' own question lists and marks,
 *    readable signed out (the papers and their questions are public).
 *  - get_started_chapter_ids: the chapters a student has answered anything
 *    in, read with their own login; another student's id returns nothing (RLS).
 *
 * Two fixture papers on a paper code of this run alone, so another session's
 * fixtures on the shared test project cannot move the numbers.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { randomUUID } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { mustSignIn } from "./helpers/fixture";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN = testRunId();
const PAPER = `startnext-${RUN}`;

type WeightRow = { chapter_id: string; paper_code: string; papers: number; q_per_paper: number; marks_per_paper: number; paper_marks: number };

describe.skipIf(!HAS_ENV)("Start next reads (0242)", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;
  let client: SupabaseClient;
  const users: string[] = [];
  const mocks: string[] = [];
  let examId = "";
  let chapterA = "";
  let chapterB = "";
  let qA1 = "";
  let me = "";
  let other = "";

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anon = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });

    // Three PUBLIC questions of one exam, two in one chapter and one in another.
    const { data: rows, error } = await admin
      .from("questions")
      .select("id, exam_id, chapter_id")
      .eq("visibility", "PUBLIC")
      .limit(200);
    if (error) throw new Error(error.message);
    const byExam = new Map<string, { id: string; chapter_id: string }[]>();
    for (const r of (rows ?? []) as { id: string; exam_id: string; chapter_id: string }[]) {
      byExam.set(r.exam_id, [...(byExam.get(r.exam_id) ?? []), r]);
    }
    for (const [exam, qs] of byExam) {
      const chapters = [...new Set(qs.map((q) => q.chapter_id))];
      const twice = chapters.find((c) => qs.filter((q) => q.chapter_id === c).length >= 2);
      const other = chapters.find((c) => c !== twice);
      if (twice && other) {
        examId = exam;
        chapterA = twice;
        chapterB = other;
        break;
      }
    }
    if (!examId) throw new Error("need an exam with two chapters of PUBLIC questions in the test project");
    const all = byExam.get(examId)!;
    const [a1, a2] = all.filter((q) => q.chapter_id === chapterA);
    const b1 = all.find((q) => q.chapter_id === chapterB)!;
    qA1 = a1.id;

    // Paper 1: A, A, B. Paper 2: A, B. Each question 2.5 marks; each paper out of 10.
    const paper = (n: number, items: string[]) => ({
      id: randomUUID(),
      slug: `${PAPER}-${n}`,
      exam_id: examId,
      paper_code: PAPER,
      pyq_year: 2099,
      title: `Start next ${RUN} ${n}`,
      duration_secs: 600,
      marking: { correct: 2.5, wrong: 0 },
      sections: [{ key: "s", label: "S", count: items.length }],
      questions: items.map((id, i) => ({ position: i + 1, questionId: id, sectionKey: "s", marks: 2.5, negMarks: 0 })),
      total_questions: items.length,
      total_marks: 10,
      status: "published",
      source: "pyq",
      scope: "full",
    });
    for (const p of [paper(1, [a1.id, a2.id, b1.id]), paper(2, [a1.id, b1.id])]) {
      const { error: e } = await admin.from("mock_tests").insert(p);
      if (e) throw new Error(`fixture paper: ${e.message}`);
      mocks.push(p.id);
    }

    const mk = async (tag: string) => {
      const c = await admin.auth.admin.createUser({ email: `startnext_${tag}_${RUN}@test.local`, password: `Pw-${RUN}-${tag}`, email_confirm: true });
      if (c.error) throw new Error(c.error.message);
      users.push(c.data.user!.id);
      return c.data.user!.id;
    };
    me = await mk("me");
    other = await mk("other");
    client = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    await mustSignIn("start-next student", client, { email: `startnext_me_${RUN}@test.local`, password: `Pw-${RUN}-me` });

    // I answered one chapter-A question in the bank; a No to V is not an answer.
    const { error: insErr } = await admin.from("user_activity").insert([
      { user_id: me, kind: "question_practiced", ref_id: qA1, ref_kind: "question", metadata: { surface: "bank" } },
      { user_id: me, kind: "v_not_understood", ref_id: b1.id, ref_kind: "question", metadata: { surface: "v" } },
      { user_id: other, kind: "question_practiced", ref_id: b1.id, ref_kind: "question", metadata: { surface: "bank" } },
    ]);
    if (insErr) throw new Error(insErr.message);
  });

  afterAll(async () => {
    for (const id of mocks) await admin.from("mock_tests").delete().eq("id", id);
    for (const id of users) {
      await admin.from("user_activity").delete().eq("user_id", id);
      await admin.auth.admin.deleteUser(id);
    }
  });

  it("weighs each chapter from the papers' own questions and marks, signed out", async () => {
    const { data, error } = await anon.rpc("get_chapter_paper_weights", { p_exam_id: examId });
    if (error) throw new Error(error.message);
    const mine = ((data ?? []) as WeightRow[]).filter((r) => r.paper_code === PAPER);
    const a = mine.find((r) => r.chapter_id === chapterA)!;
    const b = mine.find((r) => r.chapter_id === chapterB)!;
    // A: 3 questions over 2 papers = 1.5 a paper, 3.75 of 10 marks. B: 2 over 2 = 1, 2.5 marks.
    expect(Number(a.papers)).toBe(2);
    expect(Number(a.q_per_paper)).toBe(1.5);
    expect(Number(a.marks_per_paper)).toBe(3.75);
    expect(Number(a.paper_marks)).toBe(10);
    expect(Number(b.q_per_paper)).toBe(1);
    expect(Number(b.marks_per_paper)).toBe(2.5);
  });

  it("names the chapters a student has answered in, from their own rows only", async () => {
    const { data, error } = await client.rpc("get_started_chapter_ids", { p_user_id: me, p_exam_id: examId });
    if (error) throw new Error(error.message);
    const ids = ((data ?? []) as (string | { get_started_chapter_ids: string })[]).map((r) => (typeof r === "string" ? r : r.get_started_chapter_ids));
    expect(ids).toContain(chapterA);
    // A No to V answered nothing, and another student's answer is not mine.
    expect(ids).not.toContain(chapterB);
  });

  it("returns nothing for another student's id: RLS keeps a student to their own rows", async () => {
    const { data, error } = await client.rpc("get_started_chapter_ids", { p_user_id: other, p_exam_id: examId });
    if (error) throw new Error(error.message);
    expect(data ?? []).toEqual([]);
  });
});
