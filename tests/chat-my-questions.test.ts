/**
 * "REMIND OF DOING Q 44 RETRY" (2026-10-20): V could not tell which question
 * "Q 44" was, and could not set a reminder. The student had opened it a few
 * minutes before and saved it themselves the same minute. V now lists the
 * questions the student opened lately (recent_questions) and can save one to
 * /saved for them (save_question).
 */
import { describe, it, expect, vi } from "vitest";
import { myQuestionTools, recentQuestionList, formatRecent, type RecentActivity } from "@/lib/chat/myQuestions";

const NOW = new Date("2026-10-20T04:00:00Z");
const A = "11111111-1111-4111-8111-111111111111";
const B = "22222222-2222-4222-8222-222222222222";
const C = "33333333-3333-4333-8333-333333333333";

const act = (questionId: string, kind: RecentActivity["kind"], minutesAgo: number, correct?: boolean): RecentActivity => ({
  questionId,
  kind,
  at: new Date(NOW.getTime() - minutesAgo * 60_000).toISOString(),
  ...(correct === undefined ? {} : { correct }),
});

describe("recentQuestionList", () => {
  it("lists each question once, newest first, with how it went", () => {
    const list = recentQuestionList(
      [
        act(A, "question_practiced", 30, true),
        act(B, "question_practiced", 10, false),
        act(B, "answer_wrong", 10),
        act(C, "question_practiced", 5),
        act(A, "question_bookmarked", 2),
      ],
      5
    );
    expect(list).toEqual([
      { id: A, at: act(A, "question_bookmarked", 2).at, outcome: "right", saved: true },
      { id: C, at: act(C, "question_practiced", 5).at, outcome: "seen", saved: false },
      { id: B, at: act(B, "question_practiced", 10).at, outcome: "wrong", saved: false },
    ]);
  });

  it("keeps at most the asked number", () => {
    expect(recentQuestionList([act(A, "question_practiced", 3), act(B, "question_practiced", 2), act(C, "question_practiced", 1)], 2).map((q) => q.id)).toEqual([C, B]);
  });
});

describe("formatRecent", () => {
  it("numbers the questions with their start, chapter, time and outcome", () => {
    const text = formatRecent(
      [{ id: B, at: act(B, "question_practiced", 7).at, outcome: "wrong", saved: true, snippet: "Find the integral of 1/(cos(x-a)cos(x-b))", where: "CBSE Class 12, Integrals" }],
      NOW
    );
    expect(text).toContain(B);
    expect(text).toContain("Find the integral");
    expect(text).toContain("CBSE Class 12, Integrals");
    expect(text).toContain("7 min ago");
    expect(text).toContain("answered wrong");
    expect(text).toContain("saved");
  });

  it("says when there is nothing recent", () => {
    expect(formatRecent([], NOW)).toMatch(/no question/i);
  });
});

describe("myQuestionTools", () => {
  function tools(over: Partial<Parameters<typeof myQuestionTools>[0]> = {}) {
    const deps = {
      signedIn: true,
      now: () => NOW,
      loadRecent: vi.fn(async () => []),
      save: vi.fn(async () => ({ kind: "saved" as const })),
      ...over,
    };
    const [recent, save] = myQuestionTools(deps);
    return { recent, save, deps };
  }

  it("offers recent_questions and save_question", () => {
    const { recent, save } = tools();
    expect([recent.name, save.name]).toEqual(["recent_questions", "save_question"]);
  });

  it("asks a signed-out visitor to sign in, reading and writing nothing", async () => {
    const { recent, save, deps } = tools({ signedIn: false });
    expect(await recent.run({})).toMatch(/sign in/i);
    expect(await save.run({ question_id: A })).toMatch(/sign in/i);
    expect(deps.loadRecent).not.toHaveBeenCalled();
    expect(deps.save).not.toHaveBeenCalled();
  });

  it("saves a question and says where it is", async () => {
    const { save, deps } = tools();
    expect(await save.run({ question_id: A })).toContain("/saved");
    expect(deps.save).toHaveBeenCalledWith(A);
  });

  it("refuses a malformed id without writing", async () => {
    const { save, deps } = tools();
    expect(await save.run({ question_id: "Q44" })).toMatch(/recent_questions/);
    expect(deps.save).not.toHaveBeenCalled();
  });

  it("passes on the free save limit in its own words", async () => {
    const { save } = tools({ save: vi.fn(async () => ({ kind: "limit" as const, message: "You have saved 100 questions." })) });
    const out = await save.run({ question_id: A });
    expect(out).toContain("You have saved 100 questions.");
    expect(out).toContain("/pricing");
  });
});
