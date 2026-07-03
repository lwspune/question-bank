import { describe, it, expect } from "vitest";
import { contentHash, subjectiveContentHash } from "@/lib/upload/hash";

describe("contentHash", () => {
  it("is deterministic for identical inputs", () => {
    const a = contentHash("Q1?", ["A1", "B1", "C1", "D1"], "A");
    const b = contentHash("Q1?", ["A1", "B1", "C1", "D1"], "A");
    expect(a).toBe(b);
  });

  it("ignores option ordering", () => {
    const a = contentHash("Q1?", ["A1", "B1", "C1", "D1"], "A");
    const b = contentHash("Q1?", ["D1", "C1", "B1", "A1"], "A");
    expect(a).toBe(b);
  });

  it("differs on different question text", () => {
    const a = contentHash("Q1?", ["A1", "B1", "C1", "D1"], "A");
    const b = contentHash("Q2?", ["A1", "B1", "C1", "D1"], "A");
    expect(a).not.toBe(b);
  });

  it("collapses whitespace in question text", () => {
    const a = contentHash("hello world", ["a", "b", "c", "d"], "A");
    const b = contentHash("  hello   world  ", ["a", "b", "c", "d"], "A");
    expect(a).toBe(b);
  });

  it("differs on different answer", () => {
    const a = contentHash("Q?", ["a", "b", "c", "d"], "A");
    const b = contentHash("Q?", ["a", "b", "c", "d"], "B");
    expect(a).not.toBe(b);
  });

  it("returns a hex sha256 string", () => {
    const a = contentHash("Q?", ["a", "b", "c", "d"], "A");
    expect(a).toMatch(/^[0-9a-f]{64}$/);
  });
});

describe("subjectiveContentHash", () => {
  it("is deterministic and returns a hex sha256 string", () => {
    const a = subjectiveContentHash("Write the negation of p ∧ q", null);
    const b = subjectiveContentHash("Write the negation of p ∧ q", null);
    expect(a).toBe(b);
    expect(a).toMatch(/^[0-9a-f]{64}$/);
  });

  it("collapses whitespace in text and context", () => {
    const a = subjectiveContentHash("hello   world", "the  instruction");
    const b = subjectiveContentHash("  hello world ", " the instruction ");
    expect(a).toBe(b);
  });

  it("differs on different stem text", () => {
    expect(subjectiveContentHash("p ∧ q", "Negate:")).not.toBe(
      subjectiveContentHash("p ∨ q", "Negate:")
    );
  });

  it("differs on different context — set-sibling disambiguation", () => {
    // Same bare sub-item text under two different instructions must NOT collide
    // (context is the disambiguator for set-based subjective questions).
    expect(subjectiveContentHash("p ∧ q", "Negate:")).not.toBe(
      subjectiveContentHash("p ∧ q", "Simplify:")
    );
  });

  it("treats null and empty-string context the same", () => {
    expect(subjectiveContentHash("stem", null)).toBe(
      subjectiveContentHash("stem", "")
    );
  });

  it("is namespaced away from an MCQ hash with the same stem", () => {
    // A subjective question and an MCQ that happen to share a stem must never
    // collide (they'd dedup against each other under the per-exam unique index).
    const stem = "Which of the following is true?";
    expect(subjectiveContentHash(stem, null)).not.toBe(
      contentHash(stem, [], "")
    );
  });
});
