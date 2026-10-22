/**
 * Reshape plan: SPI "Cell Biology" (8 q), for scripts/spi/reshape.ts.
 *
 * Read all 8 stems and solutions (2026-10-22). The ingest filed them under 7 one-off subtopics.
 * Cut here into the cell and its parts (the cell as the unit of life, plant and animal cells, the
 * membrane, the organelles), then osmosis, which needs the membrane first. Never featured:
 * 00786833 (potato peel: "cells" and "cell wall and cell membranes of those cells" can both be
 * defended).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  structure: "Cell Structure",
  osmosis: "Diffusion and Osmosis",
} as const;

const plan: ReshapePlan = {
  chapter: "Cell Biology",
  order: [T.structure, T.osmosis],
  byPrefix: {
    [T.structure]: ["73dbe68b", "00786833", "d93650b7", "0422c5d0", "01c13824", "8e5831f2"],
    [T.osmosis]: ["80cd8e98", "45038a35"],
  },
  expected: {
    [T.structure]: 6,
    [T.osmosis]: 2,
  },
  total: 8,
};

export default plan;
