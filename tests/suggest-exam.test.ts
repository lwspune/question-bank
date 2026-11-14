import { describe, expect, it } from "vitest";
import { inferStudentExam } from "@/lib/profile/suggestExam";

describe("inferStudentExam (for a student who never chose one)", () => {
  it("names the exam they practised most, when it is clearly one", () => {
    expect(inferStudentExam({ practice: { "mht-cet": 9, nda: 1 }, landing: null })).toEqual({
      slug: "mht-cet",
      source: "practice",
    });
  });

  it("does not guess from too little or a mixed record", () => {
    expect(inferStudentExam({ practice: { "mht-cet": 2 }, landing: null })).toBeNull();
    expect(inferStudentExam({ practice: { "mht-cet": 5, "jee-mains": 5 }, landing: null })).toBeNull();
  });

  it("practice wins over the landing page when they disagree", () => {
    expect(inferStudentExam({ practice: { "cbse-12": 10 }, landing: "/questions/nda/maths/matrices" })).toEqual({
      slug: "cbse-12",
      source: "practice",
    });
  });

  it("falls back to the exam named by the page they first landed on", () => {
    const s = (landing: string) => inferStudentExam({ practice: {}, landing })?.slug ?? null;
    expect(s("/questions/jee-mains/physics/optics")).toBe("jee-mains");
    expect(s("/exams/neet")).toBe("neet");
    expect(s("/mock/exam/cds")).toBe("cds");
    expect(s("/board/mh-hsc-12/maths/matrices")).toBe("mh-hsc-12");
    expect(s("/notes/nda")).toBe("nda");
    expect(s("/")).toBeNull();
    expect(s("/questions/not-an-exam/x")).toBeNull();
    expect(inferStudentExam({ practice: {}, landing: "/exams/neet" })?.source).toBe("landing");
  });

  it("reads the landing page with the same rule as the welcome screen (examFromPath)", () => {
    const s = (landing: string) => inferStudentExam({ practice: {}, landing })?.slug ?? null;
    // A notes subject route, a mock paper slug, a formula sheet, an exam home.
    expect(s("/notes/mht-cet-maths/differentiation")).toBe("mht-cet");
    expect(s("/mock/mht-cet-2025-apr-19-s2-maths")).toBe("mht-cet");
    expect(s("/formula/jee-mains-physics/optics")).toBe("jee-mains");
    expect(s("/nda")).toBe("nda");
    expect(s("/guide/ssc-cgl-tier-2-maths")).toBe("ssc-cgl-tier-2");
  });

  it("never suggests an exam from the international site", () => {
    expect(inferStudentExam({ practice: { imat: 9 }, landing: "/exams/imat" })).toBeNull();
  });
});
