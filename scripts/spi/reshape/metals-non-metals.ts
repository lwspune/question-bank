/**
 * Reshape plan: SPI "Metals and Non-Metals" (7 q), for scripts/spi/reshape.ts.
 *
 * Read all 7 stems and solutions (2026-10-22). The ingest filed them under 7 one-off subtopics.
 * Cut here into two pages: what metals and non-metals are like (properties and uses, the
 * reactivity series and displacement, alloys), then metallurgy (ores, concentrating an ore,
 * getting the metal out, heat treatment of steel). No key is disputed. 09ceafcb prints "Forth
 * floatation" for froth flotation in its key option.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  properties: "Properties, Reactivity and Alloys",
  extraction: "Ores and Extraction of Metals",
} as const;

const plan: ReshapePlan = {
  chapter: "Metals and Non-Metals",
  order: [T.properties, T.extraction],
  byPrefix: {
    [T.properties]: ["cf7e0a67", "84d1ade9", "f9dd6e9a"],
    [T.extraction]: ["5e9b0260", "09ceafcb", "6308d841", "481a6894"],
  },
  expected: {
    [T.properties]: 3,
    [T.extraction]: 4,
  },
  total: 7,
};

export default plan;
