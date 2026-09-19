import { describe, it, expect } from "vitest";
import { parseKeyLines, reconcileKeys } from "../scripts/mh-hsc-12-pyq/paper/keys";

const PASS_A = `
Some prose the pass wrote before its table.

    Q. 1. (i) | C | high | contrapositive then converse
    Q. 1. (ii) | D | high | adj swaps the diagonal
    Q. 1. (iii) | B | medium | 6x^2+5x-1=0
`;

describe("parseKeyLines", () => {
  it("pulls the pipe rows out of surrounding prose", () => {
    expect(parseKeyLines(PASS_A)).toEqual([
      { ref: "Q. 1. (i)", answer: "C", confidence: "high", note: "contrapositive then converse" },
      { ref: "Q. 1. (ii)", answer: "D", confidence: "high", note: "adj swaps the diagonal" },
      { ref: "Q. 1. (iii)", answer: "B", confidence: "medium", note: "6x^2+5x-1=0" },
    ]);
  });

  it("canonicalises the ref spelling, so two passes can differ in formatting", () => {
    const rows = parseKeyLines("Q.1.iii | B | high | x");
    expect(rows[0].ref).toBe("Q. 1. (iii)");
  });

  it("accepts NONE as an answer — a no-correct-option MCQ is an expected outcome", () => {
    expect(parseKeyLines("Q. 1. (i) | NONE | high | derived 5/7, no option matches")[0].answer).toBe("NONE");
  });

  it("uppercases a lowercase answer letter but does not invent one", () => {
    expect(parseKeyLines("Q. 1. (i) | c | high | x")[0].answer).toBe("C");
  });

  it("ignores a row whose ref is not on this paper rather than guessing", () => {
    expect(parseKeyLines("Q. 99 | A | high | x")).toEqual([]);
  });

  it("ignores a markdown table separator and a fenced-code fence", () => {
    expect(parseKeyLines("|---|---|\n```\nQ. 1. (i) | A | high | x\n```")).toHaveLength(1);
  });

  it("rejects an answer that is not A-D or NONE", () => {
    expect(() => parseKeyLines("Q. 1. (i) | E | high | x")).toThrow(/E/);
  });
});

describe("reconcileKeys — two independent derivations", () => {
  const a = parseKeyLines(`
    Q. 1. (i) | C | high | x
    Q. 1. (ii) | D | high | x
    Q. 1. (iii) | B | high | x
  `);

  it("reports full agreement", () => {
    const out = reconcileKeys(a, a);
    expect(out.agree.map((r) => r.ref)).toEqual(["Q. 1. (i)", "Q. 1. (ii)", "Q. 1. (iii)"]);
    expect(out.disagree).toEqual([]);
    expect(out.onlyA).toEqual([]);
    expect(out.onlyB).toEqual([]);
  });

  it("names a disagreement with BOTH answers, never picking one", () => {
    const b = parseKeyLines(`
      Q. 1. (i) | C | high | x
      Q. 1. (ii) | A | low | x
      Q. 1. (iii) | B | high | x
    `);
    const out = reconcileKeys(a, b);
    expect(out.disagree).toEqual([{ ref: "Q. 1. (ii)", a: "D", b: "A", aNote: "x", bNote: "x" }]);
    expect(out.agree).toHaveLength(2);
  });

  it("treats a NONE-vs-letter as a disagreement, not as a missing answer", () => {
    const b = parseKeyLines(`
      Q. 1. (i) | NONE | high | no option matches
      Q. 1. (ii) | D | high | x
      Q. 1. (iii) | B | high | x
    `);
    expect(reconcileKeys(a, b).disagree.map((d) => [d.a, d.b])).toEqual([["C", "NONE"]]);
  });

  it("reports what each pass alone covered, both directions", () => {
    const b = parseKeyLines(`
      Q. 1. (i) | C | high | x
      Q. 1. (iv) | A | high | x
    `);
    const out = reconcileKeys(a, b);
    expect(out.onlyA).toEqual(["Q. 1. (ii)", "Q. 1. (iii)"]);
    expect(out.onlyB).toEqual(["Q. 1. (iv)"]);
  });

  it("surfaces a LOW-confidence agreement — two passes agreeing while unsure is not evidence", () => {
    const shaky = parseKeyLines("Q. 1. (i) | C | low | guessed");
    const out = reconcileKeys(shaky, shaky);
    expect(out.agree).toHaveLength(1);
    expect(out.lowConfidenceAgreements).toEqual(["Q. 1. (i)"]);
  });
});
