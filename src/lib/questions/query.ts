import type { SupabaseClient } from "@supabase/supabase-js";
import type { Filters, Difficulty } from "./filters";

export type OptionRow = {
  label: "A" | "B" | "C" | "D";
  text: string;
  isCorrect: boolean;
  imageUrl: string | null;
};

export type QuestionRow = {
  id: string;
  text: string;
  context: string | null;
  difficulty: Difficulty;
  solution: string | null;
  imageUrl: string | null;
  exam: { id: string; name: string };
  subject: { id: string; name: string };
  chapter: { id: string; name: string };
  subtopic: { id: string; name: string } | null;
  options: OptionRow[];
};

export type QueryResult = {
  totalCount: number;
  rows: QuestionRow[];
};

export const DEFAULT_PAGE_SIZE = 25;

export async function queryQuestions(
  client: SupabaseClient,
  orgId: string | null,
  filters: Filters,
  pageSize: number = DEFAULT_PAGE_SIZE
): Promise<QueryResult> {
  // When orgId is null, no org filter is applied — RLS scopes the result:
  //   anon role        → only PUBLIC rows
  //   authenticated    → PUBLIC rows + caller's own org's PRIVATE rows
  //   service-role     → everything (used in tests with explicit orgId)
  let q = client
    .from("questions")
    .select(
      `
      id, text, context, difficulty, solution, image_url,
      exam:exams!exam_id(id, name),
      subject:subjects!subject_id(id, name),
      chapter:chapters!chapter_id(id, name),
      subtopic:subtopics!subtopic_id(id, name),
      options(label, text, is_correct, image_url)
    `,
      { count: "exact" }
    );

  if (orgId !== null) q = q.eq("org_id", orgId);

  if (filters.examId) q = q.eq("exam_id", filters.examId);
  if (filters.subjectId) q = q.eq("subject_id", filters.subjectId);
  if (filters.chapterIds.length > 0) q = q.in("chapter_id", filters.chapterIds);
  if (filters.subtopicIds.length > 0)
    q = q.in("subtopic_id", filters.subtopicIds);
  if (filters.difficulties.length > 0)
    q = q.in("difficulty", filters.difficulties);
  if (filters.pyqYears.length > 0) q = q.in("pyq_year", filters.pyqYears);
  if (filters.q.trim()) {
    q = q.textSearch("search_vector", filters.q.trim(), {
      type: "websearch",
      config: "english",
    });
  }

  const start = (filters.page - 1) * pageSize;
  const end = start + pageSize - 1;
  q = q.order("created_at", { ascending: false }).range(start, end);

  const { data, error, count } = await q;
  if (error) throw new Error(`questions query: ${error.message}`);

  type RawOption = {
    label: "A" | "B" | "C" | "D";
    text: string;
    is_correct: boolean;
    image_url: string | null;
  };
  type RawTaxonomy = { id: string; name: string };
  type Raw = {
    id: string;
    text: string;
    context: string | null;
    difficulty: Difficulty;
    solution: string | null;
    image_url: string | null;
    exam: RawTaxonomy | RawTaxonomy[] | null;
    subject: RawTaxonomy | RawTaxonomy[] | null;
    chapter: RawTaxonomy | RawTaxonomy[] | null;
    subtopic: RawTaxonomy | RawTaxonomy[] | null;
    options: RawOption[] | null;
  };

  const flatten = (v: RawTaxonomy | RawTaxonomy[] | null): RawTaxonomy | null =>
    Array.isArray(v) ? v[0] ?? null : v;

  const rows: QuestionRow[] = ((data ?? []) as Raw[]).map((r) => ({
    id: r.id,
    text: r.text,
    context: r.context,
    difficulty: r.difficulty,
    solution: r.solution,
    imageUrl: r.image_url,
    exam: flatten(r.exam)!,
    subject: flatten(r.subject)!,
    chapter: flatten(r.chapter)!,
    subtopic: flatten(r.subtopic),
    options: (r.options ?? [])
      .map((o) => ({
        label: o.label,
        text: o.text,
        isCorrect: o.is_correct,
        imageUrl: o.image_url,
      }))
      .sort((a, b) => a.label.localeCompare(b.label)),
  }));

  return { totalCount: count ?? 0, rows };
}
