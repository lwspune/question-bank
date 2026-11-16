/**
 * Reshape plan: SSC CGL TIER II English "Grammar" (62 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 62 stems and keys (2026-11-15); every key agreed. The ingest put 49 rows in one "Voice and
 * Reported Speech" subtopic and spread the other 13 over seven subtopics of 1-4 rows. Three pages:
 * VOICE (24), SPEECH (25), and the one-word GRAMMAR BLANKS (13).
 * Flawed (solution opens with a **Note:**, tagged but never featured): f98e0b20 ("Access denied" is
 * already passive), 6ecfda1b (two passive forms of a negative command are both right), c9633583 (the
 * given sentence is already passive).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  voice: "Active and Passive Voice",
  speech: "Direct and Indirect Speech",
  blanks: "One-Word Grammar Blanks",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "English",
  chapter: "Grammar",
  order: [T.voice, T.speech, T.blanks],
  byPrefix: {
    [T.voice]: [
      "00093fd7", "067141aa", "0f45ca09", "3fb46cfc", "43209ae0", "43682e5c", "a1db99a4", "be2a2fc5", "c301c941", "e0bd11b8",
      "7e76bf2b", "33fde9a0", "639c161d", "69b888c7", "82bea962", "a84bd1e0", "10d7d354",
      "e42e05f2", "378b5372", "f98e0b20", "6ecfda1b", "c885e255", "c9633583", "25cfa195",
    ],
    [T.speech]: [
      "30f2dcfa", "886ceaa5", "a013fd85", "c300bbcf", "d4e88016", "131cc661", "9ad87a3c", "b5cd5fbc", "64e15396", "67418822",
      "a57367f9", "d227d874",
      "1860b4eb", "8d5629b2", "b294ce33", "dd970ff6", "94066425", "94353fbb", "bd2dc7d9", "c9afff7a",
      "24984e5f", "63332099", "b95b268f", "7c36ee9f", "db7b0114",
    ],
    [T.blanks]: [
      "833d7404", "1fd105cc", "3e253343", "876accdf", "ab9a87c7",
      "4aa7badb", "648d2dba", "c5fa6eb2", "a238b8ac", "9b3d24b3",
      "b0562ba6", "240e14c1", "f52a1d0f",
    ],
  },
  expected: { [T.voice]: 24, [T.speech]: 25, [T.blanks]: 13 },
  total: 62,
};

export default plan;
