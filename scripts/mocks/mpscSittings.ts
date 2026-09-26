/**
 * MPSC Group B & C sittings for the mock builder — DERIVED from
 * scripts/mpsc/config.ts, the registry the ingestion stamps into
 * `questions.source_file`, so the two cannot drift.
 *
 * source_file-keyed, not year+month: `pyq_month` is NULL on every MPSC row, and
 * one pyq_year carries both a Group B and a Group C paper.
 *
 * Grace comes from each paper's official final key (`data/<id>.key.json`,
 * `cancelled`). A cancelled question has no correct option; the Commission
 * awarded it to every candidate, so the mock does the same — the question stays
 * printed in its place, exactly as a candidate sat it. The same numbers drive
 * the `cancelled_note` on the rows (scripts/mpsc/commit.ts), so a mismatch
 * between the two would mean one of them was edited by hand.
 *
 * Pure apart from the default key loader. Unit-tested in
 * tests/mock-mpsc-sittings.test.ts.
 */

import { readFileSync } from "node:fs";
import { dataPath, QUESTIONS_PER_PAPER } from "../mpsc/config";

export type MpscSitting = {
  /** The config paper id ("2019-b") — the `--only` key. */
  key: string;
  sourceFile: string;
  year: number;
  slug: string;
  title: string;
  /** Question numbers the official key cancelled — awarded to all. */
  graceNumbers: number[];
};

type PaperLike = { id: string; pyqYear: number; pyqNote: string; sourceFile: string };

/** "2019-b" → "mpsc-2019-b". The paper id is unique per sitting. */
export function mpscMockSlug(id: string): string {
  return `mpsc-${id}`;
}

/**
 * "MPSC Group B Prelims 2019 — 24 Mar 2019". The date is kept because MPSC's
 * year label and the sitting date can differ (the 2020 paper was sat in 2021).
 */
export function mpscMockTitle(pyqYear: number, pyqNote: string): string {
  const [group, date] = pyqNote.split(" · ");
  return `MPSC ${group} Prelims ${pyqYear}${date ? ` — ${date}` : ""}`;
}

function readCancelled(id: string): number[] {
  const key = JSON.parse(readFileSync(dataPath(id, "key"), "utf8")) as { cancelled?: number[] };
  return key.cancelled ?? [];
}

export function deriveMpscSittings(
  papers: readonly PaperLike[],
  cancelledFor: (id: string) => number[] = readCancelled
): MpscSitting[] {
  return papers.map((p) => {
    const graceNumbers = [...cancelledFor(p.id)].sort((a, b) => a - b);
    const bad = graceNumbers.filter((n) => !Number.isInteger(n) || n < 1 || n > QUESTIONS_PER_PAPER);
    if (bad.length) {
      throw new Error(`MPSC ${p.id}: cancelled question number(s) ${bad.join(", ")} outside 1-${QUESTIONS_PER_PAPER}`);
    }
    return {
      key: p.id,
      sourceFile: p.sourceFile,
      year: p.pyqYear,
      slug: mpscMockSlug(p.id),
      title: mpscMockTitle(p.pyqYear, p.pyqNote),
      graceNumbers,
    };
  });
}
