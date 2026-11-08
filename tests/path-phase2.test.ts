/**
 * The board path, Phase 2 (MENTOR_SPEC.md §4 "V's part"): the pure core.
 *
 * - fold: a chapter's state as of any moment, from timestamped records, so
 *   the weekly review can compare a week ago with now.
 * - review: the path's 7-day weeks, shown the first 2 days of each new week;
 *   what went well first, never a bare zero, the finish date only if it moved.
 * - view: "Pick up here" after 3+ days with no path work; the chapter-done
 *   message V says where the chapter finishes.
 * - week: the next days if the student does each day's card (V's answer to
 *   "plan my week" for a path student).
 * - board: the line on a /board chapter page, and the pulse's path state.
 */
import { describe, it, expect, vi } from "vitest";
import { ensureExemptions, NO_EXEMPTIONS } from "@/lib/path/exemptions";
import type { ChapterState, PathChapter } from "@/lib/path/model";
import { foldStates, NO_FACTS, type ChapterFacts } from "@/lib/path/fold";
import { buildWeekReview, pathWeek, reviewLines, reviewWindow, REVIEW_SHOW_DAYS } from "@/lib/path/review";
import { buildPathView, chapterDoneMessage, chapterLine, PICK_UP_GAP_DAYS, pickUpLine } from "@/lib/path/view";
import { projectWeek, weekdayLabel, weekText } from "@/lib/path/week";
import { pathPulseState } from "@/lib/path/model";
import type { PathTask } from "@/lib/path/today";

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

/** Every Top 10 question of a chapter answered at `at`. */
function workedTop(c: PathChapter, at: string) {
  return c.top.flat().map((q) => ({ questionId: q.id, kind: "question_practiced" as const, at }));
}

function facts(p: Partial<{ [K in keyof ChapterFacts]: [string, ChapterFacts[K] extends ReadonlyMap<string, infer V> ? V : never][] }>): ChapterFacts {
  return {
    marks: new Map(p.marks ?? []),
    sheetAt: new Map(p.sheetAt ?? []),
    testAt: new Map(p.testAt ?? []),
    doneAt: new Map(p.doneAt ?? []),
  };
}

describe("fold: a chapter's state as of a moment", () => {
  const a = ch("a", "physics", 1);
  const f = facts({
    sheetAt: [["a", "2026-11-03T10:00:00+00:00"]],
    marks: [["a", workedTop(a, "2026-11-05T10:00:00.000Z")]],
    testAt: [["a", "2026-11-09T08:00:00+00:00"]],
    doneAt: [["a", "2026-11-09T08:05:00+00:00"]],
  });

  it("counts every record with no moment given", () => {
    expect(foldStates([a], f).get("a")).toEqual({ sheet: true, topWorked: 10, test: true, recordedDone: true });
  });
  it("leaves out what came after the moment", () => {
    expect(foldStates([a], f, "2026-11-04T00:00:00.000Z").get("a")).toEqual({ sheet: true, topWorked: 0, test: false, recordedDone: false });
    expect(foldStates([a], f, "2026-11-08T00:00:00.000Z").get("a")).toEqual({ sheet: true, topWorked: 10, test: false, recordedDone: false });
  });
  it("compares moments as instants, not as text (the database writes +00:00, JavaScript writes Z)", () => {
    // 10:00+00:00 is after 09:59Z even though "+" sorts before "Z"... and the
    // same instant written two ways is the same moment.
    expect(foldStates([a], f, "2026-11-03T09:59:00.000Z").get("a")?.sheet).toBe(false);
    expect(foldStates([a], f, "2026-11-03T10:00:00.000Z").get("a")?.sheet).toBe(true);
  });
  it("gives a chapter with no records nothing done", () => {
    expect(foldStates([a], NO_FACTS).get("a")).toEqual({ sheet: false, topWorked: 0, test: false, recordedDone: false });
  });
});

describe("review: the path's weeks", () => {
  it("counts 7-day weeks from the day the path started", () => {
    expect(pathWeek("2026-11-08", "2026-11-08")).toEqual({ index: 0, dayInWeek: 0, weekStart: "2026-11-08" });
    expect(pathWeek("2026-11-08", "2026-11-14")).toEqual({ index: 0, dayInWeek: 6, weekStart: "2026-11-08" });
    expect(pathWeek("2026-11-08", "2026-11-15")).toEqual({ index: 1, dayInWeek: 0, weekStart: "2026-11-15" });
    expect(pathWeek("2026-11-08", "2026-11-23")).toEqual({ index: 2, dayInWeek: 1, weekStart: "2026-11-22" });
  });
  it(`shows the review of the week just ended for the first ${REVIEW_SHOW_DAYS} days of a new week, never in the first week`, () => {
    expect(reviewWindow("2026-11-08", "2026-11-10")).toBeNull();
    expect(reviewWindow("2026-11-08", "2026-11-15")).toEqual({ from: "2026-11-08", to: "2026-11-15" });
    expect(reviewWindow("2026-11-08", "2026-11-16")).toEqual({ from: "2026-11-08", to: "2026-11-15" });
    expect(reviewWindow("2026-11-08", "2026-11-17")).toBeNull();
    expect(reviewWindow("2026-11-08", "2026-11-22")).toEqual({ from: "2026-11-15", to: "2026-11-22" });
  });
});

describe("review: what the week did", () => {
  const sol = ch("sol", "chemistry", 1, "Solutions");
  const ele = ch("ele", "chemistry", 2, "Electrochemistry");
  const kin = ch("kin", "chemistry", 3, "Chemical Kinetics");
  const chapters = [sol, ele, kin];
  // Solutions done before the week; Electrochemistry done in it; Kinetics' sheet read in it.
  const f = facts({
    sheetAt: [
      ["sol", "2026-11-09T05:00:00Z"],
      ["ele", "2026-11-16T05:00:00Z"],
      ["kin", "2026-11-20T05:00:00Z"],
    ],
    marks: [
      ["sol", workedTop(sol, "2026-11-10T05:00:00Z")],
      ["ele", workedTop(ele, "2026-11-17T05:00:00Z")],
    ],
    testAt: [
      ["sol", "2026-11-11T05:00:00Z"],
      ["ele", "2026-11-18T05:00:00Z"],
    ],
  });
  const review = buildWeekReview({ chapters, facts: f, from: "2026-11-15", to: "2026-11-22", daily: 40, fixed: 6, next: "Chemical Kinetics" });

  it("names the chapters finished in the week, and counts the other parts done", () => {
    expect(review.chaptersDone).toEqual(["Electrochemistry"]);
    expect(review.sheets).toBe(1);
    expect(review.tops).toBe(0);
    expect(review.tests).toBe(0);
    expect(review.fixed).toBe(6);
    expect(review.next).toBe("Chemical Kinetics");
  });
  it("gives the finish date at the week's start and at its end when they differ", () => {
    expect(review.finish).not.toBeNull();
    expect(review.finish!.now < review.finish!.was || review.finish!.now > review.finish!.was).toBe(true);
  });

  it("says what went well first, then what is next, then the finish date", () => {
    const lines = reviewLines({ chaptersDone: ["Solutions", "Electrochemistry"], sheets: 0, tops: 0, tests: 0, fixed: 9, next: "Chemical Kinetics", finish: { was: "2027-02-02", now: "2027-01-29" } });
    expect(lines).toEqual([
      "Last week: 2 chapters done (Solutions, Electrochemistry), 9 mistakes fixed.",
      "Next: Chemical Kinetics.",
      "Finish date now 29 Jan (was 2 Feb).",
    ]);
  });
  it("counts parts when no chapter finished", () => {
    expect(reviewLines({ chaptersDone: [], sheets: 2, tops: 1, tests: 0, fixed: 0, next: "Atoms", finish: null })[0]).toBe(
      "Last week: 2 revision sheets and 1 Top 10 done."
    );
    expect(reviewLines({ chaptersDone: ["Atoms"], sheets: 0, tops: 0, tests: 0, fixed: 1, next: null, finish: null })[0]).toBe(
      "Last week: 1 chapter done (Atoms), 1 mistake fixed."
    );
  });
  it("never shows a zero: a quiet week opens on the new week, not on what was missed", () => {
    const lines = reviewLines({ chaptersDone: [], sheets: 0, tops: 0, tests: 0, fixed: 0, next: "Atoms", finish: null });
    expect(lines).toEqual(["A new week of your plan.", "Next: Atoms."]);
    expect(lines.join(" ")).not.toMatch(/\b0\b|missed|streak/i);
  });
  it("carries no em dash", () => {
    expect(reviewLines({ chaptersDone: ["A"], sheets: 1, tops: 1, tests: 1, fixed: 2, next: "B", finish: { was: "2027-02-02", now: "2027-02-05" } }).join(" ")).not.toMatch(/—|–/);
  });
});

describe("view: pick up here, after a gap", () => {
  const ce = ch("ce", "physics", 1, "Current Electricity");
  const tasks: PathTask[] = [
    { kind: "fix", questionIds: ["x"], minutes: 2 },
    { kind: "top", chapterId: "ce", minutes: 18 },
  ];
  const view = (lastWorkDay: string | null, today: string) =>
    buildPathView({
      exam: "cbse-12",
      subjects: ["physics"],
      stream: "pcm",
      dailyMinutes: 40,
      chapters: [ce],
      states: new Map<string, ChapterState>([["ce", { sheet: true, topWorked: 4, test: false, recordedDone: false }]]),
      tasks,
      fixAnswered: new Set(),
      today,
      examDate: "2027-02-15",
      examOfficial: false,
      startDay: "2026-11-01",
      lastWorkDay,
    });

  it(`opens on the next chapter task after ${PICK_UP_GAP_DAYS}+ days with no path work`, () => {
    expect(view("2026-11-05", "2026-11-08").pickUp).toBe("Current Electricity, Top 10");
    expect(view("2026-11-06", "2026-11-08").pickUp).toBeNull();
  });
  it("counts from the path's start when nothing was done yet", () => {
    expect(view(null, "2026-11-04").pickUp).toBe("Current Electricity, Top 10");
    expect(view(null, "2026-11-02").pickUp).toBeNull();
  });
  it("names no task once today's are all done", () => {
    expect(pickUpLine([], null, "2026-11-01", "2026-11-09")).toBeNull();
  });
});

describe("view: the chapter-done message", () => {
  it("names the chapter and the subject's count", () => {
    expect(chapterDoneMessage("Solutions", { subject: "chemistry", label: "Chemistry", done: 2, of: 16 })).toBe(
      "Chapter done: Solutions. Chemistry 2 of 16."
    );
  });
  it("says so when it was the subject's last chapter", () => {
    expect(chapterDoneMessage("Biomolecules", { subject: "chemistry", label: "Chemistry", done: 10, of: 10 })).toBe(
      "Chapter done: Biomolecules. That's every Chemistry chapter."
    );
  });
  it("is listed on the view for each chapter newly done", () => {
    const sol = ch("sol", "chemistry", 1, "Solutions");
    const v = buildPathView({
      exam: "cbse-12",
      subjects: ["chemistry"],
      stream: "pcm",
      dailyMinutes: 40,
      chapters: [sol, ch("ele", "chemistry", 2)],
      states: new Map<string, ChapterState>([["sol", { sheet: true, topWorked: 10, test: true, recordedDone: true }]]),
      tasks: [],
      fixAnswered: new Set(),
      today: "2026-11-20",
      examDate: "2027-02-15",
      examOfficial: false,
      newlyDone: ["sol"],
    });
    expect(v.celebrate).toEqual(["Chapter done: Solutions. Chemistry 1 of 2."]);
  });
});

describe("week: the next days if each day's card is done", () => {
  const a = ch("a", "physics", 1, "Rotational Dynamics");
  const b = ch("b", "physics", 2, "Fluids");
  const c = ch("c", "chemistry", 1, "Solid State");
  const chapters = [a, b, c];
  const todayTasks: PathTask[] = [
    { kind: "fix", questionIds: ["x", "y"], minutes: 3 },
    { kind: "sheet", chapterId: "a", minutes: 10 },
    { kind: "top", chapterId: "a", minutes: 30 },
  ];
  const days = projectWeek({ chapters, states: new Map(), deferred: new Set(), budget: 45, today: "2026-11-09", todayTasks, days: 3 });

  it("keeps today's card as it is, then picks each next day as if the one before was done", () => {
    expect(days.map((d) => d.day)).toEqual(["2026-11-09", "2026-11-10", "2026-11-11"]);
    expect(days[0].tasks).toEqual(todayTasks);
    // Day 2 turns to the subject furthest behind (Phase 1's rule); the test of
    // the chapter started today comes a day later, spaced.
    expect(days[1].tasks[0]).toEqual({ kind: "sheet", chapterId: "c", minutes: 10 });
    expect(days[2].tasks[0]).toEqual({ kind: "test", chapterId: "a", minutes: 20 });
    // Never a chapter part twice across the days.
    const parts = days.flatMap((d) => d.tasks.filter((t) => t.kind !== "fix").map((t) => `${t.kind}:${"chapterId" in t ? t.chapterId : ""}`));
    expect(new Set(parts).size).toBe(parts.length);
  });
  it("adds no Fix task to a future day: which mistakes wait is not known yet", () => {
    expect(days.slice(1).every((d) => d.tasks.every((t) => t.kind !== "fix"))).toBe(true);
  });
  it("reads each day as a short line", () => {
    expect(weekdayLabel("2026-11-09")).toBe("Mon 9 Nov");
    const lines = weekText(days, chapters);
    expect(lines[0]).toBe("Mon 9 Nov: fix 2 mistakes; Rotational Dynamics: revision sheet, Top 10");
    expect(lines[1]).toBe("Tue 10 Nov: Solid State: revision sheet, Top 10");
    expect(lines[2].startsWith("Wed 11 Nov: Rotational Dynamics: chapter test; Fluids:")).toBe(true);
  });
  it("stops when every chapter is done", () => {
    const all = new Map(chapters.map((x) => [x.id, { sheet: true, topWorked: 10, test: true, recordedDone: true }]));
    expect(projectWeek({ chapters, states: all, deferred: new Set(), budget: 45, today: "2026-11-09", todayTasks: [], days: 6 })).toEqual([]);
  });
});

describe("board: the line on a chapter page", () => {
  const ce = ch("ce", "physics", 1, "Current Electricity");
  it("shows each part with the Top 10's count, and today's part of this chapter", () => {
    const line = chapterLine(ce, { sheet: true, topWorked: 4, test: false, recordedDone: false }, [
      { kind: "top", chapterId: "ce", minutes: 18 },
      { kind: "test", chapterId: "other", minutes: 20 },
    ]);
    expect(line.parts).toEqual([
      { part: "sheet", label: "Revision sheet", done: true, progress: null },
      { part: "top", label: "Top 10", done: false, progress: "4 of 10" },
      { part: "test", label: "Chapter test", done: false, progress: null },
    ]);
    expect(line.done).toBe(false);
    expect(line.today).toBe("Today: work the Top 10 PYQs");
  });
  it("says nothing about today when today's card holds none of this chapter", () => {
    expect(chapterLine(ce, { sheet: false, topWorked: 0, test: false, recordedDone: false }, []).today).toBeNull();
  });
  it("is done once the chapter is", () => {
    const line = chapterLine(ce, { sheet: true, topWorked: 10, test: true, recordedDone: false }, []);
    expect(line.done).toBe(true);
    expect(line.parts.every((p) => p.done)).toBe(true);
  });
  it("leaves out a part the chapter does not have", () => {
    const noTest = { ...ce, test: null };
    expect(chapterLine(noTest, { sheet: false, topWorked: 0, test: false, recordedDone: false }, []).parts.map((p) => p.part)).toEqual(["sheet", "top"]);
  });
});

describe("pulse: the path state the header's shared read carries", () => {
  it("is 'on' with an active path and 'offer' for a Class 12 board student without one, naming the board", () => {
    expect(pathPulseState(["nda", "mh-hsc-12"], "mh-hsc-12")).toEqual({ state: "on", exam: "mh-hsc-12" });
    expect(pathPulseState(["nda", "mh-hsc-12"], null)).toEqual({ state: "offer", exam: "mh-hsc-12" });
  });
  it("is null for a student with no Class 12 board among their exams", () => {
    expect(pathPulseState(["nda"], null)).toBeNull();
    // A path kept after the board was dropped from their exams shows nowhere, as on /me.
    expect(pathPulseState(["nda"], "cbse-12")).toBeNull();
  });
});

describe("exemptions: today's free path questions, even before /me is opened", () => {
  const EX = { revealIds: ["q1"], drillIds: ["f1"] };
  it("reads today's stored pick when there is one", async () => {
    const pick = vi.fn(async () => {});
    expect(await ensureExemptions({ read: async () => EX, hasPath: async () => true, pick })).toEqual(EX);
    expect(pick).not.toHaveBeenCalled();
  });
  it("picks today first for a path student whose day has no pick yet (a /board page opened before /me)", async () => {
    let stored: typeof EX | null = null;
    const pick = vi.fn(async () => {
      stored = EX;
    });
    expect(await ensureExemptions({ read: async () => stored, hasPath: async () => true, pick })).toEqual(EX);
    expect(pick).toHaveBeenCalledTimes(1);
  });
  it("lifts nothing for a student with no path, and picks nothing", async () => {
    const pick = vi.fn(async () => {});
    expect(await ensureExemptions({ read: async () => null, hasPath: async () => false, pick })).toEqual(NO_EXEMPTIONS);
    expect(pick).not.toHaveBeenCalled();
  });
  it("lifts nothing when a read fails: the limits apply as without a path", async () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(
      await ensureExemptions({
        read: async () => {
          throw new Error("down");
        },
        hasPath: async () => true,
        pick: async () => {},
      })
    ).toEqual(NO_EXEMPTIONS);
    err.mockRestore();
  });
});
