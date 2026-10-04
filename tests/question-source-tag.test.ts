import { describe, it, expect } from "vitest";
import { sourceTag } from "../src/lib/questions/sourceTag";

/**
 * The tag at the top of a bank question card (2026-10-04 card redesign). It
 * replaces the bracketed footer ("[Q31 · Sep · 2026]") and says at a glance
 * which of three kinds a question is, because they must not be confused:
 *
 *   - a PAST PAPER question (the product's promise): exam, sitting, number;
 *   - a TEXTBOOK exercise (CBSE = NCERT, Maharashtra boards = Balbharati);
 *   - a PRACTICE SET question, which has only a number inside its set. The
 *     old footer printed that as "[Q17]", which reads as question 17 of a real
 *     paper. The tag never shows it.
 *
 * The sitting follows formatProvenance's rule: NDA by month (Apr = NDA I,
 * Sep = NDA II), every other exam by its pyq_note (day and shift).
 */
const base = { questionKind: "pyq" as const, pyqYear: null, pyqMonth: null, pyqNote: null, questionNumber: null };

describe("sourceTag: past papers", () => {
  it("NDA: exam, month and year, question number", () => {
    expect(sourceTag({ ...base, exam: { name: "NDA" }, pyqYear: 2026, pyqMonth: "Sep", pyqNote: "NDA 2", questionNumber: "31" }))
      .toEqual({ kind: "pyq", label: "NDA · Sep 2026 · Q31" });
  });

  it("other exams: year, then the sitting note, then the number", () => {
    expect(sourceTag({ ...base, exam: { name: "MHT-CET" }, pyqYear: 2025, pyqNote: "19 April Shift I", questionNumber: "115" }))
      .toEqual({ kind: "pyq", label: "MHT-CET · 2025 · 19 April Shift I · Q115" });
  });

  it("keeps a descriptive board-paper reference as printed", () => {
    expect(sourceTag({ ...base, exam: { name: "Maharashtra HSC Class 12" }, pyqYear: 2019, questionNumber: "Q.3 (ii)" }).label)
      .toBe("Maharashtra HSC Class 12 · 2019 · Q.3 (ii)");
  });

  it("drops whatever is missing rather than printing a gap", () => {
    expect(sourceTag({ ...base, exam: { name: "CDS" }, pyqYear: 2024 }).label).toBe("CDS · 2024");
  });

  it("treats a row with no kind as a past paper (the column defaults to pyq)", () => {
    expect(sourceTag({ ...base, questionKind: undefined, exam: { name: "NEET" }, pyqYear: 2023, questionNumber: "12" }).kind).toBe("pyq");
  });
});

describe("sourceTag: textbook and practice", () => {
  it("CBSE practice rows are NCERT textbook exercises", () => {
    expect(sourceTag({ ...base, questionKind: "practice", exam: { name: "CBSE Class 12" }, questionNumber: "Ex 4.4 Q18" }))
      .toEqual({ kind: "textbook", label: "NCERT textbook · Ex 4.4 Q18" });
  });

  it("Maharashtra board practice rows are Balbharati textbook exercises", () => {
    expect(sourceTag({ ...base, questionKind: "practice", exam: { name: "Maharashtra State Board Class 10" }, questionNumber: "PS3 Q.20" }))
      .toEqual({ kind: "textbook", label: "Balbharati textbook · PS3 Q.20" });
  });

  it("other practice rows are practice questions, with no number that could pass for a paper's", () => {
    expect(sourceTag({ ...base, questionKind: "practice", exam: { name: "NDA" }, questionNumber: "17" }))
      .toEqual({ kind: "practice", label: "Practice question" });
    expect(sourceTag({ ...base, questionKind: "practice", exam: { name: "Worksheets - 11th+12th" }, questionNumber: "03-29" }).label)
      .toBe("Practice question");
  });
});
