/**
 * One ASCII slug rule (TECH_DEBT_SPEC.md 3.5).
 *
 * WHY: eight modules each wrote the same rule (lowercase, every run of other characters to one
 * "-", ends trimmed): guide ChapterBreakdownTable, board/query, mocks/sectional, papers/template,
 * and four inline copies this test found (ebooks/paperBooks, exam/homeChips, mocks/mocksNav,
 * practiceTests/config). Run over all 15,400 chapter, subtopic, subject and exam names on
 * 2026-11-05, the named four agreed on every name; the inline four are the same operations. questions/slugs' slugifyName is
 * DELIBERATELY separate: it also strips accents ("Kössel" -> "kossel", where this rule gives
 * "k-ssel"), it differs on 2 of those names, and /questions URLs are already indexed with it.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { slugify } from "@/lib/slug";
import { slugify as boardSlugify } from "@/lib/board/query";
import { slugifySectionKey } from "@/lib/papers/template";

describe("slugify", () => {
  it.each([
    ["Pair of Straight Lines", "pair-of-straight-lines"],
    ["  Work, Energy & Power  ", "work-energy-power"],
    ["Current Affairs", "current-affairs"],
    ["--A--B--", "a-b"],
    ["Kössel-Lewis", "k-ssel-lewis"],
    ["", ""],
  ])("%j -> %j", (input, out) => {
    expect(slugify(input)).toBe(out);
  });

  it("is the rule board/query and papers/template expose", () => {
    expect(boardSlugify).toBe(slugify);
    expect(slugifySectionKey).toBe(slugify);
  });

  it("no other module re-implements it", () => {
    const rule = /\.toLowerCase\(\)\s*(\.trim\(\)\s*)?\.replace\(\/\[\^a-z0-9\]\+\/g, "-"\)/;
    const own = path.join("src", "lib", "slug.ts");
    const scan = (dir: string): string[] =>
      fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name);
        return e.isDirectory() ? scan(p) : /\.(ts|tsx)$/.test(e.name) ? [p] : [];
      });
    const offenders = scan(path.join(process.cwd(), "src"))
      .filter((f) => path.relative(process.cwd(), f) !== own && path.relative(process.cwd(), f) !== path.join("src", "lib", "questions", "slugs.ts"))
      .filter((f) => rule.test(fs.readFileSync(f, "utf8").replace(/\s+/g, " ").replace(/ \./g, ".")))
      .map((f) => path.relative(process.cwd(), f));
    expect(offenders).toEqual([]);
  });
});
