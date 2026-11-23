/**
 * Reshape plan: Homi Bhabha Std IX "Space and Astronomy" (21 q), for
 * scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 21 stems and solutions. The ingest filed them under four subtopics; cut here by what a
 * question asks: the Sun, the life and density of stars and the moons of the planets; lens and
 * mirror telescopes; and artificial satellites (the 2018 passage set and India's satellites and
 * launch vehicles). Never featured: b2e8aa19 (the flow chart sends a Cassegrain, which has an
 * eyepiece lens, down the "no lenses" branch; key by elimination), 5a476d22 (no option is the
 * communication system alone), 5ead26d8 (two of its four factors are not in the passage).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  stars: "Stars and the Solar System",
  telescopes: "Telescopes",
  satellites: "Artificial Satellites",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Space and Astronomy",
  order: [T.stars, T.telescopes, T.satellites],
  byPrefix: {
    [T.stars]: ["03ad2671", "55c6fddb", "5d7a7a67", "86d7158c", "68f5a939", "b5f618fc", "36683143", "ac7344b6", "c298bf03"],
    [T.telescopes]: ["9cd62951", "59b659b7", "90d83792", "b2e8aa19", "74a3d17a"],
    [T.satellites]: ["0d0f61c5", "304dc8b4", "400f92ce", "5a476d22", "5ead26d8", "b9ad7c0c", "df1381bb"],
  },
  expected: { [T.stars]: 9, [T.telescopes]: 5, [T.satellites]: 7 },
  total: 21,
};

export default plan;
