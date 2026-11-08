/**
 * The board path, Phase 3 (MENTOR_SPEC.md §4 "Pace", "The last three weeks"):
 * the pure core.
 *
 * - pace: Lighter / More in steps of 10 between 20 and 120 minutes a day
 *   (owner, 2026-11-08); Lighter says the finish date it leads to; behind says
 *   the honest date and what More would take, never shrinking "done" (D3).
 * - papers: a board paper is done when every question on it was answered or
 *   marked on its page (the Top 10 rule), an OR choice by either half.
 * - revision: from three weeks before the board exam, chapters not done come
 *   first, smallest first; then a whole timed board paper on alternate study
 *   days, rotating subjects, newest first; between them the Review later
 *   questions and up to 10 mistakes to fix.
 */
import { describe, it, expect } from "vitest";
import type { ChapterState, PathChapter, PathPaper } from "@/lib/path/model";
import type { ProgressEvent } from "@/lib/homework/progress";
import { NO_FACTS, type ChapterFacts } from "@/lib/path/fold";
import { PACE_MAX, PACE_MIN, behindLine, finishDate, lighterLine, minutesToFinishBy, stepPace } from "@/lib/path/pace";
import { isRevision, paperWorked, pickRevisionDay, reviewPending, REVISION_FIX_MAX, type PaperState } from "@/lib/path/revision";
import { taskDone, todayExemptions, type PathTask } from "@/lib/path/today";
import { buildPathView } from "@/lib/path/view";
import { projectWeek, weekText } from "@/lib/path/week";
import { parsePathAction } from "@/lib/path/parse";
import { paperLabel, paperSlots } from "@/lib/path/contentRead";

const slots = (p: string, n = 10) => Array.from({ length: n }, (_, i) => [{ id: `${p}-q${i}`, format: "mcq" as const }]);
function ch(id: string, subject: PathChapter["subject"], rank: number, name = `Chapter ${id}`): PathChapter {
  return {
    id,
    name,
    subject,
    queue: subject,
    rank,
    boardPath: `/board/cbse-12/${subject}/${id}`,
    top: slots(id),
    test: { mockId: `m-${id}`, slug: `test-${id}`, minutes: 20 },
  };
}
function paper(id: string, subject: PathPaper["subject"], year: number, n = 3): PathPaper {
  return {
    id,
    subject,
    year,
    label: `${year} (Set 1)`,
    minutes: 180,
    href: `/question-papers/cbse-12/${subject}/${id}`,
    slots: Array.from({ length: n }, (_, i) => [[{ id: `${id}-q${i}`, format: "subjective" as const }]]),
  };
}
const DONE: ChapterState = { sheet: true, topWorked: 10, test: true, recordedDone: false };
const allDone = (chapters: PathChapter[]) => new Map(chapters.map((c) => [c.id, DONE]));
const mark = (questionId: string, m: "understood" | "review", at = "2026-11-05T10:00:00Z"): ProgressEvent => ({ questionId, kind: "self_mark", at, mark: m });

describe("pace: Lighter and More", () => {
  it("moves the minutes a day by 10, between 20 and 120", () => {
    expect(stepPace(50, "more")).toBe(60);
    expect(stepPace(50, "lighter")).toBe(40);
    expect(stepPace(PACE_MAX, "more")).toBe(PACE_MAX);
    expect(stepPace(PACE_MIN, "lighter")).toBe(PACE_MIN);
    expect(stepPace(115, "more")).toBe(PACE_MAX);
    expect(stepPace(25, "lighter")).toBe(PACE_MIN);
  });
  it("Lighter says the finish date it leads to, and when that is after revision starts", () => {
    // 1200 min left from 1 Dec, revision from 21 Jan.
    const line = lighterLine({ remaining: 1200, daily: 30, today: "2026-12-01", buffer: "2027-01-21" });
    expect(line).toBe(`At 20 min a day you finish on ${finishLabel(1200, 20, "2026-12-01")}, after revision starts.`);
    expect(lighterLine({ remaining: 300, daily: 50, today: "2026-12-01", buffer: "2027-01-21" })).toMatch(/^At 40 min a day you finish on \d+ \w+\.$/);
    expect(lighterLine({ remaining: 300, daily: PACE_MIN, today: "2026-12-01", buffer: "2027-01-21" })).toBeNull();
  });
  it("works out the minutes a day that finish by revision, in steps of 5", () => {
    // 36 study days from 1 Dec to 12 Jan; 1800 / 36 = 50.
    expect(minutesToFinishBy(1800, "2026-12-01", "2027-01-12")).toBe(50);
    expect(minutesToFinishBy(1810, "2026-12-01", "2027-01-12")).toBe(55);
    expect(minutesToFinishBy(100, "2027-01-21", "2027-01-21")).toBe(Infinity);
  });
});

function finishLabel(remaining: number, daily: number, today: string): string {
  const d = finishDate(remaining, daily, today);
  const [, m, day] = d.split("-").map(Number);
  return `${day} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1]}`;
}

describe("pace: behind, said honestly (D3)", () => {
  it("is silent on track", () => {
    expect(behindLine({ remaining: 300, daily: 50, today: "2026-12-01", buffer: "2027-01-21" })).toBeNull();
  });
  it("gives the finish date and what More would take to finish by revision", () => {
    const line = behindLine({ remaining: 3000, daily: 40, today: "2026-12-01", buffer: "2027-01-21" });
    expect(line).toBe(`At this pace you finish on ${finishLabel(3000, 40, "2026-12-01")}. Tap More to finish by 21 Jan (about 70 min a day).`);
  });
  it("says so when even the top pace cannot make it, and what happens then", () => {
    const line = behindLine({ remaining: 9000, daily: 60, today: "2026-12-20", buffer: "2027-01-21" });
    expect(line).toBe(`Even at 120 min a day you finish on ${finishLabel(9000, 120, "2026-12-20")}. Chapters left then come first, smallest first.`);
  });
  it("in the revision weeks, says chapters left come first", () => {
    expect(behindLine({ remaining: 200, daily: 60, today: "2027-01-22", buffer: "2027-01-21" })).toBe(
      "Revision has started: chapters left come first, smallest first."
    );
  });
  it("never shows a missed-day count or an em dash", () => {
    const line = behindLine({ remaining: 3000, daily: 40, today: "2026-12-01", buffer: "2027-01-21" })!;
    expect(line).not.toMatch(/missed|streak|—|–/i);
  });
});

describe("papers: done by the Top 10 rule", () => {
  const p: PathPaper = {
    ...paper("p", "physics", 2025),
    slots: [
      [[{ id: "q1", format: "mcq" }]],
      // An OR choice: either half counts.
      [[{ id: "q2a", format: "subjective" }], [{ id: "q2b", format: "subjective" }]],
      // A case study: all its parts.
      [[{ id: "q3i", format: "subjective" }, { id: "q3ii", format: "subjective" }]],
    ],
  };
  it("counts a question answered or marked, an OR by either half, a case study by all its parts", () => {
    const events: ProgressEvent[] = [
      { questionId: "q1", kind: "question_practiced", at: "2026-11-05T10:00:00Z" },
      mark("q2b", "understood"),
      mark("q3i", "review"),
    ];
    expect(paperWorked(p, events)).toEqual({ worked: 2, of: 3, done: false });
    expect(paperWorked(p, [...events, mark("q3ii", "understood")])).toEqual({ worked: 3, of: 3, done: true });
  });
  it("does not count opening the page", () => {
    expect(paperWorked(p, [])).toEqual({ worked: 0, of: 3, done: false });
  });
});

describe("revision: the last three weeks", () => {
  it("starts three weeks before the board exam", () => {
    expect(isRevision("2027-01-20", "2027-02-11")).toBe(false);
    expect(isRevision("2027-01-21", "2027-02-11")).toBe(true);
  });

  it("finds the Top 10 questions whose last mark is Review later", () => {
    const a = ch("a", "physics", 1);
    const facts: ChapterFacts = {
      ...NO_FACTS,
      marks: new Map([
        ["a", [mark("a-q0", "review"), mark("a-q1", "review"), mark("a-q1", "understood", "2026-11-06T10:00:00Z"), mark("a-q2", "understood")]],
      ]),
    };
    expect(reviewPending([a], facts)).toEqual(new Map([["a", ["a-q0"]]]));
  });

  const chapters = [ch("p1", "physics", 1), ch("p2", "physics", 2), ch("c1", "chemistry", 1), ch("m1", "mathematics", 1)];
  const papers = [
    paper("phy-2024", "physics", 2024),
    paper("phy-2025", "physics", 2025),
    paper("che-2025", "chemistry", 2025),
    paper("mat-2025", "mathematics", 2025),
  ];
  const base = {
    chapters,
    deferred: new Set<string>(),
    budget: 60,
    fix: [] as string[],
    papers,
    paperStates: new Map<string, PaperState>(),
    reviews: new Map<string, string[]>(),
    buffer: "2027-01-21",
  };

  it("serves chapters not done first, smallest first, with up to 10 mistakes to fix", () => {
    const states = allDone(chapters);
    states.set("p2", { sheet: true, topWorked: 0, test: false, recordedDone: false }); // 30 + 20 left
    states.set("c1", { sheet: true, topWorked: 10, test: false, recordedDone: false }); // 20 left
    const fix = Array.from({ length: 12 }, (_, i) => `f${i}`);
    const tasks = pickRevisionDay({ ...base, states, fix, today: "2027-01-21" });
    expect(tasks[0]).toEqual({ kind: "fix", questionIds: fix.slice(0, REVISION_FIX_MAX), minutes: 15 });
    expect(tasks[1]).toEqual({ kind: "test", chapterId: "c1", minutes: 20 });
    expect(tasks.some((t) => t.kind === "paper")).toBe(false);
  });

  it("with every chapter done, gives a whole paper on alternate study days, newest first, rotating subjects", () => {
    const states = allDone(chapters);
    const d0 = pickRevisionDay({ ...base, states, today: "2027-01-21" });
    expect(d0).toEqual([{ kind: "paper", paperId: "phy-2025", minutes: 180 }]);
    // Physics served: the next paper day goes to a subject with fewer.
    const served = new Map<string, PaperState>([["phy-2025", { served: true, worked: 3, of: 3, done: true }]]);
    const d2 = pickRevisionDay({ ...base, states, paperStates: served, today: "2027-01-23" });
    expect(d2).toEqual([{ kind: "paper", paperId: "che-2025", minutes: 180 }]);
  });

  it("comes back to a paper started and not finished before a new one", () => {
    const states = allDone(chapters);
    const started = new Map<string, PaperState>([["phy-2025", { served: true, worked: 1, of: 3, done: false }]]);
    expect(pickRevisionDay({ ...base, states, paperStates: started, today: "2027-01-23" })[0]).toEqual({
      kind: "paper",
      paperId: "phy-2025",
      minutes: 180,
    });
  });

  it("between paper days, reworks the chapters with the most Review later questions", () => {
    const states = allDone(chapters);
    const reviews = new Map([
      ["p1", ["p1-q0"]],
      ["c1", ["c1-q0", "c1-q1", "c1-q2"]],
    ]);
    const tasks = pickRevisionDay({ ...base, states, reviews, fix: ["f1", "f2"], today: "2027-01-22" });
    expect(tasks).toEqual([
      { kind: "fix", questionIds: ["f1", "f2"], minutes: 3 },
      { kind: "revise", chapterId: "c1", questionIds: ["c1-q0", "c1-q1", "c1-q2"], minutes: 9 },
      { kind: "revise", chapterId: "p1", questionIds: ["p1-q0"], minutes: 3 },
    ]);
  });

  it("keeps papers to alternate days: with nothing marked Review later, re-reads the sheets read longest ago", () => {
    const states = allDone(chapters);
    const sheetSeenAt = new Map([
      ["p1", "2026-12-01T10:00:00Z"],
      ["p2", "2026-11-20T10:00:00Z"],
      ["c1", "2026-12-20T10:00:00Z"],
      ["m1", "2026-11-25T10:00:00Z"],
    ]);
    const tasks = pickRevisionDay({ ...base, states, sheetSeenAt, today: "2027-01-22" });
    expect(tasks.every((t) => t.kind === "reread")).toBe(true);
    expect(tasks.map((t) => (t.kind === "reread" ? t.chapterId : ""))).toEqual(["p2", "m1", "p1", "c1"]);
    expect(tasks.some((t) => t.kind === "paper")).toBe(false);
  });

  it("re-reads sheets too when every paper is done", () => {
    const states = allDone(chapters);
    const allServed = new Map(papers.map((p) => [p.id, { served: true, worked: 3, of: 3, done: true }]));
    const tasks = pickRevisionDay({ ...base, states, paperStates: allServed, today: "2027-01-21" });
    expect(tasks.length).toBeGreaterThan(0);
    expect(tasks.every((t) => t.kind === "reread")).toBe(true);
  });
});

describe("revision tasks: done, exemptions and the card", () => {
  const chapters = [ch("p1", "physics", 1, "Current Electricity")];
  const papers = [paper("phy-2025", "physics", 2025)];
  const tasks: PathTask[] = [
    { kind: "paper", paperId: "phy-2025", minutes: 180 },
    { kind: "revise", chapterId: "p1", questionIds: ["p1-q0", "p1-q1"], minutes: 6 },
  ];

  it("marks a re-read done when the sheet was opened today", () => {
    const states = allDone(chapters);
    const t: PathTask = { kind: "reread", chapterId: "p1", minutes: 10 };
    expect(taskDone(t, chapters, states, new Set(), new Map(), new Set())).toBe(false);
    expect(taskDone(t, chapters, states, new Set(), new Map(), new Set(["p1"]))).toBe(true);
  });

  it("marks a paper done by its state, a revise task by each question worked today", () => {
    const states = allDone(chapters);
    const paperStates = new Map<string, PaperState>([["phy-2025", { served: true, worked: 3, of: 3, done: true }]]);
    expect(taskDone(tasks[0], chapters, states, new Set(), paperStates)).toBe(true);
    expect(taskDone(tasks[1], chapters, states, new Set(["p1-q0"]), paperStates)).toBe(false);
    expect(taskDone(tasks[1], chapters, states, new Set(["p1-q0", "p1-q1"]), paperStates)).toBe(true);
  });

  it("lifts the free answer limit on today's paper and revise questions", () => {
    const ex = todayExemptions(tasks, chapters, papers);
    expect(ex.revealIds.sort()).toEqual(["p1-q0", "p1-q1", "phy-2025-q0", "phy-2025-q1", "phy-2025-q2"].sort());
  });

  it("shows a paper as a whole timed paper linked to its page, and a revise task linked to the Top 10", () => {
    const v = buildPathView({
      exam: "cbse-12",
      subjects: ["physics"],
      stream: "pcm",
      dailyMinutes: 60,
      chapters,
      states: allDone(chapters),
      tasks,
      fixAnswered: new Set(),
      today: "2027-01-26",
      examDate: "2027-02-15",
      examOfficial: false,
      papers,
      paperStates: new Map([["phy-2025", { served: true, worked: 1, of: 3, done: false }]]),
    });
    expect(v.mode).toBe("revision");
    expect(v.tasks[0]).toMatchObject({
      kind: "paper",
      title: "Write a board paper, timed",
      detail: "Physics · 2025 (Set 1), 3 hours",
      href: "/question-papers/cbse-12/physics/phy-2025",
      progress: "1 of 3 checked",
      canDefer: false,
    });
    expect(v.tasks[1]).toMatchObject({
      kind: "revise",
      title: "Rework your Review later questions",
      detail: "Physics · Current Electricity · 2 questions",
      href: "/board/cbse-12/physics/p1#top",
    });
    expect(v.statusLine).toBe("Physics 1 of 1, revision weeks");
  });

  it("says behind in the card's own words and offers More and Lighter", () => {
    const v = buildPathView({
      exam: "cbse-12",
      subjects: ["physics"],
      stream: "pcm",
      dailyMinutes: 30,
      chapters: Array.from({ length: 40 }, (_, i) => ch(`x${i}`, "physics", i + 1)),
      states: new Map(),
      tasks: [],
      fixAnswered: new Set(),
      today: "2026-12-10",
      examDate: "2027-02-15",
      examOfficial: false,
    });
    expect(v.behind).toMatch(/^At this pace you finish on .+\. Tap More to finish by 25 Jan \(about \d+ min a day\)\.$/);
    expect(v.canMore).toBe(true);
    expect(v.canLighter).toBe(true);
    expect(v.lighter).toMatch(/^At 20 min a day you finish on .+, after revision starts\.$/);
  });
});

describe("the week ahead in the revision weeks", () => {
  it("projects papers and rework days and reads them as short lines", () => {
    const chapters = [ch("p1", "physics", 1, "Current Electricity"), ch("c1", "chemistry", 1, "Solutions")];
    const papers = [paper("phy-2025", "physics", 2025), paper("che-2025", "chemistry", 2025)];
    const reviews = new Map([["p1", ["p1-q0", "p1-q1"]]]);
    const days = projectWeek({
      chapters,
      states: allDone(chapters),
      deferred: new Set(),
      budget: 60,
      today: "2027-01-21",
      todayTasks: [{ kind: "paper", paperId: "phy-2025", minutes: 180 }],
      days: 3,
      revision: { buffer: "2027-01-21", papers, paperStates: new Map(), reviews },
    });
    expect(days.map((d) => d.tasks.map((t) => t.kind))).toEqual([["paper"], ["revise"], ["paper"]]);
    const lines = weekText(days, chapters, papers);
    expect(lines[0]).toBe("Thu 21 Jan: Physics paper 2025 (Set 1)");
    expect(lines[1]).toBe("Fri 22 Jan: Current Electricity: rework 2 Review later questions");
    expect(lines[2]).toBe("Sat 23 Jan: Chemistry paper 2025 (Set 1)");
    // No more Review later questions: the next in-between day re-reads sheets.
    const more = projectWeek({
      chapters,
      states: allDone(chapters),
      deferred: new Set(),
      budget: 25,
      today: "2027-01-21",
      todayTasks: [{ kind: "paper", paperId: "phy-2025", minutes: 180 }],
      days: 4,
      revision: { buffer: "2027-01-21", papers, paperStates: new Map(), reviews, sheetSeenAt: new Map() },
    });
    expect(weekText(more, chapters, papers)[3]).toBe("Sun 24 Jan: Current Electricity: revision sheet again; Solutions: revision sheet again");
  });
});

describe("the pace action", () => {
  it("takes lighter or more", () => {
    expect(parsePathAction({ action: "pace", direction: "more" })).toEqual({ ok: true, value: { action: "pace", direction: "more" } });
    expect(parsePathAction({ action: "pace", direction: "lighter" }).ok).toBe(true);
    expect(parsePathAction({ action: "pace", direction: "faster" }).ok).toBe(false);
    expect(parsePathAction({ action: "pace", minutes: 200 }).ok).toBe(false);
  });
});

describe("papers: read from the paper's printed items", () => {
  it("labels a paper by its year and code, or its sitting", () => {
    expect(paperLabel({ year: 2026, title: "CBSE Class 12 Physics 2026 (55/1/1)", sitting: null })).toBe("2026 (55/1/1)");
    expect(paperLabel({ year: 2025, title: "Maharashtra HSC Physics", sitting: "March" })).toBe("2025 March");
    expect(paperLabel({ year: 2024, title: null, sitting: null })).toBe("2024");
  });
  it("builds a slot per printed question: its parts together, its OR twin as the other option", () => {
    // The shape of a real HSC paper: 6 (A) with parts, OR 6 (B) with parts.
    const it = (position: number, q: string | null, part_of: number | null = null, alternative_to: number | null = null) => ({
      paper_id: "p",
      position,
      part_of,
      alternative_to,
      question_id: q,
    });
    const items = [it(1, "q1"), it(27, "a"), it(28, "a1", 27), it(29, "a2", 27), it(31, "b", null, 27), it(32, "b1", 31)];
    const slots = paperSlots(items, new Map([["q1", "mcq"]]));
    expect(slots.map((s) => s.map((o) => o.map((q) => q.id)))).toEqual([[["q1"]], [["a", "a1", "a2"], ["b", "b1"]]]);
    expect(slots[0][0][0].format).toBe("mcq");
    expect(slots[1][0][0].format).toBe("mcq");
  });
});

describe("revision: a replan keeps what is already done on the card", () => {
  const chapters = [ch("p1", "physics", 1), ch("c1", "chemistry", 1)];
  const papers = [paper("phy-2025", "physics", 2025), paper("che-2025", "chemistry", 2025)];
  const states = allDone(chapters);
  it("adds no second paper to a day that already holds one", () => {
    const keep: PathTask[] = [{ kind: "paper", paperId: "phy-2025", minutes: 180 }];
    const tasks = pickRevisionDay({
      chapters,
      states,
      deferred: new Set(),
      budget: 60,
      fix: [],
      papers,
      paperStates: new Map([["phy-2025", { served: true, worked: 3, of: 3, done: true }]]),
      reviews: new Map(),
      today: "2027-01-21",
      buffer: "2027-01-21",
      keep,
    });
    expect(tasks).toEqual(keep);
  });
  it("does not rework a chapter twice in a day", () => {
    const keep: PathTask[] = [{ kind: "revise", chapterId: "p1", questionIds: ["p1-q0"], minutes: 3 }];
    const tasks = pickRevisionDay({
      chapters,
      states,
      deferred: new Set(),
      budget: 60,
      fix: [],
      papers: [],
      paperStates: new Map(),
      reviews: new Map([
        ["p1", ["p1-q0"]],
        ["c1", ["c1-q0"]],
      ]),
      today: "2027-01-22",
      buffer: "2027-01-21",
      keep,
    });
    expect(tasks.map((t) => (t.kind === "revise" ? t.chapterId : t.kind))).toEqual(["p1", "c1"]);
  });
});
