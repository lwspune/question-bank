import { describe, it, expect } from "vitest";
import { scopeCopy, type DrillScope } from "@/lib/drill/scope";

/**
 * A scoped drill names what it is scoped to. Until 2026-11-06 the only scope
 * was one mock attempt ("Fix these mistakes" on a result page); /me's Weak
 * spots adds one chapter. Every line the drill shows comes from here, so the
 * two kinds cannot drift.
 */
const paper: DrillScope = { kind: "attempt", attemptId: "a1", title: "NDA 2026 (II) Paper I", mockSlug: "nda-2026-2-p1" };
const chapter: DrillScope = { kind: "chapter", chapterId: "c1", title: "Probability" };

describe("scopeCopy", () => {
  it("a paper: its name, 'from this paper', another five of its own", () => {
    expect(scopeCopy(paper)).toEqual({
      from: "From NDA 2026 (II) Paper I",
      unit: "from this paper",
      again: "/drill?attempt=a1&from=again",
      anotherLabel: "Another five from this paper",
      otherLabel: "Fix mistakes from other papers",
      emptyTitle: "Nothing left to fix from this paper",
    });
  });

  it("a chapter: its name, 'from this chapter', another five of its own", () => {
    expect(scopeCopy(chapter)).toEqual({
      from: "From Probability",
      unit: "from this chapter",
      again: "/drill?chapter=c1&from=again",
      anotherLabel: "Another five from this chapter",
      otherLabel: "Fix mistakes from other chapters",
      emptyTitle: "Nothing left to fix in this chapter",
    });
  });

  it("today's path: its own words, and back to /me rather than another five", () => {
    expect(scopeCopy({ kind: "path" })).toEqual({
      from: "From today's plan",
      unit: "from today's plan",
      again: "/me",
      anotherLabel: "Back to today's tasks",
      otherLabel: "Fix mistakes from other chapters",
      emptyTitle: "Today's mistakes are fixed",
    });
  });
});
