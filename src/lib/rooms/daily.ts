/**
 * The pinned daily question of a room (owner, 2026-11-25: automatic, the team
 * can swap it). Candidates come in preference order (the exam's Most Asked
 * "asked again" questions first, then its other PUBLIC PYQ MCQs); a question
 * never posted in this room wins, else the one posted longest ago. Pure.
 * Spec: tests/rooms-core.test.ts.
 */
export function pickDailyQuestion(
  candidates: readonly string[],
  /** question id -> when it was last posted in this room (ISO date or timestamp). */
  lastPosted: ReadonlyMap<string, string>
): string | null {
  if (candidates.length === 0) return null;
  const fresh = candidates.find((id) => !lastPosted.has(id));
  if (fresh) return fresh;
  let best = candidates[0];
  for (const id of candidates) {
    if ((lastPosted.get(id) ?? "") < (lastPosted.get(best) ?? "")) best = id;
  }
  return best;
}

/** "questions number 13 to 16", "question no. 96", "Q. Nos. 41": a line that only makes sense inside the paper. */
const PAPER_NUMBERS = [/\bquestions?\s*(?:nos?\.?|numbers?)\s*\(?\d/i, /\bQ\.?\s*Nos?\.?\s*\d/i];
/** Fewer characters of words than this (maths taken out) leans on the instruction to make sense. */
const MIN_STEM_WORDS = 25;

/**
 * Whether a question reads on its own as a circle's daily question (owner,
 * 2026-11-28). The card shows the instruction too, but an instruction naming
 * the paper's question numbers reads oddly out of the paper, and a stem like
 * "Functional region –" reads like half a sentence. Spec:
 * tests/rooms-daily-stands-alone.test.ts.
 */
export function standsAlone(q: { text: string | null; context: string | null }): boolean {
  if (q.context && PAPER_NUMBERS.some((re) => re.test(q.context as string))) return false;
  const words = String(q.text ?? "")
    .replace(/\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return words.length >= MIN_STEM_WORDS;
}
