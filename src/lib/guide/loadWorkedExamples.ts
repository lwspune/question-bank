import type { SupabaseClient } from "@supabase/supabase-js";
import type { Difficulty } from "@/lib/questions/filters";
import { formatProvenance } from "@/lib/questions/formatProvenance";
import { sourceTag, type SourceTag } from "@/lib/questions/sourceTag";
import { usableVisual } from "@/lib/visuals/visual";
import type { WorkedFormat } from "@/lib/guide/workedAnswer";
import {
  publicPyqNote,
  type PublicQuestionKind,
} from "@/lib/questions/publicPyqNote";

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
  /** The tag the bank card leads with ("NDA · Sep 2023 · Q110"); see sourceTag. */
  source: SourceTag;
  /** The DB exam name; a free exam's example spends no daily answer (0210). */
  examName: string | null;
  /** Storage path (or legacy full URL) of the question's figure; build the link with publicImageUrl. */
  imageUrl: string | null;
  /** The solution's figure, shown in the solution panel. */
  solutionImageUrl: string | null;
  /** The animated solution, kept only when its own check passes (usableVisual); null otherwise. */
  solutionVisual: unknown | null;
  /** mcq (options) · subjective (model answer in `solution`) · numeric (`numericAnswer`). See workedAnswerMode. */
  format: WorkedFormat;
  /** A numeric question's key; null otherwise. `numericAnswerMax` is the top of a keyed range (0214). */
  numericAnswer: number | null;
  numericAnswerMax: number | null;
  options: {
    label: "A" | "B" | "C" | "D";
    text: string;
    isCorrect: boolean;
    /** A picture option (figure series, odd figure out) has empty text and only this. */
    imageUrl: string | null;
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
      id, text, context, difficulty, solution, image_url, solution_image_url, solution_visual,
      question_number, pyq_year, pyq_month, pyq_note, question_kind,
      question_format, numeric_answer, numeric_answer_max,
      exam:exams!exam_id(name),
      chapter:chapters!chapter_id(name),
      subtopic:subtopics!subtopic_id(name),
      options(label, text, is_correct, image_url)
    `
    )
    .in("id", ids);

  if (error) throw new Error(`worked examples: ${error.message}`);

  type RawTax = { name: string } | { name: string }[] | null;
  type RawOpt = {
    label: "A" | "B" | "C" | "D";
    text: string;
    is_correct: boolean;
    image_url: string | null;
  };
  type Raw = {
    id: string;
    text: string;
    context: string | null;
    difficulty: Difficulty;
    solution: string | null;
    image_url: string | null;
    solution_image_url: string | null;
    solution_visual: unknown;
    question_number: string | null;
    question_kind: PublicQuestionKind | null;
    question_format: WorkedFormat | null;
    numeric_answer: number | string | null;
    numeric_answer_max: number | string | null;
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
        // These pages are ISR-cached and public, so there is no viewer to
        // resolve and no raw variant: a worked example's citation is always
        // the redacted one. See publicPyqNote for why the column cannot be
        // published as-is.
        pyqNote: publicPyqNote(r.pyq_note, r.question_kind),
      }),
      source: sourceTag({
        questionKind: r.question_kind ?? undefined,
        exam: { name: flat(r.exam)?.name ?? "" },
        pyqYear: r.pyq_year,
        pyqMonth: r.pyq_month,
        pyqNote: publicPyqNote(r.pyq_note, r.question_kind),
        questionNumber: r.question_number,
      }),
      examName: flat(r.exam)?.name ?? null,
      imageUrl: r.image_url ?? null,
      solutionImageUrl: r.solution_image_url ?? null,
      solutionVisual: usableVisual(r.solution_visual),
      format: r.question_format ?? "mcq",
      numericAnswer: r.numeric_answer === null ? null : Number(r.numeric_answer),
      numericAnswerMax: r.numeric_answer_max === null ? null : Number(r.numeric_answer_max),
      options: (r.options ?? [])
        .map((o) => ({
          label: o.label,
          text: o.text,
          isCorrect: o.is_correct,
          imageUrl: o.image_url ?? null,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    });
  }

  return ids
    .map((id) => byId.get(id))
    .filter((x): x is WorkedExample => x !== undefined);
}
