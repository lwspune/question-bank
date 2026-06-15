// Authoring spec for one practice-paper question.
//
// Math is inline LaTeX inside \(...\) delimiters (rendered to Word OMML by the
// shared export pipeline, identical to a UI download). `correct` is the single
// right option; `distractors` are exactly three plausible wrong options. The
// build step decides which A/B/C/D label the correct answer lands on so the
// answer distribution stays balanced — author does NOT pre-place the answer.
export type Difficulty = "EASY" | "MODERATE" | "HARD";

export type Spec = {
  chapter: "Vectors" | "Probability" | "Binomial Distribution";
  subtopic: string;
  difficulty: Difficulty;
  /** Question stem. Inline math via \(...\). Plain prose otherwise. */
  stem: string;
  /** The one correct option's text. */
  correct: string;
  /** Exactly three wrong options. */
  distractors: [string, string, string];
  /** Worked solution shown in the Answer Key. */
  solution: string;
};
