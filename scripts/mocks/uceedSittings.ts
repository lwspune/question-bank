/**
 * UCEED sittings for the mock builder: one Part A mock per year in the bank (2019-2026;
 * 2015-2018 are on hold, scripts/uceed/README.md). Each year has its own blueprint
 * (uceedPaper in src/lib/mocks/blueprints.ts): the section sizes, marking and time
 * changed in 2020, 2022 and 2024.
 *
 * Grace: IIT Bombay's final key gave every candidate full marks for three 2020 questions
 * ("FULL MARKS"); they carry no key (cancelled_note, migration 0119), so they ride as
 * grace here, read from the committed key file. Questions whose key accepts two answers,
 * or that are defective as printed, are grace through src/lib/mocks/flawed.json, which
 * every builder applies.
 *
 * Unit-tested in tests/mock-uceed-sittings.test.ts.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { sourceFile } from "../uceed/config";

export type UceedSitting = {
  key: string;
  year: number;
  sourceFile: string;
  slug: string;
  title: string;
  graceNumbers: number[];
};

/** The years whose Part A is in the bank. */
export const UCEED_MOCK_YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026] as const;

export function deriveUceedSittings(years: readonly number[], cancelled: (year: number) => number[]): UceedSitting[] {
  return [...years]
    .sort((a, b) => a - b)
    .map((year) => ({
      key: String(year),
      year,
      sourceFile: sourceFile(year),
      slug: `uceed-${year}`,
      title: `UCEED ${year} Part A`,
      graceNumbers: cancelled(year),
    }));
}

/** IIT Bombay's cancelled questions, from the committed key (data/<year>.key.json). */
function cancelledInKey(year: number): number[] {
  const file = join(__dirname, "..", "uceed", "data", `${year}.key.json`);
  const key: { answers: { n: number; cancelled?: string }[] } = JSON.parse(readFileSync(file, "utf8"));
  return key.answers.filter((a) => a.cancelled).map((a) => a.n);
}

export function uceedSittings(): UceedSitting[] {
  return deriveUceedSittings(UCEED_MOCK_YEARS, cancelledInKey);
}
