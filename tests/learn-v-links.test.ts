import { describe, expect, it } from "vitest";
import { LEARN_CHAPTER_LINKS, LEARN_LESSON_TOPICS, learnChapterFor, lessonTopics } from "@/lib/learn/vLinks";

describe("learnChapterFor: which Learn chapter teaches a bank chapter (exam, subject, chapter as the database names them)", () => {
  it("a board chapter maps to its own course", () => {
    expect(learnChapterFor("CBSE Class 12", "Mathematics", "Matrices")).toEqual({ course: "cbse-12-maths", chapter: "matrices" });
    expect(learnChapterFor("Maharashtra HSC Class 12", "Mathematics", "Line and Planes")).toEqual({ course: "mh-hsc-12-maths", chapter: "line-and-plane" });
  });

  it("MHT-CET and JEE use their own courses (2026-11-27; they borrowed the HSC and CBSE courses before)", () => {
    expect(learnChapterFor("MHT-CET", "Maths", "Determinants and Matrices")).toEqual({ course: "mht-cet-maths", chapter: "determinants-and-matrices" });
    expect(learnChapterFor("JEE Mains", "Maths", "Vector Algebra")).toEqual({ course: "jee-mains-maths", chapter: "vector-algebra" });
    expect(learnChapterFor("JEE Mains", "Maths", "Indefinite Integration")).toEqual({ course: "jee-mains-maths", chapter: "indefinite-integration" });
    expect(learnChapterFor("JEE Mains", "Maths", "Conic Sections")).toEqual({ course: "jee-mains-maths", chapter: "conic-sections" });
  });

  it("keeps a borrowed course where the exam's own has no such chapter (JEE dropped Mathematical Reasoning in 2024)", () => {
    expect(learnChapterFor("JEE Mains", "Maths", "Mathematical Reasoning")).toEqual({ course: "mh-hsc-12-maths", chapter: "mathematical-logic" });
  });

  it("every subject Learn teaches links, and a chapter two subjects share a name tells them apart", () => {
    expect(learnChapterFor("JEE Mains", "Physics", "Atoms")).toEqual({ course: "jee-mains-physics", chapter: "atoms" });
    expect(learnChapterFor("CBSE Class 11", "Physics", "Thermodynamics")).toEqual({ course: "cbse-11-physics", chapter: "thermodynamics" });
    expect(learnChapterFor("CBSE Class 11", "Chemistry", "Thermodynamics")).toEqual({ course: "cbse-11-chemistry", chapter: "chemical-thermodynamics" });
    expect(learnChapterFor("NEET", "Chemistry", "Thermodynamics")).toEqual({ course: "neet-chemistry", chapter: "chemical-thermodynamics" });
  });

  it("NDA maps every Maths chapter to its own course, by the bank's name", () => {
    expect(learnChapterFor("NDA", "Mathematics", "Matrices & Determinants")).toEqual({ course: "nda-maths", chapter: "determinants-and-matrices" });
    expect(learnChapterFor("NDA", "Mathematics", "3D Geometry")).toEqual({ course: "nda-maths", chapter: "line-and-plane" });
    expect(learnChapterFor("NDA", "Mathematics", "Applications of Integration")).toEqual({ course: "nda-maths", chapter: "application-of-definite-integration" });
    const nda = Object.entries(LEARN_CHAPTER_LINKS).filter(([k]) => k.startsWith("NDA|Mathematics|"));
    expect(nda).toHaveLength(31);
    expect(new Set(nda.map(([, l]) => l.chapter)).size).toBe(31);
    for (const [, l] of nda) expect(l.course).toBe("nda-maths");
  });

  it("a chapter Learn does not teach, or another subject or exam, has none", () => {
    expect(learnChapterFor("CDS", "Mathematics", "Matrices & Determinants")).toBeNull();
    expect(learnChapterFor("NDA", "Mathematics", "Matrices")).toBeNull();
    expect(learnChapterFor("CBSE Class 12", "Physics", "Matrices")).toBeNull();
    expect(learnChapterFor("CBSE Class 12", "Biology", "Reproduction in Organisms")).toBeNull();
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
      expect(key.split("|")).toHaveLength(3);
      expect(key.split("|").every((p) => p.length > 0), key).toBe(true);
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
