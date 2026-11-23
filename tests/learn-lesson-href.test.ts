import { describe, expect, it } from "vitest";
import { lessonHref, parseLessonHref } from "@/lib/learn/links";

// A Learn lesson's address read back (2026-11-22): V's map rows and the lesson's own links
// open the lesson inside V instead of leaving for its page.
describe("parseLessonHref", () => {
  it("reads a lesson's chapter, concept and course", () => {
    expect(parseLessonHref(lessonHref("matrices", "transpose", { course: "cbse-12-maths" }))).toEqual({
      chapter: "matrices",
      concept: "transpose",
      course: "cbse-12-maths",
    });
    expect(parseLessonHref("/learn/lesson/vectors/dot-product")).toEqual({ chapter: "vectors", concept: "dot-product", course: null });
  });

  it("ignores a refresher's ?from= and reads a full address", () => {
    expect(parseLessonHref("/learn/lesson/vectors/dot-product?course=mh-hsc-12-maths&from=cross-product")).toEqual({
      chapter: "vectors",
      concept: "dot-product",
      course: "mh-hsc-12-maths",
    });
    expect(parseLessonHref("https://www.pyqvault.com/learn/lesson/vectors/dot-product")?.concept).toBe("dot-product");
  });

  it("is null for anything that is not a lesson", () => {
    for (const href of ["/learn", "/learn/cbse-12-maths", "/learn/cbse-12-maths/matrices", "/notes/x/y", "/learn/lesson/Bad Slug/x", "", "/learn/lesson/a/b/c"]) {
      expect(parseLessonHref(href)).toBeNull();
    }
  });
});
