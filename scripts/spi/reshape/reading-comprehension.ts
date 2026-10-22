/**
 * Reshape plan: SPI English "Reading Comprehension" (18 q), for scripts/spi/reshape.ts.
 *
 * Read all 18 stems and solutions (2026-10-22). Three passages: frogs (Sample Paper, 5 q), the
 * CBSE pre-board ruling (Practice Paper 1, 5 q) and Jim Corbett's 'The Law of the Jungle' (2022
 * paper, 8 q). Every row of one passage stays on one page and under one concept. The two short
 * factual passages teach finding the line and cutting near-miss options; the 2022 passage, with
 * its inference, writer's-meaning and "cannot be said" items, teaches inference.
 * Never featured: fe09d4e9 (no option states the ruling; the key marks the closest one) and
 * cbb49859 (who is elder rests on a weak clue; "cannot be said" is arguable).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  facts: "Finding Stated Facts",
  inference: "Inference and the Writer's Meaning",
} as const;

const plan: ReshapePlan = {
  chapter: "Reading Comprehension",
  order: [T.facts, T.inference],
  byPrefix: {
    [T.facts]: [
      "afa6bb45", "f7f3d75b", "0e04af0a", "9781d94c", "7cf0111e",
      "9aebef9e", "fe09d4e9", "05897b2a", "f8b23c86", "4d551131",
    ],
    [T.inference]: [
      "bd4cf462", "772408d7", "6d80e9e7", "cbb49859", "adaf5b1d", "f4259de8", "5bb7b369", "d6abbc5a",
    ],
  },
  expected: {
    [T.facts]: 10,
    [T.inference]: 8,
  },
  total: 18,
};

export default plan;
