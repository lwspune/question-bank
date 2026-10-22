/**
 * Reshape plan: SPI "Heights and Distances" (37 q), for scripts/spi/reshape.ts.
 *
 * Read all 37 stems and solutions (2026-10-22); every key re-derived. The ingest filed them under 27
 * one-off subtopics. Cut here by how many right triangles the picture needs: one triangle solved
 * with tan (elevation, depression, the sun and a shadow), one triangle with a slant side solved with
 * sin or cos (kites, ropes, ramps, a wire between poles, a broken tree), and two triangles sharing a
 * height (complementary angles, an observer who walks, a flagstaff on a tower, a cloud's reflection).
 * Never featured: 9e7e7915 and ce857bb6 (no printed option is right), 1f9da344 and 7239f548 (two
 * options are the same expression), 512e43da (the distance between the two persons is missing) and
 * 0d43e241 (stem says h, options say H).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  angles: "Angles of Elevation and Depression",
  slant: "Kites, Ropes and Slopes",
  twoAngles: "Two Angles of Elevation",
} as const;

const plan: ReshapePlan = {
  chapter: "Heights and Distances",
  order: [T.angles, T.slant, T.twoAngles],
  byPrefix: {
    [T.angles]: [
      "187a91cb", "e9a4506c", "378cba8b", "64cb58e5", "a9d7ba2a", "18df08f4", "fb42f3b4", "24970494",
      "3c4d8474", "7d0f0c71", "26b96830",
    ],
    [T.slant]: [
      "24cfbed5", "ead806e1", "d1319613", "f49c4b78", "276c2785", "c41e8265", "14560fbc", "2a655c0a",
      "7603e57b", "9e7e7915", "ce857bb6",
    ],
    [T.twoAngles]: [
      "a0676602", "6e353180", "481356de", "3c0dcffa", "9dd934ed", "512e43da", "589073ff", "1f9da344",
      "7239f548", "ffeb8bdc", "d8c66030", "ac66f66b", "f84de3e7", "02806c6c", "0d43e241",
    ],
  },
  // A repeat of a9d7ba2a (the car 150 m from the tower), skipped at commit by content_hash.
  extra: { "mock-5#51": T.angles },
  expected: {
    [T.angles]: 11,
    [T.slant]: 11,
    [T.twoAngles]: 15,
  },
  total: 37,
};

export default plan;
