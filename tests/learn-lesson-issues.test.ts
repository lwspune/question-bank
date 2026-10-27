import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
const { lessonIssues } = await import("@/lib/learn/lessonIssues");
const { renderInlineText, renderRichText } = await import("@/lib/learn/richText");

const slide = (id: string, body: string) => ({ id, title: "T", heading: renderInlineText("T"), kind: "text" as const, body: renderRichText(body) });
const item = (n: number, stem = "What is $x$?") => ({
  id: `i${n}`,
  code: `C01-Q${n}`,
  stem: renderRichText(stem),
  figure: null,
  options: ["A", "B", "C", "D"].map((key) => ({ key, text: renderInlineText(key) })),
});
const lesson = (over: Partial<{ slides: unknown[]; items: unknown[] }> = {}) =>
  ({
    chapter: { slug: "ch", title: "Ch" },
    concept: { code: "C01", slug: "c01", title: "Concept", oneLiner: "o", group: "g" },
    slides: [slide("hook", "Think."), { id: "questions", title: "Check", heading: renderInlineText("Check"), kind: "questions" }],
    items: [item(1), item(2), item(3)],
    ...over,
  }) as Parameters<typeof lessonIssues>[0];

describe("lessonIssues", () => {
  it("passes a lesson with slides and three questions", () => {
    expect(lessonIssues(lesson())).toEqual([]);
  });

  it("flags a concept that can never be mastered (fewer than 3 questions)", () => {
    expect(lessonIssues(lesson({ items: [item(1), item(2)] }))).toEqual(["only 2 checked questions; mastery needs 3"]);
  });

  it("flags maths KaTeX cannot render, naming where", () => {
    const bad = lesson({ items: [item(1, "Broken $\\frac{1$ here"), item(2), item(3)] });
    expect(lessonIssues(bad)).toEqual(["maths does not render in question C01-Q1"]);
    const badSlide = lesson({ slides: [slide("idea", "Bad $\\notacommand{x}$."), slide("questions", "")] });
    expect(lessonIssues(badSlide)).toEqual(["maths does not render on slide idea"]);
  });

  it("flags a question without four options", () => {
    const three = { ...item(2), options: item(2).options.slice(0, 3) };
    expect(lessonIssues(lesson({ items: [item(1), three, item(3)] }))).toEqual(["question C01-Q2 has 3 options"]);
  });

  it("flags a lesson with no teaching slides", () => {
    expect(lessonIssues(lesson({ slides: [] }))).toEqual(["no slides"]);
  });
});
