import { describe, expect, it } from "vitest";
import { ENEM_DAY_2, getBlueprint, totalMarks, totalQuestions } from "@/lib/mocks/blueprints";
import { ENEM_MOCK_YEARS, deriveEnemSittings, enemSittings } from "../scripts/mocks/enemSittings";
import { SUBJECT_NAMES } from "../scripts/enem/lib";

/**
 * ENEM mocks: one per year, the whole Day 2 booklet as INEP prints it: 90
 * questions in 5 hours, Ciências da Natureza (Q91-135) then Matemática
 * (Q136-180). ENEM's real score is IRT, which a mock cannot reproduce, so a
 * mock scores raw correct answers (+1, nothing off). A question INEP cancelled
 * (its key "Anulado", loaded keyless) rides as grace, so every mock is 90.
 */
describe("ENEM Day 2 blueprint", () => {
  it("is 90 questions, 90 marks, 5 hours, +1 / 0, five options", () => {
    expect(totalQuestions(ENEM_DAY_2)).toBe(90);
    expect(totalMarks(ENEM_DAY_2)).toBe(90);
    expect(ENEM_DAY_2.durationSecs).toBe(300 * 60);
    expect(ENEM_DAY_2.marking).toEqual({ correct: 1, wrong: 0 });
    expect(ENEM_DAY_2.optionCount).toBe(5);
  });

  it("is Natureza (Física, Química, Biologia) then Matemática, 45 each, in printed order", () => {
    expect(ENEM_DAY_2.sections.map((s) => [s.label, s.count])).toEqual([
      ["Ciências da Natureza e suas Tecnologias", 45],
      ["Matemática e suas Tecnologias", 45],
    ]);
    expect([...ENEM_DAY_2.sections[0].subjects].sort()).toEqual(
      [SUBJECT_NAMES.fisica, SUBJECT_NAMES.quimica, SUBJECT_NAMES.biologia].sort()
    );
    expect(ENEM_DAY_2.sections[1].subjects).toEqual([SUBJECT_NAMES.matematica]);
  });

  it("names the exam as the bank's exam row and resolves through getBlueprint", () => {
    expect(ENEM_DAY_2.examName).toBe("ENEM");
    expect(getBlueprint("enem", "day-2")).toBe(ENEM_DAY_2);
  });
});

describe("ENEM sittings: one mock per committed year", () => {
  it("lists the five committed years, 2021-2025, oldest first", () => {
    expect([...ENEM_MOCK_YEARS]).toEqual([2021, 2022, 2023, 2024, 2025]);
    expect(enemSittings().map((s) => s.year)).toEqual([2021, 2022, 2023, 2024, 2025]);
  });

  it("names a year's paper by its source file, slug and title", () => {
    const [s] = deriveEnemSittings([2024], () => ({ sourceFile: "2024_PV_impresso_D2_CD7.pdf", cancelled: [129] }));
    expect(s).toMatchObject({
      key: "2024",
      year: 2024,
      sourceFile: "2024_PV_impresso_D2_CD7.pdf",
      slug: "enem-2024",
      title: "ENEM 2024: Ciências da Natureza e Matemática",
    });
  });

  it("graces every question INEP cancelled (read from the committed key), and nothing else", () => {
    const s2025 = enemSittings().find((s) => s.year === 2025)!;
    const rows = ["122", "123", "132", "174", "175"].map((n) => ({ questionNumber: n })) as unknown as Parameters<
      NonNullable<typeof s2025.prepare>
    >[0];
    const out = s2025.prepare!(rows) as unknown as { questionNumber: string; grace?: boolean }[];
    expect(out.filter((r) => r.grace).map((r) => r.questionNumber)).toEqual(["123", "132", "174"]);
  });

  it("has a cancelled question in every year 2021-2025 (one each, three in 2025)", () => {
    const graced = enemSittings().map((s) => {
      const rows = Array.from({ length: 90 }, (_, i) => ({ questionNumber: String(91 + i) })) as unknown as Parameters<
        NonNullable<typeof s.prepare>
      >[0];
      return (s.prepare!(rows) as unknown as { grace?: boolean }[]).filter((r) => r.grace).length;
    });
    expect(graced).toEqual([1, 1, 1, 1, 3]);
  });
});
