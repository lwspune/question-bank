/**
 * What the path's Today card shows (MENTOR_SPEC.md §4): one honest status line
 * and the day's tasks, each a link straight to the work. Pure.
 */
import { describe, it, expect } from "vitest";
import { buildPathView, dayLabel, statusLine } from "@/lib/path/view";
import type { ChapterState, PathChapter } from "@/lib/path/model";
import type { PathTask } from "@/lib/path/today";

const slots = (p: string) => Array.from({ length: 10 }, (_, i) => [{ id: `${p}${i}`, format: "mcq" as const }]);
const chapter = (id: string, subject: PathChapter["subject"], name: string): PathChapter => ({
  id,
  name,
  subject,
  queue: subject,
  rank: 1,
  boardPath: `/board/cbse-12/${subject}/${id}`,
  top: slots(id),
  test: { mockId: `m-${id}`, slug: `cbse-12-chapter-${id}`, minutes: 23 },
});

describe("statusLine", () => {
  it("names each subject's chapters done and the pace, in plain words", () => {
    const subjects = [
      { subject: "physics" as const, label: "Physics", done: 4, of: 14 },
      { subject: "chemistry" as const, label: "Chemistry", done: 3, of: 10 },
      { subject: "mathematics" as const, label: "Maths", done: 5, of: 13 },
    ];
    expect(statusLine(subjects, { onTrack: true, behindDays: 0 })).toBe(
      "Physics 4 of 14 · Chemistry 3 of 10 · Maths 5 of 13, on track"
    );
    expect(statusLine(subjects, { onTrack: false, behindDays: 1 })).toBe(
      "Physics 4 of 14 · Chemistry 3 of 10 · Maths 5 of 13, behind by 1 day"
    );
    expect(statusLine(subjects, { onTrack: false, behindDays: 3 })).toMatch(/behind by 3 days$/);
  });
  it("never carries an em dash", () => {
    expect(statusLine([{ subject: "physics", label: "Physics", done: 0, of: 14 }], { onTrack: true, behindDays: 0 })).not.toMatch(/—|–/);
  });
});

describe("dayLabel", () => {
  it("reads a day as '2 Feb'", () => {
    expect(dayLabel("2027-02-02")).toBe("2 Feb");
    expect(dayLabel("2026-12-25")).toBe("25 Dec");
  });
});

describe("buildPathView", () => {
  const chapters = [chapter("ce", "physics", "Current Electricity"), chapter("sol", "chemistry", "Solutions")];
  const states = new Map<string, ChapterState>([
    ["ce", { sheet: true, topWorked: 4, test: false, recordedDone: false }],
    ["sol", { sheet: true, topWorked: 10, test: true, recordedDone: false }],
  ]);
  const tasks: PathTask[] = [
    { kind: "fix", questionIds: ["a", "b", "c"], minutes: 5 },
    { kind: "sheet", chapterId: "ce", minutes: 10 },
    { kind: "top", chapterId: "ce", minutes: 18 },
    { kind: "test", chapterId: "ce", minutes: 23 },
  ];
  const view = buildPathView({
    exam: "cbse-12",
    subjects: ["physics", "chemistry"],
    stream: "pcb",
    dailyMinutes: 55,
    chapters,
    states,
    tasks,
    fixAnswered: new Set(["a"]),
    today: "2026-11-25",
    examDate: "2027-02-15",
    examOfficial: false,
  });

  it("links each task straight to its work", () => {
    expect(view.tasks.map((t) => t.href)).toEqual([
      "/drill?from=path&scope=path",
      "/board/cbse-12/physics/ce#revision",
      "/board/cbse-12/physics/ce#top",
      "/mock/cbse-12-chapter-ce",
    ]);
  });

  it("says what each task is, with the chapter and subject", () => {
    expect(view.tasks.map((t) => t.title)).toEqual([
      "Fix 3 mistakes",
      "Read the revision sheet",
      "Work the Top 10 PYQs",
      "Take the chapter test",
    ]);
    expect(view.tasks[1].detail).toBe("Physics · Current Electricity");
    expect(view.tasks[0].detail).toBe("From chapters in your plan, 1 of 3 done");
  });

  it("marks done by work and shows Top 10 progress", () => {
    expect(view.tasks.map((t) => t.done)).toEqual([false, true, false, false]);
    expect(view.tasks[2].progress).toBe("4 of 10");
    expect(view.allDone).toBe(false);
  });

  it("offers 'Not taught yet' only on a chapter task not yet done", () => {
    expect(view.tasks.map((t) => t.canDefer)).toEqual([false, false, true, true]);
    expect(view.tasks[2].chapterId).toBe("ce");
  });

  it("counts chapters done per subject and puts the pace in the status line", () => {
    expect(view.subjects).toEqual([
      { subject: "physics", label: "Physics", done: 0, of: 1 },
      { subject: "chemistry", label: "Chemistry", done: 1, of: 1 },
    ]);
    expect(view.statusLine).toBe("Physics 0 of 1 · Chemistry 1 of 1, on track");
    expect(view.todayMinutes).toBe(56);
    expect(view.dailyMinutes).toBe(55);
  });

  it("says Biology is not in the path yet for a PCB student (D1)", () => {
    expect(view.biologyNote).toBe(true);
  });

  it("says the board date is expected, not announced, while it is not official", () => {
    expect(view.examLine).toBe("CBSE Class 12 boards from 15 Feb (expected), revision from 25 Jan");
  });
});
