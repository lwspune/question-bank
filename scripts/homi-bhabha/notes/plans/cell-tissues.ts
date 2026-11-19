/**
 * Reshape plan: Homi Bhabha Std IX "Cell and Tissues" (26 q, every one of the eight papers), for
 * scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 26 stems and solutions. The ingest filed them under five subtopics; cut here by what a
 * question asks: the organelles and how a plant cell differs from an animal cell, the chemistry of
 * the cell with osmosis, plant tissues (meristems, simple and complex permanent tissues), and animal
 * tissues (epithelium, connective tissue, muscle, special cells). Not featured: 827e86fa (eyelids are
 * moved by striated muscle too, so option A is also defensible) and b57e9343 (some books call the red
 * blood cell, not the sperm, the smallest human cell).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  organelles: "Cell Organelles",
  osmosis: "Cell Chemistry and Osmosis",
  plant: "Plant Tissues",
  animal: "Animal Tissues",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Cell and Tissues",
  order: [T.organelles, T.osmosis, T.plant, T.animal],
  byPrefix: {
    [T.organelles]: ["ae450160", "aabbc4e6", "ac1a9345", "d15ba411", "df93f45b", "822c2486", "a0bb91f7", "fb5e1238", "210cd4cc"],
    [T.osmosis]: ["96cc7346", "817de306", "89ae500b", "26967da0"],
    [T.plant]: ["a2aa5bbb", "3e9626d6", "268ba576", "148cf23c", "7192d52e", "f3525423", "d5710f06"],
    [T.animal]: ["4f22bd16", "868f7e4d", "34121b1a", "58ebf16e", "827e86fa", "b57e9343"],
  },
  expected: { [T.organelles]: 9, [T.osmosis]: 4, [T.plant]: 7, [T.animal]: 6 },
  total: 26,
};

export default plan;
