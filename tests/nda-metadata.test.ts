/**
 * NDA paper canonical convention — pure helpers.
 *
 * The bank's rule (enforced 2026-05-26 by SQL cleanup of 4 misfiled
 * batches + this upload-form guard): NDA papers are conventionally
 * `Apr ⇒ NDA 1` and `Sep ⇒ NDA 2`, no exceptions (UPSC has never run a
 * retest or "Shift 2"). Anything else is an upload-metadata bug.
 *
 * These helpers gate the upload form's NDA path (UI dropdown auto-pairs
 * month → note) and the /api/upload/preview server-side guard (rejects
 * non-canonical pairs at the request boundary).
 */
import { describe, it, expect } from "vitest";
import {
  NDA_MONTHS,
  NDA_MONTH_TO_NOTE,
  getNdaPaperFromMonth,
  isNdaCanonical,
} from "@/lib/upload/ndaMetadata";

describe("NDA_MONTHS + NDA_MONTH_TO_NOTE constants", () => {
  it("exposes exactly two valid months", () => {
    expect(NDA_MONTHS).toEqual(["Apr", "Sep"]);
  });

  it("maps Apr to NDA 1 and Sep to NDA 2", () => {
    expect(NDA_MONTH_TO_NOTE).toEqual({ Apr: "NDA 1", Sep: "NDA 2" });
  });
});

describe("getNdaPaperFromMonth", () => {
  it("returns NDA 1 for Apr", () => {
    expect(getNdaPaperFromMonth("Apr")).toBe("NDA 1");
  });

  it("returns NDA 2 for Sep", () => {
    expect(getNdaPaperFromMonth("Sep")).toBe("NDA 2");
  });

  it("returns null for any non-canonical month", () => {
    expect(getNdaPaperFromMonth("May")).toBeNull();
    expect(getNdaPaperFromMonth("Jan")).toBeNull();
    expect(getNdaPaperFromMonth("")).toBeNull();
  });

  it("returns null for null/undefined input", () => {
    expect(getNdaPaperFromMonth(null)).toBeNull();
    expect(getNdaPaperFromMonth(undefined)).toBeNull();
  });

  it("is case-sensitive (Apr ✓, apr ✗) — DB convention is title-case", () => {
    // DB has "Apr" consistently. Don't paper over input-shape bugs.
    expect(getNdaPaperFromMonth("apr")).toBeNull();
    expect(getNdaPaperFromMonth("APR")).toBeNull();
  });
});

describe("isNdaCanonical", () => {
  it("accepts the two canonical pairs", () => {
    expect(isNdaCanonical({ month: "Apr", note: "NDA 1" })).toBe(true);
    expect(isNdaCanonical({ month: "Sep", note: "NDA 2" })).toBe(true);
  });

  it("rejects mismatched pairs", () => {
    expect(isNdaCanonical({ month: "Apr", note: "NDA 2" })).toBe(false);
    expect(isNdaCanonical({ month: "Sep", note: "NDA 1" })).toBe(false);
  });

  it("rejects historical bug-shapes the 2026-05-26 cleanup fixed", () => {
    // These were the 3 Maths-section misfile patterns
    expect(isNdaCanonical({ month: "Apr", note: "Shift 2" })).toBe(false);
    expect(isNdaCanonical({ month: "Sep", note: "Shift 2" })).toBe(false);
    expect(isNdaCanonical({ month: "Sep", note: "NDA 1" })).toBe(false);
  });

  it("rejects unknown months (only Apr/Sep allowed for NDA)", () => {
    expect(isNdaCanonical({ month: "May", note: "NDA 1" })).toBe(false);
    expect(isNdaCanonical({ month: "Jul", note: "NDA 2" })).toBe(false);
  });

  it("returns true when both fields are null (incomplete metadata is OK at this layer)", () => {
    // The form allows skipping PYQ details entirely; the guard only fires
    // when both fields are set. A null-or-empty pair passes (other layers
    // handle missing-data warnings).
    expect(isNdaCanonical({ month: null, note: null })).toBe(true);
    expect(isNdaCanonical({ month: "", note: "" })).toBe(true);
  });

  it("rejects partial pairs (one field set, the other missing)", () => {
    // Half-filled metadata is a strong signal of upload-form error;
    // surface it as a validation failure.
    expect(isNdaCanonical({ month: "Apr", note: null })).toBe(false);
    expect(isNdaCanonical({ month: null, note: "NDA 1" })).toBe(false);
    expect(isNdaCanonical({ month: "Apr", note: "" })).toBe(false);
    expect(isNdaCanonical({ month: "", note: "NDA 1" })).toBe(false);
  });
});
