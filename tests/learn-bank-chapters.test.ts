/**
 * Learn course chapters ↔ question-bank chapters: "From your mistakes" turns a student's misses in
 * bank chapters into Learn chapters, so every Learn chapter must name a real bank chapter of its
 * exam. Both lists are snapshots (Learn from the 2026-10-27 import; bank from production the same
 * day); a Learn chapter added or renamed later fails here until it maps.
 */
import { describe, expect, it } from "vitest";
import { bankChapterLinks, bankChapterName, learnChapterFor, missesByCourseChapter } from "@/lib/learn/bankChapters";

const LEARN: Record<string, [string, string][]> = {
  "mh-hsc-12-maths": [
    ["mathematical-logic", "Mathematical Logic"], ["matrices", "Matrices"], ["trigonometric-functions-12", "Trigonometric Functions"],
    ["pair-of-straight-lines", "Pair of Straight Lines"], ["vectors", "Vectors"], ["line-and-plane", "Line and Plane"],
    ["differentiation-12", "Differentiation"], ["application-of-derivatives", "Application of Derivatives"],
    ["indefinite-integration", "Indefinite Integration"], ["definite-integration", "Definite Integration"],
    ["application-of-definite-integration", "Application of Definite Integration"], ["differential-equations", "Differential Equations"],
    ["probability-distributions", "Probability Distributions"], ["binomial-distribution", "Binomial Distribution"], ["linear-programming", "Linear Programming"],
  ],
  "cbse-12-maths": [
    ["relations-and-functions-12", "Relations and Functions"], ["inverse-trigonometric-functions", "Inverse Trigonometric Functions"],
    ["matrices", "Matrices"], ["determinants", "Determinants"], ["continuity-and-differentiability", "Continuity and Differentiability"],
    ["application-of-derivatives", "Application of Derivatives"], ["integrals", "Integrals"], ["application-of-integrals", "Application of Integrals"],
    ["differential-equations", "Differential Equations"], ["vector-algebra", "Vector Algebra"], ["three-dimensional-geometry", "Three Dimensional Geometry"],
    ["linear-programming", "Linear Programming"], ["probability-12", "Probability"],
  ],
};

const BANK: Record<string, string[]> = {
  "mh-hsc-12-maths": [
    "Application of Definite Integration", "Application of Derivatives", "Binomial Distribution", "Definite Integration", "Differential Equations",
    "Differentiation", "Indefinite Integration", "Line and Planes", "Linear Programming", "Mathematical Logic", "Matrices", "Pair of Straight Lines",
    "Probability Distributions", "Trigonometric Functions", "Vectors",
  ],
  "cbse-12-maths": [
    "Application of Derivatives", "Application of Integrals", "Continuity and Differentiability", "Determinants", "Differential Equations", "Integrals",
    "Inverse Trigonometric Functions", "Linear Programming", "Matrices", "Probability", "Relations and Functions", "Three Dimensional Geometry", "Vector Algebra",
  ],
};

describe("bankChapterName", () => {
  it("maps every Learn chapter of both courses to a bank chapter of its exam, one to one", () => {
    for (const [course, chapters] of Object.entries(LEARN)) {
      const names = chapters.map(([slug, title]) => bankChapterName(course, { slug, title }));
      for (const n of names) expect(BANK[course], `${course}: ${n}`).toContain(n);
      expect(new Set(names).size).toBe(names.length);
    }
  });

  it("uses the bank's name where the two differ", () => {
    expect(bankChapterName("mh-hsc-12-maths", { slug: "line-and-plane", title: "Line and Plane" })).toBe("Line and Planes");
    expect(bankChapterName("cbse-12-maths", { slug: "matrices", title: "Matrices" })).toBe("Matrices");
  });
});

describe("missesByCourseChapter", () => {
  const chapters = LEARN["mh-hsc-12-maths"].map(([slug, title]) => ({ slug, title }));

  it("turns bank-chapter misses into Learn chapters, most first, dropping chapters Learn does not teach", () => {
    const out = missesByCourseChapter("mh-hsc-12-maths", chapters, [
      { chapter: "Matrices", misses: 2, last_missed_at: "2026-10-20T00:00:00Z" },
      { chapter: "Line and Planes", misses: 5, last_missed_at: "2026-10-21T00:00:00Z" },
      { chapter: "Some Physics Chapter", misses: 9, last_missed_at: "2026-10-21T00:00:00Z" },
    ]);
    expect(out).toEqual([
      { slug: "line-and-plane", title: "Line and Plane", misses: 5 },
      { slug: "matrices", title: "Matrices", misses: 2 },
    ]);
  });

  it("is empty with no misses", () => {
    expect(missesByCourseChapter("mh-hsc-12-maths", chapters, [])).toEqual([]);
  });
});

describe("bankChapterLinks", () => {
  it("links a Learn chapter to its textbook chapter and its past questions, by the bank chapter's name", () => {
    expect(bankChapterLinks("mh-hsc-12", "mh-hsc-12-maths", { slug: "line-and-plane", title: "Line and Plane" })).toEqual({
      board: "/board/mh-hsc-12/mathematics/line-and-planes",
      questions: "/questions/mh-hsc-12/mathematics/line-and-planes",
    });
    expect(bankChapterLinks("cbse-12", "cbse-12-maths", { slug: "probability-12", title: "Probability" })).toEqual({
      board: "/board/cbse-12/mathematics/probability",
      questions: "/questions/cbse-12/mathematics/probability",
    });
  });

  it("gives every chapter of both courses a board and a questions link", () => {
    for (const [course, chapters] of Object.entries(LEARN)) {
      const exam = course.replace(/-maths$/, "");
      for (const [slug, title] of chapters) {
        const l = bankChapterLinks(exam, course, { slug, title });
        expect(l.board).toMatch(new RegExp(`^/board/${exam}/mathematics/[a-z0-9-]+$`));
        expect(l.questions).toMatch(new RegExp(`^/questions/${exam}/mathematics/[a-z0-9-]+$`));
      }
    }
  });
});

describe("learnChapterFor (the board reader's link back to Learn)", () => {
  it("finds the Learn chapter for every bank chapter of both courses, and nothing for others", () => {
    for (const [course, chapters] of Object.entries(LEARN)) {
      const list = chapters.map(([slug, title]) => ({ slug, title }));
      for (const name of BANK[course]) expect(learnChapterFor(course, list, name), `${course}: ${name}`).not.toBeNull();
      expect(learnChapterFor(course, list, "Not A Chapter")).toBeNull();
    }
    const mh = LEARN["mh-hsc-12-maths"].map(([slug, title]) => ({ slug, title }));
    expect(learnChapterFor("mh-hsc-12-maths", mh, "Line and Planes")).toEqual({ slug: "line-and-plane", title: "Line and Plane" });
  });
});
