/**
 * Reshape plan: Homi Bhabha Std IX "Microbes" (21 q, every one of the eight papers), for
 * scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 21 stems and solutions. The ingest filed them under five subtopics; cut here by what a
 * question asks: the groups of microbes with the fungi, the useful microbes of food and medicine,
 * the microbes of the nitrogen cycle, and the microbes of disease with Clostridium. Never featured:
 * f410ae55 (carries a notice: every statement is true of fungi as printed). 6c9597d8 (2017) and
 * 53bb3968 (Nov 2021) are the same narrow-spectrum antibiotic question.
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  kinds: "Kinds of Microbes and Fungi",
  useful: "Microbes in Food and Medicine",
  nitrogen: "Microbes and Nitrogen Fixation",
  harmful: "Disease-Causing Microbes",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Microbes",
  order: [T.kinds, T.useful, T.nitrogen, T.harmful],
  byPrefix: {
    [T.kinds]: ["aeaaa639", "c7882040", "7979eca8", "f0c0dfda", "f410ae55", "ba61856b"],
    [T.useful]: ["bf65ecfb", "15aebd0d", "6c9597d8", "53bb3968", "53239daa", "ceb28f3c"],
    [T.nitrogen]: ["3bfcdf10", "8b822250", "dcf2f581", "46a1e6d9"],
    [T.harmful]: ["71fdf451", "eaf75ed3", "4056723c", "f5f6a9e4", "fb287e17"],
  },
  expected: { [T.kinds]: 6, [T.useful]: 6, [T.nitrogen]: 4, [T.harmful]: 5 },
  total: 21,
};

export default plan;
