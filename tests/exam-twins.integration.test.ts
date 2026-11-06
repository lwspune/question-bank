/**
 * Exam twins (migration 0220): the rules the DATABASE enforces, and the loader
 * the board reader uses.
 *
 * The line under a board question says "Asked in NDA 2 2023". That is a claim
 * about a real exam, so whatever writes a link, the database must refuse one
 * that points at a practice question, a private question or a question of the
 * same exam, and a reader may only see a link whose two questions are public.
 *
 * The test project seeds MHT-CET and NDA past questions only, so an MHT-CET
 * question plays the board side here. Fixture copies (practice, private) are
 * inserted and removed by this file.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { getTwinsForQuestions } from "@/lib/crossExam/query";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

type Row = Record<string, unknown> & { id: string; exam_id: string };

describe.skipIf(!HAS_ENV)("exam twins", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;
  let board: Row; // an MHT-CET question, standing in for a board question
  let nda: Row; // an NDA past question
  let nda2: Row; // another NDA past question
  const fixtures: string[] = [];

  /** A copy of a seed question with its own id and hash, for rows the test may change. */
  async function copy(of: Row, over: Record<string, unknown>): Promise<Row> {
    const { id: _id, search_vector: _sv, created_at: _c, ...rest } = of;
    const row = { ...rest, id: randomUUID(), content_hash: `exam-twins-test-${randomUUID()}`, ...over };
    const { error } = await admin.from("questions").insert(row);
    if (error) throw new Error(`fixture question: ${error.message}`);
    fixtures.push(row.id as string);
    return row as Row;
  }

  const link = (source: string, target: string, kind = "numbers") =>
    admin.from("exam_twins").insert({
      source_question_id: source,
      target_question_id: target,
      kind,
      why: "both: inverse of a 3x3 numeric matrix",
      review_run: "test",
    });

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    });
    const pick = async (exam: string, n: number) => {
      const { data: ex } = await admin.from("exams").select("id").eq("name", exam).single();
      const { data } = await admin
        .from("questions")
        .select("*")
        .eq("exam_id", ex!.id)
        .eq("visibility", "PUBLIC")
        .eq("question_kind", "pyq")
        .not("pyq_year", "is", null)
        .limit(n);
      if (!data || data.length < n) throw new Error(`need ${n} PUBLIC ${exam} past questions in the test project`);
      return data as Row[];
    };
    [board] = await pick("MHT-CET", 1);
    [nda, nda2] = await pick("NDA", 2);
    // Each test writes its own pairs; start clean in case a killed run left one.
    await admin.from("exam_twins").delete().in("source_question_id", [board.id, nda.id]);
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("exam_twins").delete().in("source_question_id", [board.id, nda.id, ...fixtures]);
    if (fixtures.length) await admin.from("questions").delete().in("id", fixtures);
  });

  it("stores a link from one exam's question to another exam's past question", async () => {
    const { error } = await link(board.id, nda.id);
    expect(error).toBeNull();
  });

  it("refuses the same pair twice", async () => {
    const { error } = await link(board.id, nda.id, "exact");
    expect(error?.code).toBe("23505");
  });

  it("refuses a kind it does not know", async () => {
    const { error } = await link(board.id, nda2.id, "close");
    expect(error?.code).toBe("23514");
  });

  it("refuses a link to a practice question: only real past papers count", async () => {
    const practice = await copy(nda2, { question_kind: "practice" });
    const { error } = await link(board.id, practice.id);
    expect(error?.message).toMatch(/past/i);
  });

  it("refuses a link between two questions of the same exam", async () => {
    const { error } = await link(nda.id, nda2.id);
    expect(error?.message).toMatch(/same exam/i);
  });

  it("refuses a link to or from a private question", async () => {
    const hidden = await copy(nda2, { visibility: "PRIVATE" });
    const { error } = await link(board.id, hidden.id);
    expect(error?.message).toMatch(/public/i);
  });

  it("lets anyone read a link, and nobody but the service role write one", async () => {
    const { data } = await anon.from("exam_twins").select("kind").eq("source_question_id", board.id);
    expect(data).toEqual([{ kind: "numbers" }]);
    const { error } = await anon.from("exam_twins").insert({
      source_question_id: board.id,
      target_question_id: nda2.id,
      kind: "similar",
      why: "x",
      review_run: "x",
    });
    expect(error).not.toBeNull();
  });

  it("hides a link once either question is made private", async () => {
    const target = await copy(nda2, {});
    expect((await link(board.id, target.id)).error).toBeNull();
    await admin.from("questions").update({ visibility: "PRIVATE" }).eq("id", target.id);
    const { data } = await anon
      .from("exam_twins")
      .select("target_question_id")
      .eq("source_question_id", board.id)
      .eq("target_question_id", target.id);
    expect(data).toEqual([]);
  });

  it("drops a link when its question is deleted", async () => {
    const target = await copy(nda2, {});
    expect((await link(board.id, target.id)).error).toBeNull();
    await admin.from("questions").delete().eq("id", target.id);
    const { data } = await admin.from("exam_twins").select("kind").eq("target_question_id", target.id);
    expect(data).toEqual([]);
  });

  it("loads a chapter's links with the paper named and the options, never the answer", async () => {
    const twins = await getTwinsForQuestions(anon, [board.id, "00000000-0000-0000-0000-000000000000"]);
    const links = twins.links[board.id];
    expect(links).toHaveLength(1);
    expect(links[0]).toMatchObject({ targetId: nda.id, kind: "numbers", examName: "NDA", examLabel: "NDA" });
    // The test seed carries no month, so the paper falls back to "NDA <year>".
    expect(links[0].paper).toMatch(/^NDA( [12])? \d{4}$/);
    const target = twins.targets[nda.id];
    expect(target.text).toBe(nda.text);
    expect(target.practiseHref).toBe(
      `/browse?examId=${nda.exam_id}&subjectId=${nda.subject_id}&chapterIds=${nda.chapter_id}&kind=pyq`
    );
    expect(JSON.stringify(target)).not.toMatch(/is_correct|isCorrect/);
    expect(twins.links["00000000-0000-0000-0000-000000000000"]).toBeUndefined();
  });
});
