/**
 * UGC NET Paper 1 (General Paper on Teaching and Research Aptitude): which
 * sittings we hold, where each paper and key came from.
 *
 * SOURCES (README "The source"):
 *   paper  NTA's own master question paper for one subject and shift, as a
 *          candidate printed it from NTA's exam system ("Question Paper Name :
 *          08 Commerce 03rd Sep 2024 Shift 1"), re-hosted by AglaSem
 *          (docs.aglasem.com/org/nta/ugc-net/question-paper). Paper 1 is the
 *          first 50 questions; English and Hindi are printed in turn, English first.
 *   key    NTA's FINAL answer key PDF for the cycle (ugcnet.nta.ac.in or
 *          ugcnet.nta.nic.in), which lists question id -> correct option number.
 *
 * Paper 1 is the same for every subject in a shift (checked 2026-11-10:
 * Commerce and Human Rights, 3 Sep 2024 Shift 1, print the same questions
 * under different ids), so ONE subject's paper stands for its shift.
 *
 * Pattern: 50 MCQs, 2 marks each, no negative marking; Paper 1 and Paper 2 are
 * sat together in one 3-hour session.
 */
import { join } from "node:path";

export const EXAM_NAME = "UGC NET";
export const EXAM_SLUG = "ugc-net";
export const SUBJECT = "General Paper";

/** Papers, keys, page images and blind payloads. Nothing here is committed. */
export const SOURCE_ROOT = "C:\\tmp\\PYQPs\\UGCNET";

export type Cycle = {
  /** NTA's name for the cycle. */
  name: string;
  /** The final-key text (pdftotext -layout of NTA's PDF), under SOURCE_ROOT\keys. */
  keyFile: string;
  keyUrl: string;
};

export const CYCLES = {
  "jun-2024": {
    name: "June 2024",
    keyFile: "jun2024.txt",
    keyUrl: "https://ugcnet.nta.ac.in/images/91183668c5ad0679b66b542ceacd97f0893231eac9c21287ecd5b3b10512dd70.pdf",
  },
} as const satisfies Record<string, Cycle>;
export type CycleId = keyof typeof CYCLES;

export type Shift = {
  /** "<date>-<shift>", e.g. "2024-09-03-1". */
  id: string;
  cycle: CycleId;
  date: string;
  shift: 1 | 2;
  /** The subject whose master paper stands for the shift, and its NTA code. */
  subject: string;
  code: number;
  /** File under SOURCE_ROOT\src. */
  file: string;
  /** AglaSem's document id (cdn.aglasem.com/aglasem-doc/<id>/<id>.pdf). */
  aglasem: string;
};

const jun24 = (date: string, shift: 1 | 2, subject: string, code: number, aglasem: string): Shift => ({
  id: `${date}-${shift}`,
  cycle: "jun-2024",
  date,
  shift,
  subject,
  code,
  file: `2024-${subject.toLowerCase().replace(/[^a-z]+/g, "-")}.pdf`,
  aglasem,
});

/**
 * One paper per shift, picked by the paper's OWN header ("Question Paper Name"),
 * never by the key's subject list: NTA's June 2024 key lists some subjects in two
 * shifts. validate.ts checks every id against the key section for this date and
 * shift. 5 Sep 2024 Shift 1 is absent: no paper AglaSem hosts was sat in it.
 */
export const SHIFTS: readonly Shift[] = [
  jun24("2024-08-21", 1, "Electronic Science", 88, "8f1dfb4e-2d94-11f0-8f67-0a5e36bc6706"),
  jun24("2024-08-21", 2, "Spanish", 40, "d5fe5b08-2d94-11f0-b4e2-0a5e36bc6706"),
  jun24("2024-08-22", 1, "Home Science", 12, "945d1a72-2d94-11f0-957a-0a5e36bc6706"),
  jun24("2024-08-22", 2, "Education", 9, "8e49fcfe-2d94-11f0-a908-0a5e36bc6706"),
  jun24("2024-08-23", 1, "Computer Science", 87, "8ac67a9e-2d94-11f0-93d8-0a5e36bc6706"),
  jun24("2024-08-23", 2, "Sociology", 5, "b283b98e-2d94-11f0-b040-0a5e36bc6706"),
  jun24("2024-08-27", 1, "Hindi", 20, "92ae619a-2d94-11f0-9da1-0a5e36bc6706"),
  jun24("2024-08-27", 2, "Odia", 23, "9faea5a8-2d94-11f0-bd42-0a5e36bc6706"),
  jun24("2024-08-28", 1, "Economics", 1, "8df5e556-2d94-11f0-a60f-0a5e36bc6706"),
  jun24("2024-08-28", 2, "Punjabi", 24, "a6bae884-2d94-11f0-841e-0a5e36bc6706"),
  jun24("2024-08-29", 1, "Gujarati", 37, "92641c34-2d94-11f0-9936-0a5e36bc6706"),
  jun24("2024-08-29", 2, "Kannada", 21, "96d943ac-2d94-11f0-ba49-0a5e36bc6706"),
  jun24("2024-08-30", 1, "Psychology", 4, "a4fa44e0-2d94-11f0-9cd9-0a5e36bc6706"),
  jun24("2024-08-30", 2, "Law", 58, "99a065e8-2d94-11f0-9b53-0a5e36bc6706"),
  jun24("2024-09-02", 1, "Malayalam", 22, "9af8bc9c-2d94-11f0-83ee-0a5e36bc6706"),
  jun24("2024-09-02", 2, "Management", 17, "9c1ebbf8-2d94-11f0-a6b3-0a5e36bc6706"),
  jun24("2024-09-03", 1, "Commerce", 8, "890b8a50-2d94-11f0-afd0-0a5e36bc6706"),
  jun24("2024-09-03", 2, "Mass Communication", 63, "9ea4f356-2d94-11f0-bfa7-0a5e36bc6706"),
  jun24("2024-09-04", 1, "Comparative Literature", 72, "89d3b674-2d94-11f0-ae3b-0a5e36bc6706"),
  jun24("2024-09-04", 2, "Yoga", 100, "fa4ee4aa-2d94-11f0-b7e3-0a5e36bc6706"),
];

export function shiftById(id: string): Shift {
  const s = SHIFTS.find((x) => x.id === id);
  if (!s) throw new Error(`no shift "${id}". Shifts: ${SHIFTS.map((x) => x.id).join(", ")}`);
  return s;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** One source file per shift: "UGC NET June 2024, 3 Sep 2024 Shift 1 (NTA)". */
export function sourceFile(s: Shift): string {
  const [y, m, d] = s.date.split("-").map(Number);
  return `UGC NET ${CYCLES[s.cycle].name}, ${d} ${MONTHS[m - 1]} ${y} Shift ${s.shift} (NTA)`;
}

/** The public sitting id in the provenance bracket: short, under publicPyqNote's cap. */
export function pyqNote(s: Shift): string {
  const [, m, d] = s.date.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} Shift ${s.shift}`;
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/** pyq_month is a month NAME everywhere in the bank ("September"): the month the shift was SAT. */
export const pyqMonth = (s: Shift) => MONTH_NAMES[Number(s.date.split("-")[1]) - 1];
export const pyqYear = (s: Shift) => Number(s.date.split("-")[0]);

export const keyPath =(c: CycleId) => join(SOURCE_ROOT, "keys", CYCLES[c].keyFile);
export const srcPath = (s: Shift) => join(SOURCE_ROOT, "src", s.file);
export const dataDir = () => join(process.cwd(), "scripts", "ugc-net", "data");
/** Question images and the manifest pairing each with its NTA id. */
export const renderDir = (shift: string) => join(SOURCE_ROOT, "render", shift);
/** Key-free payloads + derivations. Outside scripts/ so a solver cannot walk into data/. */
export const blindDir = (shift: string) => join(SOURCE_ROOT, "blind", shift);
export const figureDir = (shift: string) => join(SOURCE_ROOT, "figures", shift);

export { ORG_ID, CREATED_BY } from "../practice/config";
