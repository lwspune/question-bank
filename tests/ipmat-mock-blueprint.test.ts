// Spec for the IPMAT Indore mock paper — the blueprint additions it needed.
//
// IPMAT Indore forced three things the mock machinery could not express, and all
// three were measured against the real corpus rather than assumed.
//
// 1. PER-SECTION MARKING. The paper is +4 throughout, but its Short Answer
//    section carries NO negative marking while both MCQ sections are -1. A
//    single paper-level `marking` would penalise every SA mistake and report a
//    wrong score for every student. `MockQuestionSnapshot` already carries marks
//    per QUESTION, and buildMockPaper already fills them inside a per-section
//    loop, so this is expressible — it just had no way in.
//
// 2. SECTION FROM source_file, NOT from subject or format. Since the subject
//    axis became academic (Mathematics / Logical Reasoning / English), Indore's
//    two quant sections BOTH draw from Mathematics + Logical Reasoning, so
//    subject cannot separate them. Format cannot either: 2025's SA section holds
//    1 MCQ among 14 numeric. `source_file` is the only authoritative answer,
//    because it records where the exam itself put the question.
//
// 3. A SITTING IS THREE source_files. Every other exam here has one file per
//    sitting (or two, via `mergeWith`). An IPMAT sitting is one paper sat in one
//    session across three separately-published sections.
import { describe, it, expect } from "vitest";
import {
  IPMAT_INDORE_PAPER,
  sectionMarking,
  getBlueprint,
  type MockPaperBlueprint,
} from "../src/lib/mocks/blueprints";
import {
  assignSection,
  buildMockPaper,
  type PaperQuestionRow,
} from "../src/lib/mocks/reconstruct";

describe("IPMAT_INDORE_PAPER", () => {
  const bp: MockPaperBlueprint = IPMAT_INDORE_PAPER;

  it("is registered so getBlueprint can find it", () => {
    expect(getBlueprint("ipmat-indore", "paper")).toBe(bp);
    expect(bp.code).toBe("paper");
  });

  it("is 90 questions over three sections, 30 + 15 + 45", () => {
    expect(bp.sections.map((s) => s.count)).toEqual([30, 15, 45]);
    expect(bp.sections.reduce((n, s) => n + (s.count ?? 0), 0)).toBe(90);
  });

  it("runs 120 minutes", () => {
    // Officially 40 minutes per section with a sectional lock. The runner has a
    // single deadline per attempt, so these ship on one combined timer and the
    // lock is a separate, deferred piece of work — recorded in ROADMAP step 1c.
    expect(bp.durationSecs).toBe(120 * 60);
  });

  it("awards +4 and penalises -1 by default", () => {
    expect(bp.marking).toEqual({ correct: 4, wrong: -1 });
  });

  it("gives the SHORT ANSWER section zero negative marking", () => {
    // The one fact that changes every student's score.
    const sa = bp.sections.find((s) => s.key === "qa-sa")!;
    expect(sectionMarking(bp, sa)).toEqual({ correct: 4, wrong: 0 });
  });

  it("keeps -1 on both MCQ sections", () => {
    for (const key of ["qa-mcq", "va"]) {
      const s = bp.sections.find((x) => x.key === key)!;
      expect(sectionMarking(bp, s), key).toEqual({ correct: 4, wrong: -1 });
    }
  });

  it("totals 360 marks", () => {
    const total = bp.sections.reduce((n, s) => n + (s.count ?? 0) * sectionMarking(bp, s).correct, 0);
    expect(total).toBe(360);
  });

  it("identifies each section by a source_file suffix, not by subject", () => {
    // Both quant sections share their subjects, so the suffix is what separates
    // them. Asserted because dropping it would silently merge 45 quant rows.
    const suffixes = bp.sections.map((s) => s.sourceFileSuffix);
    expect(suffixes).toEqual(["MCQ", "SA", "VA"]);
  });

  it("gives the two quant sections THE SAME subjects, which is why suffix is needed", () => {
    const mcq = bp.sections.find((s) => s.key === "qa-mcq")!;
    const sa = bp.sections.find((s) => s.key === "qa-sa")!;
    expect([...mcq.subjects].sort()).toEqual([...sa.subjects].sort());
    expect(mcq.subjects).toContain("Mathematics");
  });

  it("puts Verbal Ability on the English subject alone", () => {
    expect(bp.sections.find((s) => s.key === "va")!.subjects).toEqual(["English"]);
  });
});

describe("sectionMarking", () => {
  const bp = IPMAT_INDORE_PAPER;

  it("falls back to the paper's marking when a section declares none", () => {
    const plain = { key: "x", label: "X", subjects: ["Mathematics"] };
    expect(sectionMarking(bp, plain)).toEqual(bp.marking);
  });

  it("does not mutate the paper's marking", () => {
    const before = { ...bp.marking };
    sectionMarking(bp, bp.sections.find((s) => s.key === "qa-sa")!);
    expect(bp.marking).toEqual(before);
  });
});

describe("assignSection with a source_file suffix", () => {
  const bp = IPMAT_INDORE_PAPER;

  it("routes a quant row by its file suffix, not its subject", () => {
    expect(assignSection(bp, "Mathematics", "ipmat/ipmat-indore-2022-MCQ")).toBe("qa-mcq");
    expect(assignSection(bp, "Mathematics", "ipmat/ipmat-indore-2022-SA")).toBe("qa-sa");
  });

  it("routes a Logical Reasoning row the same way", () => {
    // Indore files some reasoning questions in each quant section.
    expect(assignSection(bp, "Logical Reasoning", "ipmat/ipmat-indore-2024-MCQ")).toBe("qa-mcq");
    expect(assignSection(bp, "Logical Reasoning", "ipmat/ipmat-indore-2024-SA")).toBe("qa-sa");
  });

  it("routes English to the VA section", () => {
    expect(assignSection(bp, "English", "ipmat/ipmat-indore-2026-VA")).toBe("va");
  });

  it("puts a 2025 SA row that happens to be an MCQ in the SA section", () => {
    // 2025 SA holds 1 MCQ among 14 numeric. A format-based split would move it
    // to qa-mcq, making that section 31 and SA 14 — and the count contract
    // would fail on exactly one of the five sittings.
    expect(assignSection(bp, "Mathematics", "ipmat/ipmat-indore-2025-SA")).toBe("qa-sa");
  });

  it("returns null when the subject fits no section", () => {
    expect(assignSection(bp, "Physics", "ipmat/ipmat-indore-2022-MCQ")).toBeNull();
  });

  it("returns null when the suffix matches no section", () => {
    expect(assignSection(bp, "Mathematics", "ipmat/ipmat-indore-2022-QA")).toBeNull();
  });

  it("still routes by subject alone for a blueprint with no suffixes", () => {
    // Every other exam must behave exactly as before.
    const nda: MockPaperBlueprint = {
      code: "gat", examName: "NDA", examSlug: "nda", paperLabel: "P2",
      durationSecs: 60, marking: { correct: 4, wrong: -1 },
      sections: [
        { key: "english", label: "English", subjects: ["English"], count: 50 },
        { key: "gk", label: "GK", subjects: ["Physics", "History"], count: 100 },
      ],
    };
    expect(assignSection(nda, "English", "anything.pdf")).toBe("english");
    expect(assignSection(nda, "History", null)).toBe("gk");
    expect(assignSection(nda, "Chemistry", null)).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// buildMockPaper must STAMP the section's marking onto each question.
//
// The tests above were VACUOUS for the thing that matters. They asserted the
// `sectionMarking` helper and the blueprint DATA, and passed unchanged when
// buildMockPaper was patched to ignore the section scheme entirely — proved by
// injecting exactly that fault. Grading reads the per-QUESTION marks on the
// snapshot, so if the stamp is wrong the helper being right buys nothing.
describe("buildMockPaper stamps per-section marking", () => {
  const bp = IPMAT_INDORE_PAPER;

  /** A full 90-question Indore sitting: 30 MCQ + 15 SA + 45 VA. */
  function rows(): PaperQuestionRow[] {
    const out: PaperQuestionRow[] = [];
    const add = (n: number, subject: string, suffix: string, count: number) => {
      for (let i = 1; i <= count; i++) {
        out.push({
          id: `${suffix}-${i}`,
          sourceRow: i,
          questionNumber: String(i),
          subjectName: subject,
          sourceFile: `ipmat/ipmat-indore-2022-${suffix}`,
          answer: { kind: "mcq", label: "A" },
        } as PaperQuestionRow);
      }
      return n;
    };
    add(0, "Mathematics", "MCQ", 30);
    add(0, "Mathematics", "SA", 15);
    add(0, "English", "VA", 45);
    return out;
  }

  const snap = buildMockPaper(bp, rows(), { year: 2022, month: null });

  it("places all 90 questions", () => {
    expect(snap.totalQuestions).toBe(90);
  });

  it("stamps negMarks 0 on EVERY Short Answer question", () => {
    const sa = snap.questions.filter((q) => q.sectionKey === "qa-sa");
    expect(sa).toHaveLength(15);
    expect(sa.every((q) => q.negMarks === 0)).toBe(true);
    expect(sa.every((q) => q.marks === 4)).toBe(true);
  });

  it("stamps negMarks -1 on every MCQ and Verbal question", () => {
    const mcq = snap.questions.filter((q) => q.sectionKey !== "qa-sa");
    expect(mcq).toHaveLength(75);
    expect(mcq.every((q) => q.negMarks === -1)).toBe(true);
  });

  it("totals 360 marks, summed from what was stamped", () => {
    expect(snap.totalMarks).toBe(360);
  });

  it("orders the sections MCQ -> SA -> VA", () => {
    expect(snap.questions[0].sectionKey).toBe("qa-mcq");
    expect(snap.questions[30].sectionKey).toBe("qa-sa");
    expect(snap.questions[45].sectionKey).toBe("va");
    expect(snap.questions.map((q) => q.position)).toEqual(
      Array.from({ length: 90 }, (_, i) => i + 1)
    );
  });

  it("routes a quant row to SA purely by its file suffix", () => {
    // Same subject, same everything but the suffix.
    const mixed: PaperQuestionRow[] = [
      { id: "a", sourceRow: 1, questionNumber: "1", subjectName: "Mathematics", sourceFile: "ipmat/ipmat-indore-2022-SA", answer: { kind: "numeric", value: 7 } } as PaperQuestionRow,
      { id: "b", sourceRow: 1, questionNumber: "1", subjectName: "Mathematics", sourceFile: "ipmat/ipmat-indore-2022-MCQ", answer: { kind: "mcq", label: "B" } } as PaperQuestionRow,
    ];
    const loose: MockPaperBlueprint = { ...bp, sections: bp.sections.map((s) => ({ ...s, count: undefined })) };
    const s2 = buildMockPaper(loose, mixed, { year: 2022, month: null });
    expect(s2.questions.find((q) => q.questionId === "a")!.sectionKey).toBe("qa-sa");
    expect(s2.questions.find((q) => q.questionId === "a")!.negMarks).toBe(0);
    expect(s2.questions.find((q) => q.questionId === "b")!.sectionKey).toBe("qa-mcq");
    expect(s2.questions.find((q) => q.questionId === "b")!.negMarks).toBe(-1);
  });
});

describe("totalMarks is SUMMED, not multiplied", () => {
  // Also caught by fault injection: replacing the sum with
  // `total * bp.marking.correct` passed every test above, because every IPMAT
  // section awards +4 so the two agree. The multiply is only wrong once a
  // section's `correct` differs — which no shipped paper does yet. This
  // synthetic blueprint makes the difference observable, so the defensive fix
  // is actually asserted rather than merely believed.
  const split: MockPaperBlueprint = {
    code: "synthetic",
    examName: "IPMAT Indore",
    examSlug: "ipmat-indore",
    paperLabel: "synthetic",
    durationSecs: 60,
    marking: { correct: 4, wrong: -1 },
    sections: [
      { key: "a", label: "A", subjects: ["Mathematics"], sourceFileSuffix: "MCQ" },
      // Half marks per question, and no penalty.
      { key: "b", label: "B", subjects: ["English"], sourceFileSuffix: "VA", marking: { correct: 2, wrong: 0 } },
    ],
  };

  const rows: PaperQuestionRow[] = [
    ...Array.from({ length: 3 }, (_, i) => ({
      id: `m${i}`, sourceRow: i + 1, questionNumber: String(i + 1),
      subjectName: "Mathematics", sourceFile: "x-MCQ",
      answer: { kind: "mcq", label: "A" },
    })),
    ...Array.from({ length: 2 }, (_, i) => ({
      id: `v${i}`, sourceRow: i + 1, questionNumber: String(i + 1),
      subjectName: "English", sourceFile: "x-VA",
      answer: { kind: "mcq", label: "B" },
    })),
  ] as PaperQuestionRow[];

  it("adds 3x4 + 2x2 = 16, not 5x4 = 20", () => {
    const snap = buildMockPaper(split, rows, { year: 2022, month: null });
    expect(snap.totalQuestions).toBe(5);
    expect(snap.totalMarks).toBe(16);
  });
});
