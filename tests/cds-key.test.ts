/**
 * Spec for the CDS English official-key reconciliation + scoring core.
 *
 * Context: for 19 of the 20 CDS English papers there is no published key, so
 * answers are LLM-derived and unverifiable. `2026-2` is the first exception.
 * That makes these two functions load-bearing in a way they would not be for a
 * paper we could check another way, so they are specified before they are
 * written.
 *
 * The property that matters most here is NEGATIVE: a key that cannot be trusted
 * must not silently become one that is. Every refusal below is a case where the
 * cheap behaviour (pick one read, fill a gap, coerce a letter) would produce a
 * well-formed key that is quietly wrong.
 */
import { describe, expect, it } from "vitest";
import { reconcileKeyReads, scoreAgainstKey, type KeyRead } from "../scripts/cds/keyLib";

const read = (id: string, answers: Record<string, string>): KeyRead => ({
  readerId: id,
  series: "A",
  answers,
});

/** A complete, valid pair of reads over a small question count. */
const full = (letters: string) => {
  const out: Record<string, string> = {};
  letters.split("").forEach((c, i) => (out[String(i + 1)] = c));
  return out;
};

describe("reconcileKeyReads", () => {
  it("returns the agreed key when both reads match on every cell", () => {
    const r = reconcileKeyReads([read("a", full("ABCD")), read("b", full("ABCD"))], 4);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.key).toEqual({ "1": "A", "2": "B", "3": "C", "4": "D" });
  });

  it("REFUSES when the reads disagree, and names every disputed cell", () => {
    const r = reconcileKeyReads([read("a", full("ABCD")), read("b", full("ABDD"))], 4);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.conflicts).toEqual([{ number: 3, reads: { a: "C", b: "D" } }]);
  });

  it("REFUSES a single read — one read is not a reconciliation", () => {
    const r = reconcileKeyReads([read("a", full("ABCD"))], 4);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.error).toMatch(/at least two/i);
  });

  it("REFUSES a short read rather than scoring the questions it does cover", () => {
    const r = reconcileKeyReads([read("a", full("ABC")), read("b", full("ABC"))], 4);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.error).toMatch(/missing/i);
  });

  it("REFUSES an extra question number that the paper does not have", () => {
    const a = { ...full("ABCD"), "5": "A" };
    const r = reconcileKeyReads([read("a", a), read("b", a)], 4);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.error).toMatch(/unexpected/i);
  });

  it("REFUSES a letter outside A-D instead of coercing it", () => {
    const bad = { ...full("ABCD"), "2": "E" };
    const r = reconcileKeyReads([read("a", bad), read("b", bad)], 4);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.error).toMatch(/not a letter/i);
  });

  it("REFUSES when the two reads name different series — that is the wrong-page failure", () => {
    const a = read("a", full("ABCD"));
    const b = { ...read("b", full("ABCD")), series: "B" };
    const r = reconcileKeyReads([a, b], 4);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.error).toMatch(/series/i);
  });

  // A WITHDRAWN QUESTION is a real property of UPSC's provisional keys, not an
  // edge case: CDS (II) 2026 General Knowledge reports "No. of Questions
  // Dropped: 1" in its header box and prints X in that question's Key cell.
  // Before this, X was rejected as "not a letter", which is the right default —
  // a key that quietly invents an answer is worse than no key. But refusing
  // outright would have forced the caller to strip the cell before reconciling,
  // and a cell stripped BEFORE reconciliation is a cell the two reads never
  // compare, so a misread of which question was dropped would pass unseen.
  describe("dropped questions", () => {
    it("accepts X as DROPPED and reports it separately from the key", () => {
      const withX = { ...full("ABCD"), "3": "X" };
      const r = reconcileKeyReads([read("a", withX), read("b", withX)], 4);
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      expect(r.dropped).toEqual([3]);
      // The dropped question carries NO key entry, so scoreAgainstKey still
      // throws on it unless the caller excludes it deliberately.
      expect(r.key).toEqual({ "1": "A", "2": "B", "4": "D" });
    });

    it("REFUSES when one read sees a letter where the other sees X", () => {
      const a = { ...full("ABCD"), "3": "X" };
      const r = reconcileKeyReads([read("a", a), read("b", full("ABCD"))], 4);
      expect(r.ok).toBe(false);
      if (r.ok) return;
      expect(r.conflicts).toEqual([{ number: 3, reads: { a: "X", b: "C" } }]);
    });

    it("reports an empty dropped list when nothing was withdrawn", () => {
      const r = reconcileKeyReads([read("a", full("ABCD")), read("b", full("ABCD"))], 4);
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      expect(r.dropped).toEqual([]);
    });

    it("still REFUSES a letter outside A-D that is not the dropped marker", () => {
      const bad = { ...full("ABCD"), "2": "E" };
      const r = reconcileKeyReads([read("a", bad), read("b", bad)], 4);
      expect(r.ok).toBe(false);
      if (r.ok) return;
      expect(r.error).toMatch(/not a letter/i);
    });
  });
});

describe("scoreAgainstKey", () => {
  const qs = [
    { number: 1, answer: "A", confidence: "HIGH" },
    { number: 2, answer: "B", confidence: "MED" },
    { number: 3, answer: "C", confidence: "HIGH" },
  ];

  it("counts agreement and reports each disagreement with its confidence", () => {
    const s = scoreAgainstKey(qs, { "1": "A", "2": "D", "3": "C" });
    expect(s.total).toBe(3);
    expect(s.agree).toBe(2);
    expect(s.disagree).toEqual([{ number: 2, derived: "B", key: "D", confidence: "MED" }]);
  });

  it("reports a perfect score with an empty disagreement list", () => {
    const s = scoreAgainstKey(qs, { "1": "A", "2": "B", "3": "C" });
    expect(s.agree).toBe(3);
    expect(s.disagree).toEqual([]);
  });

  it("THROWS when the key has no entry for a question rather than counting it as agreement", () => {
    expect(() => scoreAgainstKey(qs, { "1": "A", "3": "C" })).toThrow(/no key entry.*2/i);
  });

  it("splits agreement by confidence, so a MED-heavy disagreement set is visible", () => {
    const s = scoreAgainstKey(qs, { "1": "D", "2": "D", "3": "C" });
    expect(s.byConfidence).toEqual({
      HIGH: { total: 2, agree: 1 },
      MED: { total: 1, agree: 0 },
    });
  });
});
