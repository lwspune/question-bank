import { describe, expect, it } from "vitest";
import { GATE_CS_SUBJECTS, gateQuestionMarks } from "../src/lib/mocks/blueprints";
import { CATALOG } from "../scripts/gate/config";
import { gateSitting, parseKeyRows, planGatePaper } from "../scripts/gate/lib";
import type { UceedQuestion } from "../scripts/uceed/lib";

/** Rows as keyrows.py reads them from the organising IIT's key, word by word. */
const R = {
  mcq: ["12", "4", "MCQ", "CS-2", "A", "1"],
  msq: ["26", "4", "MSQ", "CS-2", "A;B;C", "1"],
  natExact: ["30", "4", "NAT", "CS-2", "3", "to", "3", "1"],
  natRange: ["58", "3", "NAT", "CS-1", "4.24", "to", "4.26", "2"],
  natNegative: ["59", "3", "NAT", "CS-1", "-0.50", "to", "-0.40", "2"],
  ga: ["7", "4", "MCQ", "GA", "C", "2"],
};

/** A whole paper's rows: GA 1-10 MCQ "A", CS 11-65 MCQ "B", each with its printed marks. */
function fullKey(): string[][] {
  return Array.from({ length: 65 }, (_, i) => {
    const n = i + 1;
    return [String(n), "3", "MCQ", n <= 10 ? "GA" : "CS-1", n <= 10 ? "A" : "B", String(gateQuestionMarks(n))];
  });
}

describe("gateQuestionMarks: the printed GATE layout", () => {
  it("gives GA Q1-5 one mark, GA Q6-10 two, CS Q11-35 one, CS Q36-65 two", () => {
    expect([1, 5, 6, 10, 11, 35, 36, 65].map(gateQuestionMarks)).toEqual([1, 1, 2, 2, 1, 1, 2, 2]);
  });
  it("refuses a number outside 1-65", () => {
    expect(() => gateQuestionMarks(0)).toThrow();
    expect(() => gateQuestionMarks(66)).toThrow();
  });
});

describe("parseKeyRows", () => {
  const one = (row: string[]) => parseKeyRows(2026, [row], { complete: false });

  it("reads an MCQ, an MSQ set, and NAT exact, range and negative answers", () => {
    expect(one(R.mcq).key.answers).toEqual([{ n: 12, type: "MCQ", value: "A" }]);
    expect(one(R.msq).key.answers).toEqual([{ n: 26, type: "MSQ", sets: [["A", "B", "C"]] }]);
    expect(one(R.natExact).key.answers).toEqual([{ n: 30, type: "NAT", value: 3 }]);
    expect(one(R.natRange).key.answers).toEqual([{ n: 58, type: "NAT", range: [4.24, 4.26] }]);
    expect(one(R.natNegative).key.answers).toEqual([{ n: 59, type: "NAT", range: [-0.5, -0.4] }]);
    expect(one(R.ga).issues).toEqual([]);
  });

  it("flags marks that disagree with the printed layout", () => {
    expect(one(["12", "4", "MCQ", "CS-2", "A", "2"]).issues).toEqual(["Q12: key prints 2 mark(s), the paper's layout gives 1"]);
  });

  it("flags a GA number keyed in a CS section and the other way round", () => {
    expect(one(["7", "4", "MCQ", "CS-2", "C", "2"]).issues).toEqual(["Q7: section CS-2, expected GA"]);
    expect(one(["12", "4", "MCQ", "GA", "A", "1"]).issues).toEqual(["Q12: section GA, expected CS"]);
  });

  it("flags a key cell it cannot read, and keeps the row out of the key", () => {
    const r = one(["12", "4", "MCQ", "CS-2", "E", "1"]);
    expect(r.issues).toEqual(['Q12: MCQ key "E" is not one of A-D']);
    expect(r.key.answers).toEqual([]);
    expect(one(["26", "4", "MSQ", "CS-2", "A;E", "1"]).issues).toEqual(['Q26: MSQ key "A;E" must list A-D separated by ";"']);
    expect(one(["30", "4", "NAT", "CS-2", "3", "1"]).issues).toEqual(['Q30: NAT key "3" is not "<low> to <high>"']);
    expect(one(["30", "4", "NAT", "CS-2", "5", "to", "3", "1"]).issues).toEqual(['Q30: NAT range "5 to 3" runs the wrong way']);
    expect(one(["30", "4", "XYZ", "CS-2", "3", "1"]).issues).toEqual(["Q30: no question type (MCQ, MSQ or NAT) in the row"]);
  });

  it("a complete key must hold Q1-65 once each", () => {
    expect(parseKeyRows(2026, fullKey()).issues).toEqual([]);
    const short = fullKey().slice(0, 64);
    expect(parseKeyRows(2026, short).issues).toEqual(["Q65: not in the key"]);
    const dup = [...fullKey(), fullKey()[11]];
    expect(parseKeyRows(2026, dup).issues).toEqual(["Q12: appears twice in the key"]);
  });
});

describe("gateSitting", () => {
  it("names each Wave 1 paper's year, set and organising institute", () => {
    expect(gateSitting("2026-cs2")).toEqual({
      paper: "2026-cs2",
      year: 2026,
      set: 2,
      organiser: "IIT Guwahati",
      pyqNote: "Set 2 · IIT Guwahati",
      sourceFile: "GATE CS 2026 Set 2 (IIT Guwahati)",
      mockCode: "cs2",
    });
    expect(gateSitting("2024-cs1").organiser).toBe("IISc Bengaluru");
    expect(gateSitting("2025-cs1").organiser).toBe("IIT Roorkee");
  });
  it("keeps the credit line short enough to publish (publicPyqNote, 48 chars)", () => {
    for (const p of ["2024-cs1", "2025-cs2", "2026-cs1"]) expect(gateSitting(p).pyqNote.length).toBeLessThan(48);
  });
  it("refuses a paper it does not know", () => {
    expect(() => gateSitting("2023-cs1")).toThrow();
    expect(() => gateSitting("2026-cs3")).toThrow();
  });
});

describe("CATALOG", () => {
  it("covers every GATE CS subject the mock blueprint names, and nothing else", () => {
    expect(Object.keys(CATALOG).sort()).toEqual([...GATE_CS_SUBJECTS].sort());
  });
  it("gives every subject chapters, with no chapter name used twice", () => {
    const all = Object.values(CATALOG).flat();
    expect(Object.values(CATALOG).every((c) => c.length > 0)).toBe(true);
    expect(new Set(all).size).toBe(all.length);
  });
});

describe("planGatePaper", () => {
  const solution = "Each step follows from the definition, so the answer is B.";
  const q = (n: number, over: Partial<UceedQuestion> = {}): UceedQuestion => ({
    n,
    type: "MCQ",
    text: `Question ${n}`,
    options: ["A", "B", "C", "D"].map((label) => ({ label, text: `opt ${label}` })),
    figure: false,
    subject: n <= 10 ? "General Aptitude" : "Algorithms",
    chapter: n <= 10 ? "Quantitative Aptitude" : "Asymptotic Complexity",
    subtopic: "Counting",
    difficulty: "Moderate",
    solution,
    ...over,
  });
  const paper = (qs: UceedQuestion[]) => ({ year: 2026, questions: qs });
  const key = parseKeyRows(2026, fullKey()).key;
  const all = () => Array.from({ length: 65 }, (_, i) => q(i + 1));

  it("plans a whole, consistent paper with no issue", () => {
    const plan = planGatePaper("2026-cs1", paper(all()), key);
    expect(plan.issues).toEqual([]);
    expect(plan.rows).toHaveLength(65);
  });

  it("refuses a paper that is not all 65 questions", () => {
    const plan = planGatePaper("2026-cs1", paper(all().slice(0, 64)), key);
    expect(plan.issues).toContain("Q65: in the key but not transcribed");
  });

  it("refuses a chapter outside the syllabus catalog, or under the wrong subject", () => {
    const qs = all();
    qs[20] = q(21, { chapter: "Quantum Computing" });
    qs[21] = q(22, { subject: "Databases", chapter: "Asymptotic Complexity" });
    const plan = planGatePaper("2026-cs1", paper(qs), key);
    expect(plan.issues).toContain('Q21: chapter "Quantum Computing" is not in Algorithms');
    expect(plan.issues).toContain('Q22: chapter "Asymptotic Complexity" is not in Databases');
  });

  it("keeps General Aptitude to Q1-10 and the CS syllabus to Q11-65", () => {
    const qs = all();
    qs[2] = q(3, { subject: "Algorithms", chapter: "Asymptotic Complexity" });
    qs[30] = q(31, { subject: "General Aptitude", chapter: "Verbal Aptitude" });
    const plan = planGatePaper("2026-cs1", paper(qs), key);
    expect(plan.issues).toContain("Q3: Q1-10 are General Aptitude, not Algorithms");
    expect(plan.issues).toContain("Q31: General Aptitude is Q1-10 only");
  });

  it("refuses a code fence inside an option: options render inline, so code options are plain lines", () => {
    const qs = all();
    qs[14] = q(15, { options: ["A", "B", "C", "D"].map((label) => ({ label, text: "```text\nADD Z, X, Y\n```" })) });
    const plan = planGatePaper("2026-cs1", paper(qs), key);
    expect(plan.issues).toContain("Q15: option A holds a code fence; write its lines as plain text");
  });

  it("refuses a shared context, which this commit path cannot store", () => {
    const qs = all();
    qs[19] = { ...q(20), context: "A relation R(A, B, C)..." } as UceedQuestion;
    const plan = planGatePaper("2026-cs1", paper(qs), key);
    expect(plan.issues).toContain("Q20: has a context; put the shared data in the stem");
  });

  it("names the organising institute in an accepted-answers notice", () => {
    const k = { ...key, answers: key.answers.map((a) => (a.n === 12 && a.type === "MCQ" && "value" in a ? { ...a, also: ["C"] } : a)) };
    const plan = planGatePaper("2026-cs1", paper(all()), k);
    expect(plan.rows.find((r) => r.n === 12)?.notice).toContain("IIT Guwahati's final key accepts both B and C");
  });
});
