import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The page must never drag sideways on a phone.
 *
 * 2026-10-05: a Clarity recording showed an MPSC chapter page sliding left
 * under the student's thumb. One button label ("Sit an MPSC State Services
 * Prelims paper as a timed mock") could not wrap, so the page was wider than
 * the screen, and any slightly slanted swipe panned it. One too-wide element
 * anywhere is enough, so the guard sits on html + body, not on a page.
 *
 * `clip`, not `hidden`: `hidden` makes the element a scroll container, which
 * breaks `position: sticky` on the header. `clip` cuts the overflow without
 * that side effect.
 */
const css = readFileSync(join(process.cwd(), "src", "app", "globals.css"), "utf8");

describe("no sideways drag", () => {
  it("clips horizontal overflow on html and body", () => {
    expect(css).toMatch(/html\s*,\s*body\s*\{[^}]*overflow-x:\s*clip/);
  });

  it("never uses overflow-x: hidden on html or body (breaks the sticky header)", () => {
    expect(css).not.toMatch(/(html|body)[^{]*\{[^}]*overflow-x:\s*hidden/);
  });
});
