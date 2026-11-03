import { describe, expect, it } from "vitest";
import { suggestTargetExam } from "@/lib/profile/suggestExam";

describe("suggestTargetExam (for a student who never chose one)", () => {
  const noRoute = () => null;

  it("names the exam they practised most, when it is clearly one", () => {
    expect(suggestTargetExam({ practice: { "mht-cet": 9, nda: 1 }, landing: null }, noRoute)).toBe("mht-cet");
  });

  it("does not guess from too little or a mixed record", () => {
    expect(suggestTargetExam({ practice: { "mht-cet": 2 }, landing: null }, noRoute)).toBeNull();
    expect(suggestTargetExam({ practice: { "mht-cet": 5, "jee-mains": 5 }, landing: null }, noRoute)).toBeNull();
  });

  it("falls back to the exam named by the page they first landed on", () => {
    const s = (landing: string) => suggestTargetExam({ practice: {}, landing }, noRoute);
    expect(s("/questions/jee-mains/physics/optics")).toBe("jee-mains");
    expect(s("/exams/neet")).toBe("neet");
    expect(s("/mock/exam/cds")).toBe("cds");
    expect(s("/board/mh-hsc-12/maths/matrices")).toBe("mh-hsc-12");
    expect(s("/notes/nda")).toBe("nda");
    expect(s("/")).toBeNull();
    expect(s("/questions/not-an-exam/x")).toBeNull();
  });

  it("maps a notes subject route to its exam", () => {
    const route = (r: string) => (r === "mht-cet-maths" ? "mht-cet" : null);
    expect(suggestTargetExam({ practice: {}, landing: "/notes/mht-cet-maths/differentiation" }, route)).toBe("mht-cet");
  });

  it("never suggests an exam from the international site", () => {
    expect(suggestTargetExam({ practice: { imat: 9 }, landing: "/exams/imat" }, noRoute)).toBeNull();
  });
});
