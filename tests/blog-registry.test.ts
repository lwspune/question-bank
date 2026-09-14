import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  BLOG_POSTS,
  BLOG_SLUGS,
  listPosts,
  postBySlug,
  type BlogPost,
} from "@/lib/blog/posts";
import { formatPostDate } from "@/lib/blog/format";
import {
  CHAPTERS_REPRESENTED,
  CHAPTER_SPLIT,
  MID_WEIGHT_BLOCK,
  PAPER,
  chaptersAtOrBelow,
  marksInTopChapters,
  questionsIn,
} from "@/app/blog/_posts/nda-2-2026-maths-paper-analysis/_data/stats";

const REPO_ROOT = join(__dirname, "..");

/** yyyy-mm-dd, and a real calendar date (so 2026-02-31 is rejected). */
function isIsoDay(s: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

describe("blog registry — shape", () => {
  it("has at least one post", () => {
    expect(BLOG_POSTS.length).toBeGreaterThan(0);
  });

  it("has unique slugs", () => {
    const slugs = BLOG_POSTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has URL-safe lowercase kebab slugs", () => {
    // The slug IS the public URL and goes straight into the sitemap. A stray
    // space or capital produces a 404 that only shows up after deploy.
    for (const p of BLOG_POSTS) {
      expect(p.slug, `slug ${JSON.stringify(p.slug)}`).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("BLOG_SLUGS mirrors the registry exactly", () => {
    expect([...BLOG_SLUGS].sort()).toEqual(BLOG_POSTS.map((p) => p.slug).sort());
  });

  it("carries a non-empty title and description on every post", () => {
    for (const p of BLOG_POSTS) {
      expect(p.title.trim().length, p.slug).toBeGreaterThan(0);
      expect(p.description.trim().length, p.slug).toBeGreaterThan(0);
    }
  });

  it("keeps descriptions inside the ~160 chars Google renders", () => {
    // Over-long descriptions get truncated mid-sentence in the SERP.
    for (const p of BLOG_POSTS) {
      expect(p.description.length, `${p.slug} description`).toBeLessThanOrEqual(160);
    }
  });

  it("declares a positive reading time", () => {
    for (const p of BLOG_POSTS) {
      expect(p.readingMinutes, p.slug).toBeGreaterThan(0);
    }
  });
});

describe("blog registry — dates", () => {
  it("uses real ISO calendar days", () => {
    for (const p of BLOG_POSTS) {
      expect(isIsoDay(p.datePublished), `${p.slug} datePublished`).toBe(true);
      if (p.dateModified) {
        expect(isIsoDay(p.dateModified), `${p.slug} dateModified`).toBe(true);
      }
    }
  });

  it("never reports a modification BEFORE publication", () => {
    // A dateModified older than datePublished emits contradictory BlogPosting
    // JSON-LD, which is worse than omitting the field.
    for (const p of BLOG_POSTS) {
      if (!p.dateModified) continue;
      expect(p.dateModified >= p.datePublished, p.slug).toBe(true);
    }
  });
});

describe("blog registry — lookup", () => {
  it("lists posts newest-first", () => {
    const dates = listPosts().map((p) => p.datePublished);
    expect([...dates].sort().reverse()).toEqual(dates);
  });

  it("returns every registered post from listPosts", () => {
    expect(listPosts().length).toBe(BLOG_POSTS.length);
  });

  it("round-trips every slug through postBySlug", () => {
    for (const p of BLOG_POSTS) {
      expect(postBySlug(p.slug)).toEqual(p);
    }
  });

  it("returns undefined for an unknown slug rather than throwing", () => {
    // /blog/[slug] calls notFound() on undefined; a throw would 500 instead.
    expect(postBySlug("no-such-post")).toBeUndefined();
  });
});

describe("blog registry — content modules", () => {
  it("has a content module on disk for every registered slug", () => {
    // The registry is metadata only; the body is a sibling TSX module. A post
    // registered without one builds clean and 500s on first request, because
    // /blog/[slug] is SSG'd from exactly this list.
    for (const p of BLOG_POSTS) {
      const path = join(REPO_ROOT, "src", "app", "blog", "_posts", p.slug, "content.tsx");
      expect(existsSync(path), `missing content.tsx for ${p.slug}`).toBe(true);
    }
  });

  it("wires every registered slug into the POST_CONTENTS map", () => {
    // A content.tsx on disk that nobody imported still 404s, because
    // /blog/[slug] looks the body up by slug. Read as TEXT rather than
    // imported so this stays a fast pure test and doesn't pull React and
    // KaTeX into the node runner.
    const map = readFileSync(
      join(REPO_ROOT, "src", "app", "blog", "_posts", "contents.ts"),
      "utf8"
    );
    for (const p of BLOG_POSTS) {
      expect(map, `POST_CONTENTS is missing ${p.slug}`).toContain(`"${p.slug}"`);
    }
  });
});

describe("blog — post date formatting", () => {
  it("renders the ISO day as written, with no timezone shift", () => {
    // `new Date("2026-09-14")` is UTC midnight; rendered in any zone west of
    // UTC it prints 13 September. The visible date must match the <time
    // dateTime> attribute beside it, so this is formatted from string parts.
    expect(formatPostDate("2026-09-14")).toBe("14 September 2026");
    expect(formatPostDate("2026-01-01")).toBe("1 January 2026");
    expect(formatPostDate("2026-12-31")).toBe("31 December 2026");
  });

  it("formats every registered post's date", () => {
    for (const p of BLOG_POSTS) {
      expect(formatPostDate(p.datePublished), p.slug).toMatch(/^\d{1,2} [A-Z][a-z]+ \d{4}$/);
    }
  });

  it("returns the input unchanged rather than throwing on a malformed date", () => {
    expect(formatPostDate("not-a-date")).toBe("not-a-date");
  });
});

describe("NDA II 2026 post — derived figures", () => {
  it("the chapter table is internally consistent", () => {
    expect(CHAPTER_SPLIT.reduce((s, r) => s + r.count, 0)).toBe(PAPER.questions);
    expect(CHAPTERS_REPRESENTED).toBe(CHAPTER_SPLIT.length);
  });

  it("counts the long tail rather than trusting prose", () => {
    // The first draft hand-typed "fifteen chapters contributed two or fewer".
    // It is twelve. This is why the prose reads the number from here.
    const byHand = CHAPTER_SPLIT.filter((r) => r.count <= 2).length;
    expect(chaptersAtOrBelow(2)).toBe(byHand);
    expect(chaptersAtOrBelow(0)).toBe(0);
    expect(chaptersAtOrBelow(Math.max(...CHAPTER_SPLIT.map((r) => r.count)))).toBe(
      CHAPTER_SPLIT.length
    );
  });

  it("totals the mid-weight block from the same table as everything else", () => {
    const expected = CHAPTER_SPLIT.filter((r) =>
      (MID_WEIGHT_BLOCK as readonly string[]).includes(r.chapter)
    ).reduce((s, r) => s + r.count, 0);
    expect(questionsIn(MID_WEIGHT_BLOCK)).toBe(expected);
    expect(questionsIn([])).toBe(0);
    expect(questionsIn(["Not A Chapter"])).toBe(0);
  });

  it("every named mid-weight chapter actually appears in the paper", () => {
    // A typo here would silently drop a chapter from the total and understate
    // the block the post tells students to prioritise.
    const names = new Set(CHAPTER_SPLIT.map((r) => r.chapter));
    for (const c of MID_WEIGHT_BLOCK) expect(names.has(c), c).toBe(true);
  });

  it("converts questions to marks at the paper's own rate", () => {
    expect(PAPER.questions * PAPER.markPerQuestion).toBe(PAPER.marks);
    expect(marksInTopChapters(2)).toBe(
      (CHAPTER_SPLIT[0].count + CHAPTER_SPLIT[1].count) * PAPER.markPerQuestion
    );
  });

  it("orders the chapter table descending, which every 'biggest' claim assumes", () => {
    const counts = CHAPTER_SPLIT.map((r) => r.count);
    expect([...counts].sort((a, b) => b - a)).toEqual(counts);
  });
});
