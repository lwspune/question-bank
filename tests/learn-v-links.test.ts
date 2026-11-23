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

  it("NDA maps every Maths chapter to its own course, by the bank's name", () => {
    expect(learnChapterFor("NDA", "Matrices & Determinants")).toEqual({ course: "nda-maths", chapter: "determinants-and-matrices" });
    expect(learnChapterFor("NDA", "3D Geometry")).toEqual({ course: "nda-maths", chapter: "line-and-plane" });
    expect(learnChapterFor("NDA", "Applications of Integration")).toEqual({ course: "nda-maths", chapter: "application-of-definite-integration" });
    const nda = Object.entries(LEARN_CHAPTER_LINKS).filter(([k]) => k.startsWith("NDA|"));
    expect(nda).toHaveLength(31);
    expect(new Set(nda.map(([, l]) => l.chapter)).size).toBe(31);
    for (const [, l] of nda) expect(l.course).toBe("nda-maths");
  });

  it("a chapter Learn does not teach, or another subject or exam, has none", () => {
    expect(learnChapterFor("JEE Mains", "Conic Sections")).toBeNull();
    expect(learnChapterFor("CDS", "Matrices & Determinants")).toBeNull();
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

describe("topicKey: a topic named in the file matches the bank's whatever its punctuation", () => {
  it("dash, colon, case and spacing do not matter; letters and digits do", async () => {
    const { topicKey } = await import("@/lib/learn/vLinks");
    const bank = "Solution of Triangle " + String.fromCodePoint(0x2014) + " Sine, Cosine and Projection Rules";
    expect(topicKey(bank)).toBe(topicKey("Solution of Triangle: Sine, Cosine and Projection Rules"));
    expect(topicKey("Integrals of the Type (px+q) over a Quadratic")).toBe(topicKey("integrals of the type  px q over a quadratic"));
    expect(topicKey("Rolle's Theorem")).not.toBe(topicKey("Lagrange's Mean Value Theorem"));
  });
});
