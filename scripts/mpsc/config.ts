/**
 * MPSC Group B & C combined preliminary papers — the paper registry.
 *
 * SOURCE: one merged scan, `Group B & C Pre Papers 2017 to 2024.pdf` (557 pages,
 * iLovePDF), holding 14 Set-A booklets of the "सामान्य क्षमता चाचणी" (General
 * Ability Test) — 100 questions, 100 marks, 1 hour, −¼ per wrong answer
 * (booklet instruction 7) — each followed by the Commission's FINAL answer key
 * (published after the objection round). Page numbers below are 1-based PDF
 * pages, located by the booklet cover's black banner and read from each key's
 * header.
 *
 * TWO TRAPS IN THE FILE:
 *  - The 2020 Group B key (pp.127-128) sits BEFORE its paper (pp.129-168),
 *    immediately after the 2019 key — so "the key follows the paper" is not a rule.
 *  - The 2019 Group C key (pp.362-363) has NO text layer; it is transcribed by
 *    hand into data/2019-c.keytokens.json rather than extracted.
 *
 * `pyqYear` is MPSC's EXAM-YEAR label, not the sitting date: the "2020" Group B
 * exam sat on 4 Sep 2021 and both "2024" exams in 2025. The sitting date is in
 * `pyqNote`, which is what a student recognises.
 *
 * `sourceFile` is a per-paper label, not the PDF name — all 14 papers share one
 * PDF, and `source_file` is the rollback + mock-sitting key, so it must name ONE
 * paper.
 */
import { join } from "node:path";

export const SOURCE_PDF = "C:/Users/vilas/Downloads/Group B & C Pre Papers 2017 to 2024.pdf";
export const EXAM_NAME = "MPSC Group B & C Prelims";
/** Printed by seed.ts --apply (2026-09-25). */
export const EXAM_ID = "583f914f-f323-42ed-ae7c-5e445ed796c3";
/** Founding tenant org + the superadmin who owns ingested content (same as every pipeline). */
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";

export type Group = "B" | "C" | "B+C";

export type Paper = {
  id: string;
  group: Group;
  pyqYear: number;
  /** Sitting date, ISO. */
  date: string;
  /** Printed booklet code (series + number). */
  code: string;
  /** First and last PDF page of the booklet (cover included). */
  pages: [number, number];
  keyPages: [number, number];
  /** Key has no text layer — tokens are hand-transcribed. */
  keyImageOnly?: boolean;
  pyqNote: string;
  sourceFile: string;
};

const paper = (
  id: string,
  group: Group,
  pyqYear: number,
  date: string,
  code: string,
  pages: [number, number],
  keyPages: [number, number],
  label: string,
  extra: Partial<Paper> = {}
): Paper => ({
  id,
  group,
  pyqYear,
  date,
  code,
  pages,
  keyPages,
  pyqNote: label,
  sourceFile: `MPSC-${id}-${code}`,
  ...extra,
});

export const PAPERS: Paper[] = [
  paper("2017-b", "B", 2017, "2017-07-16", "NO9", [1, 32], [33, 34], "Group B · 16 Jul 2017"),
  paper("2018-b", "B", 2018, "2018-05-13", "H11", [35, 82], [83, 84], "Group B · 13 May 2018"),
  paper("2019-b", "B", 2019, "2019-03-24", "V12", [85, 124], [125, 126], "Group B · 24 Mar 2019"),
  paper("2020-b", "B", 2020, "2021-09-04", "A14", [129, 168], [127, 128], "Group B · 4 Sep 2021"),
  paper("2021-b", "B", 2021, "2022-02-26", "U14", [169, 208], [209, 210], "Group B · 26 Feb 2022"),
  paper("2022-b", "B", 2022, "2022-10-08", "A16", [211, 250], [251, 252], "Group B · 8 Oct 2022"),
  paper("2017-c", "C", 2017, "2017-05-28", "B09", [253, 288], [289, 290], "Group C (Excise SI) · 28 May 2017"),
  paper("2018-c", "C", 2018, "2018-06-10", "J11", [292, 323], [324, 325], "Group C · 10 Jun 2018"),
  paper("2019-c", "C", 2019, "2019-06-16", "Y12", [326, 361], [362, 363], "Group C · 16 Jun 2019", {
    keyImageOnly: true,
  }),
  paper("2021-c", "C", 2021, "2022-04-03", "Y14", [364, 395], [396, 397], "Group C · 3 Apr 2022"),
  paper("2022-c", "C", 2022, "2022-11-05", "F16", [398, 429], [430, 431], "Group C · 5 Nov 2022"),
  paper("2023-bc", "B+C", 2023, "2023-04-30", "J17", [432, 471], [472, 473], "Group B & C · 30 Apr 2023"),
  paper("2024-b", "B", 2024, "2025-02-02", "H19", [474, 513], [514, 515], "Group B · 2 Feb 2025"),
  paper("2024-c", "C", 2024, "2025-06-01", "R19", [516, 555], [556, 557], "Group C · 1 Jun 2025"),
];

/** The booklets on file are all Set A, so the key's first column applies. */
export const BOOKLET_SET_INDEX = 0;
export const QUESTIONS_PER_PAPER = 100;

export function requirePaper(id: string | undefined): Paper {
  const p = PAPERS.find((x) => x.id === id);
  if (!p) throw new Error(`unknown paper "${id}" — one of: ${PAPERS.map((x) => x.id).join(", ")}`);
  return p;
}

export const DATA_DIR = join(process.cwd(), "scripts", "mpsc", "data");
export const dataPath = (id: string, kind: string) => join(DATA_DIR, `${id}.${kind}.json`);
