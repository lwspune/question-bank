/**
 * Reshape plan: SPI "Energy Sources" (8 q), for scripts/spi/reshape.ts.
 *
 * Read all 8 stems and solutions (2026-10-22). The ingest filed them under 7 one-off subtopics.
 * All are recall questions, cut here by the kind of source: power plants and which sources are
 * clean (nuclear, hydroelectric, solar), then energy from living matter (biomass and biogas).
 * Never featured: 4712f4f6 (coal is printed as an option and is not biomass either, so two options
 * fit "not biomass").
 */
import type { ReshapePlan } from "../reshape";

const T = {
  power: "Power Plants and Clean Energy",
  bio: "Biomass and Biogas",
} as const;

const plan: ReshapePlan = {
  chapter: "Energy Sources",
  order: [T.power, T.bio],
  byPrefix: {
    [T.power]: ["d7cbc1fa", "2395f6be", "5e5cd9d7", "b5b39ac4", "2f292853"],
    [T.bio]: ["9301c35a", "4712f4f6", "8b761b27"],
  },
  expected: {
    [T.power]: 5,
    [T.bio]: 3,
  },
  total: 8,
};

export default plan;
