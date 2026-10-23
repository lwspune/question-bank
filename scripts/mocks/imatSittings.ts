/**
 * IMAT sittings for the mock builder: one mock per ministry (MUR) paper, 2023 on. A
 * year is a ministry paper when its confirmed shape is MUR_SHAPE (scripts/imat/lib.ts);
 * the Cambridge years (2011-2022) have other shapes and are publish_blocked, so they
 * can never be sittings. The source file is the ministry's own PDF name, which the
 * IMAT commit wrote as `source_file`.
 *
 * Grace: the ministry publishes the key (option A as printed, before our shuffle) and
 * has cancelled no question, so grace is our call, made where a question cannot be
 * solved as printed (GRACE below). Its solution opens with a **Note:** saying so
 * (scripts/imat/mur-solutions.json), and in a mock everyone gets its marks.
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
  graceNumbers: number[];
};

/**
 * Printed question numbers that are grace, by year. 2024 Q55 asks for the power of a
 * braking force given only the force and a distance; power needs a time or a speed.
 * The ministry's 210 W assumes 5 s (1050 J / 5 s). Found 2026-10-23: the blind
 * solution pass disagreed with the key on this question alone.
 */
const GRACE: Readonly<Record<number, readonly number[]>> = { 2024: [55] };

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
      graceNumbers: [...(GRACE[year] ?? [])],
    }));
}

/** The live registry: every ministry paper with a confirmed shape. */
export function imatSittings(): ImatSitting[] {
  return deriveImatSittings(Object.keys(PAPER_SHAPES).map(Number));
}
