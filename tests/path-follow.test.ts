/**
 * The board plan follows the class (MENTOR_SPEC.md §18, 2026-11-15).
 *
 * A week in, 94% of the questions plan students practised on plan days were
 * on chapters the plan had not picked, and no student had finished a chapter.
 * So:
 *   - covered: "What has your class covered?" ticks the taught chapters; an
 *     unticked chapter with no work in it waits. No ticks = book order.
 *   - follow: a plan chapter worked on in the last 7 days and not finished
 *     comes before the next new chapter, the most recent first.
 *   - switch: "Switch chapter" puts the chosen chapter first today, keeping
 *     the Fix task and what is done; 3 switches a day.
 *   - Top 10 in parts of 5: a Top 10 task holds at most 5 questions (15 min);
 *     the chapter is still done only when all 10 are worked.
 *
 * Pure. No DB, no clock.
 */
import { describe, it, expect } from "vitest";
import type { ChapterState, PathChapter } from "@/lib/path/model";
import { isChapterTask, pickToday, taskDone, todayExemptions, withPartDone, type PathTask } from "@/lib/path/today";
import {
  FOLLOW_DAYS,
  SWITCHES_PER_DAY,
  coverList,
  mergeWork,
  recentWork,
  switchesLeft,
  waitingChapters,
} from "@/lib/path/covered";
import { buildPathView, creditLine } from "@/lib/path/view";

const slot = (id: string) => [{ id, format: "mcq" as const }];
const tenSlots = (p: string) => Array.from({ length: 10 }, (_, i) => slot(`${p}-q${i}`));

function ch(id: string, subject: PathChapter["subject"], rank: number): PathChapter {
  return {
    id,
    name: `Chapter ${id}`,
    subject,
    queue: subject,
    rank,
    boardPath: `/board/mh-hsc-12/${subject}/${id}`,
    top: tenSlots(id),
    test: { mockId: `m-${id}`, slug: `test-${id}`, minutes: 15 },
  };
}
const fresh: ChapterState = { sheet: false, topWorked: 0, test: false, recordedDone: false };
const physics = [ch("p1", "physics", 1), ch("p2", "physics", 2), ch("p3", "physics", 3)];
const chem = [ch("c1", "chemistry", 1), ch("c2", "chemistry", 2)];
const all = [...physics, ...chem];
const none = new Map<string, ChapterState>();
const ids = (tasks: PathTask[]) =>
  tasks.map((t) => (isChapterTask(t) ? `${t.chapterId}:${t.kind}${t.kind === "top" && t.upTo ? `@${t.upTo}` : ""}` : t.kind));

describe("covered: what the class has taught", () => {
  it("waits nothing when the student ticked nothing: book order, as before", () => {
    expect(waitingChapters(["p1", "p2"], new Set(), new Set())).toEqual(new Set());
  });

  it("waits an unticked chapter with no work in it", () => {
    expect(waitingChapters(["p1", "p2", "p3"], new Set(["p2"]), new Set())).toEqual(new Set(["p1", "p3"]));
  });

  it("never waits a chapter the student has worked on, ticked or not", () => {
    expect(waitingChapters(["p1", "p2", "p3"], new Set(["p2"]), new Set(["p3"]))).toEqual(new Set(["p1"]));
  });

  it("keeps the latest moment per chapter when work comes from two reads", () => {
    const merged = mergeWork(
      new Map([["p1", "2026-11-10T00:00:00Z"]]),
      new Map([["p1", "2026-11-12T00:00:00Z"], ["c1", "2026-11-01T00:00:00Z"]])
    );
    expect(merged.get("p1")).toBe("2026-11-12T00:00:00Z");
    expect(merged.get("c1")).toBe("2026-11-01T00:00:00Z");
  });

  it("counts work as recent for 7 days", () => {
    const now = new Date("2026-11-15T12:00:00Z");
    const work = new Map([
      ["p1", "2026-11-14T00:00:00Z"],
      ["p2", "2026-11-07T00:00:00Z"],
    ]);
    expect(FOLLOW_DAYS).toBe(7);
    expect([...recentWork(work, now).keys()]).toEqual(["p1"]);
  });

  it("allows 3 switches a day", () => {
    expect(SWITCHES_PER_DAY).toBe(3);
    expect(switchesLeft(0)).toBe(3);
    expect(switchesLeft(2)).toBe(1);
    expect(switchesLeft(5)).toBe(0);
  });

  it("lists each subject's chapters in book order, pre-ticking practised ones the first time", () => {
    const list = coverList({
      chapters: [physics[1], physics[0], chem[0]],
      subjects: ["physics", "chemistry"],
      asked: false,
      ticked: new Set(),
      practised: new Set(["p2"]),
    });
    expect(list.map((s) => s.label)).toEqual(["Physics", "Chemistry"]);
    expect(list[0].chapters.map((c) => [c.id, c.ticked, c.practised])).toEqual([
      ["p1", false, false],
      ["p2", true, true],
    ]);
  });

  it("shows the student's own ticks once they have answered", () => {
    const list = coverList({
      chapters: physics,
      subjects: ["physics"],
      asked: true,
      ticked: new Set(["p1"]),
      practised: new Set(["p2"]),
    });
    expect(list[0].chapters.map((c) => c.ticked)).toEqual([true, false, false]);
    expect(list[0].chapters.map((c) => c.practised)).toEqual([false, true, false]);
  });
});

describe("today: the plan follows the student's work", () => {
  it("starts with a chapter worked on in the last 7 days, before the next new one", () => {
    const states = new Map<string, ChapterState>([["p3", { ...fresh, test: true }]]);
    const tasks = pickToday({
      chapters: all,
      states,
      deferred: new Set(),
      budget: 45,
      fix: [],
      recent: new Map([["p3", "2026-11-14T10:00:00Z"]]),
    });
    expect(ids(tasks)[0]).toBe("p3:sheet");
  });

  it("takes the most recent of two worked chapters first", () => {
    const tasks = pickToday({
      chapters: all,
      states: none,
      deferred: new Set(),
      budget: 10,
      fix: [],
      recent: new Map([
        ["p3", "2026-11-12T10:00:00Z"],
        ["c2", "2026-11-14T10:00:00Z"],
      ]),
    });
    expect(ids(tasks)[0]).toBe("c2:sheet");
  });

  it("skips a worked chapter that is already done: the usual pick stands", () => {
    const done = new Map<string, ChapterState>([["p3", { ...fresh, recordedDone: true }]]);
    const tasks = pickToday({ chapters: all, states: done, deferred: new Set(), budget: 10, fix: [], recent: new Map([["p3", "2026-11-14T10:00:00Z"]]) });
    const usual = pickToday({ chapters: all, states: done, deferred: new Set(), budget: 10, fix: [] });
    expect(ids(tasks)).toEqual(ids(usual));
    expect(ids(tasks)[0]).not.toContain("p3");
  });

  it("skips a waiting chapter for a taught one in the same subject", () => {
    const tasks = pickToday({ chapters: physics, states: none, deferred: new Set(["p1", "p2"]), budget: 10, fix: [] });
    expect(ids(tasks)[0]).toBe("p3:sheet");
  });

  it("keeps the Fix task first", () => {
    const tasks = pickToday({ chapters: all, states: none, deferred: new Set(), budget: 30, fix: ["x"], recent: new Map([["c2", "2026-11-14T10:00:00Z"]]) });
    expect(ids(tasks).slice(0, 2)).toEqual(["fix", "c2:sheet"]);
  });
});

describe("today: Switch chapter", () => {
  it("puts the chosen chapter first after the Fix task and what is already done", () => {
    const keep: PathTask[] = [
      { kind: "fix", questionIds: ["x"], minutes: 2 },
      { kind: "sheet", chapterId: "p1", minutes: 10 },
    ];
    const states = new Map<string, ChapterState>([["p1", { ...fresh, sheet: true }]]);
    const tasks = pickToday({ chapters: all, states, deferred: new Set(), budget: 45, fix: ["x"], keep, focus: "c2" });
    expect(ids(tasks).slice(0, 3)).toEqual(["fix", "p1:sheet", "c2:sheet"]);
    expect(ids(tasks)[3]).toBe("c2:top@5");
  });

  it("works a chosen chapter even when it is waiting", () => {
    const tasks = pickToday({ chapters: all, states: none, deferred: new Set(["c2"]), budget: 10, fix: [], focus: "c2" });
    expect(ids(tasks)[0]).toBe("c2:sheet");
  });

  it("ignores a chosen chapter that is done", () => {
    const states = new Map<string, ChapterState>([["c2", { ...fresh, recordedDone: true }]]);
    const tasks = pickToday({ chapters: all, states, deferred: new Set(), budget: 10, fix: [], focus: "c2" });
    expect(ids(tasks)[0]).toBe("p1:sheet");
  });
});

describe("today: the Top 10 in parts of 5", () => {
  it("serves at most 5 Top 10 questions a task, 15 minutes", () => {
    const states = new Map<string, ChapterState>([["p1", { ...fresh, sheet: true }]]);
    const [t] = pickToday({ chapters: physics, states, deferred: new Set(), budget: 10, fix: [] });
    expect(t).toEqual({ kind: "top", chapterId: "p1", minutes: 15, upTo: 5 });
  });

  it("serves the rest when fewer than 5 are left", () => {
    const states = new Map<string, ChapterState>([["p1", { ...fresh, sheet: true, topWorked: 7 }]]);
    const [t] = pickToday({ chapters: physics, states, deferred: new Set(), budget: 5, fix: [] });
    expect(t).toEqual({ kind: "top", chapterId: "p1", minutes: 9, upTo: 10 });
  });

  it("a long day may hold both halves, then the test", () => {
    const tasks = pickToday({ chapters: physics, states: none, deferred: new Set(), budget: 60, fix: [] });
    expect(ids(tasks)).toEqual(["p1:sheet", "p1:top@5", "p1:top@10", "p1:test"]);
  });

  it("marks a part done when its questions are worked, the chapter only at all 10", () => {
    const c = physics[0];
    const half: PathTask = { kind: "top", chapterId: "p1", minutes: 15, upTo: 5 };
    const rest: PathTask = { kind: "top", chapterId: "p1", minutes: 15, upTo: 10 };
    const six = new Map<string, ChapterState>([["p1", { ...fresh, topWorked: 6 }]]);
    expect(taskDone(half, [c], six, new Set())).toBe(true);
    expect(taskDone(rest, [c], six, new Set())).toBe(false);
  });

  it("keeps the old rule for a Top 10 task stored before the split", () => {
    const c = physics[0];
    const old: PathTask = { kind: "top", chapterId: "p1", minutes: 30 };
    expect(taskDone(old, [c], new Map([["p1", { ...fresh, topWorked: 6 }]]), new Set())).toBe(false);
    expect(taskDone(old, [c], new Map([["p1", { ...fresh, topWorked: 10 }]]), new Set())).toBe(true);
  });

  it("moves the simulated count to the part's end, not the whole 10", () => {
    expect(withPartDone(physics[0], fresh, "top", 5).topWorked).toBe(5);
    expect(withPartDone(physics[0], fresh, "top").topWorked).toBe(10);
  });

  it("still lifts all of the chapter's Top 10 from the free limits", () => {
    const ex = todayExemptions([{ kind: "top", chapterId: "p1", minutes: 15, upTo: 5 }], physics);
    expect(ex.revealIds).toHaveLength(10);
  });
});

describe("the card: today's chapter, what counted, and the switch list", () => {
  const states = new Map<string, ChapterState>([
    ["c1", { sheet: true, topWorked: 4, test: true, recordedDone: false }],
    ["p2", { ...fresh, sheet: true }],
  ]);
  const base = {
    exam: "mh-hsc-12" as const,
    subjects: ["physics", "chemistry"] as ("physics" | "chemistry")[],
    stream: "pcm" as const,
    dailyMinutes: 50,
    chapters: all,
    states,
    tasks: [
      { kind: "fix", questionIds: ["x"], minutes: 2 },
      { kind: "top", chapterId: "c1", minutes: 15, upTo: 9 },
      { kind: "top", chapterId: "c1", minutes: 3, upTo: 10 },
    ] as PathTask[],
    fixAnswered: new Set<string>(),
    today: "2026-11-15",
    examDate: "2027-02-20",
    examOfficial: false,
  };

  it("titles the Top 10 parts by what is left", () => {
    const v = buildPathView(base);
    expect(v.tasks.map((t) => t.title)).toEqual(["Fix 1 mistake", "Top 10: 5 more questions", "Top 10: last question"]);
    expect(new Set(v.tasks.map((t) => t.key)).size).toBe(3);
    // The count shows once, on the first part.
    expect(v.tasks.map((t) => t.progress)).toEqual([null, "4 of 10", null]);
  });

  it("calls a chapter's opening part its first questions", () => {
    const v = buildPathView({ ...base, tasks: [{ kind: "top", chapterId: "p1", minutes: 15, upTo: 5 }] });
    expect(v.tasks[0].title).toBe("Top 10: first 5 questions");
    expect(v.tasks[0].progress).toBe("0 of 10");
  });

  it("shows today's chapter with its three steps and what already counted", () => {
    const v = buildPathView({ ...base, partAt: { sheetAt: new Map([["c1", "2026-11-10T05:00:00Z"]]), testAt: new Map([["c1", "2026-11-13T05:00:00Z"]]) } });
    expect(v.focus?.chapterId).toBe("c1");
    expect(v.focus?.parts.map((p) => [p.part, p.done])).toEqual([
      ["sheet", true],
      ["top", false],
      ["test", true],
    ]);
    expect(v.focus?.credit).toBe("You took this chapter's test on Fri 13 Nov, so we've counted it. Finish the Top 10 and it's done.");
  });

  it("lists chapters to switch to: taught first, then subject and book order, never done or already today's", () => {
    const done = new Map(states);
    done.set("p3", { ...fresh, recordedDone: true });
    const v = buildPathView({ ...base, states: done, taught: new Set(["c2", "p2"]), switchesUsed: 1 });
    expect(v.switchOptions.map((o) => o.id)).toEqual(["p2", "c2", "p1"]);
    expect(v.switchOptions[0]).toMatchObject({ taught: true, stepsDone: 1, stepsOf: 3, subjectLabel: "Physics" });
    expect(v.switchOptions.find((o) => o.id === "p1")?.taught).toBe(false);
    expect(v.switchesLeft).toBe(2);
  });

  it("says nothing about taught when the student ticked nothing (book order)", () => {
    const v = buildPathView({ ...base, taught: null });
    expect(v.switchOptions.every((o) => o.taught === null)).toBe(true);
    expect(v.switchesLeft).toBe(3);
  });

  it("carries the class checklist only when asked for it", () => {
    expect(buildPathView(base).cover).toBeNull();
    const v = buildPathView({ ...base, cover: { asked: false, ticked: new Set(), practised: new Set(["c1"]) } });
    expect(v.cover?.asked).toBe(false);
    expect(v.cover?.subjects[1].chapters.find((c) => c.id === "c1")?.ticked).toBe(true);
  });
});

describe("creditLine: what work done off the plan already counts", () => {
  const c = physics[0];
  it("names the test first when it was taken before today", () => {
    expect(creditLine(c, { ...fresh, test: true }, { testAt: "2026-11-13T05:00:00Z" }, "2026-11-15")).toBe(
      "You took this chapter's test on Fri 13 Nov, so we've counted it. Read the revision sheet and finish the Top 10, and it's done."
    );
  });
  it("names Top 10 work when there was no test", () => {
    expect(creditLine(c, { ...fresh, topWorked: 4 }, {}, "2026-11-15")).toBe(
      "You've already worked 4 of its Top 10, so we've counted them. Read the revision sheet, finish the Top 10 and take the chapter test, and it's done."
    );
  });
  it("says nothing when nothing was done before today", () => {
    expect(creditLine(c, { ...fresh, sheet: true }, { sheetAt: "2026-11-15T03:00:00Z" }, "2026-11-15")).toBeNull();
    expect(creditLine(c, fresh, {}, "2026-11-15")).toBeNull();
  });
});
