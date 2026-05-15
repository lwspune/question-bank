import type { MetadataRoute } from "next";
import { ROUTES } from "@/app/guide/nda-maths/_data/nda-maths";
import { DETAIL_SLUGS } from "@/app/guide/nda-maths/_data/principle-details";

const SITE_URL = "https://question-bank-sage.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const guideEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/guide`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...ROUTES.map((r) => ({
      url: r.slug
        ? `${SITE_URL}/guide/nda-maths/${r.slug}`
        : `${SITE_URL}/guide/nda-maths`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: r.slug === "" ? 0.9 : 0.8,
    })),
    ...DETAIL_SLUGS.map((slug) => ({
      url: `${SITE_URL}/guide/nda-maths/principles/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  return [
    {
      url: `${SITE_URL}/browse`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...guideEntries,
    {
      url: `${SITE_URL}/login`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
