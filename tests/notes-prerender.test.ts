import { describe, it, expect, afterEach, beforeEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { notesPrerenderParams } from "@/lib/notes/prerender";

// A local build prerenders ONE subtopic page per notes chapter; a Vercel build
// prerenders that one plus every subtopic read 2+ times in the measured window
// (tests/prerender-budget.test.ts); NOTES_FULL_PRERENDER=1 or PRERENDER_ALL=1
// builds them all. Why the local sample: on 2026-10-04 two back-to-back local
// builds took the production database down, and the notes subtopic pages were
// the bulk of every build's queries.

describe("notesPrerenderParams", () => {
  const slugs = ["fundamentals", "mean", "median"] as const;

  it("returns only the first subtopic on a normal build", () => {
    expect(notesPrerenderParams("s/c", slugs, "sample")).toEqual([{ subtopicSlug: "fundamentals" }]);
  });

  it("returns every subtopic on a full build", () => {
    expect(notesPrerenderParams("s/c", slugs, "all")).toEqual([
      { subtopicSlug: "fundamentals" },
      { subtopicSlug: "mean" },
      { subtopicSlug: "median" },
    ]);
  });

  it("returns nothing for a chapter with no subtopics", () => {
    for (const mode of ["sample", "hot", "all"] as const) expect(notesPrerenderParams("s/c", [], mode)).toEqual([]);
  });

  describe("reads the environment when no mode is passed", () => {
    const names = ["NOTES_FULL_PRERENDER", "VERCEL", "PRERENDER_ALL"] as const;
    const saved = Object.fromEntries(names.map((n) => [n, process.env[n]]));
    beforeEach(() => {
      for (const n of names) delete process.env[n];
    });
    afterEach(() => {
      for (const n of names) {
        if (saved[n] === undefined) delete process.env[n];
        else process.env[n] = saved[n];
      }
    });

    it("is full when NOTES_FULL_PRERENDER is 1", () => {
      process.env.NOTES_FULL_PRERENDER = "1";
      expect(notesPrerenderParams("s/c", slugs)).toHaveLength(3);
    });

    it("is the sample when no variable is set", () => {
      expect(notesPrerenderParams("s/c", slugs)).toHaveLength(1);
    });

    it("is the sample for any other NOTES_FULL_PRERENDER value", () => {
      process.env.NOTES_FULL_PRERENDER = "true";
      expect(notesPrerenderParams("s/c", slugs)).toHaveLength(1);
    });

    // Since 2026-11-05 a Vercel build keeps only pages people read (TECH_DEBT_SPEC.md 2.3):
    // the first subtopic of every chapter plus the hot list. This chapter is not on it.
    it("is the first subtopic plus hot pages on a Vercel build", () => {
      process.env.VERCEL = "1";
      expect(notesPrerenderParams("s/c", slugs)).toHaveLength(1);
      process.env.PRERENDER_ALL = "1";
      expect(notesPrerenderParams("s/c", slugs)).toHaveLength(3);
    });
  });
});

// Every subject's route file is a copy of another (a new subject copies
// nda-maths/[chapterSlug]), so one file on the old pattern would spread to every
// subject added after it and the build load would creep back. Since 2026-11-05
// there is one subtopic route per SUBJECT (TECH_DEBT_SPEC.md 2.2), not per chapter.
describe("every notes subtopic route uses the helper", () => {
  const root = path.join(process.cwd(), "src/app/notes");

  function subtopicRoutes(dir: string): string[] {
    const out: string[] = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (!entry.isDirectory()) continue;
      if (entry.name === "[subtopicSlug]") {
        const page = path.join(full, "page.tsx");
        if (fs.existsSync(page)) out.push(page);
      } else {
        out.push(...subtopicRoutes(full));
      }
    }
    return out;
  }

  const routes = subtopicRoutes(root);

  it("finds one subtopic route per notes subject", () => {
    expect(routes.length).toBeGreaterThanOrEqual(40);
    for (const file of routes) expect(file, file).toMatch(/\[chapterSlug\][\\/]\[subtopicSlug\]/);
  });

  it("every subject route builds its params through the shared helper", () => {
    const helper = fs.readFileSync(path.join(root, "_components", "notesRoutes.tsx"), "utf8");
    expect(helper).toMatch(/notesPrerenderParams\(`\$\{subjectRoute\}\/\$\{c\.chapterSlug\}`, c\.slugs\)/);
    for (const file of routes) expect(fs.readFileSync(file, "utf8"), file).toMatch(/makeSubtopicRoute\(/);
  });

  it("no route prerenders every subtopic directly", () => {
    const offenders = routes
      .filter((file) => {
        const src = fs.readFileSync(file, "utf8");
        if (!/export (async )?function generateStaticParams/.test(src)) return false;
        return !/notesPrerenderParams\(CHAPTER\.slugs\)/.test(src) || /\.slugs\.map\(/.test(src);
      })
      .map((file) => path.relative(process.cwd(), file));
    expect(offenders).toEqual([]);
  });
});
