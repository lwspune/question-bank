/**
 * Reshape plan: SPI English "Vocabulary" (43 q), for scripts/spi/reshape.ts.
 *
 * Read all 43 stems and solutions (2026-10-22). The ingest filed them under seven question-type
 * subtopics (Synonyms, Antonyms, Spelling, two spellings of One-Word Substitution, Word Meanings,
 * Word Pairs). Cut here by the task the question sets: find the nearest meaning (Word Meanings is
 * the same task, so frolic joins it), find the opposite (which leans on spotting the synonyms among
 * the options, so it comes second), and the word-form tasks (a misspelt word, one word for a phrase,
 * a fixed pair). Never featured: c0681ccd (two options, conference and assembly, both mean meeting).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  synonyms: "Synonyms",
  antonyms: "Antonyms",
  forms: "Spelling and One-Word Substitutes",
} as const;

const plan: ReshapePlan = {
  chapter: "Vocabulary",
  order: [T.synonyms, T.antonyms, T.forms],
  byPrefix: {
    [T.synonyms]: [
      "4677b0da", "8539c7d6", "0e9821e9", "19bc4e76", "7acdd40a", "68ca3e2a", "162d2e06", "384cec12",
      "44766fde", "3b921ccb", "00586787", "fb39136b", "ed806bf7", "7e3a1bc6", "3aca8657", "957d0c25",
      "2e6b392b", "75b39c25", "c0681ccd",
    ],
    [T.antonyms]: [
      "62a73136", "15a79485", "ae9a56aa", "8078d804", "2c0921cd", "d76ae219", "e852539b", "b41c2bb2",
      "19d1b893", "3408bbc3", "541756bd", "f1a71ba4", "e6bee56c", "b7f09a08",
    ],
    [T.forms]: [
      "d2df4820", "ad642167", "140af988", "487812e4", "bf5ad1b5", "4690b24d", "3369f9f2", "0587af0e",
      "4decf1a7", "de4bcec3",
    ],
  },
  expected: {
    [T.synonyms]: 19,
    [T.antonyms]: 14,
    [T.forms]: 10,
  },
  total: 43,
};

export default plan;
