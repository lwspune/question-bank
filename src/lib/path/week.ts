/**
 * The path's coming days (MENTOR_SPEC.md §4, Phase 2): what V answers to "plan
 * my week" or "timetable" for a student on the path, instead of building a
 * separate week plan. Today is the card as stored; each next day is picked by
 * the same rule (today.ts pickToday) as if the day before was done, so the
 * week V describes is the one the card will serve.
 *
 * A future day carries no Fix task: which mistakes wait then is not known.
 * Days run on from today, one a day; the pace allows a day off a week (6 study
 * days), which the student takes when they need it.
 *
 * Pure. Spec: tests/path-phase2.test.ts.
 */
import { type ChapterState, type PathChapter, type ChapterPart, chapterDone, NOTHING_DONE } from "./model";
import { addDays } from "./pace";
import { pickToday, withPartDone, type PathTask } from "./today";
import { dayLabel } from "./view";

export const WEEK_DAYS = 6;

export function projectWeek(p: {
  chapters: readonly PathChapter[];
  states: ReadonlyMap<string, ChapterState>;
  deferred: ReadonlySet<string>;
  budget: number;
  today: string;
  todayTasks: readonly PathTask[];
  days?: number;
}): { day: string; tasks: PathTask[] }[] {
  const sim = new Map(p.states);
  const byId = new Map(p.chapters.map((c) => [c.id, c]));
  const apply = (tasks: readonly PathTask[]) => {
    for (const t of tasks) {
      if (t.kind === "fix") continue;
      const c = byId.get(t.chapterId);
      if (c) sim.set(c.id, withPartDone(c, sim.get(c.id) ?? NOTHING_DONE, t.kind));
    }
  };
  const out: { day: string; tasks: PathTask[] }[] = [];
  const n = p.days ?? WEEK_DAYS;
  for (let i = 0; i < n; i++) {
    const tasks =
      i === 0 ? [...p.todayTasks] : pickToday({ chapters: p.chapters, states: sim, deferred: p.deferred, budget: p.budget, fix: [] });
    if (tasks.length === 0) {
      if (p.chapters.every((c) => chapterDone(c, sim.get(c.id) ?? NOTHING_DONE))) break;
      continue;
    }
    out.push({ day: addDays(p.today, i), tasks });
    apply(tasks);
  }
  return out;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** "2026-11-09" -> "Mon 9 Nov". */
export function weekdayLabel(day: string): string {
  return `${WEEKDAYS[new Date(`${day}T00:00:00Z`).getUTCDay()]} ${dayLabel(day)}`;
}

const PART_WORD: Record<ChapterPart, string> = { sheet: "revision sheet", top: "Top 10", test: "chapter test" };

/** One short line a day: "Mon 9 Nov: fix 2 mistakes; Rotational Dynamics: revision sheet, Top 10". */
export function weekText(days: readonly { day: string; tasks: readonly PathTask[] }[], chapters: readonly PathChapter[]): string[] {
  const byId = new Map(chapters.map((c) => [c.id, c]));
  return days.map(({ day, tasks }) => {
    const groups: string[] = [];
    let current: { id: string; parts: string[] } | null = null;
    for (const t of tasks) {
      if (t.kind === "fix") {
        current = null;
        groups.push(`fix ${t.questionIds.length} ${t.questionIds.length === 1 ? "mistake" : "mistakes"}`);
        continue;
      }
      if (current && current.id === t.chapterId) {
        current.parts.push(PART_WORD[t.kind]);
        groups[groups.length - 1] = `${byId.get(t.chapterId)?.name ?? "A chapter"}: ${current.parts.join(", ")}`;
      } else {
        current = { id: t.chapterId, parts: [PART_WORD[t.kind]] };
        groups.push(`${byId.get(t.chapterId)?.name ?? "A chapter"}: ${current.parts.join(", ")}`);
      }
    }
    return `${weekdayLabel(day)}: ${groups.join("; ")}`;
  });
}
