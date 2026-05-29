import type { SupabaseClient } from "@supabase/supabase-js";
import type { Difficulty } from "@/lib/questions/filters";
import { formatProvenance } from "@/lib/questions/formatProvenance";

export type WorkedExample = {
  id: string;
  text: string;
  /** Passage shared by set-bound siblings; null for standalone questions. */
  context: string | null;
  difficulty: Difficulty;
  solution: string | null;
  chapter: string;
  subtopic: string | null;
  /** PYQ citation, e.g. "Q110 · Sep · 2023"; null when metadata is absent. */
  provenance: string | null;
  options: {
    label: "A" | "B" | "C" | "D";
    text: string;
    isCorrect: boolean;
  }[];
};

/**
 * Resolve an ordered list of question IDs into worked-example rows for the
 * /guide/nda-maths/principles/{slug} pages. Returns the rows in the order
 * the caller provided; questions that don't resolve under RLS are dropped
 * silently (kept editorial-friendly, no broken pages if a question is later
 * made PRIVATE or deleted).
 */
export async function loadWorkedExamples(
  client: SupabaseClient,
  ids: string[]
): Promise<WorkedExample[]> {
  if (ids.length === 0) return [];

  const { data, error } = await client
    .from("questions")
    .select(
      `
      id, text, context, difficulty, solution,
      question_number, pyq_year, pyq_month, pyq_note,
      exam:exams!exam_id(name),
      chapter:chapters!chapter_id(name),
      subtopic:subtopics!subtopic_id(name),
      options(label, text, is_correct)
    `
    )
    .in("id", ids);

  if (error) throw new Error(`worked examples: ${error.message}`);

  type RawTax = { name: string } | { name: string }[] | null;
  type RawOpt = {
    label: "A" | "B" | "C" | "D";
    text: string;
    is_correct: boolean;
  };
  type Raw = {
    id: string;
    text: string;
    context: string | null;
    difficulty: Difficulty;
    solution: string | null;
    question_number: string | null;
    pyq_year: number | null;
    pyq_month: string | null;
    pyq_note: string | null;
    exam: RawTax;
    chapter: RawTax;
    subtopic: RawTax;
    options: RawOpt[] | null;
  };

  const flat = (v: RawTax): { name: string } | null =>
    Array.isArray(v) ? v[0] ?? null : v;

  const byId = new Map<string, WorkedExample>();
  for (const r of (data ?? []) as Raw[]) {
    byId.set(r.id, {
      id: r.id,
      text: r.text,
      context: r.context,
      difficulty: r.difficulty,
      solution: r.solution,
      chapter: flat(r.chapter)?.name ?? "Unknown",
      subtopic: flat(r.subtopic)?.name ?? null,
      provenance: formatProvenance({
        examName: flat(r.exam)?.name ?? null,
        questionNumber: r.question_number,
        pyqYear: r.pyq_year,
        pyqMonth: r.pyq_month,
        pyqNote: r.pyq_note,
      }),
      options: (r.options ?? [])
        .map((o) => ({
          label: o.label,
          text: o.text,
          isCorrect: o.is_correct,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    });
  }

  return ids
    .map((id) => byId.get(id))
    .filter((x): x is WorkedExample => x !== undefined);
}
