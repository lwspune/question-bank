import { describe, it, expect } from "vitest";
import { scorePass, pickWorking } from "../scripts/capf/lib";
import { parseOfficialKey, type Derivation } from "../scripts/upsc/lib";

const d = (number: number, answer: string, confidence = "HIGH"): Derivation => ({
  number,
  answer,
  value: `value ${number}${answer}`,
  confidence,
  reasoning: `reasoning ${number}${answer}`,
});

// Q1 A, Q2 B, Q3 dropped, Q4 D
const key = parseOfficialKey({ "1": "A", "2": "B", "3": "X", "4": "D" }, 4);

describe("scorePass", () => {
  it("counts matches over SCORED questions only (dropped excluded)", () => {
    const s = scorePass(key, [d(1, "A"), d(2, "C"), d(3, "A"), d(4, "D")]);
    expect(s.scored).toBe(3);
    expect(s.match).toBe(2);
    expect(s.mismatched).toEqual([2]);
  });

  it("splits accuracy by the pass's stated confidence", () => {
    const s = scorePass(key, [d(1, "A", "HIGH"), d(2, "C", "LOW"), d(4, "D", "LOW")]);
    expect(s.byConfidence.HIGH).toEqual({ ok: 1, of: 1 });
    expect(s.byConfidence.LOW).toEqual({ ok: 1, of: 2 });
  });
});

describe("pickWorking", () => {
  it("uses pass A's working where A matches the key", () => {
    const { answers, needHand } = pickWorking(key, [d(1, "A")], [d(1, "A")], {});
    expect(needHand).toEqual([]);
    expect(answers[0].reasoning).toBe("reasoning 1A");
  });

  it("falls back to pass B's working where only B matches the key", () => {
    const { answers } = pickWorking(key, [d(2, "C")], [d(2, "B")], {});
    expect(answers[0]).toMatchObject({ number: 2, answer: "B", reasoning: "reasoning 2B" });
  });

  it("NEVER ships working that argues for another letter: both wrong -> needs a hand solution", () => {
    const { answers, needHand } = pickWorking(key, [d(4, "A")], [d(4, "B")], {});
    expect(needHand).toEqual([4]);
    expect(answers.find((a) => a.number === 4)).toBeUndefined();
  });

  it("a hand solution fills that gap, with the key's letter", () => {
    const hand = { "4": { value: "the right thing", reasoning: "worked by hand" } };
    const { answers, needHand } = pickWorking(key, [d(4, "A")], [d(4, "B")], hand);
    expect(needHand).toEqual([]);
    expect(answers[0]).toMatchObject({ number: 4, answer: "D", reasoning: "worked by hand", confidence: "HIGH" });
  });

  it("a hand solution OVERRIDES a matching pass (used to fix weak working)", () => {
    const hand = { "1": { value: "v", reasoning: "better" } };
    const { answers } = pickWorking(key, [d(1, "A")], [], hand);
    expect(answers[0].reasoning).toBe("better");
  });

  it("excludes DROPPED questions entirely", () => {
    const { answers, needHand } = pickWorking(key, [d(3, "A")], [d(3, "A")], {});
    expect(answers).toEqual([]);
    expect(needHand).toEqual([]);
  });
});
