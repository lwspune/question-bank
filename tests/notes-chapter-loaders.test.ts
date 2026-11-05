/**
 * The generated notes chapter index + loaders agree with the registry (TECH_DEBT_SPEC.md 2.2 part 2).
 * Run `npm run notes:chapter-loaders` after shipping or renaming a notes chapter.
 */
import { describe, it, expect } from "vitest";
import { NOTES_CHAPTERS, getNotesChaptersForSubject } from "@/lib/notes/chapters";
import { buildNotesChapterIndex } from "@/lib/notes/chapterIndexBuild";
import { NOTES_CHAPTER_INDEX, loadNotesChapter, notesChapterMetasForSubject } from "@/lib/notes/chapterIndex";
import { NOTES_CHAPTER_LOADERS } from "@/lib/notes/chapterLoaders.generated";

describe("the generated notes chapter index", () => {
  it("matches the registry — run `npm run notes:chapter-loaders` after shipping a chapter", () => {
    expect(NOTES_CHAPTER_INDEX).toEqual(buildNotesChapterIndex(NOTES_CHAPTERS));
  });

  it("has exactly one loader per registered chapter", () => {
    expect(Object.keys(NOTES_CHAPTER_LOADERS).sort()).toEqual(NOTES_CHAPTERS.map((c) => `${c.subjectRoute}/${c.chapterSlug}`).sort());
  });

  it("orders a subject's chapters exactly as the registry does", () => {
    for (const s of new Set(NOTES_CHAPTERS.map((c) => c.subjectRoute))) {
      expect(notesChapterMetasForSubject(s).map((c) => c.chapterSlug), s).toEqual(getNotesChaptersForSubject(s).map((c) => c.chapterSlug));
    }
  });
});

describe("loadNotesChapter", () => {
  it("rebuilds every registry entry, with the very same content objects", async () => {
    for (const c of NOTES_CHAPTERS) {
      const loaded = await loadNotesChapter(c.subjectRoute, c.chapterSlug);
      expect(loaded, `${c.subjectRoute}/${c.chapterSlug}`).toEqual(c);
      expect(loaded!.chapter).toBe(c.chapter);
      expect(loaded!.notes).toBe(c.notes);
    }
  });

  it("returns null for a chapter that is not registered", async () => {
    expect(await loadNotesChapter("nda-maths", "not-a-chapter")).toBeNull();
  });
});
