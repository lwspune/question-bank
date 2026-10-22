/**
 * Reshape plan: SPI "Grammar" (97 q), for scripts/spi/reshape.ts.
 *
 * Read all 97 stems and solutions (2026-10-22). The ingest filed them under 15 subtopics, several
 * of them one-row buckets (Modals, Infinitives, Present Perfect Tense, Past Continuous Tense). Cut
 * here by grammar point, in teaching order: tenses first (voice and reported speech both lean on
 * them), then agreement and joining words, articles, prepositions, the passive by tense, the
 * special passives (questions, modals, make, believe, know, expect), reported statements, and
 * reported questions, commands and exclamations. The five 2022 rows were filed as "Sentence
 * Improvement": four test a tense and one (5f9935b5) agreement.
 * Never featured: 9baa9e8e (no option is right: "you" should be "I"), a41f620a ("The crab has a
 * hard shell" is also correct), 346eafe8 (blank printed before "laughing"), aa43bcd4 (keyed option
 * prints a full stop for a comma), 08e85b88 ("the the" in the stem), 6276b26d and c0ca767b (a second
 * option is also a fair passive), 28e0d9a5 (the "we" is a guess from the reported "they").
 */
import type { ReshapePlan } from "../reshape";

const T = {
  tenses: "Tenses and Verb Forms",
  agreement: "Agreement and Conjunctions",
  articles: "Articles",
  prepositions: "Prepositions",
  passive: "Passive Voice by Tense",
  passiveSpecial: "Passive Questions, Modals and Special Verbs",
  speech: "Reported Statements",
  speechQuestions: "Reported Questions, Commands and Exclamations",
} as const;

const plan: ReshapePlan = {
  chapter: "Grammar",
  order: [
    T.tenses,
    T.agreement,
    T.articles,
    T.prepositions,
    T.passive,
    T.passiveSpecial,
    T.speech,
    T.speechQuestions,
  ],
  byPrefix: {
    [T.tenses]: [
      "8ec875d0", "f3cbc4a0", "19076fdf", "d870fa23", "a952bc2d", "1d0b8e39", "ed1777b5", "08003dcf",
      "e9096c36", "a3b75d9a", "b11db206", "08e85b88", "fd8b2098", "549a3faf", "b3629489",
    ],
    [T.agreement]: [
      "5f9935b5", "b82e1f7e", "10af653f", "a932a710", "304a381f", "0a40cf35", "61f10676", "cc9b13d3",
    ],
    [T.articles]: [
      "04295919", "0bfc9fb0", "df1eda8b", "2bf0206c", "81f0fbb9", "85ae2401", "eb17a5a1", "2c2c5403",
      "561e77c6", "42f808fd", "4cfb5677", "a41f620a", "ad8fb3a7", "8d514c1a", "de05c228",
    ],
    [T.prepositions]: [
      "afc4b7f0", "c3a0c5bc", "70bfb9e4", "01372d6d", "53083954", "71feb40f", "7b1ccfb0", "346eafe8",
      "972e5aee", "2b2ae471", "966497ab",
    ],
    [T.passive]: [
      "17b8295d", "b1005899", "7a0d1263", "90a76532", "5c21b663", "5cedc5a7", "eb37b7ec", "70e7087d",
      "51d198dc", "045822a8", "92b26236", "21381f3e", "56ce6e29", "71ae8c0c",
    ],
    [T.passiveSpecial]: [
      "75feb02b", "2aa1d6e1", "fbd4a488", "f6d9bca7", "bbf802cc", "0dd54080", "a72acef1", "6353860e",
      "6276b26d", "c0ca767b",
    ],
    [T.speech]: [
      "aa43bcd4", "dd824cad", "6d4fdc3a", "4aaac815", "87287719", "83b914d5", "b38f94fb", "43c45dd1",
      "10e7918e", "d6e709f8", "28e0d9a5",
    ],
    [T.speechQuestions]: [
      "e95874a4", "ac7f2d7e", "b381159a", "ea8b2a2e", "0aaf5eb5", "093c05e5", "9baa9e8e", "70c4af88",
      "43f4155e", "cf12bb74", "c0474ca5", "5a729b58", "00b00671",
    ],
  },
  expected: {
    [T.tenses]: 15,
    [T.agreement]: 8,
    [T.articles]: 15,
    [T.prepositions]: 11,
    [T.passive]: 14,
    [T.passiveSpecial]: 10,
    [T.speech]: 11,
    [T.speechQuestions]: 13,
  },
  total: 97,
};

export default plan;
