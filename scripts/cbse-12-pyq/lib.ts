/**
 * Pure core for the CBSE Class-12 Mathematics BOARD PYQ ingestion.
 *
 * DISTINCT FROM scripts/ncert/, and the distinction is the whole point:
 *   scripts/ncert/       → the NCERT TEXTBOOK for this exam, question_kind='practice'.
 *   scripts/cbse-12-pyq/ → CBSE's past board QUESTION PAPERS, question_kind='pyq'.
 * Both write into the SAME exam (`cbse-12`) and the SAME 13 chapters, so a
 * chapter carries its textbook exercises and its board PYQs together and the
 * /browse PYQ/Practice toggle separates them. This is the mh-hsc-12-pyq /
 * mh-ssc-10-text shape. `practiceOnly` comes OFF cbse-12 when the first rows land.
 *
 * Nothing here is defensive-in-general — every rule exists because of something
 * MEASURED off the official ZIPs during the Phase 0/1 analysis (2026-08-18), and
 * each test case in tests/cbse-12-pyq-lib.test.ts is a real string or a real
 * printed instruction, never an invented one.
 */

export type PaperCode = { series: string; set: string };

/**
 * CBSE's own filenames are inconsistent across the five years, so this is
 * deliberately permissive about SEPARATORS and strict about everything else.
 * Observed forms, all real:
 *   2022  "65-1-1 Mathematcs.pdf"            (and yes, the source misspells it)
 *   2023  "65-1-1 MATHEMATICS.pdf"
 *   2024  "65_1_1_Mathematics.pdf" / "65_5_1Mathematics.pdf"  (byte-identical twins)
 *   2025  "65-5-1_Mathematics.pdf"
 *   2026  "2413-1_65-1-1_Mathematics.pdf" / "65-3-1 R.pdf"
 *
 * ⚠ The 2026 "2413-1_" prefix is an internal job number, NOT a paper code. It is
 * stripped before matching — a regex that simply looked for two digits around a
 * hyphen would read 2413-1 as series 4 / set 1 and silently mis-file the paper.
 */
const JOB_PREFIX = /^\d{4}-\d[_\s-]+/;
const CODE = /65[\s_\-(]*([1-9])[\s_\-)]*([1-9])/;

/**
 * Read the paper code from a source filename.
 *
 * Returns null for the 65(B) visually-impaired papers. That is an EXCLUSION, not
 * a parse failure: 65(B) is a separately adapted paper with its own question set
 * (one per year, five in total). If those are ever wanted they need their own
 * decision and their own registry entry, not a looser regex here.
 */
export function parsePaperCode(filename: string): PaperCode | null {
  const base = filename.replace(/^.*[\\/]/, "").replace(JOB_PREFIX, "");
  // 65(B) / 65-B-5 — the VI variants. Checked BEFORE the numeric match so a
  // name like "65-B-5" can never fall through to a digit pairing elsewhere.
  if (/65[\s_\-(]*B/i.test(base)) return null;
  const m = CODE.exec(base);
  return m ? { series: m[1], set: m[2] } : null;
}

/** Render a code the way CBSE prints it on the paper itself: "65/5/1". */
export function paperCodeLabel(code: PaperCode): string {
  return `65/${code.series}/${code.set}`;
}

export type QuestionKindTag = "mcq" | "assertion_reason" | "subjective" | "case_study";
export type SectionInfo = { section: string; marks: number; kind: QuestionKindTag };
type Band = { from: number; to: number } & SectionInfo;

/**
 * The paper's own printed structure, transcribed from the General Instructions.
 *
 * TWO patterns, and they are genuinely different exams rather than a tweak:
 *
 *  full80 — 2023-2026. 38 questions / 80 marks / 3 hours, five sections.
 *           Measured off 65/5/1 (2025), page 3.
 *  term2  — 2022 ONLY. The COVID Term-2 paper: 14 questions / 40 marks /
 *           2 hours, three sections, and NO MCQs anywhere. Measured off
 *           65/1/1 (2022), page 2.
 *
 * The 2022 paper being MCQ-less is not trivia — it means the blind MCQ
 * re-derivation that anchors the other four years cannot run on it at all.
 */
export const PAPER_PATTERNS: Record<string, Band[]> = {
  full80: [
    { from: 1, to: 18, section: "A", marks: 1, kind: "mcq" },
    { from: 19, to: 20, section: "A", marks: 1, kind: "assertion_reason" },
    { from: 21, to: 25, section: "B", marks: 2, kind: "subjective" },
    { from: 26, to: 31, section: "C", marks: 3, kind: "subjective" },
    { from: 32, to: 35, section: "D", marks: 5, kind: "subjective" },
    { from: 36, to: 38, section: "E", marks: 4, kind: "case_study" },
  ],
  term2: [
    { from: 1, to: 6, section: "A", marks: 2, kind: "subjective" },
    { from: 7, to: 10, section: "B", marks: 3, kind: "subjective" },
    { from: 11, to: 13, section: "C", marks: 4, kind: "subjective" },
    // "Q.14 is a case study question with two parts of 2 marks each."
    { from: 14, to: 14, section: "C", marks: 4, kind: "case_study" },
  ],
};

export type PatternName = keyof typeof PAPER_PATTERNS & string;

const YEAR_PATTERN: Record<number, PatternName> = {
  2022: "term2",
  2023: "full80",
  2024: "full80",
  2025: "full80",
  2026: "full80",
};

/**
 * Which structure a year's papers use.
 *
 * THROWS for any year not in the table. A default would assert a structure
 * nobody read off the page — the single failure mode this project has paid for
 * most often (an unmeasured default rendering as a checked claim). If a sixth
 * year is added, open its paper, read its General Instructions, and add it here.
 */
export function patternForYear(year: number): PatternName {
  const p = YEAR_PATTERN[year];
  if (!p) {
    throw new Error(
      `CBSE ${year}: paper pattern not measured. Read that year's printed General Instructions and add it to YEAR_PATTERN — do not assume it matches another year.`
    );
  }
  return p;
}

/** Section, marks and question type for a question number under a given pattern. */
export function sectionForQuestion(q: number, pattern: PatternName): SectionInfo {
  const bands = PAPER_PATTERNS[pattern];
  const band = bands.find((b) => q >= b.from && q <= b.to);
  if (!band) {
    const last = bands[bands.length - 1].to;
    throw new Error(`question ${q} out of range for pattern ${pattern} (paper has 1..${last})`);
  }
  return { section: band.section, marks: band.marks, kind: band.kind };
}

/**
 * Reconstruct the paper's total marks from the section table.
 *
 * Exists as a self-check, not a utility: if the bands ever drift from the
 * printed paper this returns something other than 80 / 40 and the test fails.
 */
export function totalMarks(pattern: PatternName): number {
  return PAPER_PATTERNS[pattern].reduce((sum, b) => sum + (b.to - b.from + 1) * b.marks, 0);
}
