import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { EXAM_REGISTRY } from "../src/lib/exam/examContext";
import { examRobots } from "../src/lib/seo/examRobots";

describe("examRobots", () => {
  it("keeps a flagged exam's pages indexed but its images out of image search", () => {
    expect(examRobots("uceed")).toEqual({ index: true, follow: true, noimageindex: true });
  });

  it("adds nothing for an exam without the flag, or an unknown slug", () => {
    expect(examRobots("nda")).toBeUndefined();
    expect(examRobots("no-such-exam")).toBeUndefined();
  });

  it("covers every flagged exam in the registry", () => {
    for (const e of EXAM_REGISTRY.filter((x) => x.noImageIndex)) {
      expect(examRobots(e.slug)?.noimageindex).toBe(true);
    }
  });
});

/**
 * The flag only works if every indexable page that shows an exam's questions reads it. Today that
 * is the /questions chapter page alone; a new /questions page rendering QuestionList must too.
 */
describe("every /questions page that shows questions sets the exam's robots", () => {
  const pages: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (name === "page.tsx") pages.push(p);
    }
  };
  walk(join(__dirname, "..", "src", "app", "questions"));

  it("finds the chapter page", () => {
    expect(pages.some((p) => p.includes("[chapterSlug]"))).toBe(true);
  });

  for (const page of pages) {
    const src = readFileSync(page, "utf8");
    if (!src.includes("QuestionList")) continue;
    it(`${page.split("src")[1]} calls examRobots`, () => {
      expect(src).toMatch(/examRobots\(/);
    });
  }
});
