// SSC CGL lane configuration. Runbook: scripts/ssc-cgl/README.md.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Part } from "./lib";

/** Same tenant + creator every bank pipeline writes as (see scripts/upsc/config.ts). */
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";

export const EXAM_NAME = "SSC CGL";
/** `SSC CGL`, created by seed-exam.ts on 2026-10-16, when the pilot shifts were ready to commit. */
export const EXAM_ID = "eec6daa8-bea9-4643-a10e-cfb3739be607";
export function requireExamId(): string {
  if (!EXAM_ID) throw new Error("EXAM_ID is empty: run scripts/ssc-cgl/seed-exam.ts --apply and paste the id into config.ts");
  return EXAM_ID;
}

/**
 * Tier I is four parts of 25. General Awareness is split into the eight subjects
 * CDS General Knowledge uses (owner, 2026-10-16), so a GA question names its own;
 * the other three parts are one subject each.
 */
export const SECTION_SUBJECTS: Record<Part, string[]> = {
  A: ["Reasoning"],
  B: ["History", "Geography", "Polity", "Economics", "Physics", "Chemistry", "Biology", "Current Affairs"],
  C: ["Quantitative Aptitude"],
  D: ["English"],
};
export const SUBJECTS = (): string[] => Object.values(SECTION_SUBJECTS).flat();

export function subjectFor(part: Part, named?: string): string {
  const allowed = SECTION_SUBJECTS[part];
  if (named === undefined) {
    if (allowed.length > 1) throw new Error(`PART-${part} is General Awareness: each question must name its subject`);
    return allowed[0];
  }
  if (!allowed.includes(named)) throw new Error(`"${named}" is not a PART-${part} subject (${allowed.join(", ")})`);
  return named;
}

export type Catalog = Record<string, { chapter: string; subtopics: string[] }[]>;
/** Written by seed-catalog.ts: CDS's names plus catalog-authored.json. */
export const CATALOG: Catalog = JSON.parse(readFileSync(join(__dirname, "catalog.json"), "utf8"));

export const SOURCE_ROOT = "C:\\Vilas\\LWS_Pune\\SSC\\CGL";

/**
 * One exam DAY = one PDF holding every shift of that day, as hosted by AglaSem: the
 * printed "challenge module" saved paper, SSC's own render (one fixed question order
 * per shift, the key coloured in). Never a retyped copy.
 *
 * The 2025 Tier I key is PROVISIONAL: these sheets come from the challenge window
 * opened 2025-10-16, and the final key was released only through candidate login
 * (until 2026-02-08). Our answers are derived independently and compared with it.
 */
export type Day = {
  tier: 1 | 2;
  date: string;
  shifts: number;
  file: string;
  url: string;
  provisionalKey: boolean;
  /** shift -> question numbers the hosted file does not contain (its gap, not ours) */
  missing?: Record<number, number[]>;
  /** the shift numbers the hosted file holds, when it lacks whole shifts (13 Sep 2025: 2, 3) */
  present?: number[];
};

/** The shift numbers a day's file holds: `present`, or 1..shifts. */
export const shiftsOf = (d: Day): number[] => d.present ?? Array.from({ length: d.shifts }, (_, i) => i + 1);
const t1_2025 = (dd: string, mon: "Sep" | "Oct", docId: string, extra: Partial<Day> = {}): Day => ({
  tier: 1,
  date: `2025-${mon === "Sep" ? "09" : "10"}-${dd}`,
  shifts: 3,
  file: join(SOURCE_ROOT, "2025_Tier1", `SSC_CGL_2025_Tier1_${dd}${mon}_AllShifts.pdf`),
  url: `https://cdn.aglasem.com/aglasem-doc/${docId}/${docId}.pdf`,
  provisionalKey: true,
  ...extra,
});

export const DAYS: Record<string, Day> = {
  "t1-2025-09-12": t1_2025("12", "Sep", "11f241cc-8c19-11f1-aa13-0aa932765c8b"),
  "t1-2025-09-14": t1_2025("14", "Sep", "1c04e296-8c19-11f1-b4ad-0aa932765c8b"),
  "t1-2025-09-15": t1_2025("15", "Sep", "1f3fefb4-8c19-11f1-b79a-0aa932765c8b"),
  "t1-2025-09-17": t1_2025("17", "Sep", "2643aefe-8c19-11f1-8ce7-0aa932765c8b"),
  // The hosted 13 Sep file holds Shifts 2 and 3 only (88 pages, no Shift 1 at all).
  "t1-2025-09-13": t1_2025("13", "Sep", "15180936-8c19-11f1-b794-0aa932765c8b", { shifts: 2, present: [2, 3] }),
  // The hosted 20 Sep file: pages 2-5 are a complete Shift 1 (web print, one tall page per
  // PART); pages 6-38 are a second render with no text Q.No labels and pages 39-42 are
  // screenshots, neither readable here yet. Extract with --pages=2-5.
  "t1-2025-09-20": t1_2025("20", "Sep", "303df2f2-8c19-11f1-8b00-0aa932765c8b", { shifts: 1 }),
  // The hosted 21 Sep file has no PART-A for Shift 2 (Q1-25).
  "t1-2025-09-21": t1_2025("21", "Sep", "33741f14-8c19-11f1-87d6-0aa932765c8b", { missing: { 2: Array.from({ length: 25 }, (_, i) => i + 1) } }),
  // The hosted 22 Sep file holds Shifts 1 and 3 only.
  "t1-2025-09-22": t1_2025("22", "Sep", "36226270-8c19-11f1-8111-0aa932765c8b", { shifts: 2, present: [1, 3] }),
  "t1-2025-09-23": t1_2025("23", "Sep", "390f6be0-8c19-11f1-af57-0aa932765c8b"),
  "t1-2025-09-24": t1_2025("24", "Sep", "3c8b27dc-8c19-11f1-813c-0aa932765c8b"),
  "t1-2025-09-26": t1_2025("26", "Sep", "3f3b42e6-8c19-11f1-979e-0aa932765c8b"),
  "t1-2025-09-16": {
    tier: 1,
    date: "2025-09-16",
    shifts: 3,
    file: join(SOURCE_ROOT, "2025_Tier1", "SSC_CGL_2025_Tier1_16Sep_AllShifts.pdf"),
    url: "https://cdn.aglasem.com/aglasem-doc/234a8646-8c19-11f1-98f5-0aa932765c8b/234a8646-8c19-11f1-98f5-0aa932765c8b.pdf",
    provisionalKey: true,
    // The hosted file jumps from Shift 3's PART-B straight to PART-D: no Quant section at all.
    missing: { 3: Array.from({ length: 25 }, (_, i) => 51 + i) },
  },
  "t1-2025-09-18": {
    tier: 1,
    date: "2025-09-18",
    shifts: 3,
    file: join(SOURCE_ROOT, "2025_Tier1", "SSC_CGL_2025_Tier1_18Sep_AllShifts.pdf"),
    url: "https://cdn.aglasem.com/aglasem-doc/2917d268-8c19-11f1-b22f-0aa932765c8b/2917d268-8c19-11f1-b22f-0aa932765c8b.pdf",
    provisionalKey: true,
  },
  "t1-2025-09-19": {
    tier: 1,
    date: "2025-09-19",
    shifts: 3,
    file: join(SOURCE_ROOT, "2025_Tier1", "SSC_CGL_2025_Tier1_19Sep_AllShifts.pdf"),
    url: "https://cdn.aglasem.com/aglasem-doc/2d8e69ce-8c19-11f1-8775-0aa932765c8b/2d8e69ce-8c19-11f1-8775-0aa932765c8b.pdf",
    provisionalKey: true,
  },
};

/** pyqMonth is a month NAME, as everywhere in the bank ("September"), never a number. */
export type Shift = { day: string; shift: number; sourceFile: string; pyqYear: number; pyqMonth: string; pyqNote: string };

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const TIER = ["", "I", "II"];

/** Every shift of every registered day, derived: id `<day>-s<n>`, one source_file each. */
export const SHIFTS: Record<string, Shift> = Object.fromEntries(
  Object.entries(DAYS).flatMap(([day, d]) => {
    const [y, m, dd] = d.date.split("-").map(Number);
    return shiftsOf(d).map((shift) => {
      return [
        `${day}-s${shift}`,
        {
          day,
          shift,
          sourceFile: `SSC_CGL_T${d.tier}_${d.date}_S${shift}`,
          pyqYear: y,
          pyqMonth: MONTHS[m - 1],
          pyqNote: `Tier ${TIER[d.tier]}, ${dd} ${MONTHS[m - 1].slice(0, 3)} ${y}, Shift ${shift}`,
        },
      ] as const;
    });
  })
);

export function requireShift(id: string | undefined): Shift & { id: string } {
  if (!id || !SHIFTS[id]) throw new Error(`unknown shift "${id}". Known: ${Object.keys(SHIFTS).join(", ")}`);
  return { id, ...SHIFTS[id] };
}

export const OUT = join(__dirname, "out"); // gitignored: page images, geometry, reading sheets
export const TRANSCRIPTS = join(__dirname, "transcripts"); // committed: the source of record
export const FIGURES = join(__dirname, "figures"); // committed: SSC's own figure images, per shift
