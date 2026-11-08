/**
 * The path's coming days (MENTOR_SPEC.md §4, Phase 2): what V answers to "plan
 * my week" or "timetable" for a student on the path, instead of building a
 * separate week plan. Today is the card as stored; each next day is picked by
 * the same rule as if the day before was done (today.ts pickToday, and in the
 * revision weeks revision.ts pickRevisionDay, Phase 3), so the week V
 * describes is the one the card will serve.
 *
 * A future day carries no Fix task: which mistakes wait then is not known.
 * Days run on from today, one a day; the pace allows a day off a week (6 study
 * days), which the student takes when they need it.
 *
 * Pure. Spec: tests/path-phase2.test.ts, tests/path-phase3.test.ts.
 */
import { type ChapterState, type PathChapter, type ChapterPart, type PathPaper, chapterDone, NOTHING_DONE } from "./model";
import { addDays, dayLabel } from "./pace";
import { pickRevisionDay } from "./revision";
import { isChapterTask, pickToday, withPartDone, type PaperState, type PathTask } from "./today";

export const WEEK_DAYS = 6;

export type RevisionInput = {
  buffer: string;
  papers: readonly PathPaper[];
  paperStates: ReadonlyMap<string, PaperState>;
  reviews: ReadonlyMap<string, readonly string[]>;
  /** Each chapter's latest revision-sheet view. */
  sheetSeenAt?: ReadonlyMap<string, string>;
};

export function projectWeek(p: {
  chapters: readonly PathChapter[];
  states: ReadonlyMap<string, ChapterState>;
  deferred: ReadonlySet<string>;
  budget: number;
  today: string;
  todayTasks: readonly PathTask[];
  days?: number;
  /** The revision weeks' inputs; days from `buffer` on are picked by pickRevisionDay. */
  revision?: RevisionInput;
}): { day: string; tasks: PathTask[] }[] {
  const sim = new Map(p.states);
  const papers = new Map(p.revision?.paperStates ?? []);
  const reviews = new Map(p.revision?.reviews ?? []);
  const sheetSeenAt = new Map(p.revision?.sheetSeenAt ?? []);
  const byId = new Map(p.chapters.map((c) => [c.id, c]));
  const apply = (tasks: readonly PathTask[], day: string) => {
    for (const t of tasks) {
      if (isChapterTask(t)) {
        const c = byId.get(t.chapterId);
        if (c) sim.set(c.id, withPartDone(c, sim.get(c.id) ?? NOTHING_DONE, t.kind));
      } else if (t.kind === "paper") {
        papers.set(t.paperId, { served: true, worked: 1, of: 1, done: true });
      } else if (t.kind === "revise") {
        reviews.delete(t.chapterId);
      } else if (t.kind === "reread") {
        sheetSeenAt.set(t.chapterId, `${day}T12:00:00Z`);
      }
    }
  };
  const nothingLeft = () =>
    p.chapters.every((c) => chapterDone(c, sim.get(c.id) ?? NOTHING_DONE)) &&
    (!p.revision || (reviews.size === 0 && p.revision.papers.every((x) => papers.get(x.id)?.done)));

  const out: { day: string; tasks: PathTask[] }[] = [];
  const n = p.days ?? WEEK_DAYS;
  for (let i = 0; i < n; i++) {
    const day = addDays(p.today, i);
    let tasks: PathTask[];
    if (i === 0) tasks = [...p.todayTasks];
    else if (p.revision && day >= p.revision.buffer) {
      tasks = pickRevisionDay({
        chapters: p.chapters,
        states: sim,
        deferred: p.deferred,
        budget: p.budget,
        fix: [],
        papers: p.revision.papers,
        paperStates: papers,
        reviews,
        today: day,
        buffer: p.revision.buffer,
        sheetSeenAt,
      });
    } else tasks = pickToday({ chapters: p.chapters, states: sim, deferred: p.deferred, budget: p.budget, fix: [] });
    if (tasks.length === 0) {
      if (nothingLeft()) break;
      continue;
    }
    out.push({ day, tasks });
    apply(tasks, day);
  }
  return out;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** "2026-11-09" -> "Mon 9 Nov". */
export function weekdayLabel(day: string): string {
  return `${WEEKDAYS[new Date(`${day}T00:00:00Z`).getUTCDay()]} ${dayLabel(day)}`;
}

const PART_WORD: Record<ChapterPart, string> = { sheet: "revision sheet", top: "Top 10", test: "chapter test" };
const SUBJECT_WORD: Record<PathPaper["subject"], string> = { physics: "Physics", chemistry: "Chemistry", mathematics: "Maths" };

/** One short line a day: "Mon 9 Nov: fix 2 mistakes; Rotational Dynamics: revision sheet, Top 10". */
export function weekText(
  days: readonly { day: string; tasks: readonly PathTask[] }[],
  chapters: readonly PathChapter[],
  papers: readonly PathPaper[] = []
): string[] {
  const byId = new Map(chapters.map((c) => [c.id, c]));
  const paperById = new Map(papers.map((x) => [x.id, x]));
  return days.map(({ day, tasks }) => {
    const groups: string[] = [];
    let current: { id: string; parts: string[] } | null = null;
    for (const t of tasks) {
      if (!isChapterTask(t)) {
        current = null;
        if (t.kind === "fix") groups.push(`fix ${t.questionIds.length} ${t.questionIds.length === 1 ? "mistake" : "mistakes"}`);
        else if (t.kind === "paper") {
          const x = paperById.get(t.paperId);
          groups.push(x ? `${SUBJECT_WORD[x.subject]} paper ${x.label}` : "a board paper");
        } else if (t.kind === "reread") {
          groups.push(`${byId.get(t.chapterId)?.name ?? "A chapter"}: revision sheet again`);
        } else {
          const n = t.questionIds.length;
          groups.push(`${byId.get(t.chapterId)?.name ?? "A chapter"}: rework ${n} Review later ${n === 1 ? "question" : "questions"}`);
        }
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
