/**
 * /notes chapters and subtopics come from ONE dynamic route per subject (TECH_DEBT_SPEC.md 2.1-2.2).
 *
 * WHY: on 2026-11-05 the 522 chapter page files and 522 subtopic page files were identical apart
 * from the chapter slug, each a separate build entry, while the deploy build grew from about 18 to
 * 30 minutes in three weeks and ran out of memory on 2026-11-04. The NDA Maths trial served all 30
 * chapters from one route with the same head tags and visible text.
 */
import { describe, it, expect } from "vitest";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import { appPageExists } from "./helpers/appRoutes";

const NOTES = join(process.cwd(), "src", "app", "notes");
const SUBJECTS = [...new Set(NOTES_CHAPTERS.map((c) => c.subjectRoute))].sort();

describe("appPageExists", () => {
  it("resolves real notes pages and rejects made-up ones", () => {
    expect(appPageExists("/notes/nda-maths/statistics")).toBe(true);
    expect(appPageExists("/notes/nda-maths/statistics/central-tendency")).toBe(true);
    expect(appPageExists("/notes/nda-maths/not-a-chapter")).toBe(false);
    expect(appPageExists("/notes/nda-maths/statistics/not-a-subtopic")).toBe(false);
  });

  it("resolves ordinary static and dynamic routes", () => {
    expect(appPageExists("/browse")).toBe(true);
    expect(appPageExists("/no-such-page")).toBe(false);
  });
});

describe("notes subjects use the shared routes", () => {
  it("every subject has a chapter route that serves only registered chapters", () => {
    const bad = SUBJECTS.filter((s) => {
      const f = join(NOTES, s, "[chapterSlug]", "page.tsx");
      if (!existsSync(f)) return true;
      const src = readFileSync(f, "utf8");
      return !src.includes(`makeChapterRoute("${s}")`) || !/export const dynamicParams = false;/.test(src);
    });
    expect(bad).toEqual([]);
  });

  it("every subject has a subtopic route", () => {
    const bad = SUBJECTS.filter((s) => {
      const f = join(NOTES, s, "[chapterSlug]", "[subtopicSlug]", "page.tsx");
      return !existsSync(f) || !readFileSync(f, "utf8").includes(`makeSubtopicRoute("${s}")`);
    });
    expect(bad).toEqual([]);
  });

  it("no per-chapter page file is left beside the shared route", () => {
    const left: string[] = [];
    for (const s of SUBJECTS) {
      for (const e of readdirSync(join(NOTES, s), { withFileTypes: true })) {
        if (!e.isDirectory() || e.name.startsWith("[") || e.name.startsWith("_")) continue;
        for (const f of [join(NOTES, s, e.name, "page.tsx"), join(NOTES, s, e.name, "[subtopicSlug]", "page.tsx")]) {
          if (existsSync(f)) left.push(`${s}/${e.name}`);
        }
      }
    }
    expect([...new Set(left)]).toEqual([]);
  });
});
