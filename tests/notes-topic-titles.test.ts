import { describe, it, expect } from "vitest";
import { notesTopicTitles } from "@/lib/notes/topicTitles";

/**
 * /me named a notes topic by prettifying its URL slug, so students saw
 * "Jch Sbc Mole", "Cetp mp Vectors" and "Dot Product Angle" (2026-10-05).
 * The registry has the real titles; a slug is only the fallback for a topic
 * the registry no longer has.
 */
describe("notesTopicTitles", () => {
  it("uses the topic and chapter names from the notes registry", () => {
    expect(
      notesTopicTitles({ subjectRoute: "nda-maths", chapterSlug: "vectors", subtopicSlug: "dot-product-angle" })
    ).toEqual({ topic: "Dot Product and Angle", chapter: "Vectors" });
  });

  it("names a prefixed-slug topic properly (no 'Cetp mp')", () => {
    const t = notesTopicTitles({
      subjectRoute: "mht-cet-physics",
      chapterSlug: "motion-in-a-plane",
      subtopicSlug: "cetp-mp-vectors",
    });
    expect(t.topic).not.toMatch(/cetp/i);
    expect(t.topic.length).toBeGreaterThan(3);
  });

  it("falls back to the prettified slug for a topic the registry lacks", () => {
    expect(
      notesTopicTitles({ subjectRoute: "nda-maths", chapterSlug: "gone-chapter", subtopicSlug: "old-topic-name" })
    ).toEqual({ topic: "Old Topic Name", chapter: "Gone Chapter" });
  });
});
