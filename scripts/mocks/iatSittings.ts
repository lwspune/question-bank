/**
 * IISER Aptitude Test sittings for the mock builder: one mock per year in the bank.
 * A year is listed here once its paper is committed (scripts/iat/commit.ts writes
 * one source file per year). Each sitting carries its section counts, read from the
 * committed transcriptions less any held row, so a question IISER dropped from its
 * final key (2025 Physics) shortens that section instead of failing the build.
 *
 * No grace list: IISER's keyed years carry IISER's key, and a no-key year's
 * defective questions are held rather than graced (scripts/iat/README.md).
 *
 * Unit-tested in tests/mock-iat.test.ts.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { SUBJECTS, sourceFile, type IatSubject } from "../iat/config";

export type IatSitting = {
  key: string;
  year: number;
  sourceFile: string;
  slug: string;
  title: string;
  counts: Record<IatSubject, number>;
};

/** The years committed to the bank. Add a year here when its commit lands. */
export const IAT_MOCK_YEARS = [2017, 2018, 2019, 2021, 2022, 2023, 2024, 2025, 2026] as const;

export function deriveIatSittings(years: readonly number[], count: (year: number, subject: IatSubject) => number): IatSitting[] {
  return [...years]
    .sort((a, b) => a - b)
    .map((year) => ({
      key: String(year),
      year,
      sourceFile: sourceFile(year),
      slug: `iat-${year}`,
      title: `IISER IAT ${year}`,
      counts: Object.fromEntries(SUBJECTS.map((s) => [s, count(year, s)])) as Record<IatSubject, number>,
    }));
}

/** Rows in the committed transcription, less the ones an adjudication holds. */
function committedCount(year: number, subject: IatSubject): number {
  const data = join(__dirname, "..", "iat", "data");
  const read = <T>(f: string): T | undefined =>
    existsSync(join(data, f)) ? (JSON.parse(readFileSync(join(data, f), "utf8")) as T) : undefined;
  const paper = read<{ rows: { ref: string }[] }>(`${year}-${subject}.questions.json`);
  if (!paper) throw new Error(`IAT ${year} ${subject}: no transcription; is the year committed?`);
  const held = new Set(
    (read<{ adjudications: { ref: string; hold?: string }[] }>(`${year}-${subject}.adjudication.json`)?.adjudications ?? [])
      .filter((a) => a.hold)
      .map((a) => a.ref)
  );
  return paper.rows.filter((r) => !held.has(r.ref)).length;
}

export function iatSittings(): IatSitting[] {
  return deriveIatSittings(IAT_MOCK_YEARS, committedCount);
}
