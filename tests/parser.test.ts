import { describe, it, expect } from "vitest";
import { parseXlsx } from "@/lib/upload/parser";
import {
  customXlsxBuffer,
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

  it("converts literal \\n to real newlines while preserving math zones", () => {
    // Author typed `\n` (two chars) in Excel cells instead of Alt+Enter.
    // After parsing, those should be real newline characters; LaTeX commands
    // beginning `\n` (e.g. `\neq`) inside math must stay untouched.
    const buf = customXlsxBuffer([
      [
        1,
        "Maths",
        "MHT-CET",
        "Algebra",
        "Roots",
        "Premise:\\n\\nDetails follow.",
        "Given \\(r \\neq 1\\),\\nfind r.",
        "\\(x\\)\\nfirst",
        "\\(y\\)\\nsecond",
        "\\(z\\)\\nthird",
        "\\(w\\)\\nfourth",
        "A",
        "Solution\\nstep 1\\nstep 2",
        "Moderate",
      ],
    ]);
    const result = parseXlsx(buf);
    const row = result.rows[0];

    expect(row.question).toBe("Given \\(r \\neq 1\\),\nfind r.");
    expect(row.context).toBe("Premise:\n\nDetails follow.");
    expect(row.optionA).toBe("\\(x\\)\nfirst");
    expect(row.optionB).toBe("\\(y\\)\nsecond");
    expect(row.optionC).toBe("\\(z\\)\nthird");
    expect(row.optionD).toBe("\\(w\\)\nfourth");
    expect(row.solution).toBe("Solution\nstep 1\nstep 2");
  });
});
