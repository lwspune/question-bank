import { describe, it, expect } from "vitest";
import { TITLE_MAX } from "@/lib/seo/title";
import { questionsLandingTitle, boardChapterTitle } from "@/lib/seo/pageTitles";

describe("questionsLandingTitle", () => {
  it("names the exam by its short name, the subject and PYQs", () => {
    expect(
      questionsLandingTitle({ chapterName: "Differentiation", examDisplay: "MHT-CET", subjectName: "Maths", practiceOnly: false })
    ).toBe("Differentiation — MHT-CET Maths PYQs · PYQ Vault");
  });

  it("says Practice Questions for a practice-only exam", () => {
    expect(
      questionsLandingTitle({ chapterName: "Matrices", examDisplay: "CBSE Class 12", subjectName: "Mathematics", practiceOnly: true })
    ).toBe("Matrices — CBSE Class 12 Mathematics Practice Questions · PYQ Vault");
  });

  it("stays within the limit for the longest names on the site", () => {
    const t = questionsLandingTitle({
      chapterName: "Electromagnetic Waves and Communication System",
      examDisplay: "MH State Board 11",
      subjectName: "Physics",
      practiceOnly: true,
    });
    expect(t.length).toBeLessThanOrEqual(TITLE_MAX);
    expect(t).toContain("MH State Board 11");
  });
});

/**
 * Sibling chapters that collided in the 2026-09-27 local crawl: trimming the
 * chapter name to fit exam + subject + page type left them the same prefix.
 */
const SIBLINGS: [string, string, string, string][] = [
  ["CBSE Class 11", "Physics", "Mechanical Properties of Fluids", "Mechanical Properties of Solids"],
  ["MH SSC 10", "Science and Technology II", "Life Processes in Living Organisms Part - 1", "Life Processes in Living Organisms Part - 2"],
  ["UPSC CSE", "Data Interpretation and Data Sufficiency", "Data Interpretation", "Data Sufficiency"],
  ["MH SSC 10", "History", "Historiography: Development in the West", "Historiography: Indian Tradition"],
  ["MH State Board 9", "Political Science", "India's Foreign Policy", "India's Defence System"],
  ["CBSE Class 12", "Mathematics", "Application of Derivatives", "Application of Integrals"],
];

describe("sibling chapters", () => {
  it.each(SIBLINGS)("%s %s: '%s' and '%s' get different titles", (examDisplay, subjectName, a, b) => {
    for (const build of [
      (c: string) => questionsLandingTitle({ chapterName: c, examDisplay, subjectName, practiceOnly: false }),
      (c: string) => boardChapterTitle({ chapterName: c, examDisplay, subjectName }),
    ]) {
      const [ta, tb] = [build(a), build(b)];
      expect(ta).not.toBe(tb);
      expect(ta.length).toBeLessThanOrEqual(TITLE_MAX);
      expect(ta).not.toContain("…"); // the whole chapter name fits once the subject gives way
    }
  });

  it("gives up the subject before the page type", () => {
    expect(
      questionsLandingTitle({
        chapterName: "Mechanical Properties of Fluids",
        examDisplay: "CBSE Class 11",
        subjectName: "Physics",
        practiceOnly: true,
      })
    ).toBe("Mechanical Properties of Fluids — CBSE Class 11 Practice Questions");
  });
});

describe("boardChapterTitle", () => {
  it("names the board, so the same chapter in two boards gets two titles", () => {
    const a = boardChapterTitle({ chapterName: "Matrices", examDisplay: "MH HSC 12", subjectName: "Mathematics" });
    const b = boardChapterTitle({ chapterName: "Matrices", examDisplay: "CBSE Class 12", subjectName: "Mathematics" });
    expect(a).toBe("Matrices — MH HSC 12 Mathematics Textbook Solutions · PYQ Vault");
    expect(a).not.toBe(b);
  });

  it("stays within the limit for a long chapter name", () => {
    const t = boardChapterTitle({
      chapterName: "Semiconductor Electronics: Materials, Devices and Simple Circuits",
      examDisplay: "CBSE Class 12",
      subjectName: "Physics",
    });
    expect(t.length).toBeLessThanOrEqual(TITLE_MAX);
    expect(t).toContain("CBSE Class 12");
  });
});
