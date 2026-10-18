/**
 * iOS Safari zooms the page in when a text box under 16px gets focus, and
 * leaves it zoomed: the V chat panel then ran off the right edge of the
 * phone (owner screenshot, 2026-10-18: send button, message bubble and the
 * privacy line all cut off). Every text box on the site was 14px (`text-sm`,
 * the shared Input included), so every form zoomed, not only V.
 *
 * The fix is ONE rule in globals.css rather than 70-odd className edits, so
 * a text box added later is covered without anyone remembering. This repo has
 * no jsdom, so the contract is pinned by reading the stylesheet:
 *   - it applies on touch screens (pointer: coarse), where the zoom happens;
 *   - it reaches input, textarea and select at 16px or more;
 *   - it outranks a Tailwind text-size utility (one class, specificity 0,1,0)
 *     by specificity, not by source order, which Tailwind's layers can move.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(__dirname, "..", "src", "app", "globals.css"), "utf8");

/** The body of the first `@media (pointer: coarse)` block, braces balanced. */
function coarseBlock(source: string): string | null {
  const start = source.search(/@media\s*\(pointer:\s*coarse\)\s*\{/);
  if (start < 0) return null;
  const open = source.indexOf("{", start);
  let depth = 0;
  for (let i = open; i < source.length; i++) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}" && --depth === 0) return source.slice(open + 1, i);
  }
  return null;
}

describe("text boxes are 16px on touch screens (no iOS focus zoom)", () => {
  const block = coarseBlock(css);

  it("has a pointer: coarse block", () => {
    expect(block).not.toBeNull();
  });

  it("sets 16px or more on input, textarea and select", () => {
    const rule = block!.match(/([^{}]+)\{([^{}]*font-size:\s*(\d+)px[^{}]*)\}/);
    expect(rule).not.toBeNull();
    const [, selector, , px] = rule!;
    expect(Number(px)).toBeGreaterThanOrEqual(16);
    for (const el of ["input", "textarea", "select"]) expect(selector).toMatch(new RegExp(`\\b${el}\\b`));
  });

  it("outranks a single utility class by specificity (a pseudo-class before the elements)", () => {
    const selector = block!.match(/([^{}]+)\{[^{}]*font-size/)![1].trim();
    expect(selector.startsWith(":root")).toBe(true);
  });

  it("leaves checkboxes, radios and sliders alone", () => {
    const selector = block!.match(/([^{}]+)\{[^{}]*font-size/)![1];
    for (const t of ["checkbox", "radio", "range"]) expect(selector).toContain(t);
  });
});
