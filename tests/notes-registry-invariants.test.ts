import { describe, it, expect } from "vitest";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";

/**
 * Structural invariants on the NOTES_CHAPTERS registry — pure, no DB.
 *
 * Guards the documented "Recurring pitfalls" (CLAUDE.md): subtopic slugs are
 * GLOBALLY unique (they key `question_concept_tags` with NO chapter/subject
 * column, so a slug reused across chapters silently cross-contaminates that
 * chapter's drills + mastery checkpoint), and the three sources of a
 * chapter's subtopic identity/order — the `notes` record keys, the `slugs`
 * array, and `chapter.subtopicOrder` — must all agree. A new chapter that
 * reuses a slug or drifts these lists fails here at unit time instead of
 * shipping a broken drill list.
 */
describe("NOTES_CHAPTERS registry invariants", () => {
  it("ships at least 11 chapters", () => {
    expect(NOTES_CHAPTERS.length).toBeGreaterThanOrEqual(11);
  });

  it("has globally-unique (subjectRoute, chapterSlug) pairs", () => {
    const pairs = NOTES_CHAPTERS.map((c) => `${c.subjectRoute}/${c.chapterSlug}`);
    expect(new Set(pairs).size).toBe(pairs.length);
  });

  it("has GLOBALLY-unique subtopic slugs across every chapter", () => {
    const all = NOTES_CHAPTERS.flatMap((c) => Object.keys(c.notes));
    const counts = new Map<string, number>();
    for (const s of all) counts.set(s, (counts.get(s) ?? 0) + 1);
    const dupes = [...counts.entries()]
      .filter(([, n]) => n > 1)
      .map(([s]) => s);
    expect(dupes).toEqual([]);
  });

  for (const c of NOTES_CHAPTERS) {
    describe(`${c.subjectRoute}/${c.chapterSlug}`, () => {
      const keys = Object.keys(c.notes).sort();

      it("slugs[] matches the notes record keys", () => {
        expect([...c.slugs].sort()).toEqual(keys);
      });

      it("chapter.subtopicOrder matches the notes record keys", () => {
        expect([...c.chapter.subtopicOrder].sort()).toEqual(keys);
      });

      it("every subtopic has a non-empty subtopicName and >= 1 concept", () => {
        for (const slug of Object.keys(c.notes)) {
          const note = c.notes[slug];
          expect(note.subtopicName.trim().length).toBeGreaterThan(0);
          expect(note.concepts.length).toBeGreaterThan(0);
        }
      });

      it("has unique concept slugs within each subtopic", () => {
        for (const slug of Object.keys(c.notes)) {
          const conceptSlugs = c.notes[slug].concepts.map((x) => x.slug);
          expect(new Set(conceptSlugs).size).toBe(conceptSlugs.length);
        }
      });
    });
  }
});
