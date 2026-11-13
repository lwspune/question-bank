// Pure core for the CAPF lane, beyond what it imports from ../upsc/lib.
//
// The CSE lane, where a key exists, runs ONE blind pass and lets the key
// override its letter, keeping that pass's working with a bracket saying it
// argued for another letter. CAPF's pilot runs TWO passes (to measure them), so
// it can do better: ship the working of whichever pass the key agrees with, and
// where neither does, require a solution written by hand. A stored solution
// never argues for a letter the row does not carry.
import type { Derivation, OfficialKey } from "../upsc/lib";

export type PassScore = {
  scored: number;
  match: number;
  mismatched: number[];
  byConfidence: Record<string, { ok: number; of: number }>;
};

/** Score one pass against the key, over the questions the key scores. */
export function scorePass(key: OfficialKey, pass: Derivation[]): PassScore {
  const s: PassScore = { scored: 0, match: 0, mismatched: [], byConfidence: {} };
  for (const d of [...pass].sort((a, b) => a.number - b.number)) {
    if (key.dropped.includes(d.number)) continue;
    const official = key.answers.get(d.number);
    if (!official) continue;
    const ok = d.answer.trim().toUpperCase() === official;
    s.scored++;
    if (ok) s.match++;
    else s.mismatched.push(d.number);
    const c = (d.confidence ?? "").trim().toUpperCase() || "?";
    s.byConfidence[c] ??= { ok: 0, of: 0 };
    s.byConfidence[c].of++;
    if (ok) s.byConfidence[c].ok++;
  }
  return s;
}

export type HandSolutions = Record<string, { value: string; reasoning: string }>;

/**
 * The answers to commit: the key's letter, with working from (in order) a hand
 * solution, pass A if it reached the key's letter, pass B if it did. A scored
 * question with none of those is listed in `needHand` and left out.
 */
export function pickWorking(
  key: OfficialKey,
  passA: Derivation[],
  passB: Derivation[],
  hand: HandSolutions
): { answers: Derivation[]; needHand: number[] } {
  const a = new Map(passA.map((d) => [d.number, d]));
  const b = new Map(passB.map((d) => [d.number, d]));
  const numbers = [...new Set([...a.keys(), ...b.keys(), ...Object.keys(hand).map(Number)])].sort(
    (x, y) => x - y
  );
  const answers: Derivation[] = [];
  const needHand: number[] = [];
  const agrees = (d: Derivation | undefined, letter: string) =>
    !!d && d.answer.trim().toUpperCase() === letter;

  for (const n of numbers) {
    if (key.dropped.includes(n)) continue;
    const official = key.answers.get(n);
    if (!official) continue;
    const h = hand[String(n)];
    if (h) {
      answers.push({ number: n, answer: official, value: h.value, confidence: "HIGH", reasoning: h.reasoning });
      continue;
    }
    const pick = agrees(a.get(n), official) ? a.get(n) : agrees(b.get(n), official) ? b.get(n) : undefined;
    if (pick) answers.push({ ...pick, answer: official });
    else needHand.push(n);
  }
  return { answers, needHand };
}
