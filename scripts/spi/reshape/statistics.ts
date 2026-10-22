/**
 * Reshape plan: SPI "Statistics" (48 q), for scripts/spi/reshape.ts.
 *
 * Read all 48 stems and solutions (2026-10-22). The ingest filed them under 30 one-off subtopics.
 * All are Class 10 central tendency, cut here by the kind of data and the average asked for: the
 * mean of a plain list (with unknowns, number patterns and the effect of changing every value),
 * the median and mode of a plain list, the mean of a frequency table (direct, assumed mean, step
 * deviation), the median and mode of a frequency table, and the empirical relation with graphs.
 * Never featured: 932cd24d (the mean need not change and the mode often does not, so the key
 * rests on a loose reading) and f7847e4f (the key 9.16 cuts 9.166..., where rounding gives 9.17).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  mean: "Mean of Raw Data",
  medianMode: "Median and Mode of Raw Data",
  groupedMean: "Mean of Grouped Data",
  groupedMedian: "Median and Mode of Grouped Data",
  relation: "Empirical Relation and Graphs",
} as const;

const plan: ReshapePlan = {
  chapter: "Statistics",
  order: [T.mean, T.medianMode, T.groupedMean, T.groupedMedian, T.relation],
  byPrefix: {
    [T.mean]: [
      "7054dbb0", "f22ec334", "12d315fd", "a3ac8828", "f7847e4f", "ce5f7a13", "2e498dfa", "f9ea6325",
      "3049bbf2", "92630cc7", "96c43416", "d5d12cb9", "ea93f07d",
    ],
    [T.medianMode]: [
      "cfb035fa", "9798b9a7", "5e515bb2", "932cd24d", "5de9bd35", "96ec6ac8", "13f46a4e", "934bf922",
    ],
    [T.groupedMean]: [
      "88844e8b", "a5a3b066", "d44fb88c", "bdd50e93", "26a910cb", "b7a405fb", "980e841e", "1c0127d9",
      "980f7ed0", "92403aae",
    ],
    [T.groupedMedian]: [
      "cb4c7dc0", "b67991f1", "6d311195", "5cf03c9e", "d96c927c", "7fc12b02", "e516acde", "17d3fb87",
      "f49c438a", "784c2c36",
    ],
    [T.relation]: ["0794907f", "b8ad0a69", "9161612c", "4f17bdc2", "f23144c4", "c9ae0da4", "79d9f4d9"],
  },
  // Repeats skipped at commit by content_hash: mock-2#63 of ce5f7a13 (mean of 1 to n), mock-4#60 of
  // 6d311195 (the median formula), mock-5#60 and mock-6#60 of 7fc12b02 (the mode formula), mock-6#62
  // of ea93f07d (the sum less the mean) and mock-6#64 of 3049bbf2 (every value up by 3).
  extra: {
    "mock-2#63": T.mean,
    "mock-4#60": T.groupedMedian,
    "mock-5#60": T.groupedMedian,
    "mock-6#60": T.groupedMedian,
    "mock-6#62": T.mean,
    "mock-6#64": T.mean,
  },
  expected: {
    [T.mean]: 13,
    [T.medianMode]: 8,
    [T.groupedMean]: 10,
    [T.groupedMedian]: 10,
    [T.relation]: 7,
  },
  total: 48,
};

export default plan;
