import { describe, it, expect } from "vitest";
import { buildImportPayload, slugToUuid, isUuid, type DraftQuiz } from "../src/lib/quiz/quizPayload";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const Q = (over: Record<string, unknown> = {}) => ({
  q: 1,
  question: "P(an ace) from 52 cards?",
  optionA: "1/52",
  optionB: "1/4",
  optionC: "1/13",
  optionD: "4/13",
  answer: "C",
  chapter: "Probability",
  subtopic: "Probability via Counting",
  difficulty: "Easy",
  ...over,
});

const QUIZ = (over: Partial<DraftQuiz> = {}): DraftQuiz => ({
  id: "nda-prob-classical-1",
  title: "NDA Probability — Classical 1",
  subject: "Maths",
  questions: [Q(), Q({ q: 2, answer: "A", optionA: "n(E)/n(S)" })],
  ...over,
});

describe("buildImportPayload", () => {
  it("returns a clean draft payload for a valid quiz", () => {
    const out = buildImportPayload(QUIZ());
    // The quizzes.id column is UUID, so a human slug is mapped to a deterministic UUIDv5.
    expect(out.id).toMatch(UUID_RE);
    expect(out.id).toBe(slugToUuid("nda-prob-classical-1"));
    expect(out.status).toBe("draft");
    expect(out.questions).toHaveLength(2);
    expect(out.questions[0]).toMatchObject({
      chapter: "Probability",
      subtopic: "Probability via Counting",
      difficulty: "Easy",
    });
  });

  it("renumbers questions 1..n defensively", () => {
    const out = buildImportPayload(QUIZ({ questions: [Q({ q: 7 }), Q({ q: 9, answer: "A" })] }));
    expect(out.questions.map((x) => x.q)).toEqual([1, 2]);
  });

  it("uppercases the answer letter", () => {
    const out = buildImportPayload(QUIZ({ questions: [Q({ answer: "c" })] }));
    expect(out.questions[0].answer).toBe("C");
  });

  it("throws when the title is missing", () => {
    expect(() => buildImportPayload(QUIZ({ title: "" }))).toThrow(/title/i);
  });

  it("throws when id is missing", () => {
    expect(() => buildImportPayload(QUIZ({ id: "" }))).toThrow(/id/i);
  });

  it("throws when there are no questions", () => {
    expect(() => buildImportPayload(QUIZ({ questions: [] }))).toThrow(/question/i);
  });

  it("throws when a question is missing an option", () => {
    expect(() => buildImportPayload(QUIZ({ questions: [Q({ optionD: "" })] }))).toThrow(/Q1/);
  });

  it("throws when an answer is not A–D", () => {
    expect(() => buildImportPayload(QUIZ({ questions: [Q({ answer: "E" })] }))).toThrow(/Q1/);
  });

  it("maps a slug id deterministically (re-push UPDATES the same row)", () => {
    expect(slugToUuid("nda-prob-classical-1")).toBe(slugToUuid("nda-prob-classical-1"));
    expect(slugToUuid("nda-prob-classical-1")).not.toBe(slugToUuid("nda-prob-classical-2"));
    expect(slugToUuid("nda-prob-classical-1")).toMatch(UUID_RE);
  });

  it("passes a real UUID id through unchanged", () => {
    const uuid = "1b671a64-40d5-491e-99b0-da01ff1f3341";
    expect(isUuid(uuid)).toBe(true);
    expect(buildImportPayload(QUIZ({ id: uuid })).id).toBe(uuid);
  });
});
