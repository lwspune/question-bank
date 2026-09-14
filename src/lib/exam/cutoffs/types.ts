/**
 * Shapes for published examination cut-off marks, and the pure readers over
 * them. Kept separate from the NDA data so a second exam that publishes
 * cut-offs (CDS does) can reuse the shape without importing 20 NDA rows.
 *
 * THE LOAD-BEARING CHOICE is that a cut-off is a LIST of (audience, marks)
 * pairs rather than a single number. UPSC published one figure per stage for
 * every NDA sitting from 2016 to 2025-I, and then published SEPARATE male and
 * female cut-offs for NDA II 2025 -- with decimals, which the integer-marks
 * assumption would also have lost. A `written: number` column cannot hold that
 * sitting at all, and flattening it to the male figure would silently discard
 * a 54-mark difference. Nineteen sittings therefore carry exactly one entry
 * with audience "all"; the twentieth carries two. The next split sitting needs
 * no schema change.
 */

/**
 * Who a published cut-off applies to. "all" means UPSC published ONE figure
 * governing every candidate -- it is not a synonym for "male", and collapsing
 * the two would make a 2021 figure look gender-specific.
 */
export type CutoffAudience = "all" | "male" | "female";

/** One published cut-off figure and the candidates it governs. */
export type CutoffMark = {
  audience: CutoffAudience;
  /**
   * As printed. Decimal since NDA II 2025; integral before it.
   *
   * RENDERING: UPSC prints the 2025-II figures to two places ("304.90"), which
   * as a number is 304.9 -- so a surface showing these must format the decimal
   * ones with `toFixed(2)` rather than interpolating them raw, or it will
   * print a cut-off UPSC never published. The stored value is exact; only the
   * trailing zero is a display concern.
   */
  marks: number;
};

/** One row of the per-wing vacancy table. */
export type WingVacancy = {
  /** As printed, e.g. "Army", "Air Force (Flying)", "Naval Academy". */
  name: string;
  vacancies: number;
  /**
   * Seats reserved for female candidates within `vacancies`. `null` where the
   * sitting predates the split being published at all -- distinct from 0,
   * which is what a wing explicitly opened to male candidates only carries.
   */
  female: number | null;
  /** Any qualifier printed alongside the figure. */
  note?: string;
};

/**
 * How a sitting printed its Air Force allocation. 2019, 2020-I and 2021-I give
 * ONE Air Force line; from 2021-II it is split into Flying / Ground duties
 * (Tech) / Ground duties (Non-Tech). The wing table is therefore not
 * comparable across that seam, and this flag lets a consumer refuse to
 * compare rather than silently produce a nonsense year-on-year delta.
 */
export type AirForceShape = "lumped" | "split";

export type NdaCutoffSitting = {
  /** `nda-<year>-<i|ii>`, e.g. "nda-2025-ii". */
  slug: string;
  year: number;
  /** 1 = the April sitting (I), 2 = the September sitting (II). */
  sitting: 1 | 2;
  /** Minimum qualifying standard at the written stage, out of 900. */
  writtenCutoff: CutoffMark[];
  /** Marks of the last recommended candidate at final stage, out of 1800. */
  finalCutoff: CutoffMark[];
  /**
   * Minimum percentage required in EACH subject alongside the aggregate.
   * Stored per sitting because it is not the constant 25% it is usually quoted
   * as: four of the twenty sittings published 20%.
   */
  subjectMinimumPct: 20 | 25;
  /**
   * Candidates finally recommended. `null` for the eight sittings where UPSC
   * published no recommendation table -- NOT 0, which would assert that nobody
   * was recommended.
   */
  recommended: {
    total: number;
    /** `null` where the sitting published no male/female split. */
    male: number | null;
    female: number | null;
  } | null;
  /** Total vacancies advertised. `null` where none was published. */
  vacancies: number | null;
  /** Per-wing breakdown. `null` where none was published. */
  wings: WingVacancy[] | null;
  /** `null` exactly when `wings` is null. */
  airForceShape: AirForceShape | null;
  /** The UPSC PDF this row was read from; keys into scripts/nda-cutoffs/sources.json. */
  sourceFile: string;
};

/**
 * The cut-off that applied to `audience`, falling back to the sitting's single
 * published figure.
 *
 * The fallback is the point: a caller asking for the female cut-off of a 2021
 * sitting must get the published number, because UPSC applied one cut-off to
 * everyone that year. Returning undefined there would make nineteen of twenty
 * sittings look like they had no female cut-off.
 *
 * Throws only in the genuinely ambiguous direction -- asking for a single "all"
 * figure from a sitting that published two. There is no honest answer to that,
 * and inventing one (picking the male figure, or the higher of the two) is the
 * exact flattening this module exists to prevent. Read `writtenCutoff` directly
 * to render every audience.
 */
export function cutoffFor(
  sitting: NdaCutoffSitting,
  audience: CutoffAudience
): { written: number; final: number } {
  const pick = (marks: CutoffMark[]): number => {
    const exact = marks.find((m) => m.audience === audience);
    if (exact) return exact.marks;
    const all = marks.find((m) => m.audience === "all");
    if (all) return all.marks;
    throw new Error(
      `${sitting.slug} published separate cut-offs per audience; there is no single "${audience}" figure. ` +
        `Read sitting.writtenCutoff / sitting.finalCutoff to render each one.`
    );
  };
  return { written: pick(sitting.writtenCutoff), final: pick(sitting.finalCutoff) };
}

/**
 * Lowest and highest written cut-off across a corpus, over every audience.
 * Returns null on an empty corpus rather than the {Infinity, -Infinity} a bare
 * Math.min/max would produce and a caller would happily render.
 */
export function writtenCutoffRange(
  sittings: NdaCutoffSitting[]
): { min: number; max: number } | null {
  const marks = sittings.flatMap((s) => s.writtenCutoff.map((m) => m.marks));
  if (marks.length === 0) return null;
  return { min: Math.min(...marks), max: Math.max(...marks) };
}
