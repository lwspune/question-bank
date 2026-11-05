/**
 * Every guide playbook detail page is a thin settings file over one of the shared routes
 * (TECH_DEBT_SPEC.md 3.1, 2026-11-05).
 *
 * WHY: the 14 page files were copies (248-335 lines each, 14-60 lines apart within a group), so
 * a fix had to be made up to seven times and a new guide started by copying one. They now pass
 * settings to playbookRouteNda / playbookRouteJee / playbookRouteCet; the HTML of all 224 pages
 * was compared before and after (identical). This test keeps a new guide from copying the old
 * page body back in.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const GUIDE = path.join(process.cwd(), "src", "app", "guide");
const pages = fs
  .readdirSync(GUIDE, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => path.join(GUIDE, d.name, "playbooks", "[slug]", "page.tsx"))
  .filter((f) => fs.existsSync(f));

describe("guide playbook pages", () => {
  it("finds the 14 playbook pages", () => {
    expect(pages.length).toBeGreaterThanOrEqual(14);
  });

  it("each one builds its route from a shared factory and stays a settings file", () => {
    const bad = pages
      .map((f) => ({ f: path.relative(process.cwd(), f), src: fs.readFileSync(f, "utf8") }))
      .filter(({ src }) => !/make(Nda|Jee|Cet)PlaybookRoute\(/.test(src) || src.split("\n").length > 60 || /<GuideShell/.test(src))
      .map(({ f }) => f);
    expect(bad).toEqual([]);
  });

  it("MHT-CET's route reads the lean notes index, never the notes registry", () => {
    const src = fs.readFileSync(path.join(GUIDE, "_components", "playbookRouteCet.tsx"), "utf8");
    expect(src).not.toMatch(/@\/lib\/notes\/chapters"/);
  });
});
