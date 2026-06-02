/**
 * Pure unit tests for the concept-report category enum + validators.
 * Mirrors the question-report types; the status enum is reused from
 * src/lib/reports/types (open/in-review/resolved/wont-fix/duplicate).
 */
import { describe, it, expect } from "vitest";
import {
  CONCEPT_REPORT_CATEGORIES,
  CONCEPT_REPORT_CATEGORY_LABELS,
  isConceptReportCategory,
  type ConceptReportCategory,
} from "@/lib/notes-reports/types";

describe("concept-report types", () => {
  it("exposes the six categories", () => {
    expect(CONCEPT_REPORT_CATEGORIES).toEqual([
      "incorrect-content",
      "confusing-explanation",
      "typo-or-formatting",
      "broken-visualization",
      "wrong-example",
      "other",
    ]);
  });

  it("has a human label for every category", () => {
    for (const c of CONCEPT_REPORT_CATEGORIES) {
      const label = CONCEPT_REPORT_CATEGORY_LABELS[c];
      expect(typeof label).toBe("string");
      expect(label.length).toBeGreaterThan(0);
    }
  });

  it("isConceptReportCategory accepts valid values", () => {
    for (const c of CONCEPT_REPORT_CATEGORIES) {
      expect(isConceptReportCategory(c)).toBe(true);
    }
  });

  it("isConceptReportCategory rejects junk + question-only categories", () => {
    const bad: unknown[] = [
      "wrong-answer", // a question category, not a concept one
      "broken-image",
      "",
      null,
      undefined,
      42,
      {},
    ];
    for (const b of bad) {
      expect(isConceptReportCategory(b)).toBe(false);
    }
  });

  it("category type is assignable from the const array", () => {
    const c: ConceptReportCategory = "incorrect-content";
    expect(isConceptReportCategory(c)).toBe(true);
  });
});
