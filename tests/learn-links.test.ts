import { describe, expect, it } from "vitest";
import { chapterHref, courseHref, lessonHref, LEARN_HUB } from "@/lib/learn/links";

describe("Learn links", () => {
  it("builds hub, course and chapter-map paths", () => {
    expect(LEARN_HUB).toBe("/learn");
    expect(courseHref("mh-hsc-12-maths")).toBe("/learn/mh-hsc-12-maths");
    expect(chapterHref("mh-hsc-12-maths", "matrices")).toBe("/learn/mh-hsc-12-maths/matrices");
  });

  it("gives each concept one lesson address, with the course and refresher as query", () => {
    expect(lessonHref("matrices", "inverse")).toBe("/learn/lesson/matrices/inverse");
    expect(lessonHref("matrices", "inverse", { course: "cbse-12-maths" })).toBe("/learn/lesson/matrices/inverse?course=cbse-12-maths");
    expect(lessonHref("matrices", "inverse", { course: "cbse-12-maths", from: "adjoint" })).toBe(
      "/learn/lesson/matrices/inverse?course=cbse-12-maths&from=adjoint",
    );
    expect(lessonHref("matrices", "inverse", { from: "adjoint" })).toBe("/learn/lesson/matrices/inverse?from=adjoint");
  });
});
