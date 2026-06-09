import type { MetadataRoute } from "next";

const SITE_URL = "https://www.pyqvault.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/browse", "/guide", "/notes", "/quiz", "/privacy", "/login"],
        disallow: ["/dashboard", "/upload", "/questions", "/api"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
