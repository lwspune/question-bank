/**
 * CLAT UG sittings for the mock builder: one mock per year in the bank, the
 * Consortium's Set A paper whole. A year is listed in CLAT_MOCK_YEARS once its
 * commit lands (scripts/clat/commit.ts writes one source file per year).
 *
 * Section sizes come from years.json (each booklet's own contents page): 150
 * questions in 2022 and 2023, 120 since, and Legal and Logical Reasoning split
 * 32/24 in 2024-2025 but 30/26 in 2026. A withdrawn question rides as grace
 * (src/lib/mocks/flawed.json), never shortening a section.
 *
 * Unit-tested in tests/mock-clat.test.ts.
 */
import type { ClatSection } from "../../src/lib/mocks/blueprints";
import { sourceFile, yearCfg } from "../clat/config";

export type ClatSitting = {
  key: string;
  year: number;
  sourceFile: string;
  slug: string;
  title: string;
  counts: Record<ClatSection, number>;
};

/** The years committed to the bank. Add a year here when its commit lands. */
export const CLAT_MOCK_YEARS: readonly number[] = [
  // All five committed 2026-11-11 (scripts/clat/commit.ts); build once the rows are PUBLIC.
  2022, 2023, 2024, 2025, 2026,
];

export function deriveClatSittings(years: readonly number[], count: (year: number, section: ClatSection) => number): ClatSitting[] {
  const sections: ClatSection[] = [
    "English Language",
    "Current Affairs including General Knowledge",
    "Legal Reasoning",
    "Logical Reasoning",
    "Quantitative Techniques",
  ];
  return [...years]
    .sort((a, b) => a - b)
    .map((year) => ({
      key: String(year),
      year,
      sourceFile: sourceFile(year),
      slug: `clat-${year}`,
      title: `CLAT ${year}`,
      counts: Object.fromEntries(sections.map((s) => [s, count(year, s)])) as Record<ClatSection, number>,
    }));
}

/** A section's size as the booklet's contents page prints it. */
function printedCount(year: number, section: ClatSection): number {
  const s = yearCfg(year).sections.find(([name]) => name === section);
  if (!s) throw new Error(`CLAT ${year}: no section "${section}" in years.json`);
  return s[2] - s[1] + 1;
}

/** Every year in years.json, for the tests; the builder uses CLAT_MOCK_YEARS. */
export function clatSittings(years: readonly number[] = [2022, 2023, 2024, 2025, 2026]): ClatSitting[] {
  return deriveClatSittings(years, printedCount);
}
