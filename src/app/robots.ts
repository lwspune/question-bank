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
          "/login",
        ],
        // `/questions` used to be blanket-disallowed because the only route under
        // it was the admin editor — which has since moved under /dashboard, so
        // the existing /dashboard rule covers it. Leaving the blanket rule in
        // place would have hidden ~250 of the site's most indexable pages.
        disallow: ["/dashboard", "/upload", "/api"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
