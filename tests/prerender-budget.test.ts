/**
 * A production build pre-builds only the pages people read (TECH_DEBT_SPEC.md 2.3, owner decision
 * D2 option c, 2026-11-05): notes subtopic pages, formula chapter pages and board chapters with 2+
 * views in 18 days. The rest render on their first visit and are cached for a day.
 *
 * WHY: the deploy build pre-built 5,187 pages in 19 minutes, and most were never read in the
 * window (notes subtopics 1,351 of 2,314 with zero views, formula 276 of 397, board 110 of 390).
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { HOT_BOARD_CHAPTERS, HOT_FORMULA_PAGES, HOT_NOTES_SUBTOPICS } from "@/lib/seo/prerenderHotPaths";
import { hotOnly, prerenderBudgetActive } from "@/lib/seo/prerenderBudget";
import { notesPrerenderMode, notesPrerenderParams } from "@/lib/notes/prerender";
import { NOTES_CHAPTER_INDEX } from "@/lib/notes/chapterIndex";

describe("prerenderBudgetActive", () => {
  it("is on for a Vercel build", () => {
    expect(prerenderBudgetActive({ VERCEL: "1" })).toBe(true);
  });
  it("is off locally, so a local build is unchanged", () => {
    expect(prerenderBudgetActive({})).toBe(false);
  });
  it("PRERENDER_ALL=1 turns it off on Vercel (the way back)", () => {
    expect(prerenderBudgetActive({ VERCEL: "1", PRERENDER_ALL: "1" })).toBe(false);
  });
});

describe("hotOnly", () => {
  const pages = [{ p: "a/b/c" }, { p: "a/b/d" }, { p: "x/y/z" }];
  it("keeps only listed pages when active", () => {
    expect(hotOnly(pages, (x) => x.p, ["a/b/d", "gone/page/x"], true)).toEqual([{ p: "a/b/d" }]);
  });
  it("keeps every page when not active", () => {
    expect(hotOnly(pages, (x) => x.p, ["a/b/d"], false)).toEqual(pages);
  });
});

describe("notesPrerenderMode", () => {
  it("samples locally, keeps hot pages on Vercel, builds all on request", () => {
    expect(notesPrerenderMode({})).toBe("sample");
    expect(notesPrerenderMode({ VERCEL: "1" })).toBe("hot");
    expect(notesPrerenderMode({ VERCEL: "1", PRERENDER_ALL: "1" })).toBe("all");
    expect(notesPrerenderMode({ NOTES_FULL_PRERENDER: "1" })).toBe("all");
    expect(notesPrerenderMode({ NOTES_FULL_PRERENDER: "true" })).toBe("sample");
  });
});

describe("notesPrerenderParams in hot mode", () => {
  const slugs = ["fundamentals", "mean", "median"] as const;
  it("keeps the first subtopic (a render check per chapter) plus the hot ones", () => {
    expect(notesPrerenderParams("s/c", slugs, "hot", ["s/c/median", "s/other/mean"])).toEqual([
      { subtopicSlug: "fundamentals" },
      { subtopicSlug: "median" },
    ]);
  });
  it("covers every hot notes page and no more than first-plus-hot overall", () => {
    const built = new Set(
      NOTES_CHAPTER_INDEX.flatMap((c) => {
        const key = `${c.subjectRoute}/${c.chapterSlug}`;
        return notesPrerenderParams(key, c.slugs, "hot").map((p) => `${key}/${p.subtopicSlug}`);
      })
    );
    for (const p of HOT_NOTES_SUBTOPICS) expect(built.has(p), p).toBe(true);
    const firsts = NOTES_CHAPTER_INDEX.filter((c) => c.slugs.length > 0).length;
    expect(built.size).toBeLessThanOrEqual(HOT_NOTES_SUBTOPICS.length + firsts);
  });
});

describe("the hot lists", () => {
  for (const [name, list, parts] of [
    ["HOT_NOTES_SUBTOPICS", HOT_NOTES_SUBTOPICS, 3],
    ["HOT_FORMULA_PAGES", HOT_FORMULA_PAGES, 3],
    ["HOT_BOARD_CHAPTERS", HOT_BOARD_CHAPTERS, 3],
  ] as const) {
    it(`${name} is sorted, unique, and has no family prefix`, () => {
      expect([...list].sort()).toEqual(list);
      expect(new Set(list).size).toBe(list.length);
      for (const p of list) expect(p.split("/"), p).toHaveLength(parts);
    });
  }
});

describe("the three routes apply the budget", () => {
  const read = (rel: string) => fs.readFileSync(path.join(process.cwd(), rel), "utf8");
  it("formula chapter pages", () => {
    expect(read("src/app/formula/[slug]/[subjectSlug]/[chapterSlug]/page.tsx")).toMatch(/hotOnly\([\s\S]*HOT_FORMULA_PAGES/);
  });
  it("board chapter pages", () => {
    expect(read("src/app/board/[examSlug]/[subjectRoute]/[chapterSlug]/page.tsx")).toMatch(/hotOnly\([\s\S]*HOT_BOARD_CHAPTERS/);
  });
  it("the deploy build no longer forces every notes page", () => {
    expect(read(".github/workflows/deploy.yml")).not.toMatch(/NOTES_FULL_PRERENDER/);
  });
});
