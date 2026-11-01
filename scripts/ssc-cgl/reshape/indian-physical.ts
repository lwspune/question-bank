/**
 * Reshape plan: SSC CGL Tier I General Awareness Geography "Indian Geography: Physical Features" (95 q), for
 * scripts/ssc-cgl/reshape.ts.
 *
 * Read all 95 rows (2026-11-01, main session). Cut into rivers and lakes; mountains, plateaus, plains and
 * location; climate, soils and vegetation. Never featured: d0990a3d (more than one option defensible),
 * 1ccf89fc and 7d507213 (printed in Hindi only), e1695e54 (largest lake: the key is SSC's reading).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  rivers: "Rivers, Lakes and Water Resources",
  relief: "Mountains, Plateaus and Plains of India",
  climate: "Climate, Soils and Vegetation of India",
} as const;

const plan: ReshapePlan = {
  subject: "Geography",
  chapter: "Indian Geography — Physical Features",
  order: [T.rivers, T.relief, T.climate],
  byPrefix: {
    [T.rivers]: [
      "538d2566", "667405a5", "6acb53c5", "7688954b", "8784a20c", "9666e5da", "1c3dae3a", "d0990a3d",
      "e924834e", "015f0ff6", "498fc84a", "ef0c8f2a", "c605a99d", "dea5c946", "01f5669c", "2874a6ef",
      "2cdc8608", "30b124cc", "6fcd61c8", "c435109e", "e11bbd66", "e361e738", "f35a36dd", "28e75163",
      "8be92038", "d6ddf9dc", "e2d2ae16", "ee385fa2", "f1e60e11", "1ccd3f4b", "79a0ac6a", "b8c589d4",
      "e1695e54", "ed3de76d", "0258cb91", "0665bec7", "38b4e0dc", "b4095a45", "acd17877", "c22b665f",
      "fe87fa07",
    ],
    [T.relief]: [
      "1f6b9578", "336c157b", "7abce283", "9a89014a", "a6c54c49", "ac3ba6dd", "d2f1e093", "de85b248",
      "dfc7ba5c", "24590d47", "93c563bd", "b28456df", "958c0a68", "a47c25ca", "e9cb8253", "2df4ec12",
      "3a0afae0", "7bc49f67", "7e11d050", "8c45b744", "662ef97f", "79417364", "795da14e", "97688425",
      "655b7895", "ea4e6681", "3cae83c9", "7224cfaa", "1731a9cf", "8834ca77", "f5a4912b",
    ],
    [T.climate]: [
      "633dc775", "7d507213", "d92a21f4", "e617be8a", "29fd5a91", "406b3918", "87c423c5", "98d6cce7",
      "834043bb", "1ccf89fc", "310a09e5", "579f230a", "660be719", "b3c57109", "b5ff16c0", "ca6dd2e3",
      "4f1c662e", "05f8275d", "b21bb0a5", "f3a8fd49", "34bce3c4", "b3bcc33a", "8a8c8869",
    ],
  },
  expected: {
    [T.rivers]: 41,
    [T.relief]: 31,
    [T.climate]: 23,
  },
  total: 95,
};

export default plan;
