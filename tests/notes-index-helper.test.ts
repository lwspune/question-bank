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
  });

  it("returns false for chapters without notes", () => {
    expect(hasChapterNotes("Probability")).toBe(false);
    expect(hasChapterNotes("Matrices & Determinants")).toBe(false);
    expect(hasChapterNotes("")).toBe(false);
    expect(hasChapterNotes("Made Up Chapter")).toBe(false);
  });
});

describe("getNotesChapterHref", () => {
  it("returns the chapter index URL for shipped notes", () => {
    expect(getNotesChapterHref("Statistics")).toBe(
      "/notes/nda-maths/statistics"
    );
    expect(getNotesChapterHref("Vectors")).toBe("/notes/nda-maths/vectors");
  });

  it("returns null for chapters without notes", () => {
    expect(getNotesChapterHref("Probability")).toBeNull();
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
    expect(getNotesChapterLabel("Probability")).toBeNull();
  });
});
