/**
 * IMAT sittings for the mock builder: one mock per ministry (MUR) paper, 2023 on. A
 * year is a ministry paper when its confirmed shape is MUR_SHAPE (scripts/imat/lib.ts);
 * the Cambridge years (2011-2022) have other shapes and are publish_blocked, so they
 * can never be sittings. The source file is the ministry's own PDF name, which the
 * IMAT commit wrote as `source_file`.
 *
 * No grace: the ministry publishes the key (option A as printed, before our shuffle)
 * and has cancelled no question.
 *
 * Unit-tested in tests/mock-imat.test.ts.
 */
import { MUR_SHAPE, PAPER_SHAPES } from "../imat/lib";

export type ImatSitting = {
  key: string;
  sourceFile: string;
  year: number;
  slug: string;
  title: string;
};

export function deriveImatSittings(years: readonly number[]): ImatSitting[] {
  return years
    .filter((y) => PAPER_SHAPES[y] === MUR_SHAPE)
    .sort((a, b) => a - b)
    .map((year) => ({
      key: String(year),
      sourceFile: `CompitoInglese${year}.pdf`,
      year,
      slug: `imat-${year}`,
      title: `IMAT ${year}`,
    }));
}

/** The live registry: every ministry paper with a confirmed shape. */
export function imatSittings(): ImatSitting[] {
  return deriveImatSittings(Object.keys(PAPER_SHAPES).map(Number));
}
