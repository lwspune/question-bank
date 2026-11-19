/**
 * Reshape plan: Homi Bhabha Std IX "Substances in Common Use" (37 q, papers 2010 to 2024), for
 * scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 37 stems and solutions. The ingest filed them under nine subtopics; cut here by what a
 * question asks: the common chemicals made from salt and lime (washing soda, baking soda, caustic
 * soda, bleaching powder, Bordeaux mixture), hard water, soaps, cosmetics and food colours,
 * the materials cement, glass, ceramics and plastics, and radioactive isotopes with their uses and
 * decay. Never featured (each carries a notice): 30b26a47 ("most harmful" deodorant ingredient
 * depends on the source), 398a4077 (a printed line is cut off), 6a6398ab (two pairs are wrong).
 * Not featured either: 0b8735cf (statement 1 is doubtful, see the report).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  chemicals: "Common Chemicals and Their Uses",
  cosmetics: "Soaps, Cosmetics and Food Additives",
  materials: "Cement, Glass and Plastics",
  radio: "Radioactivity and Its Uses",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Substances in Common Use",
  order: [T.chemicals, T.cosmetics, T.materials, T.radio],
  byPrefix: {
    [T.chemicals]: ["6593b30f", "ae7b2e79", "a08e7e80", "3401837f", "3148852e", "cdba0296", "ef53fc16", "1a422131"],
    [T.cosmetics]: ["a3901114", "d12e00f4", "fb281a86", "68daa512", "0b8735cf", "24b9f26b", "6beed0da", "30b26a47", "301a220e", "56aa6e91", "48ad8dfe"],
    [T.materials]: ["fe5ede56", "74c13de3", "0b7b3b46", "ea9243fc", "a901172f", "df802ff9", "c07246e2", "b246c4ba", "5432279e"],
    [T.radio]: ["398a4077", "fa660498", "6ba322e4", "4c8d12d0", "4e6b2488", "9b75a0ba", "6a6398ab", "6a75feb4", "b7413881"],
  },
  expected: { [T.chemicals]: 8, [T.cosmetics]: 11, [T.materials]: 9, [T.radio]: 9 },
  total: 37,
};

export default plan;
