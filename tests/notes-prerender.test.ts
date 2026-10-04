import { describe, it, expect, afterEach, beforeEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { notesPrerenderParams } from "@/lib/notes/prerender";

// A local build prerenders ONE subtopic page per notes chapter. The full set
// is built when the push changes notes (the pre-push hook sets
// NOTES_FULL_PRERENDER=1) and always on Vercel. Why: on 2026-10-04 two
// back-to-back local builds took the production database down, and the 1,352
// notes subtopic pages were the bulk of every build's queries.

describe("notesPrerenderParams", () => {
  const slugs = ["fundamentals", "mean", "median"] as const;

  it("returns only the first subtopic on a normal build", () => {
    expect(notesPrerenderParams(slugs, false)).toEqual([{ subtopicSlug: "fundamentals" }]);
  });

  it("returns every subtopic on a full build", () => {
    expect(notesPrerenderParams(slugs, true)).toEqual([
      { subtopicSlug: "fundamentals" },
      { subtopicSlug: "mean" },
      { subtopicSlug: "median" },
    ]);
  });

  it("returns nothing for a chapter with no subtopics", () => {
    expect(notesPrerenderParams([], false)).toEqual([]);
    expect(notesPrerenderParams([], true)).toEqual([]);
  });

  describe("reads the environment when no flag is passed", () => {
    const saved = {
      full: process.env.NOTES_FULL_PRERENDER,
      vercel: process.env.VERCEL,
    };
    function restore(name: string, value: string | undefined) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
    beforeEach(() => {
      delete process.env.NOTES_FULL_PRERENDER;
      delete process.env.VERCEL;
    });
    afterEach(() => {
      restore("NOTES_FULL_PRERENDER", saved.full);
      restore("VERCEL", saved.vercel);
    });

    it("is full when NOTES_FULL_PRERENDER is 1", () => {
      process.env.NOTES_FULL_PRERENDER = "1";
      expect(notesPrerenderParams(slugs)).toHaveLength(3);
    });

    it("is the sample when neither variable is set", () => {
      expect(notesPrerenderParams(slugs)).toHaveLength(1);
    });

    it("is the sample for any other NOTES_FULL_PRERENDER value", () => {
      process.env.NOTES_FULL_PRERENDER = "true";
      expect(notesPrerenderParams(slugs)).toHaveLength(1);
    });

    // The live site keeps every page prebuilt: a page built on first visit
    // costs that visitor ~2-2.6 s, and Vercel drops those copies on every
    // deploy, so Google would nearly always be the slow first visitor (the
    // /questions finding of 2026-09-17).
    it("is full on a Vercel build", () => {
      process.env.VERCEL = "1";
      expect(notesPrerenderParams(slugs)).toHaveLength(3);
    });
  });
});

// Every chapter's route file is a copy of another (the notes-pipeline scripts
// clone an existing one), so one file on the old pattern would spread to every
// chapter registered after it and the build load would creep back.
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

  it("finds the subtopic routes", () => {
    expect(routes.length).toBeGreaterThan(200);
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
