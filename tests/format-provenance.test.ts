/**
 * Provenance bracket — `[Q{num} · {disambiguator} · {year}]` for the
 * /browse QuestionCard footer. Helps teachers cross-reference a bank
 * question against the source PYQ paper.
 *
 * Exam-aware disambiguator:
 * - NDA: month (Apr → NDA 1, Sep → NDA 2 — canonical convention enforced
 *   by the 2026-05-26 metadata cleanup; pyq_note is structurally
 *   redundant for NDA so we drop it from the render).
 * - Anything else (MHT-CET today): pyq_note, which carries the day +
 *   shift disambiguator (e.g. "10th May Shift 1" — May 2024 has 14
 *   distinct papers, note is load-bearing).
 */
import { describe, it, expect } from "vitest";
import { formatProvenance } from "@/lib/questions/formatProvenance";

describe("formatProvenance", () => {
  it("renders NDA: Q# · month · year (drops note)", () => {
    expect(
      formatProvenance({
        examName: "NDA",
        questionNumber: "95",
        pyqYear: 2025,
        pyqMonth: "Apr",
        pyqNote: "NDA 1",
      })
    ).toBe("Q95 · Apr · 2025");
  });

  it("renders MHT-CET: Q# · note · year (note carries day+shift)", () => {
    expect(
      formatProvenance({
        examName: "MHT-CET",
        questionNumber: "95",
        pyqYear: 2024,
        pyqMonth: "May",
        pyqNote: "10th May Shift 1",
      })
    ).toBe("Q95 · 10th May Shift 1 · 2024");
  });

  it("omits Q# when question_number is null (150 MHT-CET seed batch)", () => {
    expect(
      formatProvenance({
        examName: "MHT-CET",
        questionNumber: null,
        pyqYear: 2024,
        pyqMonth: "May",
        pyqNote: "10th May Shift 1",
      })
    ).toBe("10th May Shift 1 · 2024");
  });

  it("returns just Q# when only question_number present (defensive)", () => {
    expect(
      formatProvenance({
        examName: "NDA",
        questionNumber: "42",
        pyqYear: null,
        pyqMonth: null,
        pyqNote: null,
      })
    ).toBe("Q42");
  });

  it("returns null when no fields are present", () => {
    expect(
      formatProvenance({
        examName: null,
        questionNumber: null,
        pyqYear: null,
        pyqMonth: null,
        pyqNote: null,
      })
    ).toBeNull();
  });

  it("unknown exam falls back to non-NDA path (uses note)", () => {
    // Future exam (e.g. JEE Main) — same shape as MHT-CET: use pyq_note
    // as the disambiguator. NDA-specific rule only applies to NDA.
    expect(
      formatProvenance({
        examName: "JEE Main",
        questionNumber: "12",
        pyqYear: 2025,
        pyqMonth: "Jan",
        pyqNote: "Session 1 Shift 2",
      })
    ).toBe("Q12 · Session 1 Shift 2 · 2025");
  });

  it("NDA without pyqMonth: skips disambiguator (defensive — shouldn't happen post-cleanup)", () => {
    expect(
      formatProvenance({
        examName: "NDA",
        questionNumber: "1",
        pyqYear: 2020,
        pyqMonth: null,
        pyqNote: "NDA 1",
      })
    ).toBe("Q1 · 2020");
  });

  it("MHT-CET without pyqNote: skips disambiguator (defensive)", () => {
    expect(
      formatProvenance({
        examName: "MHT-CET",
        questionNumber: "1",
        pyqYear: 2024,
        pyqMonth: "May",
        pyqNote: null,
      })
    ).toBe("Q1 · 2024");
  });

  it("null examName treats as non-NDA (falls back to note path)", () => {
    expect(
      formatProvenance({
        examName: null,
        questionNumber: "5",
        pyqYear: 2024,
        pyqMonth: "May",
        pyqNote: "Shift 1",
      })
    ).toBe("Q5 · Shift 1 · 2024");
  });
});
