/**
 * surface_viewed: "did the student SEE it?" — the question the engagement read
 * could not answer on 2026-09-27 (no page was recorded as viewed, only as acted
 * on; 51 of 265 students who signed in that month left no row at all).
 *
 * One row per student per surface per IST day, via dedupe_key, so a view is
 * also the day's heartbeat and a refresh cannot inflate anything.
 */
import { describe, it, expect } from "vitest";
import { SURFACES, viewDedupeKey, surfaceViewedEvent, isSurface, readingViewFor, ebookSampleEvent, learnLessonPath } from "@/lib/activity/views";

describe("surface_viewed", () => {
  it("names the surfaces the engagement spec needs to see", () => {
    for (const s of ["site", "drill", "me", "map", "start", "result", "mock_start", "pricing"]) {
      expect(SURFACES).toContain(s);
      expect(isSurface(s)).toBe(true);
    }
    expect(isSurface("blog")).toBe(false);
    expect(isSurface(42)).toBe(false);
  });

  it("dedupes per student, surface and IST day", () => {
    // 20:00 UTC on the 27th is 01:30 IST on the 28th.
    const late = new Date("2026-09-27T20:00:00Z");
    const early = new Date("2026-09-27T03:00:00Z");
    expect(viewDedupeKey("u1", "drill", late)).toBe("view:drill:u1:2026-09-28");
    expect(viewDedupeKey("u1", "drill", early)).toBe("view:drill:u1:2026-09-27");
    expect(viewDedupeKey("u2", "drill", early)).not.toBe(viewDedupeKey("u1", "drill", early));
    expect(viewDedupeKey("u1", "me", early)).not.toBe(viewDedupeKey("u1", "drill", early));
  });

  it("builds the event with the surface in metadata and the dedupe key set", () => {
    const now = new Date("2026-09-27T03:00:00Z");
    expect(surfaceViewedEvent("u1", "result", now, "attempt-9")).toEqual({
      kind: "surface_viewed",
      refId: "attempt-9",
      refKind: "result",
      metadata: { surface: "result" },
      dedupeKey: "view:result:u1:2026-09-27",
    });
    expect(surfaceViewedEvent("u1", "site", now).refId).toBeUndefined();
  });
});

// 2026-10-19 tracking review: nothing recorded a signed-in student READING. Answers on
// /questions, /board and /guide were logged, but a read of the notes left no trace.
describe("readingViewFor", () => {
  it("maps each reading page to its surface and keeps the page address", () => {
    expect(readingViewFor("/notes/nda-maths/statistics/central-tendency")).toEqual({
      surface: "notes",
      path: "/notes/nda-maths/statistics/central-tendency",
    });
    expect(readingViewFor("/board/mh-hsc-12/chemistry/solid-state")?.surface).toBe("board");
    expect(readingViewFor("/questions/mht-cet/physics/motion-in-a-plane")?.surface).toBe("questions");
    expect(readingViewFor("/guide/mht-cet-physics")?.surface).toBe("guide");
    expect(readingViewFor("/formula/jee-mains/physics/current-electricity")?.surface).toBe("formula");
    expect(readingViewFor("/question-papers/cbse-12/physics/2025-55-1-1")?.surface).toBe("question_papers");
    expect(readingViewFor("/mock/nda-2025-i-maths/paper")?.surface).toBe("past_paper");
  });

  it("counts the ebook store and each book's page, the book in the address (2026-10-20)", () => {
    expect(readingViewFor("/store")).toEqual({ surface: "store", path: "/store" });
    expect(readingViewFor("/store/mht-cet-maths-pyq")).toEqual({ surface: "store", path: "/store/mht-cet-maths-pyq" });
  });

  it("counts the Learn tab's pages, each lesson by its own address (2026-10-28)", () => {
    expect(readingViewFor("/learn")).toEqual({ surface: "learn", path: "/learn" });
    expect(readingViewFor("/learn/mh-hsc-12-maths/matrices")?.surface).toBe("learn");
    expect(readingViewFor("/learn/lesson/matrices/what-is-a-matrix?course=cbse-12-maths")).toEqual({
      surface: "learn",
      path: "/learn/lesson/matrices/what-is-a-matrix",
    });
    expect(readingViewFor("/learnx")).toBeNull();
  });

  it("counts a section's index page too", () => {
    expect(readingViewFor("/notes")?.surface).toBe("notes");
    expect(readingViewFor("/guide/nda")?.surface).toBe("guide");
  });

  it("strips the query, the fragment and a trailing slash", () => {
    expect(readingViewFor("/notes/nda-maths/?tab=1#top")).toEqual({ surface: "notes", path: "/notes/nda-maths" });
  });

  it("records nothing for pages that are not reading", () => {
    for (const p of ["/browse", "/me", "/", "/mock", "/mock/nda-2025-i-maths", "/mock/attempt/abc/result", "/notesx", "/exams/nda"]) {
      expect(readingViewFor(p)).toBeNull();
    }
  });

  it("refuses an address it could not store safely", () => {
    expect(readingViewFor("/notes/Has Space")).toBeNull();
    expect(readingViewFor(`/notes/${"a".repeat(300)}`)).toBeNull();
    expect(readingViewFor("notes/no-leading-slash")).toBeNull();
    expect(readingViewFor("")).toBeNull();
  });
});

describe("ebookSampleEvent", () => {
  // A signed-in student taking a book's free sample (2026-10-20): the step
  // between opening a book and buying it. One row per book per student per day.
  it("records the book's page address, once per book per student per IST day", () => {
    const now = new Date("2026-10-20T05:00:00Z");
    expect(ebookSampleEvent("u1", "mht-cet-maths-pyq", now)).toEqual({
      kind: "surface_viewed",
      metadata: { surface: "ebook_sample", path: "/store/mht-cet-maths-pyq" },
      dedupeKey: "view:ebook_sample:/store/mht-cet-maths-pyq:u1:2026-10-20",
    });
    expect(ebookSampleEvent("u1", "mht-cet-physics-notes", now).dedupeKey).not.toBe(
      ebookSampleEvent("u1", "mht-cet-maths-pyq", now).dedupeKey
    );
  });
});

// The Learn experiment could not tell "nobody came" from "came and left before the first
// question" (2026-10-28): a lesson begun is recorded by its address, lessons only.
describe("learnLessonPath", () => {
  it("returns a lesson's cleaned address", () => {
    expect(learnLessonPath("/learn/lesson/matrices/what-is-a-matrix")).toBe("/learn/lesson/matrices/what-is-a-matrix");
    expect(learnLessonPath("/learn/lesson/matrices/what-is-a-matrix/?course=x#top")).toBe("/learn/lesson/matrices/what-is-a-matrix");
  });

  it("refuses every other Learn page and anything outside Learn", () => {
    for (const p of ["/learn", "/learn/review", "/learn/mh-hsc-12-maths/matrices", "/learn/lesson/matrices", "/learn/lesson/a/b/c", "/notes/a/b", "/learn/lesson/Bad Slug/x", ""]) {
      expect(learnLessonPath(p)).toBeNull();
    }
  });
});
