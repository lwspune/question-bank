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

/** The NDA blueprints the build script's year+month discovery loop iterates. */
export const MOCK_BLUEPRINTS: readonly MockPaperBlueprint[] = [
  NDA_MATHS_PAPER,
  NDA_GAT_PAPER,
];

/** Every blueprint (incl. exams with bespoke build paths) — for getBlueprint. */
const ALL_BLUEPRINTS: readonly MockPaperBlueprint[] = [
  ...MOCK_BLUEPRINTS,
  NEET_PAPER,
];

/** Sum of the DECLARED section counts (0 when a blueprint declares none). */
export function totalQuestions(bp: MockPaperBlueprint): number {
  return bp.sections.reduce((sum, s) => sum + (s.count ?? 0), 0);
}

/** Total marks at full correct (uniform-per-paper marking). */
export function totalMarks(bp: MockPaperBlueprint): number {
  return totalQuestions(bp) * bp.marking.correct;
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
