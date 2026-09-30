import { describe, expect, it } from "vitest";
import { buildJeeMatrix, perPaper, windowPerPaper } from "../src/lib/guide/jeeTrendsMatrix";

const row = (pyq_year: number | null, chapter: string, numeric = false) => ({
  pyq_year,
  chapter,
  question_format: numeric ? "numeric" : "mcq",
});

describe("buildJeeMatrix", () => {
  it("counts chapters by year, heaviest chapter first", () => {
    const m = buildJeeMatrix(
      [row(2021, "Conic Sections"), row(2021, "Conic Sections"), row(2022, "Conic Sections"), row(2022, "Matrices")],
      { fromYear: 2021 }
    );
    expect(m.years).toEqual([
      { year: 2021, total: 2 },
      { year: 2022, total: 2 },
    ]);
    expect(m.rows).toEqual([
      { chapter: "Conic Sections", total: 3, numeric: 0, counts: [2, 1] },
      { chapter: "Matrices", total: 1, numeric: 0, counts: [0, 1] },
    ]);
  });

  it("reports rows before fromYear or without a year instead of placing them", () => {
    const m = buildJeeMatrix([row(2019, "Matrices"), row(null, "Matrices"), row(2021, "Matrices")], { fromYear: 2021 });
    expect(m.excluded).toBe(2);
    expect(m.years).toEqual([{ year: 2021, total: 1 }]);
  });

  it("counts numeric-answer rows per chapter", () => {
    const m = buildJeeMatrix([row(2025, "Probability", true), row(2025, "Probability")], { fromYear: 2021 });
    expect(m.rows[0]).toMatchObject({ chapter: "Probability", total: 2, numeric: 1 });
  });

  it("breaks count ties by chapter name", () => {
    const m = buildJeeMatrix([row(2021, "Statistics"), row(2021, "Matrices")], { fromYear: 2021 });
    expect(m.rows.map((r) => r.chapter)).toEqual(["Matrices", "Statistics"]);
  });
});

describe("perPaper", () => {
  it("scales a share of the year's questions to a 25-question paper", () => {
    expect(perPaper(5, 100)).toBe(1.25);
  });

  it("rounds half up, not half to even", () => {
    // 1/8 of 25 = 3.125 -> 3.13
    expect(perPaper(1, 8)).toBe(3.13);
  });

  it("is 0 when the year has no questions", () => {
    expect(perPaper(0, 0)).toBe(0);
  });
});

describe("windowPerPaper", () => {
  it("pools counts and totals across the window's years before scaling", () => {
    const years = [
      { year: 2024, total: 100 },
      { year: 2025, total: 50 },
      { year: 2026, total: 50 },
    ];
    // 2025-26: (3 + 1) / (50 + 50) * 25 = 1.0
    expect(windowPerPaper([10, 3, 1], years, 2025, 2026)).toBe(1);
    // 2024-26: 14 / 200 * 25 = 1.75
    expect(windowPerPaper([10, 3, 1], years, 2024, 2026)).toBe(1.75);
  });
});
