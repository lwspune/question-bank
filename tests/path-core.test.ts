/**
 * The mentor path's pure core (MENTOR_SPEC.md §4-§5, Phase 1). No DB, no clock.
 *
 * - model: queues in book order (HSC Maths as Part 1 / Part 2), a chapter's
 *   three parts in order, minutes per part, done.
 * - deferrals: "Not taught yet" lasts 14 days or until work in the chapter.
 * - pace: minutes a day at 6 study days a week to the revision buffer, the
 *   finish date at a pace, on track / behind by N days.
 * - today: 2-4 tasks from the queue furthest behind its own pace, plus the
 *   Fix task; a replan keeps what was already on the card.
 */
import { describe, it, expect } from "vitest";
import {
  chapterDone,
  nextPart,
  partMinutes,
  queueOf,
  remainingMinutes,
  subjectsForStream,
  totalMinutes,
  type ChapterState,
  type PathChapter,
} from "@/lib/path/model";
import { activeDeferrals, DEFER_DAYS } from "@/lib/path/deferrals";
import { addDays, bufferStart, finishDate, paceStatus, startingDailyMinutes, studyDays } from "@/lib/path/pace";
import { fixQuestions, pickToday, taskDone, todayExemptions, type PathTask } from "@/lib/path/today";

const slot = (id: string) => [{ id, format: "mcq" as const }];
const tenSlots = (p: string) => Array.from({ length: 10 }, (_, i) => slot(`${p}-q${i}`));

function ch(id: string, subject: PathChapter["subject"], queue: string, rank: number, testMinutes: number | null = 15): PathChapter {
  return {
    id,
    name: `Chapter ${id}`,
    subject,
    queue,
    rank,
    boardPath: `/board/cbse-12/${subject}/${id}`,
    top: tenSlots(id),
    test: testMinutes === null ? null : { mockId: `m-${id}`, slug: `test-${id}`, minutes: testMinutes },
  };
}
const fresh: ChapterState = { sheet: false, topWorked: 0, test: false, recordedDone: false };

describe("model: streams and queues", () => {
  it("PCM and PCMB get all three subjects, PCB gets Physics and Chemistry (D1)", () => {
    expect(subjectsForStream("pcm")).toEqual(["physics", "chemistry", "mathematics"]);
    expect(subjectsForStream("pcmb")).toEqual(["physics", "chemistry", "mathematics"]);
    expect(subjectsForStream("pcb")).toEqual(["physics", "chemistry"]);
  });
  it("splits HSC Maths into Part 1 (chapters 1-7) and Part 2 (8-15); CBSE Maths is one queue (D2)", () => {
    expect(queueOf("mh-hsc-12", "mathematics", 7)).toBe("mathematics-1");
    expect(queueOf("mh-hsc-12", "mathematics", 8)).toBe("mathematics-2");
    expect(queueOf("cbse-12", "mathematics", 9)).toBe("mathematics");
    expect(queueOf("mh-hsc-12", "physics", 9)).toBe("physics");
  });
});

describe("model: parts, minutes and done", () => {
  const c = ch("a", "physics", "physics", 1, 15);
  it("orders a chapter's parts: sheet, then Top 10, then the test", () => {
    expect(nextPart(c, fresh)).toBe("sheet");
    expect(nextPart(c, { ...fresh, sheet: true })).toBe("top");
    expect(nextPart(c, { ...fresh, sheet: true, topWorked: 10 })).toBe("test");
    expect(nextPart(c, { ...fresh, sheet: true, topWorked: 10, test: true })).toBeNull();
  });
  it("takes a part done out of order as done (done is by work, in any order)", () => {
    expect(nextPart(c, { ...fresh, test: true })).toBe("sheet");
    expect(nextPart(c, { ...fresh, sheet: true, test: true })).toBe("top");
  });
  it("prices a part: sheet 10 min, 3 min per unworked Top 10 slot, the test's own length", () => {
    expect(partMinutes(c, fresh, "sheet")).toBe(10);
    expect(partMinutes(c, { ...fresh, topWorked: 4 }, "top")).toBe(18);
    expect(partMinutes(c, fresh, "test")).toBe(15);
    expect(totalMinutes(c)).toBe(10 + 30 + 15);
    expect(remainingMinutes(c, { ...fresh, sheet: true, topWorked: 4 })).toBe(18 + 15);
  });
  it("is done with all three parts, or once recorded done (a Top 10 rebuild cannot undo it)", () => {
    expect(chapterDone(c, { sheet: true, topWorked: 10, test: true, recordedDone: false })).toBe(true);
    expect(chapterDone(c, { sheet: true, topWorked: 9, test: true, recordedDone: false })).toBe(false);
    expect(chapterDone(c, { ...fresh, recordedDone: true })).toBe(true);
    expect(remainingMinutes(c, { ...fresh, recordedDone: true })).toBe(0);
    expect(nextPart(c, { ...fresh, recordedDone: true })).toBeNull();
  });
  it("does not ask for a part the chapter does not have", () => {
    const noTest = ch("b", "physics", "physics", 2, null);
    expect(chapterDone(noTest, { ...fresh, sheet: true, topWorked: 10 })).toBe(true);
    expect(nextPart(noTest, { ...fresh, sheet: true, topWorked: 10 })).toBeNull();
    const noTop = { ...ch("c", "physics", "physics", 3), top: [] };
    expect(nextPart(noTop, { ...fresh, sheet: true })).toBe("test");
  });
});

describe("deferrals: 'Not taught yet' comes back after 14 days or on work (D6)", () => {
  const now = new Date("2026-11-20T10:00:00Z");
  it("is active inside 14 days with no work since", () => {
    const d = [{ chapterId: "a", at: "2026-11-10T10:00:00Z" }];
    expect(activeDeferrals(d, new Map(), now)).toEqual(new Set(["a"]));
  });
  it("ends after 14 days", () => {
    const at = new Date(now.getTime() - DEFER_DAYS * 86_400_000 - 1000).toISOString();
    expect(activeDeferrals([{ chapterId: "a", at }], new Map(), now).size).toBe(0);
  });
  it("ends at once when the student works in the chapter after deferring it", () => {
    const d = [{ chapterId: "a", at: "2026-11-10T10:00:00Z" }];
    expect(activeDeferrals(d, new Map([["a", "2026-11-12T08:00:00Z"]]), now).size).toBe(0);
    // Work BEFORE the tap does not end it.
    expect(activeDeferrals(d, new Map([["a", "2026-11-09T08:00:00Z"]]), now).size).toBe(1);
  });
  it("reads the latest tap per chapter", () => {
    const d = [
      { chapterId: "a", at: "2026-10-01T10:00:00Z" },
      { chapterId: "a", at: "2026-11-15T10:00:00Z" },
    ];
    expect(activeDeferrals(d, new Map([["a", "2026-11-01T00:00:00Z"]]), now).size).toBe(1);
  });
});

describe("pace: set from the date (§5)", () => {
  it("puts the revision buffer three weeks before the exam", () => {
    expect(bufferStart("2027-02-15")).toBe("2027-01-25");
    expect(bufferStart("2027-02-11")).toBe("2027-01-21");
  });
  it("counts 6 study days a week, rounding down", () => {
    expect(studyDays("2026-11-25", "2026-12-02")).toBe(6);
    expect(studyDays("2026-11-25", "2027-01-25")).toBe(52);
    expect(studyDays("2027-01-25", "2027-01-20")).toBe(0);
  });
  it("sets the starting minutes from what is left, between 30 and 90, in steps of 5", () => {
    // 2,820 min over 52 study days = 54.2 -> 55
    expect(startingDailyMinutes(2820, "2026-11-25", "2027-01-25")).toBe(55);
    expect(startingDailyMinutes(100, "2026-11-25", "2027-01-25")).toBe(30);
    // A late start asks more than 90: capped, and the finish date says so (D3).
    expect(startingDailyMinutes(6000, "2027-01-10", "2027-01-25")).toBe(90);
  });
  it("gives the finish date at a pace, at 6 study days a week", () => {
    expect(finishDate(0, 60, "2026-11-25")).toBe("2026-11-25");
    // 600 min at 60 = 10 study days = 12 calendar days
    expect(finishDate(600, 60, "2026-11-25")).toBe("2026-12-07");
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
  });
  it("is on track when that finish is on or before the buffer, else behind by the gap", () => {
    expect(paceStatus({ remaining: 600, daily: 60, today: "2026-11-25", buffer: "2027-01-25" })).toEqual({
      finish: "2026-12-07",
      onTrack: true,
      behindDays: 0,
    });
    expect(paceStatus({ remaining: 600, daily: 60, today: "2027-01-20", buffer: "2027-01-25" })).toEqual({
      finish: "2027-02-01",
      onTrack: false,
      behindDays: 7,
    });
  });
});

describe("today: the tasks (§4)", () => {
  const physics = [ch("p1", "physics", "physics", 1), ch("p2", "physics", "physics", 2)];
  const chem = [ch("c1", "chemistry", "chemistry", 1), ch("c2", "chemistry", "chemistry", 2)];
  const all = [...physics, ...chem];
  const none = new Map<string, ChapterState>();

  it("starts at the first chapter's sheet and interleaves the subjects by how far behind each is", () => {
    const tasks = pickToday({ chapters: all, states: none, deferred: new Set(), budget: 55, fix: [] });
    expect(tasks.map((t) => (t.kind === "fix" ? "fix" : `${t.chapterId}:${t.kind}`))).toEqual([
      "p1:sheet",
      "c1:sheet",
      "p1:top",
      "c1:top",
    ]);
  });

  it("serves the subject furthest behind first", () => {
    const states = new Map<string, ChapterState>([["p1", { sheet: true, topWorked: 10, test: true, recordedDone: false }]]);
    const [first] = pickToday({ chapters: all, states, deferred: new Set(), budget: 20, fix: [] });
    expect(first).toMatchObject({ kind: "sheet", chapterId: "c1" });
  });

  it("takes 2 to 4 tasks: at least 2 even past the budget, never more than 4", () => {
    const small = pickToday({ chapters: all, states: none, deferred: new Set(), budget: 5, fix: [] });
    expect(small).toHaveLength(2);
    const big = pickToday({ chapters: all, states: none, deferred: new Set(), budget: 500, fix: [] });
    expect(big).toHaveLength(4);
  });

  it("stores each task's minutes", () => {
    const [t] = pickToday({ chapters: all, states: none, deferred: new Set(), budget: 5, fix: [] });
    expect(t.minutes).toBe(10);
  });

  it("puts the Fix task first and counts it in the day (1.5 min a question)", () => {
    const tasks = pickToday({ chapters: all, states: none, deferred: new Set(), budget: 20, fix: ["x", "y"] });
    expect(tasks[0]).toEqual({ kind: "fix", questionIds: ["x", "y"], minutes: 3 });
    expect(tasks).toHaveLength(3);
  });

  it("skips a deferred chapter for the next one in the same subject", () => {
    const tasks = pickToday({ chapters: physics, states: none, deferred: new Set(["p1"]), budget: 5, fix: [] });
    expect(tasks.map((t) => t.kind !== "fix" && t.chapterId)).toEqual(["p2", "p2"]);
  });

  it("falls back to a deferred chapter when nothing else is left", () => {
    const tasks = pickToday({ chapters: [physics[0]], states: none, deferred: new Set(["p1"]), budget: 5, fix: [] });
    expect(tasks[0]).toMatchObject({ chapterId: "p1", kind: "sheet" });
  });

  it("is empty when every chapter is done and no mistakes wait", () => {
    const done = new Map(all.map((c) => [c.id, { ...fresh, recordedDone: true }]));
    expect(pickToday({ chapters: all, states: done, deferred: new Set(), budget: 55, fix: [] })).toEqual([]);
  });

  it("keeps the tasks already on the card when it replans, and fills after them", () => {
    const keep: PathTask[] = [{ kind: "sheet", chapterId: "p1", minutes: 10 }];
    const tasks = pickToday({ chapters: all, states: none, deferred: new Set(), budget: 5, fix: [], keep });
    expect(tasks[0]).toEqual(keep[0]);
    expect(tasks[1]).toMatchObject({ kind: "sheet", chapterId: "c1" });
  });
});

describe("today: done, Fix and exemptions", () => {
  const c = ch("p1", "physics", "physics", 1);
  const states = new Map<string, ChapterState>([["p1", { sheet: true, topWorked: 4, test: false, recordedDone: false }]]);

  it("marks a task done by work", () => {
    expect(taskDone({ kind: "sheet", chapterId: "p1", minutes: 10 }, [c], states, new Set())).toBe(true);
    expect(taskDone({ kind: "top", chapterId: "p1", minutes: 30 }, [c], states, new Set())).toBe(false);
    expect(taskDone({ kind: "fix", questionIds: ["a", "b"], minutes: 3 }, [c], states, new Set(["a"]))).toBe(false);
    expect(taskDone({ kind: "fix", questionIds: ["a", "b"], minutes: 3 }, [c], states, new Set(["a", "b"]))).toBe(true);
  });

  it("fixes only path-chapter mistakes made before today, oldest first, at most 5", () => {
    const dayStart = "2026-11-20T18:30:00Z";
    const due = [
      { questionId: "today", chapterId: "p1", lastWrongAt: "2026-11-20T19:00:00Z" },
      { questionId: "other", chapterId: "zz", lastWrongAt: "2026-11-01T00:00:00Z" },
      ...["e", "d", "c", "b", "a", "f"].map((id, i) => ({
        questionId: id,
        chapterId: "p1",
        lastWrongAt: `2026-11-${String(19 - i).padStart(2, "0")}T00:00:00Z`,
      })),
    ];
    const ids = fixQuestions(due, new Set(["p1"]), dayStart);
    expect(ids).toHaveLength(5);
    expect(ids).not.toContain("today");
    expect(ids).not.toContain("other");
    expect(ids[0]).toBe("f");
  });

  it("exempts today's Top 10 questions, Fix questions and chapter tests from the free limits", () => {
    const tasks: PathTask[] = [
      { kind: "top", chapterId: "p1", minutes: 30 },
      { kind: "test", chapterId: "p1", minutes: 15 },
      { kind: "sheet", chapterId: "p1", minutes: 10 },
      { kind: "fix", questionIds: ["f1"], minutes: 2 },
    ];
    const ex = todayExemptions(tasks, [c]);
    expect(ex.revealIds).toHaveLength(10);
    expect(ex.revealIds).toContain("p1-q0");
    expect(ex.drillIds).toEqual(["f1"]);
    expect(ex.testMockIds).toEqual(["m-p1"]);
  });
});
