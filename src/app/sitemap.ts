import type { MetadataRoute } from "next";
import { ROUTES } from "@/app/guide/nda-maths/_data/nda-maths";
import { DETAIL_SLUGS } from "@/app/guide/nda-maths/_data/principle-details";
import { ROUTES as ENGLISH_ROUTES } from "@/app/guide/nda-english/_data/nda-english";
import { PLAYBOOK_SLUGS } from "@/app/guide/nda-english/_data/playbooks";
import { ROUTES as PHYSICS_ROUTES } from "@/app/guide/nda-physics/_data/nda-physics";
import { PLAYBOOK_SLUGS as PHYSICS_PLAYBOOK_SLUGS } from "@/app/guide/nda-physics/_data/playbooks";
import { ROUTES as CHEMISTRY_ROUTES } from "@/app/guide/nda-chemistry/_data/nda-chemistry";
import { PLAYBOOK_SLUGS as CHEMISTRY_PLAYBOOK_SLUGS } from "@/app/guide/nda-chemistry/_data/playbooks";
import { ROUTES as BIOLOGY_ROUTES } from "@/app/guide/nda-biology/_data/nda-biology";
import { PLAYBOOK_SLUGS as BIOLOGY_PLAYBOOK_SLUGS } from "@/app/guide/nda-biology/_data/playbooks";
import { ROUTES as GEOGRAPHY_ROUTES } from "@/app/guide/nda-geography/_data/nda-geography";
import { PLAYBOOK_SLUGS as GEOGRAPHY_PLAYBOOK_SLUGS } from "@/app/guide/nda-geography/_data/playbooks";
import { ROUTES as HISTORY_ROUTES } from "@/app/guide/nda-history/_data/nda-history";
import { PLAYBOOK_SLUGS as HISTORY_PLAYBOOK_SLUGS } from "@/app/guide/nda-history/_data/playbooks";
import { ROUTES as POLITY_ROUTES } from "@/app/guide/nda-polity/_data/nda-polity";
import { PLAYBOOK_SLUGS as POLITY_PLAYBOOK_SLUGS } from "@/app/guide/nda-polity/_data/playbooks";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";

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
    ...PHYSICS_ROUTES.map((r) => ({
      url: r.slug
        ? `${SITE_URL}/guide/nda-physics/${r.slug}`
        : `${SITE_URL}/guide/nda-physics`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: r.slug === "" ? 0.9 : 0.8,
    })),
    ...PHYSICS_PLAYBOOK_SLUGS.map((slug) => ({
      url: `${SITE_URL}/guide/nda-physics/playbooks/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...CHEMISTRY_ROUTES.map((r) => ({
      url: r.slug
        ? `${SITE_URL}/guide/nda-chemistry/${r.slug}`
        : `${SITE_URL}/guide/nda-chemistry`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: r.slug === "" ? 0.9 : 0.8,
    })),
    ...CHEMISTRY_PLAYBOOK_SLUGS.map((slug) => ({
      url: `${SITE_URL}/guide/nda-chemistry/playbooks/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...BIOLOGY_ROUTES.map((r) => ({
      url: r.slug
        ? `${SITE_URL}/guide/nda-biology/${r.slug}`
        : `${SITE_URL}/guide/nda-biology`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: r.slug === "" ? 0.9 : 0.8,
    })),
    ...BIOLOGY_PLAYBOOK_SLUGS.map((slug) => ({
      url: `${SITE_URL}/guide/nda-biology/playbooks/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...GEOGRAPHY_ROUTES.map((r) => ({
      url: r.slug
        ? `${SITE_URL}/guide/nda-geography/${r.slug}`
        : `${SITE_URL}/guide/nda-geography`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: r.slug === "" ? 0.9 : 0.8,
    })),
    ...GEOGRAPHY_PLAYBOOK_SLUGS.map((slug) => ({
      url: `${SITE_URL}/guide/nda-geography/playbooks/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...HISTORY_ROUTES.map((r) => ({
      url: r.slug
        ? `${SITE_URL}/guide/nda-history/${r.slug}`
        : `${SITE_URL}/guide/nda-history`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: r.slug === "" ? 0.9 : 0.8,
    })),
    ...HISTORY_PLAYBOOK_SLUGS.map((slug) => ({
      url: `${SITE_URL}/guide/nda-history/playbooks/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...POLITY_ROUTES.map((r) => ({
      url: r.slug
        ? `${SITE_URL}/guide/nda-polity/${r.slug}`
        : `${SITE_URL}/guide/nda-polity`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: r.slug === "" ? 0.9 : 0.8,
    })),
    ...POLITY_PLAYBOOK_SLUGS.map((slug) => ({
      url: `${SITE_URL}/guide/nda-polity/playbooks/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    // NDA Economics — single-page landing, no sub-routes.
    {
      url: `${SITE_URL}/guide/nda-economics`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Notes routes derive from NOTES_CHAPTERS. Adding a chapter to that
  // registry automatically adds: the subject-route landing (once per
  // distinct subjectRoute), the chapter landing, and one entry per slug.
  const subjectRoutesSeen = new Set<string>();
  const notesEntries: MetadataRoute.Sitemap = [];
  for (const c of NOTES_CHAPTERS) {
    if (!subjectRoutesSeen.has(c.subjectRoute)) {
      subjectRoutesSeen.add(c.subjectRoute);
      notesEntries.push({
        url: `${SITE_URL}/notes/${c.subjectRoute}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
    notesEntries.push({
      url: `${SITE_URL}/notes/${c.subjectRoute}/${c.chapterSlug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    for (const slug of c.slugs) {
      notesEntries.push({
        url: `${SITE_URL}/notes/${c.subjectRoute}/${c.chapterSlug}/${slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  const examHomeEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/nda`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
  ];

  return [
    {
      url: `${SITE_URL}/browse`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...examHomeEntries,
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
