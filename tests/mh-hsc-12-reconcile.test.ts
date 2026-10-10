import { describe, it, expect } from "vitest";
import {
  contentTokens,
  compareText,
  autoPair,
  classifyPair,
  type BankSide,
  type PaperSide,
} from "../scripts/mh-hsc-12-pyq/paper/reconcileCore";

// The lane's own normaliser folds every spelling onto one ref; a stand-in that
// does the same for the shapes these tests use.
const norm = (r: string | null) => {
  const m = /^Q\.?\s*(\d+)(?:\s*\(([ivx]+)\)|\.([a-z]))?$/.exec(String(r ?? "").trim());
  if (!m) return null;
  const part = m[2] ?? (m[3] ? ["i", "ii", "iii", "iv"][m[3].charCodeAt(0) - 97] : undefined);
  return part ? `Q. ${m[1]}(${part})` : `Q. ${m[1]}`;
};

const bank = (id: string, ref: string, text: string, extra: Partial<BankSide> = {}): BankSide => ({
  id,
  ref,
  text,
  context: null,
  options: [],
  contentHash: `h-${id}`,
  format: "subjective",
  ...extra,
});
const paper = (ref: string, stem: string, extra: Partial<PaperSide> = {}): PaperSide => ({
  ref,
  stem,
  context: null,
  options: [],
  answer: null,
  contentHash: `p-${ref}`,
  format: "subjective",
  ...extra,
});

describe("contentTokens — what a sentence SAYS, not how it is typeset", () => {
  it("ignores math spacing, \\text, \\dfrac and line breaks", () => {
    expect(contentTokens("resistance of \\(50\\ \\Omega\\) and\n(i) into an ammeter")).toEqual(
      contentTokens("resistance of \\(50\\Omega\\) and (i) into an ammeter"),
    );
    expect(contentTokens("\\(\\dfrac{1}{3}\\)rd")).toEqual(contentTokens("\\(\\frac{1}{3}\\) rd"));
    expect(contentTokens("\\(200\\ \\text{cm}^{2}\\)")).toEqual(contentTokens("\\(200\\text{ cm}^{2}\\)"));
  });
  it("reads a degree sign written three ways as one", () => {
    expect(contentTokens("at 127ºC")).toEqual(contentTokens("at \\(127^{\\circ}\\text{C}\\)"));
    expect(contentTokens("at 127°C")).toEqual(contentTokens("at 127ºC"));
  });
  it("does not glue a command to the letter after it (\\mu F is micro-farad, not \\muF)", () => {
    expect(contentTokens("\\(5\\mu F\\)")).toEqual(contentTokens("\\(5\\mu\\text{F}\\)"));
    expect(contentTokens("\\(5\\mu F\\)")).toEqual(["5", "mu", "f"]);
  });
  it("keeps a sign on a number, wherever the space falls", () => {
    expect(contentTokens("\\(10^{- 8}\\)")).toEqual(contentTokens("\\(10^{-8}\\)"));
    expect(contentTokens("\\(10^{-8}\\)")).not.toEqual(contentTokens("\\(10^{8}\\)"));
  });
  it("keeps the sign of every number in a list, and reads a subtraction as one", () => {
    expect(contentTokens("\\(- 74.8, - 393.5\\text{ and } - 285.8\\)")).toEqual(["-74.8", "-393.5", "and", "-285.8"]);
    expect(contentTokens("\\(4 - 6\\)")).toEqual(["4", "6"]);
  });
  it("sees a changed number or word", () => {
    expect(contentTokens("0.20 degree apart")).not.toEqual(contentTokens("0.25 degree apart"));
    expect(contentTokens("ammeter")).not.toEqual(contentTokens("voltmeter"));
  });
  it("ignores dashes and fill-in blanks of any length", () => {
    expect(contentTokens("is directly proportional to ___________.")).toEqual(contentTokens("is directly proportional to _____."));
    expect(contentTokens("define -- (a)")).toEqual(contentTokens("define – (a)"));
  });
});

describe("compareText", () => {
  it("names the tokens only one side has", () => {
    const c = compareText("fringes 0.20 degree apart", "fringes 0.25 degree apart");
    expect(c.kind).toBe("content");
    expect(c.onlyA).toEqual(["0.20"]);
    expect(c.onlyB).toEqual(["0.25"]);
  });
  it("tells formatting from sameness", () => {
    expect(compareText("a  b", "a  b").kind).toBe("same");
    expect(compareText("\\(3\\Omega,8\\Omega\\)", "\\(3\\Omega\\), \\(8\\Omega\\)").kind).toBe("format");
    expect(compareText(null, "").kind).toBe("same");
  });
});

describe("autoPair — every bank row to one transcription row", () => {
  it("pairs by question number, then by content where the bank repeats a bare number", () => {
    const r = autoPair(
      [
        bank("a", "Q. 28", "Obtain an expression for average power."),
        bank("b", "Q. 29", "Distinguish between an ammeter and a voltmeter."),
        bank("c", "Q. 29", "What fraction of total energy will be its kinetic energy?"),
      ],
      [
        paper("Q. 28", "Obtain an expression for average power."),
        paper("Q. 29(i)", "Distinguish between an ammeter and a voltmeter."),
        paper("Q. 29(ii)", "What fraction of total energy will be its kinetic energy?"),
      ],
      norm,
    );
    expect(r.pairs.map((p) => [p.paperRef, p.rowId, p.how])).toEqual([
      ["Q. 28", "a", "ref"],
      ["Q. 29(i)", "b", "content"],
      ["Q. 29(ii)", "c", "content"],
    ]);
    expect(r.unpairedBank).toEqual([]);
    expect(r.unpairedPaper).toEqual([]);
  });

  it("reads the compilation's letter parts as the lane's romans", () => {
    const r = autoPair([bank("a", "Q.4.a", "State Henry's law.")], [paper("Q. 4(i)", "State Henry's law.")], norm);
    expect(r.pairs[0]).toMatchObject({ paperRef: "Q. 4(i)", rowId: "a", how: "ref" });
  });

  it("never pairs across printed numbers, and reports what is left on each side", () => {
    const r = autoPair(
      [bank("a", "Q. 5", "State Henry's law.")],
      [paper("Q. 6", "State Henry's law."), paper("Q. 7", "Something new.")],
      norm,
    );
    expect(r.pairs).toEqual([]);
    expect(r.unpairedBank).toEqual(["a"]);
    expect(r.unpairedPaper).toEqual(["Q. 6", "Q. 7"]);
  });

  it("will not pair rows that merely share a number", () => {
    const r = autoPair(
      [bank("a", "Q. 27", "Derive the equation of Raoult's law.")],
      [paper("Q. 27(i)", "An element with molar mass 27 g/mol forms a cubic unit cell.")],
      norm,
    );
    expect(r.pairs).toEqual([]);
  });

  it("takes a hand pairing over everything else", () => {
    const r = autoPair(
      [bank("a", "Q. 27", "Old text.")],
      [paper("Q. 27(ii)", "Quite different words.")],
      norm,
      { "Q. 27(ii)": "a" },
    );
    expect(r.pairs).toEqual([{ paperRef: "Q. 27(ii)", rowId: "a", how: "manual" }]);
  });

  it("refuses a hand pairing that names a row twice", () => {
    expect(() =>
      autoPair([bank("a", "Q. 1", "x")], [paper("Q. 1", "x"), paper("Q. 2", "y")], norm, { "Q. 1": "a", "Q. 2": "a" }),
    ).toThrow(/twice/);
  });
});

describe("classifyPair — what correcting a row would change", () => {
  it("is nothing to do when the fingerprints already agree", () => {
    const b = bank("a", "Q. 3", "Explain harmonics.", { contentHash: "same" });
    const p = paper("Q. 3", "Explain harmonics.", { contentHash: "same" });
    expect(classifyPair(b, p).kind).toBe("same");
  });

  it("is formatting when only typesetting differs", () => {
    const c = classifyPair(bank("a", "Q. 10", "\\(3\\Omega,8\\Omega\\)"), paper("Q. 10", "\\(3\\Omega\\), \\(8\\Omega\\)"));
    expect(c.kind).toBe("format");
  });

  it("is content when a word, number or option differs, and says where", () => {
    const c = classifyPair(
      bank("a", "Q. 1(i)", "Which law?", {
        format: "mcq",
        options: [
          { label: "A", text: "zeroth", is_correct: true },
          { label: "B", text: "first", is_correct: false },
        ],
      }),
      paper("Q. 1(i)", "Which law?", {
        format: "mcq",
        options: [
          { label: "A", text: "zeroth" },
          { label: "B", text: "second" },
        ],
        answer: "A",
      }),
    );
    expect(c.kind).toBe("content");
    expect(c.where).toEqual(["option B"]);
  });

  it("calls a different key a key change, the one class that moves a student's score", () => {
    const opts = [
      { label: "A", text: "Voltaire" },
      { label: "C", text: "Ranke" },
    ];
    const c = classifyPair(
      bank("a", "Q. 1(iii)", "Founder?", { format: "mcq", options: opts.map((o) => ({ ...o, is_correct: o.label === "A" })) }),
      paper("Q. 1(iii)", "Founder?", { format: "mcq", options: opts, answer: "C" }),
    );
    expect(c.kind).toBe("key");
  });

  it("refuses to turn a written question into an MCQ or back", () => {
    expect(classifyPair(bank("a", "Q. 3", "x"), paper("Q. 3", "x", { format: "mcq" })).kind).toBe("format-mismatch");
  });

  it("counts a context the bank never had as content worth a look", () => {
    const c = classifyPair(bank("a", "Q. 2(i)", "Define."), paper("Q. 2(i)", "Define.", { context: "Answer the following questions :" }));
    expect(c.kind).toBe("content");
    expect(c.where).toEqual(["context"]);
  });
});
