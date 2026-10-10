import { describe, it, expect } from "vitest";
import { paperLinkMap, type PaperOfQuestion } from "@/lib/questions/paperLinks";

const mock = (questionId: string, slug: string, year: number): PaperOfQuestion => ({
  question_id: questionId,
  kind: "mock",
  slug,
  year,
  exam_name: null,
  subject_name: null,
});
const board = (questionId: string, group: string, year: number, exam: string, subject: string): PaperOfQuestion => ({
  question_id: questionId,
  kind: "board",
  slug: group,
  year,
  exam_name: exam,
  subject_name: subject,
});

describe("paperLinkMap — where a tap on a question's source pill goes", () => {
  it("sends an entrance-exam question to its past paper's page", () => {
    const m = paperLinkMap([mock("q1", "mpsc-2017-c", 2017)], new Map([["q1", 2017]]));
    expect(m.get("q1")).toBe("/mock/mpsc-2017-c");
  });

  it("sends a board question to its printed paper", () => {
    const m = paperLinkMap(
      [board("q2", "2025-55-1", 2025, "CBSE Class 12", "Physics")],
      new Map([["q2", 2025]])
    );
    expect(m.get("q2")).toBe("/question-papers/cbse-12/physics/2025-55-1");
  });

  it("links nothing when the paper's year is not the year the pill prints", () => {
    const m = paperLinkMap([mock("q3", "nda-2024-sep-maths", 2024)], new Map([["q3", 2019]]));
    expect(m.has("q3")).toBe(false);
  });

  it("links nothing for a question with no year, or an exam the site does not know", () => {
    const m = paperLinkMap(
      [mock("q4", "x-2020", 2020), board("q5", "2020-1", 2020, "Not An Exam", "Physics")],
      new Map<string, number | null>([["q4", null], ["q5", 2020]])
    );
    expect(m.size).toBe(0);
  });

  it("keeps the first paper when a question is in two", () => {
    const m = paperLinkMap(
      [mock("q6", "first-2022", 2022), mock("q6", "second-2022", 2022)],
      new Map([["q6", 2022]])
    );
    expect(m.get("q6")).toBe("/mock/first-2022");
  });
});
