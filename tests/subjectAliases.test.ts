import { describe, it, expect } from "vitest";
import {
  normalizeSubjectName,
  subjectMatchKeys,
} from "@/lib/upload/subjectAliases";

describe("normalizeSubjectName", () => {
  it("lowercases", () => {
    expect(normalizeSubjectName("MATHS")).toBe("maths");
    expect(normalizeSubjectName("Maths")).toBe("maths");
  });

  it("trims and collapses internal whitespace", () => {
    expect(normalizeSubjectName("  Maths  ")).toBe("maths");
    expect(normalizeSubjectName("Current  Affairs")).toBe("current affairs");
    expect(normalizeSubjectName("\tMaths\n")).toBe("maths");
  });

  it("returns empty string for empty / whitespace-only input", () => {
    expect(normalizeSubjectName("")).toBe("");
    expect(normalizeSubjectName("   ")).toBe("");
  });

  it("preserves spaces between distinct words", () => {
    expect(normalizeSubjectName("Current Affairs")).toBe("current affairs");
  });
});

describe("subjectMatchKeys — math family", () => {
  it("Maths returns the math family in canonical-first order", () => {
    expect(subjectMatchKeys("Maths")).toEqual(["maths", "mathematics", "math"]);
  });

  it("Mathematics returns the same family", () => {
    expect(subjectMatchKeys("Mathematics")).toEqual([
      "mathematics",
      "maths",
      "math",
    ]);
  });

  it("Math (abbreviated) returns the family", () => {
    expect(subjectMatchKeys("Math")).toEqual(["math", "maths", "mathematics"]);
  });

  it("case + whitespace variants resolve to the same family", () => {
    expect(subjectMatchKeys("MATHS")).toEqual([
      "maths",
      "mathematics",
      "math",
    ]);
    expect(subjectMatchKeys(" mathematics ")).toEqual([
      "mathematics",
      "maths",
      "math",
    ]);
  });
});

describe("subjectMatchKeys — single-token families", () => {
  it("Physics returns physics + phy", () => {
    expect(subjectMatchKeys("Physics")).toEqual(["physics", "phy"]);
    expect(subjectMatchKeys("Phy")).toEqual(["phy", "physics"]);
  });

  it("Chemistry returns chemistry + chem", () => {
    expect(subjectMatchKeys("Chemistry")).toEqual(["chemistry", "chem"]);
  });

  it("Biology returns biology + bio", () => {
    expect(subjectMatchKeys("Biology")).toEqual(["biology", "bio"]);
  });
});

describe("subjectMatchKeys — unknowns", () => {
  it("returns the normalized input as a single-element array", () => {
    expect(subjectMatchKeys("History")).toEqual(["history"]);
    expect(subjectMatchKeys("Geography")).toEqual(["geography"]);
    expect(subjectMatchKeys("Quantum Physics XYZ")).toEqual([
      "quantum physics xyz",
    ]);
  });

  it("returns empty for whitespace-only", () => {
    expect(subjectMatchKeys("   ")).toEqual([]);
  });
});
