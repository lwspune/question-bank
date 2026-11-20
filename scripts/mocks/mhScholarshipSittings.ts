/**
 * MH Scholarship sittings for the mock builder: one mock per PUBLISHED paper in
 * scripts/mh-scholarship/config.ts PAPERS, i.e. the Class 4 and Class 7 papers
 * (scripts/mh-scholarship/publish.ts PUBLISHABLE; owner 2026-11-20: no Class 8
 * public, and the old Class 5/8 papers carry held two-answer items anyway).
 *
 * Every sitting expects 75 questions. The blueprints declare no section counts,
 * so a paper with a printed defect held out of the bank (Class 7 Paper II Q42,
 * options printed identically) ships one short, as the owner agreed on
 * 2026-11-20; the builder prints the shortfall on every run.
 *
 * Cancelled questions (no correct option) and the lane's graced items ride as
 * grace through src/lib/mocks/flawed.json (commit.ts writes it).
 *
 * Unit-tested in tests/mock-mh-scholarship.test.ts.
 */
import { existsSync, readFileSync } from "node:fs";
import type { MockPaperBlueprint } from "../../src/lib/mocks/blueprints";
import type { PaperQuestionRow } from "../../src/lib/mocks/reconstruct";
import {
  MH_SCHOLARSHIP_4_PAPER_1,
  MH_SCHOLARSHIP_4_PAPER_2,
  MH_SCHOLARSHIP_7_PAPER_1,
  MH_SCHOLARSHIP_7_PAPER_2,
} from "../../src/lib/mocks/blueprints";
import type { Paper } from "../mh-scholarship/config";
import { PAPERS, dataPath } from "../mh-scholarship/config";

const BLUEPRINT: Record<string, MockPaperBlueprint> = {
  "mh-scholarship-4/1": MH_SCHOLARSHIP_4_PAPER_1,
  "mh-scholarship-4/2": MH_SCHOLARSHIP_4_PAPER_2,
  "mh-scholarship-7/1": MH_SCHOLARSHIP_7_PAPER_1,
  "mh-scholarship-7/2": MH_SCHOLARSHIP_7_PAPER_2,
};

export type MhScholarshipSitting = {
  key: string;
  sourceFile: string;
  year: number;
  slug: string;
  title: string;
  questionCount: number;
  blueprint: MockPaperBlueprint;
  hold?: string;
  /** Marks the questions MSCE cancelled as grace, before the build checks every row has a key. */
  prepare?: (rows: PaperQuestionRow[]) => PaperQuestionRow[];
};

/** Questions MSCE's key cancelled ("*"), as keycheck.ts wrote them to data/<id>.answers.json. */
function cancelledOf(id: string): number[] {
  const f = dataPath(id, "answers");
  return existsSync(f)
    ? ((JSON.parse(readFileSync(f, "utf8")).dropped ?? []) as number[])
    : [];
}

/** "MH Scholarship Class 7 Paper II (26 April 2026)" -> "April 2026". */
function sittingLabel(p: Paper): string {
  const m = /\(([^)]*)\)$/.exec(p.pyqNote);
  const words = (m?.[1] ?? String(p.pyqYear)).split(" ");
  return words.length === 3 ? `${words[1]} ${words[2]}` : words.join(" ");
}

export function deriveMhScholarshipSittings(
  papers: readonly Paper[],
): MhScholarshipSitting[] {
  return papers
    .filter((p) => BLUEPRINT[`${p.exam}/${p.paper}`] && p.pages.length > 0)
    .sort(
      (a, b) =>
        a.exam.localeCompare(b.exam) ||
        a.pyqYear - b.pyqYear ||
        a.paper - b.paper,
    )
    .map((p) => {
      const grace = new Set(cancelledOf(p.id));
      return {
        key: p.id,
        sourceFile: p.sourceFile,
        year: p.pyqYear,
        slug: p.id,
        title: `MH Scholarship Class ${p.exam.slice(-1)} Paper ${p.paper === 1 ? "I" : "II"}, ${sittingLabel(p)}`,
        questionCount: p.pattern.questions,
        blueprint: BLUEPRINT[`${p.exam}/${p.paper}`],
        ...(grace.size
          ? {
              prepare: (rows: PaperQuestionRow[]) =>
                rows.map((r) =>
                  grace.has(Number(r.questionNumber))
                    ? { ...r, grace: true }
                    : r,
                ),
            }
          : {}),
      };
    });
}

export function mhScholarshipSittings(): MhScholarshipSitting[] {
  return deriveMhScholarshipSittings(Object.values(PAPERS));
}
