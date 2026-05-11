import { describe, it, expect } from "vitest";
import { normalizeNewlines } from "@/lib/text/normalizeNewlines";

describe("normalizeNewlines", () => {
  it("returns empty strings unchanged", () => {
    expect(normalizeNewlines("")).toBe("");
  });

  it("returns text without literal backslash-n unchanged", () => {
    const input = "Plain text with no escapes.";
    expect(normalizeNewlines(input)).toBe(input);
  });

  it("converts a literal \\n between plain words into a real newline", () => {
    expect(normalizeNewlines("hello\\nworld")).toBe("hello\nworld");
  });

  it("converts \\n\\n into two real newlines", () => {
    expect(normalizeNewlines("statements:\\n\\n(I).")).toBe(
      "statements:\n\n(I)."
    );
  });

  it("converts \\n followed by a capital letter (e.g. \\nHow)", () => {
    // The previously-rendered ":\\n\\nHow many" should become two real newlines.
    expect(normalizeNewlines("if k = 0.\\n\\nHow many")).toBe(
      "if k = 0.\n\nHow many"
    );
  });

  it("preserves \\neq inside \\(...\\) math zones", () => {
    const input = "Given \\(r \\neq 1\\), find r.";
    expect(normalizeNewlines(input)).toBe(input);
  });

  it("preserves \\n-like commands inside block math \\[...\\]", () => {
    const input = "\\[a \\neq b\\]";
    expect(normalizeNewlines(input)).toBe(input);
  });

  it("preserves math inside $...$ inline delimiters", () => {
    const input = "Inline $x \\neq 0$ here.";
    expect(normalizeNewlines(input)).toBe(input);
  });

  it("preserves math inside $$...$$ block delimiters", () => {
    const input = "$$x \\neq 0$$";
    expect(normalizeNewlines(input)).toBe(input);
  });

  it("converts \\n in surrounding text while preserving interleaved math", () => {
    const input = "\\(x \\neq 0\\)\\n\\n(I). next";
    expect(normalizeNewlines(input)).toBe("\\(x \\neq 0\\)\n\n(I). next");
  });

  it("does not touch \\\\ (LaTeX double-backslash, e.g. matrix row separator)", () => {
    const input = "\\(\\begin{matrix} a \\\\ b \\end{matrix}\\)";
    expect(normalizeNewlines(input)).toBe(input);
  });

  it("is idempotent (applying twice equals applying once)", () => {
    const input = "hello\\nworld with \\(x \\neq 0\\) and \\n\\n(I).";
    const once = normalizeNewlines(input);
    const twice = normalizeNewlines(once);
    expect(twice).toBe(once);
  });

  it("handles the real determinant question end-to-end", () => {
    const input =
      "Consider the following statements in respect of the determinant " +
      "\\(\\Delta = \\begin{vmatrix} k & (k+2) & 2k+1 \\\\ 1 & 2k+1 & k+2 \\\\ 1 & 3 & 3 & 1 \\end{vmatrix}\\):" +
      "\\n\\n(I). \\(\\Delta\\) is positive if \\(k>0\\)." +
      "\\n(II). \\(\\Delta\\) is negative if \\(k<0\\)." +
      "\\n(III). \\(\\Delta\\) is zero if \\(k=0\\)." +
      "\\n\\nHow many of the statements given above are correct?";
    const expected =
      "Consider the following statements in respect of the determinant " +
      "\\(\\Delta = \\begin{vmatrix} k & (k+2) & 2k+1 \\\\ 1 & 2k+1 & k+2 \\\\ 1 & 3 & 3 & 1 \\end{vmatrix}\\):" +
      "\n\n(I). \\(\\Delta\\) is positive if \\(k>0\\)." +
      "\n(II). \\(\\Delta\\) is negative if \\(k<0\\)." +
      "\n(III). \\(\\Delta\\) is zero if \\(k=0\\)." +
      "\n\nHow many of the statements given above are correct?";
    expect(normalizeNewlines(input)).toBe(expected);
  });
});
