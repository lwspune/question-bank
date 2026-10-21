/**
 * A checked answer sheet, summed up for the student: the score, where the
 * marks went (by cause), what fixing the slips is worth, and what to work on
 * first (migration 0175). PURE. Spec: tests/answer-sheets-paper-report.test.ts.
 * Ported from nda-tracker's homework report (src/lib/assignments/paperReport.js).
 *
 * ONE deliberate difference. A board paper has OR choices and "attempt any N",
 * so the questions' maximums add up to MORE than the paper's total, and a
 * blank OR side is not a loss. So the maximum is the paper's printed total,
 * and "not answered" is whatever the scored losses leave: the bars always add
 * back up to it. The report page and the PDF (scripts/grading/pages.py) both
 * read this, so they cannot disagree.
 */
import type { GradeCause, GradeOutcome } from "./grade";

export type SummaryGrade = {
  position: number;
  printedNumber: string;
  maxMarks: number;
  outcome: GradeOutcome;
  awarded: number | null;
  /** Null on a grade saved before causes existed: counted as "other". */
  cause: GradeCause | null;
  topic: string | null;
  missing: string | null;
};

export type LossKey = GradeCause | "not_attempted" | "other";

/** The order losses are shown in. */
export const LOSS_ORDER: LossKey[] = ["concept", "incomplete", "careless", "misread", "mcq", "not_attempted", "other"];

/**
 * Student-facing wording. "careless" is the grader's category, never a word
 * said to the student (GRADING.md, feedback style): it shows as "Slips".
 */
const LOSS: Record<LossKey, { label: string; heading: string; advice: string }> = {
  concept: { label: "Concept gaps", heading: "Learn this again", advice: "Revise the idea, then redo these and compare with the model answer." },
  incomplete: { label: "Steps left out", heading: "Show full steps", advice: "Redo these writing every step, reason and the final statement." },
  careless: { label: "Slips", heading: "Slips in the working", advice: "Redo these slowly and check each line and the final answer." },
  misread: { label: "Misread the question", heading: "Read the question again", advice: "Reread the question and check you answered what was asked." },
  mcq: { label: "Objective answers", heading: "Check options slowly", advice: "Retry these, checking every option before choosing." },
  not_attempted: { label: "Not answered", heading: "Not answered", advice: "Try these now: an attempt earns marks for the method." },
  other: { label: "Other marks lost", heading: "Other marks lost", advice: "Read the comments on these questions." },
};

/** Losses worth a "focus" card: they need learning, not just care. */
const FOCUS_CAUSES: readonly LossKey[] = ["concept", "incomplete", "misread"];
const MAX_FOCUS = 3;

export type PaperSummary = {
  total: number;
  max: number;
  pct: number;
  /** Among the questions answered and counted. */
  counts: { full: number; partial: number; zero: number };
  lost: { key: LossKey; label: string; marks: number; questions: string[] }[];
  potential: { marks: number; pct: number; avoidable: number; questions: string[] };
  focus: { label: string; lost: number; cause: LossKey; heading: string; missing: string | null }[];
  smallerFixes: { cause: LossKey; heading: string; advice: string; questions: string[]; marks: number }[];
};

// Sums of halves are exact in binary floating point; rounding guards anything else.
const tidy = (n: number) => Math.round(n * 100) / 100;
const pctOf = (part: number, whole: number) => (whole > 0 ? Math.round((part / whole) * 100) : 0);
const labelOf = (g: SummaryGrade) => `Q.${g.printedNumber}`;

export function buildPaperReport(input: { grades: SummaryGrade[]; totalMax: number }): PaperSummary {
  const rows = [...input.grades].sort((a, b) => a.position - b.position);
  const max = tidy(input.totalMax);
  const scored = rows.filter((r) => r.outcome === "scored");
  const total = tidy(scored.reduce((s, r) => s + (r.awarded ?? 0), 0));

  const counts = { full: 0, partial: 0, zero: 0 };
  type Loss = SummaryGrade & { key: LossKey; lost: number };
  const losing: Loss[] = [];
  for (const r of scored) {
    const awarded = r.awarded ?? 0;
    if (awarded >= r.maxMarks) {
      counts.full++;
      continue;
    }
    if (awarded === 0) counts.zero++;
    else counts.partial++;
    losing.push({ ...r, key: r.cause ?? "other", lost: tidy(r.maxMarks - awarded) });
  }

  const byKey = (key: LossKey) => losing.filter((r) => r.key === key);
  const lost: PaperSummary["lost"] = LOSS_ORDER.filter((k) => k !== "not_attempted")
    .map((key) => ({ key, label: LOSS[key].label, marks: tidy(byKey(key).reduce((s, r) => s + r.lost, 0)), questions: byKey(key).map(labelOf) }))
    .filter((l) => l.marks > 0);

  // Not answered: what the scored losses leave of the printed total. The blank
  // questions are named only when they account for exactly that; with a
  // choice on the paper, naming every blank would overstate it.
  const unanswered = tidy(max - total - losing.reduce((s, r) => s + r.lost, 0));
  if (unanswered > 0) {
    const blanks = rows.filter((r) => r.outcome === "not_attempted");
    const exact = tidy(blanks.reduce((s, r) => s + r.maxMarks, 0)) === unanswered;
    lost.push({ key: "not_attempted", label: LOSS.not_attempted.label, marks: unanswered, questions: exact ? blanks.map(labelOf) : [] });
    lost.sort((a, b) => LOSS_ORDER.indexOf(a.key) - LOSS_ORDER.indexOf(b.key));
  }

  const slips = byKey("careless");
  const avoidable = tidy(slips.reduce((s, r) => s + r.lost, 0));
  const potential = { marks: tidy(total + avoidable), pct: pctOf(total + avoidable, max), avoidable, questions: slips.map(labelOf) };

  const focusRows = losing
    .filter((r) => FOCUS_CAUSES.includes(r.key))
    .sort((a, b) => b.lost - a.lost || a.position - b.position)
    .slice(0, MAX_FOCUS);
  const heading = (r: Loss) =>
    r.topic && (r.key === "concept" || r.key === "incomplete") ? `${LOSS[r.key].heading}: ${r.topic}` : LOSS[r.key].heading;
  const focus = focusRows.map((r) => ({ label: labelOf(r), lost: r.lost, cause: r.key, heading: heading(r), missing: r.missing }));

  const inFocus = new Set(focusRows.map((r) => r.position));
  const smallerFixes = LOSS_ORDER.filter((k) => k !== "not_attempted")
    .map((key) => {
      const left = byKey(key).filter((r) => !inFocus.has(r.position));
      return {
        cause: key,
        heading: LOSS[key].heading,
        advice: LOSS[key].advice,
        questions: left.map(labelOf),
        marks: tidy(left.reduce((s, r) => s + r.lost, 0)),
      };
    })
    .filter((f) => f.questions.length > 0);

  return { total, max, pct: pctOf(total, max), counts, lost, potential, focus, smallerFixes };
}
