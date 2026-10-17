/**
 * V's my_progress tool (2026-10-16): a signed-in student asks "how am I
 * doing?" and V answers from their own mock results, the same numbers
 * /performance and /me/map show (lib/performance). Pure: the read is faked.
 */
import { describe, it, expect, vi } from "vitest";
import type { Performance } from "@/lib/performance/compute";
import { progressFacts, progressTool, createProgressMemo, PROGRESS_MEMO_MS } from "@/lib/chat/progress";
import type { PracticeCounts } from "@/lib/activity/practiceCounts";

const span = (answered: number, right: number, revealed = 0) => ({ answered, right, revealed });
const practice = (p: Partial<PracticeCounts> = {}): PracticeCounts => ({
  today: span(0, 0),
  week: span(0, 0),
  all: span(0, 0),
  ...p,
});

type Chapter = { chapter: string; judged: number; correct: number; weightedScore: number };

function perf(opts: {
  graded?: number;
  inProgress?: number;
  latest?: { title: string; pct: number } | null;
  deltaPoints?: number | null;
  lanes?: { exam: string; subject: string; attempts: number; judged: number; accuracy: number | null; chapters: Chapter[] }[];
}): Performance {
  return {
    summary: {
      graded: opts.graded ?? 0,
      inProgress: opts.inProgress ?? 0,
      retakesDropped: 0,
      belowFloor: 0,
      latest: opts.latest ? { attemptId: "a", slug: "s", exam: "NDA", at: "2026-10-16", score: 0, maxScore: 0, ...opts.latest } : null,
      deltaPoints: opts.deltaPoints ?? null,
      attemptQuality: null,
      consistency: null,
    },
    lanes: (opts.lanes ?? []) as unknown as Performance["lanes"],
  };
}

const ch = (chapter: string, judged: number, correct: number, weightedScore: number): Chapter => ({
  chapter,
  judged,
  correct,
  weightedScore,
});

describe("progressFacts", () => {
  it("with no graded mock, says so and points to a first one", () => {
    const t = progressFacts(perf({}));
    expect(t).toMatch(/no graded mock/i);
    expect(t).toContain("/mock");
  });

  it("mentions an unfinished mock", () => {
    expect(progressFacts(perf({ inProgress: 1 }))).toMatch(/1 mock .*not finished/i);
  });

  it("gives the latest score and the change since the one before", () => {
    const t = progressFacts(perf({ graded: 3, latest: { title: "NDA Maths 2024 II", pct: 54 }, deltaPoints: 8 }));
    expect(t).toContain("3 graded mocks");
    expect(t).toContain("NDA Maths 2024 II: 54%");
    expect(t).toContain("up 8 points");
  });

  it("says down, or the same, when the score did not rise", () => {
    expect(progressFacts(perf({ graded: 2, latest: { title: "T", pct: 40 }, deltaPoints: -5 }))).toContain("down 5 points");
    expect(progressFacts(perf({ graded: 2, latest: { title: "T", pct: 40 }, deltaPoints: 0 }))).toContain("the same as");
  });

  it("names weak chapters worst first and strong ones, by the mastery map's bands", () => {
    const t = progressFacts(
      perf({
        graded: 2,
        latest: { title: "T", pct: 50 },
        lanes: [
          {
            exam: "NDA",
            subject: "Mathematics",
            attempts: 2,
            judged: 40,
            accuracy: 55,
            chapters: [
              ch("Matrices", 8, 3, 0.4),
              ch("Probability", 9, 2, 0.2),
              ch("Trigonometry", 10, 9, 0.9),
              ch("Limits", 6, 3, 0.55),
            ],
          },
        ],
      })
    );
    expect(t).toContain("NDA | Mathematics: 55% right over 40 answered questions in 2 mocks");
    expect(t).toContain("Needs work: Probability (2 of 9 right), Matrices (3 of 8 right)");
    expect(t).toContain("Strong: Trigonometry (9 of 10 right)");
    expect(t).not.toContain("Limits");
  });

  it("never judges a chapter on fewer than 3 answers", () => {
    const t = progressFacts(
      perf({
        graded: 1,
        latest: { title: "T", pct: 10 },
        lanes: [{ exam: "NDA", subject: "Physics", attempts: 1, judged: 2, accuracy: 0, chapters: [ch("Sound", 2, 0, 0)] }],
      })
    );
    expect(t).not.toContain("Sound");
  });

  it("keeps to three weak and two strong chapters per subject", () => {
    const chapters = [1, 2, 3, 4, 5].map((i) => ch(`Weak ${i}`, 5, 1, 0.1 * i / 10));
    const strong = [1, 2, 3].map((i) => ch(`Strong ${i}`, 5, 5, 0.8 + i / 100));
    const t = progressFacts(
      perf({
        graded: 1,
        latest: { title: "T", pct: 10 },
        lanes: [{ exam: "NDA", subject: "Maths", attempts: 1, judged: 40, accuracy: 30, chapters: [...chapters, ...strong] }],
      })
    );
    expect(t.match(/Weak \d/g)).toHaveLength(3);
    expect(t.match(/Strong \d/g)).toHaveLength(2);
  });

  it("tells V why a band can differ from the raw count (recent mocks weigh more, blanks count against)", () => {
    const t = progressFacts(perf({ graded: 1, latest: { title: "T", pct: 50 } }));
    expect(t).toMatch(/recent mocks count more/i);
    expect(t).toMatch(/left blank/i);
  });

  it("drops the long dashes from a mock's title, since V must not write them", () => {
    const t = progressFacts(perf({ graded: 1, latest: { title: "NDA 2026 (II) — Paper II — GAT", pct: 27 } }));
    expect(t).toContain("NDA 2026 (II), Paper II, GAT: 27%");
    expect(t).not.toContain("—");
  });

  it("names the student's own pages and nothing about other students", () => {
    const t = progressFacts(perf({ graded: 1, latest: { title: "T", pct: 50 } }));
    expect(t).toContain("/performance");
    expect(t).toContain("/me/map");
    expect(t).toContain("/drill");
  });
});

// 2026-10-17: a student who had answered 328 bank questions that evening asked
// "today how many question i solved?" and V said it could not see, because the
// tool read mocks only. Practice outside mocks is now part of the answer.
describe("progressFacts with practice outside mocks", () => {
  it("gives today, the last 7 days and all time, in India's day", () => {
    const t = progressFacts(
      perf({}),
      practice({ today: span(38, 30), week: span(400, 310), all: span(400, 310) })
    );
    expect(t).toContain("Today: 38 answered, 30 right.");
    expect(t).toContain("Last 7 days (today included): 400 answered, 310 right.");
    expect(t).toContain("All time: 400 answered, 310 right.");
    expect(t).toMatch(/India/);
    expect(t).toMatch(/outside mocks/i);
  });

  it("puts the practice before the missing mock, so V does not answer 'nothing yet'", () => {
    const t = progressFacts(perf({}), practice({ today: span(38, 30), week: span(38, 30), all: span(38, 30) }));
    expect(t).toMatch(/no graded mock/i);
    expect(t).toContain("Today: 38 answered, 30 right.");
    expect(t.indexOf("Today: 38")).toBeLessThan(t.search(/no graded mock/i));
  });

  it("counts answers read without picking an option (written answers) apart from checked ones", () => {
    const t = progressFacts(perf({}), practice({ today: span(0, 0, 12), week: span(5, 4, 101), all: span(5, 4, 101) }));
    expect(t).toContain("Today: 12 answers read without picking an option.");
    expect(t).toContain("Last 7 days (today included): 5 answered, 4 right; 101 answers read without picking an option.");
  });

  it("says so plainly when a span is empty", () => {
    const t = progressFacts(perf({}), practice({ week: span(9, 5), all: span(9, 5) }));
    expect(t).toContain("Today: nothing yet.");
  });

  it("says there is no practice yet when there is none at all", () => {
    expect(progressFacts(perf({}), practice())).toMatch(/no practice outside mocks yet/i);
  });

  it("keeps the mock results beside the practice", () => {
    const t = progressFacts(
      perf({ graded: 2, latest: { title: "MHT-CET 2025", pct: 61 }, deltaPoints: 4 }),
      practice({ today: span(10, 8), week: span(10, 8), all: span(10, 8) })
    );
    expect(t).toContain("Today: 10 answered, 8 right.");
    expect(t).toContain("MHT-CET 2025: 61%");
  });
});

describe("progressTool", () => {
  it("adds the student's practice to the mock results", async () => {
    const t = await progressTool(
      async () => perf({}),
      async () => practice({ today: span(38, 30), week: span(38, 30), all: span(38, 30) })
    ).run({});
    expect(t).toContain("Today: 38 answered, 30 right.");
  });

  it("still reports the practice when the mock read fails", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const t = await progressTool(
      async () => {
        throw new Error("get_own_performance: timeout");
      },
      async () => practice({ today: span(3, 2), week: span(3, 2), all: span(3, 2) })
    ).run({});
    expect(t).toContain("Today: 3 answered, 2 right.");
    expect(t).toMatch(/mock results are unavailable/i);
    expect(t).not.toContain("timeout");
    spy.mockRestore();
  });

  it("still reports the mocks when the practice read fails", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const t = await progressTool(
      async () => perf({ graded: 1, latest: { title: "NDA GAT", pct: 61 } }),
      async () => {
        throw new Error("get_own_practice_counts: timeout");
      }
    ).run({});
    expect(t).toContain("NDA GAT: 61%");
    expect(t).not.toContain("timeout");
    spy.mockRestore();
  });

  it("tells V a signed-out visitor must sign in, without reading anything", async () => {
    const tool = progressTool(undefined);
    expect(await tool.run({})).toMatch(/signed out/i);
  });

  it("says signed out when the read finds no account", async () => {
    expect(await progressTool(async () => null).run({})).toMatch(/signed out/i);
  });

  it("says the progress is unavailable when the read fails, rather than passing the error on", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const t = await progressTool(async () => {
      throw new Error("get_own_performance: timeout");
    }).run({});
    expect(t).toMatch(/unavailable/i);
    expect(t).not.toContain("timeout");
    spy.mockRestore();
  });

  it("returns the summary of the student's own results", async () => {
    const t = await progressTool(async () => perf({ graded: 1, latest: { title: "NDA GAT", pct: 61 } })).run({});
    expect(t).toContain("NDA GAT: 61%");
  });
});

describe("createProgressMemo", () => {
  it("reads once within a few minutes, then again after", async () => {
    const memo = createProgressMemo(10);
    const load = vi.fn(async () => perf({ graded: 1 }));
    await memo.get("u1", load, 0);
    await memo.get("u1", load, PROGRESS_MEMO_MS - 1);
    expect(load).toHaveBeenCalledTimes(1);
    await memo.get("u1", load, PROGRESS_MEMO_MS + 1);
    expect(load).toHaveBeenCalledTimes(2);
  });

  it("keeps each student's summary apart", async () => {
    const memo = createProgressMemo(10);
    const load = vi.fn(async () => perf({ graded: 1 }));
    await memo.get("u1", load, 0);
    await memo.get("u2", load, 0);
    expect(load).toHaveBeenCalledTimes(2);
  });

  it("does not remember a failed read", async () => {
    const memo = createProgressMemo(10);
    const failing = vi.fn(async (): Promise<Performance | null> => {
      throw new Error("x");
    });
    await expect(memo.get("u1", failing, 0)).rejects.toThrow();
    const ok = vi.fn(async () => perf({ graded: 1 }));
    await memo.get("u1", ok, 1);
    expect(ok).toHaveBeenCalledTimes(1);
  });

  it("holds at most the given number of students", async () => {
    const memo = createProgressMemo(2);
    const load = vi.fn(async () => perf({ graded: 1 }));
    await memo.get("u1", load, 0);
    await memo.get("u2", load, 0);
    await memo.get("u3", load, 0);
    expect(memo.size()).toBe(2);
  });
});
