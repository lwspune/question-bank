import { describe, it, expect } from "vitest";
import {
  getNotesChapterHref,
  getNotesChapterLabel,
  hasChapterNotes,
  findChapterRegistrationCollisions,
} from "@/lib/links/notesIndex";

// Chapter names alone do not identify a chapter — NDA Maths and MHT-CET Maths
// both ship notes for "Vectors", "Differentiation", "Indefinite Integration",
// "Differential Equations" and "Binomial Distribution".
const NDA_MATHS = { examName: "NDA", subjectName: "Mathematics" } as const;
const CET_MATHS = { examName: "MHT-CET", subjectName: "Maths" } as const;

describe("hasChapterNotes", () => {
  it("returns true for chapters with shipped notes content", () => {
    expect(hasChapterNotes(NDA_MATHS, "Statistics")).toBe(true);
    expect(hasChapterNotes(NDA_MATHS, "Vectors")).toBe(true);
    expect(hasChapterNotes(NDA_MATHS, "Probability")).toBe(true);
    expect(hasChapterNotes(NDA_MATHS, "3D Geometry")).toBe(true);
    expect(hasChapterNotes(NDA_MATHS, "Matrices & Determinants")).toBe(true);
  });

  it("returns false for chapters without notes", () => {
    // Use synthetic / not-yet-noted chapter names — real chapters can gain
    // notes later (Matrices & Determinants did, 2026-06-02), which would
    // silently flip a literal here. Keep negative cases note-proof.
    expect(hasChapterNotes(NDA_MATHS, "Made Up Chapter")).toBe(false);
    expect(hasChapterNotes(NDA_MATHS, "Not A Real Chapter")).toBe(false);
    expect(hasChapterNotes(NDA_MATHS, "")).toBe(false);
  });
});

describe("getNotesChapterHref", () => {
  it("returns the chapter index URL for shipped notes", () => {
    expect(getNotesChapterHref(NDA_MATHS, "Statistics")).toBe(
      "/notes/nda-maths/statistics"
    );
    expect(getNotesChapterHref(NDA_MATHS, "Vectors")).toBe("/notes/nda-maths/vectors");
    expect(getNotesChapterHref(NDA_MATHS, "Probability")).toBe(
      "/notes/nda-maths/probability"
    );
  });

  it("returns null for chapters without notes", () => {
    // Synthetic chapter name that will never gain notes (real chapters get
    // notes over time and would flip this assertion — see [[prepush-excludes-npm-test]]).
    expect(getNotesChapterHref(NDA_MATHS, "No Such Chapter XYZ")).toBeNull();
    expect(getNotesChapterHref(NDA_MATHS, "")).toBeNull();
  });
});

describe("getNotesChapterLabel", () => {
  it("returns a short label suitable for chip rendering", () => {
    const label = getNotesChapterLabel(NDA_MATHS, "Statistics");
    expect(label).not.toBeNull();
    // Soft assertion — label should be non-empty + reasonable length for a chip
    expect(label!.length).toBeGreaterThan(0);
    expect(label!.length).toBeLessThan(40);
  });

  it("returns null for chapters without notes", () => {
    expect(getNotesChapterLabel(NDA_MATHS, "No Such Chapter XYZ")).toBeNull();
  });
});

describe("notesIndex — (exam, subject) scoping", () => {
  it("routes a chapter name that BOTH exams ship to each exam's own notes", () => {
    expect(getNotesChapterHref(NDA_MATHS, "Vectors")).toBe(
      "/notes/nda-maths/vectors"
    );
    expect(getNotesChapterHref(CET_MATHS, "Vectors")).toBe(
      "/notes/mht-cet-maths/vectors"
    );
  });

  it("does not leak a chapter across subjects of the same exam", () => {
    // "Vectors" is an NDA MATHEMATICS chapter; NDA Physics must not inherit it.
    expect(
      hasChapterNotes({ examName: "NDA", subjectName: "Physics" }, "Vectors")
    ).toBe(false);
  });

  it("does not leak a chapter to an exam with no notes at all", () => {
    expect(
      hasChapterNotes({ examName: "CDS", subjectName: "English" }, "Vectors")
    ).toBe(false);
  });

  it("has no duplicate (exam, subject, chapter) registrations", () => {
    expect(findChapterRegistrationCollisions()).toEqual([]);
  });
});
