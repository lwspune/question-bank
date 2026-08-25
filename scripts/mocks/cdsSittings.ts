/**
 * CDS sittings for the mock builder — DERIVED from scripts/cds/config.ts.
 *
 * WHY DERIVED, NOT HAND-WRITTEN: `scripts/cds/config.ts` PAPERS is the source of
 * record for this corpus — it is what the ingestion pipeline stamps into
 * `questions.source_file`, so a hand-copied 19-row registry here could silently
 * drift from it (a renamed booklet would leave that sitting's mock empty, and
 * nothing downstream would say so). NEET keeps a hand-written registry only
 * because each of its sittings carries bespoke facts — grace question numbers,
 * include-overrides, per-sitting length — that live nowhere else. CDS is
 * perfectly uniform (19 × 120 q, no grace, no overrides), so its sittings are
 * exactly what config already knows.
 *
 * The paper id encodes both facts we need: `"YYYY-N"` where N is the UPSC
 * edition (1 = CDS (I), 2 = CDS (II)). That parse is validated rather than
 * guessed — an unrecognised id THROWS, because guessing an edition would either
 * mislabel a paper or collide two sittings onto one slug (and since the mock id
 * is slugToUuid(slug), a collision SILENTLY overwrites — see cdsMockSlug).
 *
 * Pure — no I/O, no DB. Unit-tested in tests/mock-cds-sittings.test.ts.
 */

import { PAPERS, type Paper } from "../cds/config";
import {
  cdsMockSlug,
  cdsMockTitle,
  type CdsEdition,
} from "../../src/lib/mocks/reconstruct";

export type CdsSitting = {
  /** The config paper id ("2026-1") — usable as an `--only` filter key. */
  key: string;
  /** `questions.source_file` for this sitting. */
  sourceFile: string;
  year: number;
  edition: CdsEdition;
  slug: string;
  title: string;
};

/** `"2026-1"` → year 2026, edition I. Throws on any other shape. */
export function parseCdsPaperId(id: string): {
  year: number;
  edition: CdsEdition;
} {
  const m = /^(\d{4})-([12])$/.exec(id);
  if (!m) {
    throw new Error(
      `CDS paper id "${id}" is not of the form YYYY-N (N = 1 or 2). ` +
        `Refusing to guess its edition — a wrong guess mislabels the paper or ` +
        `collides two sittings onto one slug.`
    );
  }
  return { year: Number(m[1]), edition: m[2] === "1" ? "I" : "II" };
}

/**
 * Every CDS sitting, newest year first, edition I before II within a year.
 *
 * Cross-checks the two places the year is recorded (the id and `pyqYear`) and
 * throws on disagreement: they are independent fields of the same record, so a
 * mismatch means one of them has rotted, and the wrong one would put a real
 * sitting under the wrong year's slug. Also refuses duplicate slugs outright.
 */
export function deriveCdsSittings(
  papers: Record<string, Paper> = PAPERS
): CdsSitting[] {
  const sittings: CdsSitting[] = [];
  for (const [id, p] of Object.entries(papers)) {
    const { year, edition } = parseCdsPaperId(id);
    if (year !== p.pyqYear) {
      throw new Error(
        `CDS paper "${id}": id says year ${year} but pyqYear is ${p.pyqYear}`
      );
    }
    sittings.push({
      key: id,
      sourceFile: p.sourceFile,
      year,
      edition,
      slug: cdsMockSlug(year, edition),
      title: cdsMockTitle(year, edition),
    });
  }

  const bySlug = new Map<string, string>();
  for (const s of sittings) {
    const prev = bySlug.get(s.slug);
    if (prev) {
      throw new Error(
        `CDS papers "${prev}" and "${s.key}" both derive slug "${s.slug}" — ` +
          `one would silently overwrite the other (same slugToUuid id)`
      );
    }
    bySlug.set(s.slug, s.key);
  }

  const editionRank = (e: CdsEdition) => (e === "I" ? 0 : 1);
  return sittings.sort(
    (a, b) => b.year - a.year || editionRank(a.edition) - editionRank(b.edition)
  );
}
