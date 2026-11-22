/**
 * How a Learn course names its school years and its past questions (2026-11-22): the board
 * courses are one class, NDA's spans Class 11 and 12 and has no board. The years are read from
 * the chapters, never assumed from the course row (which holds only the highest).
 */
import { describe, expect, it } from "vitest";
import { courseLevel, pastQuestionsLabel } from "@/lib/learn/courseName";

describe("courseLevel", () => {
  it("one class", () => {
    expect(courseLevel([12, 12, 12])).toBe("Class 12");
  });

  it("two classes, lowest first, whatever the chapter order", () => {
    expect(courseLevel([12, 11, 12, 11])).toBe("Class 11 and 12");
  });

  it("three or more", () => {
    expect(courseLevel([10, 9, 11])).toBe("Class 9, 10 and 11");
  });

  it("no chapters: nothing to say", () => {
    expect(courseLevel([])).toBeNull();
  });
});

describe("pastQuestionsLabel", () => {
  it("a board exam's past questions are board questions", () => {
    expect(pastQuestionsLabel("cbse-12")).toBe("Past board questions");
  });

  it("an entrance exam names itself", () => {
    expect(pastQuestionsLabel("nda")).toBe("Past NDA questions");
  });
});
