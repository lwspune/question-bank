import { describe, expect, it } from "vitest";
import { homeworkDayExport, homeworkQuestions, parseHomeworkTarget } from "@/lib/homework/dayExport";
import { ASSERTION_REASON_INSTRUCTION } from "@/lib/mocks/instructionContext";
import type { QuestionRow } from "@/lib/questions/query";
import { chooseFormat } from "@/lib/export/access";
import { paperKey } from "@/lib/export/freePaper";

const item = (position: number, questionId: string, chapter = "Vectors", sub = 1) => ({
  position,
  sub,
  questionId,
  chapter,
  note: `Asked ${position + 1} times: Mar 2016`,
});

describe("homeworkDayExport", () => {
  it("returns the day's questions in position order, each headed by its chapter and note", () => {
    const out = homeworkDayExport("HSC 12 Maths", 3, [item(2, "q2", "Matrices"), item(1, "q1")]);
    expect(out).toEqual({
      ok: true,
      title: "Daily Homework #3: HSC 12 Maths",
      questionIds: ["q1", "q2"],
      sectionOf: new Map([
        ["q1", "Vectors | Asked 2 times: Mar 2016"],
        ["q2", "Matrices | Asked 3 times: Mar 2016"],
      ]),
      setOf: new Map(),
    });
  });

  it("keeps a case study's parts together in order, under one set so its passage prints once", () => {
    const out = homeworkDayExport("Plan", 2, [
      item(2, "p2", "Optics", 2),
      item(1, "a"),
      item(2, "p1", "Optics", 1),
      item(3, "b"),
    ]);
    expect(out.ok && out.questionIds).toEqual(["a", "p1", "p2", "b"]);
    expect(out.ok && out.setOf).toEqual(new Map([["p1", "homework-2-2"], ["p2", "homework-2-2"]]));
  });

  it("refuses a slot whose parts have a gap", () => {
    expect(homeworkDayExport("Plan", 1, [item(1, "p1", "Optics", 1), item(1, "p3", "Optics", 3)]).ok).toBe(false);
  });

  it("refuses a day with no questions", () => {
    expect(homeworkDayExport("Plan", 99, [])).toEqual({ ok: false, reason: "That day is not in this plan." });
  });

  it("refuses a day with a gap, which would print wrong question numbers", () => {
    expect(homeworkDayExport("Plan", 1, [item(1, "a"), item(3, "c")]).ok).toBe(false);
  });
});

describe("homeworkQuestions", () => {
  const row = (id: string, context: string | null) => ({ id, context, setId: null }) as unknown as QuestionRow;

  it("puts a case study's parts in one set, so the passage prints once", () => {
    const out = homeworkQuestions([row("p1", "A passage"), row("p2", "A passage"), row("x", null)], new Map([["p1", "s"], ["p2", "s"]]));
    expect(out.map((q) => q.setId)).toEqual(["s", "s", null]);
  });

  it("replaces a paper's Assertion-Reason directions, which name that paper's question numbers", () => {
    const ar = "For Questions number 13 to 16, two statements are given, one labelled as Assertion (A) and the other labelled as Reason (R).";
    const [q] = homeworkQuestions([row("a", ar)], new Map());
    expect(q.context).toBe(ASSERTION_REASON_INSTRUCTION);
  });

  it("keeps a real passage", () => {
    const passage = "Electrochemistry is the study of the relationship between chemical energy and electrical energy. ".repeat(3);
    expect(homeworkQuestions([row("a", passage)], new Map())[0].context).toBe(passage);
  });
});

describe("parseHomeworkTarget", () => {
  it("accepts a plan slug and a whole day number", () => {
    expect(parseHomeworkTarget({ slug: "mh-hsc-12-maths", day: 12 })).toEqual({ slug: "mh-hsc-12-maths", day: 12 });
  });

  it.each([
    null,
    "mh-hsc-12-maths",
    { slug: "Bad Slug", day: 1 },
    { slug: "ok", day: 0 },
    { slug: "ok", day: 1.5 },
    { slug: "ok", day: "2" },
    { slug: "a".repeat(81), day: 1 },
  ])("refuses %j", (raw) => {
    expect(parseHomeworkTarget(raw)).toBeNull();
  });
});

describe("chooseFormat", () => {
  it("lets institute staff ask for a PDF or a Word file", () => {
    expect(chooseFormat({ granted: "docx", isStaff: true, requested: "pdf" })).toBe("pdf");
    expect(chooseFormat({ granted: "docx", isStaff: true, requested: "docx" })).toBe("docx");
  });

  it("keeps everyone else on the format the gate granted", () => {
    expect(chooseFormat({ granted: "pdf", isStaff: false, requested: "docx" })).toBe("pdf");
  });

  it("ignores anything that is not a format", () => {
    expect(chooseFormat({ granted: "docx", isStaff: true, requested: "exe" })).toBe("docx");
    expect(chooseFormat({ granted: "docx", isStaff: true, requested: undefined })).toBe("docx");
  });
});

describe("paperKey for a homework day", () => {
  it("names the plan and the day, so each day is its own paper", () => {
    expect(paperKey({ homework: { slug: "mh-hsc-12-maths", day: 4 } })).toBe("homework:mh-hsc-12-maths:4");
    expect(paperKey({ homework: { slug: "mh-hsc-12-maths", day: 5 } })).not.toBe(
      paperKey({ homework: { slug: "mh-hsc-12-maths", day: 4 } })
    );
  });
});
