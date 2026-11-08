/**
 * V and the board path (MENTOR_SPEC.md §4 "V's part", Phase 2):
 * - a student ON the path asking for a plan, a timetable or what to do now is
 *   answered from the path (today's card + the coming days), not a separate
 *   week plan, and the path card is shown under the reply;
 * - a Class 12 board student WITHOUT one who asks for a plan is offered the
 *   path (owner, 2026-11-08), with a way out for a one-week plan;
 * - everything else is as before.
 */
import { describe, it, expect, vi } from "vitest";
import { planTools, type PathForV, type PlanDeps, type SavedPlan } from "@/lib/chat/weekPlan";
import type { ChapterSearchRow } from "@/lib/chat/chapterSearch";
import type { StrategyData } from "@/lib/chat/examStrategy";

function row(examSlug: string, examName: string, subjectName: string, chapterName: string, chapterId: string): ChapterSearchRow {
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return {
    examSlug,
    examName,
    subjectSlug: slug(subjectName),
    subjectName,
    chapterSlug: slug(chapterName),
    chapterName,
    questionCount: 50,
    practiceOnly: false,
    chapterId,
  };
}

const ROWS = [
  row("mh-hsc-12", "Maharashtra HSC Class 12", "Physics", "Rotational Dynamics", "rd"),
  row("nda", "NDA", "Mathematics", "Probability", "prob"),
];
const STRATEGY: StrategyData = {
  examName: "NDA",
  board: false,
  chapters: [{ id: "prob", name: "Probability", subject: "Mathematics", byYear: { 2025: 10, 2026: 10 } }],
};

const ON: PathForV = {
  kind: "on",
  exam: "mh-hsc-12",
  examLine: "HSC boards from 11 Feb (expected), revision from 21 Jan",
  status: "Physics 2 of 16 · Chemistry 1 of 16 · Maths 1 of 15, on track",
  today: ["Read the revision sheet: Physics · Rotational Dynamics, about 10 min, /board/mh-hsc-12/physics/rotational-dynamics#revision"],
  week: ["Tue 10 Nov: Solid State: revision sheet, Top 10"],
};
const OFFER: PathForV = {
  kind: "offer",
  exam: "mh-hsc-12",
  minutes: 50,
  subjects: "Physics, Chemistry and Maths",
  examLine: "HSC boards from 11 Feb (expected), revision from 21 Jan",
};

function deps(over: Partial<PlanDeps> = {}) {
  const saved: SavedPlan[] = [];
  const d: PlanDeps = {
    signedIn: true,
    now: () => new Date("2026-11-09T04:00:00Z"),
    loadChapters: async () => ROWS,
    loadProfile: async () => ({ targetExams: ["mh-hsc-12", "nda"], examDate: null, weeklyGoal: 3 }),
    saveExamDate: vi.fn(async () => {}),
    loadStrategy: async () => STRATEGY,
    loadWeak: async () => [],
    loadDue: async () => 0,
    savePlan: vi.fn(async (p: SavedPlan) => {
      saved.push(p);
    }),
    loadPlan: async () => saved[saved.length - 1] ?? null,
    loadPlanActivity: async () => ({ drills: 0, mocks: 0, chapterQuestions: {} }),
    onPlan: vi.fn(),
    loadPath: vi.fn(async () => ON),
    onPath: vi.fn(),
    ...over,
  };
  const [plan, mine] = planTools(d);
  return { d, plan, mine, saved };
}

describe("plan_week for a student on the path", () => {
  it("answers from the path: today's card, the coming days and the status, and shows the path card", async () => {
    const { plan, d } = deps();
    const text = await plan.run({});
    expect(text).toContain("board path");
    expect(text).toContain(ON.status);
    expect(text).toContain(ON.today[0]);
    expect(text).toContain(ON.week[0]);
    expect(text).toContain("/me");
    expect(d.onPath).toHaveBeenCalled();
    expect(d.savePlan).not.toHaveBeenCalled();
    expect(d.onPlan).not.toHaveBeenCalled();
  });
  it("answers from the path when they name their board too", async () => {
    const { plan, d } = deps();
    await plan.run({ exam: "HSC" });
    expect(d.onPath).toHaveBeenCalled();
    expect(d.savePlan).not.toHaveBeenCalled();
  });
  it("plans another exam they name as before", async () => {
    const { plan, d } = deps();
    await plan.run({ exam: "NDA", exam_date: "2027-04-12" });
    expect(d.savePlan).toHaveBeenCalled();
    expect(d.onPath).not.toHaveBeenCalled();
  });
  it("makes a one-week plan when asked for one instead (week_only)", async () => {
    const { plan, d } = deps({ loadProfile: async () => ({ targetExams: ["nda"], examDate: "2027-04-12", weeklyGoal: 3 }) });
    await plan.run({ week_only: true });
    expect(d.loadPath).not.toHaveBeenCalled();
    expect(d.savePlan).toHaveBeenCalled();
  });
});

describe("plan_week for a Class 12 student without a path", () => {
  it("offers the path, linking /me, and saves nothing", async () => {
    const { plan, d } = deps({ loadPath: vi.fn(async () => OFFER) });
    const text = await plan.run({});
    expect(text).toMatch(/board path/);
    expect(text).toContain("about 50 minutes a day");
    expect(text).toContain("/me");
    expect(text).toContain("week_only");
    // The 2026-11-08 replay: V called an offer "your plan is ready", and paced
    // the path to a student's preboards. The offer says neither is so.
    expect(text).toContain("nothing was planned or saved");
    expect(text).toMatch(/never call it a plan that is ready/);
    expect(text).toContain(OFFER.examLine);
    expect(text).toMatch(/6 days a week/);
    expect(text).toMatch(/preboard/);
    expect(d.savePlan).not.toHaveBeenCalled();
    expect(d.onPath).not.toHaveBeenCalled();
  });
  it("does not offer it for another exam they name", async () => {
    const { plan, d } = deps({ loadPath: vi.fn(async () => OFFER) });
    const text = await plan.run({ exam: "NDA", exam_date: "2027-04-12" });
    expect(text).not.toMatch(/board path/);
    expect(d.savePlan).toHaveBeenCalled();
  });
  it("plans as before when the path cannot be read", async () => {
    const { plan, d } = deps({
      loadPath: vi.fn(async () => {
        throw new Error("down");
      }),
      loadProfile: async () => ({ targetExams: ["nda"], examDate: "2027-04-12", weeklyGoal: 3 }),
    });
    await plan.run({});
    expect(d.savePlan).toHaveBeenCalled();
  });
});

describe("my_plan for a student on the path", () => {
  it("says today's card and the status, and shows the path card", async () => {
    const { mine, d } = deps();
    const text = await mine.run({});
    expect(text).toContain(ON.today[0]);
    expect(text).toContain(ON.status);
    expect(d.onPath).toHaveBeenCalled();
  });
  it("reads the week plan as before without a path", async () => {
    const { mine, d } = deps({ loadPath: vi.fn(async (): Promise<PathForV> => ({ kind: "none" })) });
    expect(await mine.run({})).toMatch(/No plan this week/);
    expect(d.onPath).not.toHaveBeenCalled();
  });
});
