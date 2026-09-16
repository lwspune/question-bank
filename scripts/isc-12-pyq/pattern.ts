/**
 * ISC Class-12 PCM paper patterns — the pure core.
 *
 * ── WHY THIS IS A TABLE AND NOT A CONSTANT ───────────────────────────────────
 * There is no single "ISC pattern". The three PCM subjects sat in the same
 * session have three different structures:
 *
 *   Mathematics (860)   80 marks   22 q   3 sections   Section B **OR** C
 *   Physics     (861A)  70 marks   20 q   4 sections   answer all
 *   Chemistry   (862A)  70 marks   21 q   4 sections   answer all
 *
 * Anything that assumes one shape across the subject axis is wrong for at least
 * two of the three.
 *
 * ── PROVENANCE ───────────────────────────────────────────────────────────────
 * Every number below was read off a source document, and the two years were
 * measured INDEPENDENTLY of each other:
 *
 *   2026 — the printed "Instructions to Candidates" page of each question paper
 *          (C:\tmp\PYQPs\ISC\XII\2026\qp\*.pdf), which states the section count,
 *          the question count, the per-section question counts and the
 *          internal-choice counts explicitly.
 *   2025 — the "Analysis of Pupil Performance" marking schemes
 *          (C:\tmp\PYQPs\ISC\XII\2025\apup\*.pdf): its `SECTION X – N MARKS`
 *          headers give the marks split, and its one-MARKING-SCHEME-block-per-
 *          question structure gives the question count.
 *
 * They agree exactly, on marks AND on question counts, for all three subjects.
 * That agreement is an input to this table, not an assumption behind it, and
 * `tests/isc-12-pattern` pins it so a future year that DIVERGES shows up as a
 * failure rather than as silently-wrong marks.
 *
 * A third, independent cross-check: the bracketed per-question marks in the
 * 2025 Physics marking scheme are 14x[1] + 7x[2] + 9x[3] + 3x[5] = 70, which
 * reproduces the 2026 instruction page's "Section B seven questions of two
 * marks, Section C nine of three, Section D three of five" without reference
 * to it.
 *
 * ── WHY IT THROWS ────────────────────────────────────────────────────────────
 * `patternForYear` REFUSES an unmeasured year rather than defaulting to the
 * nearest one. The sibling cbse-12-pyq lane carries the same rule for a reason
 * its README records: CBSE's 2022 paper is a COVID Term-2 paper — 14 questions
 * and no MCQs at all against 38 questions in every other year — so a default
 * would have produced confident nonsense for a fifth of that corpus. A default
 * turns "nobody has looked at this year" into an assertion. See
 * [[default-becomes-assertion]].
 */

export const ISC_SUBJECTS = ["Mathematics", "Physics", "Chemistry"] as const;
export type IscSubject = (typeof ISC_SUBJECTS)[number];

/** Years with a source document in hand and a pattern read off it. */
export const MEASURED_YEARS = [2025, 2026] as const;
export type MeasuredYear = (typeof MEASURED_YEARS)[number];

export type SectionId = "A" | "B" | "C" | "D";

export type SectionSpec = {
  id: SectionId;
  /** Marks printed for this section. */
  marks: number;
  /** Printed Question numbers in this section (not subparts, not OR branches). */
  questions: number;
  /**
   * Sections a candidate chooses BETWEEN. All members of a group carry the same
   * key; exactly one of them counts toward the paper total. Only ISC
   * Mathematics has one (B or C) — Physics and Chemistry are answer-all.
   */
  choiceGroup?: string;
};

/**
 * The printed Question-number run belonging to one section.
 *
 * ⚠ ISC Section A is ONE printed Question carrying 14-15 SUBPARTS, not 14-15
 * questions — so a band is narrow where the section is large. Physics Section A
 * is `Q1..Q1` and holds 14 marks; its Section C is `Q9..Q17` and holds 27. Any
 * consumer that sizes a section by its band width will be wrong on Section A of
 * all three subjects.
 *
 * Boundaries are VERIFIED against pages actually read, not just derived from
 * the instruction page's counts:
 *   Maths    p9 of the 2026 paper prints Q16 [2], Q17 [4], Q18 [4] — Section B
 *            (5+2+4+4 = 15) with Q15 the 5x1-mark subpart question.
 *   Physics  p7 of the 2026 paper prints "Question 11" marked [3] — Section C,
 *            whose questions are three marks each.
 *   Maths    the 2025 marking scheme puts Linear Regression at Q20, Application
 *            of Calculus at Q21 and Linear Programming at Q22 — the three
 *            Section C units, in Section C's band.
 */
export type QuestionBand = { from: number; to: number; section: SectionId };

export type PaperPattern = {
  subject: IscSubject;
  year: MeasuredYear;
  /** The paper's own stated maximum. */
  totalMarks: number;
  /** Printed Question numbers across all sections, optional ones included. */
  totalQuestions: number;
  durationMinutes: number;
  sections: SectionSpec[];
  /**
   * Printed `OR` alternatives, as stated on the instruction page.
   *
   * ⚠ ISC numbers an internal choice's branches as SUBPARTS — `Question 16 (i)
   * … OR … (ii)`. That is the same label shape as `Question 1 (i) … (ii) …`,
   * where the subparts are all COMPULSORY. The discriminator is the bare `OR`
   * line between them and nothing else. Both branches are bank rows either way;
   * what this count protects is the marks arithmetic, which is off by the value
   * of every mis-read branch.
   */
  internalChoices: number;
  /** Question-number runs, contiguous and covering 1..totalQuestions exactly. */
  bands: QuestionBand[];
};

// Section shapes are identical across 2025 and 2026 (measured on both, see
// header), so each subject declares one shape and it is stamped per year. If a
// later year diverges, give it its own entry rather than widening this one.
const SHAPES: Record<IscSubject, Omit<PaperPattern, "year">> = {
  // Instructions: "divided into three sections and has 22 questions in all";
  // "Section A is compulsory and has fourteen questions"; "attempt all
  // questions either from Section B or Section C"; "Section B and Section C
  // have four questions each". Internal choices: "two questions of 2 marks,
  // two questions of 4 marks and two questions of 6 marks in Section A" (6)
  // plus "one question of 2 marks and one question of 4 marks each in Section
  // B and Section C" (2 + 2) = 10.
  Mathematics: {
    subject: "Mathematics",
    totalMarks: 80,
    totalQuestions: 22,
    durationMinutes: 180,
    sections: [
      { id: "A", marks: 65, questions: 14 },
      { id: "B", marks: 15, questions: 4, choiceGroup: "B-or-C" },
      { id: "C", marks: 15, questions: 4, choiceGroup: "B-or-C" },
    ],
    internalChoices: 10,
    bands: [
      { from: 1, to: 14, section: "A" },
      { from: 15, to: 18, section: "B" },
      { from: 19, to: 22, section: "C" },
    ],
  },
  // Instructions: "There are twenty questions in this paper. Answer all
  // questions"; "four sections: A, B, C and D. Internal choices have been
  // provided in two questions each in Sections B, C and D" (6); "Section A
  // consists of one question having fourteen subparts of one mark each";
  // Section B seven of two marks, C nine of three, D three of five.
  Physics: {
    subject: "Physics",
    totalMarks: 70,
    totalQuestions: 20,
    durationMinutes: 180,
    sections: [
      { id: "A", marks: 14, questions: 1 },
      { id: "B", marks: 14, questions: 7 },
      { id: "C", marks: 27, questions: 9 },
      { id: "D", marks: 15, questions: 3 },
    ],
    internalChoices: 6,
    bands: [
      { from: 1, to: 1, section: "A" },
      { from: 2, to: 8, section: "B" },
      { from: 9, to: 17, section: "C" },
      { from: 18, to: 20, section: "D" },
    ],
  },
  // Instructions: "divided into four sections and has twenty one questions in
  // all. Answer all questions"; "Section A has fourteen subparts"; B ten of two
  // marks, C seven of three, D three of five; "Internal choices have been
  // provided in one question each in Sections B, C and D" (3).
  Chemistry: {
    subject: "Chemistry",
    totalMarks: 70,
    totalQuestions: 21,
    durationMinutes: 180,
    sections: [
      { id: "A", marks: 14, questions: 1 },
      { id: "B", marks: 20, questions: 10 },
      { id: "C", marks: 21, questions: 7 },
      { id: "D", marks: 15, questions: 3 },
    ],
    internalChoices: 3,
    bands: [
      { from: 1, to: 1, section: "A" },
      { from: 2, to: 11, section: "B" },
      { from: 12, to: 18, section: "C" },
      { from: 19, to: 21, section: "D" },
    ],
  },
};

export function isMeasuredYear(year: number): year is MeasuredYear {
  return (MEASURED_YEARS as readonly number[]).includes(year);
}

/**
 * The pattern for one (subject, year).
 *
 * THROWS for a year with no source document. Do not add a fallback — read the
 * paper and add an entry.
 */
export function patternForYear(subject: IscSubject, year: number): PaperPattern {
  if (!isMeasuredYear(year)) {
    throw new Error(
      `ISC ${subject} ${year}: paper pattern not measured. ` +
        `Measured years are ${MEASURED_YEARS.join(", ")}. Read the paper's ` +
        `instruction page (or its marking scheme's SECTION headers) and add an ` +
        `entry to SHAPES — do not reuse an adjacent year, whose section count, ` +
        `question count and marking can all differ.`
    );
  }
  return { ...SHAPES[subject], year };
}

/**
 * The marks a candidate can actually score, which is NOT the sum of the
 * sections whenever the paper offers a choice between them.
 *
 * ISC Mathematics prints 95 marks of sections (A 65 + B 15 + C 15) for an
 * 80-mark paper. A plain sum is wrong by 15 there and right for the other two
 * subjects, which is the worst shape a bug can have — it looks correct on
 * two-thirds of the corpus.
 */
export function effectiveMarks(pattern: PaperPattern): number {
  let total = 0;
  const bestOfGroup = new Map<string, number>();
  for (const section of pattern.sections) {
    if (section.choiceGroup === undefined) {
      total += section.marks;
      continue;
    }
    const best = bestOfGroup.get(section.choiceGroup) ?? 0;
    bestOfGroup.set(section.choiceGroup, Math.max(best, section.marks));
  }
  for (const marks of bestOfGroup.values()) total += marks;
  return total;
}

/**
 * The section a printed Question number belongs to.
 *
 * THROWS for a number outside the paper. A question number this cannot place is
 * a transcription error — a subpart read as a question, or a number read off
 * the wrong paper — and returning a default section would file it silently under
 * the wrong one rather than stopping the ingest.
 */
export function sectionForQuestion(
  pattern: PaperPattern,
  questionNumber: number
): SectionId {
  const band = pattern.bands.find(
    (b) => questionNumber >= b.from && questionNumber <= b.to
  );
  if (!band) {
    throw new Error(
      `ISC ${pattern.subject} ${pattern.year}: Question ${questionNumber} is ` +
        `outside the paper (1..${pattern.totalQuestions}). A subpart is not a ` +
        `question — ISC Section A is ONE question with 14-15 subparts.`
    );
  }
  return band.section;
}
