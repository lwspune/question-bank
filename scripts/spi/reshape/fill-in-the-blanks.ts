/**
 * Reshape plan: SPI "Fill in the Blanks" (26 q), for scripts/spi/reshape.ts.
 *
 * Read all 26 stems and solutions (2026-10-22). The ingest filed them under 13 one-off subtopics.
 * None is from the 2022 paper: ten are from the sample paper, sixteen from LWS mocks. Cut here by
 * what decides the gap: the word that fits the meaning and its fixed partner, the preposition, the
 * article and the verb's agreement (a15f7bd7 joins the two: one article, one person, a singular verb),
 * and last the tense, ending with the two-blank sequence items.
 * Never featured: cfd47f3f ("on a holiday" and "for a holiday" both fit, the solution's note says so)
 * and 196d92ea ("anxious about the safety" is also standard English beside the key's "anxious for").
 */
import type { ReshapePlan } from "../reshape";

const T = {
  words: "Word Choice and Collocations",
  prepositions: "Prepositions",
  articles: "Articles and Agreement",
  tenses: "Tenses",
} as const;

const plan: ReshapePlan = {
  chapter: "Fill in the Blanks",
  order: [T.words, T.prepositions, T.articles, T.tenses],
  byPrefix: {
    [T.words]: ["4c67c2c1", "6736cc7b", "84b32804", "13d75aec", "ca91b375"],
    [T.prepositions]: [
      "47fd48ce", "32065d41", "34576914", "cfd47f3f", "3e5e1a60", "1c2be71d", "f73ae1b9", "d477ec3f",
      "196d92ea", "ea558786",
    ],
    [T.articles]: ["372fdd8a", "443e3eec", "8c4d0d8e", "18d85190", "a15f7bd7"],
    [T.tenses]: ["3ea73492", "7a4f9438", "1ce0d97f", "f62a3790", "6b2f6c4c", "8448c827"],
  },
  expected: {
    [T.words]: 5,
    [T.prepositions]: 10,
    [T.articles]: 5,
    [T.tenses]: 6,
  },
  total: 26,
};

export default plan;
