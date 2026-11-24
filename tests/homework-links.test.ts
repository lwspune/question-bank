import { describe, expect, it } from "vitest";
import { MOST_ASKED, dayHref, daysHref, examHomeworkHref, parseDayParam, planHref, planViews, subjectHomework } from "@/lib/homework/links";

const plan = (slug: string, examName: string, subjectName: string, perDay = 5) => ({
  slug,
  examName,
  subjectName,
  perDay,
});
const PLANS = [
  plan("mh-hsc-12-maths", "Maharashtra HSC Class 12", "Mathematics"),
  plan("cbse-12-physics", "CBSE Class 12", "Physics"),
  plan("cbse-12-chemistry", "CBSE Class 12", "Chemistry", 4),
];

describe("subjectHomework", () => {
  // The card says "daily homework", so it opens the plan's days, not its
  // Top 10 front page (2026-11-24).
  it("gives a board subject tab its plan's days", () => {
    expect(subjectHomework(PLANS, "CBSE Class 12", "Chemistry")).toEqual({
      href: "/homework/cbse-12-chemistry/days",
      perDay: 4,
    });
  });

  it("gives nothing to a subject with no plan, even when another exam has that subject", () => {
    expect(subjectHomework(PLANS, "CBSE Class 12", "Mathematics")).toBeNull();
    expect(subjectHomework(PLANS, "Maharashtra HSC Class 12", "Physics")).toBeNull();
  });
});

describe("examHomeworkHref", () => {
  it("opens the plan itself when the exam has one", () => {
    expect(examHomeworkHref(PLANS, "Maharashtra HSC Class 12", "mh-hsc-12")).toBe("/homework/mh-hsc-12-maths");
  });

  // Was the every-exam /homework hub; that exam's own plans are the useful list.
  it("opens that exam's list of plans when it has more than one", () => {
    expect(examHomeworkHref(PLANS, "CBSE Class 12", "cbse-12")).toBe("/homework/exam/cbse-12");
  });

  it("gives no link to an exam with no plan", () => {
    expect(examHomeworkHref(PLANS, "NEET", "neet")).toBeNull();
  });
});

describe("Most Asked (2026-11-24)", () => {
  // A student asked V whether "homework" was the same as the PYQs: the
  // section is named for what it holds, the most asked past questions.
  it("names the section Most Asked", () => {
    expect(MOST_ASKED).toBe("Most Asked");
  });

  it("opens a plan on its Top 10 PYQs, with its days on their own page", () => {
    expect(planHref("nda-maths")).toBe("/homework/nda-maths");
    expect(daysHref("nda-maths")).toBe("/homework/nda-maths/days");
  });

  it("puts Top 10 PYQs first and Daily homework second in a plan's tabs", () => {
    expect(planViews("nda-maths")).toEqual([
      { id: "top", label: "Top 10 PYQs", href: "/homework/nda-maths" },
      { id: "days", label: "Daily homework", href: "/homework/nda-maths/days" },
    ]);
  });
});

describe("day pages", () => {
  it("are addressed by plan and day", () => {
    expect(dayHref("cbse-12-physics", 12)).toBe("/homework/cbse-12-physics/day/12");
  });

  it.each([
    ["12", 12],
    ["1", 1],
    ["0", null],
    ["-3", null],
    ["1.5", null],
    ["12abc", null],
    ["", null],
    ["99999", null],
  ])("reads the day segment %j as %j", (raw, want) => {
    expect(parseDayParam(raw)).toBe(want);
  });
});
