import type { QuestionRow } from "@/lib/questions/query";
import type { Difficulty } from "@/lib/questions/filters";
import { groupBySet } from "./groupBySet";

/**
 * Builds the "tagged sheet" that nda-tracker's `parseTagsFile` consumes — the
 * enrichment XLSX that pairs each printed question with its chapter/subtopic/
 * options/answer/solution/difficulty + (new) passage context.
 *
 * The whole point: this file used to be hand-typed, which leaked transcription
 * errors (wrong keys, mistyped options, off-by-one Q-numbers). PYQ Vault is the
 * master — it already holds every field structured + verified — so it emits the
 * sheet directly. No human in the loop = the error class is gone.
 *
 * Q-NUMBER PARITY is load-bearing: the numbers here must match both the printed
 * Word paper (so a teacher reads the same Q7) and the Evalbee OMR scan (so a
 * student's Q7 response lands on the right question). We therefore walk the
 * SAME `groupBySet` loop the docx builder uses (see docxBuilder.ts
 * `buildQuestionPaper`): groups in order, `position` incrementing per question.
 * groupBySet is order-preserving, so this equals cart order today — but sharing
 * the function keeps the two outputs locked together if numbering ever changes.
 */

export type TagRow = {
  q: number;
  /** nda-tracker exam-subject key (see mapSubjectToTracker). */
  subject: string;
  /** PYQ Vault (master) chapter name, verbatim. */
  chapter: string;
  subtopic: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  /** "A" | "B" | "C" | "D" — derived from the isCorrect option; "" if none. */
  answer: string;
  solution: string;
  /** "Easy" | "Moderate" | "Hard" — nda-tracker's casing. */
  difficulty: string;
  /** Passage / shared context, "" when absent. A distinct column — NEVER inlined into `question`. */
  context: string;
};

/**
 * Column order for the emitted sheet. parseTagsFile finds columns by header
 * NAME (case-insensitive), so order is cosmetic for it — but a stable, readable
 * order helps a human eyeballing the file. `Context` is the new column.
 */
export const TAG_COLUMNS = [
  "Q",
  "Subject",
  "Chapter",
  "Subtopic",
  "Question",
  "OptionA",
  "OptionB",
  "OptionC",
  "OptionD",
  "Answer",
  "Solution",
  "Difficulty",
  "Context",
] as const;

/**
 * PYQ Vault subject name → nda-tracker exam-subject key.
 * Most NDA subjects share the name; only Mathematics ("Maths") and Current
 * Affairs (no CA key → "Others", an accepted empty-list subject) differ.
 * Unknown subjects pass through unchanged (validateTags accepts any chapter for
 * a subject with no configured list).
 */
const SUBJECT_MAP: Record<string, string> = {
  Mathematics: "Maths",
  "Current Affairs": "Others",
};

export function mapSubjectToTracker(subjectName: string): string {
  return SUBJECT_MAP[subjectName] ?? subjectName;
}

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  EASY: "Easy",
  MODERATE: "Moderate",
  HARD: "Hard",
};

function optionText(q: QuestionRow, label: "A" | "B" | "C" | "D"): string {
  return q.options.find((o) => o.label === label)?.text ?? "";
}

function toTagRow(q: QuestionRow, position: number, context: string): TagRow {
  return {
    q: position,
    subject: mapSubjectToTracker(q.subject.name),
    chapter: q.chapter.name,
    subtopic: q.subtopic?.name ?? "General",
    question: q.text,
    optionA: optionText(q, "A"),
    optionB: optionText(q, "B"),
    optionC: optionText(q, "C"),
    optionD: optionText(q, "D"),
    answer: q.options.find((o) => o.isCorrect)?.label ?? "",
    solution: q.solution ?? "",
    difficulty: DIFFICULTY_LABEL[q.difficulty],
    context,
  };
}

export function buildTagRows(questions: QuestionRow[]): TagRow[] {
  const rows: TagRow[] = [];
  let position = 1;
  for (const group of groupBySet(questions)) {
    if (group.kind === "single") {
      rows.push(toTagRow(group.question, position, group.question.context ?? ""));
      position += 1;
    } else {
      // Every sibling carries the group's lead passage — robust even if a later
      // sibling's own context is null (mirrors the docx passage banner).
      for (const q of group.questions) {
        rows.push(toTagRow(q, position, group.passage));
        position += 1;
      }
    }
  }
  return rows;
}

/** TagRow[] → array-of-arrays (header + rows) for SheetJS `aoa_to_sheet`. */
export function tagRowsToAoa(rows: TagRow[]): (string | number)[][] {
  const header: (string | number)[] = [...TAG_COLUMNS];
  const body = rows.map((r) => [
    r.q,
    r.subject,
    r.chapter,
    r.subtopic,
    r.question,
    r.optionA,
    r.optionB,
    r.optionC,
    r.optionD,
    r.answer,
    r.solution,
    r.difficulty,
    r.context,
  ]);
  return [header, ...body];
}
