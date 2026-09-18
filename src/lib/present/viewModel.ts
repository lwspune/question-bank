/**
 * Projection view-model — the pure seam between the four surfaces that hold a
 * question and the one overlay that puts it on a classroom board.
 *
 * WHY THIS EXISTS: a teacher opens PYQ Vault on the digital board and wants the
 * question at the top of the screen with the rest of it left blank to work the
 * solution out on. The question lives in four different row shapes — `QuestionRow`
 * (/browse + the 317 /questions landing pages), `WorkedExample` (/notes mastery
 * checkpoints + /guide worked examples), `BoardQuestion` (the /board textbook
 * reader) and `ReviewItem` (a /mock attempt review). One overlay, four adapters,
 * and the adapters are pure so they can be tested: the overlay itself is a Radix
 * portal that does not exist until a click, and this repo has no headless way to
 * render one. Everything that can be decided without a DOM is decided here.
 *
 * THE ANSWER RULE, which is the whole reason this file has logic rather than
 * being four object literals: the overlay reveals the key to a whole classroom
 * at once. A key we cannot stand behind must come back `null` rather than be
 * guessed at — zero options flagged correct, two options flagged correct, or an
 * officially graced mock question are all "we don't know". A wrong letter
 * projected two metres wide is worse than no letter, and the solution text still
 * reveals either way, so losing the letter never loses the working.
 *
 * Spec: tests/present-view-model.test.ts.
 */
import type { QuestionRow } from "@/lib/questions/query";
import type { WorkedExample } from "@/lib/guide/loadWorkedExamples";
import type { BoardQuestion } from "@/lib/board/query";
import type { ReviewItem } from "@/lib/mocks/service";
import { formatProvenance } from "@/lib/questions/formatProvenance";
import { buildBreadcrumb } from "@/app/browse/breadcrumb";

export type PresentOption = {
  label: string;
  text: string;
  /** Storage path, NOT a URL — the overlay resolves it via `publicImageUrl`. */
  imageUrl: string | null;
  isCorrect: boolean;
};

/** What the "Show answer" control reveals. Null on the parent when there is
 *  nothing at all to show, so the control can hide rather than open on empty. */
export type PresentAnswer = {
  /** The single correct option label, or null when we cannot name one. */
  correctLabel: string | null;
  /** The exact value for a numeric (NAT) question. */
  numericAnswer: number | null;
  solution: string | null;
  solutionImageUrl: string | null;
};

export type PresentableQuestion = {
  /** React key + fullscreen-state key. Unique within one projected list. */
  key: string;
  /** Small grey line above the stem. Null renders nothing. */
  breadcrumb: string | null;
  context: string | null;
  text: string;
  imageUrl: string | null;
  options: PresentOption[];
  answer: PresentAnswer | null;
};

/**
 * The correct label, or null when the options do not name exactly one. Both
 * failure directions are real in this bank: a subjective/numeric row carries
 * zero options by construction, and a duplicate-key defect (the class
 * `audit:keys` exists to find) carries two.
 */
function soleCorrectLabel(options: { label: string; isCorrect: boolean }[]): string | null {
  const correct = options.filter((o) => o.isCorrect);
  return correct.length === 1 ? correct[0].label : null;
}

/** Fold an answer, or null when every field of it would be empty. */
function answerOrNull(a: PresentAnswer): PresentAnswer | null {
  const empty =
    a.correctLabel === null &&
    a.numericAnswer === null &&
    !a.solution &&
    !a.solutionImageUrl;
  return empty ? null : a;
}

/** Join breadcrumb segments with the taxonomy arrow, dropping empty ones, then
 *  hang the provenance off the end with a dot. Null when nothing survives. */
function composeBreadcrumb(
  segments: (string | null | undefined)[],
  provenance: string | null
): string | null {
  const path = segments.filter((s): s is string => !!s && s.trim().length > 0).join(" → ");
  if (!path) return provenance ?? null;
  return provenance ? `${path} · ${provenance}` : path;
}

/** /browse and the /questions landing pages. */
export function fromQuestionRow(q: QuestionRow): PresentableQuestion {
  // includeExam is unconditionally true here, unlike the card: a projected
  // question is alone on the screen with no filter bar beside it, so the exam
  // is context the room would otherwise have no way to recover.
  const path = buildBreadcrumb(q, { includeExam: true });
  const provenance = formatProvenance({
    examName: q.exam.name,
    questionNumber: q.questionNumber,
    pyqYear: q.pyqYear,
    pyqMonth: q.pyqMonth,
    pyqNote: q.pyqNote,
  });

  return {
    key: q.id,
    breadcrumb: composeBreadcrumb([path], provenance),
    context: q.context,
    text: q.text,
    imageUrl: q.imageUrl,
    options: q.options.map((o) => ({
      label: o.label,
      text: o.text,
      imageUrl: o.imageUrl,
      isCorrect: o.isCorrect,
    })),
    answer: answerOrNull({
      correctLabel: soleCorrectLabel(q.options),
      numericAnswer: q.numericAnswer ?? null,
      solution: q.solution,
      solutionImageUrl: q.solutionImageUrl ?? null,
    }),
  };
}

/** /notes mastery checkpoints and /guide worked examples (one shared card). */
export function fromWorkedExample(e: WorkedExample): PresentableQuestion {
  return {
    key: e.id,
    breadcrumb: composeBreadcrumb([e.chapter, e.subtopic], e.provenance),
    context: e.context,
    text: e.text,
    // `loadWorkedExamples` does not select image columns, so there is nothing to
    // carry here. A question whose stem needs a diagram is projected from
    // /browse instead.
    imageUrl: null,
    options: e.options.map((o) => ({
      label: o.label,
      text: o.text,
      imageUrl: null,
      isCorrect: o.isCorrect,
    })),
    answer: answerOrNull({
      correctLabel: soleCorrectLabel(e.options),
      numericAnswer: null,
      solution: e.solution,
      solutionImageUrl: null,
    }),
  };
}

/**
 * The /board textbook reader. Book position is passed in rather than derived:
 * the reader already holds the chapter and the section label, and the book ref
 * has been through its own `cleanRef` trimming by then. Re-deriving either here
 * would be a second implementation of a format the reader already owns.
 */
export function fromBoardQuestion(
  q: BoardQuestion,
  ctx: { chapter: string; sectionLabel: string | null }
): PresentableQuestion {
  return {
    key: q.id,
    breadcrumb: composeBreadcrumb([ctx.chapter, ctx.sectionLabel], q.questionNumber),
    context: q.context,
    text: q.text,
    imageUrl: q.imageUrl,
    options: q.options.map((o) => ({
      label: o.label,
      text: o.text,
      imageUrl: o.imageUrl,
      isCorrect: o.isCorrect,
    })),
    answer: answerOrNull({
      correctLabel: soleCorrectLabel(q.options),
      numericAnswer: null,
      solution: q.solution,
      solutionImageUrl: q.solutionImageUrl,
    }),
  };
}

/**
 * A /mock attempt review. Note what is NOT carried across: `selectedLabel`,
 * `verdict` and the numeric response. Those are one student's attempt, and this
 * overlay is pointed at a room — projecting a named student's wrong answer is a
 * different product with a different consent question attached.
 *
 * The key comes from `correctLabel`, not from the options' own `isCorrect`,
 * because a graced question (officially dropped or bonus, awarded to all) has no
 * correct option and the review UI already suppresses its highlight.
 */
export function fromReviewItem(item: ReviewItem): PresentableQuestion {
  return {
    key: `pos-${item.position}`,
    breadcrumb: `Q${item.position}`,
    context: item.context,
    text: item.text,
    imageUrl: item.imageUrl,
    options: item.options.map((o) => ({
      label: o.label,
      text: o.text,
      imageUrl: o.imageUrl,
      isCorrect: o.isCorrect,
    })),
    answer: answerOrNull({
      correctLabel: item.grace ? null : item.correctLabel,
      numericAnswer: item.grace ? null : item.correctNumeric,
      solution: item.solution,
      solutionImageUrl: item.solutionImageUrl,
    }),
  };
}
