import { describe, it, expect } from "vitest";
import {
  getNotesChapterHref,
  getNotesChapterLabel,
  hasChapterNotes,
} from "@/lib/links/notesIndex";

describe("hasChapterNotes", () => {
  it("returns true for chapters with shipped notes content", () => {
    expect(hasChapterNotes("Statistics")).toBe(true);
    expect(hasChapterNotes("Vectors")).toBe(true);
    expect(hasChapterNotes("Probability")).toBe(true);
    expect(hasChapterNotes("3D Geometry")).toBe(true);
    expect(hasChapterNotes("Matrices & Determinants")).toBe(true);
  });

  it("returns false for chapters without notes", () => {
    // Use synthetic / not-yet-noted chapter names — real chapters can gain
    // notes later (Matrices & Determinants did, 2026-06-02), which would
    // silently flip a literal here. Keep negative cases note-proof.
    expect(hasChapterNotes("Made Up Chapter")).toBe(false);
    expect(hasChapterNotes("Not A Real Chapter")).toBe(false);
    expect(hasChapterNotes("")).toBe(false);
  });
});

describe("getNotesChapterHref", () => {
  it("returns the chapter index URL for shipped notes", () => {
    expect(getNotesChapterHref("Statistics")).toBe(
      "/notes/nda-maths/statistics"
    );
    expect(getNotesChapterHref("Vectors")).toBe("/notes/nda-maths/vectors");
    expect(getNotesChapterHref("Probability")).toBe(
      "/notes/nda-maths/probability"
    );
  });

  it("returns null for chapters without notes", () => {
    // Synthetic chapter name that will never gain notes (real chapters get
    // notes over time and would flip this assertion — see [[prepush-excludes-npm-test]]).
    expect(getNotesChapterHref("No Such Chapter XYZ")).toBeNull();
    expect(getNotesChapterHref("")).toBeNull();
  });
});

describe("getNotesChapterLabel", () => {
  it("returns a short label suitable for chip rendering", () => {
    const label = getNotesChapterLabel("Statistics");
    expect(label).not.toBeNull();
    // Soft assertion — label should be non-empty + reasonable length for a chip
    expect(label!.length).toBeGreaterThan(0);
    expect(label!.length).toBeLessThan(40);
  });

  it("returns null for chapters without notes", () => {
    expect(getNotesChapterLabel("No Such Chapter XYZ")).toBeNull();
  });
});
