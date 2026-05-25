/**
 * Pure-helper tests for stripPassageCountPhrase.
 *
 * The export's set banner already names the questions explicitly
 * ("Common context for questions 1-2:"), so when the verbatim PYQ
 * passage also claims "for the three (03) items that follow", we strip
 * the count phrase to avoid contradicting the banner. The bank text
 * stays verbatim; only the rendered output is normalised.
 */
import { describe, it, expect } from "vitest";
import { stripPassageCountPhrase } from "@/lib/export/stripPassageCount";

describe("stripPassageCountPhrase", () => {
  it("strips 'for the three (03) items that follow' to 'for the items that follow'", () => {
    const input =
      "Consider the following for the three (03) items that follow: Let p = sin 35.";
    expect(stripPassageCountPhrase(input)).toBe(
      "Consider the following for the items that follow: Let p = sin 35."
    );
  });

  it("strips 'for the next two (02) items that follow'", () => {
    expect(
      stripPassageCountPhrase("Consider the following for the next two (02) items that follow:")
    ).toBe("Consider the following for the items that follow:");
  });

  it("strips spelled count without parens ('for the next four items that follow')", () => {
    expect(
      stripPassageCountPhrase("Read for the next four items that follow:")
    ).toBe("Read for the items that follow:");
  });

  it("strips numeric count ('for the 5 items that follow')", () => {
    expect(
      stripPassageCountPhrase("Consider the following for the 5 items that follow:")
    ).toBe("Consider the following for the items that follow:");
  });

  it("strips singular form ('for the next 1 item that follows')", () => {
    expect(
      stripPassageCountPhrase("Consider for the next 1 item that follows:")
    ).toBe("Consider for the item that follows:");
  });

  it("leaves passages without a count phrase untouched", () => {
    const input =
      "Three sides of a trapezium are each equal to 6 cm. Let alpha in (0, pi/2) be the angle between a pair of adjacent sides.";
    expect(stripPassageCountPhrase(input)).toBe(input);
  });

  it("leaves the phrase 'items that follow' intact when no count word precedes it", () => {
    const input = "Consider the following for the items that follow:";
    expect(stripPassageCountPhrase(input)).toBe(input);
  });

  it("is idempotent", () => {
    const input =
      "Consider the following for the three (03) items that follow: Let p = sin 35.";
    const once = stripPassageCountPhrase(input);
    const twice = stripPassageCountPhrase(once);
    expect(twice).toBe(once);
  });

  it("preserves LaTeX math zones inside the passage", () => {
    const input =
      "Consider the following for the three (03) items that follow: Let \\(p = \\sin 35^\\circ\\).";
    expect(stripPassageCountPhrase(input)).toBe(
      "Consider the following for the items that follow: Let \\(p = \\sin 35^\\circ\\)."
    );
  });

  it("handles case-insensitive count phrases without mangling case elsewhere", () => {
    // The strip only touches the matched span; surrounding text keeps its case.
    expect(
      stripPassageCountPhrase("PASSAGE for the THREE (03) items that follow: rest STAYS.")
    ).toBe("PASSAGE for the items that follow: rest STAYS.");
  });
});
