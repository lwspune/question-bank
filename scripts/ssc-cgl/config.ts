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
  /**
   * "tcs": a 2022-2024 TCS response sheet, text with the key as the option colour (tcs.ts),
   * read by assemble-tcs.ts. Absent: the 2025 challenge-module render (assemble.ts).
   */
  format?: "tcs";
  /** TCS only: the day's slots in shift order, as the sheets print Exam Time */
  slots?: string[];
  /** One file per SHIFT (2022) instead of one per day: shift -> file. `file`/`url` are unused. */
  shiftFiles?: Record<number, { file: string; url: string }>;
  /** The page range (tcs_extract.py --pages) of the day file's TEXT sheets, when it also holds scans. */
  pages?: string;
  /**
   * The 2023 scans: shift -> the page range of its sheet in the day file, each extracted to its
   * own out/ folder and read by vector.ts (the date and shift come from here, like 2022).
   */
  shiftPages?: Record<number, string>;
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

/**
 * 2024 Tier I: AglaSem hosts one TCS file per exam day (English). A file runs past its own
 * day (the 10 Sep file ends with 11 Sep 9 AM), so assemble-tcs.ts reads EVERY 2024 file and
 * files each sheet under the Exam Date it prints. The key is the response sheet's, released
 * with the tentative key, so it counts as provisional.
 */
const SLOTS_2024_T1 = ["9:00 AM - 10:00 AM", "12:30 PM - 1:30 PM", "4:00 PM - 5:00 PM"];
const t1_2024 = (dd: string, docId: string): Day => ({
  tier: 1,
  date: `2024-09-${dd}`,
  shifts: 3,
  file: join(SOURCE_ROOT, "2024_Tier1", `SSC_CGL_2024_Tier1_${dd}Sep_AllShifts_EN.pdf`),
  url: `https://cdn.aglasem.com/aglasem-doc/${docId}/${docId}.pdf`,
  provisionalKey: true,
  format: "tcs",
  slots: SLOTS_2024_T1,
});

/**
 * 2023 Tier I: AglaSem hosts one TCS file per exam day (English). 25-27 Jul are text sheets,
 * read like 2024 (each sheet filed under the Exam Date it prints). 17-24 Jul, and 14 Jul from
 * 2:30, are SCANS: the 2022 vector print, but each sheet's first page is a raster picture with
 * an OCR layer (vector.ts reads it from pixel marks). A scanned sheet is registered by its page
 * range (`shiftPages`), found from that raster first page and its printed Exam Time.
 */
const SLOTS_2023_T1 = ["9:00 AM - 10:00 AM", "11:45 AM - 12:45 PM", "2:30 PM - 3:30 PM", "5:15 PM - 6:15 PM"];
const t1_2023 = (dd: string, docId: string, extra: Pick<Day, "present" | "pages" | "shiftPages"> = {}): Day => ({
  tier: 1,
  date: `2023-07-${dd}`,
  shifts: 4,
  ...extra,
  file: join(SOURCE_ROOT, "2023_Tier1", `SSC_CGL_2023_Tier1_${dd}Jul_AllShifts_EN.pdf`),
  url: `https://cdn.aglasem.com/aglasem-doc/${docId}/${docId}.pdf`,
  provisionalKey: true,
  format: "tcs",
  slots: SLOTS_2023_T1,
});

/**
 * 2022 Tier I: AglaSem hosts one TCS file per SHIFT. 1-3 Dec carry a text layer (tcs.ts);
 * 5-13 Dec are the vector print with no text (vector.ts), so their date and shift come from
 * here. The listing loaded 37 files (to 13 Dec Shift 1); later shifts are on unloaded pages.
 */
const SLOTS_2022_T1 = ["9:00 AM - 10:00 AM", "11:45 AM - 12:45 PM", "2:30 PM - 3:30 PM", "5:15 PM - 6:15 PM"];
const t1_2022 = (dd: string, docs: Record<number, string>): Day => ({
  tier: 1,
  date: `2022-12-${dd}`,
  shifts: 4,
  ...(Object.keys(docs).length < 4 ? { present: Object.keys(docs).map(Number) } : {}),
  file: "",
  url: "",
  provisionalKey: true,
  format: "tcs",
  slots: SLOTS_2022_T1,
  shiftFiles: Object.fromEntries(
    Object.entries(docs).map(([n, id]) => [
      n,
      {
        file: join(SOURCE_ROOT, "2022_Tier1", `SSC_CGL_2022_Tier1_${dd}Dec_S${n}_EN.pdf`),
        url: `https://cdn.aglasem.com/aglasem-doc/${id}/${id}.pdf`,
      },
    ])
  ),
});

export const DAYS: Record<string, Day> = {
  // Left out: 1 Dec Shift 3's hosted file starts mid-paper (Q14 of Reasoning, no header).
  // 5 Dec S4, 7 Dec S2, 9 Dec S3 and 12 Dec S4 hold two or three DIFFERENT papers in the
  // vector print, whose headers are glyphs: which one is the named shift is unproven.
  // 7 Dec S3 prints 106 questions (pages repeated): which six are the extras is unproven.
  "t1-2022-12-01": t1_2022("01", { 1: "d472b620-db03-11ed-8758-0a5e36bc6706", 2: "d472b620-db03-11ed-af8b-0a5e36bc6706", 4: "d46884e8-db03-11ed-8bc0-0a5e36bc6706" }),
  "t1-2022-12-02": t1_2022("02", { 1: "d44fe0a0-db03-11ed-8859-0a5e36bc6706", 2: "d6737b94-db03-11ed-ab4b-0a5e36bc6706", 3: "d6e552c8-db03-11ed-aee1-0a5e36bc6706", 4: "d6f8588c-db03-11ed-b26d-0a5e36bc6706" }),
  "t1-2022-12-03": t1_2022("03", { 1: "d6f854f4-db03-11ed-97e9-0a5e36bc6706", 2: "d6f876be-db03-11ed-b66c-0a5e36bc6706", 3: "d73cdbf6-db03-11ed-bebe-0a5e36bc6706", 4: "d8960e8c-db03-11ed-9323-0a5e36bc6706" }),
  "t1-2022-12-05": t1_2022("05", { 1: "d8e26e4e-db03-11ed-aba7-0a5e36bc6706", 2: "d9e03560-db03-11ed-bad8-0a5e36bc6706", 3: "d9eaef46-db03-11ed-8b3f-0a5e36bc6706" }),
  "t1-2022-12-06": t1_2022("06", { 1: "da656988-db03-11ed-96c7-0a5e36bc6706", 2: "dadf6918-db03-11ed-a2db-0a5e36bc6706", 3: "dc6f00e0-db03-11ed-8105-0a5e36bc6706", 4: "dc780596-db03-11ed-84a7-0a5e36bc6706" }),
  "t1-2022-12-07": t1_2022("07", { 1: "dc6bfac6-db03-11ed-89a8-0a5e36bc6706", 4: "df84c120-db03-11ed-89d1-0a5e36bc6706" }),
  "t1-2022-12-08": t1_2022("08", { 1: "df955efe-db03-11ed-b2a3-0a5e36bc6706", 2: "df95b05c-db03-11ed-958a-0a5e36bc6706", 3: "dfeec53e-db03-11ed-bc8a-0a5e36bc6706", 4: "dfecc874-db03-11ed-8097-0a5e36bc6706" }),
  "t1-2022-12-09": t1_2022("09", { 1: "e1d5cd5c-db03-11ed-942e-0a5e36bc6706", 2: "e2a82450-db03-11ed-a491-0a5e36bc6706", 4: "e2d1a0aa-db03-11ed-aa58-0a5e36bc6706" }),
  "t1-2022-12-12": t1_2022("12", { 1: "e2de986e-db03-11ed-ab11-0a5e36bc6706", 2: "e3707b12-db03-11ed-b3db-0a5e36bc6706", 3: "e3ce6d8a-db03-11ed-b8d8-0a5e36bc6706" }),
  "t1-2022-12-13": t1_2022("13", { 1: "e5dd0794-db03-11ed-9e66-0a5e36bc6706" }),
  // The hosted 14 Jul file: pages 1-58 are the 9:00 and 11:45 sheets with a text layer; the
  // 2:30 and 5:15 sheets are scans. The 21 Jul 11:45 sheet opens on a vector page, not a scan.
  "t1-2023-07-14": t1_2023("14", "f905caf0-8c11-11f1-b1b6-0aa932765c8b", { pages: "1-58", shiftPages: { 3: "59-91", 4: "92-126" } }),
  "t1-2023-07-17": t1_2023("17", "0f9825ec-8c12-11f1-a8e1-0aa932765c8b", { shiftPages: { 1: "2-35", 2: "36-66", 3: "67-98", 4: "99-131" } }),
  "t1-2023-07-18": t1_2023("18", "242d55ae-8c12-11f1-b948-0aa932765c8b", { shiftPages: { 1: "2-36", 2: "37-68", 3: "69-100", 4: "101-133" } }),
  "t1-2023-07-19": t1_2023("19", "38927f42-8c12-11f1-bf79-0aa932765c8b", { shiftPages: { 1: "2-33", 2: "34-69", 3: "70-101", 4: "102-133" } }),
  "t1-2023-07-20": t1_2023("20", "46f42158-8c12-11f1-9918-0aa932765c8b", { shiftPages: { 1: "2-33", 2: "34-65", 3: "66-98", 4: "99-133" } }),
  "t1-2023-07-21": t1_2023("21", "4f9f94cc-8c12-11f1-892b-0aa932765c8b", { shiftPages: { 1: "2-36", 2: "37-70", 3: "71-103", 4: "104-137" } }),
  "t1-2023-07-24": t1_2023("24", "57fb3298-8c12-11f1-8453-0aa932765c8b", { shiftPages: { 1: "2-34", 2: "35-69", 3: "70-104", 4: "105-139" } }),
  "t1-2023-07-25": t1_2023("25", "5e9632ec-8c12-11f1-9d16-0aa932765c8b"),
  "t1-2023-07-26": t1_2023("26", "64aa3ce6-8c12-11f1-8632-0aa932765c8b"),
  // The 27 Jul file holds the first three sheets.
  "t1-2023-07-27": t1_2023("27", "6ac4e6da-8c12-11f1-9577-0aa932765c8b", { present: [1, 2, 3] }),
  "t1-2024-09-09": t1_2024("09", "73c870dc-8c15-11f1-9679-0aa932765c8b"),
  "t1-2024-09-10": t1_2024("10", "78ca267a-8c15-11f1-8a06-0aa932765c8b"),
  "t1-2024-09-11": t1_2024("11", "7d86f94a-8c15-11f1-b917-0aa932765c8b"),
  "t1-2024-09-12": t1_2024("12", "816d4c1c-8c15-11f1-8148-0aa932765c8b"),
  "t1-2024-09-13": t1_2024("13", "853c0e28-8c15-11f1-afcc-0aa932765c8b"),
  "t1-2024-09-17": t1_2024("17", "89f250da-8c15-11f1-b895-0aa932765c8b"),
  "t1-2024-09-18": t1_2024("18", "8da72886-8c15-11f1-84e7-0aa932765c8b"),
  "t1-2024-09-19": t1_2024("19", "91f00ea8-8c15-11f1-b445-0aa932765c8b"),
  "t1-2024-09-23": t1_2024("23", "9623055c-8c15-11f1-817a-0aa932765c8b"),
  "t1-2024-09-24": t1_2024("24", "9a552100-8c15-11f1-aafc-0aa932765c8b"),
  "t1-2024-09-25": t1_2024("25", "9e42f4fe-8c15-11f1-9173-0aa932765c8b"),
  "t1-2024-09-26": t1_2024("26", "a1f73c4a-8c15-11f1-bea0-0aa932765c8b"),
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

/**
 * Every TCS file, in day order: `dir` is its out/ folder (tcs_extract.py's dayId). A day
 * hosted as one file per shift (2022) lists each, with the shift it holds.
 */
export type TcsFile = { dir: string; day: Day; file: string; shift?: number; pages?: string };
export function tcsFiles(): TcsFile[] {
  return Object.entries(DAYS)
    .filter(([, d]) => d.format === "tcs")
    .sort(([a], [b]) => a.localeCompare(b))
    .flatMap(([dir, day]): TcsFile[] => {
      if (day.shiftFiles)
        return Object.entries(day.shiftFiles).map(([n, f]) => ({ dir: `${dir}-s${n}`, day, file: f.file, shift: Number(n) }));
      const scans = Object.entries(day.shiftPages ?? {}).map(([n, pages]) => ({ dir: `${dir}-s${n}`, day, file: day.file, shift: Number(n), pages }));
      // The day file's text sheets: all of it, its `pages`, or nothing when every shift is a scan.
      const textShifts = shiftsOf(day).filter((n) => !day.shiftPages?.[n]);
      const text = textShifts.length ? [{ dir, day, file: day.file, ...(day.pages ? { pages: day.pages } : {}) }] : [];
      return [...text, ...scans];
    });
}

export function requireShift(id: string | undefined): Shift & { id: string } {
  if (!id || !SHIFTS[id]) throw new Error(`unknown shift "${id}". Known: ${Object.keys(SHIFTS).join(", ")}`);
  return { id, ...SHIFTS[id] };
}

export const OUT = join(__dirname, "out"); // gitignored: page images, geometry, reading sheets
export const TRANSCRIPTS = join(__dirname, "transcripts"); // committed: the source of record
export const FIGURES = join(__dirname, "figures"); // committed: SSC's own figure images, per shift
