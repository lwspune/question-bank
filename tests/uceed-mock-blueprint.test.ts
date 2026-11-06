import { describe, expect, it } from "vitest";
import { answerKeyFromRow } from "@/lib/mocks/answers";
import { UCEED_SUBJECTS, uceedPaper, totalMarks } from "@/lib/mocks/blueprints";
import { assignSection, buildMockPaper, validatePaperRows, type PaperQuestionRow } from "@/lib/mocks/reconstruct";

const opts = (correct: string[]) => ["A", "B", "C", "D"].map((label) => ({ label, is_correct: correct.includes(label) }));

describe("answerKeyFromRow: the one reading of a question's key, for the build and the grader", () => {
  it("reads an MCQ's letter", () => {
    expect(answerKeyFromRow({ question_format: "mcq", options: opts(["C"]) })).toEqual({ kind: "mcq", label: "C" });
    expect(answerKeyFromRow({ question_format: null, options: opts(["A"]) })).toEqual({ kind: "mcq", label: "A" });
  });

  it("reads every correct option of a multiple-select question, in order", () => {
    expect(answerKeyFromRow({ question_format: "msq", options: opts(["D", "A"]) })).toEqual({ kind: "msq", labels: ["A", "D"] });
  });

  it("reads a numeric value, and a range when a max is stored", () => {
    expect(answerKeyFromRow({ question_format: "numeric", numeric_answer: 12, options: [] })).toEqual({ kind: "numeric", value: 12 });
    expect(answerKeyFromRow({ question_format: "numeric", numeric_answer: "132.8", numeric_answer_max: "133.1", options: [] })).toEqual({
      kind: "numeric",
      value: 132.8,
      max: 133.1,
    });
  });

  it("returns null when there is no key, never a guess", () => {
    expect(answerKeyFromRow({ question_format: "mcq", options: opts([]) })).toBeNull();
    expect(answerKeyFromRow({ question_format: "msq", options: opts([]) })).toBeNull();
    expect(answerKeyFromRow({ question_format: "numeric", numeric_answer: null, options: [] })).toBeNull();
  });
});

describe("uceedPaper: Part A as each year's paper prints it", () => {
  it("2019: 20 NAT +3, 20 MSQ +3/-0.19 all-or-nothing, 45 MCQ +4/-1.32, 3 hours, 300 marks", () => {
    const bp = uceedPaper(2019);
    expect(bp.durationSecs).toBe(180 * 60);
    expect(bp.sections.map((s) => [s.key, s.count, s.marking, s.msqScheme])).toEqual([
      ["nat", 20, { correct: 3, wrong: 0 }, undefined],
      ["msq", 20, { correct: 3, wrong: -0.19 }, "exact"],
      ["mcq", 45, { correct: 4, wrong: -1.32 }, undefined],
    ]);
    expect(totalMarks(bp)).toBe(300);
  });

  it("2020 and 2021: MSQ still all-or-nothing at -0.19; 150 minutes; 240 marks", () => {
    for (const y of [2020, 2021]) {
      const bp = uceedPaper(y);
      expect(bp.durationSecs).toBe(150 * 60);
      expect(bp.sections.find((s) => s.key === "msq")).toMatchObject({ count: 18, marking: { correct: 4, wrong: -0.19 }, msqScheme: "exact" });
      expect(totalMarks(bp)).toBe(240);
    }
  });

  it("2022 and 2023: partial credit, -1 otherwise (2022 prints no scheme; owner chose 2023's)", () => {
    for (const y of [2022, 2023]) {
      expect(uceedPaper(y).sections.find((s) => s.key === "msq")).toMatchObject({ marking: { correct: 4, wrong: -1 }, msqScheme: "partial" });
    }
  });

  it("2024 to 2026: 14 / 15 / 28 questions, two hours, 200 marks", () => {
    for (const y of [2024, 2025, 2026]) {
      const bp = uceedPaper(y);
      expect(bp.sections.map((s) => s.count)).toEqual([14, 15, 28]);
      expect(bp.durationSecs).toBe(120 * 60);
      expect(totalMarks(bp)).toBe(200);
    }
  });

  it("2015: 20 NAT +3/-1, 30 MSQ +3 all-or-nothing with no penalty, 50 MCQ +3/-1, 3 hours, 300 marks", () => {
    const bp = uceedPaper(2015);
    expect(bp.durationSecs).toBe(180 * 60);
    expect(bp.sections.map((s) => [s.key, s.count, s.marking, s.msqScheme])).toEqual([
      ["nat", 20, { correct: 3, wrong: -1 }, undefined],
      ["msq", 30, { correct: 3, wrong: 0 }, "exact"],
      ["mcq", 50, { correct: 3, wrong: -1 }, undefined],
    ]);
    expect(totalMarks(bp)).toBe(300);
  });

  it("2016: 20 NAT +4/-1, 20 MSQ +5/-0.5 all-or-nothing, 40 MCQ +3/-1, 300 marks", () => {
    const bp = uceedPaper(2016);
    expect(bp.durationSecs).toBe(180 * 60);
    expect(bp.sections.map((s) => [s.key, s.count, s.marking, s.msqScheme])).toEqual([
      ["nat", 20, { correct: 4, wrong: -1 }, undefined],
      ["msq", 20, { correct: 5, wrong: -0.5 }, "exact"],
      ["mcq", 40, { correct: 3, wrong: -1 }, undefined],
    ]);
    expect(totalMarks(bp)).toBe(300);
  });

  it("2017 and 2018: 20 NAT +4, 25 MSQ +4 all-or-nothing, neither penalised; 40 MCQ +3/-1; 300 marks", () => {
    for (const y of [2017, 2018]) {
      const bp = uceedPaper(y);
      expect(bp.durationSecs).toBe(180 * 60);
      expect(bp.sections.map((s) => [s.key, s.count, s.marking, s.msqScheme])).toEqual([
        ["nat", 20, { correct: 4, wrong: 0 }, undefined],
        ["msq", 25, { correct: 4, wrong: 0 }, "exact"],
        ["mcq", 40, { correct: 3, wrong: -1 }, undefined],
      ]);
      expect(totalMarks(bp)).toBe(300);
    }
  });

  it("has no paper before 2015 or after 2026", () => {
    expect(() => uceedPaper(2014)).toThrow();
    expect(() => uceedPaper(2027)).toThrow();
  });
});

function rows(nat: number, msq: number, mcq: number): PaperQuestionRow[] {
  const out: PaperQuestionRow[] = [];
  let n = 0;
  const add = (format: "numeric" | "msq" | "mcq", count: number) => {
    for (let i = 0; i < count; i++) {
      n++;
      out.push({
        id: `q${n}`,
        sourceRow: n,
        questionNumber: String(n),
        subjectName: UCEED_SUBJECTS[n % UCEED_SUBJECTS.length],
        format,
        answer:
          format === "numeric" ? { kind: "numeric", value: n } : format === "msq" ? { kind: "msq", labels: ["A", "C"] } : { kind: "mcq", label: "B" },
      });
    }
  };
  add("numeric", nat);
  add("msq", msq);
  add("mcq", mcq);
  return out;
}

describe("UCEED sections are picked by question type, not subject", () => {
  it("puts a row in the section of its format", () => {
    const bp = uceedPaper(2023);
    expect(assignSection(bp, "Language", null, "msq")).toBe("msq");
    expect(assignSection(bp, "Language", null, "numeric")).toBe("nat");
    expect(assignSection(bp, "Language", null, "mcq")).toBe("mcq");
  });

  it("places no row whose format is unknown, rather than guessing a section", () => {
    expect(assignSection(uceedPaper(2023), "Language", null)).toBeNull();
  });

  it("a cancelled MCQ (no key, grace) still lands in the MCQ section by its format", () => {
    const r = rows(18, 18, 32);
    r[40] = { ...r[40], answer: null, grace: true };
    expect(validatePaperRows(uceedPaper(2023), r)).toEqual([]);
  });
});

describe("buildMockPaper stamps each section's marking and the MSQ scheme", () => {
  it("2023: NAT +4/0, MSQ +4/-1 partial, MCQ +3/-0.71, in the paper's order", () => {
    const paper = buildMockPaper(uceedPaper(2023), rows(18, 18, 32), { year: 2023, month: null });
    const q = (pos: number) => paper.questions[pos - 1];
    expect(q(1)).toMatchObject({ sectionKey: "nat", marks: 4, negMarks: 0 });
    expect(q(1).msqScheme).toBeUndefined();
    expect(q(19)).toMatchObject({ sectionKey: "msq", marks: 4, negMarks: -1, msqScheme: "partial" });
    expect(q(37)).toMatchObject({ sectionKey: "mcq", marks: 3, negMarks: -0.71 });
    expect(q(37).msqScheme).toBeUndefined();
  });

  it("2020: the MSQ scheme is all-or-nothing", () => {
    const paper = buildMockPaper(uceedPaper(2020), rows(18, 18, 32), { year: 2020, month: null });
    expect(paper.questions[18]).toMatchObject({ sectionKey: "msq", negMarks: -0.19, msqScheme: "exact" });
  });
});

describe("UCEED in the blueprint registry", () => {
  it("getBlueprint names the paper for the catalogue", async () => {
    const { getBlueprint } = await import("@/lib/mocks/blueprints");
    expect(getBlueprint("uceed", "part-a")?.paperLabel).toBe("Part A");
  });

  it("a paper's total marks sum each section's own marking", () => {
    const paper = buildMockPaper(uceedPaper(2019), rows(20, 20, 45), { year: 2019, month: null });
    expect(paper.totalMarks).toBe(300);
  });
});
