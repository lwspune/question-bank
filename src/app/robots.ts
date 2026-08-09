import type { MetadataRoute } from "next";

const SITE_URL = "https://www.pyqvault.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/browse",
          "/questions",
          "/guide",
          "/notes",
          "/quiz",
          "/privacy",
        ],
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
        disallow: ["/dashboard", "/upload", "/api", "/browse?*"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
