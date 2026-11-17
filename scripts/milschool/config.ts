// Shared config for the military-school entrance lane: AISSEE (Sainik Schools,
// Class 6 and 9), RMS CET (Rashtriya Military Schools, Class 6 and 9) and RIMC
// (Rashtriya Indian Military College, Class 8). One lane, five exams.
//
// SOURCES (owner, 2026-11-17: "lets use 3p"). No body publishes these papers
// openly: NTA shows the AISSEE booklet and key only behind each candidate's login
// for ~3 days, the RMS site has neither, and RIMC sells its old papers as a
// booklet. So every paper here is a third-party RE-HOST (AglaSem) of the ORIGINAL
// print, checked page by page to be a scan or photo of the printed booklet, never
// a retyped copy (the no-transcribed-sources rule). AglaSem serves each document
// as page JPGs (`cdn.aglasem.com/aglasem-doc/<docId>/<n>.jpg`, page 1 = its own
// cover); `docId` below is that id, so any page can be fetched again.
//
// ANSWER KEYS. AISSEE 2022-2026 have NTA's own FINAL key (on NTA letterhead, one
// page per test-booklet code, options numbered 1-4, "DROP" for a withdrawn item,
// "1,2" where two options were accepted). AISSEE 2020-2021, RMS and RIMC have no
// key: two blind passes + a hand check of every dispute, as the CAPF lane did.
//
// FREE (owner, 2026-11-17): "those papers are free for our users", so every exam
// here is passScope "free" in the registry and `pass_scope = 'free'` on its row.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

// LWS Pune org + admin (same as every sibling pipeline).
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";

/** Where the downloaded page JPGs live: <root>/<exam folder>/<paper folder>/NN.jpg. */
export const SOURCE_ROOT = process.env.MILSCHOOL_SRC ?? "C:\\Vilas\\LWS_Pune\\Sainik_Schools\\papers";
/** AglaSem's original PDFs (`<docId>/<docId>.pdf`), 2-3x sharper than the viewer JPGs. */
export const PDF_ROOT = join(SOURCE_ROOT, "_pdf");
/** Figure crops (uploaded to image_url), kept beside the sources. */
export const FIGURE_ROOT = process.env.MILSCHOOL_FIGURES ?? "C:\\Vilas\\LWS_Pune\\Sainik_Schools\\figures";

export const OUT = join(__dirname, "out"); // gitignored: column crops, blind packets
export const DATA = join(__dirname, "data"); // committed: transcriptions, key reads
export const DERIVED = join(__dirname, "derived"); // committed: the blind passes

export type ExamKey = "aissee-6" | "aissee-9" | "rms-cet-6" | "rms-cet-9" | "rimc";

export type ExamDef = {
  /** The `exams.name` row; must match the registry's `examName` exactly. */
  name: string;
  /** Filled in from seed-exams.ts --apply. Empty = not seeded yet. */
  examId: string;
  /** catalog-<key>.json beside this file. */
  catalogFile: string;
};

export const EXAMS: Record<ExamKey, ExamDef> = {
  // examIds created by seed-exams.ts --apply on 2026-11-17, every row pass_scope 'free'.
  "aissee-6": { name: "AISSEE Class 6", examId: "e429fa88-bc37-459b-a6fb-bd7511ca2e12", catalogFile: "catalog-aissee-6.json" },
  "aissee-9": { name: "AISSEE Class 9", examId: "b709a178-cf08-4e9d-a1c2-03041ac187a0", catalogFile: "catalog-aissee-9.json" },
  "rms-cet-6": { name: "RMS CET Class 6", examId: "c2ca374a-966d-42c8-b5a9-d53308ae3e74", catalogFile: "catalog-rms-cet-6.json" },
  "rms-cet-9": { name: "RMS CET Class 9", examId: "f39ca028-fe83-476d-adb1-a30a77d3f5b4", catalogFile: "catalog-rms-cet-9.json" },
  rimc: { name: "RIMC", examId: "37ffb745-d817-4b47-b1a2-57ae2a3a0536", catalogFile: "catalog-rimc.json" },
};

/** The shared core is typed on a paper number; every paper here is one sitting. */
export type PaperNumber = 1;

export type Pattern = { questions: number; marks: number; minutes: number };

export type Paper = {
  id: string; // e.g. "aissee-9-2025"; also the data/<id>.* prefix
  exam: ExamKey;
  paper: PaperNumber;
  /** questions.source_file + upload_jobs.filename (dedup / rollback key). */
  sourceFile: string;
  /** Folder under SOURCE_ROOT holding the page JPGs. */
  pagesDir: string;
  /**
   * The original PDF in PDF_ROOT. When set, pages render from it (the viewer
   * JPGs drop thin strokes). aissee-9-2025 keeps its JPGs: its figure regions
   * were drawn on those renders.
   */
  pdf?: string;
  /** 1-based page numbers carrying questions (JPG n = PDF page n). Empty = pre-pass not done. */
  pages: number[];
  /** AglaSem document id of the booklet. */
  docId: string;
  pyqYear: number;
  pyqNote: string;
  pattern: Pattern;
  /** NTA's key: its folder under SOURCE_ROOT, and the JPG carrying this booklet's code. */
  key?: { dir: string; page: number; code: string; docId: string; final: boolean };
  /** Question numbers deliberately NOT transcribed (e.g. a Hindi-language
   *  section once held for a decision). Coverage expects them absent and
   *  fails if one turns up, so a hold is always written down, never silent. */
  held?: { numbers: number[]; why: string };
  /** "written": no options, a model answer per item (RIMC Maths and English).
   *  Coverage is the transcription's own 1..N numbering plus a marks total that
   *  must equal the paper's printed maximum. Absent = an MCQ paper. */
  format?: "written";
};

const range = (from: number, to: number): number[] => {
  const out: number[] = [];
  for (let i = from; i <= to; i++) out.push(i);
  return out;
};

// AISSEE Class 9 (NTA era): Maths 50 x 4 + Intelligence, English, General
// Science, Social Science 25 x 2 = 150 q / 400 marks / 180 min, no negative
// marking (printed on the 2025 booklet's cover).
const AISSEE_9: Pattern = { questions: 150, marks: 400, minutes: 180 };
// AISSEE Class 6 (NTA era): Language 25 x 2, Mathematics 50 x 3, Intelligence
// 25 x 2, General Knowledge 25 x 2 = 125 q / 300 marks / 150 min, no negative
// marking (printed on the 2024 booklet's cover). We take the ENGLISH-medium
// booklet: 2023 and 2025's copies are Hindi-medium (Hindi language section).
const AISSEE_6: Pattern = { questions: 125, marks: 300, minutes: 150 };
// RMS CET (Rashtriya Military Schools, AE-2): 200 one-mark questions, 2 h 30 min
// (printed on the 2023 covers). Class 6: English, General Knowledge,
// Intelligence, Mathematics, 50 each. Class 9: Part I English 50, Hindi 20,
// Social Science 30; Part II Mathematics 50, Science 50 (2022 + 2023 covers).
const RMS_6: Pattern = { questions: 200, marks: 200, minutes: 150 };
const RMS_9: Pattern = { questions: 200, marks: 200, minutes: 150 };
// RMS Class 9's Section II is a Hindi LANGUAGE test (Q51-70), compulsory for
// every candidate: transcribed IN HINDI as Hindi-only rows under the catalog's
// "Hindi" subject (owner, 2026-11-17; the MPSC Mains Marathi pattern).

// ---- RIMC (Rashtriya Indian Military College, Dehradun), Class 8 entry, two
// sessions a year. Each session sets THREE separate papers, so each is its own
// Paper here: English (written, 125 marks, 2 h: reading, writing, grammar),
// General Knowledge (75 one-mark MCQs, Hindi + English, 1 h, no negative
// marking) and Mathematics (written: Part A 20 x 5 + Part B 10 x 10 = 200,
// 1 h 30 min, marked stepwise). Sources: AglaSem's PDFs, one per session
// (2018-2021 scans; 2022 Dec and 2023 Jun have a text layer). RIMC publishes
// no key: GK = two blind passes + crosstab; written = two blind solutions +
// crosstab-written.ts, essays and letters one sample answer each.
const RIMC_GK: Pattern = { questions: 75, marks: 75, minutes: 60 };
const RIMC_MATHS: Pattern = { questions: 30, marks: 200, minutes: 90 };
/** English rows follow the paper's own parts, so their count is as transcribed (0). */
const RIMC_ENGLISH: Pattern = { questions: 0, marks: 125, minutes: 120 };

const RIMC_SESSIONS: { s: string; docId: string; english: number[]; gk: number[]; maths: number[] }[] = [
  { s: "2018_jun", docId: "832a5fa8-c18f-11ed-87d7-0a5e36bc6706", english: range(2, 5), gk: range(6, 11), maths: range(12, 14) },
  { s: "2018_dec", docId: "8542000c-c18f-11ed-8137-0a5e36bc6706", english: range(2, 5), gk: range(6, 11), maths: range(12, 14) },
  { s: "2019_jun", docId: "86ff665a-c18f-11ed-ae86-0a5e36bc6706", english: range(2, 5), gk: range(6, 12), maths: range(13, 15) },
  { s: "2019_dec", docId: "88dde9c4-c18f-11ed-b7eb-0a5e36bc6706", english: range(2, 6), gk: range(7, 13), maths: range(14, 16) },
  { s: "2020_jun", docId: "8a6ebe76-c18f-11ed-96f0-0a5e36bc6706", english: range(2, 5), gk: range(6, 11), maths: range(12, 14) },
  { s: "2020_dec", docId: "8bee3b14-c18f-11ed-9deb-0a5e36bc6706", english: range(2, 6), gk: range(7, 13), maths: range(14, 17) },
  { s: "2021_jun", docId: "8d96ef74-c18f-11ed-8f5e-0a5e36bc6706", english: range(2, 5), gk: range(6, 12), maths: range(13, 16) },
  { s: "2021_dec", docId: "8fdcf878-c18f-11ed-918d-0a5e36bc6706", english: range(2, 5), gk: range(6, 11), maths: range(12, 14) },
  { s: "2022_dec", docId: "da68192c-5a0a-11ee-bb2d-0a5e36bc6706", english: range(1, 4), gk: range(5, 12), maths: range(13, 16) },
  { s: "2023_jun", docId: "dd04ae66-5a0a-11ee-911b-0a5e36bc6706", english: range(1, 4), gk: range(5, 12), maths: range(13, 16) },
];

const MONTH: Record<string, string> = { jun: "June", dec: "December" };

/** GK items that are not four-option MCQs (a fill-in blank with no options, a
 *  True/False, a five-choice match box). The bank stores an MCQ only with four
 *  options, so these are HELD on the GK paper and live in a small companion
 *  written paper `<gk id>-short` (moved by split-short.ts), one-mark short
 *  answers. Keyed by session; filled in as each GK paper is transcribed. */
const RIMC_GK_SHORT: Record<string, { numbers: number[]; why: string }> = {
  "2023_jun": { numbers: [38], why: "Q38 is a True/False item" },
  "2022_dec": { numbers: range(70, 75), why: "Q70-75 are fill-in-the-blank items with no options" },
  "2021_dec": { numbers: range(71, 75), why: "Q71-75 match from a printed box of five choices" },
  "2021_jun": { numbers: range(71, 75), why: "Q71-75 are fill-in-the-blank items with no options" },
};

/** GK numbers the paper itself never prints (checked on the page): held, not moved. */
const RIMC_GK_MISSING: Record<string, { numbers: number[]; why: string }> = {
  "2020_dec": { numbers: [75], why: "the paper prints Q1-74 only (its instructions say 75; page 13 ends at Q74)" },
};

const RIMC_PAPERS: Record<string, Paper> = Object.fromEntries(
  RIMC_SESSIONS.flatMap(({ s, docId, english, gk, maths }) => {
    const [y, m] = s.split("_");
    const year = Number(y);
    const subjects = [
      { key: "english", name: "English", pages: english, pattern: RIMC_ENGLISH, written: true },
      { key: "gk", name: "General Knowledge", pages: gk, pattern: RIMC_GK, written: false },
      { key: "maths", name: "Mathematics", pages: maths, pattern: RIMC_MATHS, written: true },
    ];
    const short = RIMC_GK_SHORT[s];
    const papers = subjects.map((sub): [string, Paper] => {
      const id = `rimc-${year}-${m}-${sub.key}`;
      return [
        id,
        {
          ...(sub.key === "gk" && (short || RIMC_GK_MISSING[s])
            ? {
                held: {
                  numbers: [...(short?.numbers ?? []), ...(RIMC_GK_MISSING[s]?.numbers ?? [])],
                  why: [short ? `${short.why}: moved to ${id}-short` : "", RIMC_GK_MISSING[s]?.why ?? ""].filter(Boolean).join("; "),
                },
              }
            : {}),
          id,
          exam: "rimc",
          paper: 1,
          sourceFile: `RIMC_${MONTH[m]}_${year}_${sub.name.replace(/ /g, "_")}.pdf`,
          pagesDir: `rimc\\${s}`,
          pdf: `rimc_${s}.pdf`,
          pages: sub.pages,
          docId,
          pyqYear: year,
          pyqNote: `RIMC ${MONTH[m]} ${year} (${sub.name})`,
          pattern: sub.pattern,
          ...(sub.written ? { format: "written" as const } : {}),
        },
      ];
    });
    if (short) {
      const id = `rimc-${year}-${m}-gk-short`;
      papers.push([
        id,
        {
          id,
          exam: "rimc",
          paper: 1,
          sourceFile: `RIMC_${MONTH[m]}_${year}_General_Knowledge_short_answers.pdf`,
          pagesDir: `rimc\\${s}`,
          pdf: `rimc_${s}.pdf`,
          pages: gk,
          docId,
          pyqYear: year,
          pyqNote: `RIMC ${MONTH[m]} ${year} (General Knowledge)`,
          pattern: { questions: short.numbers.length, marks: short.numbers.length, minutes: 0 },
          format: "written",
        },
      ]);
    }
    return papers;
  })
);

export const PAPERS: Record<string, Paper> = {
  // 33 JPGs: 1 AglaSem cover, 2 booklet cover (code H, APR-9-25), 3 its back,
  // 4-31 Q1-Q150, 32 rough work, 33 blank. Exam 05.04.2025. NTA final key page 4
  // = code H (checked: Q3, Q4, Q5 solved by hand match it).
  "aissee-9-2025": {
    id: "aissee-9-2025",
    exam: "aissee-9",
    paper: 1,
    sourceFile: "AISSEE_2025_Class9_CodeH.pdf",
    pagesDir: "aissee\\c9_2025_qp",
    pages: range(4, 31),
    docId: "48646d90-859b-11f1-9aae-0aa932765c8b",
    pyqYear: 2025,
    pyqNote: "AISSEE 2025 Class 9 (5 April 2025, booklet code H)",
    pattern: AISSEE_9,
    key: { dir: "aissee\\c9_2025_key", page: 4, code: "H", docId: "3bddf58c-859b-11f1-84d4-0aa932765c8b", final: true },
  },
  // 22 PDF pages, a grey photocopy scan, SINGLE column, "Class IX SET A",
  // English only: 2-22 Q1-Q150. Section order as 2021/2022 (Maths 1-50,
  // English 51-75, General Science 76-100, Social Science 101-125,
  // Intelligence 126-150; to be confirmed by the transcription). Exam
  // 05.01.2020. NO KEY: two blind passes + hand check (crosstab.ts).
  "aissee-9-2020": {
    id: "aissee-9-2020",
    exam: "aissee-9",
    paper: 1,
    sourceFile: "AISSEE_2020_Class9_SetA.pdf",
    pagesDir: "aissee\\c9_2020_qp",
    pdf: "aissee_c9_2020_qp.pdf",
    pages: range(2, 22),
    docId: "1e172ac2-3543-11eb-a831-02f21f5619c4",
    pyqYear: 2020,
    pyqNote: "AISSEE 2020 Class 9 (5 January 2020, Set A)",
    pattern: AISSEE_9,
  },
  // 24 PDF pages, a clean scan, SINGLE column, Set A (EN/BHALI/9/21): 2-22
  // Q1-Q150, 23-24 rough work. Section order as 2022 (Maths 1-50, English
  // 51-75, General Science 76-100, Social Science 101-125, Intelligence
  // 126-150). Exam 07.02.2021. NO KEY found for 2021: two blind passes +
  // a hand check of every dispute and every answer below HIGH (crosstab.ts).
  "aissee-9-2021": {
    id: "aissee-9-2021",
    exam: "aissee-9",
    paper: 1,
    sourceFile: "AISSEE_2021_Class9_SetA.pdf",
    pagesDir: "aissee\\c9_2021_qp_setA",
    pdf: "aissee_c9_2021_qp_setA.pdf",
    pages: range(2, 22),
    docId: "36909bec-a11d-11eb-9e01-02f21f5619c4",
    pyqYear: 2021,
    pyqNote: "AISSEE 2021 Class 9 (7 February 2021, Set A)",
    pattern: AISSEE_9,
  },
  // 31 PDF pages: 1 AglaSem cover, 2-29 Q1-Q150 (booklet "Set X", PA0926/X; no
  // booklet cover in the scan), 30-31 a COACHING institute's answer table (not
  // NTA's: never used). Options carry someone's grey highlighting: ignored.
  // Exam 18.01.2026. NTA final key: digital PDF, page 2 = BOOK X, read from its
  // text layer (two cells accept two options: Q85 1,4 and Q117 1,2).
  "aissee-9-2026": {
    id: "aissee-9-2026",
    exam: "aissee-9",
    paper: 1,
    sourceFile: "AISSEE_2026_Class9_SetX.pdf",
    pagesDir: "aissee\\c9_2026_qp",
    pdf: "aissee_c9_2026_qp.pdf",
    pages: range(2, 29),
    docId: "4c4e225c-859b-11f1-906c-0aa932765c8b",
    pyqYear: 2026,
    pyqNote: "AISSEE 2026 Class 9 (18 January 2026, booklet Set X)",
    pattern: AISSEE_9,
    key: { dir: "_pdf\\aissee_c9_2026_key.pdf", page: 2, code: "X", docId: "3def1a0e-859b-11f1-8c57-0aa932765c8b", final: true },
  },
  // A DIGITAL PDF with a text layer (NTA's own typeset file), 28 pages: 1 cover
  // instructions, 2-26 Q1-Q150, 27-28 rough work. Booklet D (AMAR/ENG). The 2022
  // SECTION ORDER differs from later years: Maths 1-50, English 51-75, General
  // Science 76-100, Social Science 101-125, Intelligence 126-150. Exam
  // 09.01.2022. NTA final key page 2 = Book Code D; its legend (F = 3,4 and
  // J = 2,3,4) is stored as NTA's meaning (Q112 2,3,4; Q116 3,4).
  "aissee-9-2022": {
    id: "aissee-9-2022",
    exam: "aissee-9",
    paper: 1,
    sourceFile: "AISSEE_2022_Class9_CodeD.pdf",
    pagesDir: "aissee\\c9_2022_qp",
    pdf: "aissee_c9_2022_qp.pdf",
    pages: range(2, 26),
    docId: "b62d1b9e-a68c-11ec-9c99-0a5e36bc6706",
    pyqYear: 2022,
    pyqNote: "AISSEE 2022 Class 9 (9 January 2022, booklet D)",
    pattern: AISSEE_9,
    key: { dir: "_pdf\\aissee_c9_2022_key.pdf", page: 2, code: "D", docId: "8e51f9ea-d518-11f1-8d5f-0aa932765c8b", final: true },
  },
  // NTA's own typeset PDF (RAMA/ENG+HIN), 36 pages, SINGLE column. Booklet D.
  // Pages 2-5 are the English Language section (Q1-25); from Mathematics on,
  // each item is printed twice on facing pages, Hindi on the EVEN page and
  // English on the ODD page, so only odd pages 7-33 are used. The 2022 SECTION
  // ORDER differs: Language 1-25, Maths 26-75, General Knowledge 76-100,
  // Intelligence 101-125. Exam 09.01.2022. Key page 10 = Book D, English.
  "aissee-6-2022": {
    id: "aissee-6-2022",
    exam: "aissee-6",
    paper: 1,
    sourceFile: "AISSEE_2022_Class6_BookD.pdf",
    pagesDir: "aissee\\c6_2022_qp",
    pdf: "aissee_c6_2022_qp.pdf",
    pages: [2, 3, 4, 5, ...range(7, 33).filter((n) => n % 2 === 1)],
    docId: "b62aa53a-a68c-11ec-9136-0a5e36bc6706",
    pyqYear: 2022,
    pyqNote: "AISSEE 2022 Class 6 (9 January 2022, booklet D, English)",
    pattern: AISSEE_6,
    key: { dir: "_pdf\\aissee_c6_2022_key.pdf", page: 10, code: "D", docId: "70888410-d518-11f1-8f07-0aa932765c8b", final: true },
  },
  // 26 PDF pages, a scan (no text layer), Set A, SINGLE column, every item
  // printed Hindi then English line by line. Order Maths 1-50, GK 51-75,
  // Language 76-100, Intelligence 101-125. The Language section is printed
  // twice: English on 16, 17 and the top of 18, then the Hindi alternative
  // from the foot of 18 to the top of 21 (left out, as on every other paper).
  // Intelligence starts at the foot of 21 and runs to Q125 on 26. NO KEY found.
  "aissee-6-2020": {
    id: "aissee-6-2020",
    exam: "aissee-6",
    paper: 1,
    sourceFile: "AISSEE_2020_Class6_SetA.pdf",
    pagesDir: "aissee\\c6_2020_qp",
    pdf: "aissee_c6_2020_qp.pdf",
    pages: [...range(2, 18), ...range(21, 26)],
    docId: "15884cba-3543-11eb-8c7c-02f21f5619c4",
    pyqYear: 2020,
    pyqNote: "AISSEE 2020 Class 6 (5 January 2020, Set A)",
    pattern: AISSEE_6,
  },
  // The 2023 and 2025 Class 6 copies on file are HINDI-MEDIUM. Owner
  // (2026-11-17): take Maths, GK and Intelligence, which are printed in
  // English too, and leave the Hindi language section (Q1-25) out.
  // 2023: booklet K (HI/REETA/6/23, "HINDI + ENGLISH"): Hindi version pages
  // 2-17, ENGLISH VERSION pages 18-30 = Q26-125 (Maths 26-75, GK 76-100,
  // Intelligence 101-125), one column; candidate circled options in pen. NTA
  // final key (digital) page 18 = set K: Q35, Q44, Q94 dropped; Q46 all four,
  // Q82 1/2, Q114 3/4 accepted.
  "aissee-6-2023": {
    id: "aissee-6-2023",
    exam: "aissee-6",
    paper: 1,
    sourceFile: "AISSEE_2023_Class6_BookK.pdf",
    pagesDir: "aissee\\c6_2023_qp",
    pdf: "aissee_c6_2023_qp.pdf",
    pages: range(18, 30),
    docId: "a5858b72-a2d6-11ed-8ed8-0a5e36bc6706",
    pyqYear: 2023,
    pyqNote: "AISSEE 2023 Class 6 (8 January 2023, booklet K, English version)",
    pattern: AISSEE_6,
    key: { dir: "_pdf\\aissee_c6_2023_key.pdf", page: 18, code: "K", docId: "09705f0e-02a4-11ee-9ffb-0a5e36bc6706", final: true },
    held: { numbers: range(1, 25), why: "Q1-25 Hindi language section of a Hindi-medium copy, not taken (owner)" },
  },
  // 2025: HINDI booklet code A (APR-6-25), TWO columns, Hindi left and the
  // same item in English right; Hindi language Q1-25 on pages 4-6, Maths from
  // Q26 on page 7, to Q125 on page 31. Transcribe the right (English) column.
  // NTA final key (digital) page 17 = code A (HINDI): Q109 accepts 1 and 3.
  "aissee-6-2025": {
    id: "aissee-6-2025",
    exam: "aissee-6",
    paper: 1,
    sourceFile: "AISSEE_2025_Class6_Hindi_CodeA.pdf",
    pagesDir: "aissee\\c6_2025_qp",
    pdf: "aissee_c6_2025_qp.pdf",
    pages: range(7, 31),
    docId: "44c64aa0-859b-11f1-b1a9-0aa932765c8b",
    pyqYear: 2025,
    pyqNote: "AISSEE 2025 Class 6 (5 April 2025, booklet A, English text)",
    pattern: AISSEE_6,
    key: { dir: "_pdf\\aissee_c6_2025_key.pdf", page: 17, code: "A", docId: "3aee6d32-859b-11f1-ab96-0aa932765c8b", final: true },
    held: { numbers: range(1, 25), why: "Q1-25 Hindi language section of a Hindi-medium copy, not taken (owner)" },
  },

  // ---- RMS CET. Every copy is a candidate's: ticks, highlighter and pen
  // working on the page, so the transcription brief's ignore-marks rule
  // matters. NO KEY is published for any RMS sitting: two blind passes +
  // crosstab, as AISSEE 2020/2021. Options print as (a)-(d) in a 2x2 grid.
  // 38 PDF pages: 1 AglaSem cover, 2-38 the booklet (no cover sheet in this
  // copy), phone photos with yellow highlighter. English p2-9, GK p10-21,
  // Intelligence p22-30, Mathematics p31-38 (Q152 on p31).
  "rms-cet-6-2024": {
    id: "rms-cet-6-2024",
    exam: "rms-cet-6",
    paper: 1,
    sourceFile: "RMS_CET_2024_Class6.pdf",
    pagesDir: "rms\\2024_docA",
    pdf: "rms_2024_docA.pdf",
    pages: range(2, 38),
    docId: "39cbf2ce-cebf-11ef-8b1b-0a5e36bc6706",
    pyqYear: 2024,
    pyqNote: "RMS CET 2024 Class 6",
    pattern: RMS_6,
    // Q145 (complete the hatched circle) turns on the hatching direction in
    // each sector, which this photo is too coarse to show; both blind passes
    // guessed. Held rather than published unanswerable.
    held: { numbers: [145], why: "Q145's hatching is unreadable in the only copy" },
  },
  // 25 PDF pages: 1 AglaSem cover, 2 booklet cover (CET 2023, Class VI, SET-C,
  // 2 h 30 min), 3-25 the questions. Clean phone photos.
  "rms-cet-6-2023": {
    id: "rms-cet-6-2023",
    exam: "rms-cet-6",
    paper: 1,
    sourceFile: "RMS_CET_2023_Class6_SetC.pdf",
    pagesDir: "rms\\2023_docA",
    pdf: "rms_2023_docA.pdf",
    pages: range(3, 25),
    docId: "38291a96-cebf-11ef-b36c-0a5e36bc6706",
    pyqYear: 2023,
    pyqNote: "RMS CET 2023 Class 6 (Set C)",
    pattern: RMS_6,
    // Q116 asks "Who is third to the left of 'D'?" and the booklet prints no
    // arrangement for it, in Hindi or English (checked p15): unanswerable.
    held: { numbers: [116], why: "Q116 is printed without the arrangement it asks about" },
  },
  // 30 PDF pages = booklet pages 2-31 of 32 (Set C), warped phone photos at
  // 771x1029 px, candidate pen strokes over chosen option letters. Questions
  // numbered straight through under grouped directions ("I. ... (5 marks)").
  "rms-cet-6-2022": {
    id: "rms-cet-6-2022",
    exam: "rms-cet-6",
    paper: 1,
    sourceFile: "RMS_CET_2022_Class6_SetC.pdf",
    pagesDir: "rms\\2022_docA",
    pdf: "rms_2022_docA.pdf",
    pages: range(1, 30),
    docId: "ba7ab85c-7f60-11ed-8dde-0a5e36bc6706",
    pyqYear: 2022,
    pyqNote: "RMS CET 2022 Class 6 (Set C)",
    pattern: RMS_6,
    // Q136 (three circles with numbers and letters round them): the labels are
    // too small and blurred to read in this photo, and the options name two
    // missing things where only one '?' shows. Held rather than published.
    held: {
      numbers: [108, 109, 111, 122, 136],
      why: "figures too coarse in the only copy to settle (Q108, Q109, Q111, Q122: embedded figures the two blind solutions split on; Q136: labels unreadable)",
    },
  },
  // 25 PDF pages: 1 AglaSem cover, 2-25 the booklet (clean scan, no cover
  // sheet). Part I: English p2-7, Hindi p8-9, Social Science p10-14;
  // Part II: Mathematics p15-20, Science p21-25.
  "rms-cet-9-2024": {
    id: "rms-cet-9-2024",
    exam: "rms-cet-9",
    paper: 1,
    sourceFile: "RMS_CET_2024_Class9.pdf",
    pagesDir: "rms\\2024_docB",
    pdf: "rms_2024_docB.pdf",
    pages: range(2, 25),
    docId: "3ac1981e-cebf-11ef-b6f8-0a5e36bc6706",
    pyqYear: 2024,
    pyqNote: "RMS CET 2024 Class 9",
    pattern: RMS_9,
    // Printed page 4 (Q10-18) was never scanned: PDF p3 is printed "Page 3",
    // p4 is printed "Page 5" (the viewer JPGs are the same 25 pages). A full
    // copy may sit in shauryabharat.com/?p=39824's embedded viewer (unchecked).
    held: {
      numbers: range(10, 18),
      why: "Q10-18 on printed page 4, missing from the only copy",
    },
  },
  // 22 PDF pages: 1 AglaSem cover, 2 booklet cover (CET 2023, Class IX,
  // SET-A), 3-21 the questions, 22 blank. Faint phone photos at 435x718 px
  // with red ticks: readable, but a tick can sit on an option letter (the
  // 2x2 grid position gives the letter).
  "rms-cet-9-2023": {
    id: "rms-cet-9-2023",
    exam: "rms-cet-9",
    paper: 1,
    sourceFile: "RMS_CET_2023_Class9_SetA.pdf",
    pagesDir: "rms\\2023_docB",
    pdf: "rms_2023_docB.pdf",
    pages: range(3, 21),
    docId: "38eda8ca-cebf-11ef-842c-0a5e36bc6706",
    pyqYear: 2023,
    pyqNote: "RMS CET 2023 Class 9 (Set A)",
    pattern: RMS_9,
  },
  // 23 PDF pages: 1 booklet cover (CET 2022, Class IX, academic session
  // 2023-24; English p2-8, Hindi p8-10, Social Science p11-13, then Part II),
  // 2-23 the questions.
  "rms-cet-9-2022": {
    id: "rms-cet-9-2022",
    exam: "rms-cet-9",
    paper: 1,
    sourceFile: "RMS_CET_2022_Class9.pdf",
    pagesDir: "rms\\2022_docB",
    pdf: "rms_2022_docB.pdf",
    pages: range(2, 23),
    docId: "9fd56fbc-7f90-11ed-9530-0a5e36bc6706",
    pyqYear: 2022,
    pyqNote: "RMS CET 2022 Class 9 (for session 2023-24)",
    pattern: RMS_9,
    // The scan cuts the right edge of some pages. Lost connecting words were
    // restored where the visible text and the options settle them (Q14, Q129,
    // Q131, Q134, Q135). Q103 lost a NUMBER (the third face area): held.
    held: { numbers: [103], why: "Q103's third face area is cut off the scan" },
  },
  // 33 PDF pages: 1 AglaSem cover, 2 booklet cover (code A, EN/HOLAB/6/24,
  // English medium), 3-31 Q1-Q125, 32 rough work, 33 instructions. Language
  // section English in both columns; from Mathematics on, English LEFT and
  // Hindi RIGHT. Exam 28.01.2024. NTA final key (digital) page 10 = code A.
  "aissee-6-2024": {
    id: "aissee-6-2024",
    exam: "aissee-6",
    paper: 1,
    sourceFile: "AISSEE_2024_Class6_CodeA.pdf",
    pagesDir: "aissee\\c6_2024_qp",
    pdf: "aissee_c6_2024_qp.pdf",
    pages: range(3, 31),
    docId: "357aacf0-cb9b-11ef-adce-0a5e36bc6706",
    pyqYear: 2024,
    pyqNote: "AISSEE 2024 Class 6 (28 January 2024, booklet A, English)",
    pattern: AISSEE_6,
    key: { dir: "_pdf\\aissee_c6_2024_key.pdf", page: 10, code: "A", docId: "7bdcb06c-cb9b-11ef-afa7-0a5e36bc6706", final: true },
  },
  // 29 PDF pages: 1 AglaSem cover, 2-29 Q1-Q125 (booklet Q, PA0626/Q, English
  // medium). From the Maths section on, each page prints English in the LEFT
  // column and the same item in Hindi on the right: transcribe English only.
  // A reader circled options in pen: ignored. Exam 18.01.2026. NTA final key
  // (digital) page 10 = BOOK Q (English).
  "aissee-6-2026": {
    id: "aissee-6-2026",
    exam: "aissee-6",
    paper: 1,
    sourceFile: "AISSEE_2026_Class6_BookQ.pdf",
    pagesDir: "aissee\\c6_2026_qp",
    pdf: "aissee_c6_2026_qp.pdf",
    pages: range(2, 29),
    docId: "4a1d7014-859b-11f1-a65e-0aa932765c8b",
    pyqYear: 2026,
    pyqNote: "AISSEE 2026 Class 6 (18 January 2026, booklet Q, English)",
    pattern: AISSEE_6,
    key: { dir: "_pdf\\aissee_c6_2026_key.pdf", page: 10, code: "Q", docId: "3d233a38-859b-11f1-9978-0aa932765c8b", final: true },
  },
  // 33 JPGs: 1 AglaSem cover, 2 booklet cover (code E, EN/VEDTRI/9/24), 3-31
  // Q1-Q150, 32-33 rough work. A clean scan, no serial watermark. Exam
  // 28.01.2024. NTA final key page 1 = code E.
  "aissee-9-2024": {
    id: "aissee-9-2024",
    exam: "aissee-9",
    paper: 1,
    sourceFile: "AISSEE_2024_Class9_CodeE.pdf",
    pagesDir: "aissee\\c9_2024_qp",
    pdf: "aissee_c9_2024_qp.pdf",
    pages: range(3, 31),
    docId: "7a055e60-cb9b-11ef-afa1-0a5e36bc6706",
    pyqYear: 2024,
    pyqNote: "AISSEE 2024 Class 9 (28 January 2024, booklet code E)",
    pattern: AISSEE_9,
    key: { dir: "aissee\\c9_2024_key", page: 1, code: "E", docId: "7bdcc9c6-cb9b-11ef-8ca5-0a5e36bc6706", final: true },
  },
  ...RIMC_PAPERS,
};

export function paperById(id: string | undefined): Paper {
  if (!id || !PAPERS[id]) {
    throw new Error(`unknown paper "${id}". Known: ${Object.keys(PAPERS).join(", ")}`);
  }
  return PAPERS[id];
}

export function requirePaper(id: string | undefined): Paper {
  const p = paperById(id);
  if (p.pages.length === 0) throw new Error(`paper "${id}" has no pages: do the page pre-pass in config.ts first.`);
  return p;
}

export const pattern = (p: Paper) => p.pattern;

export function examOf(p: Paper): ExamDef & { key: ExamKey } {
  return { ...EXAMS[p.exam], key: p.exam };
}

/** The exam id, refusing an unseeded exam (it would write rows with no exam). */
export function examIdOf(p: Paper): string {
  const id = EXAMS[p.exam].examId;
  if (!id) throw new Error(`${EXAMS[p.exam].name} has no examId: run seed-exams.ts --apply and paste it into config.ts`);
  return id;
}

/** subject -> chapter -> subtopic[]. Edited BY HAND; the merge gate validates against it. */
export type Catalog = Record<string, Record<string, string[]>>;

const _catalogs = new Map<ExamKey, Catalog>();
export function catalogFor(exam: ExamKey): Catalog {
  if (!_catalogs.has(exam)) {
    _catalogs.set(exam, JSON.parse(readFileSync(join(__dirname, EXAMS[exam].catalogFile), "utf8")));
  }
  return _catalogs.get(exam)!;
}

export const subjectsOf = (exam: ExamKey): string[] => Object.keys(catalogFor(exam));

/** Rows a paper should end with: its pattern's questions minus any held. */
export const expectedCount = (paper: Paper): number => paper.pattern.questions - (paper.held?.numbers.length ?? 0);

export const dataPath = (id: string, kind: string) => join(DATA, `${id}.${kind}.json`);

export const pagePath = (p: Paper, n: number) => join(SOURCE_ROOT, p.pagesDir, `${String(n).padStart(2, "0")}.jpg`);

export function keyImagePath(p: Paper): string {
  if (!p.key) throw new Error(`paper "${p.id}" has no answer key`);
  return join(SOURCE_ROOT, p.key.dir, `${String(p.key.page).padStart(2, "0")}.jpg`);
}

/** The `pyq_note` on every row. */
export const pyqNoteFor = (p: Paper) => p.pyqNote;

/** Items the key dropped: its `X` entries in data/<id>.key.json. */
export function withdrawnFor(id: string): number[] {
  if (!existsSync(dataPath(id, "key"))) return [];
  const key = JSON.parse(readFileSync(dataPath(id, "key"), "utf8")) as Record<string, string>;
  return Object.entries(key)
    .filter(([n, v]) => /^\d+$/.test(n) && String(v).toUpperCase() === "X")
    .map(([n]) => Number(n))
    .sort((a, b) => a - b);
}
