import { describe, expect, it } from "vitest";
import { dayHref, examHomeworkHref, parseDayParam, subjectHomework } from "@/lib/homework/links";

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
  it("gives a board subject tab its plan", () => {
    expect(subjectHomework(PLANS, "CBSE Class 12", "Chemistry")).toEqual({
      href: "/homework/cbse-12-chemistry",
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
    expect(examHomeworkHref(PLANS, "Maharashtra HSC Class 12")).toBe("/homework/mh-hsc-12-maths");
  });

  it("opens the list of plans when the exam has more than one", () => {
    expect(examHomeworkHref(PLANS, "CBSE Class 12")).toBe("/homework");
  });

  it("gives no link to an exam with no plan", () => {
    expect(examHomeworkHref(PLANS, "NEET")).toBeNull();
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
