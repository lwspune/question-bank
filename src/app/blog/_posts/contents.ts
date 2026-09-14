/**
 * slug → body component. STATIC imports, not `dynamic()`: /blog/[slug] is
 * prerendered from BLOG_SLUGS, and a dynamically-imported body would bail those
 * pages out of the static render — which is the whole reason the route exists.
 *
 * Adding a post means a line here AND an entry in `src/lib/blog/posts.ts`.
 * `tests/blog-registry.test.ts` asserts the two stay in step, because a slug
 * registered without a body builds clean and 404s on first request.
 */
import type { ComponentType } from "react";
import NdaTwo2026GatAnalysis from "./nda-2-2026-gat-paper-analysis/content";
import NdaTwo2026MathsAnalysis from "./nda-2-2026-maths-paper-analysis/content";

export const POST_CONTENTS: Record<string, ComponentType> = {
  "nda-2-2026-gat-paper-analysis": NdaTwo2026GatAnalysis,
  "nda-2-2026-maths-paper-analysis": NdaTwo2026MathsAnalysis,
};
