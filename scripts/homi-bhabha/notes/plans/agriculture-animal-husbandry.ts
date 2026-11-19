/**
 * Reshape plan: Homi Bhabha Std IX "Agriculture and Animal Husbandry" (21 q), for
 * scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 21 stems and solutions. The ingest filed them under nine subtopics; cut here by what a
 * question asks: growing a crop (soil, sowing, weeds, manure, the farm revolutions and medicinal
 * plants), protecting crops and stored food (pesticides, fumigants, preservation), the breeds of
 * poultry, cows and buffaloes, and fish, silk and lac. Never featured: b554f4bd (carries a notice:
 * Marathi fish names), f9e7ea63 ("smoking" stands for fumigation).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  crops: "Crop Production",
  protect: "Crop Protection and Food Storage",
  breeds: "Poultry and Cattle Breeds",
  fish: "Fisheries, Silk and Lac",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Agriculture and Animal Husbandry",
  order: [T.crops, T.protect, T.breeds, T.fish],
  byPrefix: {
    [T.crops]: ["d7e13d8e", "2be8e9a6", "13b04938", "63d9ea39", "479e7baa", "8c6931e6"],
    [T.protect]: ["62bb0d78", "e2a3f5bd", "f9e7ea63", "1891b5f9"],
    [T.breeds]: ["ecc9fcc9", "39010f11", "36279d7d", "93dce4ef", "77471448", "92989c52", "8ce8d58b"],
    [T.fish]: ["17a8bfd9", "b554f4bd", "06f8d988", "870211fb"],
  },
  expected: { [T.crops]: 6, [T.protect]: 4, [T.breeds]: 7, [T.fish]: 4 },
  total: 21,
};

export default plan;
