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

/** The NDA blueprints the build script's year+month discovery loop iterates. */
export const MOCK_BLUEPRINTS: readonly MockPaperBlueprint[] = [
  NDA_MATHS_PAPER,
  NDA_GAT_PAPER,
];

/** Every blueprint (incl. exams with bespoke build paths) — for getBlueprint. */
const ALL_BLUEPRINTS: readonly MockPaperBlueprint[] = [
  ...MOCK_BLUEPRINTS,
  NEET_PAPER,
  CDS_ENGLISH_PAPER,
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
