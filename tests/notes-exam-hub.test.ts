import { describe, it, expect } from "vitest";
import {
  subjectTabLabel,
  buildHubSubject,
  pickContinueTarget,
  HUB_VISIBLE_CHAPTERS,
  HUB_VISIBLE_CHAPTERS_WIDE,
} from "@/lib/notes/examHub";
import type { NotesProgressRow } from "@/lib/notes/progress";

/**
 * The /notes/<exam> hub lists every chapter on the page (one tap to a
 * chapter), and a signed-in reader gets a "Continue reading" card.
 */
describe("subjectTabLabel", () => {
  it("drops the exam name the label starts with", () => {
    expect(subjectTabLabel("NDA Maths", "NDA")).toBe("Maths");
    expect(subjectTabLabel("MHT-CET Chemistry", "MHT-CET")).toBe("Chemistry");
    expect(subjectTabLabel("JEE Mains Physics", "JEE Mains")).toBe("Physics");
  });

  it("keeps a label that does not start with the exam name", () => {
    expect(subjectTabLabel("Biology", "NDA")).toBe("Biology");
    expect(subjectTabLabel("NDAX Maths", "NDA")).toBe("NDAX Maths");
  });
});

describe("buildHubSubject", () => {
  const ch = (slug: string, count: number) => ({ slug, name: slug.toUpperCase(), subtopicCount: 4, count });

  it("orders chapters by past questions, most first, and links each one", () => {
    const s = buildHubSubject("nda-maths", "NDA Maths", "NDA", [ch("a", 10), ch("b", 30), ch("c", 20)]);
    expect(s.chapters.map((c) => c.slug)).toEqual(["b", "c", "a"]);
    expect(s.chapters[0].href).toBe("/notes/nda-maths/b");
    expect(s.tabLabel).toBe("Maths");
  });

  it("keeps registry order between chapters with the same count", () => {
    const s = buildHubSubject("r", "NDA R", "NDA", [ch("a", 5), ch("b", 9), ch("c", 5)]);
    expect(s.chapters.map((c) => c.slug)).toEqual(["b", "a", "c"]);
  });

  it("marks the most-asked chapter as Start here", () => {
    const s = buildHubSubject("r", "NDA R", "NDA", [ch("a", 1), ch("b", 3)]);
    expect(s.startHereSlug).toBe("b");
  });

  it("names no Start here and keeps registry order when no chapter has a past question", () => {
    // Counts can all be 0 when the counts query fails (the page never fails on
    // it): ranking by zeros would be noise, and "most asked" would be false.
    const s = buildHubSubject("r", "NDA R", "NDA", [ch("a", 0), ch("b", 0)]);
    expect(s.startHereSlug).toBeNull();
    expect(s.chapters.map((c) => c.slug)).toEqual(["a", "b"]);
  });

  it("shows a fixed number of chapters before Show all: 5 on a phone, 9 (three rows of a grid) wider", () => {
    expect(HUB_VISIBLE_CHAPTERS).toBe(5);
    expect(HUB_VISIBLE_CHAPTERS_WIDE).toBe(9);
  });
});

describe("pickContinueTarget", () => {
  const row = (subjectRoute: string, chapterSlug: string, subtopicSlug: string, lastViewedAt: string): NotesProgressRow => ({
    subjectRoute,
    chapterSlug,
    subtopicSlug,
    lastViewedAt,
    bookmarked: false,
    masteredAt: null,
    checkpointScore: null,
    checkpointTotal: null,
    checkpointAt: null,
  });
  // route/chapter -> subtopic count, for THIS exam's chapters only.
  const totals = { "nda-maths/matrices": 6, "nda-physics/sound": 4 };

  it("returns the most recently read subtopic with its chapter progress", () => {
    const t = pickContinueTarget(
      [
        row("nda-maths", "matrices", "m1", "2026-10-01T10:00:00Z"),
        row("nda-maths", "matrices", "m2", "2026-10-03T10:00:00Z"),
        row("nda-physics", "sound", "s1", "2026-10-02T10:00:00Z"),
      ],
      totals
    );
    expect(t).toEqual({
      subjectRoute: "nda-maths",
      chapterSlug: "matrices",
      subtopicSlug: "m2",
      href: "/notes/nda-maths/matrices/m2",
      readCount: 2,
      total: 6,
    });
  });

  it("ignores another exam's notes and chapters this hub does not list", () => {
    const t = pickContinueTarget(
      [
        row("mht-cet-maths", "limits", "l1", "2026-10-05T10:00:00Z"),
        row("nda-physics", "sound", "s1", "2026-10-02T10:00:00Z"),
      ],
      totals
    );
    expect(t?.subtopicSlug).toBe("s1");
  });

  it("ignores rows never viewed (a bookmark alone)", () => {
    expect(pickContinueTarget([row("nda-maths", "matrices", "m1", "")], totals)).toBeNull();
  });

  it("returns null with no rows", () => {
    expect(pickContinueTarget([], totals)).toBeNull();
  });

  it("never reports more subtopics read than the chapter has", () => {
    // A renamed or retired subtopic slug leaves an old row behind.
    const rows = ["a", "b", "c", "d", "e"].map((s, i) => row("nda-physics", "sound", s, `2026-10-0${i + 1}T00:00:00Z`));
    expect(pickContinueTarget(rows, totals)?.readCount).toBe(4);
  });
});
