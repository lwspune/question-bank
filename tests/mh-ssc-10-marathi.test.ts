import { describe, it, expect } from "vitest";
import {
  marathiLabel,
  devanagariShare,
  numberTokens,
  checkMarathiPaper,
  mergeSolutions,
  planTranslations,
  type MarathiQuestion,
} from "../scripts/mh-ssc-10/marathi";
import type { PaperQuestion } from "../scripts/mh-ssc-10/lib";
import { getExamBySlug } from "@/lib/exam/examContext";

const en = (over: Partial<PaperQuestion> = {}): PaperQuestion => ({
  ref: "Q1(A)(i)",
  format: "mcq",
  chapter: "Quadratic Equations",
  subtopic: "Roots",
  difficulty: "EASY",
  stem: "Sum of first five multiples of 3 is ____.",
  options: [
    { label: "A", text: "45" },
    { label: "B", text: "55" },
    { label: "C", text: "15" },
    { label: "D", text: "75" },
  ],
  answer: "A",
  solution: "\\(3 + 6 + 9 + 12 + 15 = 45\\). Correct option: A.",
  ...over,
});

const mr = (over: Partial<MarathiQuestion> = {}): MarathiQuestion => ({
  ref: "Q1(A)(i)",
  stem: "3 च्या पहिल्या पाच पटींची बेरीज ____ आहे.",
  options: [
    { label: "A", text: "45" },
    { label: "B", text: "55" },
    { label: "C", text: "15" },
    { label: "D", text: "75" },
  ],
  solution: "\\(3 + 6 + 9 + 12 + 15 = 45\\). योग्य पर्याय: A.",
  ...over,
});

const errors = (f: ReturnType<typeof checkMarathiPaper>) => f.filter((x) => x.level === "error");
const warns = (f: ReturnType<typeof checkMarathiPaper>) => f.filter((x) => x.level === "warn");

describe("registry", () => {
  it("marks MH SSC 10 bilingual, so its mocks and downloads offer the language choice", () => {
    expect(getExamBySlug("mh-ssc-10")?.bilingual).toBe(true);
  });
});

describe("marathiLabel", () => {
  it("maps the printed Marathi option letters onto the bank's A-D", () => {
    expect(["अ", "ब", "क", "ड"].map(marathiLabel)).toEqual(["A", "B", "C", "D"]);
    expect(marathiLabel("(क)")).toBe("C");
    expect(marathiLabel(" b ")).toBe("B");
    expect(marathiLabel("D")).toBe("D");
  });
  it("throws on anything that is not one of the four", () => {
    expect(() => marathiLabel("E")).toThrow();
    expect(() => marathiLabel("इ")).toThrow();
  });
});

describe("devanagariShare", () => {
  it("counts letters outside math zones only", () => {
    expect(devanagariShare("पुढील समीकरण सोडवा: \\(x^2 + bx + c = 0\\)")).toBe(1);
    expect(devanagariShare("Solve the equation")).toBe(0);
  });
  it("is null when there are too few letters outside math to judge", () => {
    expect(devanagariShare("\\(x + y = 3\\)")).toBeNull();
  });
});

describe("numberTokens", () => {
  it("reads Devanagari digits as the same numbers", () => {
    expect(numberTokens("४५ आणि 3.5")).toEqual(["3.5", "45"]);
  });
});

describe("checkMarathiPaper", () => {
  it("passes a faithful Marathi print of the same paper", () => {
    expect(checkMarathiPaper([en()], [mr()], { requireSolution: true })).toEqual([]);
  });

  it("refuses a missing, extra or reordered question", () => {
    const two = [en(), en({ ref: "Q1(A)(ii)" })];
    expect(errors(checkMarathiPaper(two, [mr()], { requireSolution: false })).map((f) => f.reason).join()).toMatch(/missing/);
    expect(errors(checkMarathiPaper([en()], [mr(), mr({ ref: "Q9" })], { requireSolution: false })).map((f) => f.reason).join()).toMatch(/not in the English/);
    const swapped = [mr({ ref: "Q1(A)(ii)" }), mr()];
    expect(errors(checkMarathiPaper(two, swapped, { requireSolution: false })).map((f) => f.reason).join()).toMatch(/order/);
  });

  it("refuses an MCQ without exactly four options and a written question with options", () => {
    const three = mr({ options: mr().options!.slice(0, 3) });
    expect(errors(checkMarathiPaper([en()], [three], { requireSolution: false }))).toHaveLength(1);
    const subj = en({ format: "subjective", options: undefined, answer: undefined });
    expect(errors(checkMarathiPaper([subj], [mr()], { requireSolution: false }))).toHaveLength(1);
  });

  it("accepts the Science papers' (अ)(ब)(क)(ड) labels", () => {
    const deva = mr({ options: ["अ", "ब", "क", "ड"].map((l, i) => ({ label: `(${l})`, text: ["45", "55", "15", "75"][i] })) });
    expect(checkMarathiPaper([en()], [deva], { requireSolution: true })).toEqual([]);
  });

  it("refuses a question written in English instead of read from the Marathi print", () => {
    const english = mr({ stem: "Sum of first five multiples of 3 is ____." });
    expect(errors(checkMarathiPaper([en()], [english], { requireSolution: false })).map((f) => f.reason).join()).toMatch(/Devanagari/);
  });

  it("refuses a shared passage that the English row has and the Marathi lacks, or the reverse", () => {
    const withCtx = en({ context: "Read the passage and answer." , setLabel: "S1" });
    expect(errors(checkMarathiPaper([withCtx], [mr()], { requireSolution: false }))).toHaveLength(1);
    expect(errors(checkMarathiPaper([en()], [mr({ context: "उतारा वाचा." })], { requireSolution: false }))).toHaveLength(1);
  });

  it("refuses set siblings whose Marathi passages differ", () => {
    const a = en({ ref: "Q4(B)(i)", format: "subjective", options: undefined, answer: undefined, context: "Observe the map.", setLabel: "S4B" });
    const b = { ...a, ref: "Q4(B)(ii)" };
    const ma = mr({ ref: "Q4(B)(i)", options: undefined, context: "नकाशाचे निरीक्षण करा.", solution: undefined });
    const mb = { ...ma, ref: "Q4(B)(ii)", context: "नकाशाचे निरिक्षण करा." };
    expect(errors(checkMarathiPaper([a, b], [ma, mb], { requireSolution: false })).map((f) => f.reason).join()).toMatch(/passage/);
  });

  it("lets set siblings differ where their ENGLISH passages differ too", () => {
    // Geography Q6(A): the graph-drawing row's context is the heading alone,
    // its sub-questions' context carries the data.
    const draw = en({ ref: "Q6(A)", format: "subjective", options: undefined, answer: undefined, context: "Prepare a bar graph.", setLabel: "G" });
    const sub = { ...draw, ref: "Q6(A)(1)", context: "Prepare a bar graph. 1981: 40.8" };
    const md = mr({ ref: "Q6(A)", options: undefined, context: "स्तंभालेख काढा.", solution: undefined });
    const ms = { ...md, ref: "Q6(A)(1)", context: "स्तंभालेख काढा. 1981: 40.8" };
    expect(errors(checkMarathiPaper([draw, sub], [md, ms], { requireSolution: false }))).toEqual([]);
  });

  it("refuses unbalanced math delimiters and literal \\n", () => {
    expect(errors(checkMarathiPaper([en()], [mr({ stem: "बेरीज \\(3 + 6 आहे." })], { requireSolution: false }))).toHaveLength(1);
    expect(errors(checkMarathiPaper([en()], [mr({ stem: "बेरीज\\nआहे ____." })], { requireSolution: false }))).toHaveLength(1);
  });

  it("refuses a maths zone KaTeX cannot render", () => {
    const f = checkMarathiPaper([en()], [mr({ stem: "बेरीज \\(x^{2\\) ____ आहे आणि पाच पटींची." })], { requireSolution: false });
    expect(errors(f).map((x) => x.reason).join()).toMatch(/KaTeX/);
  });

  it("refuses a control character: a lost backslash turns \\theta into TAB + heta", () => {
    const f = checkMarathiPaper([en()], [mr({ stem: "बेरीज \\(\theta\\) ____ आहे आणि पाच पटींची." })], { requireSolution: false });
    expect(errors(f).map((x) => x.reason).join()).toMatch(/control character/);
  });

  it("warns, not refuses, when the numbers differ from the English print", () => {
    const f = checkMarathiPaper([en()], [mr({ stem: "4 च्या पहिल्या पाच पटींची बेरीज ____ आहे." })], { requireSolution: false });
    expect(errors(f)).toEqual([]);
    expect(warns(f).map((x) => x.reason).join()).toMatch(/numbers/);
  });

  it("requires a Marathi solution when asked, ending on the ENGLISH key's letter", () => {
    expect(errors(checkMarathiPaper([en()], [mr({ solution: undefined })], { requireSolution: true }))).toHaveLength(1);
    const wrongKey = mr({ solution: "\\(3 + 6 + 9 + 12 + 15 = 45\\). योग्य पर्याय: B." });
    expect(errors(checkMarathiPaper([en()], [wrongKey], { requireSolution: true })).map((f) => f.reason).join()).toMatch(/key/);
    const englishSol = mr({ solution: "Add the five multiples to get 45. Correct option: A." });
    expect(errors(checkMarathiPaper([en()], [englishSol], { requireSolution: true })).length).toBeGreaterThan(0);
  });

  it("warns when the Marathi solution's numbers differ from the English solution's", () => {
    const changed = mr({ solution: "\\(3 + 6 + 9 + 12 + 18 = 48\\). योग्य पर्याय: A." });
    const f = checkMarathiPaper([en()], [changed], { requireSolution: true });
    expect(errors(f)).toEqual([]);
    expect(warns(f).map((x) => x.reason).join()).toMatch(/solution numbers/);
  });

  it("does not demand a solution in the transcription lane", () => {
    expect(checkMarathiPaper([en()], [mr({ solution: undefined })], { requireSolution: false })).toEqual([]);
  });
});

describe("mergeSolutions", () => {
  it("attaches each solution to its question by ref", () => {
    const out = mergeSolutions([mr({ solution: undefined })], [{ ref: "Q1(A)(i)", solution: "उत्तर. योग्य पर्याय: A." }]);
    expect(out[0].solution).toBe("उत्तर. योग्य पर्याय: A.");
  });
  it("throws on a solution for an unknown ref or a ref given twice", () => {
    expect(() => mergeSolutions([mr()], [{ ref: "Q9", solution: "x" }])).toThrow(/Q9/);
    expect(() =>
      mergeSolutions([mr()], [
        { ref: "Q1(A)(i)", solution: "a" },
        { ref: "Q1(A)(i)", solution: "b" },
      ]),
    ).toThrow(/twice/);
  });
});

describe("planTranslations", () => {
  const entry = (paperId: string, m: MarathiQuestion, questionId = "q1") => ({ paperId, questionId, question: m });

  it("writes a question repeated across two sittings once", () => {
    const { writes, conflicts } = planTranslations([entry("alg-2024", mr()), entry("alg-2025", mr())]);
    expect(writes).toHaveLength(1);
    expect(writes[0].paperId).toBe("alg-2024");
    expect(conflicts).toEqual([]);
  });

  it("reports a repeat whose two prints read differently, keeping the first", () => {
    const { writes, conflicts } = planTranslations([
      entry("alg-2024", mr()),
      entry("alg-2025", mr({ stem: "3 च्या पहिल्या पाच पटींची बेरीज किती ____ आहे." })),
    ]);
    expect(writes).toHaveLength(1);
    expect(conflicts).toHaveLength(1);
    expect(conflicts[0]).toMatchObject({ questionId: "q1", kept: "alg-2024", other: "alg-2025" });
  });

  it("puts options in A-D order whatever the printed labels", () => {
    const deva = mr({ options: ["ड", "क", "ब", "अ"].map((l, i) => ({ label: l, text: ["75", "15", "55", "45"][i] })) });
    const { writes } = planTranslations([entry("sci1-2024", deva)]);
    expect(writes[0].options).toEqual([
      { label: "A", text: "45" },
      { label: "B", text: "55" },
      { label: "C", text: "15" },
      { label: "D", text: "75" },
    ]);
  });
});
