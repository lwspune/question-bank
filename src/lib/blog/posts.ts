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

import type { FaqEntry } from "./faq";

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
  /**
   * Questions the post answers, rendered as its visible FAQ section AND as
   * FAQPage JSON-LD, from this one list. Plain text: no markdown, no em dashes.
   */
  faq?: FaqEntry[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "mht-cet-2027-december-attempt-moved-after-boards",
    title: "MHT-CET 2027: December attempt dropped, both after boards",
    description:
      "MHT-CET 2027 will not start in December: both attempts are now expected after the HSC boards. The dates so far, and how to use the time.",
    datePublished: "2026-10-10",
    examSlug: "mht-cet",
    tags: ["MHT-CET", "Exam dates", "HSC boards", "Preparation"],
    readingMinutes: 6,
    faq: [
      {
        q: "Is the MHT-CET December 2026 attempt cancelled?",
        a: "Yes. Reports on 9 October 2026 say the first attempt planned for December 2026 has been dropped and moved to after the HSC boards. The State CET Cell has not yet published a notice, so the official dates are still to come on cetcell.mahacet.org.",
      },
      {
        q: "When will MHT-CET 2027 be held?",
        a: "Both attempts are now expected between March and May 2027, after the HSC written papers end on 16 March 2027. The first is expected around late March or April and the second around May, at least four weeks apart. Exact dates have not been announced.",
      },
      {
        q: "Will both MHT-CET 2027 attempts count?",
        a: "The better of your two scores is used for admission, so a second attempt can only help you.",
      },
      {
        q: "Has the MHT-CET 2027 syllabus changed?",
        a: "No change has been reported. The paper is still set on the Maharashtra State Board Std XI and Std XII syllabus, with about 80% of the weight on Std XII and 20% on Std XI.",
      },
      {
        q: "When does MHT-CET 2027 registration start?",
        a: "It has not been announced. Earlier reports expected it to open in October or November 2026. Watch cetcell.mahacet.org for the information brochure.",
      },
      {
        q: "Does MHT-CET have negative marking?",
        a: "No. MHT-CET has no negative marking, so answer every question, including the ones you have to guess.",
      },
      {
        q: "Will MHT-CET 2027 clash with JEE Main?",
        a: "JEE Main session 2 is usually held in April, and its 2027 dates are not announced yet. If you are taking both, expect the two to fall close together and plan your revision for both windows.",
      },
    ],
  },
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
