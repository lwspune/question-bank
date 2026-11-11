/**
 * "Before you start" on the mock instructions page (2026-11-11): what a blank,
 * a guess and a numeric answer are worth ON THIS PAPER.
 *
 * Every line is computed from the paper's own per-question marking (the
 * snapshot's marks and negMarks), never typed per exam. Owner rule for this
 * card: no wrong suggestions. The old instructions line said "skip if unsure"
 * on every paper with a penalty, which costs marks wherever a blind guess
 * gains (JEE, NEET, SSC, MPSC: +4/-1 or a quarter penalty). Strategy opinions
 * (time splits, when to move on) stay in the guides, which the card links to.
 *
 * Expected marks of a guess with j options left: (m - (j - 1) p) / j.
 * Where a paper's questions are marked differently from one another, the
 * option count is unknown, or the paper carries multiple-select or
 * per-option-marked questions, the card says NOTHING about them: silence is
 * never wrong. Checked over every published mock by
 * scripts/mocks/before-you-start-smoke.ts. Spec: tests/mock-before-you-start.test.ts.
 */

export type GuessQuestion = {
  marks: number;
  /** Marks for a wrong answer; stored negative in snapshots, either sign accepted. */
  negMarks: number;
  /** A numeric (typed) answer, no options. */
  numeric: boolean;
  grace?: boolean;
  optionMarks?: unknown;
  msqScheme?: unknown;
};

export type BeforeYouStartLine =
  | { kind: "no_penalty"; text: string }
  | { kind: "mcq_blind_gains"; text: string }
  | { kind: "mcq_rule_out"; ruleOut: number; text: string }
  | { kind: "mcq_sure_only"; text: string }
  | { kind: "numeric_costs"; text: string }
  | { kind: "numeric_free"; text: string };

/** Stored penalties are rounded (NDA's 2.5/3 is kept as 0.83): within 1% of a right answer counts as zero. */
const TOLERANCE = 0.01;

const WORDS = ["", "one", "two", "three"];

function fmt(v: number): string {
  return String(Math.round(v * 100) / 100);
}

/** The one (marks, penalty) every question in the group shares, or null when they differ. */
function sharedScheme(qs: readonly GuessQuestion[]): { m: number; p: number } | null {
  if (qs.length === 0) return null;
  const m = qs[0].marks;
  const p = Math.abs(qs[0].negMarks);
  for (const q of qs) if (q.marks !== m || Math.abs(q.negMarks) !== p) return null;
  return m > 0 ? { m, p } : null;
}

function guessValue(m: number, p: number, optionsLeft: number): number {
  return (m - (optionsLeft - 1) * p) / optionsLeft;
}

function mcqLine(m: number, p: number, options: number): BeforeYouStartLine | null {
  const tol = TOLERANCE * m;
  const blind = guessValue(m, p, options);
  if (blind > tol) {
    return {
      kind: "mcq_blind_gains",
      text: "On a multiple-choice question, even a blind guess gains marks on average here, so don't leave one blank.",
    };
  }
  for (let left = options - 1; left >= 2; left--) {
    if (guessValue(m, p, left) > tol) {
      const ruleOut = options - left;
      const word = WORDS[ruleOut];
      if (!word) return null;
      const lead = blind < -tol ? "A blind guess loses marks on average here." : "A blind guess gains nothing on average here.";
      return {
        kind: "mcq_rule_out",
        ruleOut,
        text: `${lead} Rule out ${word} option${ruleOut === 1 ? "" : "s"} first, and a guess gains marks.`,
      };
    }
  }
  return {
    kind: "mcq_sure_only",
    text: "Answer only when you are sure: here even a 50-50 guess gains nothing on average.",
  };
}

export function beforeYouStartLines(
  questions: readonly GuessQuestion[],
  optionCount: number | null
): BeforeYouStartLine[] {
  // Per-option marking (MPSC CSAT Decision Making) or multiple-select (UCEED):
  // a line about "a guess here" would be wrong for part of the paper.
  if (questions.some((q) => q.optionMarks != null || q.msqScheme != null)) return [];
  const scored = questions.filter((q) => !q.grace);
  const mcq = sharedScheme(scored.filter((q) => !q.numeric));
  const hasMcq = scored.some((q) => !q.numeric);
  const numeric = sharedScheme(scored.filter((q) => q.numeric));
  const hasNumeric = scored.some((q) => q.numeric);

  // No penalty on anything this paper carries: one line covers it all.
  const mcqFree = hasMcq && mcq !== null && mcq.p === 0;
  const numericFree = hasNumeric && numeric !== null && numeric.p === 0;
  if ((hasMcq || hasNumeric) && (!hasMcq || mcqFree) && (!hasNumeric || numericFree)) {
    return [{ kind: "no_penalty", text: "A wrong answer costs nothing on this paper, so answer every question, even with a guess." }];
  }

  const lines: BeforeYouStartLine[] = [];
  if (mcq && optionCount !== null && optionCount >= 2) {
    const line =
      mcq.p === 0
        ? { kind: "no_penalty" as const, text: "A wrong multiple-choice answer costs nothing here, so answer every one, even with a guess." }
        : mcqLine(mcq.m, mcq.p, optionCount);
    if (line) lines.push(line);
  }
  if (numeric) {
    lines.push(
      numeric.p === 0
        ? { kind: "numeric_free", text: "A wrong numeric answer costs nothing here, so always enter your best answer." }
        : {
            kind: "numeric_costs",
            text: `A numeric answer has no options to guess from, and a wrong one costs ${fmt(numeric.p)} mark${numeric.p === 1 ? "" : "s"}. Enter one only when you have worked it out.`,
          }
    );
  }
  return lines;
}
