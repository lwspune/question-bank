/**
 * A PYQ ebook chapter prints every context ABOVE the question(s) it serves,
 * with any "for the next two (02) items" count stripped. A lone question's
 * context used to print between its stem and options (2026-10-28 review).
 */
import { describe, it, expect } from "vitest";
import { buildPyqChapterHtml } from "@/lib/ebooks/bookHtml";
import type { BookSection } from "@/lib/books/order";
import type { QuestionRow } from "@/lib/questions/query";

function q(id: string, over: Partial<QuestionRow> = {}): QuestionRow {
  return {
    id,
    text: `Stem of ${id}?`,
    context: null,
    solution: null,
    difficulty: "EASY",
    imageUrl: null,
    solutionImageUrl: null,
    setId: null,
    exam: { id: "e", name: "NDA" },
    subject: { id: "s", name: "Mathematics" },
    chapter: { id: "c", name: "Sets" },
    subtopic: { id: "t", name: "Set Operations" },
    questionNumber: null,
    pyqYear: 2022,
    pyqMonth: null,
    pyqNote: null,
    options: (["A", "B", "C", "D"] as const).map((label) => ({ label, text: `opt ${label}`, isCorrect: label === "A", imageUrl: null })),
    ...over,
  };
}

const set = (ids: string[]) => ({ setId: ids.length > 1 ? "s" : null, key: ids[0], questionIds: ids, year: 2022, sitting: 1, label: "NDA 2022" });

function chapter(sets: ReturnType<typeof set>[], questions: QuestionRow[]): string {
  const sections: BookSection[] = [{ key: "nda", exam: "NDA", title: "NDA PYQ", sets, blocks: null, questionCount: questions.length }];
  return buildPyqChapterHtml({
    number: 1,
    name: "Sets",
    classLabel: null,
    bookTitle: "NDA Mathematics",
    sections,
    questionsById: new Map(questions.map((x) => [x.id, x])),
    excludedIds: new Set<string>(),
    recurrence: new Map<string, string[]>(),
    head: "",
  });
}

describe("PYQ ebook contexts", () => {
  it("prints a lone question's context before its stem", () => {
    const solo = q("q1", {
      text: "Which of the statements given above is/are correct?",
      context: "Consider the following: 1. A 2. B",
    });
    const html = chapter([set(["q1"])], [solo]);
    expect(html).toContain("Context for Q.1:");
    expect(html).not.toContain("Context: ");
    expect(html.indexOf("Consider the following: 1. A")).toBeLessThan(html.indexOf("Which of the statements given above"));
  });

  it("strips the item count from a shared passage", () => {
    const passage = "Consider the following for the next 02 (two) items: Let \\(z=1\\).";
    const html = chapter([set(["q1", "q2"])], [q("q1", { context: passage }), q("q2", { context: passage })]);
    expect(html).toContain("Common context for Q.1-2:");
    expect(html).not.toContain("02 (two)");
  });
});
