/**
 * NDA Maths · Logarithms · practiceSet + selfCheck MCQs (computation).
 * Hand-authored distractors, theme=computation. Every `correct` re-derived
 * (all 11 harvested atoms were correct as authored). To clear the ≥12 floor,
 * two genuine practiceSet items were ADDED to the notes:
 *   - log-laws-evaluate-combine:practiceSet:0   (\log_2 32 - \log_2 2 = 4)
 *   - log-change-of-base:practiceSet:0          (\log_4 64 = 3)
 * Distractors are tempting log mistakes (change-of-base inverted,
 * log_a a vs log_a 1, dropping a term, sign flips).
 *   npm run quiz:verify nda-maths__logarithms-computation
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── log-foundations ──
  // log_3 81 = 4  (81 = 3^4)
  e("log-foundations:practiceSet:0", [f("3"), f("27"), f("\\tfrac14")]),
  // log_10 25 + log_10 4 = log_10 100 = 2
  e("log-foundations:practiceSet:1", [f("4"), f("1"), f("100")]),
  // log_5 1 = 0 and log_5 5 = 1
  e("log-foundations:practiceSet:2", ["\\(1\\) and \\(0\\)", "\\(0\\) and \\(0\\)", "\\(1\\) and \\(1\\)"]),
  // log_2(-8) undefined: argument must be positive
  e("log-foundations:practiceSet:3", [
    "It equals \\(3\\), since \\(2^3 = 8\\).",
    "It equals \\(-3\\), since \\(2^{-3}\\) is negative.",
    "It equals \\(0\\), since logs of negatives vanish.",
  ]),

  // ── log-laws-evaluate-combine ──
  // ADDED practiceSet: log_2 32 - log_2 2 = log_2 16 = 4
  e("log-laws-evaluate-combine:practiceSet:0", [f("5"), f("16"), f("6")]),
  // log_4 8 + log_9 27 = 3/2 + 3/2 = 3
  e("log-laws-evaluate-combine:selfCheck:0", [f("\\tfrac72"), f("\\tfrac52"), f("\\tfrac32")]),

  // ── log-change-of-base ──
  // ADDED practiceSet: log_4 64 = 3  (64 = 4^3)
  e("log-change-of-base:practiceSet:0", [f("16"), f("\\tfrac13"), f("4")]),
  // log_10 2 · log_2 10 = 1  (reciprocal identity)
  e("log-change-of-base:selfCheck:0", [f("0"), f("\\log_{10}20"), f("2")]),

  // ── log-in-sequences ──
  // GM of 1,3,3^2,3^3 = 3^{6/4} = 3^{3/2}; log_3 G = 3/2
  e("log-in-sequences:selfCheck:0", [f("6"), f("\\tfrac{6}{4}\\cdot\\log_3 3 = 6"), f("3")]),

  // ── log-solve-exponential ──
  // 2 log_10 5 + log_10 4 = log_10 100 = 2
  e("log-solve-exponential:selfCheck:0", [f("4"), f("1"), f("\\log_{10}40")]),

  // ── log-substitute-to-quadratic ──
  // 9^x - 4·3^x + 3 = 0 → t=1,3 → x=0 or x=1
  e("log-substitute-to-quadratic:selfCheck:0", [
    "\\(x = 1\\) or \\(x = 3\\).",
    "\\(x = -1\\) or \\(x = 3\\).",
    "\\(x = 0\\) only (reject \\(t = 3\\)).",
  ]),

  // ── log-trailing-zeros ──
  // 10! has 2 trailing zeros  (⌊10/5⌋ = 2)
  e("log-trailing-zeros:practiceSet:0", [f("1"), f("5"), f("3")]),
  // 25! has 6 trailing zeros  (⌊25/5⌋ + ⌊25/25⌋ = 5 + 1)
  e("log-trailing-zeros:practiceSet:1", [f("5"), f("12"), f("4")]),
];
