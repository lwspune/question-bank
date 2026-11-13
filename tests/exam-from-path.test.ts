import { describe, expect, it } from "vitest";
import { examFromPath, guessExam } from "@/lib/exam/examFromPath";

describe("examFromPath: the exam a page address names", () => {
  it("reads the exam segment of the exam-scoped routes", () => {
    expect(examFromPath("/questions/mht-cet/physics/electrostatics")).toBe("mht-cet");
    expect(examFromPath("/board/mh-hsc-12/mathematics/matrices")).toBe("mh-hsc-12");
    expect(examFromPath("/question-papers/cbse-12/physics/2025")).toBe("cbse-12");
    expect(examFromPath("/exams/nda")).toBe("nda");
    expect(examFromPath("/formula/mht-cet/maths/complex-numbers")).toBe("mht-cet");
    expect(examFromPath("/mock/exam/jee-mains")).toBe("jee-mains");
    expect(examFromPath("/notes/cds")).toBe("cds");
  });

  it("reads a subject route or a paper slug that starts with the exam", () => {
    expect(examFromPath("/notes/mht-cet-maths/straight-line")).toBe("mht-cet");
    expect(examFromPath("/notes/afcat-maths")).toBe("afcat");
    expect(examFromPath("/guide/nda-physics/ncert-map")).toBe("nda");
    expect(examFromPath("/guide/jee-mains")).toBe("jee-mains");
    expect(examFromPath("/learn/mh-hsc-12-maths/matrices")).toBe("mh-hsc-12");
    expect(examFromPath("/mock/mht-cet-2025-apr-19-s2-maths")).toBe("mht-cet");
    expect(examFromPath("/mock/mht-cet-chapter-physics-18-optics-ray")).toBe("mht-cet");
    expect(examFromPath("/homework/mh-ssc-10-science-1")).toBe("mh-ssc-10");
  });

  it("reads an exam's own home page, where the first segment IS the exam", () => {
    expect(examFromPath("/nda")).toBe("nda");
    expect(examFromPath("/nda/anything")).toBe("nda");
    // Only an exact exam slug: a route that merely starts like one is not an exam home.
    expect(examFromPath("/nda-results")).toBeNull();
  });

  it("does not guess an exam from an MPSC paper slug: mpsc is a family, not one exam", () => {
    expect(examFromPath("/mock/mpsc-2025-c")).toBeNull();
    expect(examFromPath("/mock/exam/mpsc")).toBeNull();
  });

  it("picks the longest exam when one exam's slug starts another's", () => {
    expect(examFromPath("/mock/ssc-cgl-tier-2-2024-paper-1")).toBe("ssc-cgl-tier-2");
    expect(examFromPath("/mock/ssc-cgl-2024-tier-1-shift-1")).toBe("ssc-cgl");
    expect(examFromPath("/notes/ssc-cgl-maths")).toBe("ssc-cgl");
    expect(examFromPath("/questions/ssc-cgl-tier-2/maths/algebra")).toBe("ssc-cgl-tier-2");
  });

  it("needs a whole exam slug: a slug that merely starts with letters of one is not a match", () => {
    // "ndas" starts with "nda" but not "nda-".
    expect(examFromPath("/notes/ndas-maths")).toBeNull();
    expect(examFromPath("/mock/jee")).toBeNull();
  });

  it("ignores the query string and the fragment", () => {
    expect(examFromPath("/questions/neet/biology/genetics?page=2#q12")).toBe("neet");
    expect(examFromPath("/questions/neet?x=1")).toBe("neet");
  });

  it("is case-insensitive on the segment it reads", () => {
    expect(examFromPath("/questions/MHT-CET/physics")).toBe("mht-cet");
  });

  it("returns null for pages that name no exam", () => {
    expect(examFromPath("/")).toBeNull();
    expect(examFromPath("/browse")).toBeNull();
    expect(examFromPath("/browse?examId=1234")).toBeNull();
    expect(examFromPath("/mock")).toBeNull();
    expect(examFromPath("/mock/attempt/abc")).toBeNull();
    expect(examFromPath("/mock/attempts")).toBeNull();
    expect(examFromPath("/notes")).toBeNull();
    expect(examFromPath("/notes/print/x")).toBeNull();
    expect(examFromPath("/guide/reports")).toBeNull();
    expect(examFromPath("/learn/lesson/abc")).toBeNull();
    expect(examFromPath("/store/mht-cet-maths-formulas")).toBeNull();
    expect(examFromPath("/me")).toBeNull();
  });

  it("returns null for anything that is not a same-site path", () => {
    expect(examFromPath(null)).toBeNull();
    expect(examFromPath(undefined)).toBeNull();
    expect(examFromPath("")).toBeNull();
    expect(examFromPath("questions/nda")).toBeNull();
    expect(examFromPath("//evil.com/questions/nda")).toBeNull();
    expect(examFromPath("https://www.pyqvault.com/questions/nda")).toBeNull();
    expect(examFromPath("/questions/%E0%A4%A")).toBeNull();
  });
});

describe("guessExam: which signal names the exam to confirm", () => {
  it("prefers the exam the visitor tapped (the cookie) over any page", () => {
    expect(guessExam({ cookie: "nda", next: "/questions/cds/english", landing: "/notes/neet" })).toEqual({
      slug: "nda",
      from: "cookie",
    });
  });

  it("then the page they are going back to", () => {
    expect(guessExam({ cookie: null, next: "/questions/cds/english", landing: "/notes/nda-maths" })).toEqual({
      slug: "cds",
      from: "next",
    });
  });

  it("then the page they first landed on", () => {
    expect(guessExam({ cookie: undefined, next: "/browse", landing: "/notes/nda-maths/x" })).toEqual({
      slug: "nda",
      from: "landing",
    });
  });

  it("skips a cookie that is not an exam", () => {
    expect(guessExam({ cookie: "not-an-exam", next: "/exams/neet", landing: null })).toEqual({
      slug: "neet",
      from: "next",
    });
  });

  it("returns null when nothing names an exam", () => {
    expect(guessExam({ cookie: null, next: "/browse", landing: "/" })).toBeNull();
    expect(guessExam({ cookie: null, next: "/browse", landing: null })).toBeNull();
  });
});
