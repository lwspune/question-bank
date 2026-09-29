import type { MetadataRoute } from "next";

const SITE_URL = "https://www.pyqvault.com";

/**
 * What every crawler may fetch. Shared by the wildcard group and the two
 * OpenAI search agents named below.
 */
const PUBLIC_ALLOW = [
  "/",
  "/browse",
  "/questions",
  "/guide",
  "/notes",
  "/quiz",
  "/privacy",
];
const PUBLIC_DISALLOW = ["/dashboard", "/upload", "/api", "/browse?*"];

/**
 * OpenAI's SEARCH crawler and its live-fetch agent, named explicitly
 * (2026-09-29) as OpenAI's own guidance asks. The wildcard already allowed
 * them (Firewall → Traffic showed OAI-SearchBot as the site's busiest single
 * user agent, 9.6k requests/day); a named group survives a future edit to the
 * wildcard and is the one signal OpenAI documents for opting into ChatGPT
 * search. A NAMED GROUP REPLACES THE WILDCARD for that agent, so each carries
 * the same disallows — a bare "Allow: /" would free exactly these two bots to
 * walk the uncached /browse filter space. GPTBot (training) is deliberately
 * NOT named: it falls to the wildcard, allowed, and blocking training is a
 * separate decision. tests/robots-rules.test.ts asserts all of this.
 */
const AI_SEARCH_AGENTS = ["OAI-SearchBot", "ChatGPT-User"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: PUBLIC_ALLOW,
        // `/login` was removed from this Allow list on 2026-08-09. It is now
        // noindexed at the page level (src/app/login/layout.tsx) because its
        // client-rendered shell is byte-identical to /signup's, which is what
        // produced the "Duplicate without user-selected canonical" flag. Note
        // the directives are complementary, not redundant: robots.txt governs
        // CRAWLING and the meta tag governs INDEXING — a Disallow here would
        // actually PREVENT Google from seeing the noindex, so the page stays
        // crawlable and simply declines to be indexed.
        // `/questions` used to be blanket-disallowed because the only route under
        // it was the admin editor — which has since moved under /dashboard, so
        // the existing /dashboard rule covers it. Leaving the blanket rule in
        // place would have hidden ~250 of the site's most indexable pages.
        //
        // `/browse?*` blocks the FILTER SPACE only — bare /browse stays allowed
        // (the literal `?` can't match a query-less URL, and `tests/robots-rules.test.ts`
        // asserts that by behaviour, not by inspection). A filter UI generates a
        // combinatorial explosion of URLs that crawlers happily walk; /browse
        // already self-canonicalises to the bare page, so none of them were ever
        // going to be indexed — but each fetch is a full uncached server render,
        // because a page reading searchParams can never be cached. Pure compute
        // for zero indexing value. The /questions landing pages now carry the
        // discovery job those URLs never did.
        disallow: PUBLIC_DISALLOW,
      },
      ...AI_SEARCH_AGENTS.map((userAgent) => ({
        userAgent,
        allow: PUBLIC_ALLOW,
        disallow: PUBLIC_DISALLOW,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
