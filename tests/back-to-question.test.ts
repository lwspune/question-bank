import { describe, it, expect } from "vitest";
import {
  BACK_TO_QUESTION_MAX_AGE_MS,
  backHref,
  notesChapterOf,
  parseBackTrip,
  pillShowsOn,
  questionAnchorId,
  returnsTo,
  type BackTrip,
} from "@/lib/browse/backToQuestion";

const Q = "a057083b-9dd7-45c5-9d8c-b65fca987355";
const NOW = 1_800_000_000_000;

function trip(over: Partial<BackTrip> = {}): BackTrip {
  return {
    questionId: Q,
    from: "/browse?exam=nda&chapter=stats&page=2",
    notesChapter: "/notes/nda-maths/statistics",
    source: "offer",
    answer: { picked: "B", ticks: [], checked: false, showSolution: true },
    subtopic: "Dispersion",
    easierId: "11111111-1111-4111-8111-111111111111",
    viaPill: false,
    at: NOW,
    ...over,
  };
}

describe("questionAnchorId / backHref", () => {
  it("anchors the card by its question id", () => {
    expect(questionAnchorId(Q)).toBe(`q-${Q}`);
  });
  it("goes back to the exact page, at the card", () => {
    expect(backHref(trip())).toBe(`/browse?exam=nda&chapter=stats&page=2#q-${Q}`);
  });
});

describe("notesChapterOf", () => {
  it("reads the chapter from a subtopic link, with or without a concept anchor", () => {
    expect(notesChapterOf("/notes/nda-maths/statistics/dispersion")).toBe("/notes/nda-maths/statistics");
    expect(notesChapterOf("/notes/nda-maths/statistics/dispersion#variance")).toBe("/notes/nda-maths/statistics");
  });
  it("is null for anything that is not a notes chapter page", () => {
    expect(notesChapterOf("/notes/nda-maths")).toBeNull();
    expect(notesChapterOf("/guide/nda-maths/statistics")).toBeNull();
    expect(notesChapterOf("https://evil.example/notes/a/b")).toBeNull();
  });
});

describe("pillShowsOn", () => {
  it("shows on the chapter's notes pages, including its other subtopics", () => {
    expect(pillShowsOn(trip(), "/notes/nda-maths/statistics/dispersion")).toBe(true);
    expect(pillShowsOn(trip(), "/notes/nda-maths/statistics/mean")).toBe(true);
    expect(pillShowsOn(trip(), "/notes/nda-maths/statistics")).toBe(true);
  });
  it("hides on another chapter, or on a chapter whose name merely starts the same", () => {
    expect(pillShowsOn(trip(), "/notes/nda-maths/probability/basics")).toBe(false);
    expect(pillShowsOn(trip(), "/notes/nda-maths/statistics-2/x")).toBe(false);
  });
  it("hides once the student is back on the bank page", () => {
    expect(pillShowsOn(trip(), "/browse")).toBe(false);
  });
});

describe("returnsTo", () => {
  const at = { pathname: "/browse", search: "?exam=nda&chapter=stats&page=2" };
  it("restores the card that was left, on the page it was left on", () => {
    expect(returnsTo(trip(), Q, at)).toBe(true);
  });
  it("not another card on that page", () => {
    expect(returnsTo(trip(), "22222222-2222-4222-8222-222222222222", at)).toBe(false);
  });
  it("not the same question on another page or another page of results", () => {
    expect(returnsTo(trip(), Q, { pathname: "/browse", search: "?exam=nda&chapter=stats&page=3" })).toBe(false);
    expect(returnsTo(trip(), Q, { pathname: "/review", search: "" })).toBe(false);
  });
  it("matches a page with no query", () => {
    expect(returnsTo(trip({ from: "/review" }), Q, { pathname: "/review", search: "" })).toBe(true);
  });
});

describe("parseBackTrip", () => {
  const raw = (t: unknown) => JSON.stringify(t);
  it("reads back what was saved", () => {
    expect(parseBackTrip(raw(trip()), NOW + 1000)).toEqual(trip());
  });
  it("drops a trip older than its age limit", () => {
    expect(parseBackTrip(raw(trip()), NOW + BACK_TO_QUESTION_MAX_AGE_MS + 1)).toBeNull();
  });
  it("drops missing, malformed or wrongly shaped storage", () => {
    expect(parseBackTrip(null, NOW)).toBeNull();
    expect(parseBackTrip("{not json", NOW)).toBeNull();
    expect(parseBackTrip(raw({ questionId: Q }), NOW)).toBeNull();
    expect(parseBackTrip(raw(trip({ source: "guide" as never })), NOW)).toBeNull();
  });
  it("refuses a return address that leaves the site", () => {
    for (const from of ["//evil.example/browse", "https://evil.example", "/browse\\..", "browse?x=1", "/x#y"]) {
      expect(parseBackTrip(raw(trip({ from })), NOW)).toBeNull();
    }
  });
  it("refuses a notes chapter that is not one", () => {
    expect(parseBackTrip(raw(trip({ notesChapter: "/guide/x/y" })), NOW)).toBeNull();
  });
});
