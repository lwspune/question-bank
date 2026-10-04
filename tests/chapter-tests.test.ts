import { describe, it, expect } from "vitest";
import {
  chapterTestsByChapter,
  mockCtaCopy,
  withChapterTest,
  type ChapterTest,
} from "@/lib/mocks/chapterTests";

const mock = (slug: string, questionIds: string[], extra: Partial<{ title: string; durationSecs: number }> = {}) => ({
  slug,
  title: extra.title ?? `MHT-CET ${slug} — Chapter test`,
  totalQuestions: questionIds.length,
  durationSecs: extra.durationSecs ?? 2160,
  questionIds,
});

const chapterOf = new Map([
  ["q1", "ch-line"],
  ["q2", "ch-line"],
  ["q3", "ch-line"],
  ["q4", "ch-deriv"],
  ["q5", "ch-deriv"],
]);

describe("chapterTestsByChapter", () => {
  it("maps a test whose questions all come from one chapter to that chapter", () => {
    const out = chapterTestsByChapter([mock("line", ["q1", "q2", "q3"])], chapterOf);
    expect(out.get("ch-line")).toEqual({
      chapterId: "ch-line",
      slug: "line",
      title: "MHT-CET line — Chapter test",
      questions: 3,
      minutes: 36,
    });
  });

  it("skips a test that spans chapters: it is not a chapter test", () => {
    const out = chapterTestsByChapter([mock("mixed", ["q1", "q4"])], chapterOf);
    expect(out.size).toBe(0);
  });

  it("skips a test with a question it cannot place, rather than guessing", () => {
    const out = chapterTestsByChapter([mock("line", ["q1", "unknown"])], chapterOf);
    expect(out.size).toBe(0);
  });

  it("skips a test with no questions", () => {
    expect(chapterTestsByChapter([mock("empty", [])], chapterOf).size).toBe(0);
  });

  it("keeps the first by slug when two tests cover one chapter, whatever order they arrive in", () => {
    const a = chapterTestsByChapter([mock("line-b", ["q1"]), mock("line-a", ["q2"])], chapterOf);
    const b = chapterTestsByChapter([mock("line-a", ["q2"]), mock("line-b", ["q1"])], chapterOf);
    expect(a.get("ch-line")?.slug).toBe("line-a");
    expect(b.get("ch-line")?.slug).toBe("line-a");
  });

  it("rounds the duration to whole minutes", () => {
    const out = chapterTestsByChapter([mock("deriv", ["q4", "q5"], { durationSecs: 1830 })], chapterOf);
    expect(out.get("ch-deriv")?.minutes).toBe(31);
  });
});

const PAPER = { href: "/mock/exam/mht-cet", examDisplay: "MHT-CET" };
const TEST: ChapterTest = { chapterId: "ch-line", slug: "line", title: "t", questions: 20, minutes: 36 };

describe("withChapterTest", () => {
  it("points at the chapter's test when there is one", () => {
    expect(withChapterTest(PAPER, TEST, "Line and Plane")).toEqual({
      kind: "chapter",
      href: "/mock/line",
      examDisplay: "MHT-CET",
      chapterName: "Line and Plane",
      questions: 20,
      minutes: 36,
    });
  });

  it("keeps the exam's past papers when the chapter has no test", () => {
    expect(withChapterTest(PAPER, undefined, "Line and Plane")).toEqual({ kind: "paper", ...PAPER });
  });

  it("stays null for an exam without mocks", () => {
    expect(withChapterTest(null, TEST, "Line and Plane")).toBeNull();
  });
});

describe("mockCtaCopy", () => {
  it("keeps today's past-paper wording unchanged", () => {
    expect(mockCtaCopy({ kind: "paper", ...PAPER })).toEqual({
      title: "Test yourself on a real paper",
      body: "Sit a past MHT-CET paper, timed and marked the way the exam marks it. You see your score and every answer the moment you finish. Free to start.",
      button: "Sit an MHT-CET past paper",
      bar: "Sit a real MHT-CET paper, timed.",
      short: "Sit an MHT-CET paper as a timed mock",
    });
  });

  it("picks a or an by how the exam name is said", () => {
    expect(mockCtaCopy({ kind: "paper", href: "/mock/exam/nda", examDisplay: "NDA" }).button).toBe("Sit an NDA past paper");
    expect(mockCtaCopy({ kind: "paper", href: "/mock/exam/cds", examDisplay: "CDS" }).button).toBe("Sit a CDS past paper");
  });

  it("names the chapter, its size and its time for a chapter test", () => {
    const copy = mockCtaCopy(withChapterTest(PAPER, TEST, "Line and Plane")!);
    expect(copy).toEqual({
      title: "Test yourself on Line and Plane",
      body: "20 past MHT-CET questions from this chapter, timed at 36 minutes and marked the way the exam marks it. You see your score and every answer the moment you finish. Free to start.",
      button: "Take the Line and Plane chapter test",
      bar: "Line and Plane chapter test: 20 questions, 36 minutes.",
      short: "Take the Line and Plane chapter test",
    });
  });
});
