/**
 * Reshape plan: SPI English "Sentence Rearrangement" (10 q), for scripts/spi/reshape.ts.
 *
 * Read all 10 stems and solutions (2026-10-22). Every row is one sentence cut into four parts
 * P, Q, R, S (2022 Q146-150, Sample Paper GAT Q42-46), all filed under "Jumbled Parts". Cut here
 * by the clue that fixes the order: the opening part (the subject) and the word pairs that must sit
 * together come first; linkers (but, yet, while, even if) and the "None of these" option second.
 * Never featured: 0d76f562 (RSPQ, the second-best order, is also grammatical; the key RSQP rests on
 * where the place phrase reads best).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  opening: "Opening Part and Word Pairs",
  linkers: "Linkers and the None Option",
} as const;

const plan: ReshapePlan = {
  chapter: "Sentence Rearrangement",
  order: [T.opening, T.linkers],
  byPrefix: {
    [T.opening]: ["89e781d5", "1bb46657", "b14aa4c1", "0e0fa164", "c876fc6e", "2a1cced1"],
    [T.linkers]: ["d214da6e", "9894be11", "0d76f562", "78a8592c"],
  },
  expected: {
    [T.opening]: 6,
    [T.linkers]: 4,
  },
  total: 10,
};

export default plan;
