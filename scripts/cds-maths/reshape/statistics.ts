/**
 * Reshape plan — CDS "Statistics" (80 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 80 stems AND solutions (2026-09-29). "Measures of Central Tendency" (61) is the whole
 * chapter under one name. It cannot be cut by MEASURE (mean / median / mode), because ten
 * premise sets ask for the mean, the median and the mode of one table in consecutive items;
 * a measure-cut would scatter every set. So the cut is by the KIND OF DATA and the technique:
 * raw lists (the median of ungrouped data), the properties of the mean (shift, scale,
 * deviations, pooling), discrete x–f tables and cumulative tables, grouped class-interval data
 * (the three formulas, missing frequencies), and a closing page on which measure to use. The
 * data-type, scale and diagram questions form the opening page. Every premise set is co-located.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  data: "Data, Scales and Presentation",
  tables: "Frequency Tables and Cumulative Frequency",
  mean: "Properties of the Arithmetic Mean",
  median: "Median of Ungrouped Data",
  grouped: "Mean, Median and Mode of Grouped Data",
  choosing: "Choosing a Measure of Central Tendency",
} as const;

const plan: ReshapePlan = {
  chapter: "Statistics",
  order: [T.data, T.tables, T.mean, T.median, T.grouped, T.choosing],
  whole: {},
  byPrefix: {
    [T.data]: [
      "284cf6a6", "c8806df5", "0f4ef40d", "f8269ab8", "ab13be14", "e8f93f9b", "9eb4e87e", "225062df",
      "eadada9c", "63b78b1f", "6c0408e7",
    ],
    [T.tables]: [
      "0e3ff9e7", "9cc9d622", "b8d2e658", "08c7f32f", "15da37c9", "d067d7fd", "fc19ed2f", "c5b5746e",
      "8a8e1c91", "357974a3", "e45cbfa1", "9d890a60", "d2967912", "bf2df2da", "1e6e87cf",
    ],
    [T.mean]: [
      "9880e69f", "3fcb26a0", "8dd878b0", "c77358f0", "9b9ba690", "fb095cf9", "ee12e1d4", "31a52976",
      "3cc9980d", "15efd11a", "a35ac074", "1c570a99",
    ],
    [T.median]: [
      "03f8ad27", "17ef19fb", "13a00e4c", "41674b57", "26ff1fb6", "c4f418f7", "487d5cc6", "f36e4967",
      "d95becfc", "91ea04c9", "2ab7bb4c", "544e3a3c", "1f39b1a1", "04342395", "bb0036d6",
    ],
    [T.grouped]: [
      "8f3e6078", "2e10b690", "af6346b9", "0ef97c27", "4b8364c6", "eefcf5b6", "da35335d", "282aa03e",
      "14087f15", "0547b07d", "a82d215f", "4a0cc2b2", "5498765c", "9e8d1673", "9f3d7837", "a6f6fc40",
      "856b7b64", "8dd349d6", "240c80d2",
    ],
    [T.choosing]: ["4c80f6af", "3deb83e1", "62fce456", "3cf77ade", "73e0a6a2", "0f573428", "6c446ccf", "b5b867bb"],
  },
  expected: {
    [T.data]: 11,
    [T.tables]: 15,
    [T.mean]: 12,
    [T.median]: 15,
    [T.grouped]: 19,
    [T.choosing]: 8,
  },
  total: 80,
};

export default plan;
