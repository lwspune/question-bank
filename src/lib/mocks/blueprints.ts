/**
 * Exam-pattern blueprints for PYQ mock tests.
 *
 * A "mock" is a real past paper served whole (see reconstruct.ts) — so a
 * blueprint carries only the DELIVERY shape the bank can't infer: how long the
 * paper runs, how it's marked, and which bank subject(s) compose each section.
 * The question COUNT per section is the faithfulness contract validated against
 * the reconstructed rows in reconstruct.ts.
 *
 * Marking is uniform-per-paper for NDA (every question the same +/-), so
 * totalMarks = totalQuestions * marking.correct. Exams with variable per-question
 * marks would move `marking` down to the section level; NDA doesn't need that yet.
 *
 * Pure data — unit-tested in tests/mock-blueprints.test.ts.
 */

export type MockSectionBlueprint = {
  /** Stable key stamped on every question in this section (grouping + palette). */
  key: string;
  label: string;
  /** Bank subject name(s) that compose this section. Maths is one subject;
   *  the GAT General-Knowledge section spans several; NEET's Biology spans
   *  Botany + Zoology (content-mixed). */
  subjects: string[];
  /**
   * How many questions the real paper puts in this section — a HARD faithfulness
   * contract when present. Omitted for exams whose section size varies by sitting
   * (NEET: 180- vs 200-question layouts, and a content-split Biology block) — for
   * those, buildMockPaper derives totals from the actual rows (soft-count).
   */
  count?: number;
};

export type MockPaperBlueprint = {
  /** Stable code within an exam, used in the slug + lookup: "maths" | "gat". */
  code: string;
  /** Canonical name in the `exams` DB table — used to resolve rows. */
  examName: string;
  /** URL-safe exam slug (from the exam registry) — used in the slug + routing. */
  examSlug: string;
  /** Human paper label, e.g. "Paper I — Mathematics". */
  paperLabel: string;
  durationSecs: number;
  marking: { correct: number; wrong: number };
  sections: MockSectionBlueprint[];
};

/**
 * NDA Paper I — Mathematics. 120 questions, 300 marks, 2.5 hours.
 * Official UPSC marking: +2.5 correct, −0.83 (= 2.5/3) wrong.
 */
export const NDA_MATHS_PAPER: MockPaperBlueprint = {
  code: "maths",
  examName: "NDA",
  examSlug: "nda",
  paperLabel: "Paper I — Mathematics",
  durationSecs: 150 * 60,
  marking: { correct: 2.5, wrong: -0.83 },
  sections: [
    {
      key: "mathematics",
      label: "Mathematics",
      subjects: ["Mathematics"],
      count: 120,
    },
  ],
};

/**
 * NDA Paper II — General Ability Test (GAT). 150 questions, 600 marks, 2.5 hours.
 * Two sections: English (Part A, 50 q) + General Knowledge (Part B, 100 q across
 * Physics/Chemistry/Biology/History/Geography/Polity/Economics/Current Affairs).
 * Official marking: +4 correct, −1.33 (= 4/3) wrong. The bank stores GAT question
 * order globally (question_number 1–150), so English precedes GK and the
 * section-then-source_row reconstruction yields the true paper order.
 */
export const NDA_GAT_PAPER: MockPaperBlueprint = {
  code: "gat",
  examName: "NDA",
  examSlug: "nda",
  paperLabel: "Paper II — General Ability Test",
  durationSecs: 150 * 60,
  marking: { correct: 4, wrong: -1.33 },
  sections: [
    { key: "english", label: "English", subjects: ["English"], count: 50 },
    {
      key: "gk",
      label: "General Knowledge",
      subjects: [
        "Physics",
        "Chemistry",
        "Biology",
        "History",
        "Geography",
        "Polity",
        "Economics",
        "Current Affairs",
      ],
      count: 100,
    },
  ],
};

/**
 * NEET (UG) — one combined paper: Physics · Chemistry · Biology, +4 / −1.
 *
 * Unlike NDA, NEET has TWO layouts (2025+ = 180 q, pre-2025 = 200 q) AND a
 * content-split Biology block (Botany + Zoology are mixed, not 45/45), so no
 * section carries a hard `count` — the reconstruction validates by subject
 * membership + derives the true total from the sitting's actual PUBLIC rows.
 * Biology is ONE section spanning both bio subjects (like GAT's GK section spans
 * eight): ordering by source_row recovers the true Botany/Zoology interleave.
 *
 * durationSecs here is the 180-q default (180 min); the 200-q sittings run 200
 * min and override it per sitting (see scripts/mocks build path). Sittings vary
 * per year, so NEET is NOT discovered by the NDA year+month loop — it's driven by
 * a source_file-keyed registry — hence it is deliberately absent from
 * MOCK_BLUEPRINTS.
 */
export const NEET_PAPER: MockPaperBlueprint = {
  code: "full",
  examName: "NEET",
  examSlug: "neet",
  paperLabel: "NEET (UG)",
  durationSecs: 180 * 60,
  marking: { correct: 4, wrong: -1 },
  sections: [
    { key: "physics", label: "Physics", subjects: ["Physics"] },
    { key: "chemistry", label: "Chemistry", subjects: ["Chemistry"] },
    { key: "biology", label: "Biology", subjects: ["Botany", "Zoology"] },
  ],
};

/**
 * CDS English — one paper: 120 questions, 100 marks, 2 hours.
 *
 * ONE section, because CDS English is ONE bank subject. The real paper does run
 * ~13 "Directions:"-headed sections (synonyms, cloze, spotting errors, …) — but
 * their SELECTION and ORDER vary by year (2026 opens with word-pairs, 2017 with
 * ordering-of-words), so they are not a stable delivery shape. Each question
 * carries its own Directions block in its `context`, which is where that
 * structure lives; putting it in the blueprint would need a per-sitting section
 * list and would still tell the runner nothing it can't render from the context.
 *
 * Marking is the real UPSC scheme recorded in scripts/cds/config.ts: "120 Q /
 * 100 marks / 2 hrs / 1-3 negative" — so +0.8333 per correct (100/120) and
 * −0.2778 wrong (a third of the question's own marks, as for NDA). These are
 * FRACTIONAL, unlike every other blueprint here: 120 × 0.8333 = 99.996 in
 * floating point, which is why totalMarks() below rounds.
 *
 * `pyq_month` is NULL on every CDS row and the two sittings of a year (I and II)
 * share it — so CDS canNOT be discovered by the NDA year+month loop, and is
 * deliberately absent from MOCK_BLUEPRINTS (the NEET situation). Its sittings
 * come from the scripts/cds/config.ts paper registry, and its slug must be
 * edition-aware (see cdsMockSlug in reconstruct.ts).
 */
export const CDS_ENGLISH_PAPER: MockPaperBlueprint = {
  code: "english",
  examName: "CDS",
  examSlug: "cds",
  paperLabel: "English",
  durationSecs: 120 * 60,
  marking: { correct: 0.8333, wrong: -0.2778 },
  sections: [
    { key: "english", label: "English", subjects: ["English"], count: 120 },
  ],
};

/**
 * CDS General Knowledge — one paper: 120 questions, 100 marks, 2 hours.
 * Same marking as CDS English (scripts/cds-gs/config.ts: "120 items / 100 marks
 * / 2 hours / one-third negative"), so the same fractional +0.8333 / −0.2778.
 *
 * ONE SECTION SPANNING EIGHT BANK SUBJECTS, and that asymmetry is the point.
 * Unlike English — one paper, one bank subject — GK's 120 items are filed across
 * Physics, Chemistry, Biology, History, Geography, Polity, Economics and Current
 * Affairs, because subject is a PER-QUESTION decision in that pipeline. But the
 * printed booklet runs 120 standalone MCQs with those subjects INTERLEAVED and
 * prints no subject heading anywhere, so the paper HAS no subject sections to
 * reproduce. Declaring eight would invent a delivery shape the source does not
 * have, and would reorder the paper: reconstructPaper emits section by section,
 * so a student would meet all the History together, in an order no candidate
 * ever sat. One section preserves the printed order via `source_row`.
 *
 * The eight names must match the `subjects` rows EXACTLY — assignSection maps a
 * bank subject name to a section and reconstructPaper THROWS on a question whose
 * subject maps to none, so a typo here fails loudly rather than silently
 * dropping that subject's ~10-20 questions from every sitting.
 *
 * `count: 120` is a HARD contract, and it is safe because it is measured: all 19
 * sittings hold exactly 120 rows with `source_row` 1..120, no gaps and no
 * duplicates. A short GK paper would therefore be a real defect, not a layout
 * variant, and should refuse to build rather than ship as "the real paper".
 */
export const CDS_GK_PAPER: MockPaperBlueprint = {
  code: "gk",
  examName: "CDS",
  examSlug: "cds",
  paperLabel: "General Knowledge",
  durationSecs: 120 * 60,
  marking: { correct: 0.8333, wrong: -0.2778 },
  sections: [
    {
      key: "general-knowledge",
      label: "General Knowledge",
      subjects: [
        "Physics",
        "Chemistry",
        "Biology",
        "History",
        "Geography",
        "Polity",
        "Economics",
        "Current Affairs",
      ],
      count: 120,
    },
  ],
};

/**
 * CDS Elementary Mathematics — one paper: 100 questions, 100 marks, 2 hours.
 *
 * Marking is NOT the English/GK scheme. Those papers carry 120 items for 100
 * marks, hence the fractional 0.8333; this one is 100 items for 100 marks, so it
 * is a clean +1 with a one-third penalty of −0.3333. Both figures are read off
 * the 2026-I cover, the only cover in the corpus (scripts/cds-maths/config.ts),
 * and were independently corroborated by the transcription band that verified
 * Q100 completes: "contains 100 items", Series A, Two Hours, one-third penalty.
 *
 * ONE section — a single bank subject, and the printed paper has no internal
 * divisions at all (no Directions blocks, unlike English).
 *
 * `count: 100` is HARD on purpose. Three of the 20 sittings hold 98/99/99 rows
 * because a question with NO correct printed option was deliberately dropped at
 * assembly rather than shipped with an invented answer. Those three are HELD in
 * scripts/mocks/cdsMathsSittings.ts, not shipped short: a mock is the real paper
 * or it is nothing, and a soft count would silently relabel a 98-question
 * fragment as CDS (II) 2018.
 */
export const CDS_MATHS_PAPER: MockPaperBlueprint = {
  code: "maths",
  examName: "CDS",
  examSlug: "cds",
  paperLabel: "Elementary Mathematics",
  durationSecs: 120 * 60,
  marking: { correct: 1, wrong: -0.3333 },
  sections: [
    {
      key: "mathematics",
      label: "Elementary Mathematics",
      subjects: ["Mathematics"],
      count: 100,
    },
  ],
};

/**
 * MHT-CET (PCM group) — TWO papers per sitting, the NDA shape.
 *
 *   Paper I  — Mathematics:          50 q  x 2 marks = 100 marks, 90 min
 *   Paper II — Physics + Chemistry: 100 q  x 1 mark  = 100 marks, 90 min
 *
 * ZERO NEGATIVE MARKING, and it is the first such exam in this file. That is a
 * real property of MHT-CET, not a placeholder: src/app/guide/mht-cet-maths
 * /_data/strategy.ts sets penaltyPerWrong: 0 and, for exactly that reason, makes
 * targetAttempts equal the full paper — a blank scores the same as a wrong
 * answer, so leaving one is strictly worse than guessing. It is also why
 * src/lib/mocks/marking.ts exists: the instructions screen used to hard-code
 * "(negative marking)" and "skip if unsure", both wrong here.
 *
 * Both papers declare HARD section counts. Short sittings are NOT a layout
 * variant the way NEET's 180-vs-200 is — they are questions missing from the
 * bank — so a soft count would ship a fragment as "the real paper". The 30 of 90
 * papers that cannot reconstruct whole are held in scripts/mocks/mhtcetSittings.ts
 * with a stated reason rather than shipped short.
 *
 * The bank's subject row is "Maths", NOT "Mathematics" — resolvePaper looks
 * subjects up by name, so the wrong spelling resolves zero chapters and every
 * sitting reconstructs empty.
 *
 * Sittings are source_file-keyed (17 of the 45 share (2023, "May"), so the NDA
 * year+month loop would collapse them onto one slug) — hence both papers are
 * deliberately absent from MOCK_BLUEPRINTS.
 */
export const MHT_CET_MATHS_PAPER: MockPaperBlueprint = {
  code: "maths",
  examName: "MHT-CET",
  examSlug: "mht-cet",
  paperLabel: "Paper I — Mathematics",
  durationSecs: 90 * 60,
  marking: { correct: 2, wrong: 0 },
  sections: [
    { key: "mathematics", label: "Mathematics", subjects: ["Maths"], count: 50 },
  ],
};

/**
 * Section ORDER is the paper order. Every source file numbers Physics 1-50 and
 * Chemistry 51-100, and buildMockPaper walks sections in blueprint order, so
 * swapping these two would renumber the whole paper.
 */
export const MHT_CET_PHY_CHEM_PAPER: MockPaperBlueprint = {
  code: "phy-chem",
  examName: "MHT-CET",
  examSlug: "mht-cet",
  paperLabel: "Paper II — Physics & Chemistry",
  durationSecs: 90 * 60,
  marking: { correct: 1, wrong: 0 },
  sections: [
    { key: "physics", label: "Physics", subjects: ["Physics"], count: 50 },
    { key: "chemistry", label: "Chemistry", subjects: ["Chemistry"], count: 50 },
  ],
};

/**
 * JEE Mains — Paper 1 (B.E./B.Tech), the 2025-onward pattern.
 *
 *   75 questions x 4 marks = 300 marks, 180 minutes, +4 / -1 UNIFORM.
 *   Three subjects x (Section A: 20 MCQ + Section B: 5 numeric) = 25 each.
 *
 * THE FIRST BLUEPRINT WITH NON-MCQ ANSWERS. Section B is a numeric-answer (NAT)
 * question: no options at all, the key living in `questions.numeric_answer`.
 * That is why the whole answer axis is a union (src/lib/mocks/answers.ts) rather
 * than a letter.
 *
 * ONLY 2025+ IS EXPRESSIBLE HERE, and the reason is the pattern change. A
 * 2021-2024 shift printed 90 questions of which a candidate attempted 75 — all
 * 60 MCQ plus ANY 5 OF 10 numeric per subject. gradeMock has no "attempt at most
 * N" concept, so those sittings would score out of 360 instead of 300 and let a
 * student answer all ten. From 2025 Section B is 5 questions, all compulsory, so
 * the paper is simply its 75 questions and the optionality problem disappears.
 * The pre-2025 corpus is ingested and deliberately NOT built (see
 * scripts/mocks/jeeSittings.ts).
 *
 * SECTION ORDER IS PAPER ORDER: every source file runs Physics 1-25,
 * Chemistry 26-50, Maths 51-75, and buildMockPaper walks sections in blueprint
 * order — so reordering these three renumbers the whole paper.
 *
 * Section A/B is deliberately NOT a section here. Splitting each subject in two
 * would give the same question ORDER (source_row already puts the 20 MCQs before
 * the 5 NAT within a subject) and buy only a finer palette grouping, at the cost
 * of six hard counts and a six-row results table. Per-format performance can be
 * derived later from `question_format` without touching the snapshot.
 *
 * The bank's subject row is "Maths", NOT "Mathematics" — resolvePaper looks
 * subjects up by name, so the wrong spelling resolves zero chapters and every
 * sitting reconstructs empty (the MHT-CET trap, same shape).
 *
 * Sittings are NOT discoverable from the bank: `pyq_month` is NULL on every JEE
 * row, and a single `source_file` holds BOTH shifts of a date for 2025 (150 rows
 * = 2 x 75). So JEE needs a third discovery rule — a split WITHIN a source file
 * — and is deliberately absent from MOCK_BLUEPRINTS. See scripts/mocks/jeeSittings.ts.
 */
export const JEE_MAINS_PAPER: MockPaperBlueprint = {
  code: "paper-1",
  examName: "JEE Mains",
  examSlug: "jee-mains",
  paperLabel: "Paper 1 (B.E./B.Tech)",
  durationSecs: 180 * 60,
  marking: { correct: 4, wrong: -1 },
  sections: [
    { key: "physics", label: "Physics", subjects: ["Physics"], count: 25 },
    { key: "chemistry", label: "Chemistry", subjects: ["Chemistry"], count: 25 },
    { key: "maths", label: "Mathematics", subjects: ["Maths"], count: 25 },
  ],
};

/** The NDA blueprints the build script's year+month discovery loop iterates. */
export const MOCK_BLUEPRINTS: readonly MockPaperBlueprint[] = [
  NDA_MATHS_PAPER,
  NDA_GAT_PAPER,
];

/**
 * Every blueprint (incl. exams with bespoke build paths) — for getBlueprint.
 *
 * EVERY shipped paper must be listed. CDS GK and CDS Elementary Mathematics were
 * omitted when they shipped, so getBlueprint("cds", "gk") returned null for 35
 * published mocks — latent, because nothing in src/ calls it today, but exactly
 * the kind of gap that bites the first consumer. tests/mock-blueprints.test.ts
 * now asserts the list covers every exported blueprint so it cannot recur.
 */
const ALL_BLUEPRINTS: readonly MockPaperBlueprint[] = [
  ...MOCK_BLUEPRINTS,
  NEET_PAPER,
  CDS_ENGLISH_PAPER,
  CDS_GK_PAPER,
  CDS_MATHS_PAPER,
  MHT_CET_MATHS_PAPER,
  MHT_CET_PHY_CHEM_PAPER,
  JEE_MAINS_PAPER,
];

/** Sum of the DECLARED section counts (0 when a blueprint declares none). */
export function totalQuestions(bp: MockPaperBlueprint): number {
  return bp.sections.reduce((sum, s) => sum + (s.count ?? 0), 0);
}

/**
 * Total marks at full correct (uniform-per-paper marking), rounded to 2dp.
 *
 * The rounding is load-bearing for FRACTIONAL marking: CDS is 120 × 0.8333,
 * which floats to 99.99600000000001 and would render as "/ 99.996". Integer and
 * 2dp schemes (NDA 300 / 600, NEET) are unaffected. Matches the same rounding
 * buildMockPaper already applies to the snapshot's totalMarks.
 */
export function totalMarks(bp: MockPaperBlueprint): number {
  return Math.round(totalQuestions(bp) * bp.marking.correct * 100) / 100;
}

/** Find a blueprint by exam slug + paper code; null when not registered. */
export function getBlueprint(
  examSlug: string,
  code: string
): MockPaperBlueprint | null {
  return (
    ALL_BLUEPRINTS.find((b) => b.examSlug === examSlug && b.code === code) ??
    null
  );
}
