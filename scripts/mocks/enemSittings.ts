/**
 * ENEM sittings for the mock builder: one mock per committed year, the whole
 * Day 2 booklet (scripts/enem/commit.ts writes one source file per year).
 *
 * Every mock is the full 90. Two kinds of grace:
 *  - a question INEP CANCELLED ("Anulado" in data/<year>.key.json, loaded
 *    keyless with a notice) is graced here in `prepare`, because a keyless row
 *    would otherwise fail the build's "has a correct answer" check;
 *  - a question defective as printed that INEP did not cancel (it keeps INEP's
 *    key) rides as grace through src/lib/mocks/flawed.json, which
 *    scripts/enem/commit.ts writes from data/flawed.json.
 *
 * Unit-tested in tests/mock-enem.test.ts.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { PaperQuestionRow } from "../../src/lib/mocks/reconstruct";

export type EnemSitting = {
  key: string;
  year: number;
  sourceFile: string;
  slug: string;
  title: string;
  prepare?: (rows: PaperQuestionRow[]) => PaperQuestionRow[];
};

/** The years committed to the bank. Add a year here when its commit lands. */
export const ENEM_MOCK_YEARS: readonly number[] = [2021, 2022, 2023, 2024, 2025];

type YearFacts = { sourceFile: string; cancelled: number[] };

/** A year's source file and INEP's cancelled questions, from the committed lane data. */
function committedFacts(year: number): YearFacts {
  const dir = join(__dirname, "..", "enem", "data");
  const paper = JSON.parse(readFileSync(join(dir, `${year}.questions.json`), "utf8")) as { source_file: string };
  const key = JSON.parse(readFileSync(join(dir, `${year}.key.json`), "utf8")) as Record<string, string>;
  const cancelled = Object.entries(key)
    .filter(([, v]) => v === "ANULADO")
    .map(([n]) => Number(n));
  return { sourceFile: paper.source_file, cancelled };
}

export function deriveEnemSittings(years: readonly number[], facts: (year: number) => YearFacts = committedFacts): EnemSitting[] {
  return [...years]
    .sort((a, b) => a - b)
    .map((year) => {
      const { sourceFile, cancelled } = facts(year);
      const grace = new Set(cancelled);
      return {
        key: String(year),
        year,
        sourceFile,
        slug: `enem-${year}`,
        title: `ENEM ${year}: Ciências da Natureza e Matemática`,
        ...(grace.size
          ? {
              prepare: (rows: PaperQuestionRow[]) =>
                rows.map((r) => (grace.has(Number(r.questionNumber)) ? { ...r, grace: true } : r)),
            }
          : {}),
      };
    });
}

export function enemSittings(): EnemSitting[] {
  return deriveEnemSittings(ENEM_MOCK_YEARS);
}
