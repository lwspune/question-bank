/**
 * The line on the "free tests used up" card. On a whole past paper it also
 * sells the paper's PDF download (2026-10-07), the thing a student flicking
 * through papers came for; everywhere else it is exactly the old sentence.
 */
import { describe, it, expect } from "vitest";
import { lockedPassLine } from "@/lib/mocks/passLine";

const PASS = { label: "Premium Pass", length: "6 months", price: "₹99" };

describe("lockedPassLine", () => {
  it("keeps the old sentence for a chapter test", () => {
    expect(lockedPassLine({ pass: PASS, plural: "chapter tests", isPastPaper: false })).toBe(
      "Get the Premium Pass for unlimited chapter tests for 6 months, for ₹99. "
    );
  });

  it("adds the paper download on a past paper", () => {
    expect(lockedPassLine({ pass: PASS, plural: "mock tests", isPastPaper: true })).toBe(
      "Get the Premium Pass for unlimited mock tests and every past paper as a PDF with its answer key, for 6 months, for ₹99. "
    );
  });

  it("names the download even when no pass is on sale", () => {
    expect(lockedPassLine({ pass: null, plural: "mock tests", isPastPaper: true })).toBe(
      "A pass unlocks unlimited mock tests and past-paper downloads. "
    );
    expect(lockedPassLine({ pass: null, plural: "mock tests", isPastPaper: false })).toBe(
      "A pass unlocks unlimited mock tests. "
    );
  });
});
