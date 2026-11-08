/**
 * IISER Aptitude Test (IAT) past papers: what IISER publishes, and how far each
 * year's answers can be trusted.
 *
 * SOURCE: iiseradmission.in, "Forms & Certificate" page, "Previous years'
 * question papers" table, plus the "Key" page. Downloaded 2026-11-08 into
 * `SOURCE_ROOT\src`. Only IISER's own PDFs are used (no coaching copies).
 *
 * The pattern (IAT 2026 Information Brochure, section 19): 60 MCQs, 15 each of
 * Biology, Chemistry, Mathematics and Physics, one correct option each,
 * +4 / -1 / 0, 180 minutes, maximum 240.
 *
 * ── TWO KINDS OF FILE ────────────────────────────────────────────────────────
 * 2017-2022: the question paper as candidates saw it, options in their real
 *   printed order, NO KEY anywhere. Answers are solved twice independently
 *   and every disagreement is read by a person.
 * 2025, 2026: IISER's FINAL answer key. Every question is printed with the
 *   correct answer as option (a); the 2026 file says so in a header ("option
 *   (a) is the correct answer"). So the key is the printed order itself, and
 *   lib.ts puts the options in a fixed, seeded order before anyone sees them.
 * 2023, 2024: published as "question papers", but in the SAME layout as the
 *   key files, and every question checked so far has (a) correct. Treated as
 *   key-ordered but NOT confirmed: the blind solve measures it, and
 *   `keyConfirmed` is set only once that rate is in (README).
 *
 * 2018 is a scan with no text layer. There is no 2020 paper on the site.
 */
import { join } from "node:path";

export const EXAM_NAME = "IISER IAT";
export const EXAM_SLUG = "iiser-iat";
/** One source file per year, all four subjects in it. */
export const sourceFile = (year: number) => `IAT ${year} (IISER)`;
/** The public provenance bracket. */
export const PYQ_NOTE = "IISER";
/** Stamped on every row of a no-key year. */
export const DERIVED_MODEL = "claude-opus-5-5 · two blind passes (IISER published no key for this year)";
export const SUBJECTS = ["Biology", "Chemistry", "Mathematics", "Physics"] as const;
export type IatSubject = (typeof SUBJECTS)[number];

/** Source PDFs, page renders, figure crops and blind payloads. Nothing here is committed. */
export const SOURCE_ROOT = "C:\\tmp\\PYQPs\\IAT";

export type IatYear = {
  year: number;
  /** File name under SOURCE_ROOT\src. */
  file: string;
  /** "first-option": printed (a) is IISER's answer. "none": no key exists. */
  keyMode: "first-option" | "none";
  /** A first-option year commits only once this is true. */
  keyConfirmed: boolean;
  note: string;
};

export const IAT_YEARS: readonly IatYear[] = [
  { year: 2017, file: "2017_Eng_IAT.pdf", keyMode: "none", keyConfirmed: false, note: "question paper, no key" },
  { year: 2018, file: "2018_Eng_IAT.pdf", keyMode: "none", keyConfirmed: false, note: "scanned question paper, no text layer, no key" },
  { year: 2019, file: "2019_Eng_IAT.pdf", keyMode: "none", keyConfirmed: false, note: "question paper, no key" },
  { year: 2021, file: "2021_Eng_IAT.pdf", keyMode: "none", keyConfirmed: false, note: "question paper, no key" },
  { year: 2022, file: "2022-eng-IAT.pdf", keyMode: "none", keyConfirmed: false, note: "question paper, no key" },
  { year: 2023, file: "2023-eng-IAT.pdf", keyMode: "first-option", keyConfirmed: false, note: "key-file layout; (a)-is-correct to be measured" },
  { year: 2024, file: "2024_Eng_IAT.pdf", keyMode: "first-option", keyConfirmed: false, note: "key-file layout; (a)-is-correct to be measured" },
  { year: 2025, file: "English-Key_IAT-2025.pdf", keyMode: "first-option", keyConfirmed: true, note: "IISER final answer key 2025" },
  { year: 2026, file: "English_Key_IAT 2026_final.pdf", keyMode: "first-option", keyConfirmed: true, note: "IISER final answer key 2026; header states option (a) is correct" },
];

export function iatYear(year: number): IatYear {
  const found = IAT_YEARS.find((y) => y.year === year);
  if (!found) {
    throw new Error(`IAT ${year}: IISER posts no paper for that year. Years: ${IAT_YEARS.map((y) => y.year).join(", ")}.`);
  }
  return found;
}

/** `<year> <subject>` from argv. */
export function parsePaperArgs(argv: readonly string[], usage: string) {
  const [yearArg, subject] = argv.filter((a) => !a.startsWith("--"));
  if (!yearArg || !subject) throw new Error(`usage: ${usage}   e.g. 2025 Biology`);
  const year = iatYear(Number(yearArg));
  if (!(SUBJECTS as readonly string[]).includes(subject)) {
    throw new Error(`no subject "${subject}". Subjects: ${SUBJECTS.join(", ")}.`);
  }
  return { year, subject: subject as IatSubject, stem: `${year.year}-${subject}` };
}

export const dataDir = () => join(process.cwd(), "scripts", "iat", "data");
/** Key-free payloads + derivations. Outside scripts/ so a solver cannot walk into data/. */
export const blindDir = (stem: string) => join(SOURCE_ROOT, "blind", stem);
/** `<stem>\<ref>.png` for a stem figure, `<stem>\<ref>-opt<N>.png` for printed option N. */
export const figureDir = (stem: string) => join(SOURCE_ROOT, "figures", stem);
export const renderDir = (year: number) => join(SOURCE_ROOT, "render", String(year));

export { ORG_ID, CREATED_BY } from "../practice/config";
