/**
 * The session-plan pure core.
 *
 * The invariants worth pinning here are the ones whose failure is SILENT. A
 * dangling section ref renders as a blank cell, a duplicate id quietly gives
 * two classes the same teaching notes, and a session number derived from an id
 * rather than from position would renumber the whole tail the moment anyone
 * inserts a class. None of those throw; all of them are wrong.
 */
import { describe, it, expect } from "vitest";
import {
  chapterTotals,
  findDanglingRefs,
  findDuplicateIds,
  numberSessions,
  planTotals,
  sessionRefs,
} from "../src/lib/planner/plan";
import type { PlannedChapter, SessionPlan } from "../src/lib/planner/types";

const chapter = (chapterNo: number, sessions: PlannedChapter["sessions"]): PlannedChapter => ({
  chapterNo,
  sessions,
});

const plan = (chapters: PlannedChapter[]): SessionPlan => ({
  key: "test",
  label: "Test",
  subject: "Mathematics",
  cls: 11,
  source: "MH State Board",
  bankExam: "Test Exam",
  chapters,
});

describe("numberSessions", () => {
  it("numbers by POSITION, not by id — an out-of-order id list still reads 1..N", () => {
    // This is the whole point of the id/number split: ids are frozen on
    // allocation, so a chapter edited after authoring has ids out of order.
    const ch = chapter(2, [
      { id: "s01", subtopics: ["2.1"], concepts: [] },
      { id: "s09", subtopics: ["2.1"], concepts: [] }, // inserted later
      { id: "s02", subtopics: ["2.2"], concepts: [] },
    ]);
    expect(numberSessions(ch).map((s) => [s.number, s.session.id])).toEqual([
      [1, "s01"],
      [2, "s09"],
      [3, "s02"],
    ]);
  });

  it("starts at 1 and is contiguous", () => {
    const ch = chapter(1, [
      { id: "a", subtopics: [], concepts: [] },
      { id: "b", subtopics: [], concepts: [] },
    ]);
    expect(numberSessions(ch).map((s) => s.number)).toEqual([1, 2]);
  });

  it("is empty for a chapter with no sessions rather than throwing", () => {
    expect(numberSessions(chapter(1, []))).toEqual([]);
  });
});

describe("sessionRefs", () => {
  it("collects subtopic and concept refs together", () => {
    expect(
      sessionRefs({ id: "x", subtopics: ["2.1"], concepts: ["2.1.1", "2.1.2"] }),
    ).toEqual(["2.1", "2.1.1", "2.1.2"]);
  });

  it("returns nothing for a session that is pure authored beats", () => {
    // An NDA-extra session teaches something the book has no section for, so it
    // legitimately cites no ref at all. That must not read as a defect.
    expect(
      sessionRefs({
        id: "x",
        subtopics: [],
        concepts: [],
        beats: ["Mean, median, mode"],
        extra: { source: "NDA", title: "Central tendency", reason: "r", anchored: false },
      }),
    ).toEqual([]);
  });
});

describe("findDanglingRefs", () => {
  const known = new Set(["2.1", "2.1.1"]);

  it("reports a ref the spine does not have, with its chapter and session", () => {
    const p = plan([
      chapter(2, [{ id: "s01", subtopics: ["2.1"], concepts: ["2.1.1", "2.9.9"] }]),
    ]);
    expect(findDanglingRefs(p, known)).toEqual([
      { chapterNo: 2, sessionId: "s01", ref: "2.9.9" },
    ]);
  });

  it("is silent when every ref resolves", () => {
    const p = plan([chapter(2, [{ id: "s01", subtopics: ["2.1"], concepts: ["2.1.1"] }])]);
    expect(findDanglingRefs(p, known)).toEqual([]);
  });

  it("reports EVERY dangling ref, not just the first — a partial report reads as a partial fix", () => {
    const p = plan([
      chapter(2, [
        { id: "s01", subtopics: ["9.9"], concepts: [] },
        { id: "s02", subtopics: [], concepts: ["8.8"] },
      ]),
    ]);
    expect(findDanglingRefs(p, known)).toHaveLength(2);
  });
});

describe("exam-only blocks with no book chapter", () => {
  it("counts a null-chapter block like any other and reports its refs against null", () => {
    // NDA binary arithmetic has no State Board chapter at all. The block must
    // still total correctly, and a stray ref on it must still be reported —
    // "no chapter" is a fact about the book, not an exemption from checking.
    const p = plan([
      {
        chapterNo: null,
        title: "NDA extras — no State Board home",
        sessions: [
          {
            id: "x01",
            subtopics: [],
            concepts: ["9.9"],
            extra: { source: "NDA", title: "Binary arithmetic", reason: "r", pyq: 7, anchored: false },
          },
        ],
      },
    ]);
    expect(planTotals(p)).toMatchObject({ chapters: 1, sessions: 1, core: 0, extra: 1, extraPyq: 7 });
    expect(findDanglingRefs(p, new Set())).toEqual([
      { chapterNo: null, sessionId: "x01", ref: "9.9" },
    ]);
  });
});

describe("findDuplicateIds", () => {
  it("catches an id reused ACROSS chapters — notes would attach to both", () => {
    const p = plan([
      chapter(1, [{ id: "dup", subtopics: [], concepts: [] }]),
      chapter(2, [{ id: "dup", subtopics: [], concepts: [] }]),
    ]);
    expect(findDuplicateIds(p)).toEqual(["dup"]);
  });

  it("catches an id reused within one chapter", () => {
    const p = plan([
      chapter(1, [
        { id: "dup", subtopics: [], concepts: [] },
        { id: "dup", subtopics: [], concepts: [] },
      ]),
    ]);
    expect(findDuplicateIds(p)).toEqual(["dup"]);
  });

  it("reports a duplicated id ONCE however many times it recurs", () => {
    const p = plan([
      chapter(1, [
        { id: "d", subtopics: [], concepts: [] },
        { id: "d", subtopics: [], concepts: [] },
        { id: "d", subtopics: [], concepts: [] },
      ]),
    ]);
    expect(findDuplicateIds(p)).toEqual(["d"]);
  });

  it("is silent on a clean plan", () => {
    const p = plan([
      chapter(1, [{ id: "a", subtopics: [], concepts: [] }]),
      chapter(2, [{ id: "b", subtopics: [], concepts: [] }]),
    ]);
    expect(findDuplicateIds(p)).toEqual([]);
  });
});

describe("chapterTotals", () => {
  it("counts core and extra sessions SEPARATELY — a chapter's teaching load is not its gap load", () => {
    const ch = chapter(8, [
      { id: "a", subtopics: ["8.1"], concepts: [] },
      { id: "b", subtopics: ["8.2"], concepts: [] },
      {
        id: "c",
        subtopics: [],
        concepts: [],
        extra: { source: "NDA", title: "t", reason: "r", pyq: 75, anchored: false },
      },
    ]);
    expect(chapterTotals(ch)).toEqual({ sessions: 3, core: 2, extra: 1, extraPyq: 75 });
  });

  it("treats a missing extra pyq as 0 rather than NaN", () => {
    const ch = chapter(1, [
      {
        id: "a",
        subtopics: [],
        concepts: [],
        extra: { source: "CBSE", title: "t", reason: "r", anchored: false },
      },
    ]);
    expect(chapterTotals(ch).extraPyq).toBe(0);
  });
});

describe("planTotals", () => {
  it("aggregates across chapters and splits the two extra sources", () => {
    const p = plan([
      chapter(1, [{ id: "a", subtopics: ["1.1"], concepts: [] }]),
      chapter(8, [
        { id: "b", subtopics: ["8.1"], concepts: [] },
        {
          id: "c",
          subtopics: [],
          concepts: [],
          extra: { source: "NDA", title: "t", reason: "r", pyq: 75, anchored: false },
        },
        {
          id: "d",
          subtopics: [],
          concepts: [],
          extra: { source: "CBSE", title: "t", reason: "r", anchored: false },
        },
      ]),
    ]);
    expect(planTotals(p)).toEqual({
      chapters: 2,
      sessions: 4,
      core: 2,
      extra: 2,
      nda: 1,
      cbse: 1,
      extraPyq: 75,
    });
  });

  it("reports zeroes for an empty plan instead of throwing", () => {
    expect(planTotals(plan([]))).toEqual({
      chapters: 0,
      sessions: 0,
      core: 0,
      extra: 0,
      nda: 0,
      cbse: 0,
      extraPyq: 0,
    });
  });
});
