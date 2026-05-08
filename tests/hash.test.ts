import { describe, it, expect } from "vitest";
import { contentHash } from "@/lib/upload/hash";

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
