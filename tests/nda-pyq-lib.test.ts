import { describe, expect, it } from "vitest";
import {
  buildRecords,
  validateCatalog,
  type Derivation,
  type TQ,
} from "../scripts/cds-maths/lib";
import { diffAgainstKey, sortForReview, type KeyEntry } from "../scripts/nda-pyq/lib";

const q = (over: Partial<TQ> = {}): TQ => ({
  number: 1,
  stem: "What is 2 + 2 ?",
  options: [
    { label: "A", text: "3" },
    { label: "B", text: "4" },
    { label: "C", text: "5" },
    { label: "D", text: "6" },
  ],
  chapter: "Sequence & Series",
  subtopic: "Arithmetic Progressions",
  difficulty: "EASY",
  ...over,
});

const d = (over: Partial<Derivation> = {}): Derivation => ({
  number: 1,
  answer: "B",
  value: "4",
  confidence: "HIGH",
  reasoning: "two plus two",
  ...over,
});

const CAT = { "Sequence & Series": ["Arithmetic Progressions", "Geometric Progressions"] };

/**
 * These two options are ADDITIVE changes to a pure core shared with
 * scripts/cds-maths. The cds-maths suites prove the DEFAULTS are unchanged;
 * these prove the new behaviour actually fires, which a passing default cannot.
 */
describe("shared-core options used by the NDA pipeline", () => {
  it("leaves an unlisted subtopic a WARNING by default (the CDS behaviour)", () => {
    const r = validateCatalog([q({ subtopic: "Invented Subtopic" })], CAT);
    expect(r.errors).toHaveLength(0);
    expect(r.warnings).toHaveLength(1);
  });

  it("promotes an unlisted subtopic to an ERROR under strictSubtopics", () => {
    const r = validateCatalog([q({ subtopic: "Invented Subtopic" })], CAT, {
      strictSubtopics: true,
    });
    // The whole point: NDA's taxonomy is closed, so this must BLOCK the merge
    // rather than be reported and waved through.
    expect(r.warnings).toHaveLength(0);
    expect(r.errors).toHaveLength(1);
    expect(r.errors[0]).toContain("Invented Subtopic");
  });

  it("still hard-fails an unknown CHAPTER in both modes", () => {
    for (const opts of [{}, { strictSubtopics: true }]) {
      const r = validateCatalog([q({ chapter: "Not A Chapter" })], CAT, opts);
      expect(r.errors).toHaveLength(1);
    }
  });

  it("numbers source_row from the question number by default", () => {
    const rows = buildRecords([q({ number: 7 })], [d({ number: 7 })]);
    expect(rows[0].sourceRow).toBe(7);
  });

  it("offsets source_row to match the 18 existing NDA sittings (2..121)", () => {
    const first = buildRecords([q({ number: 1 })], [d({ number: 1 })], { sourceRowOffset: 1 });
    const last = buildRecords([q({ number: 120 })], [d({ number: 120 })], { sourceRowOffset: 1 });
    expect(first[0].sourceRow).toBe(2);
    expect(last[0].sourceRow).toBe(121);
  });
});

describe("diffAgainstKey", () => {
  const key = (n: number, a: string): KeyEntry => ({ number: n, answer: a });

  it("agrees when the derived letter matches the key", () => {
    const rows = diffAgainstKey([d({ number: 1, answer: "B" })], [key(1, "B")], 1, 1);
    expect(rows[0].verdict).toBe("AGREE");
  });

  it("disagrees on a different letter and carries the evidence a human needs", () => {
    const rows = diffAgainstKey(
      [d({ number: 1, answer: "B", confidence: "MED", reasoning: "runner-up is C" })],
      [key(1, "C")],
      1,
      1
    );
    expect(rows[0]).toMatchObject({
      verdict: "DISAGREE",
      derived: "B",
      key: "C",
      confidence: "MED",
      reasoning: "runner-up is C",
    });
  });

  it("is case- and whitespace-insensitive about the letters themselves", () => {
    const rows = diffAgainstKey([d({ answer: "b" })], [{ number: 1, answer: " B " }], 1, 1);
    expect(rows[0].verdict).toBe("AGREE");
  });

  it("reports a null derivation as a DISAGREE rather than silently matching", () => {
    // answer:null means "no printed option is correct" — a real finding. It must
    // never be read as "agrees with whatever the key says".
    const rows = diffAgainstKey([d({ answer: null })], [key(1, "A")], 1, 1);
    expect(rows[0].verdict).toBe("DISAGREE");
    expect(rows[0].derived).toBeNull();
  });

  it("distinguishes a missing KEY entry from a missing DERIVATION", () => {
    const rows = diffAgainstKey([d({ number: 1 })], [key(2, "A")], 1, 2);
    expect(rows.find((r) => r.number === 1)!.verdict).toBe("NO_KEY_ENTRY");
    expect(rows.find((r) => r.number === 2)!.verdict).toBe("NO_DERIVATION");
  });

  it("covers the whole declared range, not just the rows it was handed", () => {
    const rows = diffAgainstKey([], [], 1, 120);
    expect(rows).toHaveLength(120);
    expect(rows.every((r) => r.verdict === "NO_DERIVATION")).toBe(true);
  });
});

describe("sortForReview", () => {
  it("puts disagreements first and HIGH confidence at the top of them", () => {
    // HIGH first is deliberate: measured on UPSC papers here, HIGH ran
    // 1,337/1,358 while errors clustered in MED — so a HIGH disagreement is
    // where the KEY is most likely to be the defective one.
    const rows = diffAgainstKey(
      [
        d({ number: 1, answer: "A", confidence: "MED" }),
        d({ number: 2, answer: "A", confidence: "HIGH" }),
        d({ number: 3, answer: "A", confidence: "LOW" }),
        d({ number: 4, answer: "A", confidence: "HIGH" }),
      ],
      [
        { number: 1, answer: "B" },
        { number: 2, answer: "B" },
        { number: 3, answer: "B" },
        { number: 4, answer: "A" }, // agrees
      ],
      1,
      4
    );
    const order = sortForReview(rows).map((r) => r.number);
    expect(order).toEqual([2, 1, 3, 4]);
  });

  it("does not mutate its input", () => {
    const rows = diffAgainstKey([d({ answer: "A" })], [{ number: 1, answer: "B" }], 1, 2);
    const before = rows.map((r) => r.number);
    sortForReview(rows);
    expect(rows.map((r) => r.number)).toEqual(before);
  });
});
