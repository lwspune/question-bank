/**
 * Pure core for reconciling TWO INDEPENDENT MCQ key derivations.
 *
 * No Maharashtra board paper ships an answer key, so every key in this corpus is
 * derived. The corpus's only defence is deriving each one twice, independently,
 * and comparing — so this module's job is to compare honestly and to refuse to
 * resolve anything on its own.
 *
 * Two things it deliberately does NOT do:
 *
 *  - It never picks a winner. A disagreement is reported with both answers and
 *    both justifications, for a human to adjudicate against the printed page.
 *    An automatic tie-break would turn "two passes disagree" — the most valuable
 *    signal this pipeline produces — into a silent choice.
 *  - It does not treat agreement as proof. Two passes that agree while both
 *    flag LOW confidence have produced a coincidence, not a verification, so
 *    those are surfaced separately.
 *
 * TDD'd in tests/mh-hsc-12-paper-keys.test.ts.
 */
import { type Grammar } from "./lib";

export type Confidence = "high" | "medium" | "low";
/** "NONE" = derived a value that matches no printed option. An expected outcome
 *  on this corpus (three occurred in the sibling compilation), never a failure. */
export type KeyAnswer = "A" | "B" | "C" | "D" | "NONE";

export type KeyRow = { ref: string; answer: KeyAnswer; confidence: Confidence; note: string };

const ANSWERS: KeyAnswer[] = ["A", "B", "C", "D", "NONE"];
const CONFIDENCES: Confidence[] = ["high", "medium", "low"];

/**
 * Pull `<ref> | <answer> | <confidence> | <note>` rows out of a pass's prose.
 *
 * Lenient about surroundings (indentation, code fences, narrative above and
 * below) because a derivation pass writes a document, not a data file. Strict
 * about the VALUES: an answer outside A-D/NONE throws rather than being dropped,
 * since a silently-skipped row reads downstream as "that question was never
 * derived" — which is a different and much quieter problem.
 */
/**
 * The grammar is REQUIRED, not defaulted, and that is the whole point.
 *
 * It was briefly optional with a Mathematics default when the Physics lane
 * landed on 2026-09-23, and `reconcile-keys.ts` did not pass one. The Maths
 * grammar happily normalised the Physics refs `Q. 1(i)`..`Q. 1(viii)` into its
 * own `Q. 1. (i)` spelling and simply DROPPED `Q. 1(ix)` and `Q. 1(x)`, which do
 * not exist on a Maths paper. The run then reported "8 agreed keys" and exited
 * 0 — a plausible number, silently wrong, on the one artifact whose entire job
 * is to be trustworthy. A default here does not save a caller a keystroke; it
 * converts a missing argument into a wrong answer.
 */
export function parseKeyLines(text: string, grammar: Grammar): KeyRow[] {
  const rows: KeyRow[] = [];
  for (const raw of String(text ?? "").split(/\r?\n/)) {
    const line = raw.trim().replace(/^[`|]+|[`|]+$/g, "").trim();
    if (!line || /^[-:\s|]+$/.test(line)) continue; // blank, or a markdown separator

    const parts = line.split("|").map((p) => p.trim());
    if (parts.length < 3) continue;

    const ref = grammar.normaliseRef(parts[0]);
    if (!ref) continue; // not a ref on this paper — not our row

    const answer = parts[1].toUpperCase() as KeyAnswer;
    if (!ANSWERS.includes(answer)) {
      throw new Error(`${ref}: answer ${JSON.stringify(parts[1])} is not one of ${ANSWERS.join("/")}`);
    }
    const confidence = parts[2].toLowerCase() as Confidence;
    if (!CONFIDENCES.includes(confidence)) {
      throw new Error(`${ref}: confidence ${JSON.stringify(parts[2])} is not ${CONFIDENCES.join("/")}`);
    }
    rows.push({ ref, answer, confidence, note: parts.slice(3).join(" | ").trim() });
  }
  return rows;
}

export type Disagreement = { ref: string; a: KeyAnswer; b: KeyAnswer; aNote: string; bNote: string };

export type KeyReconciliation = {
  agree: { ref: string; answer: KeyAnswer; confidence: Confidence }[];
  disagree: Disagreement[];
  /** Refs only one pass covered — reported both ways, because a pass silently
   *  skipping a question looks exactly like agreement if you only count. */
  onlyA: string[];
  onlyB: string[];
  /** Agreed, but at least one pass was unsure. Agreement at low confidence is a
   *  coincidence worth re-deriving, not a verification. */
  lowConfidenceAgreements: string[];
};

export function reconcileKeys(a: readonly KeyRow[], b: readonly KeyRow[]): KeyReconciliation {
  const byRefA = new Map(a.map((r) => [r.ref, r]));
  const byRefB = new Map(b.map((r) => [r.ref, r]));

  const out: KeyReconciliation = { agree: [], disagree: [], onlyA: [], onlyB: [], lowConfidenceAgreements: [] };

  for (const [ref, ra] of byRefA) {
    const rb = byRefB.get(ref);
    if (!rb) {
      out.onlyA.push(ref);
      continue;
    }
    if (ra.answer === rb.answer) {
      // The WEAKER of the two confidences describes the pair: a high-confidence
      // pass agreeing with an unsure one does not make the unsure one sure.
      const weakest = [ra.confidence, rb.confidence].sort(
        (x, y) => CONFIDENCES.indexOf(y) - CONFIDENCES.indexOf(x),
      )[0];
      out.agree.push({ ref, answer: ra.answer, confidence: weakest });
      if (weakest === "low") out.lowConfidenceAgreements.push(ref);
    } else {
      out.disagree.push({ ref, a: ra.answer, b: rb.answer, aNote: ra.note, bNote: rb.note });
    }
  }
  for (const ref of byRefB.keys()) if (!byRefA.has(ref)) out.onlyB.push(ref);

  return out;
}
