/**
 * Home's "Continue" list follows the exam focus (2026-11-08). Each entry knows
 * its exam; a focused list keeps that exam's entries and anything whose exam
 * cannot be told (never hidden on a guess). Filtered BEFORE the top three are
 * picked, so an older entry of the focus exam is not lost behind newer ones of
 * another exam. Pure: lib/me/continue.ts.
 */
import { describe, it, expect } from "vitest";
import { focusContinue, practiceContinue, type ChapterInfo, type ContinueItem } from "@/lib/me/continue";

const item = (key: string, at: string, examSlug: string | null): ContinueItem => ({
  key,
  kind: "bank",
  title: key,
  subtitle: "",
  href: `/x/${key}`,
  at,
  examSlug,
});

describe("practiceContinue", () => {
  it("carries the chapter's exam onto the entry", () => {
    const chapter: ChapterInfo = {
      chapterId: "c1",
      chapterName: "Optics",
      subjectId: "s1",
      subjectName: "Physics",
      examId: "e1",
      examName: "JEE Mains",
      examSlug: "jee-mains",
      landingHref: "/questions/jee-mains/physics/optics",
    };
    const [c] = practiceContinue(
      [{ questionId: "q1", at: "2026-11-01T00:00:00Z", surface: "bank" }],
      new Map([["q1", chapter]]),
      new Set()
    );
    expect(c.examSlug).toBe("jee-mains");
  });
});

describe("focusContinue", () => {
  const items = [
    item("a", "2026-11-05", "jee-mains"),
    item("b", "2026-11-04", "jee-mains"),
    item("c", "2026-11-03", "jee-mains"),
    item("d", "2026-11-02", "mht-cet"),
    item("e", "2026-11-01", null),
  ];

  it("returns the newest three of every exam with no focus", () => {
    expect(focusContinue(items, null).map((i) => i.key)).toEqual(["a", "b", "c"]);
  });

  it("keeps the focus exam's entries, and ones of no known exam, before picking three", () => {
    expect(focusContinue(items, "mht-cet").map((i) => i.key)).toEqual(["d", "e"]);
  });
});
