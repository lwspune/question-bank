/**
 * The drill and the header badge follow the exam focus (2026-11-08): a
 * two-exam student focused on MHT-CET is served, and counted, MHT-CET
 * mistakes only. Pure: lib/drill/select.ts.
 */
import { describe, it, expect } from "vitest";
import { attachRefs, scopeToExam, type DueQuestion, type QuestionRef } from "@/lib/drill/select";

const due = (questionId: string): DueQuestion => ({
  questionId,
  chapter: "",
  subtopic: "",
  lastWrongAt: "2026-11-01T00:00:00Z",
});

describe("attachRefs", () => {
  it("carries the question's exam onto the due question", () => {
    const refs = new Map<string, QuestionRef>([["q1", { chapter: "Optics", subtopic: "Lenses", exam: "JEE Mains" }]]);
    const [q] = attachRefs([due("q1")], refs);
    expect(q.exam).toBe("JEE Mains");
  });
});

describe("scopeToExam", () => {
  const pool: DueQuestion[] = [
    { ...due("a"), exam: "MHT-CET" },
    { ...due("b"), exam: "JEE Mains" },
    { ...due("c"), exam: "MHT-CET" },
    { ...due("d") },
  ];

  it("keeps only the focus exam's questions, in order", () => {
    expect(scopeToExam(pool, "MHT-CET").map((q) => q.questionId)).toEqual(["a", "c"]);
  });

  it("leaves the pool alone with no focus", () => {
    expect(scopeToExam(pool, null)).toBe(pool);
  });

  it("drops a question whose exam is unknown when focused", () => {
    expect(scopeToExam(pool, "JEE Mains").map((q) => q.questionId)).toEqual(["b"]);
  });
});
