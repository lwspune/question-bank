/**
 * Blog post registry — METADATA ONLY.
 *
 * A post's body is a sibling TSX module at
 * `src/app/blog/_posts/<slug>/content.tsx`, and its load-bearing NUMBERS live
 * in `src/app/blog/_posts/<slug>/_data/`. Three separate places on purpose:
 *
 *   - this file is pure data, so it is unit-testable and safe to import from
 *     `sitemap.ts` without dragging React or KaTeX into the sitemap build;
 *   - the body is TSX so a post can use the shipped `KatexRenderer` /
 *     `BlockText` renderers directly rather than inventing a section DSL;
 *   - the `_data` split is what `scripts/seo/content-dates.ts` reads for a
 *     truthful sitemap <lastmod> — a page's date should move when its CONTENT
 *     moves, not when an unrelated refactor touches its wrapper.
 *
 * `/blog/[slug]` is SSG'd from exactly this list, so a slug registered without
 * a content module builds clean and 500s on first request. `tests/blog-registry.test.ts`
 * asserts the file exists for every slug.
 */

export type BlogPost = {
  /** URL segment AND the sitemap key. Lowercase kebab, enforced by test. */
  slug: string;
  title: string;
  /** Meta description + SERP snippet. Kept <=160 chars so Google doesn't truncate. */
  description: string;
  /** ISO yyyy-mm-dd. */
  datePublished: string;
  /** ISO yyyy-mm-dd; omit when never revised. Never earlier than datePublished. */
  dateModified?: string;
  /** Exam this post is about — drives the cross-links back into the product. */
  examSlug: string;
  tags: string[];
  readingMinutes: number;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "nda-2-2026-gat-paper-analysis",
    title: "NDA II 2026 GAT: what changed in English and GK",
    description:
      "NDA II 2026 GAT against every paper since 2017: voice and speech questions are brand new, and Polity has finally drawn level with History.",
    datePublished: "2026-09-14",
    examSlug: "nda",
    tags: ["NDA", "General Ability Test", "English", "Paper analysis"],
    readingMinutes: 7,
  },
  {
    slug: "nda-2-2026-maths-paper-analysis",
    title: "NDA II 2026 Maths: what the paper actually asked for",
    description:
      "NDA II 2026 Maths against every paper since 2017: Probability is now the biggest chapter, Statistics has halved, and two questions punish autopilot.",
    datePublished: "2026-09-14",
    examSlug: "nda",
    tags: ["NDA", "Mathematics", "Paper analysis"],
    readingMinutes: 7,
  },
];

/** Every registered slug — what `generateStaticParams` and the sitemap iterate. */
export const BLOG_SLUGS: string[] = BLOG_POSTS.map((p) => p.slug);

/** Posts newest-first, which is the only order any surface wants them in. */
export function listPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

/** Undefined (not a throw) for an unknown slug — the route turns that into notFound(). */
export function postBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
