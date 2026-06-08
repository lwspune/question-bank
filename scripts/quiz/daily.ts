/**
 * The daily-quiz template helper. Author a 15-question Level-1 recall quiz by
 * declaring metadata + questions; the helper handles the tedious parts:
 *   - place the 4 options + mark the answer letter deterministically (you write
 *     `correct` + `distractors`, not A/B/C/D), reusing the tested assembleOptions,
 *   - stamp `conceptSlug` / `chapter` provenance onto every question (so it rides
 *     into nda-tracker for later analytics),
 *   - return a DraftQuiz that push.ts feeds straight to buildImportPayload.
 *
 * Two ways to supply a question:
 *   q({ concept, stem, correct, distractors:[d1,d2,d3] })  // auto-placed
 *   q({ concept, stem, options:{A,B,C,D}, answer:"B" })     // explicit
 * or convert a verified harvested atom with fromAtom(atom).
 *
 * Copy scripts/quiz/daily/_TEMPLATE.ts to start a new quiz.
 */
import { assembleOptions, type Letter } from "./atoms";
import type { DraftQuiz, QuizQuestion } from "./quizPayload";

export type QuestionSpec = {
  /** conceptSlug provenance (which /notes concept this tests). */
  concept: string;
  subtopic?: string;
  difficulty?: string;
  stem: string;
  /** Ergonomic form: give the right answer + 3 wrong ones, any order. */
  correct?: string;
  distractors?: string[];
  /** Explicit form: place the options yourself. */
  options?: { A: string; B: string; C: string; D: string };
  answer?: Letter;
};

export type DailyQuizSpec = {
  /** Stable slug ⇒ deterministic UUID ⇒ re-push UPDATES (see quizPayload). */
  slug: string;
  exam: string;
  subject: string;
  title: string;
  chapter: string;
  /** Quiz theme for filtering on nda-tracker (Formulas / Traps / Mixed …). */
  theme?: string;
  marking?: { correct: number; wrong: number };
  questions: QuestionSpec[];
};

function toQuestion(spec: QuestionSpec, seed: string, n: number, chapter: string): QuizQuestion {
  let options: { A: string; B: string; C: string; D: string };
  let answer: Letter;

  if (spec.options && spec.answer) {
    options = spec.options;
    answer = spec.answer;
  } else if (spec.correct && spec.distractors) {
    const assembled = assembleOptions(seed, spec.correct, spec.distractors);
    if (!assembled) {
      throw new Error(`${seed}: need exactly 3 distractors (got ${spec.distractors.length})`);
    }
    options = assembled.options;
    answer = assembled.answer;
  } else {
    throw new Error(`${seed}: supply either {correct,distractors} or {options,answer}`);
  }

  return {
    q: n,
    question: spec.stem,
    optionA: options.A,
    optionB: options.B,
    optionC: options.C,
    optionD: options.D,
    answer,
    chapter,
    subtopic: spec.subtopic,
    difficulty: spec.difficulty ?? "Easy",
    conceptSlug: spec.concept,
  };
}

export function defineDailyQuiz(spec: DailyQuizSpec): DraftQuiz {
  return {
    id: spec.slug,
    title: spec.title,
    subject: spec.subject,
    exam: spec.exam,
    chapter: spec.chapter,
    theme: spec.theme ?? "mixed",
    marking: spec.marking ?? { correct: 1, wrong: 0 },
    questions: spec.questions.map((s, i) =>
      toQuestion(s, `${spec.slug}:${i}`, i + 1, spec.chapter)
    ),
  };
}

/** Convert a VERIFIED harvested atom into a QuestionSpec for a daily quiz.
 *  Auto atoms come with options+answer; needs_review atoms must have had their
 *  distractors finalized first (pass them in, or fill options/answer by hand). */
export function fromAtom(atom: {
  conceptSlug: string;
  subtopicSlug: string;
  stem: string;
  correct: string;
  options: { A: string; B: string; C: string; D: string } | null;
  answer: Letter | null;
}): QuestionSpec {
  if (atom.options && atom.answer) {
    return {
      concept: atom.conceptSlug,
      subtopic: atom.subtopicSlug,
      stem: atom.stem,
      options: atom.options,
      answer: atom.answer,
    };
  }
  throw new Error(
    `atom for "${atom.stem.slice(0, 40)}…" has no finalized options — finish the verify pass first`
  );
}
