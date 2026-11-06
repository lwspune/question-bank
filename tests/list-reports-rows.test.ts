import { describe, expect, it } from "vitest";
import { toReportRows } from "@/lib/reports/listReports";

// The triage page showed "(question deleted)" on EVERY report from 2026-05-18
// to 2026-11-06: the mapper read the question embed as an array, and PostgREST
// returns a many-to-one embed (question_reports.question_id -> questions) as a
// single OBJECT. These fixtures use that real shape.
const base = {
  id: "r1",
  question_id: "q1",
  reported_by: "u1",
  category: "incorrect_solution",
  details: "the sign is wrong",
  status: "open",
  created_at: "2026-11-05T04:25:00Z",
  resolved_at: null,
  resolution_note: null,
};

describe("toReportRows", () => {
  it("reads a many-to-one question embed returned as an object", () => {
    const [row] = toReportRows([
      {
        ...base,
        questions: {
          text: "Two identical charged spheres",
          exam: { name: "JEE Mains" },
          subject: { name: "Physics" },
          chapter: { name: "Electrostatics" },
          subtopic: { name: "Coulomb's Law" },
        },
      },
    ]);
    expect(row.question).toEqual({
      text: "Two identical charged spheres",
      examName: "JEE Mains",
      subjectName: "Physics",
      chapterName: "Electrostatics",
      subtopicName: "Coulomb's Law",
    });
  });

  it("still reads the array shape, should a client ever return one", () => {
    const [row] = toReportRows([
      {
        ...base,
        questions: [
          {
            text: "Find the particular solution",
            exam: [{ name: "CBSE Class 12" }],
            subject: [{ name: "Mathematics" }],
            chapter: [{ name: "Differential Equations" }],
            subtopic: [],
          },
        ],
      },
    ]);
    expect(row.question.text).toBe("Find the particular solution");
    expect(row.question.examName).toBe("CBSE Class 12");
    expect(row.question.subtopicName).toBeNull();
  });

  it("leaves the text empty only when the question is really gone", () => {
    const [row] = toReportRows([{ ...base, questions: null }]);
    expect(row.question.text).toBe("");
    expect(row.question.examName).toBe("");
    expect(row.question.subtopicName).toBeNull();
  });

  it("keeps a null subtopic null", () => {
    const [row] = toReportRows([
      {
        ...base,
        questions: {
          text: "x",
          exam: { name: "NDA" },
          subject: { name: "Maths" },
          chapter: { name: "Matrices" },
          subtopic: null,
        },
      },
    ]);
    expect(row.question.subtopicName).toBeNull();
    expect(row.questionId).toBe("q1");
    expect(row.details).toBe("the sign is wrong");
  });
});
