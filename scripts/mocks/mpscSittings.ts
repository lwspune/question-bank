/**
 * MPSC Group B & C sittings for the mock builder — DERIVED from
 * scripts/mpsc/config.ts, the registry the ingestion stamps into
 * `questions.source_file`, so the two cannot drift.
 *
 * source_file-keyed, not year+month: `pyq_month` is NULL on every MPSC row, and
 * one pyq_year carries both a Group B and a Group C paper.
 *
 * Grace comes from each paper's official final key (`data/<id>.key.json`,
 * `cancelled`), plus any question whose key the owner judged doubtful
 * (config.ts `notices`: the key is kept, a notice heads the solution, and the
 * mock awards the question to everyone; owner 2026-11-02). A cancelled question has no correct option; the Commission
 * awarded it to every candidate, so the mock does the same — the question stays
 * printed in its place, exactly as a candidate sat it. The same numbers drive
 * the `cancelled_note` on the rows (scripts/mpsc/commit.ts), so a mismatch
 * between the two would mean one of them was edited by hand.
 *
 * Pure apart from the default key loader. Unit-tested in
 * tests/mock-mpsc-sittings.test.ts.
 */

import { existsSync, readFileSync } from "node:fs";
import type { OptionLabel } from "../../src/lib/mocks/answers";
import { dataPath, QUESTIONS_PER_PAPER, SSP_CSAT_PAPERS } from "../mpsc/config";

export type MpscSitting = {
  /** The config paper id ("2019-b") — the `--only` key. */
  key: string;
  sourceFile: string;
  year: number;
  slug: string;
  title: string;
  /** Question numbers the official key cancelled — awarded to all. */
  graceNumbers: number[];
  /** Question number -> marks per option, from the final key's graded grid (CSAT Decision Making). */
  optionMarks?: Record<number, Record<OptionLabel, number>>;
  /** Question numbers the paper printed no penalty for (config.ts `noPenalty`). */
  noPenaltyNumbers?: number[];
};

type PaperLike = {
  id: string;
  pyqYear: number;
  pyqNote: string;
  sourceFile: string;
  /** Questions in the paper when not 100 (Agriculture 2011 and 2012 have 200). */
  questions?: number;
  /** Owner-settled doubtful keys: the key is kept, the question is graced (2026-11-02). */
  notices?: Record<number, unknown>;
  noPenalty?: number[];
};

/**
 * The CSAT sittings that have mocks: every configured booklet but 2022, which the
 * owner dropped (2026-09-30) and which is not in the bank.
 */
export const CSAT_MOCK_PAPERS = SSP_CSAT_PAPERS.filter((p) => p.pyqYear !== 2022);

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

/**
 * "MPSC State Services Prelims 2020 — GS Paper I — 21 Mar 2021". The pyqNote is
 * "<paper> · <date>" for these papers, not "<group> · <date>".
 */
export function sspMockTitle(pyqYear: number, pyqNote: string): string {
  const [paper, date] = pyqNote.split(" · ");
  return `MPSC State Services Prelims ${pyqYear} — ${paper}${date ? ` — ${date}` : ""}`;
}

/**
 * "MPSC Forest Service Prelims 2014 (27 Apr 2014)". The pyqNote is
 * "<exam> · <date>" for the Forest and Agriculture papers; the date sits in
 * brackets because visible text carries no em dash (owner, 2026-10-05).
 */
export function serviceMockTitle(pyqYear: number, pyqNote: string): string {
  const [exam, date] = pyqNote.split(" · ");
  return `MPSC ${exam} ${pyqYear}${date ? ` (${date})` : ""}`;
}

/**
 * "MPSC State Services Prelims 2021, CSAT Paper II (23 Jan 2022)". No dash in
 * visible text (owner, 2026-10-05); the date sits in brackets.
 */
export function sspCsatMockTitle(pyqYear: number, pyqNote: string): string {
  const [paper, date] = pyqNote.split(" · ");
  return `MPSC State Services Prelims ${pyqYear}, ${paper}${date ? ` (${date})` : ""}`;
}

const LABELS: OptionLabel[] = ["A", "B", "C", "D"];

/** The final key's per-option grid (keys.ts `graded`, Set A order); {} when it has none. */
function readGraded(id: string): Record<string, number[]> {
  const file = dataPath(id, "key");
  if (!existsSync(file)) return {};
  return (JSON.parse(readFileSync(file, "utf8")) as { graded?: Record<string, number[]> }).graded ?? {};
}

function readCancelled(id: string): number[] {
  const key = JSON.parse(readFileSync(dataPath(id, "key"), "utf8")) as { cancelled?: number[] };
  return key.cancelled ?? [];
}

export function deriveMpscSittings(
  papers: readonly PaperLike[],
  cancelledFor: (id: string) => number[] = readCancelled,
  titleFor: (pyqYear: number, pyqNote: string) => string = mpscMockTitle,
  gradedFor: (id: string) => Record<string, number[]> = readGraded
): MpscSitting[] {
  return papers.map((p) => {
    const noticed = Object.keys(p.notices ?? {}).map(Number);
    const graceNumbers = [...new Set([...cancelledFor(p.id), ...noticed])].sort((a, b) => a - b);
    const last = p.questions ?? QUESTIONS_PER_PAPER;
    const bad = graceNumbers.filter((n) => !Number.isInteger(n) || n < 1 || n > last);
    if (bad.length) {
      throw new Error(`MPSC ${p.id}: grace question number(s) ${bad.join(", ")} outside 1-${last}`);
    }
    const graded = Object.entries(gradedFor(p.id));
    for (const [n, marks] of graded) {
      if (marks.length !== LABELS.length) throw new Error(`MPSC ${p.id} Q${n}: graded grid has ${marks.length} marks, not 4`);
    }
    const optionMarks = Object.fromEntries(
      graded.map(([n, marks]) => [Number(n), Object.fromEntries(LABELS.map((l, i) => [l, marks[i]]))])
    ) as Record<number, Record<OptionLabel, number>>;
    return {
      key: p.id,
      sourceFile: p.sourceFile,
      year: p.pyqYear,
      slug: mpscMockSlug(p.id),
      title: titleFor(p.pyqYear, p.pyqNote),
      graceNumbers,
      ...(graded.length ? { optionMarks } : {}),
      ...(p.noPenalty?.length ? { noPenaltyNumbers: [...p.noPenalty].sort((a, b) => a - b) } : {}),
    };
  });
}
