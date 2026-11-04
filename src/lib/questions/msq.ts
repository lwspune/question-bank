/**
 * Multiple-select questions (MSQ, migration 0214): one OR MORE options are correct.
 * The single place a set of ticks is judged against the correct set, so the bank's card and
 * the mock review can never disagree. Pure. Spec: tests/msq-verdict.test.ts.
 *
 * The card shows this verdict and records nothing: the drill and answer history are built
 * on one picked letter, so an MSQ check spends a reveal like "Show answer" does and sends no
 * pick (QuestionCard). Mock MARKS (all-or-nothing or IIT Bombay's partial credit) live with
 * the mock grader, not here.
 */

export type MsqVerdict = {
  /** all = exactly the correct set; partial = some correct, none wrong; wrong = a wrong tick; none = no tick. */
  kind: "all" | "partial" | "wrong" | "none";
  /** How many correct options were ticked. */
  found: number;
  /** How many options are correct. */
  total: number;
  /** Ticked options that are not correct, in label order. */
  wrongPicks: string[];
};

export function msqVerdict(ticked: readonly string[], correct: readonly string[]): MsqVerdict {
  const key = new Set(correct);
  const picks = [...new Set(ticked)].sort();
  const wrongPicks = picks.filter((l) => !key.has(l));
  const found = picks.length - wrongPicks.length;
  const total = key.size;
  const kind =
    picks.length === 0 ? "none" : wrongPicks.length > 0 ? "wrong" : found === total ? "all" : "partial";
  return { kind, found, total, wrongPicks };
}

/** right = ticked and correct; missed = correct but not ticked; wrong = ticked, not correct. */
export type MsqOptionMark = "none" | "right" | "missed" | "wrong";

export function msqOptionMark(input: {
  checked: boolean;
  ticked: boolean;
  isCorrect: boolean;
  cancelled?: boolean;
}): MsqOptionMark {
  const { checked, ticked, isCorrect, cancelled = false } = input;
  if (!checked) return "none";
  if (isCorrect) return ticked ? "right" : "missed";
  if (ticked && !cancelled) return "wrong";
  return "none";
}

/** The one-line result under the options, in plain words. */
export function msqVerdictLine(v: MsqVerdict): string {
  if (v.kind === "all") {
    if (v.total === 1) return "Correct: that is the only right option.";
    return v.total === 2 ? "All correct: you found both right options." : `All correct: you found all ${v.total} right options.`;
  }
  if (v.kind === "partial") return `Partly right: you found ${v.found} of the ${v.total} right options, with no wrong one.`;
  if (v.kind === "wrong") {
    const which = v.wrongPicks.join(" and ");
    return `Not quite: ${which} ${v.wrongPicks.length === 1 ? "is" : "are"} not correct.`;
  }
  return "Tick one or more options, then check.";
}

/**
 * One tap on an option of a multiple-select question: tick it, or untick it. The set stays
 * in letter order, and an emptied set is null, which is how an unanswered question is stored.
 */
export function toggleTick<L extends string>(ticked: readonly L[] | null, label: L): L[] | null {
  const now = new Set(ticked ?? []);
  if (now.has(label)) now.delete(label);
  else now.add(label);
  return now.size === 0 ? null : [...now].sort();
}

/** How a multiple-select question is marked, in one line under its options (a mock runner). */
export function msqInstruction(scheme: "exact" | "partial", marks: number, negMarks: number): string {
  const head = `Tick every correct option. All correct and no wrong one: +${marks}.`;
  if (scheme === "partial") return `${head} Some correct and no wrong one: +1 for each. Any wrong tick: ${negMarks}.`;
  return `${head} Anything else: ${negMarks}. No partial marks.`;
}
