/**
 * A /board chapter links to its notes (board notes, 2026-11-23) by the DB names it already
 * holds: exam, subject, chapter. Read from the content-free chapter index, so the board page
 * never loads the notes corpus (tests/notes-routes-lean-graph.test.ts).
 */
import { describe, expect, it } from "vitest";
import { NOTES_CHAPTER_INDEX, notesChapterHrefFor } from "../src/lib/notes/chapterIndex";

describe("notesChapterHrefFor", () => {
  it("finds a registered chapter by exam, subject and chapter name", () => {
    const c = NOTES_CHAPTER_INDEX[0];
    expect(notesChapterHrefFor(c.examName, c.subjectName, c.chapterName)).toBe(`/notes/${c.subjectRoute}/${c.chapterSlug}`);
  });

  it("needs all three names: the same chapter name in another exam or subject is not a match", () => {
    const c = NOTES_CHAPTER_INDEX[0];
    expect(notesChapterHrefFor("No Such Exam", c.subjectName, c.chapterName)).toBeNull();
    expect(notesChapterHrefFor(c.examName, "No Such Subject", c.chapterName)).toBeNull();
    expect(notesChapterHrefFor(c.examName, c.subjectName, "No Such Chapter")).toBeNull();
  });
});
