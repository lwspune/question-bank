import type { MetadataRoute } from "next";
import { ROUTES } from "@/app/guide/nda-maths/_data/nda-maths";
import { DETAIL_SLUGS } from "@/app/guide/nda-maths/_data/principle-details";
import { ROUTES as ENGLISH_ROUTES } from "@/app/guide/nda-english/_data/nda-english";
import { PLAYBOOK_SLUGS } from "@/app/guide/nda-english/_data/playbooks";
import { STATISTICS_SLUGS } from "@/app/notes/nda-maths/statistics/_data";
import { VECTORS_SLUGS } from "@/app/notes/nda-maths/vectors/_data";

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
    {
      url: `${SITE_URL}/guide/nda`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
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
    ...ENGLISH_ROUTES.map((r) => ({
      url: r.slug
        ? `${SITE_URL}/guide/nda-english/${r.slug}`
        : `${SITE_URL}/guide/nda-english`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: r.slug === "" ? 0.9 : 0.8,
    })),
    ...PLAYBOOK_SLUGS.map((slug) => ({
      url: `${SITE_URL}/guide/nda-english/playbooks/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  const notesEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/notes/nda-maths`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/notes/nda-maths/statistics`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...STATISTICS_SLUGS.map((slug) => ({
      url: `${SITE_URL}/notes/nda-maths/statistics/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/notes/nda-maths/vectors`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...VECTORS_SLUGS.map((slug) => ({
      url: `${SITE_URL}/notes/nda-maths/vectors/${slug}`,
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
    ...notesEntries,
    {
      url: `${SITE_URL}/login`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
