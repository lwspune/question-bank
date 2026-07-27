/**
 * Deriving a question's nominal marks from its ORIGINAL slot in a real board
 * paper — the one corpus where marks are free rather than hand-tagged.
 *
 * An ingested Class 10 SSC PYQ carries `question_number = "Q2(B)(iii)"`, and the
 * board's pattern fixes what a Q.2(B) is worth. So provenance gives us the tag
 * with no LLM and no judgement.
 *
 * TWO TRAPS THIS GUARDS, both found in the live data:
 *
 * 1. SUB-PARTS. The bank stores a sub-parted question as several rows —
 *    Q3(ii)(a), Q3(ii)(b), Q3(ii)(c) are three rows of ONE 3-mark question.
 *    Tagging each of them 3 would treble the question's apparent weight, so a
 *    row nested more than one level below its slot returns null (stays untagged)
 *    rather than guessing at a fraction.
 *
 * 2. SYLLABUS ERA. The same slot label means different marks in different eras
 *    (2016-2018 Maths papers are a flat Q1..Q5 with no A/B split; 2019 is a
 *    transitional 9-slot paper). The caller passes only modern-era rows; this
 *    module deliberately has no year logic so the era policy stays in one place.
 *
 * Pure. No I/O.
 */

/** Marks per whole question, keyed by printed slot ("Q.1 (A)" as stored: "Q1(A)"). */
export type SlotMarksMap = Readonly<Record<string, number>>;

/** Modern Maharashtra SSC Algebra / Geometry (2020, 2022-2026). Totals 40. */
export const SSC_MATHS_SLOT_MARKS: SlotMarksMap = {
  "Q1(A)": 1,
  "Q1(B)": 1,
  "Q2(A)": 2,
  "Q2(B)": 2,
  "Q3(A)": 3,
  "Q3(B)": 3,
  Q4: 4,
  Q5: 3,
};

/** Modern Maharashtra SSC Science and Technology I / II (2020, 2022-2026). Totals 40. */
export const SSC_SCIENCE_SLOT_MARKS: SlotMarksMap = {
  "Q1(A)": 1,
  "Q1(B)": 1,
  "Q2(A)": 2,
  "Q2(B)": 2,
  Q3: 3,
  Q4: 5,
};

const SLOT_RE = /^(Q\d+(?:\([AB]\))?)/;
const GROUP_RE = /\([^)]*\)/g;

export type ParsedSlot = {
  /** The slot the question sat in, e.g. "Q2(B)". */
  slot: string;
  /** How many levels below the slot this row sits. 1 = a whole item; 2+ = a sub-part. */
  depth: number;
};

export function parseQuestionNumber(qnum: string | null | undefined): ParsedSlot | null {
  if (!qnum) return null;
  const trimmed = qnum.trim();
  const m = SLOT_RE.exec(trimmed);
  if (!m) return null;
  const slot = m[1];
  const remainder = trimmed.slice(slot.length);
  const depth = (remainder.match(GROUP_RE) ?? []).length;
  return { slot, depth };
}

/**
 * Nominal marks for a row, or null when they can't be derived honestly —
 * unrecognised numbering, an unknown slot, or a sub-part row whose marks belong
 * to a parent question rather than to it.
 */
export function deriveNominalMarks(
  qnum: string | null | undefined,
  marksBySlot: SlotMarksMap
): number | null {
  const parsed = parseQuestionNumber(qnum);
  if (!parsed) return null;
  if (parsed.depth > 1) return null; // sub-part: marks are the parent's, not this row's
  const marks = marksBySlot[parsed.slot];
  return marks ?? null;
}
