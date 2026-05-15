import type { MetadataRoute } from "next";

const SITE_URL = "https://question-bank-sage.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/browse", "/guide", "/login"],
        disallow: ["/dashboard", "/upload", "/questions", "/api"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
