import { describe, it, expect } from "vitest";
import { boardContinueTarget, HUB_BOARD_CHAPTERS } from "@/lib/board/hub";

/**
 * /board/<exam> lists every subject's chapters under tabs, and a signed-in
 * student gets a Continue card: the chapter (and book section) of the last
 * board question they answered.
 */
const chapters = {
  "ch-diff": { href: "/board/mh-hsc-12/maths/differentiation", name: "Differentiation", subjectName: "Mathematics" },
};

describe("boardContinueTarget", () => {
  it("names the chapter, subject and book section of the last question answered", () => {
    expect(boardContinueTarget({ chapterId: "ch-diff", sectionLabel: "Exercise 8.2" }, chapters)).toEqual({
      href: "/board/mh-hsc-12/maths/differentiation",
      chapterName: "Differentiation",
      subjectName: "Mathematics",
      sectionLabel: "Exercise 8.2",
    });
  });

  it("works without a section label", () => {
    expect(boardContinueTarget({ chapterId: "ch-diff", sectionLabel: null }, chapters)?.sectionLabel).toBeNull();
  });

  it("returns null for a question from another exam or an unlisted chapter", () => {
    expect(boardContinueTarget({ chapterId: "elsewhere", sectionLabel: "Exercise 1.1" }, chapters)).toBeNull();
  });

  it("returns null when there is no board answer yet", () => {
    expect(boardContinueTarget(null, chapters)).toBeNull();
  });

  it("shows six chapters per subject before Show all", () => {
    expect(HUB_BOARD_CHAPTERS).toBe(6);
  });
});
