import { describe, expect, it } from "vitest";
import { homeworkDayExport, parseHomeworkTarget } from "@/lib/homework/dayExport";
import { chooseFormat } from "@/lib/export/access";
import { paperKey } from "@/lib/export/freePaper";

const item = (position: number, questionId: string, chapter = "Vectors") => ({
  position,
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
    });
  });

  it("refuses a day with no questions", () => {
    expect(homeworkDayExport("Plan", 99, [])).toEqual({ ok: false, reason: "That day is not in this plan." });
  });

  it("refuses a day with a gap, which would print wrong question numbers", () => {
    expect(homeworkDayExport("Plan", 1, [item(1, "a"), item(3, "c")]).ok).toBe(false);
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
