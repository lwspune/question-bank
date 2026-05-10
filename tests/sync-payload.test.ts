import { describe, it, expect } from "vitest";
import { validateSyncPayload } from "@/lib/sync/payload";

const VALID = {
  source: {
    app: "MHT_CET_AI",
    mockId: "mock_abc123",
    mockTitle: "MHT-CET PYQ 2024 Set 1",
    publishedAt: "2026-05-09T12:34:56Z",
  },
  exam: { name: "MHT-CET" },
  questions: [
    {
      sourceQuestionId: "q_xyz",
      text: "What is 1+1?",
      difficulty: "EASY" as const,
      subject: { name: "Maths" },
      chapter: { name: "Arithmetic" },
      options: [
        { label: "A", text: "1", isCorrect: false },
        { label: "B", text: "2", isCorrect: true },
        { label: "C", text: "3", isCorrect: false },
        { label: "D", text: "4", isCorrect: false },
      ],
    },
  ],
};

describe("validateSyncPayload", () => {
  it("accepts a fully valid minimal payload", () => {
    const result = validateSyncPayload(VALID);
    expect(result.ok).toBe(true);
  });

  it("accepts optional fields (context, solution, pyqYear, marks, negMarks, subtopic, attemptStats)", () => {
    const enriched = {
      ...VALID,
      questions: [
        {
          ...VALID.questions[0],
          context: "Some context",
          solution: "Add the two numbers.",
          pyqYear: 2023,
          marks: 4,
          negMarks: 1,
          subtopic: { name: "Addition" },
          attemptStats: { count: 200, correctPct: 75.5 },
        },
      ],
    };
    const result = validateSyncPayload(enriched);
    expect(result.ok).toBe(true);
  });

  it("rejects when source.app is missing", () => {
    const bad = {
      ...VALID,
      source: { ...VALID.source, app: undefined },
    };
    const result = validateSyncPayload(bad);
    expect(result.ok).toBe(false);
  });

  it("rejects when questions array is empty", () => {
    const bad = { ...VALID, questions: [] };
    const result = validateSyncPayload(bad);
    expect(result.ok).toBe(false);
  });

  it("rejects when text is empty", () => {
    const bad = {
      ...VALID,
      questions: [{ ...VALID.questions[0], text: "   " }],
    };
    const result = validateSyncPayload(bad);
    expect(result.ok).toBe(false);
  });

  it("rejects when option labels aren't exactly A, B, C, D", () => {
    const bad = {
      ...VALID,
      questions: [
        {
          ...VALID.questions[0],
          options: VALID.questions[0].options.slice(0, 3),
        },
      ],
    };
    const result = validateSyncPayload(bad);
    expect(result.ok).toBe(false);
  });

  it("rejects when no option is marked correct", () => {
    const bad = {
      ...VALID,
      questions: [
        {
          ...VALID.questions[0],
          options: VALID.questions[0].options.map((o) => ({
            ...o,
            isCorrect: false,
          })),
        },
      ],
    };
    const result = validateSyncPayload(bad);
    expect(result.ok).toBe(false);
  });

  it("rejects when more than one option is marked correct", () => {
    const bad = {
      ...VALID,
      questions: [
        {
          ...VALID.questions[0],
          options: VALID.questions[0].options.map((o) => ({
            ...o,
            isCorrect: true,
          })),
        },
      ],
    };
    const result = validateSyncPayload(bad);
    expect(result.ok).toBe(false);
  });

  it("trims question text and option text", () => {
    const padded = {
      ...VALID,
      questions: [
        {
          ...VALID.questions[0],
          text: "  What is 1+1?  ",
          options: VALID.questions[0].options.map((o) => ({
            ...o,
            text: ` ${o.text} `,
          })),
        },
      ],
    };
    const result = validateSyncPayload(padded);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.payload.questions[0].text).toBe("What is 1+1?");
      expect(result.payload.questions[0].options[0].text).toBe("1");
    }
  });
});
