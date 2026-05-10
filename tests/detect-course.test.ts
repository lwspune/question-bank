import { describe, expect, it } from "vitest";
import { detectCourse } from "@/lib/upload/detectCourse";
import type { ParsedRow } from "@/lib/upload/parser";

function makeRow(course: string | undefined, sourceRow = 2): ParsedRow {
  return {
    sourceRow,
    course,
    subject: "Physics",
    chapter: "Kinematics",
    question: "q",
    optionA: "a",
    optionB: "b",
    optionC: "c",
    optionD: "d",
    answer: "A",
    difficulty: "EASY",
  };
}

describe("detectCourse", () => {
  it("returns 'none' when no row has a course value", () => {
    const result = detectCourse([
      makeRow(undefined),
      makeRow(""),
      makeRow("   "),
    ]);
    expect(result).toEqual({ kind: "none" });
  });

  it("returns 'none' for an empty rows array", () => {
    expect(detectCourse([])).toEqual({ kind: "none" });
  });

  it("returns 'uniform' with the original casing when all rows agree", () => {
    const result = detectCourse([
      makeRow("NDA"),
      makeRow("NDA"),
      makeRow("NDA"),
    ]);
    expect(result).toEqual({ kind: "uniform", value: "NDA" });
  });

  it("ignores rows with empty/whitespace course (treats as agreeing)", () => {
    const result = detectCourse([
      makeRow("NDA"),
      makeRow(""),
      makeRow(undefined),
      makeRow("NDA"),
    ]);
    expect(result).toEqual({ kind: "uniform", value: "NDA" });
  });

  it("trims surrounding whitespace before comparing", () => {
    const result = detectCourse([
      makeRow("  NDA"),
      makeRow("NDA  "),
      makeRow(" NDA "),
    ]);
    expect(result.kind).toBe("uniform");
    if (result.kind === "uniform") expect(result.value).toBe("NDA");
  });

  it("treats different casings as the same value (preserves first occurrence's casing)", () => {
    const result = detectCourse([
      makeRow("NDA"),
      makeRow("nda"),
      makeRow("Nda"),
    ]);
    expect(result).toEqual({ kind: "uniform", value: "NDA" });
  });

  it("returns 'mixed' with distinct values when rows disagree", () => {
    const result = detectCourse([
      makeRow("NDA"),
      makeRow("MHT-CET"),
    ]);
    expect(result.kind).toBe("mixed");
    if (result.kind === "mixed")
      expect(result.values.sort()).toEqual(["MHT-CET", "NDA"]);
  });

  it("dedupes mixed values case-insensitively (returns canonical first-seen casing)", () => {
    const result = detectCourse([
      makeRow("NDA"),
      makeRow("nda"),
      makeRow("MHT-CET"),
      makeRow("mht-cet"),
    ]);
    expect(result.kind).toBe("mixed");
    if (result.kind === "mixed") {
      expect(result.values.length).toBe(2);
      expect(result.values.sort()).toEqual(["MHT-CET", "NDA"]);
    }
  });

  it("treats blanks among mixed rows as not-conflicting (still mixed because the populated rows disagree)", () => {
    const result = detectCourse([
      makeRow("NDA"),
      makeRow(""),
      makeRow("MHT-CET"),
      makeRow(undefined),
    ]);
    expect(result.kind).toBe("mixed");
  });
});
