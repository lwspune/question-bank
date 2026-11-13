// RRB NTPC lane configuration. Runbook: scripts/rrb-ntpc/README.md.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Section } from "../ssc-cgl/config";

export { CREATED_BY, ORG_ID } from "../ssc-cgl/config";

export const EXAM_NAME = "RRB NTPC";
/** Created by seed-exam.ts; empty until then (commit.ts refuses to run without it). */
export const EXAM_ID = "";
export function requireExamId(): string {
  if (!EXAM_ID) throw new Error("EXAM_ID is empty: run scripts/rrb-ntpc/seed-exam.ts --apply and paste the id into config.ts");
  return EXAM_ID;
}

/**
 * General Awareness, split into the eight subjects CDS and SSC CGL use, plus Computer Knowledge:
 * NTPC's syllabus names "basics of computers", and each paper asks one to three such questions.
 */
const GA = ["History", "Geography", "Polity", "Economics", "Physics", "Chemistry", "Biology", "Current Affairs", "Computer Knowledge"];
export const SUBJECTS = ["Mathematics", "Reasoning", ...GA];

/**
 * The sheet prints ONE section for the whole paper ("RRB NTPC GRADUATE CBT 1"), with Mathematics,
 * Reasoning and General Awareness questions mixed in it, so every question names its subject.
 */
export const LAYOUT: Section[] = [{ part: "A", match: /^RRB NTPC GRADUATE CBT 1$/i, count: 100, subjects: SUBJECTS }];

/** The day's three slots in shift order, as every sheet prints Test Time. */
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
/** The notification cycle the paper belongs to: its pyq_year (the sitting date is in the note). */
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

/** pyqMonth is a month NAME, as everywhere in the bank. */
export type Shift = { date: string; shift: number; file: string; url: string; sourceFile: string; pyqYear: number; pyqMonth: string; pyqNote: string };

/** Every shift, id `g1-<date>-s<n>` (g1 = graduate level, CBT 1). */
export const SHIFTS: Record<string, Shift> = Object.fromEntries(
  Object.entries(DAYS).flatMap(([dd, suffixes]) =>
    suffixes.map((suffix, i) => {
      const shift = i + 1;
      const date = `2026-03-${dd}`;
      return [
        `g1-${date}-s${shift}`,
        {
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

export function requireShift(id: string | undefined): Shift & { id: string } {
  if (!id || !SHIFTS[id]) throw new Error(`unknown shift "${id}". Known: ${Object.keys(SHIFTS).join(", ")}`);
  return { id, ...SHIFTS[id] };
}

export const OUT = join(__dirname, "out"); // gitignored: geometry, questions.json (KEY), reading sheets, drafts
export const TRANSCRIPTS = join(__dirname, "transcripts"); // committed: the source of record
export const FIGURES = join(__dirname, "figures"); // committed: RRB's own figure images, per shift
