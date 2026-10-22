/**
 * Reshape plan: SPI "Spotting Errors" (33 q), for scripts/spi/reshape.ts.
 *
 * Read all 33 stems and solutions (2026-10-22). The ingest filed them under 27 one-off subtopics.
 * Cut here by the check a student runs on a sentence, in the order to run them: the verb (agreement
 * and its form), the tense, the preposition, then pronouns, comparisons and connector pairs, and last
 * the sentence that passes every check (No error). Five rows are from the 2022 paper.
 * Never featured: ba261893 (two parts carry an error as printed: "colleted" in (b) and the
 * preposition in (c)), 77f9030a (the option letters are printed confusingly, see its note),
 * b4b86128 (the missing "been" could be added to part (b) or (c)), 7a8aa74b ("it's well to" is an
 * old, formal idiom; some keys call it an error) and f448db93 (the printed part is garbled).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  verbs: "Agreement and Verb Forms",
  tenses: "Tenses",
  prepositions: "Prepositions and Fixed Phrases",
  words: "Pronouns, Comparisons and Connectors",
  noError: "Sentences with No Error",
} as const;

const plan: ReshapePlan = {
  chapter: "Spotting Errors",
  order: [T.verbs, T.tenses, T.prepositions, T.words, T.noError],
  byPrefix: {
    [T.verbs]: [
      "f27bc586", "5112f456", "5da3b80a", "2579465e", "cab10308", "b4b86128", "815a9c1b", "3871f385",
      "97eee46e",
    ],
    [T.tenses]: ["cb7d1c4b", "09e595b4", "b94cccbd", "fc1f3cca", "11d6807f"],
    [T.prepositions]: [
      "e3bb3e74", "cb7cac7d", "f1ec607d", "af256b5f", "693828f2", "318f93f5", "9211f5e1", "ba261893",
    ],
    [T.words]: ["c53b912b", "73b0be5a", "eed9ca9f", "77f9030a", "afd5239b", "f448db93"],
    [T.noError]: ["49b64d32", "9db1c7cb", "16af4417", "80a55723", "7a8aa74b"],
  },
  expected: {
    [T.verbs]: 9,
    [T.tenses]: 5,
    [T.prepositions]: 8,
    [T.words]: 6,
    [T.noError]: 5,
  },
  total: 33,
};

export default plan;
