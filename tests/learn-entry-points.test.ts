import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { footerLinks } from "@/lib/nav/footerLinks";

/**
 * Where Learn is reachable from (owner, 2026-11-08). The experiment read 3
 * students mastering a concept and none returning on a second day, so Learn
 * keeps ONE way in: the avatar (account) menu. The footer link and the board
 * chapter link were removed. The pages and their sitemap entries stay, so the
 * owner can revisit it (one idea: V teaching a concept from a lesson).
 */
const src = (p: string) => readFileSync(join(process.cwd(), p), "utf8");

describe("Learn entry points", () => {
  it("is not in the footer", () => {
    const hrefs = footerLinks().flatMap((g) => g.links.map((l) => l.href));
    expect(hrefs.filter((h) => h === "/learn" || h.startsWith("/learn/"))).toEqual([]);
  });

  it("is not linked from a board chapter page", () => {
    expect(src("src/app/board/[examSlug]/[subjectRoute]/[chapterSlug]/page.tsx")).not.toMatch(/LearnChapterLink/);
  });

  it("keeps its avatar menu entry", () => {
    expect(src("src/components/UserMenu.tsx")).toMatch(/href=\{learnHref\}/);
  });
});
