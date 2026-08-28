import { describe, it, expect } from "vitest";
import {
  validateRows as validateRowsX,
  parseOfficialKey,
  compareToKey,
  applyOfficialKey,
  type OfficialKey,
} from "../scripts/upsc/lib";
import type { Derivation } from "../scripts/upsc/lib";

const d = (number: number, answer: string, over: Partial<Derivation> = {}): Derivation => ({
  number,
  answer,
  value: `value for ${number}`,
  confidence: "HIGH",
  reasoning: `reasoning for ${number}`,
  ...over,
});

describe("parseOfficialKey", () => {
  it("accepts a full 1..N key", () => {
    const k = parseOfficialKey({ "1": "A", "2": "B", "3": "C" }, 3);
    expect(k.answers.get(1)).toBe("A");
    expect(k.dropped).toEqual([]);
  });

  it("records X as a DROPPED question rather than an answer", () => {
    const k = parseOfficialKey({ "1": "A", "2": "X", "3": "C" }, 3);
    expect(k.dropped).toEqual([2]);
    expect(k.answers.has(2)).toBe(false);
  });

  it("REFUSES a key that is short — a partial key must not be mistaken for a full one", () => {
    expect(() => parseOfficialKey({ "1": "A", "2": "B" }, 3)).toThrow(/missing/i);
  });

  it("REFUSES a key carrying a question outside 1..N", () => {
    expect(() => parseOfficialKey({ "1": "A", "2": "B", "3": "C", "9": "D" }, 3)).toThrow(/outside/i);
  });

  it("REFUSES a letter that is not A-D or X", () => {
    expect(() => parseOfficialKey({ "1": "A", "2": "E", "3": "C" }, 3)).toThrow(/E/);
  });

  it("normalises case and stray whitespace from a vision transcription", () => {
    const k = parseOfficialKey({ "1": " a ", "2": "b", "3": "x" }, 3);
    expect(k.answers.get(1)).toBe("A");
    expect(k.dropped).toEqual([3]);
  });
});

describe("compareToKey", () => {
  const key: OfficialKey = parseOfficialKey({ "1": "A", "2": "B", "3": "C", "4": "X" }, 4);

  it("MATCH when the blind derivation agrees with the official key", () => {
    const r = compareToKey(key, [d(1, "A"), d(2, "B"), d(3, "C"), d(4, "A")]);
    expect(r.filter((x) => x.verdict === "MATCH")).toHaveLength(3);
  });

  it("MISMATCH when they disagree, carrying both letters for adjudication", () => {
    const r = compareToKey(key, [d(1, "D"), d(2, "B"), d(3, "C"), d(4, "A")]);
    const m = r.find((x) => x.number === 1)!;
    expect(m.verdict).toBe("MISMATCH");
    expect(m.official).toBe("A");
    expect(m.derived).toBe("D");
  });

  it("DROPPED for a question UPSC withdrew, whatever we derived", () => {
    const r = compareToKey(key, [d(1, "A"), d(2, "B"), d(3, "C"), d(4, "A")]);
    expect(r.find((x) => x.number === 4)!.verdict).toBe("DROPPED");
  });

  it("NOT_DERIVED when the blind pass skipped a question the key answers", () => {
    const r = compareToKey(key, [d(1, "A"), d(2, "B")]);
    expect(r.find((x) => x.number === 3)!.verdict).toBe("NOT_DERIVED");
  });

  it("reports an accuracy rate over the scored questions only, excluding dropped ones", () => {
    const r = compareToKey(key, [d(1, "A"), d(2, "D"), d(3, "C"), d(4, "A")]);
    const scored = r.filter((x) => x.verdict === "MATCH" || x.verdict === "MISMATCH");
    expect(scored).toHaveLength(3); // Q4 was dropped
    expect(scored.filter((x) => x.verdict === "MATCH")).toHaveLength(2);
  });
});

describe("applyOfficialKey", () => {
  const key: OfficialKey = parseOfficialKey({ "1": "A", "2": "B", "3": "X" }, 3);

  it("takes the ANSWER from the official key, not from our derivation", () => {
    const out = applyOfficialKey(key, [d(1, "D"), d(2, "B")]);
    expect(out.find((x) => x.number === 1)!.answer).toBe("A");
  });

  it("keeps our reasoning, because the key supplies no working", () => {
    const out = applyOfficialKey(key, [d(1, "A")]);
    expect(out.find((x) => x.number === 1)!.reasoning).toMatch(/reasoning for 1/);
  });

  it("marks a corrected row so the stored solution cannot silently argue for the wrong letter", () => {
    const out = applyOfficialKey(key, [d(1, "D")]);
    const row = out.find((x) => x.number === 1)!;
    expect(row.reasoning).toMatch(/official UPSC answer key/i);
    expect(row.reasoning).toMatch(/D/); // names what we had derived
  });

  it("does not touch a row whose derivation already agreed", () => {
    const out = applyOfficialKey(key, [d(2, "B")]);
    expect(out.find((x) => x.number === 2)!.reasoning).toBe("reasoning for 2");
  });

  it("EXCLUDES a dropped question — it has no answer to ship", () => {
    const out = applyOfficialKey(key, [d(1, "A"), d(3, "C")]);
    expect(out.map((x) => x.number)).toEqual([1]);
  });

  it("drops a question the key answers but nobody derived, rather than shipping it without working", () => {
    const out = applyOfficialKey(key, [d(1, "A")]);
    expect(out.map((x) => x.number)).toEqual([1]);
  });
});

describe("validateRows with dropped questions", () => {
  it("does NOT report a dropped question as missing coverage", () => {
    const rows = [
      { sourceRow: 1, questionNumber: "1", subject: "S", chapter: "C", question: "q1?",
        optionA: "a", optionB: "b", optionC: "c", optionD: "d", answer: "A", difficulty: "MODERATE" },
      { sourceRow: 3, questionNumber: "3", subject: "S", chapter: "C", question: "q3?",
        optionA: "a", optionB: "b", optionC: "c", optionD: "d", answer: "B", difficulty: "MODERATE" },
    ];
    expect(validateRowsX(rows, 1, 3, { exclude: [2] })).toEqual([]);
  });

  it("still reports a genuinely missing question", () => {
    const rows = [
      { sourceRow: 1, questionNumber: "1", subject: "S", chapter: "C", question: "q1?",
        optionA: "a", optionB: "b", optionC: "c", optionD: "d", answer: "A", difficulty: "MODERATE" },
    ];
    expect(validateRowsX(rows, 1, 3, { exclude: [2] }).join(" ")).toMatch(/missing Q3/);
  });
});
