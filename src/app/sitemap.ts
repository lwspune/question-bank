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
import { ROUTES as CET_MATHS_ROUTES } from "@/app/guide/mht-cet-maths/_data/mht-cet-maths";
import { PLAYBOOK_SLUGS as CET_MATHS_PLAYBOOK_SLUGS } from "@/app/guide/mht-cet-maths/_data/playbooks";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import { listPosts } from "@/lib/blog/posts";
import { getNotesExamGroups } from "@/lib/notes/notesNav";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { listChapterLandings, landingHref } from "@/lib/questions/landing";
import { getMockExams } from "@/lib/mocks/mocksNav";
import {
  buildMockSitemapEntries,
  type MockSitemapRow,
} from "@/lib/mocks/sitemapEntries";
import type { MockScope, MockSource } from "@/lib/mocks/query";
import { FORMULA_CHAPTERS, topicsByWeight } from "@/lib/formula";
import { CONTENT_DATES } from "@/lib/seo/contentDates.generated";
import {
  contentDateFor,
  newestOf,
  parseIsoDate,
  type ContentDateMap,
} from "@/lib/seo/lastmod";

const SITE_URL = "https://www.pyqvault.com";

/**
 * Stamp each entry with the real date its CONTENT last changed, derived from its
 * own URL, replacing the build-date placeholder the builders above set.
 *
 * Doing it as one pass over the finished array rather than at each of the ~30
 * construction sites means a new guide or notes chapter inherits the behaviour
 * automatically — there is no per-entry line to forget.
 *
 * See src/lib/seo/lastmod.ts for why a truthful per-URL lastmod matters here: the
 * previous code stamped one build timestamp onto 984 of 988 URLs, which told
 * Google that everything changed on every deploy and therefore told it nothing.
 */
function withContentDates(
  entries: MetadataRoute.Sitemap,
  dates: ContentDateMap,
  fallback: Date
): MetadataRoute.Sitemap {
  return entries.map((e) => ({
    ...e,
    lastModified: contentDateFor(e.url.replace(SITE_URL, ""), dates, fallback),
  }));
}

/** Published public quizzes (DB). Guarded so a missing-env build still produces
 *  the static sitemap rather than failing. */
async function publicQuizEntries(buildDate: Date): Promise<MetadataRoute.Sitemap> {
  try {
    const db = createSupabaseAdminClient();
    const { data } = await db
      .from("quizzes")
      .select("public_slug, updated_at")
      .not("public_slug", "is", null)
      .limit(1000);
    return (data ?? []).map((q) => ({
      url: `${SITE_URL}/quiz/${q.public_slug}`,
      lastModified: q.updated_at ? new Date(q.updated_at as string) : buildDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    return [];
  }
}

/**
 * The /mock surface: the exam picker, the per-exam catalogues and the per-type
 * listings. NOT the individual mock pages.
 *
 * The 192 leaf URLs came out on 2026-09-17. Measured against production,
 * /mock/<slug> renders 98 words of body text, and across all 192 the only
 * things that differ are the paper name and four numbers - the prose and the
 * whole Instructions block are byte-identical, because the questions sit behind
 * sign-in. Advertising 192 near-duplicate thin pages spends a measured ~4 HTML
 * fetches/day on pages that cannot rank. They stay reachable through
 * /mock/exam/<exam>/<type>; they are simply no longer advertised.
 *
 * The rows are still READ, because they are what dates the hubs - see
 * buildMockSitemapEntries, which is where that rule is pinned by tests. The
 * query is unfiltered, so a newly built exam enters the sitemap with no change
 * here. Guarded like publicQuizEntries so a missing-env build still emits a
 * sitemap.
 */
async function mockEntries(buildDate: Date): Promise<MetadataRoute.Sitemap> {
  try {
    const db = createSupabaseAdminClient();
    const { data } = await db
      .from("mock_tests")
      .select("slug, updated_at, source, scope, exam:exams(name)")
      .eq("status", "published")
      .limit(1000); // 192 today; explicit so this can never silently truncate

    const rows: MockSitemapRow[] = (data ?? []).map((m) => {
      const exam = (Array.isArray(m.exam) ? m.exam[0] : m.exam) as { name: string } | null;
      return {
        slug: m.slug as string,
        updatedAt: (m.updated_at as string | null) ?? null,
        source: (m.source as MockSource | null) ?? null,
        scope: (m.scope as MockScope | null) ?? null,
        examName: exam?.name ?? null,
      };
    });

    return buildMockSitemapEntries(rows, getMockExams()).map((e) => ({
      url: `${SITE_URL}${e.path}`,
      lastModified: parseIsoDate(e.iso, buildDate),
      changeFrequency: e.changeFrequency,
      priority: e.priority,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const buildDate = new Date();

  const guideEntries: MetadataRoute.Sitemap = [
    // /guide WAS deliberately absent while it was a bare redirect to
    // /guide/nda — listing a redirecting URL asks Google to index something
    // that does not exist, and it was one of the 3 "Page with redirect"
    // entries in the 2026-08-09 coverage report. It became a real exam picker
    // on 2026-08-22 (NDA + MHT-CET), so it is a genuine page again and belongs
    // here. Highest priority of the guide tree: it is the tree's front door.
    {
      url: `${SITE_URL}/guide`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/guide/nda`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...ROUTES.map((r) => ({
      url: r.slug
        ? `${SITE_URL}/guide/nda-maths/${r.slug}`
        : `${SITE_URL}/guide/nda-maths`,
      lastModified: buildDate,
      changeFrequency: "weekly" as const,
      priority: r.slug === "" ? 0.9 : 0.8,
    })),
    ...DETAIL_SLUGS.map((slug) => ({
      url: `${SITE_URL}/guide/nda-maths/principles/${slug}`,
      lastModified: buildDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...ENGLISH_ROUTES.map((r) => ({
      url: r.slug
        ? `${SITE_URL}/guide/nda-english/${r.slug}`
        : `${SITE_URL}/guide/nda-english`,
      lastModified: buildDate,
      changeFrequency: "weekly" as const,
      priority: r.slug === "" ? 0.9 : 0.8,
    })),
    ...PLAYBOOK_SLUGS.map((slug) => ({
      url: `${SITE_URL}/guide/nda-english/playbooks/${slug}`,
      lastModified: buildDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...PHYSICS_ROUTES.map((r) => ({
      url: r.slug
        ? `${SITE_URL}/guide/nda-physics/${r.slug}`
        : `${SITE_URL}/guide/nda-physics`,
      lastModified: buildDate,
      changeFrequency: "weekly" as const,
      priority: r.slug === "" ? 0.9 : 0.8,
    })),
    ...PHYSICS_PLAYBOOK_SLUGS.map((slug) => ({
      url: `${SITE_URL}/guide/nda-physics/playbooks/${slug}`,
      lastModified: buildDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...CHEMISTRY_ROUTES.map((r) => ({
      url: r.slug
        ? `${SITE_URL}/guide/nda-chemistry/${r.slug}`
        : `${SITE_URL}/guide/nda-chemistry`,
      lastModified: buildDate,
      changeFrequency: "weekly" as const,
      priority: r.slug === "" ? 0.9 : 0.8,
    })),
    ...CHEMISTRY_PLAYBOOK_SLUGS.map((slug) => ({
      url: `${SITE_URL}/guide/nda-chemistry/playbooks/${slug}`,
      lastModified: buildDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...BIOLOGY_ROUTES.map((r) => ({
      url: r.slug
        ? `${SITE_URL}/guide/nda-biology/${r.slug}`
        : `${SITE_URL}/guide/nda-biology`,
      lastModified: buildDate,
      changeFrequency: "weekly" as const,
      priority: r.slug === "" ? 0.9 : 0.8,
    })),
    ...BIOLOGY_PLAYBOOK_SLUGS.map((slug) => ({
      url: `${SITE_URL}/guide/nda-biology/playbooks/${slug}`,
      lastModified: buildDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...GEOGRAPHY_ROUTES.map((r) => ({
      url: r.slug
        ? `${SITE_URL}/guide/nda-geography/${r.slug}`
        : `${SITE_URL}/guide/nda-geography`,
      lastModified: buildDate,
      changeFrequency: "weekly" as const,
      priority: r.slug === "" ? 0.9 : 0.8,
    })),
    ...GEOGRAPHY_PLAYBOOK_SLUGS.map((slug) => ({
      url: `${SITE_URL}/guide/nda-geography/playbooks/${slug}`,
      lastModified: buildDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...HISTORY_ROUTES.map((r) => ({
      url: r.slug
        ? `${SITE_URL}/guide/nda-history/${r.slug}`
        : `${SITE_URL}/guide/nda-history`,
      lastModified: buildDate,
      changeFrequency: "weekly" as const,
      priority: r.slug === "" ? 0.9 : 0.8,
    })),
    ...HISTORY_PLAYBOOK_SLUGS.map((slug) => ({
      url: `${SITE_URL}/guide/nda-history/playbooks/${slug}`,
      lastModified: buildDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...POLITY_ROUTES.map((r) => ({
      url: r.slug
        ? `${SITE_URL}/guide/nda-polity/${r.slug}`
        : `${SITE_URL}/guide/nda-polity`,
      lastModified: buildDate,
      changeFrequency: "weekly" as const,
      priority: r.slug === "" ? 0.9 : 0.8,
    })),
    {
      url: `${SITE_URL}/guide/mht-cet`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...CET_MATHS_ROUTES.map((r) => ({
      url: r.slug
        ? `${SITE_URL}/guide/mht-cet-maths/${r.slug}`
        : `${SITE_URL}/guide/mht-cet-maths`,
      lastModified: buildDate,
      changeFrequency: "weekly" as const,
      priority: r.slug === "" ? 0.9 : 0.8,
    })),
    ...CET_MATHS_PLAYBOOK_SLUGS.map((slug) => ({
      url: `${SITE_URL}/guide/mht-cet-maths/playbooks/${slug}`,
      lastModified: buildDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...POLITY_PLAYBOOK_SLUGS.map((slug) => ({
      url: `${SITE_URL}/guide/nda-polity/playbooks/${slug}`,
      lastModified: buildDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    // NDA Economics — single-page landing, no sub-routes.
    {
      url: `${SITE_URL}/guide/nda-economics`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    // NDA Current Affairs — single-page Template D (theme-prep checklist).
    // Priority 0.6 — thinner than Economics's 0.7 to flag the unusual template
    // shape for crawlers (content is shape-calibration, not memorise-this).
    {
      url: `${SITE_URL}/guide/nda-current-affairs`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // Index + hub pages (/notes, /notes/<exam>, /notes/<subject>) have no _data
  // directory of their own, so they have no entry in CONTENT_DATES. For them
  // "last modified" honestly means "when did anything I list last change" — the
  // newest of their children. Computed here and merged into the lookup so the
  // single withContentDates() pass below covers every notes URL uniformly.
  const notesDatesByRoute = Object.entries(CONTENT_DATES).filter(([k]) =>
    k.startsWith("/notes/")
  );
  const newestUnder = (prefix: string): string | null => {
    const under = notesDatesByRoute
      .filter(([k]) => k === prefix || k.startsWith(`${prefix}/`))
      .map(([, v]) => v);
    if (under.length === 0) return null;
    // newestOf parses, so mixed UTC-offset strings compare correctly — a plain
    // lexical max would silently mis-order "…+05:30" against "…Z".
    return newestOf(under, new Date(0)).toISOString();
  };

  const aggregateDates: Record<string, string> = {};
  const allNotes = newestUnder("/notes");
  if (allNotes) aggregateDates["/notes"] = allNotes;
  for (const g of getNotesExamGroups()) {
    const perExam = newestOf(
      g.subjects.map((s) => newestUnder(`/notes/${s.subjectRoute}`)),
      new Date(0)
    );
    if (perExam.getTime() > 0) {
      aggregateDates[`/notes/${g.slug}`] = perExam.toISOString();
    }
  }
  for (const c of NOTES_CHAPTERS) {
    const perSubject = newestUnder(`/notes/${c.subjectRoute}`);
    if (perSubject) aggregateDates[`/notes/${c.subjectRoute}`] = perSubject;
  }
  const contentDates = { ...CONTENT_DATES, ...aggregateDates };

  // Notes routes derive from NOTES_CHAPTERS. Adding a chapter to that
  // registry automatically adds: the cross-exam index, each per-exam hub,
  // the subject-route landing (once per distinct subjectRoute), the chapter
  // landing, and one entry per slug.
  const notesEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/notes`, lastModified: buildDate, changeFrequency: "weekly", priority: 0.7 },
  ];
  for (const g of getNotesExamGroups()) {
    notesEntries.push({
      url: `${SITE_URL}/notes/${g.slug}`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }
  const subjectRoutesSeen = new Set<string>();
  for (const c of NOTES_CHAPTERS) {
    if (!subjectRoutesSeen.has(c.subjectRoute)) {
      subjectRoutesSeen.add(c.subjectRoute);
      notesEntries.push({
        url: `${SITE_URL}/notes/${c.subjectRoute}`,
        lastModified: buildDate,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
    notesEntries.push({
      url: `${SITE_URL}/notes/${c.subjectRoute}/${c.chapterSlug}`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    for (const slug of c.slugs) {
      notesEntries.push({
        url: `${SITE_URL}/notes/${c.subjectRoute}/${c.chapterSlug}/${slug}`,
        lastModified: buildDate,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  const examHomeEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/nda`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
  ];

  const quizEntries = await publicQuizEntries(buildDate);
  const mockUrlEntries = await mockEntries(buildDate);

  // Per-chapter question landing pages — the cacheable, indexable face of the
  // bank. Until these existed the sitemap offered Google exactly ONE URL
  // (/browse) for ~24k questions, all of them hidden behind UUID query strings.
  // Guarded like publicQuizEntries so a missing-env build still emits a sitemap.
  let landingEntries: MetadataRoute.Sitemap = [];
  try {
    const landings = await listChapterLandings();
    landingEntries = [
      {
        url: `${SITE_URL}/questions`,
        lastModified: buildDate,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
      // The real signal: each chapter page's date is the newest PUBLIC question
      // ingested into that chapter (migration 0072). An ingest now moves exactly
      // the pages it touched, instead of every URL on the site.
      ...landings.map((l) => ({
        url: `${SITE_URL}${landingHref(l)}`,
        lastModified: parseIsoDate(l.lastAdded, buildDate),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    ];
  } catch {
    landingEntries = [];
  }

  /**
   * /blog — the index plus every post.
   *
   * Deliberately NOT routed through `withContentDates`: a post DECLARES its own
   * datePublished/dateModified in the registry, those are validated by
   * tests/blog-registry.test.ts, and they are the same dates the BlogPosting
   * JSON-LD publishes. Deriving a second date from git would let the sitemap and
   * the structured data disagree, and would move a post's date whenever someone
   * fixed a typo in a code comment.
   */
  const posts = listPosts();
  // Formula axis — the index plus one page per identity. Static, prerendered
  // and text-rich, and the only surface on the site addressed by what a
  // SOLUTION does rather than by taxonomy, so it has no duplicate elsewhere.
  const formulaEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/formula`,
      lastModified: buildDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...FORMULA_CHAPTERS.flatMap((chapter) =>
      topicsByWeight(chapter).map((t) => ({
        url: `${SITE_URL}/formula/${t.slug}`,
        lastModified: buildDate,
        // Membership only moves when a chapter is re-tagged by hand, which is
        // a deliberate, infrequent act — not something to invite a daily crawl.
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
    ),
  ];

  const blogEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      // The index changes only when a post lands, so it inherits the newest.
      lastModified: parseIsoDate(posts[0]?.dateModified ?? posts[0]?.datePublished, buildDate),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: parseIsoDate(p.dateModified ?? p.datePublished, buildDate),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [
    {
      // The homepage — highest-authority URL, now a real landing page (was a
      // bare redirect to /browse until 2026-07-07).
      url: SITE_URL,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      // /browse is uncached (searchParams force it dynamic) and the heaviest
      // query, so we don't invite a daily recrawl. weekly + 0.8 keeps it
      // indexed without driving Supabase egress on every Googlebot pass.
      url: `${SITE_URL}/browse`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...landingEntries,
    ...examHomeEntries,
    ...withContentDates(guideEntries, contentDates, buildDate),
    ...withContentDates(notesEntries, contentDates, buildDate),
    ...quizEntries,
    ...mockUrlEntries,
    ...formulaEntries,
    ...blogEntries,
    {
      // Teacher-access lead page — a real acquisition surface for coaching staff.
      url: `${SITE_URL}/request-access`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      // Named-author / provenance page. Indexed deliberately: it is the page
      // that answers "who is behind this", for readers and for E-E-A-T alike.
      url: `${SITE_URL}/about`,
      lastModified: buildDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: buildDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
