/**
 * V's question tools (2026-10-19, study-partner Phase 1), run against fake
 * data sources: a hint never carries the key, an explanation is refused past
 * the day's free answers and to a signed-out visitor, a similar question is
 * handed to the chat window as a card, and a pasted question becomes the
 * question the conversation is about.
 */
import { describe, it, expect } from "vitest";
import { questionTools, type QuestionToolDeps } from "@/lib/chat/questionToolSet";
import type { RevealCheck, VQuestion } from "@/lib/chat/questionTools";

const ID = "11111111-1111-4111-8111-111111111111";
const OTHER = "22222222-2222-4222-8222-222222222222";

const Q: VQuestion = {
  id: ID,
  text: "What is 2 + 2?",
  context: null,
  hasFigure: false,
  solution: "Add the two numbers.\nSo the sum is 4.",
  format: "mcq",
  numericAnswer: null,
  options: [
    { label: "A", text: "3", isCorrect: false },
    { label: "B", text: "4", isCorrect: true },
  ],
  exam: "NDA",
  subject: "Mathematics",
  chapter: "Arithmetic",
  subtopic: "Addition",
  subtopicId: "s1",
};

function deps(over: Partial<QuestionToolDeps> = {}) {
  const seen = { similar: [] as string[], matched: [] as string[], explained: [] as string[] };
  const d: QuestionToolDeps = {
    loadQuestion: async (id) => (id === ID ? Q : null),
    spendReveal: async (): Promise<RevealCheck> => ({ kind: "ok", counts: true }),
    loadSimilar: async () => OTHER,
    searchQuestions: async () => [{ id: ID, snippet: "What is 2 + 2?", where: "NDA, Arithmetic" }],
    onSimilar: (id) => seen.similar.push(id),
    onMatch: (id) => seen.matched.push(id),
    onExplained: (id) => seen.explained.push(id),
    ...over,
  };
  const tools = Object.fromEntries(questionTools(d).map((t) => [t.name, t]));
  return { tools, seen };
}

describe("get_question (a hint)", () => {
  it("shows the question and the first step, never the key or the rest", async () => {
    const out = await deps().tools.get_question.run({ question_id: ID });
    expect(out).toContain("What is 2 + 2?");
    expect(out).toContain("Add the two numbers.");
    expect(out).not.toContain("So the sum is 4.");
    expect(out).not.toContain("Correct answer");
  });

  it("refuses an id that is not a question it may read", async () => {
    expect(await deps().tools.get_question.run({ question_id: OTHER })).toMatch(/not found/i);
    expect(await deps().tools.get_question.run({ question_id: "drop table" })).toMatch(/not found/i);
  });
});

describe("explain_question", () => {
  it("gives the key and the solution, with the student's pick, and records the explanation", async () => {
    const { tools, seen } = deps();
    const out = await tools.explain_question.run({ question_id: ID, chose: "A" });
    expect(out).toContain("Correct answer: (B) 4");
    expect(out).toContain("So the sum is 4.");
    expect(out).toContain("The student chose (A) 3, which is wrong.");
    expect(seen.explained).toEqual([ID]);
  });

  it("stops at the day's free answers and points to the pass, giving nothing away", async () => {
    const { tools, seen } = deps({ spendReveal: async () => ({ kind: "limit", limit: 30 }) });
    const out = await tools.explain_question.run({ question_id: ID });
    expect(out).toMatch(/used today's 30 free answers/);
    expect(out).toContain("/pricing");
    expect(out).not.toContain("Correct answer");
    expect(seen.explained).toEqual([]);
  });

  it("asks a signed-out visitor to sign in, giving nothing away", async () => {
    const out = await deps({ spendReveal: null }).tools.explain_question.run({ question_id: ID });
    expect(out).toMatch(/signed out/i);
    expect(out).not.toContain("Correct answer");
  });

  it("names an E pick, the fifth option IMAT prints", async () => {
    const five: VQuestion = { ...Q, options: [...Q.options, { label: "E", text: "5", isCorrect: false }] };
    const out = await deps({ loadQuestion: async () => five }).tools.explain_question.run({ question_id: ID, chose: "e" });
    expect(out).toContain("The student chose (E) 5, which is wrong.");
  });

  it("ignores a pick that is not an option letter", async () => {
    expect(await deps().tools.explain_question.run({ question_id: ID, chose: "Z" })).not.toContain("The student chose");
  });

  // 2026-10-22 (owner): "lets not give 2nd qs ... just answer the asked qs and nothing else".
  // An explanation never brings a similar question; one comes only from similar_question, when asked.
  it("explains without attaching a similar question", async () => {
    const { tools, seen } = deps();
    const out = await tools.explain_question.run({ question_id: ID });
    expect(out).toContain("Correct answer: (B) 4");
    expect(seen.similar).toEqual([]);
    expect(out).not.toMatch(/similar/i);
  });
});

describe("similar_question", () => {
  it("hands a similar question to the chat window as a card, without its answer", async () => {
    const { tools, seen } = deps();
    const out = await tools.similar_question.run({ question_id: ID });
    expect(seen.similar).toEqual([OTHER]);
    expect(out).toMatch(/shown to the student as a card/i);
    expect(out).not.toMatch(/answer is/i);
    expect(out).toMatch(/do not describe it/i);
    expect(out).not.toMatch(/below/i);
  });

  it("says so when there is no other question to try", async () => {
    const { tools, seen } = deps({ loadSimilar: async () => null });
    expect(await tools.similar_question.run({ question_id: ID })).toMatch(/no other question/i);
    expect(seen.similar).toEqual([]);
  });
});

describe("find_question (pasted text)", () => {
  // 2026-10-19 check: a silent pick explained the WRONG question. The student confirms on a card instead.
  it("offers the best match as a card to confirm, and does not explain it yet", async () => {
    const { tools, seen } = deps();
    const out = await tools.find_question.run({ text: "what is 2+2" });
    expect(seen.matched).toEqual([ID]);
    expect(out).toMatch(/shown to the student as a card/i);
    expect(out).toMatch(/do not explain it yet/i);
  });

  it("says when nothing in the bank matches, and offers no card", async () => {
    const { tools, seen } = deps({ searchQuestions: async () => [] });
    expect(await tools.find_question.run({ text: "zzz" })).toMatch(/no question in the bank matched/i);
    expect(seen.matched).toEqual([]);
  });
});
