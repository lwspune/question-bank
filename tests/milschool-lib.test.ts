import { describe, expect, it } from "vitest";
import {
  compareWritten,
  normaliseNtaKey,
  resolveAccepted,
  scoreAccepted,
  validateWritten,
  writtenPayload,
  type WrittenItem,
} from "../scripts/milschool/lib";
import { subjectiveContentHash } from "../src/lib/upload/hash";

const item = (n: number, over: Partial<WrittenItem> = {}): WrittenItem => ({
  number: n,
  label: String(n),
  stem: `Question ${n}`,
  subject: "Mathematics",
  chapter: "Numbers",
  difficulty: "EASY",
  marks: 5,
  ...over,
});

describe("validateWritten (RIMC written papers)", () => {
  it("accepts numbered written items 1..N", () => {
    expect(validateWritten([item(1), item(2), item(3)])).toEqual([]);
  });
  it("refuses a gap or a repeat in the numbering", () => {
    expect(validateWritten([item(1), item(3)]).join(" ")).toMatch(/Q2/);
    expect(validateWritten([item(1), item(1)]).join(" ")).toMatch(/twice/);
  });
  it("refuses an empty stem, options, a missing printed label, no marks, unbalanced maths", () => {
    expect(validateWritten([item(1, { stem: " " })]).join(" ")).toMatch(/stem/);
    expect(validateWritten([item(1, { options: [{ label: "A", text: "x" }] })]).join(" ")).toMatch(/options/);
    expect(validateWritten([item(1, { label: "" })]).join(" ")).toMatch(/label/);
    expect(validateWritten([item(1, { marks: 0 })]).join(" ")).toMatch(/marks/);
    expect(validateWritten([item(1, { stem: "Find \\(x + 1" })]).join(" ")).toMatch(/delimiter/);
  });
  it("refuses two items sharing a printed label (the label is the row's question number)", () => {
    expect(validateWritten([item(1, { label: "1(a)" }), item(2, { label: "1(a)" })]).join(" ")).toMatch(/1\(a\)/);
  });
});

describe("compareWritten", () => {
  it("agrees on the same final answer written differently", () => {
    expect(compareWritten("Rs. 3,600", "₹3600")).toBe("AGREE");
    expect(compareWritten("\\(0.50\\)", "0.5")).toBe("AGREE");
    expect(compareWritten("Mickey, Goofy", "mickey,goofy.")).toBe("AGREE");
  });
  it("ignores a leading choice label and dots in initials", () => {
    expect(compareWritten("Mother Teresa", "(c) Mother Teresa")).toBe("AGREE");
    expect(compareWritten("KM Munshi", "(e) K. M. Munshi")).toBe("AGREE");
    expect(compareWritten("(a) 12", "(b) 12")).toBe("AGREE");
    // a decimal point is not an initial's dot
    expect(compareWritten("1.5", "15")).toBe("DISPUTE");
  });
  it("reads degrees one way, and ignores a closing remark in brackets", () => {
    expect(compareWritten("x = 70 degrees", "x = 70°")).toBe("AGREE");
    expect(compareWritten("x = 70^\\circ", "x = 70°")).toBe("AGREE");
    expect(compareWritten("North 1, South 2", "North 1, South 2 (North lost 1-2)")).toBe("AGREE");
    // brackets inside an answer are kept
    expect(compareWritten("(2, 2) and (32, 16)", "(2, 2) and (32, 17)")).toBe("DISPUTE");
  });
  it("disputes different answers, and reports a missing one", () => {
    expect(compareWritten("12", "13")).toBe("DISPUTE");
    expect(compareWritten("12", undefined)).toBe("MISSING");
  });
  it("never compares an open-ended item (essay, letter)", () => {
    expect(compareWritten("an essay", "another essay", true)).toBe("OPEN");
  });
});

describe("writtenPayload", () => {
  it("builds a subjective row keyed on stem + context, numbered by the printed label", () => {
    const p = writtenPayload(item(4, { label: "1(d)", context: "A passage." }), "The answer.", 7);
    expect(p.questionFormat).toBe("subjective");
    expect(p.options).toEqual([]);
    expect(p.questionNumber).toBe("1(d)");
    expect(p.solution).toBe("The answer.");
    expect(p.sourceRow).toBe(7);
    expect(p.contentHash).toBe(subjectiveContentHash("Question 4", "A passage."));
    expect(p.difficulty).toBe("EASY");
  });
  it("maps MEDIUM to the bank's MODERATE and refuses an unknown difficulty", () => {
    expect(writtenPayload(item(1, { difficulty: "MEDIUM" }), "s", 1).difficulty).toBe("MODERATE");
    expect(() => writtenPayload(item(1, { difficulty: "TRICKY" }), "s", 1)).toThrow(/difficulty/);
  });
});

const full = (n: number, fill = "1"): Record<string, string> =>
  Object.fromEntries(Array.from({ length: n }, (_, i) => [String(i + 1), fill]));

describe("normaliseNtaKey", () => {
  it("maps NTA's option numbers 1-4 to letters A-D", () => {
    const k = normaliseNtaKey({ ...full(4), "1": "1", "2": "2", "3": "3", "4": "4" }, 4);
    expect(k.key).toEqual({ "1": "A", "2": "B", "3": "C", "4": "D" });
    expect(k.multi).toEqual({});
  });

  it("reads DROP as a withdrawn item (X), whatever its case or spacing", () => {
    const k = normaliseNtaKey({ ...full(3), "2": " drop " }, 3);
    expect(k.key["2"]).toBe("X");
  });

  it("keeps every accepted option of a two-answer item, in order", () => {
    const k = normaliseNtaKey({ ...full(3), "3": "2,3" }, 3);
    expect(k.multi).toEqual({ "3": ["B", "C"] });
    // The key carries the first accepted letter until a blind pass picks one.
    expect(k.key["3"]).toBe("B");
  });

  it("refuses a cell it cannot read rather than guessing", () => {
    expect(() => normaliseNtaKey({ ...full(2), "2": "5" }, 2)).toThrow(/Q2/);
    expect(() => normaliseNtaKey({ ...full(2), "2": "" }, 2)).toThrow(/Q2/);
    expect(() => normaliseNtaKey({ ...full(2), "2": "B" }, 2)).toThrow(/Q2/);
  });

  it("refuses a short key (a missed page or column must not pass as complete)", () => {
    expect(() => normaliseNtaKey(full(149), 150)).toThrow(/missing/);
  });

  it("refuses a question number outside the paper", () => {
    expect(() => normaliseNtaKey({ ...full(2), "3": "1" }, 2)).toThrow(/outside/);
  });

  it("accepts a key without the paper's HELD numbers, and only those", () => {
    // AISSEE Class 6 2023/2025 Hindi-medium copies: Q1-25 (the Hindi language
    // section) are held, so the stored key carries Q26-125 only.
    const tail = Object.fromEntries(Array.from({ length: 3 }, (_, i) => [String(i + 3), "2"]));
    const k = normaliseNtaKey(tail, 5, [1, 2]);
    expect(Object.keys(k.key).sort()).toEqual(["3", "4", "5"]);
    // A held number never comes back as a dropped (X) item.
    expect(Object.values(k.key)).not.toContain("X");
    // Missing a number that is NOT held is still a short key.
    expect(() => normaliseNtaKey({ "4": "2", "5": "2" }, 5, [1, 2])).toThrow(/missing/);
  });
});

describe("resolveAccepted", () => {
  it("ships the accepted letter a blind pass reached", () => {
    expect(resolveAccepted(["B", "C"], "C", "B")).toBe("C");
    expect(resolveAccepted(["B", "C"], "D", "C")).toBe("C");
  });
  it("falls back to the first accepted letter when neither pass reached one", () => {
    expect(resolveAccepted(["B", "C"], "A", "D")).toBe("B");
    expect(resolveAccepted(["B", "C"], undefined, undefined)).toBe("B");
  });
});

describe("scoreAccepted", () => {
  it("counts a pass right when it reached any accepted letter, and skips drops", () => {
    const key = { "1": "A", "2": "X", "3": "B" };
    const multi = { "3": ["B", "C"] };
    const pass = [
      { number: 1, answer: "a", confidence: "HIGH" },
      { number: 2, answer: "C", confidence: "HIGH" },
      { number: 3, answer: "C", confidence: "MED" },
    ];
    const s = scoreAccepted(key, multi, pass);
    expect(s.scored).toBe(2);
    expect(s.match).toBe(2);
    expect(s.mismatched).toEqual([]);
    expect(s.byConfidence).toEqual({ HIGH: { ok: 1, of: 1 }, MED: { ok: 1, of: 1 } });
  });
  it("lists the questions a pass missed", () => {
    const s = scoreAccepted({ "1": "A", "2": "B" }, {}, [
      { number: 1, answer: "B", confidence: "LOW" },
      { number: 2, answer: "B", confidence: "HIGH" },
    ]);
    expect(s.mismatched).toEqual([1]);
  });
});
