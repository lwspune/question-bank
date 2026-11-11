/**
 * CLAT UG (Common Law Admission Test, Consortium of National Law Universities):
 * which papers we hold and where each came from. The page ranges and section
 * ranges live in years.json, shared with the Python extractor.
 *
 * SOURCE: the Consortium's own notifications, archived by the Wayback Machine
 * (the live site drops a cycle once the next opens). Each year's "Objections to
 * Question Paper and Provisional Answer Key" notification appends the four
 * question-booklet sets; we take Set A. The answer is read from the Consortium's
 * FINAL key for Set A (key.py), never from a coaching copy.
 *
 * Pattern: 120 MCQs since CLAT 2024 (150 for 2022 and 2023), five sections, one
 * mark each, minus 0.25 for a wrong answer, two hours.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const EXAM_NAME = "CLAT";
export const EXAM_SLUG = "clat";

/** PDFs, keys, renders, OCR and blind payloads. Nothing here is committed. */
export const SOURCE_ROOT = "C:\\tmp\\PYQPs\\CLAT";

export type YearCfg = {
  /** ISO date the paper was sat ("CLAT 2026" was sat on 2025-12-07). */
  sat: string;
  pdf: string;
  pages: [number, number];
  keyPdf: string;
  keyPages: [number, number];
  sections: [string, number, number][];
  ocr?: boolean;
};

type YearsFile = { years: Record<string, YearCfg> };

export function years(): Record<string, YearCfg> {
  return (JSON.parse(readFileSync(join(__dirname, "years.json"), "utf8")) as YearsFile).years;
}

export const YEARS = [2022, 2023, 2024, 2025, 2026] as const;
export type ClatYear = (typeof YEARS)[number];

export function yearCfg(year: number): YearCfg {
  const y = years()[String(year)];
  if (!y) throw new Error(`no CLAT ${year} in years.json`);
  return y;
}

/**
 * What each year's final-key NOTIFICATION says changed, in Set A numbering, read
 * by hand from the notice PDF. key.py reads the key TABLE; keyNoticeIssues() checks
 * the table agrees with the notice, so a misread table cannot pass silently.
 */
export const KEY_NOTICES: Record<ClatYear, { withdrawn: string[]; either?: Record<string, string[]>; changed?: Record<string, string>; source: string }> = {
  2022: { withdrawn: [], source: "UG-FINAL-ANSWER-KEY.pdf (no changes listed)" },
  2023: { withdrawn: ["144"], source: "CLAT2023-FinalAnswerKey-Notification.pdf: Quantitative Techniques Q144 withdrawn, out of 149" },
  2024: {
    withdrawn: ["16", "65"],
    changed: { "69": "C" },
    source: "CLAT2024-FinalAnswerKey-Notification.pdf (9 Dec 2023): English Q16 and Legal Q65 withdrawn; Legal Q69 D -> C",
  },
  2025: {
    withdrawn: ["89", "97", "99", "100", "102", "109", "110"],
    either: { "62": ["C", "D"] },
    changed: { "14": "C", "87": "C", "85": "C" },
    source:
      "CLAT-2025-UG-Final-Answer-Key-Notification.pdf (17 May 2025, after the Supreme Court's order of 7 May 2025): five Logical Reasoning and two Quantitative Techniques questions withdrawn, Q14 D -> C, Q62 C or D",
  },
  2026: { withdrawn: ["100"], source: "Provisional key (10 Dec 2025), confirmed unchanged for UG by the final-key notification of 16 Dec 2025" },
};

/** One source file per year: "CLAT 2026 (sat 7 Dec 2025, Set A)". */
export function sourceFile(year: number): string {
  const [y, m, d] = yearCfg(year).sat.split("-").map(Number);
  return `CLAT ${year} (sat ${d} ${MONTHS[m - 1]} ${y}, Set A)`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** The bracket a student sees: the exam's own name for the sitting. */
export const pyqNote = (year: number) => `CLAT ${year}`;
/** pyq_year/pyq_month are when the paper was SAT (CLAT 2026 was sat in December 2025). */
export const pyqYear = (year: number) => Number(yearCfg(year).sat.slice(0, 4));
export const pyqMonth = (year: number) => MONTH_NAMES[Number(yearCfg(year).sat.slice(5, 7)) - 1];

export const keyPath = (year: number) => join(SOURCE_ROOT, "keys", `${year}.json`);
export const dataDir = () => join(__dirname, "data");
/** Key-free payloads + derivations. Outside scripts/ so a solver cannot walk into keys. */
export const blindDir = (year: number) => join(SOURCE_ROOT, "blind", String(year));
export const renderDir = (year: number) => join(SOURCE_ROOT, "render", String(year));

export { ORG_ID, CREATED_BY } from "../practice/config";
