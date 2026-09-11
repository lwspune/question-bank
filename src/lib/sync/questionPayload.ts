import type { QuestionRow } from "@/lib/questions/query";
import type { Difficulty } from "@/lib/questions/filters";
import type { ConceptTagRef } from "@/lib/links/getResourceTagsForQuestions";
import { publicImageUrl } from "@/lib/storage/imageUrl";

/**
 * THE cross-app question shape. One definition, three transports: the Tags
 * `.xlsx` (`export/tagsSheet.ts`), the by-ids read API, and the paper push.
 *
 * Field names are **nda-tracker's**, not ours, and that is deliberate — they
 * match its `exams.questions[]` exactly, so hydration on that side is a merge
 * and never a translation. Do not "tidy" them into our own naming.
 *
 * Absent is `null`, never `""`. The xlsx degrades nulls to empty cells because
 * a spreadsheet cell cannot hold null; JSON can, and the tracker's parser
 * already normalises blanks to null. Keep the loss at the sheet, not here.
 *
 * See nda-tracker `CROSS_APP_SYNC.md` for the contract this implements.
 */
export type QuestionPayload = {
  questionId: string;
  subject: string;
  chapter: string;
  subtopic: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: "A" | "B" | "C" | "D" | null;
  solution: string | null;
  difficulty: string;
  context: string | null;
  subtopicSlug: string | null;
  conceptSlug: string | null;
  /** ABSOLUTE public url — never the bare storage path. See below. */
  imageUrl: string | null;
  solutionImageUrl: string | null;
  optionImages: Record<"A" | "B" | "C" | "D", string | null>;
  format: string | null;
  numericAnswer: number | null;
};

/**
 * PYQ Vault subject name → nda-tracker exam-subject key. Most NDA subjects
 * share the name; only Mathematics ("Maths") and Current Affairs (no CA key →
 * "Others", an accepted empty-list subject) differ. Unknown subjects pass
 * through unchanged (the tracker's validateTags accepts any chapter for a
 * subject with no configured list).
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

/**
 * The derivations below are shared with `export/tagsSheet.ts` ON PURPOSE.
 *
 * The two transports legitimately differ in their CONTAINER — the sheet has no
 * image columns and must write "" where JSON writes null — but they must never
 * differ in what a subject maps to, which option is the answer, or how a
 * missing subtopic is named. Those are the parts that would drift silently.
 */
export function difficultyLabel(d: Difficulty): string {
  return DIFFICULTY_LABEL[d];
}

export function optionText(q: QuestionRow, label: "A" | "B" | "C" | "D"): string {
  return q.options.find((o) => o.label === label)?.text ?? "";
}

/** The correct option's label, or null when none is flagged. */
export function answerLabel(q: QuestionRow): "A" | "B" | "C" | "D" | null {
  return q.options.find((o) => o.isCorrect)?.label ?? null;
}

/** Subtopic name, defaulting the same way both transports need. */
export function subtopicName(q: QuestionRow): string {
  return q.subtopic?.name ?? "General";
}

/**
 * `questions.image_url` holds a storage PATH; our own UI wraps it with
 * `publicImageUrl` at render time. The tracker must be handed an ABSOLUTE url
 * instead — it stores what it receives, and a path would make its copy depend
 * on knowing our Supabase host forever. The bucket is public, so no signing.
 */
function absoluteImage(
  supabaseUrl: string,
  path: string | null | undefined
): string | null {
  return path ? publicImageUrl(supabaseUrl, path) : null;
}

export type BuildPayloadOptions = {
  supabaseUrl: string;
  /** Overrides the question's own context — set siblings share the lead passage. */
  context?: string | null;
  tag?: ConceptTagRef;
};

export function buildQuestionPayload(
  q: QuestionRow,
  opts: BuildPayloadOptions
): QuestionPayload {
  const { supabaseUrl, tag } = opts;
  const context = opts.context !== undefined ? opts.context : q.context;
  const optionImages = { A: null, B: null, C: null, D: null } as Record<
    "A" | "B" | "C" | "D",
    string | null
  >;
  for (const o of q.options) {
    optionImages[o.label] = absoluteImage(supabaseUrl, o.imageUrl);
  }

  return {
    questionId: q.id,
    subject: mapSubjectToTracker(q.subject.name),
    chapter: q.chapter.name,
    subtopic: subtopicName(q),
    question: q.text,
    optionA: optionText(q, "A"),
    optionB: optionText(q, "B"),
    optionC: optionText(q, "C"),
    optionD: optionText(q, "D"),
    answer: answerLabel(q),
    solution: q.solution ?? null,
    difficulty: difficultyLabel(q.difficulty),
    context: context ?? null,
    subtopicSlug: tag?.subtopicSlug ?? null,
    conceptSlug: tag?.conceptSlug ?? null,
    imageUrl: absoluteImage(supabaseUrl, q.imageUrl),
    solutionImageUrl: absoluteImage(supabaseUrl, q.solutionImageUrl),
    optionImages,
    format: q.questionFormat ?? null,
    numericAnswer: q.numericAnswer ?? null,
  };
}
