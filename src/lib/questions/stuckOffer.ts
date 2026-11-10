/**
 * "3 of your last 4 on <subtopic> were wrong. Want help with the idea behind
 * it?" (owner, 2026-11-10): an offer under a bank answer, with Teach me the
 * idea (our notes for the subtopic, else V explains the concept), Try an easier
 * one, and Keep going.
 *
 * Measured over 30 days of bank and board practice: a student got 3 of their
 * last 4 on one subtopic wrong 629 times (267 students), and 14% left right
 * after that answer, against 12% after a right one. Every bank answer already
 * shows its solution, so these students had read three solutions and still
 * missed the next: the idea behind them is the gap.
 *
 * THE RULE (owner): 3 wrong among the student's last 4 answers on the
 * subtopic, or 3 of 3 when they have only 3; no sitting (only 18 of 376
 * streaks spanned days, so a sitting changed little and cost a rule). It is
 * offered only on the answer that MAKES it true, so another wrong answer in the
 * same streak never repeats it, and it returns only once some right answers end
 * the streak and a new 3 of 4 forms. That needs no stored dismissal.
 *
 * Pure. Spec: tests/stuck-offer.test.ts.
 */

export const STUCK_WINDOW = 4;
export const STUCK_WRONG = 3;
/** With one difficulty label on a subtopic, "easy" is this share of other students right (or more). */
export const EASIER_PEER_PCT = 60;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** history: the student's answers on the subtopic, oldest first, true = right. */
export function isStuck(history: readonly boolean[]): boolean {
  const last = history.slice(-STUCK_WINDOW);
  return last.length >= STUCK_WRONG && last.filter((ok) => !ok).length >= STUCK_WRONG;
}

/** True only on the wrong answer that makes the rule true. */
export function newlyStuck(history: readonly boolean[]): boolean {
  if (history.length === 0 || history[history.length - 1]) return false;
  return isStuck(history) && !isStuck(history.slice(0, -1));
}

export function stuckOfferLine(subtopic: string, history: readonly boolean[]): string {
  const last = history.slice(-STUCK_WINDOW);
  const wrong = last.filter((ok) => !ok).length;
  const lastThreeWrong = last.slice(-STUCK_WRONG).every((ok) => !ok);
  const lead = lastThreeWrong ? `Your last ${STUCK_WRONG} on ${subtopic} were wrong.` : `${wrong} of your last ${last.length} on ${subtopic} were wrong.`;
  return `${lead} Want help with the idea behind it?`;
}

export type EasierCandidate = { id: string; difficulty: string; peerPct: number | null };

/**
 * An easier question from the subtopic that the student has not answered: one
 * labelled EASY; where every candidate carries the same label (all 75 questions
 * of a JEE paper are MODERATE), one 60%+ of other students got right. Null when
 * there is nothing easier to offer, so the button does not show.
 */
export function pickEasier(candidates: readonly EasierCandidate[], answered: ReadonlySet<string>): string | null {
  const open = candidates.filter((c) => !answered.has(c.id));
  const labels = new Set(candidates.map((c) => c.difficulty));
  if (labels.size > 1) return open.find((c) => c.difficulty === "EASY")?.id ?? null;
  return open.find((c) => (c.peerPct ?? -1) >= EASIER_PEER_PCT)?.id ?? null;
}

export type StuckOffer = {
  /** The bank question whose answer completed the streak: the card the offer sits under. */
  questionId: string;
  subtopic: string;
  /** The student's last answers on the subtopic, oldest first (at most STUCK_WINDOW). */
  history: boolean[];
  easierId: string | null;
};

/** The offer from the practice route's reply, or null. */
export function parseStuckOffer(raw: unknown): StuckOffer | null {
  if (!raw || typeof raw !== "object") return null;
  const { questionId, subtopic, history, easierId } = raw as Record<string, unknown>;
  if (typeof questionId !== "string" || !UUID_RE.test(questionId)) return null;
  if (typeof subtopic !== "string" || subtopic.trim() === "") return null;
  if (!Array.isArray(history) || !history.every((h) => typeof h === "boolean") || !isStuck(history)) return null;
  const easier = typeof easierId === "string" && UUID_RE.test(easierId) ? easierId : null;
  return { questionId, subtopic, history: history.slice(-STUCK_WINDOW), easierId: easier };
}
