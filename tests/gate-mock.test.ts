import { describe, expect, it } from "vitest";
import { GATE_CS_SUBJECTS, gatePaper, gateQuestionMarks, totalMarks } from "@/lib/mocks/blueprints";
import { assignSection, buildMockPaper, type PaperQuestionRow } from "@/lib/mocks/reconstruct";
import { deriveGateSittings, gateNoPenalty } from "../scripts/mocks/gateSittings";

const THIRD = 1 / 3;

describe("gatePaper: GATE CS as the paper prints it", () => {
  const bp = gatePaper();

  it("is 65 questions, 100 marks, 3 hours, in four sections by printed number", () => {
    expect(bp.examName).toBe("GATE CS");
    expect(bp.examSlug).toBe("gate-cs");
    expect(bp.durationSecs).toBe(180 * 60);
    expect(bp.sections.map((s) => [s.key, s.count, s.questionNumbers])).toEqual([
      ["ga-1", 5, { from: 1, to: 5 }],
      ["ga-2", 5, { from: 6, to: 10 }],
      ["cs-1", 25, { from: 11, to: 35 }],
      ["cs-2", 30, { from: 36, to: 65 }],
    ]);
    expect(totalMarks(bp)).toBe(100);
  });

  it("marks a wrong MCQ at minus a third of its marks, and scores an MSQ on the exact set", () => {
    const m = Object.fromEntries(bp.sections.map((s) => [s.key, s.marking]));
    expect(m["ga-1"]).toEqual({ correct: 1, wrong: -THIRD });
    expect(m["ga-2"]).toEqual({ correct: 2, wrong: -2 * THIRD });
    expect(m["cs-1"]).toEqual({ correct: 1, wrong: -THIRD });
    expect(m["cs-2"]).toEqual({ correct: 2, wrong: -2 * THIRD });
    expect(bp.sections.every((s) => s.msqScheme === "exact")).toBe(true);
  });

  it("agrees with gateQuestionMarks on every number", () => {
    for (let n = 1; n <= 65; n++) {
      const s = bp.sections.find((x) => x.questionNumbers && n >= x.questionNumbers.from && n <= x.questionNumbers.to)!;
      expect(s.marking!.correct, `Q${n}`).toBe(gateQuestionMarks(n));
    }
  });

  it("places a row by its subject and printed number", () => {
    expect(assignSection(bp, "General Aptitude", null, "mcq", 3)).toBe("ga-1");
    expect(assignSection(bp, "General Aptitude", null, "mcq", 7)).toBe("ga-2");
    expect(assignSection(bp, "Algorithms", null, "msq", 20)).toBe("cs-1");
    expect(assignSection(bp, "Databases", null, "numeric", 50)).toBe("cs-2");
    expect(assignSection(bp, "Algorithms", null, "mcq", 7)).toBeNull();
  });
});

/** A whole paper: GA 1-10 MCQ; CS 11-20 MCQ, 21-30 MSQ, 31-35 NAT, 36-45 MCQ, 46-55 MSQ, 56-65 NAT. */
function paperRows(): PaperQuestionRow[] {
  const formatOf = (n: number) =>
    n <= 20 || (n >= 36 && n <= 45) ? "mcq" : (n >= 21 && n <= 30) || (n >= 46 && n <= 55) ? "msq" : "numeric";
  return Array.from({ length: 65 }, (_, i) => {
    const n = i + 1;
    const format = formatOf(n) as "mcq" | "msq" | "numeric";
    return {
      id: `q${n}`,
      sourceRow: n,
      questionNumber: String(n),
      subjectName: n <= 10 ? "General Aptitude" : GATE_CS_SUBJECTS[1 + (n % 10)],
      format,
      answer:
        format === "numeric" ? { kind: "numeric", value: n } : format === "msq" ? { kind: "msq", labels: ["A", "C"] } : { kind: "mcq", label: "B" },
    };
  });
}

describe("a built GATE mock", () => {
  const snap = buildMockPaper(gatePaper(), gateNoPenalty(paperRows()), { year: 2026, month: null, slug: "gate-cs-2026-cs1" });
  const q = (n: number) => snap.questions.find((x) => x.questionId === `q${n}`)!;

  it("keeps the printed order and all 65 questions", () => {
    expect(snap.questions.map((x) => x.questionId)).toEqual(Array.from({ length: 65 }, (_, i) => `q${i + 1}`));
  });

  it("penalises only MCQs; an MSQ or NAT costs nothing when wrong", () => {
    // negMarks carries the section's `wrong`, negative (the builder's convention).
    expect([q(3).marks, q(3).negMarks]).toEqual([1, -THIRD]);
    expect([q(40).marks, q(40).negMarks]).toEqual([2, -2 * THIRD]);
    expect([q(25).marks, q(25).negMarks, q(25).msqScheme]).toEqual([1, 0, "exact"]);
    expect([q(60).marks, q(60).negMarks]).toEqual([2, 0]);
  });
});

describe("deriveGateSittings", () => {
  it("names each paper's source file, slug and title", () => {
    expect(deriveGateSittings(["2026-cs2", "2024-cs1"])).toEqual([
      { key: "2024-cs1", year: 2024, sourceFile: "GATE CS 2024 Set 1 (IISc Bengaluru)", slug: "gate-cs-2024-cs1", title: "GATE CS 2024 Set 1" },
      { key: "2026-cs2", year: 2026, sourceFile: "GATE CS 2026 Set 2 (IIT Guwahati)", slug: "gate-cs-2026-cs2", title: "GATE CS 2026 Set 2" },
    ]);
  });
});
