import { describe, expect, it } from "vitest";
import { parseTranscript } from "../scripts/mhtcet/transcript";

const ONE = String.raw`
=== 1
chapter: Some Basic Concepts of Chemistry
subtopic: Stoichiometry and Concentration
difficulty: MODERATE
answer: B
stem:
What is the mass when \(50\) mL of
\(16.9\%\) \(\mathrm{AgNO_3}\) is mixed?
A: \(3.5\) g
B: \(7\) g
C: \(14\) g
D: \(28\) g
solution:
Moles of \(\mathrm{Ag^+}\) \(= 0.05\).

So the mass is \(7\) g.
`;

describe("parseTranscript", () => {
  it("parses one block: header, multi-line stem, four options, multi-line solution (raw LaTeX kept)", () => {
    const [q] = parseTranscript(ONE);
    expect(q.number).toBe(1);
    expect(q.chapter).toBe("Some Basic Concepts of Chemistry");
    expect(q.subtopic).toBe("Stoichiometry and Concentration");
    expect(q.difficulty).toBe("MODERATE");
    expect(q.answer).toBe("B");
    expect(q.stem).toBe("What is the mass when \\(50\\) mL of\n\\(16.9\\%\\) \\(\\mathrm{AgNO_3}\\) is mixed?");
    expect(q.options).toEqual(["\\(3.5\\) g", "\\(7\\) g", "\\(14\\) g", "\\(28\\) g"]);
    expect(q.solution).toBe("Moles of \\(\\mathrm{Ag^+}\\) \\(= 0.05\\).\n\nSo the mass is \\(7\\) g.");
    expect(q.figure).toBe("none");
    expect(q.flawed).toBe(false);
  });

  it("reads the optional figure / note / flawed lines", () => {
    const text = ONE.replace("answer: B", "answer: B\nfigure: options\nnote: key says C; it is B because ...\nflawed: yes");
    const [q] = parseTranscript(text);
    expect(q.figure).toBe("options");
    expect(q.note).toBe("key says C; it is B because ...");
    expect(q.flawed).toBe(true);
  });

  it("parses several blocks in order", () => {
    const two = ONE + ONE.replace("=== 1", "=== 2");
    expect(parseTranscript(two).map((q) => q.number)).toEqual([1, 2]);
  });

  it("rejects a block missing a required header", () => {
    expect(() => parseTranscript(ONE.replace("difficulty: MODERATE\n", ""))).toThrow(/Q1.*difficulty/);
  });

  it("rejects an answer that is not A-D and a bad difficulty", () => {
    expect(() => parseTranscript(ONE.replace("answer: B", "answer: E"))).toThrow(/Q1.*answer/);
    expect(() => parseTranscript(ONE.replace("MODERATE", "MEDIUM"))).toThrow(/Q1.*difficulty/);
  });

  it("rejects a block without exactly four options A-D in order", () => {
    expect(() => parseTranscript(ONE.replace("D: \\(28\\) g\n", ""))).toThrow(/Q1.*options/);
    expect(() => parseTranscript(ONE.replace("B: \\(7\\) g", "C: \\(7\\) g"))).toThrow(/Q1.*options/);
  });

  it("rejects an empty stem or an empty solution", () => {
    expect(() => parseTranscript(ONE.replace(/stem:\n[\s\S]*?\nA:/, "stem:\nA:"))).toThrow(/Q1.*stem/);
    expect(() => parseTranscript(ONE.replace(/solution:[\s\S]*$/, "solution:\n"))).toThrow(/Q1.*solution/);
  });

  it("rejects an unknown figure kind and a duplicate question number", () => {
    expect(() => parseTranscript(ONE.replace("answer: B", "answer: B\nfigure: chart"))).toThrow(/Q1.*figure/);
    expect(() => parseTranscript(ONE + ONE)).toThrow(/duplicate.*1/);
  });
});
