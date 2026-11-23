/**
 * Sainik & Military Schools sittings for the mock builder: one mock per AISSEE
 * and RMS CET paper in scripts/milschool/config.ts PAPERS. RIMC gets none: its
 * Mathematics and English are written papers, and a mock is auto-graded.
 *
 * A paper with any question held out of the bank (scripts/milschool/config.ts
 * `held`: unreadable in the only copy, or a Hindi-medium copy's Language
 * section) is HELD here too, with the same reason, rather than shipped short.
 * The builder reports it on every run, and fails if the paper ever builds
 * whole while still held, so a closed hole cannot stay hidden.
 *
 * Questions the lane flagged as defective ride as grace through
 * src/lib/mocks/flawed.json (scripts/milschool/commit.ts writes them there).
 *
 * Unit-tested in tests/mock-milschool.test.ts.
 */
import type { MockPaperBlueprint } from "../../src/lib/mocks/blueprints";
import { aisseePaper, RMS_CET_6_PAPER, RMS_CET_9_PAPER } from "../../src/lib/mocks/blueprints";
import { PAPERS, type Paper } from "../milschool/config";

/**
 * Each AISSEE paper's sections in printed order, as the bank holds them
 * (lowest question number first; checked against every paper's rows on
 * 2026-11-18). A Hindi-medium copy lists the sections it kept.
 */
export const SECTION_ORDER: Record<string, string[]> = {
  "aissee-6-2020": ["Mathematics", "General Knowledge", "English", "Intelligence"],
  "aissee-6-2022": ["English", "Mathematics", "General Knowledge", "Intelligence"],
  "aissee-6-2023": ["English", "Mathematics", "General Knowledge", "Intelligence"],
  "aissee-6-2024": ["English", "Mathematics", "Intelligence", "General Knowledge"],
  "aissee-6-2025": ["English", "Mathematics", "Intelligence", "General Knowledge"],
  "aissee-6-2026": ["English", "Mathematics", "Intelligence", "General Knowledge"],
  "aissee-9-2020": ["Mathematics", "English", "General Science", "Social Science", "Intelligence"],
  "aissee-9-2021": ["Mathematics", "English", "General Science", "Social Science", "Intelligence"],
  "aissee-9-2022": ["Mathematics", "English", "General Science", "Social Science", "Intelligence"],
  "aissee-9-2024": ["Mathematics", "Intelligence", "English", "General Science", "Social Science"],
  "aissee-9-2025": ["Mathematics", "Intelligence", "English", "General Science", "Social Science"],
  "aissee-9-2026": ["Mathematics", "Intelligence", "English", "General Science", "Social Science"],
};

export type MilschoolSitting = {
  key: string;
  sourceFile: string;
  year: number;
  slug: string;
  title: string;
  blueprint: MockPaperBlueprint;
  /** Why this paper is not built: it is missing questions. */
  hold?: string;
};

function blueprintFor(p: Paper, order: Record<string, string[]>): MockPaperBlueprint {
  if (p.exam === "aissee-6" || p.exam === "aissee-9") {
    const o = order[p.id];
    if (!o) throw new Error(`${p.id}: no SECTION_ORDER entry`);
    return aisseePaper(p.exam === "aissee-6" ? 6 : 9, o);
  }
  if (p.exam === "rms-cet-6") return RMS_CET_6_PAPER;
  if (p.exam === "rms-cet-9") return RMS_CET_9_PAPER;
  throw new Error(`${p.id}: no mock blueprint for ${p.exam}`);
}

const TITLE: Record<string, string> = {
  "aissee-6": "AISSEE",
  "aissee-9": "AISSEE",
  "rms-cet-6": "RMS CET",
  "rms-cet-9": "RMS CET",
};

export function deriveMilschoolSittings(
  papers: readonly Paper[],
  order: Record<string, string[]> = SECTION_ORDER
): MilschoolSitting[] {
  return papers
    .filter((p) => p.exam !== "rimc")
    .sort((a, b) => a.exam.localeCompare(b.exam) || a.pyqYear - b.pyqYear)
    .map((p) => ({
      key: p.id,
      sourceFile: p.sourceFile,
      year: p.pyqYear,
      slug: p.id,
      title: `${TITLE[p.exam]} ${p.pyqYear} Class ${p.exam.endsWith("6") ? 6 : 9}`,
      blueprint: blueprintFor(p, order),
      ...(p.held?.numbers.length
        ? { hold: `${p.held.numbers.length} question(s) not in the bank: ${p.held.why}` }
        : {}),
    }));
}

export function milschoolSittings(): MilschoolSitting[] {
  return deriveMilschoolSittings(Object.values(PAPERS));
}
