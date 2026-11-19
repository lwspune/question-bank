// RRB NTPC lane configuration. Runbook: scripts/rrb-ntpc/README.md.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Section } from "../ssc-cgl/config";

export { CREATED_BY, ORG_ID } from "../ssc-cgl/config";

/**
 * Two levels, two exams (owner, 2026-11-19): RRB notifies them separately (CEN 06/2025
 * "Non-Technical Popular Categories (Graduate)", CEN 07/2025 "(Under Graduate)"), with their own
 * eligibility, posts and sittings, though CBT 1 is the same pattern. Graduate keeps the name it
 * shipped under; Undergraduate is its own exam row, the two grouped as one picker family.
 */
export type Level = "graduate" | "undergraduate";

/**
 * General Awareness, split into the eight subjects CDS and SSC CGL use, plus Computer Knowledge:
 * NTPC's syllabus names "basics of computers", and each paper asks one to three such questions.
 */
export const GA = ["History", "Geography", "Polity", "Economics", "Physics", "Chemistry", "Biology", "Current Affairs", "Static GK", "Computer Knowledge"];
export const SUBJECTS = ["Mathematics", "Reasoning", ...GA];

/**
 * The sheet prints ONE section for the whole paper ("RRB NTPC GRADUATE CBT 1"), with Mathematics,
 * Reasoning and General Awareness questions mixed in it, so every question names its subject.
 */
export const LAYOUT: Section[] = [{ part: "A", match: /^RRB NTPC GRADUATE CBT 1$/i, count: 100, subjects: SUBJECTS }];

/**
 * Undergraduate prints THREE sections, numbered straight through (Mathematics Q1-30, General
 * Awareness Q31-70, General Intelligence and Reasoning Q71-100), identical in all 32 sheets.
 */
export const UG_LAYOUT: Section[] = [
  { part: "A", match: /^Mathematics$/i, count: 30, subjects: ["Mathematics"] },
  { part: "B", match: /^General Awareness$/i, count: 40, subjects: GA },
  { part: "C", match: /^General Intelligence and Reasoning$/i, count: 30, subjects: ["Reasoning"] },
];

export type LevelConfig = {
  examName: string;
  /** The exams row id, created by seed-exam.ts. Empty until then. */
  examId: string;
  /** How the level names itself in a pyq note and a mock title ("Graduate CBT 1"). */
  label: string;
  layout: Section[];
  /** The sheet numbers its questions through the sections, not from Q.1 in each. */
  numberedThrough: boolean;
};

export const LEVELS: Record<Level, LevelConfig> = {
  /** Created by seed-exam.ts on 2026-11-13. */
  graduate: { examName: "RRB NTPC", examId: "6a5566ad-8bc9-4e6e-a679-5ceb2a369627", label: "Graduate", layout: LAYOUT, numberedThrough: false },
  /** Created by seed-exam.ts --level=undergraduate on 2026-11-19. */
  undergraduate: { examName: "RRB NTPC Undergraduate", examId: "0f3a30ea-cb82-4ba0-a233-7a2015cfdd45", label: "Undergraduate", layout: UG_LAYOUT, numberedThrough: true },
};

/** Graduate's, kept under the names the lane shipped with. */
export const EXAM_NAME = LEVELS.graduate.examName;
export const EXAM_ID = LEVELS.graduate.examId;

export function requireExamId(level: Level = "graduate"): string {
  const id = LEVELS[level].examId;
  if (!id) throw new Error(`${LEVELS[level].examName} has no exam id: run scripts/rrb-ntpc/seed-exam.ts --level=${level} --apply and paste the id into config.ts LEVELS`);
  return id;
}

export function requireLevel(arg: string | undefined): Level {
  const level = arg ?? "graduate";
  if (level !== "graduate" && level !== "undergraduate") throw new Error(`unknown level "${level}": graduate or undergraduate`);
  return level;
}

/** The --level=<graduate|undergraduate> argument, graduate when absent. */
export const levelArg = (argv: string[]): Level => requireLevel(argv.find((a) => a.startsWith("--level="))?.slice("--level=".length));

/** The day's three slots in shift order, as every sheet prints Test Time (both levels). */
export const SLOTS = ["9:00 AM - 10:30 AM", "12:45 PM - 2:15 PM", "4:30 PM - 6:00 PM"];

export type Catalog = Record<string, { chapter: string; subtopics: string[] }[]>;
/** Written by seed-catalog.ts from the SSC CGL catalog plus catalog-authored.json. */
export const CATALOG: Catalog = JSON.parse(readFileSync(join(__dirname, "catalog.json"), "utf8"));

/**
 * The source: each candidate's RESPONSE SHEET, RRB's own render (question text, options in RRB's
 * order, the key as the option text's colour), shown through the candidate login during the
 * answer-key objection window (to 12 Apr 2026). Prepp hosts the English copies, one per shift,
 * re-saved with its logo, a page header and the candidate panel cut away. Never a retyped copy.
 * Graduate CBT 1 of cycle CEN 06/2025, sat 16-27 March 2026. The key is RRB's TENTATIVE key.
 */
export const SOURCE_ROOT = "C:\\Vilas\\LWS_Pune\\RRB\\NTPC\\2026_Graduate_CBT1";
const CDN = "https://cdn-images.prepp.in/public/image/rrb-ntpc-2025-graduate-level-cbt-1-question-paper-and-answer-key-pdf-english";
/** The notification cycle the paper belongs to: its pyq_year (the sitting date is in the note).
 * Both levels are of the 2025 cycle (Graduate CEN 06/2025, Undergraduate CEN 07/2025). */
export const CYCLE = 2025;

/** day of March 2026 -> the numeric suffix of Prepp's file for shifts 1, 2, 3. */
const DAYS: Record<string, [string, string, string]> = {
  "16": ["1775545008", "1775545008", "1775545008"],
  "17": ["1775545007", "1775545006", "1775545006"],
  "18": ["1775545006", "1775545006", "1775545005"],
  "19": ["1775545005", "1775544998", "1775545002"],
  "22": ["1775544996", "1775544996", "1775544995"],
  "24": ["1775544994", "1775544994", "1775544974"],
  "25": ["1775544976", "1775544976", "1775544975"],
  "27": ["1775544975", "1775544975", "1775544974"],
};

/**
 * pyqMonth is a month NAME, as everywhere in the bank. `url` is the file's address on Prepp's CDN
 * where it was recorded (Graduate); the Undergraduate files came from Prepp's paper pages
 * (prepp.in/paper/rrb-ntpc-cbt-1-under-graduate-paper-<d>-<mon>-2026-shift-<n>-<id>), their CDN
 * addresses not recorded.
 */
export type Shift = { level: Level; date: string; shift: number; file: string; url: string | null; sourceFile: string; pyqYear: number; pyqMonth: string; pyqNote: string };

/** Graduate shifts, id `g1-<date>-s<n>` (g1 = graduate level, CBT 1). */
const GRADUATE_SHIFTS: Record<string, Shift> = Object.fromEntries(
  Object.entries(DAYS).flatMap(([dd, suffixes]) =>
    suffixes.map((suffix, i) => {
      const shift = i + 1;
      const date = `2026-03-${dd}`;
      return [
        `g1-${date}-s${shift}`,
        {
          level: "graduate",
          date,
          shift,
          file: join(SOURCE_ROOT, `RRB_NTPC_Grad_CBT1_${date}_S${shift}_EN.pdf`),
          url: `${CDN}-mar-${dd}-2026-shift-${shift}-${suffix}.pdf`,
          sourceFile: `RRB_NTPC_G_CBT1_${date}_S${shift}`,
          pyqYear: CYCLE,
          pyqMonth: "March",
          pyqNote: `Graduate CBT 1, ${Number(dd)} Mar 2026, Shift ${shift}`,
        },
      ] as const;
    })
  )
);

/**
 * Undergraduate CBT 1 of cycle CEN 07/2025, sat 7-9 May and 13-20 June 2026 (13 June held shifts
 * 2 and 3 only): 32 shifts, from the same Prepp re-saves of RRB's response sheets, English.
 */
export const UG_SOURCE_ROOT = "C:\\Vilas\\LWS_Pune\\RRB\\NTPC\\2026_UG_CBT1";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/** date -> the shifts held that day. */
const UG_DAYS: Record<string, number[]> = {
  "2026-05-07": [1, 2, 3],
  "2026-05-08": [1, 2, 3],
  "2026-05-09": [1, 2, 3],
  "2026-06-13": [2, 3],
  ...Object.fromEntries(["14", "15", "16", "17", "18", "19", "20"].map((d) => [`2026-06-${d}`, [1, 2, 3]])),
};

/** Undergraduate shifts, id `u1-<date>-s<n>` (u1 = undergraduate level, CBT 1). */
const UNDERGRADUATE_SHIFTS: Record<string, Shift> = Object.fromEntries(
  Object.entries(UG_DAYS).flatMap(([date, shifts]) =>
    shifts.map((shift) => {
      const [, m, d] = date.split("-").map(Number);
      return [
        `u1-${date}-s${shift}`,
        {
          level: "undergraduate",
          date,
          shift,
          file: join(UG_SOURCE_ROOT, `RRB_NTPC_UG_CBT1_${date}_S${shift}_EN.pdf`),
          url: null,
          sourceFile: `RRB_NTPC_UG_CBT1_${date}_S${shift}`,
          pyqYear: CYCLE,
          pyqMonth: MONTH_NAMES[m - 1],
          pyqNote: `Undergraduate CBT 1, ${d} ${MONTHS[m - 1]} 2026, Shift ${shift}`,
        },
      ] as const;
    })
  )
);

/** Every shift of both levels; each names its level. */
export const SHIFTS: Record<string, Shift> = { ...GRADUATE_SHIFTS, ...UNDERGRADUATE_SHIFTS };

/** A shift's exam and paper layout. */
export const levelOf = (shift: Shift): LevelConfig => LEVELS[shift.level];

export function requireShift(id: string | undefined): Shift & { id: string } {
  if (!id || !SHIFTS[id]) throw new Error(`unknown shift "${id}". Known: ${Object.keys(SHIFTS).join(", ")}`);
  return { id, ...SHIFTS[id] };
}

export const OUT = join(__dirname, "out"); // gitignored: geometry, questions.json (KEY), reading sheets, drafts
export const TRANSCRIPTS = join(__dirname, "transcripts"); // committed: the source of record
export const FIGURES = join(__dirname, "figures"); // committed: RRB's own figure images, per shift
