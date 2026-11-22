import { describe, expect, it } from "vitest";
import { LEARN_CHAPTER_LINKS, LEARN_LESSON_TOPICS, learnChapterFor, lessonTopics } from "@/lib/learn/vLinks";

describe("learnChapterFor: which Learn chapter teaches a bank chapter", () => {
  it("a board chapter maps to its own course", () => {
    expect(learnChapterFor("CBSE Class 12", "Matrices")).toEqual({ course: "cbse-12-maths", chapter: "matrices" });
    expect(learnChapterFor("Maharashtra HSC Class 12", "Line and Planes")).toEqual({ course: "mh-hsc-12-maths", chapter: "line-and-plane" });
  });

  it("MHT-CET uses the HSC course, JEE the CBSE course", () => {
    expect(learnChapterFor("MHT-CET", "Determinants and Matrices")).toEqual({ course: "mh-hsc-12-maths", chapter: "matrices" });
    expect(learnChapterFor("JEE Mains", "Vector Algebra")).toEqual({ course: "cbse-12-maths", chapter: "vector-algebra" });
  });

  it("a JEE chapter that is half of a Learn chapter names its parts", () => {
    expect(learnChapterFor("JEE Mains", "Definite Integration")).toEqual({ course: "cbse-12-maths", chapter: "integrals", parts: [2] });
    expect(learnChapterFor("JEE Mains", "Indefinite Integration")).toEqual({ course: "cbse-12-maths", chapter: "integrals", parts: [1] });
  });

  it("a chapter Learn does not teach, or another subject or exam, has none", () => {
    expect(learnChapterFor("JEE Mains", "Conic Sections")).toBeNull();
    expect(learnChapterFor("NDA", "Matrices")).toBeNull();
    expect(learnChapterFor("CBSE Class 12", "Electrostatics")).toBeNull();
  });
});

describe("lessonTopics: the bank topics a board lesson's mistakes are filed under", () => {
  it("one topic, or several when one lesson covers two", () => {
    expect(lessonTopics("cbse-12-maths", "matrices", "matrix-multiplication")).toEqual(["Multiplication of Matrices"]);
    expect(lessonTopics("cbse-12-maths", "probability-12", "total-probability-bayes")).toEqual(["Theorem of Total Probability", "Bayes' Theorem"]);
  });

  it("an unknown lesson, or a course with no topic file, gives none", () => {
    expect(lessonTopics("cbse-12-maths", "matrices", "no-such-lesson")).toEqual([]);
    expect(lessonTopics("nope", "matrices", "transpose")).toEqual([]);
  });
});

describe("the files are well formed", () => {
  const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
  it("every link names a course, a chapter slug and whole part numbers", () => {
    for (const [key, link] of Object.entries(LEARN_CHAPTER_LINKS)) {
      expect(key).toMatch(/^[^|]+\|[^|]+$/);
      expect(link.course).toMatch(SLUG);
      expect(link.chapter).toMatch(SLUG);
      for (const p of link.parts ?? []) expect(Number.isInteger(p) && p >= 1).toBe(true);
    }
  });

  it("every board course chapter in the topic file has a chapter link from its own exam", () => {
    const linked = new Set(Object.values(LEARN_CHAPTER_LINKS).map((l) => `${l.course}/${l.chapter}`));
    for (const key of Object.keys(LEARN_LESSON_TOPICS)) expect(linked.has(key), key).toBe(true);
  });

  it("every lesson names at least one topic", () => {
    for (const [key, lessons] of Object.entries(LEARN_LESSON_TOPICS)) {
      for (const [slug, topics] of Object.entries(lessons)) {
        expect(slug, key).toMatch(SLUG);
        expect((Array.isArray(topics) ? topics : [topics]).length, `${key}/${slug}`).toBeGreaterThan(0);
      }
    }
  });
});
