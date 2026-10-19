/**
 * surface_viewed: "did the student SEE it?" — the question the engagement read
 * could not answer on 2026-09-27 (no page was recorded as viewed, only as acted
 * on; 51 of 265 students who signed in that month left no row at all).
 *
 * One row per student per surface per IST day, via dedupe_key, so a view is
 * also the day's heartbeat and a refresh cannot inflate anything.
 */
import { describe, it, expect } from "vitest";
import { SURFACES, viewDedupeKey, surfaceViewedEvent, isSurface, readingViewFor } from "@/lib/activity/views";

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
