import { describe, it, expect } from "vitest";
import {
  getNotesExamGroups,
  getNotesExamGroup,
  notesExamSlugs,
} from "@/lib/notes/notesNav";

/**
 * The /notes navigation model derives from the live NOTES_CHAPTERS registry,
 * so these assert structural invariants rather than exact counts (which grow
 * as chapters ship).
 */
describe("notesNav — cross-exam notes grouping", () => {
  it("groups only exams that have at least one notes subject", () => {
    const groups = getNotesExamGroups();
    expect(groups.length).toBeGreaterThan(0);
    for (const g of groups) {
      expect(g.subjects.length).toBeGreaterThan(0);
    }
    // NDA has shipped notes (Maths + Physics + Biology) → must appear.
    expect(groups.some((g) => g.slug === "nda")).toBe(true);
  });

  it("NDA exposes its multiple notes subjects, not just maths", () => {
    const nda = getNotesExamGroup("nda");
    expect(nda).not.toBeNull();
    const routes = nda!.subjects.map((s) => s.subjectRoute);
    expect(routes).toContain("nda-maths");
    expect(routes).toContain("nda-physics");
    expect(routes).toContain("nda-biology");
  });

  it("each subject group counts its chapters and subtopics (> 0)", () => {
    for (const g of getNotesExamGroups()) {
      for (const s of g.subjects) {
        expect(s.chapterCount, s.subjectRoute).toBeGreaterThan(0);
        expect(s.subtopicCount, s.subjectRoute).toBeGreaterThanOrEqual(s.chapterCount);
      }
    }
  });

  it("aggregates multiple chapters under one subject route", () => {
    const nda = getNotesExamGroup("nda")!;
    const maths = nda.subjects.find((s) => s.subjectRoute === "nda-maths")!;
    // NDA Maths has many notes chapters — chapterCount must reflect that.
    expect(maths.chapterCount).toBeGreaterThan(1);
  });

  it("returns a valid exam with empty subjects (coming-soon), null for unknown slug", () => {
    // cds is a registered exam with no notes yet. Keep this on a genuinely
    // note-less exam — jee-mains gained notes (Matrices, 2026-07-24), which
    // would silently flip a real chapter's negative case here.
    const cds = getNotesExamGroup("cds");
    expect(cds).not.toBeNull();
    expect(cds!.subjects).toEqual([]);
    // an unknown slug is a 404.
    expect(getNotesExamGroup("not-an-exam")).toBeNull();
  });

  it("notesExamSlugs covers every registered exam", () => {
    const slugs = notesExamSlugs();
    expect(slugs).toContain("nda");
    expect(slugs).toContain("mht-cet");
    expect(slugs).toContain("jee-mains");
  });

  it("jee-mains exposes its Matrices notes subject", () => {
    const jee = getNotesExamGroup("jee-mains");
    expect(jee).not.toBeNull();
    expect(jee!.subjects.map((s) => s.subjectRoute)).toContain("jee-mains-maths");
  });
});
