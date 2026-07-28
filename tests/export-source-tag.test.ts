import { describe, it, expect } from "vitest";
import { formatSourceTag } from "@/lib/export/sourceTag";

describe("formatSourceTag", () => {
  it("renders exam name + PYQ year in square brackets", () => {
    expect(
      formatSourceTag({ exam: { id: "e", name: "JEE Mains" }, pyqYear: 2016 })
    ).toBe("[JEE Mains 2016]");
  });

  it("is uniform across exams — no per-exam session/month detail", () => {
    expect(
      formatSourceTag({ exam: { id: "e", name: "NDA" }, pyqYear: 2023 })
    ).toBe("[NDA 2023]");
    expect(
      formatSourceTag({ exam: { id: "e", name: "MHT-CET" }, pyqYear: 2025 })
    ).toBe("[MHT-CET 2025]");
    expect(
      formatSourceTag({
        exam: { id: "e", name: "Maharashtra State Board Class 10" },
        pyqYear: 2019,
      })
    ).toBe("[Maharashtra State Board Class 10 2019]");
  });

  // pyq_year is non-null on exactly the question_kind='pyq' rows and null on
  // exactly the practice rows (verified bank-wide 2026-07-28), so a null year
  // IS the "not a past-year question" signal. A practice question must never
  // be attributed to an exam sitting it never appeared in.
  it("returns null when there is no PYQ year (practice questions)", () => {
    expect(
      formatSourceTag({ exam: { id: "e", name: "NDA" }, pyqYear: null })
    ).toBeNull();
  });

  it("returns null when the exam name is missing or blank", () => {
    expect(
      formatSourceTag({ exam: { id: "e", name: "" }, pyqYear: 2016 })
    ).toBeNull();
    expect(
      formatSourceTag({ exam: { id: "e", name: "   " }, pyqYear: 2016 })
    ).toBeNull();
  });

  it("trims stray whitespace in the exam name", () => {
    expect(
      formatSourceTag({ exam: { id: "e", name: "  NEET  " }, pyqYear: 2024 })
    ).toBe("[NEET 2024]");
  });
});
