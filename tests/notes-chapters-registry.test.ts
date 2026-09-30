import { existsSync, readFileSync } from "node:fs";
import * as path from "node:path";
import { hasSubjectGuide } from "@/lib/guide/guideCatalog";
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

  // Every subject landing links /notes/<subjectRoute>/<chapterSlug>, so a registered chapter without
  // its own page.tsx is a 404 behind a live link. 22 CDS Maths chapters were merged that way on
  // 2026-09-29 (the subtopic pages existed; the chapter landing did not) and no gate noticed.
  it("every registered chapter has a chapter landing page", () => {
    const missing = NOTES_CHAPTERS.filter(
      (c) => !existsSync(path.join(process.cwd(), "src", "app", "notes", c.subjectRoute, c.chapterSlug, "page.tsx"))
    ).map((c) => `${c.subjectRoute}/${c.chapterSlug}`);
    expect(missing).toEqual([]);
  });

  // The notes chapter and subtopic pages link "<subject> strategy" to /guide/<subjectRoute> only when
  // hasSubjectGuide says that guide exists (2026-09-30). Before, the link was unconditional and a notes
  // subject without a guide shipped a 404 on every page; this pins both halves of the fix.
  it("links a subject's strategy guide only where one exists", () => {
    const routes = [...new Set(NOTES_CHAPTERS.map((c) => c.subjectRoute))];
    for (const r of routes) {
      const onDisk = existsSync(path.join(process.cwd(), "src", "app", "guide", r, "page.tsx"));
      expect(hasSubjectGuide(r), r).toBe(onDisk);
    }
    for (const f of ["NotesChapterLanding.tsx", "NotesSubtopicPage.tsx"]) {
      const src = readFileSync(path.join(process.cwd(), "src", "app", "notes", "_components", f), "utf8");
      expect(src, f).toMatch(/hasSubjectGuide\(chapter\.subjectRoute\)/);
      expect(src, f).toMatch(/\{guideHref && \(/);
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
