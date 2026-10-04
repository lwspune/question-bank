import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { readTokens, hslToRgb, hexToRgb, contrastRatio, channelDistance } from "../src/lib/theme/contrast";

/**
 * The colour tokens in globals.css, checked as they ship.
 *
 * 2026-10-04: the theme moved off the stock shadcn slate palette (white page,
 * white cards, near-black buttons, a user called it "black and white") onto
 * the logo's colours: navy text and dark buttons, royal-blue brand, a tinted
 * page under white cards, a navy dark mode. Two things must hold after any
 * later edit to those tokens:
 *
 * 1. Every text/background pair the UI actually uses clears WCAG AA (4.5:1),
 *    in BOTH modes. That is the project accessibility rule, made automatic.
 * 2. The brand stays the logo's royal blue and the text stays the logo's navy,
 *    so the site and the V mark cannot drift apart again.
 */
const css = readFileSync(join(process.cwd(), "src", "app", "globals.css"), "utf8");
const modes = { light: readTokens(css, ":root"), dark: readTokens(css, ".dark") } as const;
const rgb = (mode: keyof typeof modes, token: string) => hslToRgb(modes[mode][token]);

const PAIRS: [text: string, bg: string][] = [
  ["foreground", "background"],
  ["foreground", "card"],
  ["card-foreground", "card"],
  ["popover-foreground", "popover"],
  ["muted-foreground", "background"],
  ["muted-foreground", "card"],
  ["muted-foreground", "muted"],
  ["primary-foreground", "primary"],
  ["secondary-foreground", "secondary"],
  ["accent-foreground", "accent"],
  ["brand-foreground", "brand"],
  ["brand-accent", "background"],
  ["brand-accent", "card"],
];

describe("theme tokens clear WCAG AA in both modes", () => {
  for (const mode of ["light", "dark"] as const) {
    for (const [text, bg] of PAIRS) {
      it(`${mode}: --${text} on --${bg}`, () => {
        expect(contrastRatio(rgb(mode, text), rgb(mode, bg))).toBeGreaterThanOrEqual(4.5);
      });
    }
  }
});

describe("theme tokens follow the logo", () => {
  it("the light-mode brand fill is the logo's royal blue (#1D4ED8)", () => {
    expect(channelDistance(rgb("light", "brand"), hexToRgb("#1D4ED8"))).toBeLessThanOrEqual(3);
  });

  it("light-mode text is the logo's navy (#0F1D4A), not near-black", () => {
    expect(channelDistance(rgb("light", "foreground"), hexToRgb("#0F1D4A"))).toBeLessThanOrEqual(3);
  });

  it("the page is tinted so white cards stand off it", () => {
    expect(modes.light.background).not.toBe(modes.light.card);
    expect(channelDistance(rgb("light", "card"), [255, 255, 255])).toBe(0);
  });

  it("dark mode sits on navy, not slate black", () => {
    const [r, g, b] = rgb("dark", "background");
    expect(b).toBeGreaterThan(r + 25);
    expect(b).toBeGreaterThan(g + 15);
  });
});
