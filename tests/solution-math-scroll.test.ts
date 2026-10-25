/**
 * A wide display equation in a solution scrolls sideways instead of being cut
 * off (owner, 2026-10-25: "fix it", after the before/after sheet showed the JEE
 * slab solution losing the end of its last line at 390 px). One rule in
 * globals.css covers every surface that renders BlockText with `solution`
 * (they all carry the solution-math class): /browse, mock review, drill,
 * /board, present mode, the Animated view's steps.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

function ruleFor(selector: string): string | null {
  const at = css.indexOf(`${selector} {`);
  if (at === -1) return null;
  return css.slice(at, css.indexOf("}", at));
}

describe("solution display equations on a phone", () => {
  it("scroll sideways", () => {
    const rule = ruleFor(".solution-math .katex-display");
    expect(rule, "a rule for .solution-math .katex-display").not.toBeNull();
    expect(rule).toMatch(/overflow-x:\s*auto/);
  });

  it("do not grow a vertical scrollbar, and keep room for tall fractions", () => {
    const rule = ruleFor(".solution-math .katex-display")!;
    expect(rule).toMatch(/overflow-y:\s*hidden/);
    // overflow-y: hidden clips at the padding edge, so a little vertical padding keeps
    // superscripts and stacked fractions from being shaved.
    expect(rule).toMatch(/padding-(block|top|bottom)/);
  });
});
