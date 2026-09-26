import { describe, it, expect } from "vitest";
import { JIPMAT_PAPER, getBlueprint, sectionMarking, totalMarks, totalQuestions } from "../src/lib/mocks/blueprints";
import { isGrace, jipmatSittings, sectionSuffixOf } from "../scripts/mocks/ipmatSittings";

describe("JIPMAT_PAPER", () => {
  it("is registered so getBlueprint can find it", () => {
    expect(getBlueprint("jipmat", "paper")).toBe(JIPMAT_PAPER);
  });

  it("is 100 questions: 33 QA + 33 DILR + 34 VARC, 400 marks", () => {
    expect(JIPMAT_PAPER.sections.map((s) => s.count)).toEqual([33, 33, 34]);
    expect(totalQuestions(JIPMAT_PAPER)).toBe(100);
    expect(totalMarks(JIPMAT_PAPER)).toBe(400);
  });

  it("runs 150 minutes on one clock with +4 / -1 in every section", () => {
    expect(JIPMAT_PAPER.durationSecs).toBe(150 * 60);
    for (const s of JIPMAT_PAPER.sections) {
      expect(sectionMarking(JIPMAT_PAPER, s)).toEqual({ correct: 4, wrong: -1 });
    }
  });

  it("identifies each section by its source_file suffix", () => {
    expect(JIPMAT_PAPER.sections.map((s) => s.sourceFileSuffix)).toEqual(["QA", "LR", "VA"]);
  });
});

describe("sectionSuffixOf", () => {
  it("reads the JIPMAT suffixes as well as Indore's", () => {
    expect(sectionSuffixOf("ipmat/jipmat-2021-QA")).toBe("QA");
    expect(sectionSuffixOf("ipmat/jipmat-2023-LR")).toBe("LR");
    expect(sectionSuffixOf("ipmat/ipmat-indore-2024-MCQ")).toBe("MCQ");
  });
});

describe("jipmatSittings", () => {
  const all = jipmatSittings();
  const by = (y: number) => all.find((s) => s.year === y)!;

  it("covers 2021-2026, each sitting three files", () => {
    expect(all.map((s) => s.year)).toEqual([2021, 2022, 2023, 2024, 2025, 2026]);
    expect(by(2022).sourceFile).toBe("ipmat/jipmat-2022-QA");
    expect(by(2022).extraFiles).toEqual(["ipmat/jipmat-2022-LR", "ipmat/jipmat-2022-VA"]);
    expect(by(2022).slug).toBe("jipmat-2022");
    expect(by(2022).title).toBe("JIPMAT 2022");
  });

  it("graces the questions JIPMAT dropped, by section AND number", () => {
    expect(isGrace(by(2021).grace, "ipmat/jipmat-2021-QA", "24")).toBe(true);
    expect(isGrace(by(2021).grace, "ipmat/jipmat-2021-LR", "24")).toBe(false);
    for (const n of ["2", "3", "4"]) expect(isGrace(by(2023).grace, "ipmat/jipmat-2023-LR", n)).toBe(true);
    expect(isGrace(by(2023).grace, "ipmat/jipmat-2023-QA", "2")).toBe(false);
  });

  it("holds 2025 and 2026, whose rows are excluded or rebuilt from recall", () => {
    expect(by(2025).hold).toMatch(/2025/);
    expect(by(2026).hold).toMatch(/2026/);
    expect(all.filter((s) => !s.hold).map((s) => s.year)).toEqual([2021, 2022, 2023, 2024]);
  });
});
