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
 * The three subjects this pipeline serves, and their CBSE paper-code prefixes.
 *
 *   maths     041 → papers printed "65/s/n"
 *   physics   042 → papers printed "55/s/n"
 *   chemistry 043 → papers printed "56/s/n"
 *
 * ⚠ 55, 56 and 65 are the SAME THREE DIGITS rearranged, and every Chemistry
 * filename also carries the subject code 043. That makes cross-subject
 * mis-parsing the sharpest hazard here: a Chemistry paper filed into the
 * Physics corpus produces no error anywhere downstream. Hence the prefix is a
 * REQUIRED argument everywhere it is needed rather than a module-level
 * constant — the NCERT Class-11 technique, where deleting the ambient EXAM_ID
 * made the typechecker enumerate all 12 call sites instead of leaving silent
 * defaults behind.
 */
export type SubjectKey = "maths" | "physics" | "chemistry";

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

/**
 * A prefix is two digits and nothing else. Guarded because it is interpolated
 * into a RegExp: a typo that slipped a metacharacter through would silently
 * change what matches rather than failing.
 */
function assertPrefix(prefix: string): void {
  // Two digits for a paper prefix (65/55/56), three for a CBSE subject code
  // (041/042/043) — Physics 2026 keys its marking schemes on the latter.
  if (!/^\d{2,3}$/.test(prefix)) {
    throw new Error(`paper-code anchor must be 2-3 digits, got ${JSON.stringify(prefix)}`);
  }
}

const codeRe = (prefix: string) => new RegExp(`${prefix}[\\s_\\-(]*([1-9])[\\s_\\-)]*([1-9])`);
// The visually-impaired marker, in every spelling the four archives use:
//   55(B)_Physics …      Physics 2026 question paper
//   Marking Scheme 55-B  Physics 2023 marking scheme
//   …MS_56_B.pdf         Chemistry 2025
//   …MS_56_Blind.pdf     Chemistry 2022  (spelled out)
const viRe = (prefix: string) => new RegExp(`${prefix}[\\s_\\-(]*B`, "i");

/**
 * Read the paper code from a source filename.
 *
 * Returns null for the 65(B) visually-impaired papers. That is an EXCLUSION, not
 * a parse failure: 65(B) is a separately adapted paper with its own question set
 * (one per year, five in total). If those are ever wanted they need their own
 * decision and their own registry entry, not a looser regex here.
 */
/**
 * Read the paper code from a source filename.
 *
 * `anchors` is the paper-code prefix ("55"), optionally followed by fallbacks
 * tried in order. Physics 2026 needs one: its marking schemes abandon the paper
 * code entirely and are named "XII-2-042-1-1.pdf" off the SUBJECT code, so with
 * only the "55" anchor all 15 of that year's keys are unreadable — and since
 * the official key is the whole reason this ingest can run a cross-check gate,
 * that is the most expensive thing that can go quietly wrong here.
 *
 * Order matters: the real paper code wins where a name carries both (2025 names
 * carry 042 AND 55).
 */
export function parsePaperCode(filename: string, anchors: string | string[]): PaperCode | null {
  const list = typeof anchors === "string" ? [anchors] : anchors;
  for (const a of list) assertPrefix(a);
  const base = filename.replace(/^.*[\\/]/, "").replace(JOB_PREFIX, "");
  // 65(B) / 55-B / 56_Blind / 042-B — the VI variants. Checked across EVERY
  // anchor BEFORE any numeric match, so a name like "65-B-5" can never fall
  // through to a digit pairing elsewhere.
  for (const a of list) if (viRe(a).test(base)) return null;
  for (const a of list) {
    const m = codeRe(a).exec(base);
    if (m) return { series: m[1], set: m[2] };
  }
  return null;
}

/** Render a code the way CBSE prints it on the paper itself: "65/5/1", "55/1/1". */
export function paperCodeLabel(code: PaperCode, prefix: string): string {
  assertPrefix(prefix);
  return `${prefix}/${code.series}/${code.set}`;
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

  /**
   * full70 — PHYSICS *and* CHEMISTRY, 2024 and 2026. Measured off the printed
   * General Instructions of 2026 55/1/1, 2024 55/1/1, 2024 56/1/1 and 2026
   * 56/1/1, all four of which agree exactly: 33 questions / 70 marks / 3 hours,
   * five sections, assertion-reason at Q13-16.
   *
   * ⚠ NOT a rescaled full80, and the difference is not cosmetic:
   *   • assertion-reason sits at Q13-16, where Maths puts it at Q19-20
   *     ("For question number 13 to 16, two statements are given – one
   *      labelled as Assertion (A) and the other labelled as Reason (R)");
   *   • the CASE STUDIES are Section D at 4 marks, where Maths has them last
   *     in Section E — so Section E here is the 5-mark long answers.
   * Copying Maths' bands would mis-section 20 of the 33 questions while
   * still summing to a plausible total.
   *
   * 12 + 4 + 10 + 21 + 8 + 15 = 70, reconciled by totalMarks().
   */
  full70: [
    { from: 1, to: 12, section: "A", marks: 1, kind: "mcq" },
    { from: 13, to: 16, section: "A", marks: 1, kind: "assertion_reason" },
    { from: 17, to: 21, section: "B", marks: 2, kind: "subjective" },
    { from: 22, to: 28, section: "C", marks: 3, kind: "subjective" },
    { from: 29, to: 30, section: "D", marks: 4, kind: "case_study" },
    { from: 31, to: 33, section: "E", marks: 5, kind: "subjective" },
  ],

  /**
   * 2023 is a THIRTY-FIVE question paper in both sciences — a different exam
   * from 2024/2026, not a variant. And the two subjects' 2023 papers are not
   * the same as each other either.
   *
   * full70_phy_2023 — measured off 2023 55/1/1:
   *   "This question paper contains 35 questions."
   *   "Questions number 16 to 18 are Assertion (A) and Reason (R) type"
   *   Section D = Q31-33 LONG ANSWER (5); Section E = Q34-35 case-based (4).
   * 18 + 14 + 15 + 15 + 8 = 70.
   */
  full70_phy_2023: [
    { from: 1, to: 15, section: "A", marks: 1, kind: "mcq" },
    { from: 16, to: 18, section: "A", marks: 1, kind: "assertion_reason" },
    { from: 19, to: 25, section: "B", marks: 2, kind: "subjective" },
    { from: 26, to: 30, section: "C", marks: 3, kind: "subjective" },
    { from: 31, to: 33, section: "D", marks: 5, kind: "subjective" },
    { from: 34, to: 35, section: "E", marks: 4, kind: "case_study" },
  ],

  /**
   * full70_chem_2023 — measured off 2023 56/1/1.
   *
   * ⚠ Sections D and E are SWAPPED relative to Physics 2023, and the
   * assertion-reason band starts a question earlier:
   *   "For Questions number 15 to 18, two statements are given"
   *   Section D = Q31-32 CASE-BASED (4); Section E = Q33-35 long answer (5).
   * Both papers total 70, so a totals check cannot catch the confusion —
   * reusing the Physics table here would silently mark Q31-32 at 5 instead of
   * 4, Q33 at 4 instead of 5, and mis-type five questions.
   * 18 + 14 + 15 + 8 + 15 = 70.
   */
  full70_chem_2023: [
    { from: 1, to: 14, section: "A", marks: 1, kind: "mcq" },
    { from: 15, to: 18, section: "A", marks: 1, kind: "assertion_reason" },
    { from: 19, to: 25, section: "B", marks: 2, kind: "subjective" },
    { from: 26, to: 30, section: "C", marks: 3, kind: "subjective" },
    { from: 31, to: 32, section: "D", marks: 4, kind: "case_study" },
    { from: 33, to: 35, section: "E", marks: 5, kind: "subjective" },
  ],

  /**
   * term2_sci — the 2022 COVID Term-II paper, shared by Physics and Chemistry.
   *
   * Measured by VISION (both years' papers are pure scans) from 2022 55/1/1 and
   * 56/1/1, whose printed instructions agree with each other exactly:
   *   12 questions / THREE sections / 35 marks
   * Corroborated independently by the marking scheme, which instructs
   * "A full scale of marks 0-35 has to be used".
   *
   * ⚠ NOT Maths' `term2`, which is 14 questions and 40 marks. Same COVID year,
   * same "Term-II" name, different paper.
   *
   * Like Maths' Term-II it contains NO MCQs at all, so the blind MCQ
   * re-derivation that anchors the other four years cannot run on 2022.
   * 6 + 24 + 5 = 35.
   */
  term2_sci: [
    { from: 1, to: 3, section: "A", marks: 2, kind: "subjective" },
    { from: 4, to: 11, section: "B", marks: 3, kind: "subjective" },
    // "Section C - question number 12 is a case study based question,
    //  this question carries 5 marks."
    { from: 12, to: 12, section: "C", marks: 5, kind: "case_study" },
  ],
};

export type PatternName = keyof typeof PAPER_PATTERNS & string;

/**
 * Which structure a (subject, year) uses — keyed by BOTH, because the subjects
 * genuinely disagree. Maths 2023-2026 is 38 questions / 80 marks; Physics is 33
 * / 70 with different band boundaries. An entry appears here ONLY after that
 * paper's own printed General Instructions have been read.
 *
 * Entries not yet measured are deliberately ABSENT rather than guessed, so
 * patternForYear throws loudly instead of asserting a structure nobody checked.
 */
const YEAR_PATTERN: Record<SubjectKey, Record<number, PatternName>> = {
  maths: {
    2022: "term2",
    2023: "full80",
    2024: "full80",
    2025: "full80",
    2026: "full80",
  },
  // All entries below were read off each paper's own printed General
  // Instructions on 2026-09-10, one paper per subject-year — the 2023/2024/2026
  // papers from their text layer, the 2022 and 2025 papers by VISION, those
  // being pure scans with a zero-character text layer.
  //
  // The table is dense because the papers really do differ: CBSE changed the
  // exam twice in this window (35 questions in 2023, 33 from 2024), the two
  // sciences did NOT change it the same way in 2023, and 2022 is a different
  // exam again. Anything CBSE adds next must be read, not inherited.
  physics: {
    2022: "term2_sci",
    2023: "full70_phy_2023",
    2024: "full70",
    2025: "full70",
    2026: "full70",
  },
  chemistry: {
    2022: "term2_sci",
    2023: "full70_chem_2023",
    2024: "full70",
    2025: "full70",
    2026: "full70",
  },
};

/**
 * Which structure a subject-year's papers use.
 *
 * THROWS for any pair not in the table. A default would assert a structure
 * nobody read off the page — the single failure mode this project has paid for
 * most often (an unmeasured default rendering as a checked claim). To add one,
 * open that paper, read its General Instructions, and record it above.
 */
export function patternForYear(subject: SubjectKey, year: number): PatternName {
  const p = YEAR_PATTERN[subject]?.[year];
  if (!p) {
    throw new Error(
      `CBSE ${subject} ${year}: paper pattern not measured. Read that paper's printed General Instructions and add it to YEAR_PATTERN — do not assume it matches another year or another subject.`
    );
  }
  return p;
}

/** Whether a subject-year's structure has been measured — for inventory, which must not throw. */
export function hasPattern(subject: SubjectKey, year: number): boolean {
  return Boolean(YEAR_PATTERN[subject]?.[year]);
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

// ─── the official Section-A answer key ───────────────────────────────────────

/** One Section-A entry from CBSE's own marking scheme. */
export type KeyEntry = {
  q: number;
  /**
   * The option CBSE printed — or NULL where it printed none because no option
   * is correct. Null is a FINDING ("CBSE voided this question outright") and is
   * deliberately distinct from a field nobody filled in; downstream this becomes
   * the transcriber's `_noCorrectOption`.
   */
  answer: "A" | "B" | "C" | "D" | null;
  /** Whatever CBSE printed after the letter — often the answer's value. */
  valueText?: string;
  /** Set when CBSE itself voided the question and awarded marks to all. */
  graceNote?: string;
};

const SECTION_A_START = /SECTION\s*[-–—:]?\s*A\b/i;
const SECTION_B_START = /SECTION\s*[-–—:]?\s*B\b/i;
/** CBSE's own wording when it voids a question — real, from Chemistry 2023. */
const GRACE = /(full\s*mark|printing\s*error|award\s*full|any\s*option|bonus)/i;

/**
 * CBSE voiding a question by declaring that NONE of the options is right — so
 * it prints a note and NO letter at all.
 *
 * Measured on Physics 2023/2024, three wordings:
 *   "Since no option is correct award 1 mark even if student does not attempt."
 *   "No option is correct, award 1 mark."
 *   "No option is correct. [Award one mark to each student]"
 *
 * This is a SIXTH void class beyond the five catalogued on Chemistry, and the
 * only one that prints no letter — which is why the parser used to skip the row
 * and fail the whole paper on the resulting gap.
 */
const NO_CORRECT_OPTION = /\b(?:no|none)\b[^.\n]{0,40}?\b(?:is|are)\s+correct/i;

/**
 * ⚠ A void scoped to ONE MEDIUM — refuse rather than guess.
 *
 * CBSE sometimes voids a question for Hindi candidates only, or for English
 * candidates only, and the two look alike while meaning OPPOSITE things:
 *   • "In Hindi version none of the answer is correct" → the ENGLISH key stands,
 *     and voiding the English row would throw away a perfectly good question;
 *   • 2023 55/4/1 Q11 prints a letter "for students who have opted to answer the
 *     question in Hindi medium only", then awards ENGLISH students full marks
 *     for a misprint → the printed letter is the HINDI answer, and keying it
 *     would assert an answer CBSE explicitly voided for this paper's readers.
 *
 * Nothing in the extracted text reliably says which direction applies, so this
 * fails closed and sends the paper to a human. Both other options — keying the
 * letter, or voiding the row — are silently wrong half the time.
 */
const MEDIUM_SCOPED = /(hindi|english)\s*(medium|version)/i;

/**
 * Read the official Section-A MCQ key out of a marking scheme's text layer.
 *
 * This is the strongest evidence class this bank has ever had for MCQs: an
 * official, per-paper key that needs no vision and no derivation. The precise
 * and useful bound, measured: the corruption in these PDFs hits SYMBOLS, so the
 * option LETTER survives intact while the answer's value text does not
 * ("8 μF" extracts as "8 F"). Trust the letter; treat valueText as advisory.
 *
 * ⚠ It does NOT work on every paper. Some marking schemes' two-column layout
 * collapses in extraction and yields plausible-looking pairs in the wrong
 * order. So this REFUSES a block whose numbers are not strictly ascending from
 * 1 rather than returning a short or scrambled list — a partial key that reads
 * as a complete one is worse than no key, because nothing downstream would
 * question it. Callers fall back to reading the page.
 *
 * Bounded to the Section A ... Section B window on purpose: Section E prints
 * "31 (a)" for its sub-parts, and a whole-document sweep reads those as MCQ
 * answers for questions that are not MCQs at all.
 */
export function parseSectionAKey(text: string, expected?: number): KeyEntry[] {
  // Find the Section-A header, SKIPPING any table-of-contents entry. Physics
  // 2026's marking scheme opens with a contents page whose "SECTION-A ..... 4"
  // line matches first; anchoring there finds nothing but dot leaders and the
  // paper reads as keyless when it is not. A TOC line is identified by its
  // leader dots, which no real section header carries.
  let a: RegExpExecArray | null = null;
  const finder = new RegExp(SECTION_A_START.source, "gi");
  for (let m = finder.exec(text); m; m = finder.exec(text)) {
    if (/\.{5,}/.test(text.slice(m.index, m.index + 120))) continue; // contents line
    a = m;
    break;
  }
  if (!a) return [];
  const rest = text.slice(a.index + a[0].length);
  const b = SECTION_B_START.exec(rest);
  const block = b ? rest.slice(0, b.index) : rest;

  // SEGMENT, then classify — rather than one regex demanding number-then-letter.
  //
  // The old single-pass regex could only see an entry that HAS a letter, so
  // CBSE's keyless void ("No option is correct, award 1 mark.") was skipped
  // silently, the 1..N run broke on the gap, and the whole paper was refused as
  // a collapsed layout. Measured: that is the single commonest reason a Physics
  // marking scheme "needs vision".
  //
  // A bare number line is NOT sufficient evidence of an entry — the marking
  // scheme's marks columns are lines reading just "1". So a candidate is only
  // promoted to an entry when the text BEFORE the next candidate carries either
  // an option letter or a void note. That is what keeps the marks columns out.
  const CANDIDATE = /(?:^|\n)[ \t]*Q?[ \t]*(\d{1,2})[ \t]*[.)]?[ \t]*/g;
  // "(A)" and, because CBSE typos it, "A)". The CLOSING paren stays REQUIRED:
  // without it "Award one mark" reads as answer "A".
  const LETTER = /^\s*\(?[ \t]*([A-Da-d])[ \t]*\)([^\n]*)/;

  const cands: { q: number; from: number; to: number }[] = [];
  for (let m = CANDIDATE.exec(block); m; m = CANDIDATE.exec(block)) {
    cands.push({ q: Number(m[1]), from: m.index + m[0].length, to: block.length });
  }
  for (let i = 0; i < cands.length - 1; i++) {
    // A candidate's window ends where the next one begins, so a void note can
    // never be attributed to the marks column printed just above it.
    cands[i].to = block.indexOf("\n", cands[i].from) === -1 ? cands[i + 1].from : cands[i + 1].from;
  }

  const all: KeyEntry[] = [];
  for (const c of cands) {
    const win = block.slice(c.from, c.to);
    const lm = LETTER.exec(win);
    const voided = NO_CORRECT_OPTION.test(win);
    if (!lm && !voided) continue; // a marks column, or unrelated prose

    // ⚠ Refuse a medium-scoped award BEFORE reading anything off it. Whether
    // the printed letter belongs to this paper's readers or to the Hindi
    // edition is not decidable from the text, and both wrong answers are silent.
    // Deliberately NOT gated behind a grace/void phrase as well. Measured across
    // all 78 Physics and 78 Chemistry marking schemes, MEDIUM_SCOPED fires on
    // exactly the genuine cases and nothing else — an ordinary answer's value
    // text does not say "Hindi medium" or "English version". Requiring a second
    // signal missed "In Hindi version none of the answer is correct", which
    // carries neither the word "award" nor any GRACE phrase.
    if (MEDIUM_SCOPED.test(win)) {
      throw new Error(
        `Section-A Q${c.q} carries a MEDIUM-SPECIFIC award ("Hindi medium only" / ` +
          `"English version"), so the printed letter may belong to the other edition. ` +
          `Refusing to key it — read the marking scheme page and adjudicate by hand.`
      );
    }

    if (lm) {
      const valueText = lm[2].trim();
      const e: KeyEntry = { q: c.q, answer: lm[1].toUpperCase() as KeyEntry["answer"] };
      if (valueText) e.valueText = valueText;
      if (valueText && GRACE.test(valueText)) e.graceNote = valueText;
      all.push(e);
    } else {
      // Keyless void: CBSE printed a note and no letter, because no option is
      // right. `answer: null` is the finding, and becomes `_noCorrectOption`.
      all.push({ q: c.q, answer: null, graceNote: win.replace(/\s+/g, " ").trim() });
    }
  }

  // The paper's measured pattern already says how many Section-A questions
  // exist, and that is a second bound worth using: in several real marking
  // schemes the "SECTION B" header does not survive extraction, so the scan
  // runs on into Section E's "31 (a)" sub-parts. Truncating to the expected
  // count recovers those papers WITHOUT weakening the ascending check below,
  // which still runs on the truncated run.
  if (expected !== undefined && all.length > expected) all.length = expected;

  // Fail closed on anything that is not a clean 1..N run. A scrambled
  // extraction is the expected failure here, not a rare one.
  all.forEach((e, i) => {
    if (e.q !== i + 1) {
      throw new Error(
        `Section-A key is not ascending from 1: read [${all.map((x) => x.q).join(",")}]. ` +
          `The marking scheme's layout has probably collapsed in extraction — read the page instead ` +
          `of trusting a partial key.`
      );
    }
  });

  if (expected !== undefined && all.length !== expected) {
    throw new Error(
      `Section-A key is short: read ${all.length} of ${expected} expected answers. Refusing rather ` +
        `than returning a partial key, which downstream would read as complete.`
    );
  }
  return all;
}

// ─── merged marking schemes ──────────────────────────────────────────────────

/** One page of a marking-scheme PDF, reduced to the two signals that matter. */
export type MergedMsPage = {
  index: number; // 0-based page index in the file
  codes: string[]; // paper codes printed anywhere on the page, e.g. ["55/1/1"]
  firstLine: string; // the page's first non-empty line — CBSE prints its own page number there
};

/**
 * A contiguous run of pages belonging to one paper. `to` is INCLUSIVE.
 *
 * `shortBy` is set when the block's own running header states more pages than
 * the file contains — i.e. CBSE's merged PDF has LOST pages off the end of that
 * marking scheme. Real: 2024 Physics "55-4 -1,2,3 English Version.pdf" is
 * missing the last page of both 55/4/2 and 55/4/3.
 */
export type MsBlock = { code: string; from: number; to: number; shortBy?: number };

/**
 * Split a marking-scheme PDF into one block per paper.
 *
 * ⚠ Physics 2023 ships ALL FIVE series as merged 3-in-1 files
 * ("Marking scheme 55-1-1,2,3 meged.pdf", sic). Without this split, 10 of that
 * year's 15 papers appear to have NO marking scheme — and since the official
 * key is the whole reason this ingest can run a cross-check gate, losing it
 * silently would be the most expensive failure available here.
 *
 * A block start requires TWO signals that must AGREE:
 *   1. the page carries a paper code, and
 *   2. the file's own internal page number has reset to "1".
 * Either alone is wrong. CBSE reprints the code on the block's third page too
 * (measured), so signal 1 alone cuts a 3-paper file into six; and an ordinary
 * mid-block page has neither. Requiring both was verified against the two real
 * merged files, which split at 0/22/44 and 0/22/45 — note the second is UNEVEN,
 * so a fixed page stride would have been wrong.
 *
 * FAILS CLOSED: the blocks found must match the codes the filename advertises.
 * A file that yields two blocks where the name says three has silently lost a
 * paper, and returning the two would hide it.
 */
/**
 * The internal page number CBSE prints at the top of each marking-scheme page.
 *
 * FOUR conventions, all real — measured 2026-09-10 across the 15 merged Physics
 * files, and each found only by opening a file that had failed to split:
 *   bare        "1", "2", "3"                          2023 series 1 and 3
 *   whole line  "Page 1 of 19"                         2023 series 4-5, 2025
 *   embedded    "042_55/1/1_Physics # Page-1"          2022  (code + number)
 *   embedded    "55/1/1            Page 1 of 24"       2024  (code + number)
 *
 * Handling only the first form left 12 of the 15 unsplittable — i.e. most of
 * the subject's official keys silently unpaired. The two embedded forms are why
 * this SEARCHES the line rather than matching it whole: the paper code and the
 * page number share one running header.
 *
 * The "of M" forms are the strongest, because they also state the block LENGTH,
 * which splitMergedMs uses as a third cross-check.
 */
export function parseInternalPage(firstLine: string): { page: number; of?: number } | null {
  const s = firstLine.trim();
  if (!s) return null;
  const bare = /^(\d{1,3})$/.exec(s);
  if (bare) return { page: Number(bare[1]) };
  // "Page 1 of 24" | "Page-1" | "Page 11" — anywhere in the line.
  const m = /Page\s*[-–—]?\s*(\d{1,3})(?:\s+of\s+(\d{1,3}))?/i.exec(s);
  if (m) return m[2] ? { page: Number(m[1]), of: Number(m[2]) } : { page: Number(m[1]) };
  return null;
}

/**
 * Every paper code a marking-scheme FILENAME advertises.
 *
 * CBSE states how many papers a merged file carries in the name itself, in four
 * different ways across the five years — all measured:
 *   2023/2025  "Marking scheme 55-1-1,2,3 meged.pdf"      comma list (sic)
 *   2022       "XII_042_MS__55_1-(1 & 2 & 3).pdf"          ampersand list
 *   2024       "55-2-1,2.3  English Version.pdf"           comma list with a TYPO
 *   2024       "55-4 -1,2,3 English Version.pdf"           stray space after the series
 * This count is what splitMergedMs is checked against, so a form we cannot read
 * means a paper silently loses its key. Returns one code for an ordinary name,
 * and nothing for a VI paper.
 */
export function codesInMsFilename(path: string, anchors: string | string[]): string[] {
  const list = typeof anchors === "string" ? [anchors] : anchors;
  // ⚠ A code is always LABELLED with the paper prefix — list[0] — whatever
  // anchor happened to find it. Physics 2026's "XII-2-042-1-1.pdf" is located
  // via the subject code and IS paper 55/1/1; labelling it "042/1/1" would key
  // the marking scheme differently from its own question paper, and all 15 of
  // that year's official keys would read as missing while sitting on disk.
  const label = list[0];
  const base = path.replace(/^.*[\\/]/, "");
  for (const a of list) if (viRe(a).test(base)) return [];

  for (const a of list) {
    // series, then two or more set digits separated by , . or & (any spacing).
    const m = new RegExp(`${a}[\\s_\\-]*([1-9])[\\s_\\-]*\\(?\\s*([1-9](?:\\s*[,.&]\\s*[1-9])+)`).exec(base);
    if (m) {
      const sets = m[2]
        .split(/[,.&]/)
        .map((x) => x.trim())
        .filter(Boolean);
      return sets.map((set) => `${label}/${m[1]}/${set}`);
    }
  }
  const c = parsePaperCode(base, list);
  return c ? [`${label}/${c.series}/${c.set}`] : [];
}

export function splitMergedMs(pages: MergedMsPage[], expectedCodes: string[]): MsBlock[] {
  const starts = pages.filter((p) => {
    if (p.codes.length === 0) return false;
    const n = parseInternalPage(p.firstLine);
    return n !== null && n.page === 1;
  });

  if (starts.length === 0) {
    throw new Error(
      `no block start found: no page carries both a paper code and an internal page number of 1. ` +
        `Expected ${expectedCodes.length} paper(s): ${expectedCodes.join(", ")}.`
    );
  }
  if (starts.length !== expectedCodes.length) {
    throw new Error(
      `merged marking scheme: expected ${expectedCodes.length} paper(s) (${expectedCodes.join(", ")}) ` +
        `but detected ${starts.length} block start(s) at page(s) ${starts.map((s) => s.index).join(", ")}. ` +
        `Refusing rather than dropping a paper's marking scheme silently.`
    );
  }

  const lastIndex = pages[pages.length - 1].index;
  const blocks: MsBlock[] = starts.map((s, i) => ({
    // The code printed on the page is the authority; the filename only says how
    // MANY papers to expect, and CBSE's merged names are typo-prone.
    code: s.codes[0],
    from: s.index,
    to: i + 1 < starts.length ? starts[i + 1].index - 1 : lastIndex,
  }));

  // THIRD signal, where the file offers it: "Page 1 of 19" asserts a 19-page
  // block. The two ways it can disagree mean OPPOSITE things, so they are
  // handled oppositely rather than lumped into one "mismatch".
  starts.forEach((s, i) => {
    const b = blocks[i];
    const pageNums = pages
      .filter((p) => p.index >= b.from && p.index <= b.to)
      .map((p) => parseInternalPage(p.firstLine)?.page)
      .filter((n): n is number => n !== undefined);

    // The numbers must run 1,2,3,… A gap in the MIDDLE is not a lost tail, and
    // treating it as one would hand on a block quietly missing an interior page.
    const contiguous = pageNums.every((n, k) => n === k + 1);
    if (pageNums.length === b.to - b.from + 1 && !contiguous) {
      throw new Error(
        `merged marking scheme: block ${b.code} (pages ${b.from}-${b.to}) has internal page numbers ` +
          `${pageNums.join(",")} — not contiguous from 1, so a page is missing from the MIDDLE. Refusing.`
      );
    }

    const stated = parseInternalPage(s.firstLine)?.of;
    if (stated === undefined) return;
    const actual = b.to - b.from + 1;

    if (actual > stated) {
      // Our boundary is wrong — we have swept in pages belonging elsewhere.
      throw new Error(
        `merged marking scheme: block ${b.code} says "Page 1 of ${stated}" but spans ${actual} pages ` +
          `(${b.from}-${b.to}) — LONGER than stated, so the detected boundary is wrong. Refusing.`
      );
    }
    if (actual < stated) {
      // The SOURCE is short. Record it; refusing would throw away the complete
      // blocks in the same file as collateral.
      b.shortBy = stated - actual;
    }
  });

  return blocks;
}
