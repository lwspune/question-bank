import { describe, it, expect } from "vitest";
import { validatePass1 } from "../scripts/afcat/lib";

const SUBTOPICS = ["Combined Work", "Pipes and Cisterns"];
const good = (over: Record<string, unknown> = {}) => ({
  id: "01-1",
  derived: "A",
  value: "120/7 days",
  confidence: "high",
  note: "",
  subtopic: "Combined Work",
  difficulty: "EASY",
  solution: "Together they do \\(\\frac{1}{30} + \\frac{1}{40} = \\frac{7}{120}\\) of the work a day, so they need \\(\\frac{120}{7} \\approx 17.14\\) days.",
  ...over,
});

describe("validatePass1", () => {
  it("accepts a clean verdict set", () => {
    expect(validatePass1([good()], ["01-1"], SUBTOPICS)).toEqual([]);
  });

  it("names every packet id the agent dropped, and every id it invented or repeated", () => {
    const out = validatePass1([good(), good({ id: "01-9" }), good({ id: "01-9" })], ["01-1", "01-2"], SUBTOPICS);
    expect(out).toContain("01-2: missing from the agent output");
    expect(out).toContain("01-9: not in the packet");
    expect(out).toContain("01-9: appears more than once");
  });

  it("rejects a subtopic outside the chapter list, a bad difficulty and a bad letter", () => {
    const out = validatePass1([good({ subtopic: "Work Basics", difficulty: "Medium", derived: "E" })], ["01-1"], SUBTOPICS);
    expect(out).toEqual([
      '01-1: derived "E" is not A-D or X',
      '01-1: subtopic "Work Basics" is not in the chapter list',
      '01-1: difficulty "Medium" is not EASY/MODERATE/HARD',
    ]);
  });

  it("rejects a published solution that names an option letter, has an em dash, or is empty", () => {
    expect(validatePass1([good({ solution: "So the answer is option C." })], ["01-1"], SUBTOPICS)).toEqual([
      "01-1: solution names an option letter",
    ]);
    expect(validatePass1([good({ solution: "Hence (b) holds." })], ["01-1"], SUBTOPICS)).toEqual([
      "01-1: solution names an option letter",
    ]);
    expect(validatePass1([good({ solution: "They need 17 days \u2014 roughly." })], ["01-1"], SUBTOPICS)).toEqual([
      "01-1: solution contains an em dash",
    ]);
    expect(validatePass1([good({ solution: "  " })], ["01-1"], SUBTOPICS)).toEqual(["01-1: solution is empty"]);
  });

  it("does not mistake ordinary words or algebra for a letter reference", () => {
    const sol = "A and B together do a job; let a be A's rate. The answer: 12 days. (a + b) = 1/12.";
    expect(validatePass1([good({ solution: sol })], ["01-1"], SUBTOPICS)).toEqual([]);
  });

  it("rejects a control character, the trace of a shell eating a LaTeX backslash", () => {
    expect(validatePass1([good({ solution: "\\(\theta\\)" })], ["01-1"], SUBTOPICS)).toEqual([
      "01-1: solution contains a control character (a LaTeX backslash was eaten)",
    ]);
  });

  it("requires a note giving the computed value when the agent returns X", () => {
    expect(validatePass1([good({ derived: "X", note: "" })], ["01-1"], SUBTOPICS)).toEqual([
      "01-1: X needs a note saying what was computed or why the stem fails",
    ]);
  });
});
