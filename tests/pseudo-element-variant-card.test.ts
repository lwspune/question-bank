/**
 * globals.css gives cards their shadow with `:where(.bg-card.border.rounded-*)`
 * and `:where(a.bg-card.border)`. Tailwind treats those class names as part of
 * the utilities, so a variant on `bg-card` or `border` copies the whole rule.
 * Under a PSEUDO-ELEMENT variant (file:, before:, after:, placeholder: ...)
 * the copy ends in `::file-selector-button::file-selector-button...`, which the
 * production CSS parser rejects: the 2026-11-28 deploy failed on
 * `file:bg-card file:border` in the circle team-post form. A hover: or focus:
 * variant makes a valid selector, so only pseudo-elements are refused here.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const PSEUDO_ELEMENTS = ["file", "before", "after", "placeholder", "marker", "selection", "backdrop", "first-line", "first-letter"];
const CARD_CLASSES = ["bg-card", "border", "rounded-lg", "rounded-xl", "rounded-2xl"];
const BAD = new RegExp(`(?<![\\w-])(?:${PSEUDO_ELEMENTS.join("|")}):(?:${CARD_CLASSES.join("|")})(?![\\w-])`);

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? files(p) : /\.(tsx?|css)$/.test(name) ? [p] : [];
  });
}

describe("no pseudo-element variant on the card-shadow classes", () => {
  it("matches the bad shapes and leaves safe ones alone", () => {
    expect(BAD.test('className="file:bg-card"')).toBe(true);
    expect(BAD.test("file:border file:px-3")).toBe(true);
    expect(BAD.test("file:border-0 file:bg-transparent")).toBe(false);
    expect(BAD.test("hover:bg-card focus:border")).toBe(false);
  });

  it("finds none in src/", () => {
    const hits = files("src").filter((f) => BAD.test(readFileSync(f, "utf8")));
    expect(hits).toEqual([]);
  });
});
