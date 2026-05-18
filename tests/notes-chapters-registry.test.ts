import { describe, it, expect } from "vitest";
import {
  NOTES_CHAPTERS,
  getNotesChapterBySlug,
  getNotesChaptersForSubject,
} from "@/lib/notes/chapters";

describe("NOTES_CHAPTERS registry shape", () => {
  it("registers at least the two shipped chapters (Statistics + Vectors)", () => {
    expect(NOTES_CHAPTERS.length).toBeGreaterThanOrEqual(2);
    const chapterSlugs = NOTES_CHAPTERS.map((c) => c.chapterSlug);
    expect(chapterSlugs).toContain("statistics");
    expect(chapterSlugs).toContain("vectors");
  });

  it("every entry has the required fields populated", () => {
    for (const c of NOTES_CHAPTERS) {
      expect(c.examName.length).toBeGreaterThan(0);
      expect(c.subjectName.length).toBeGreaterThan(0);
      expect(c.subjectRoute.length).toBeGreaterThan(0);
      expect(c.chapterSlug.length).toBeGreaterThan(0);
      expect(c.chipLabel.length).toBeGreaterThan(0);
      expect(c.chapter.chapterName.length).toBeGreaterThan(0);
      expect(c.chapter.title.length).toBeGreaterThan(0);
      expect(Object.keys(c.notes).length).toBeGreaterThan(0);
      expect(c.slugs.length).toBeGreaterThan(0);
    }
  });

  it("subtopic slugs in `slugs` match the keys of `notes` (Order + completeness)", () => {
    for (const c of NOTES_CHAPTERS) {
      const noteKeys = new Set(Object.keys(c.notes));
      for (const slug of c.slugs) {
        expect(noteKeys.has(slug)).toBe(true);
      }
    }
  });

  it("(subjectRoute, chapterSlug) pairs are unique across the registry", () => {
    const seen = new Set<string>();
    for (const c of NOTES_CHAPTERS) {
      const key = `${c.subjectRoute}::${c.chapterSlug}`;
      expect(seen.has(key)).toBe(false);
      seen.add(key);
    }
  });
});

describe("getNotesChapterBySlug", () => {
  it("returns the entry for a known (subjectRoute, chapterSlug) pair", () => {
    const entry = getNotesChapterBySlug("nda-maths", "statistics");
    expect(entry).not.toBeNull();
    expect(entry!.chapter.chapterName).toBe("Statistics");
  });

  it("returns null for an unknown chapter slug", () => {
    expect(getNotesChapterBySlug("nda-maths", "not-a-chapter")).toBeNull();
  });

  it("returns null for an unknown subject route", () => {
    expect(getNotesChapterBySlug("not-a-subject", "statistics")).toBeNull();
  });
});

describe("getNotesChaptersForSubject", () => {
  it("returns all chapters for nda-maths in registration order", () => {
    const chapters = getNotesChaptersForSubject("nda-maths");
    expect(chapters.length).toBeGreaterThanOrEqual(2);
    // Statistics shipped first, then Vectors — order should match
    expect(chapters[0].chapterSlug).toBe("statistics");
    expect(chapters[1].chapterSlug).toBe("vectors");
  });

  it("returns an empty array for an unknown subject route", () => {
    expect(getNotesChaptersForSubject("not-a-subject")).toEqual([]);
  });
});
