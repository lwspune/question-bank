import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * The /play arcade theme is one dark look on every device, so its text colours
 * are checked here against WCAG AA (4.5:1), like the site's own tokens in
 * tests/theme-contrast.test.ts.
 */
const css = readFileSync(path.join(__dirname, "../src/app/play/arcade.css"), "utf8");

function token(name: string): string {
  const m = css.match(new RegExp(`--pa-${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`no --pa-${name}`);
  return m[1];
}

function lum(hex: string): number {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

const ratio = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

describe("arcade theme contrast", () => {
  const grounds = ["night", "night-2", "night-3"];
  const texts = ["ink", "ink-dim", "mango", "coral", "mint", "sky", "lilac", "lime"];

  it.each(grounds.flatMap((g) => texts.map((t) => [t, g])))("%s text on %s passes AA", (t, g) => {
    expect(ratio(token(t), token(g))).toBeGreaterThanOrEqual(4.5);
  });

  it("button and tile ink pass AA on their fills", () => {
    expect(ratio(token("mango-ink"), token("mango"))).toBeGreaterThanOrEqual(4.5);
    expect(ratio(token("mint-ink"), token("mint"))).toBeGreaterThanOrEqual(4.5);
  });
});
