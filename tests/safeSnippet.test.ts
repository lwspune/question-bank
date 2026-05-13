import { describe, it, expect } from "vitest";
import { safeSnippet } from "@/lib/text/safeSnippet";

describe("safeSnippet", () => {
  it("returns the input unchanged when shorter than maxLen", () => {
    expect(safeSnippet("Short text", 100)).toBe("Short text");
  });

  it("returns the input unchanged when exactly maxLen", () => {
    const s = "a".repeat(50);
    expect(safeSnippet(s, 50)).toBe(s);
  });

  it("truncates with ellipsis when longer than maxLen", () => {
    const s = "a".repeat(60);
    const out = safeSnippet(s, 40);
    expect(out.endsWith("…")).toBe(true);
    expect(out.length).toBeLessThanOrEqual(41); // 40 chars + ellipsis
  });

  it("never truncates inside a paren math delimiter \\(…\\)", () => {
    // Cut point lands inside the math block; helper should retreat to before \(.
    const text =
      "Evaluate the integral \\(\\int_0^{\\pi/2} \\sin(2x)\\cos(3x)\\,dx\\) and report.";
    const out = safeSnippet(text, 30);
    // Should not contain a half-open \( without a matching close
    const openCount = (out.match(/\\\(/g) ?? []).length;
    const closeCount = (out.match(/\\\)/g) ?? []).length;
    expect(openCount).toBe(closeCount);
  });

  it("never truncates inside a bracket math delimiter \\[…\\]", () => {
    const text =
      "First \\[\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}\\] which is well known.";
    const out = safeSnippet(text, 25);
    const openCount = (out.match(/\\\[/g) ?? []).length;
    const closeCount = (out.match(/\\\]/g) ?? []).length;
    expect(openCount).toBe(closeCount);
  });

  it("never truncates inside a single-dollar math delimiter $…$", () => {
    const text = "Recall that $a^2 + b^2 = c^2$ holds for right triangles.";
    const out = safeSnippet(text, 20);
    const dollars = (out.match(/\$/g) ?? []).length;
    expect(dollars % 2).toBe(0);
  });

  it("never truncates inside a double-dollar math delimiter $$…$$", () => {
    const text = "Display math: $$\\int_a^b f(x)\\,dx$$ is the area.";
    const out = safeSnippet(text, 22);
    // Count $$ as a single delim
    const doubleDollars = (out.match(/\$\$/g) ?? []).length;
    expect(doubleDollars % 2).toBe(0);
  });

  it("keeps the truncated body terminated cleanly (no trailing partial delimiter)", () => {
    const text = "Find x where \\(2x + 1 = 5\\), then verify.";
    // maxLen lands right in the middle of \(
    const out = safeSnippet(text, 14);
    expect(out).not.toMatch(/\\\($/);
    expect(out).not.toMatch(/\\$/);
  });

  it("returns input unchanged when text has no math at all", () => {
    const text = "Plain old text with no math anywhere in this sentence.";
    expect(safeSnippet(text, 1000)).toBe(text);
  });

  it("handles empty string", () => {
    expect(safeSnippet("", 10)).toBe("");
  });
});
