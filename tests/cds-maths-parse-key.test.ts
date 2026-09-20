import { describe, expect, it } from "vitest";
import { parseKeyPairs, reconcileKeyReads } from "../scripts/cds-maths/parse-key";

describe("parseKeyPairs", () => {
  // The 2020-I layout: a plain two-column Question/Answer table, right-aligned.
  it("reads the two-column Question/Answer layout", () => {
    const txt = ["  Question Answer", "---------- --------", "         1 A", "", "         2 B", "", "        10 C"].join("\n");
    expect([...parseKeyPairs(txt)]).toEqual([
      [1, "A"],
      [2, "B"],
      [10, "C"],
    ]);
  });

  // The 2020-II layout: 1-50 and 51-100 paired side by side in one wide table.
  it("reads both halves of a side-by-side pipe table", () => {
    const txt = [
      "| Question |   Answer |            | 51        |   B       |",
      "| 1        |   C      |            | 52        |   B       |",
      "| 2        |   B      |            | 53        |   A       |",
    ].join("\n");
    const got = parseKeyPairs(txt);
    expect(got.get(1)).toBe("C");
    expect(got.get(2)).toBe("B");
    expect(got.get(51)).toBe("B");
    expect(got.get(52)).toBe("B");
    expect(got.get(53)).toBe("A");
  });

  it("ignores question numbers outside 1..100", () => {
    expect(parseKeyPairs("101 A\n0 B\n250 C").size).toBe(0);
  });

  // Guard against pairing a number with the first letter of an ordinary word —
  // "2020 Answer key" must not read as Q20 -> A.
  it("does not pair a number with the start of a word", () => {
    expect(parseKeyPairs("Solved Paper 2020 Answer key").size).toBe(0);
    expect(parseKeyPairs("Section 5 Above").size).toBe(0);
  });

  it("keeps the FIRST reading when a number repeats", () => {
    expect(parseKeyPairs("7 A\n7 D").get(7)).toBe("A");
  });

  it("requires the letter to be adjacent, not merely later on the line", () => {
    expect(parseKeyPairs("12 marks were awarded").size).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// reconcileKeyReads — the IMAGE-key path (2026-II onward).
//
// The 2020 keys are born-digital .docx and parse deterministically. A published
// UPSC key arrives as a SCAN with zero text layer, so it is read by vision, and
// a vision read of 100 table cells has an error rate. Two readers transcribe it
// independently and this function refuses to emit any cell they disagree on.
//
// The defect it exists to stop is specific: a misread cell manufactures a FALSE
// DISAGREEMENT between the key and the derived answer, and a human then
// adjudicates a dispute that never existed.
// ---------------------------------------------------------------------------
describe("reconcileKeyReads", () => {
  const read = (id: string, answers: Record<string, string>) => ({ readerId: id, answers });
  const full = (letter: string) =>
    Object.fromEntries(Array.from({ length: 100 }, (_, i) => [String(i + 1), letter]));

  it("emits a cell both readers agree on", () => {
    const r = reconcileKeyReads([read("k1", full("A")), read("k2", full("A"))]);
    expect(r.answers.size).toBe(100);
    expect(r.answers.get(42)).toBe("A");
    expect(r.disagreements).toEqual([]);
    expect(r.missing).toEqual([]);
  });

  it("REFUSES a cell the readers disagree on, and names it", () => {
    const a = full("A");
    const b = { ...full("A"), "37": "D" };
    const r = reconcileKeyReads([read("k1", a), read("k2", b)]);
    expect(r.answers.has(37)).toBe(false);
    expect(r.answers.size).toBe(99);
    expect(r.disagreements).toEqual([{ q: 37, reads: [{ readerId: "k1", value: "A" }, { readerId: "k2", value: "D" }] }]);
  });

  // A reader who silently drops a row shifts nothing here — but the hole must
  // surface, because a 99-cell key would otherwise look like a 99-question paper.
  it("reports a question a reader omitted as MISSING, not as agreement", () => {
    const b = full("A");
    delete b["50"];
    const r = reconcileKeyReads([read("k1", full("A")), read("k2", b)]);
    expect(r.missing).toEqual([50]);
    expect(r.answers.has(50)).toBe(false);
  });

  it("rejects a value outside A-D rather than passing it through", () => {
    const b = { ...full("A"), "9": "E" };
    const r = reconcileKeyReads([read("k1", full("A")), read("k2", b)]);
    expect(r.invalid).toEqual([{ q: 9, readerId: "k2", value: "E" }]);
    expect(r.answers.has(9)).toBe(false);
  });

  it("normalises case and surrounding whitespace before comparing", () => {
    const b = { ...full("A"), "5": " a " };
    const r = reconcileKeyReads([read("k1", full("A")), read("k2", b)]);
    expect(r.disagreements).toEqual([]);
    expect(r.answers.get(5)).toBe("A");
  });

  // Two reads that are actually one read prove nothing. The whole design rests
  // on independence, so a single read must not be able to satisfy it.
  it("refuses fewer than two reads", () => {
    expect(() => reconcileKeyReads([read("k1", full("A"))])).toThrow(/two independent/i);
  });

  it("scales past two readers if a third is ever added", () => {
    const c = { ...full("A"), "8": "B" };
    const r = reconcileKeyReads([read("k1", full("A")), read("k2", full("A")), read("k3", c)]);
    expect(r.answers.has(8)).toBe(false);
    expect(r.disagreements[0].reads).toHaveLength(3);
  });
});
