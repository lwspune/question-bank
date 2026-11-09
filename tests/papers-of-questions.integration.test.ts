/**
 * papers_of_questions (migration 0148, rewritten in 0238 for speed): which
 * published past paper each question sits in, for the source pill on /browse
 * and the /questions landing pages. Pins the RESULTS, so the rewrite can be
 * checked against them: written against 0148 and passing there first.
 *
 * Only a published, whole (scope 'full'), past-year (source 'pyq') mock
 * counts; a draft or a chapter test does not. (A full past-year mock with no
 * year cannot exist: CHECK mock_tests_full_pyq_has_year.) A question in two
 * papers returns both, ordered by slug.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const RUN_ID = testRunId();

type Row = { question_id: string; kind: string; slug: string; year: number };

describe.skipIf(!HAS_ENV)("papers_of_questions", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;
  const mockIds: string[] = [];
  let q: string[] = [];
  const slug = (s: string) => `papers-of-q-${s}-${RUN_ID}`;

  const mock = async (s: string, questionIds: string[], over: Record<string, unknown>, examId: string) => {
    const id = randomUUID();
    const { error } = await admin.from("mock_tests").insert({
      id,
      slug: slug(s),
      exam_id: examId,
      paper_code: "maths",
      pyq_year: 2099,
      title: `Papers of questions ${s} ${RUN_ID}`,
      duration_secs: 9000,
      marking: { correct: 2.5, wrong: -0.83 },
      sections: [{ key: "mathematics", label: "Mathematics", count: questionIds.length }],
      questions: questionIds.map((questionId, i) => ({ position: i + 1, questionId, sectionKey: "mathematics", marks: 2.5, negMarks: -0.83 })),
      total_questions: questionIds.length,
      total_marks: 2.5 * questionIds.length,
      status: "published",
      source: "pyq",
      scope: "full",
      ...over,
    });
    if (error) throw new Error(`mock ${s}: ${error.message}`);
    mockIds.push(id);
  };

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    const { data } = await admin.from("questions").select("id, exam_id").eq("visibility", "PUBLIC").order("id").limit(4);
    const rows = (data ?? []) as { id: string; exam_id: string }[];
    if (rows.length < 4) throw new Error("need 4 PUBLIC questions in the test project");
    q = rows.map((r) => r.id);
    const exam = rows[0].exam_id;
    await mock("a", [q[0], q[1]], {}, exam);
    await mock("b", [q[1]], { pyq_year: 2098 }, exam);
    await mock("draft", [q[2]], { status: "draft" }, exam);
    await mock("chapter", [q[3]], { scope: "sectional" }, exam);
  });

  afterAll(async () => {
    if (admin && mockIds.length) await admin.from("mock_tests").delete().in("id", mockIds);
  });

  const mine = async (ids: string[]): Promise<Row[]> => {
    const { data, error } = await anon.rpc("papers_of_questions", { p_ids: ids });
    expect(error).toBeNull();
    // Other published papers may hold these questions in the test project; read ours only.
    return ((data ?? []) as Row[]).filter((r) => r.slug.endsWith(RUN_ID));
  };

  it("names the published whole past paper each question sits in, both papers when it sits in two", async () => {
    const rows = await mine([q[0], q[1], q[2], q[3], randomUUID()]);
    const pick = (id: string) => rows.filter((r) => r.question_id === id).map((r) => [r.kind, r.slug, r.year]);
    expect(pick(q[0])).toEqual([["mock", slug("a"), 2099]]);
    expect(pick(q[1])).toEqual([
      ["mock", slug("a"), 2099],
      ["mock", slug("b"), 2098],
    ]);
  });

  it("leaves out a draft and a chapter test", async () => {
    const rows = await mine([q[2], q[3]]);
    expect(rows).toEqual([]);
  });

  it("orders rows by question, then slug, and answers an empty list with nothing", async () => {
    const rows = await mine([q[1], q[0]]);
    const keys = rows.map((r) => `${r.question_id} ${r.slug}`);
    expect(keys).toEqual([...keys].sort());
    expect(await mine([])).toEqual([]);
  });

  // Since 0238 the answer comes from a list (mock_question_papers) that a
  // trigger on mock_tests keeps; these pin that it follows every change at once.
  const bySlug = async (s: string) => (await admin.from("mock_tests").select("id").eq("slug", slug(s)).single()).data!.id as string;
  const papersOf = async (id: string) => (await mine([id])).map((r) => r.slug);

  it("follows a paper being published and withdrawn", async () => {
    const draft = await bySlug("draft");
    await admin.from("mock_tests").update({ status: "published" }).eq("id", draft);
    expect(await papersOf(q[2])).toEqual([slug("draft")]);
    await admin.from("mock_tests").update({ status: "draft" }).eq("id", draft);
    expect(await papersOf(q[2])).toEqual([]);
  });

  it("follows a paper's questions being edited", async () => {
    const a = await bySlug("a");
    const { data } = await admin.from("mock_tests").select("questions").eq("id", a).single();
    const questions = (data!.questions as { questionId: string }[]).map((e) => (e.questionId === q[0] ? { ...e, questionId: q[2] } : e));
    await admin.from("mock_tests").update({ questions }).eq("id", a);
    expect(await papersOf(q[0])).toEqual([]);
    expect(await papersOf(q[2])).toEqual([slug("a")]);
  });

  it("forgets a deleted paper", async () => {
    const b = await bySlug("b");
    await admin.from("mock_tests").delete().eq("id", b);
    expect(await papersOf(q[1])).toEqual([slug("a")]);
  });

  it("lets nobody but the database write the list", async () => {
    const { error } = await anon.from("mock_question_papers").insert({ question_id: q[0], mock_id: randomUUID() });
    expect(error).not.toBeNull();
  });
});
