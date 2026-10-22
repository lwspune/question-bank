/**
 * Reshape plan: SPI English "Idioms and Phrases" (23 q), for scripts/spi/reshape.ts.
 *
 * Read all 23 stems and solutions (2026-10-22). The ingest filed them under seven near-duplicate
 * subtopics (Idiom Meaning, Idiom Meanings, Meaning of Idioms, Idiom Meaning in Context, Phrasal
 * Verbs, Prepositions in Idioms). Cut here by the task: twenty ask what an idiom means, and three
 * ask for the small fixed word (a phrasal verb's particle, an idiom's preposition), which is a
 * different skill and a page of its own even at three rows. No row is flawed; b309876d and
 * ef75531f carry printed typos in wrong options ("Wiling", "small") and are not featured.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  meanings: "Idiom Meanings",
  phrasal: "Phrasal Verbs and Prepositions",
} as const;

const plan: ReshapePlan = {
  chapter: "Idioms and Phrases",
  order: [T.meanings, T.phrasal],
  byPrefix: {
    [T.meanings]: [
      "70b93eca", "97cf903e", "c6bd6a78", "67f84ba1", "71f569e6", "1cdad42d", "edd599d3", "912f4645",
      "65239558", "c7a15747", "6671c5bd", "33481922", "e16fe5e7", "a0d7f2ed", "65c377e0", "b309876d",
      "ae27e652", "ef75531f", "8484eedf", "52a9e69a",
    ],
    [T.phrasal]: ["723eb738", "103756fb", "0110fa7e"],
  },
  expected: {
    [T.meanings]: 20,
    [T.phrasal]: 3,
  },
  total: 23,
};

export default plan;
