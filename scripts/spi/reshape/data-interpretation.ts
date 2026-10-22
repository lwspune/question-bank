/**
 * Reshape plan: SPI "Data Interpretation" (6 q), for scripts/spi/reshape.ts.
 *
 * Read all 6 stems and solutions (2026-10-22). The ingest filed them under 5 one-off subtopics.
 * All are reading one simple chart: a pictograph's key, the axes of a bar graph, and a pie chart's
 * share, central angle or amount. Too few for more than one page. Every key re-solved; none disputed.
 * 2efa13ea needs its chart image (the shares 20% and 45% are read from it), so it is not featured.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  charts: "Pictographs, Bar Graphs and Pie Charts",
} as const;

const plan: ReshapePlan = {
  chapter: "Data Interpretation",
  order: [T.charts],
  byPrefix: {
    [T.charts]: ["9672c942", "e306325b", "dd44d457", "f691f634", "2efa13ea", "19ea3d19"],
  },
  expected: {
    [T.charts]: 6,
  },
  total: 6,
};

export default plan;
