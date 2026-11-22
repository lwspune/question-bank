/**
 * Reshape plan: SPI "Quadratic Equations" (36 q), for scripts/spi/reshape.ts.
 *
 * Read all 36 stems and solutions (2026-10-22). The ingest filed them under 23 one-off subtopics.
 * Cut here by technique, in teaching order: recognising a quadratic (standard form, degree, reduce
 * before deciding, a situation written as an equation), solving it (a root check, factorisation,
 * the formula), the discriminant (nature of the roots, a range for k, equal roots) and the sum and
 * product of the roots (forming an equation, roots in a relation, wrongly copied coefficients).
 * Never featured: 2df63202 (stem prints "x(x=1)"), 3441da05 and 1e942457 ("Real roots" is also
 * true beside the key), abba86ba (both values of m give roots that are not real).
 * 2026-11-22: the 2026 paper's eight rows added; its six word problems are a fifth page, after
 * solving (ce845c1c, ff4435d0, fd97983f, be3344b3, 429e45cf, 93d291a7).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  recognise: "Recognising a Quadratic Equation",
  solving: "Solving by Factorisation and the Formula",
  nature: "The Discriminant and Nature of Roots",
  sumProduct: "Sum and Product of the Roots",
  word: "Word Problems on Quadratics",
} as const;

const plan: ReshapePlan = {
  chapter: "Quadratic Equations",
  order: [T.recognise, T.solving, T.word, T.nature, T.sumProduct],
  byPrefix: {
    [T.recognise]: ["8d40a62e", "355af212", "2df63202", "d28747a1", "3991e81c", "eec90f8a", "de4c5ecd"],
    [T.solving]: ["a452ecc8", "5ed61c26", "90e1b4b3", "1adcb5c7", "3ec2a2c7"],
    [T.nature]: [
      "3441da05", "43f45b5e", "141b5cab", "07c8ce4c", "dd270ea9", "1e942457", "d94b957b", "c3c0388d",
      "09cebbb8", "2507ec71", "280fa52f", "126282e5", "f29554af", "2f1c7f61", "e28dcc84", "a772af66",
      "747f136d", "47f5fa7a",
    ],
    [T.word]: ["ce845c1c", "ff4435d0", "fd97983f", "be3344b3", "429e45cf", "93d291a7"],
    [T.sumProduct]: ["fc454bb6", "f62ec5a8", "f6c2faa3", "7ae59cea", "77f91f55", "abba86ba", "b18cf770", "de951b7f"],
  },
  expected: {
    [T.recognise]: 7,
    [T.solving]: 5,
    [T.nature]: 18,
    [T.word]: 6,
    [T.sumProduct]: 8,
  },
  total: 44,
};

export default plan;
