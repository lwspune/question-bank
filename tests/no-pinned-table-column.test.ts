/**
 * No site-wide pinned first column (owner, 2026-11-11): "Remove that rule for
 * tables. Earlier tables were okay. This worsened the problem. No pinning
 * first column."
 *
 * A rule added 2026-11-10 pinned the first cell of EVERY table in a sideways
 * scroller on phones. With no width limit, a wide first column (a chapter
 * name and its Notes chip; a student's name, phone and email) took 45-70% of
 * a phone screen, the rest showed through cut off mid-word, and the pinned
 * cell painted white over its row's tint. This fails if globals.css pins a
 * table cell again. Tables that fix their own short label column in their own
 * markup (the trend grids) are theirs to decide and are not checked here.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8")
  // Comments may describe the old rule; only live CSS counts.
  .replace(/\/\*[\s\S]*?\*\//g, "");

describe("globals.css pins no table column", () => {
  it("has no site-wide sticky rule on table cells", () => {
    const blocks = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
    const pinned = blocks.filter(([, selector, body]) => /\b(td|th)\b/.test(selector) && /position\s*:\s*sticky/.test(body));
    expect(pinned.map(([, selector]) => selector.trim())).toEqual([]);
  });
});
