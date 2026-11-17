import { describe, expect, it } from "vitest";
import { EXAM_REGISTRY, examAltLang, examDefaultLang, getExamBySlug } from "../src/lib/exam/examContext";

describe("examDefaultLang", () => {
  it("opens UP Board pages in Hindi (owner, 2026-11-17)", () => {
    expect(examDefaultLang(getExamBySlug("up-board-10"))).toBe("hi");
    expect(examDefaultLang(getExamBySlug("up-board-12"))).toBe("hi");
  });

  it("names no default for an exam that keeps the language rule", () => {
    expect(examDefaultLang(getExamBySlug("ssc-cgl"))).toBeNull();
    expect(examDefaultLang(getExamBySlug("rpsc-ras"))).toBeNull();
    expect(examDefaultLang(getExamBySlug("nda"))).toBeNull();
    expect(examDefaultLang(null)).toBeNull();
  });

  it("is only declared on a bilingual exam, and only as one of its own languages", () => {
    for (const e of EXAM_REGISTRY) {
      if (!e.defaultLang) continue;
      const alt = examAltLang(e);
      expect(alt, `${e.slug} declares defaultLang but is not bilingual`).not.toBeNull();
      expect(["en", "both", alt], `${e.slug} defaultLang`).toContain(e.defaultLang);
    }
  });
});

describe("hasQuestionPapers", () => {
  it("gives /question-papers to a textbook board and to UP Board, which has papers but no textbook (2026-11-17)", async () => {
    const { hasQuestionPapers, QUESTION_PAPER_EXAMS, BOARD_EXAMS } = await import("../src/lib/exam/examContext");
    expect(hasQuestionPapers(getExamBySlug("cbse-12"))).toBe(true);
    expect(hasQuestionPapers(getExamBySlug("up-board-10"))).toBe(true);
    expect(hasQuestionPapers(getExamBySlug("up-board-12"))).toBe(true);
    expect(hasQuestionPapers(getExamBySlug("nda"))).toBe(false);
    expect(hasQuestionPapers(null)).toBe(false);
    // UP gets the papers, never the empty /board reader.
    expect(BOARD_EXAMS.map((e) => e.slug)).not.toContain("up-board-10");
    expect(QUESTION_PAPER_EXAMS.map((e) => e.slug)).toEqual(expect.arrayContaining(["cbse-12", "up-board-10", "up-board-12"]));
  });
});
