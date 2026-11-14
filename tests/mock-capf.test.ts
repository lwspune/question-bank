import { describe, expect, it } from "vitest";
import { CAPF_PAPER_1, getBlueprint, totalMarks, totalQuestions } from "@/lib/mocks/blueprints";
import { CAPF_MOCK_YEARS, capfSittings, deriveCapfSittings } from "../scripts/mocks/capfSittings";
import { PAPERS, SUBJECTS } from "../scripts/capf/config";

/**
 * UPSC CAPF (AC) Paper I mocks: one per year, the paper as UPSC sets it: 125
 * questions in one section (the booklet prints no subject headings, so the mock
 * keeps the printed order), 2 hours, +2 for a right answer and -2/3 for a wrong
 * one. A dropped or defective question rides as grace (src/lib/mocks/flawed.json),
 * so every mock is 125 questions.
 */
describe("CAPF Paper I blueprint", () => {
  it("is 125 questions, 250 marks, 120 minutes, +2 / -2/3", () => {
    expect(totalQuestions(CAPF_PAPER_1)).toBe(125);
    expect(totalMarks(CAPF_PAPER_1)).toBe(250);
    expect(CAPF_PAPER_1.durationSecs).toBe(120 * 60);
    expect(CAPF_PAPER_1.marking).toEqual({ correct: 2, wrong: -0.6667 });
  });

  it("is ONE section carrying every catalog subject, so the mock keeps UPSC's printed order", () => {
    expect(CAPF_PAPER_1.sections).toHaveLength(1);
    expect(CAPF_PAPER_1.sections[0].count).toBe(125);
    expect([...CAPF_PAPER_1.sections[0].subjects].sort()).toEqual([...SUBJECTS()].sort());
  });

  it("resolves through getBlueprint", () => {
    expect(getBlueprint("capf-ac", "paper-1")).toBe(CAPF_PAPER_1);
  });
});

describe("CAPF sittings: one mock per committed year", () => {
  it("lists all nine committed years, 2018-2026", () => {
    expect([...CAPF_MOCK_YEARS].sort()).toEqual(["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"]);
    expect(capfSittings()).toHaveLength(9);
  });

  it("names a year's paper by its source file, slug and title", () => {
    expect(deriveCapfSittings([PAPERS["2024"]])).toEqual([
      {
        key: "2024",
        year: 2024,
        sourceFile: "CAPF_2024_PaperI_GAI.pdf",
        slug: "capf-ac-paper-1-2024",
        title: "UPSC CAPF (AC) 2024 Paper I: General Ability and Intelligence",
      },
    ]);
  });

  it("graces the item UPSC dropped (2026 Q41, keyless), so the paper still builds whole", () => {
    const s2026 = capfSittings().find((s) => s.year === 2026)!;
    expect(s2026.prepare).toBeDefined();
    const rows = [{ questionNumber: "40" }, { questionNumber: "41" }] as unknown as Parameters<NonNullable<typeof s2026.prepare>>[0];
    const out = s2026.prepare!(rows) as unknown as { questionNumber: string; grace?: boolean }[];
    expect(out.find((r) => r.questionNumber === "41")?.grace).toBe(true);
    expect(out.find((r) => r.questionNumber === "40")?.grace).toBeUndefined();
  });

  it("orders years oldest first", () => {
    const years = capfSittings().map((s) => s.year);
    expect(years).toEqual([...years].sort((a, b) => a - b));
  });
});
