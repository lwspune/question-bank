/**
 * Reshape plan: SPI "Modern India" (38 q), for scripts/spi/reshape.ts.
 *
 * Read all 38 stems and solutions (2026-10-22). The ingest filed them under ~25 one-off subtopics.
 * All are NCERT Class 8 and Class 10 named-fact recall, cut here in time order: the Company and the
 * revolt of 1857, the reform societies and the fight against caste, Gandhi's first movements up to
 * the end of Non-Cooperation (1915 to 1922), and the Swaraj Party to the Poona Pact (1923 to 1932).
 * Never featured: b0beef15 (the stem says Dalhousie "announced the death of" Zafar; the solution
 * carries a Note), bdeb8f95 (options A to D name statements i to iv) and 0b1007e9 (typo
 * "Non - Non - Cooperation" in the stem).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  revolt: "Company Rule and the Revolt of 1857",
  reform: "Social Reform and the Fight Against Caste",
  noncoop: "Gandhi and the Non-Cooperation Movement",
  civil: "From the Swaraj Party to the Poona Pact",
} as const;

const plan: ReshapePlan = {
  chapter: "Modern India",
  order: [T.revolt, T.reform, T.noncoop, T.civil],
  byPrefix: {
    [T.revolt]: ["b0beef15", "bdeb8f95", "bae121a5", "1f4186a2", "b753bcbb", "3697c3cf"],
    [T.reform]: [
      "506e0a87", "1686b3bd", "ddf5f92d", "c1b9e192", "f7d25523", "203aa6dc", "4b39c880", "c1a316bf",
    ],
    [T.noncoop]: [
      "e27d8203", "4cc97f2e", "0e59f701", "f4ea8821", "d955e4a8", "9963a3fa", "a4c0cb6b", "99dad695",
      "0b1007e9", "3ce60fd6", "959a28f2", "ec6b2931",
    ],
    [T.civil]: [
      "13c2d96a", "3479c3c7", "e7cc512c", "bfe1eae1", "2ee1b37b", "c49a3815", "030418cb", "2530497f",
      "34f80691", "79103f62", "1b25536e", "76cb54f8",
    ],
  },
  // Repeats of bank rows, skipped at commit by content_hash: 1686b3bd (Paramhans Mandali),
  // e7cc512c (Swaraj Party), 34f80691 (Gandhi-Irwin Pact), 0e59f701 (First World War).
  extra: {
    "mock-3#127": T.reform,
    "mock-3#137": T.civil,
    "mock-5#138": T.civil,
    "mock-6#138": T.noncoop,
  },
  expected: {
    [T.revolt]: 6,
    [T.reform]: 8,
    [T.noncoop]: 12,
    [T.civil]: 12,
  },
  total: 38,
};

export default plan;
