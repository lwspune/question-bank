/**
 * The daily set — ENGAGEMENT_SPEC.md B2 — as a FILL of the drill, not a new
 * surface: when fewer than five questions are due, the rest of the five are
 * UNSEEN PYQs, first from the subtopics the student has got wrong most often,
 * then from their target exam at large. Pure core; the reads live in query.ts.
 *
 * The transfer half the drill launched without: an exact question they
 * missed proves recall, an unseen one from the same subtopic proves the idea.
 */
import { describe, it, expect } from "vitest";
import {
  rankWeakSubtopics,
  pickUnseen,
  composeDailySet,
  type SetItem,
} from "@/lib/drill/fill";
import { DRILL_SIZE, type DueQuestion } from "@/lib/drill/select";

const due = (questionId: string): DueQuestion => ({
  questionId,
  chapter: "Algebra",
  subtopic: "Sets",
  lastWrongAt: "2026-09-01T00:00:00Z",
});

describe("rankWeakSubtopics", () => {
  const wrongs = [
    { questionId: "q1", subtopicId: "s-trig" },
    { questionId: "q2", subtopicId: "s-trig" },
    { questionId: "q3", subtopicId: "s-vec" },
    { questionId: "q4", subtopicId: null },
    { questionId: "q5", subtopicId: "s-trig" },
    { questionId: "q6", subtopicId: "s-alg" },
    { questionId: "q7", subtopicId: "s-alg" },
  ];

  it("returns the n subtopics with the most wrong answers, most first, ties by id", () => {
    expect(rankWeakSubtopics(wrongs, 2)).toEqual(["s-trig", "s-alg"]);
    expect(rankWeakSubtopics(wrongs, 3)).toEqual(["s-trig", "s-alg", "s-vec"]);
  });

  it("ignores a question with no subtopic and returns [] with nothing to rank", () => {
    expect(rankWeakSubtopics([{ questionId: "x", subtopicId: null }], 2)).toEqual([]);
    expect(rankWeakSubtopics([], 2)).toEqual([]);
  });
});

describe("pickUnseen", () => {
  it("drops seen ids, keeps the candidate order, caps at n", () => {
    const out = pickUnseen(["a", "b", "c", "d"], new Set(["b"]), 2);
    expect(out).toEqual(["a", "c"]);
  });

  it("never returns a duplicate even if the candidates repeat", () => {
    expect(pickUnseen(["a", "a", "b"], new Set(), 5)).toEqual(["a", "b"]);
  });

  it("is empty when everything is seen", () => {
    expect(pickUnseen(["a"], new Set(["a"]), 3)).toEqual([]);
  });
});

describe("composeDailySet", () => {
  it("fills only the gap after the due questions, due first", () => {
    const set = composeDailySet([due("d1"), due("d2")], ["n1", "n2", "n3", "n4"], DRILL_SIZE);
    expect(set.map((s) => s.questionId)).toEqual(["d1", "d2", "n1", "n2", "n3"]);
    expect(set.map((s) => s.origin)).toEqual(["due", "due", "new", "new", "new"]);
  });

  it("adds nothing when the due list already fills the set", () => {
    const set = composeDailySet(["a", "b", "c", "d", "e"].map(due), ["n1"], 5);
    expect(set.map((s) => s.origin)).toEqual(["due", "due", "due", "due", "due"]);
  });

  it("is all new for a student with nothing due, and empty when there is nothing at all", () => {
    expect(composeDailySet([], ["n1", "n2"], 5).map((s) => s.origin)).toEqual(["new", "new"]);
    expect(composeDailySet([], [], 5)).toEqual([] satisfies SetItem[]);
  });

  it("never serves the same question twice, whichever list it came from", () => {
    const set = composeDailySet([due("x")], ["x", "y"], 5);
    expect(set.map((s) => s.questionId)).toEqual(["x", "y"]);
  });
});
