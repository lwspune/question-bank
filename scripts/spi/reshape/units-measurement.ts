/**
 * Reshape plan: SPI "Units, Measurement and Dimensions" (9 q), for scripts/spi/reshape.ts.
 *
 * Read all 9 stems and solutions (2026-10-22). The ingest filed them under 8 one-off subtopics.
 * Cut into two pages: why standard units exist and how time is measured (pure recall), then SI
 * units, prefixes and converting CGS units to SI (powers of ten). Never featured: 740e2c0a (2022 Q83:
 * "the ratio of SI to cgs units of force is 1 : ___" is inverted as printed; 1 N : 1 dyne is
 * 10^5 : 1, so a strict reading points to "None of these").
 */
import type { ReshapePlan } from "../reshape";

const T = {
  standard: "Standard Units and Time",
  si: "SI Units, Prefixes and Conversions",
} as const;

const plan: ReshapePlan = {
  chapter: "Units, Measurement and Dimensions",
  order: [T.standard, T.si],
  byPrefix: {
    [T.standard]: ["d52f7369", "dcedf9c5", "9723f2ee", "db73bfad"],
    [T.si]: ["ac23617c", "a0336f8a", "b688952b", "740e2c0a", "ba1f890f"],
  },
  expected: {
    [T.standard]: 4,
    [T.si]: 5,
  },
  total: 9,
};

export default plan;
