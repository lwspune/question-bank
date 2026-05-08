import { describe, it, expect } from "vitest";
import { parseXlsx } from "@/lib/upload/parser";
import {
  goodXlsxBuffer,
  malformedHeaderXlsxBuffer,
} from "./fixtures/upload";

describe("parseXlsx", () => {
  it("parses the standard header + 5 rows from a good fixture", () => {
    const result = parseXlsx(goodXlsxBuffer());

    expect(result.rows).toHaveLength(5);
    expect(result.rows[0]).toMatchObject({
      sourceRow: 2,
      subject: "Physics",
      chapter: "Optics (Ray)",
      subtopic: "Lens Formula and Magnification",
      question: expect.stringContaining("convex lens"),
      optionA: "0.5 m",
      optionB: "0.166 m",
      optionC: "0.33 m",
      optionD: "1 m",
      answer: "A",
      difficulty: "Moderate",
      solution: expect.any(String),
    });
    expect(result.rows[4].sourceRow).toBe(6);
  });

  it("treats empty string columns as undefined for context/subtopic/solution", () => {
    const result = parseXlsx(goodXlsxBuffer());
    // Our fixture leaves Context as "" — the parser should normalize that.
    expect(result.rows[0].context).toBeUndefined();
  });

  it("throws when a required header column is missing", () => {
    expect(() => parseXlsx(malformedHeaderXlsxBuffer())).toThrow(/Answer/i);
  });
});
