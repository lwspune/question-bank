/**
 * V plans a student's week (2026-10-19, study-partner Phase 3): one task a day
 * for seven days from their weak chapters, due drill questions, the exam's
 * biggest chapters and a timed mock, saved, and ticked from what they did.
 */
import { describe, it, expect, vi } from "vitest";
import {
  buildWeekPlan,
  spreadDays,
  tickPlan,
  planText,
  parsePlanItems,
  planStartIst,
  weakFromPerformance,
  planTools,
  type PlanItem,
  type SavedPlan,
  type PlanDeps,
} from "@/lib/chat/weekPlan";
import type { ChapterSearchRow } from "@/lib/chat/chapterSearch";
import type { StrategyData } from "@/lib/chat/examStrategy";

const ch = (id: string, name: string) => ({ chapterId: id, chapter: name, path: `/questions/nda/mathematics/${id}` });

describe("spreadDays", () => {
  it("spreads the sessions over the seven days", () => {
    expect(spreadDays(5)).toEqual([0, 1, 3, 4, 6]);
    expect(spreadDays(3)).toEqual([0, 2, 5]);
    expect(spreadDays(7)).toEqual([0, 1, 2, 3, 4, 5, 6]);
    expect(spreadDays(1)).toEqual([0]);
  });

  it("keeps the count between 1 and 7", () => {
    expect(spreadDays(0)).toEqual([0]);
    expect(spreadDays(12)).toHaveLength(7);
  });
});

describe("buildWeekPlan", () => {
  const base = {
    sessions: 5,
    due: 12,
    weak: [ch("prob", "Probability"), ch("mat", "Matrices")],
    top: [
      { ...ch("trig", "Trigonometry"), share: 14 },
      { ...ch("prob", "Probability"), share: 10 },
      { ...ch("vec", "Vectors"), share: 5 },
    ],
    hasMocks: true,
    daysLeft: 120 as number | null,
  };

  it("puts weak chapters first, then the biggest ones, never the same chapter twice", () => {
    const items = buildWeekPlan(base);
    const chapters = items.filter((i) => i.kind === "chapter").map((i) => (i as { chapter: string }).chapter);
    expect(chapters).toEqual(["Probability", "Matrices", "Trigonometry"]);
    expect(items.find((i) => i.kind === "chapter" && i.chapter === "Matrices")).toMatchObject({ why: "weak" });
    expect(items.find((i) => i.kind === "chapter" && i.chapter === "Trigonometry")).toMatchObject({ why: "share", share: 14 });
  });

  it("gives one day to the due drill and ends the week with a timed mock", () => {
    const items = buildWeekPlan(base);
    expect(items.map((i) => i.day)).toEqual([0, 1, 3, 4, 6]);
    expect(items.filter((i) => i.kind === "drill")).toHaveLength(1);
    expect(items[items.length - 1].kind).toBe("mock");
  });

  it("has no drill day when nothing is due, and no mock for an exam without mocks", () => {
    const items = buildWeekPlan({ ...base, due: 0, hasMocks: false });
    expect(items.some((i) => i.kind === "drill" || i.kind === "mock")).toBe(false);
    expect(items.every((i) => i.kind === "chapter")).toBe(true);
  });

  it("keeps a mock in a short week close to the exam, but not far from it", () => {
    expect(buildWeekPlan({ ...base, sessions: 3, daysLeft: 20 }).some((i) => i.kind === "mock")).toBe(true);
    expect(buildWeekPlan({ ...base, sessions: 3, daysLeft: 200 }).some((i) => i.kind === "mock")).toBe(false);
  });

  it("plans fewer days rather than repeat a chapter when there are not enough", () => {
    const items = buildWeekPlan({ ...base, sessions: 7, weak: [], top: [{ ...ch("trig", "Trigonometry"), share: 14 }] });
    expect(items.filter((i) => i.kind === "chapter")).toHaveLength(1);
    expect(items.length).toBeLessThan(7);
    expect(new Set(items.map((i) => i.day)).size).toBe(items.length);
  });
});

describe("tickPlan", () => {
  const items: PlanItem[] = [
    { day: 0, kind: "chapter", ...ch("prob", "Probability"), why: "weak" },
    { day: 1, kind: "drill", path: "/drill", due: 12 },
    { day: 3, kind: "drill", path: "/drill", due: 12 },
    { day: 6, kind: "mock", path: "/mock" },
  ];

  it("ticks a chapter at 5 questions practised in it, and drills and mocks by count", () => {
    const ticked = tickPlan(items, { drills: 1, mocks: 1, chapterQuestions: { prob: 5 } });
    expect(ticked.map((i) => i.done)).toEqual([true, true, false, true]);
  });

  it("leaves a chapter open under 5 questions", () => {
    expect(tickPlan(items, { drills: 0, mocks: 0, chapterQuestions: { prob: 4 } })[0].done).toBe(false);
  });
});

describe("planText", () => {
  const plan: SavedPlan = {
    startsOn: "2026-10-20",
    examSlug: "nda",
    subject: null,
    items: [
      { day: 0, kind: "chapter", ...ch("prob", "Probability"), why: "weak" },
      { day: 2, kind: "chapter", ...ch("trig", "Trigonometry"), why: "share", share: 14 },
      { day: 4, kind: "drill", path: "/drill", due: 12 },
      { day: 6, kind: "mock", path: "/mock" },
    ],
  };

  it("names each day by its date in India, with the task and its page", () => {
    const text = planText(plan, tickPlan(plan.items, { drills: 1, mocks: 0, chapterQuestions: {} }));
    expect(text).toContain("Tue 20 Oct: Practise Probability (needs work in your mocks) /questions/nda/mathematics/prob");
    expect(text).toContain("Thu 22 Oct: Practise Trigonometry (14% of recent papers)");
    expect(text).toContain("Sat 24 Oct: Fix the questions waiting in your drill (12 due) /drill (done)");
    expect(text).toContain("Mon 26 Oct: Sit one timed mock /mock");
    expect(text).toContain("1 of 4 done");
  });
});

describe("parsePlanItems", () => {
  it("keeps well-formed items and drops anything else", () => {
    const raw = [
      { day: 0, kind: "drill", path: "/drill", due: 3 },
      { day: 9, kind: "drill", path: "/drill", due: 3 },
      { day: 1, kind: "chapter", chapterId: "x", chapter: "X", path: "https://evil.example", why: "weak" },
      { day: 2, kind: "mock", path: "/mock" },
      "junk",
    ];
    expect(parsePlanItems(raw)).toEqual([
      { day: 0, kind: "drill", path: "/drill", due: 3 },
      { day: 2, kind: "mock", path: "/mock" },
    ]);
    expect(parsePlanItems("nope")).toEqual([]);
  });
});

describe("planStartIst", () => {
  it("is today's date in India", () => {
    expect(planStartIst(new Date("2026-10-19T20:00:00Z"))).toBe("2026-10-20");
    expect(planStartIst(new Date("2026-10-20T10:00:00Z"))).toBe("2026-10-20");
  });
});

describe("weakFromPerformance", () => {
  it("returns the exam's weak chapters, worst first, by the mastery map's bands", () => {
    const perf = {
      lanes: [
        {
          exam: "NDA",
          subject: "Mathematics",
          chapters: [
            { chapter: "Matrices", judged: 10, weightedScore: 0.4 },
            { chapter: "Probability", judged: 10, weightedScore: 0.2 },
            { chapter: "Vectors", judged: 10, weightedScore: 0.9 },
            { chapter: "Thin", judged: 1, weightedScore: 0 },
          ],
        },
        { exam: "CDS", subject: "Mathematics", chapters: [{ chapter: "Algebra", judged: 10, weightedScore: 0.1 }] },
      ],
    };
    expect(weakFromPerformance(perf, "NDA")).toEqual([
      { subject: "Mathematics", chapter: "Probability" },
      { subject: "Mathematics", chapter: "Matrices" },
    ]);
  });
});

// ── the tools ──

function row(subjectName: string, chapterName: string, chapterId: string): ChapterSearchRow {
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return {
    examSlug: "nda",
    examName: "NDA",
    subjectSlug: slug(subjectName),
    subjectName,
    chapterSlug: slug(chapterName),
    chapterName,
    questionCount: 50,
    practiceOnly: false,
    chapterId,
  };
}

const ROWS = [row("Mathematics", "Probability", "prob"), row("Mathematics", "Trigonometry", "trig"), row("English", "Grammar", "gram")];
const STRATEGY: StrategyData = {
  examName: "NDA",
  board: false,
  chapters: [
    { id: "trig", name: "Trigonometry", subject: "Mathematics", byYear: { 2025: 20, 2026: 20 } },
    { id: "prob", name: "Probability", subject: "Mathematics", byYear: { 2025: 10, 2026: 10 } },
    { id: "gram", name: "Grammar", subject: "English", byYear: { 2025: 5, 2026: 5 } },
  ],
};

function deps(over: Partial<PlanDeps> = {}) {
  const saved: SavedPlan[] = [];
  const d: PlanDeps = {
    signedIn: true,
    now: () => new Date("2026-10-20T04:00:00Z"),
    loadChapters: async () => ROWS,
    loadProfile: async () => ({ targetExams: ["nda"], examDate: "2027-04-12", weeklyGoal: 3 }),
    saveExamDate: vi.fn(async () => {}),
    loadStrategy: async () => STRATEGY,
    loadWeak: async () => [{ subject: "Mathematics", chapter: "Probability" }],
    loadDue: async () => 7,
    savePlan: vi.fn(async (p: SavedPlan) => {
      saved.push(p);
    }),
    loadPlan: async () => saved[saved.length - 1] ?? null,
    loadPlanActivity: async () => ({ drills: 0, mocks: 0, chapterQuestions: { prob: 6 } }),
    onPlan: vi.fn(),
    ...over,
  };
  const [plan, mine] = planTools(d);
  return { d, plan, mine, saved };
}

describe("plan_week", () => {
  it("asks a signed-out visitor to sign in, reading nothing", async () => {
    const { plan, d } = deps({ signedIn: false });
    expect(await plan.run({})).toMatch(/sign in/i);
    expect(d.savePlan).not.toHaveBeenCalled();
  });

  it("asks which exam when neither the student nor the profile names one", async () => {
    const { plan } = deps({ loadProfile: async () => ({ targetExams: [], examDate: null, weeklyGoal: null }) });
    expect(await plan.run({})).toMatch(/which exam/i);
  });

  it("asks for the exam date once before planning when neither the profile nor the calendar has it", async () => {
    // SSC CGL has no entry in the exam calendar (lib/exam/calendar.ts).
    const { plan, d } = deps({
      loadChapters: async () => [...ROWS, { ...row("Reasoning", "Analogy", "ana"), examSlug: "ssc-cgl", examName: "SSC CGL" }],
      loadProfile: async () => ({ targetExams: ["ssc-cgl"], examDate: null, weeklyGoal: null }),
    });
    expect(await plan.run({})).toMatch(/when (is )?their exam/i);
    expect(d.savePlan).not.toHaveBeenCalled();
    expect(await plan.run({ date_unknown: true })).toMatch(/saved/i);
  });

  it("plans on the calendar's date when the profile has none", async () => {
    const { plan } = deps({ loadProfile: async () => ({ targetExams: ["nda"], examDate: null, weeklyGoal: null }) });
    expect(await plan.run({})).toMatch(/saved/i);
  });

  it("saves the exam date the student gives, and refuses one in the past", async () => {
    const { plan, d } = deps();
    expect(await plan.run({ exam_date: "2027-04-12" })).toMatch(/saved/i);
    expect(d.saveExamDate).toHaveBeenCalledWith("2027-04-12");
    const { plan: p2, d: d2 } = deps();
    expect(await p2.run({ exam_date: "2020-01-01" })).toMatch(/not a future date/i);
    expect(d2.saveExamDate).not.toHaveBeenCalled();
  });

  it("saves a week from today on the profile's exam, weak chapters first, and shows it in the chat", async () => {
    const { plan, d, saved } = deps();
    const text = await plan.run({});
    expect(saved).toHaveLength(1);
    expect(saved[0]).toMatchObject({ startsOn: "2026-10-20", examSlug: "nda" });
    // Weekly goal 3: three days.
    expect(saved[0].items).toHaveLength(3);
    expect(saved[0].items[0]).toMatchObject({ kind: "chapter", chapter: "Probability", why: "weak" });
    expect(saved[0].items.some((i) => i.kind === "drill")).toBe(true);
    expect(d.onPlan).toHaveBeenCalled();
    expect(text).toMatch(/Tue 20 Oct: Practise Probability/);
    expect(text).toMatch(/days? (left|to)/i);
  });

  it("takes the days a week the student asks for over their weekly goal", async () => {
    const { plan, saved } = deps();
    await plan.run({ days_per_week: 5 });
    expect(saved[0].items.length).toBeGreaterThanOrEqual(4);
  });

  it("keeps to one subject when the student names it", async () => {
    const { plan, saved } = deps({ loadWeak: async () => [] });
    await plan.run({ subject: "English" });
    const chapters = saved[0].items.filter((i) => i.kind === "chapter").map((i) => (i as { chapter: string }).chapter);
    expect(chapters).toEqual(["Grammar"]);
    expect(saved[0].subject).toBe("English");
  });
});

describe("plan_week on a board exam", () => {
  // CBSE Class 12 2026-10-19 replay: a PCM student's plan had Biology in it. A board student picks their subjects.
  const BOARD_ROWS = [
    { ...row("Physics", "Atoms", "atoms"), examSlug: "cbse-12", examName: "CBSE Class 12" },
    { ...row("Biology", "Genetics", "gen"), examSlug: "cbse-12", examName: "CBSE Class 12" },
    { ...row("Mathematics", "Integrals", "int"), examSlug: "cbse-12", examName: "CBSE Class 12" },
  ];
  const BOARD: StrategyData = {
    examName: "CBSE Class 12",
    board: true,
    chapters: [
      { id: "atoms", name: "Atoms", subject: "Physics", byYear: { 2025: 10 } },
      { id: "gen", name: "Genetics", subject: "Biology", byYear: { 2025: 30 } },
      { id: "int", name: "Integrals", subject: "Mathematics", byYear: { 2025: 20 } },
    ],
  };
  const board = (over: Partial<PlanDeps> = {}) =>
    deps({
      loadChapters: async () => BOARD_ROWS,
      loadStrategy: async () => BOARD,
      loadWeak: async () => [],
      loadProfile: async () => ({ targetExams: ["cbse-12"], examDate: null, weeklyGoal: 3 }),
      ...over,
    });

  it("asks which subjects to cover before planning, naming them", async () => {
    const { plan, d } = board();
    const text = await plan.run({});
    expect(text).toMatch(/which subjects/i);
    expect(text).toContain("Biology, Mathematics, Physics");
    expect(d.savePlan).not.toHaveBeenCalled();
  });

  it("plans only the subjects named", async () => {
    const { plan, saved } = board();
    await plan.run({ subjects: ["physics", "maths"] });
    const chapters = saved[0].items.filter((i) => i.kind === "chapter").map((i) => (i as { chapter: string }).chapter);
    expect(chapters).toEqual(["Integrals", "Atoms"]);
    expect(saved[0].subject).toBe("Physics, Mathematics");
  });

  it("covers every subject when the student says all", async () => {
    const { plan, saved } = board();
    await plan.run({ all_subjects: true });
    expect(saved[0].items.some((i) => i.kind === "chapter" && i.chapter === "Genetics")).toBe(true);
  });

  it("says which subject it could not find", async () => {
    const { plan } = board();
    expect(await plan.run({ subjects: ["physics", "art"] })).toMatch(/"art"/);
  });

  it("tells V the days tick themselves, so nothing is ticked by hand", async () => {
    const { plan } = board();
    expect(await plan.run({ all_subjects: true })).toMatch(/nothing to tick by hand/i);
  });
});

describe("my_plan", () => {
  it("offers to make one when there is no plan this week", async () => {
    const { mine, d } = deps();
    expect(await mine.run({})).toMatch(/no plan/i);
    expect(d.onPlan).not.toHaveBeenCalled();
  });

  it("reads the plan back with what is done, and shows it in the chat", async () => {
    const { plan, mine, d } = deps();
    await plan.run({});
    (d.onPlan as ReturnType<typeof vi.fn>).mockClear();
    const text = await mine.run({});
    expect(text).toMatch(/Practise Probability[^\n]*\(done\)/);
    expect(text).toMatch(/1 of 3 done/);
    expect(d.onPlan).toHaveBeenCalled();
  });

  it("asks a signed-out visitor to sign in", async () => {
    const { mine } = deps({ signedIn: false });
    expect(await mine.run({})).toMatch(/sign in/i);
  });
});
