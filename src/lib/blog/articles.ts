/**
 * Loaders for database articles (migration 0263).
 *
 * PUBLIC reads go through the anon client, so RLS + column grants decide what
 * comes back (published rows; never `pending` or `watch`) and one cached copy
 * can be served to everyone. Cached for a day under ARTICLES_CACHE_TAG; the
 * Publish route (/api/admin/blog) clears the tag, so a publish shows at once.
 *
 * ADMIN reads (the dashboard and its preview) use the service role and are
 * only ever called behind a superadmin check.
 *
 * Every read THROWS on failure, so a cache never keeps an empty list (the
 * 2026-10-08 homepage lesson). The sitemap and generateStaticParams catch it
 * and fall back to the code posts.
 */
import { unstable_cache } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/db";
import { singleFlight } from "@/lib/cache/singleFlight";
import { readAllPages } from "@/lib/supabase/readAllPages";
import { buildFailureMemoMs } from "@/lib/cache/buildPhase";
import { createTypedAnonClient } from "@/lib/supabase/server";
import { createTypedAdminClient } from "@/lib/supabase/admin";
import { BLOG_POSTS } from "./posts";
import {
  ARTICLE_PUBLIC_COLUMNS,
  articleRowToPost,
  mergeCatalog,
  type ArticleRow,
  type CatalogPost,
  type DbPost,
} from "./catalog";

export const ARTICLES_CACHE_TAG = "articles";

export async function listPublishedArticles(client: SupabaseClient<Database>): Promise<DbPost[]> {
  const rows = await readAllPages((from, to) =>
    client
      .from("articles")
      .select(ARTICLE_PUBLIC_COLUMNS)
      .eq("status", "published")
      .order("date_published", { ascending: false })
      .order("slug")
      .range(from, to)
  );
  return rows.map((r: ArticleRow) => articleRowToPost(r));
}

const cachedArticles = unstable_cache(
  () => listPublishedArticles(createTypedAnonClient()),
  ["articles-v1"],
  { revalidate: 86400, tags: [ARTICLES_CACHE_TAG] }
);

/** Every published database article (blog posts AND evergreen pages). */
export function getPublishedArticles(): Promise<DbPost[]> {
  return singleFlight("articles", cachedArticles, { rememberFailureMs: buildFailureMemoMs() });
}

/** What /blog lists: code posts + published database posts, newest first. */
export async function getBlogCatalog(): Promise<CatalogPost[]> {
  return mergeCatalog(BLOG_POSTS, await getPublishedArticles());
}

/** The published evergreen page for an exam, or null. */
export async function getEvergreenArticle(examSlug: string): Promise<DbPost | null> {
  return (await getPublishedArticles()).find((a) => a.kind === "evergreen" && a.examSlug === examSlug) ?? null;
}

// ---------------------------------------------------------------------------
// Admin (service role, superadmin only)

export type AdminArticle = DbPost & {
  pending: Record<string, unknown> | null;
  watch: string | null;
  updatedAt: string;
};

const ADMIN_COLUMNS = `${ARTICLE_PUBLIC_COLUMNS}, pending, watch, updated_at` as const;

type AdminRow = ArticleRow & { pending: unknown; watch: string | null; updated_at: string };

/** A waiting edit is a JSON object (0263 CHECK); anything else reads as none. */
export function pendingObject(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
}

function toAdmin(r: AdminRow): AdminArticle {
  return { ...articleRowToPost(r), pending: pendingObject(r.pending), watch: r.watch, updatedAt: r.updated_at };
}

export async function listArticlesForAdmin(): Promise<AdminArticle[]> {
  // One page is plenty for an admin list; past 1000 rows this would need paging.
  const { data, error } = await createTypedAdminClient()
    .from("articles")
    .select(ADMIN_COLUMNS)
    .order("updated_at", { ascending: false })
    .range(0, 999);
  if (error) throw new Error(`articles (admin): ${error.message}`);
  return (data ?? []).map((r: AdminRow) => toAdmin(r));
}

export async function getArticleForAdmin(slug: string): Promise<AdminArticle | null> {
  const { data, error } = await createTypedAdminClient()
    .from("articles")
    .select(ADMIN_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`article (admin): ${error.message}`);
  return data ? toAdmin(data) : null;
}

/** An article with its waiting edit laid over it: what the page WILL show after "Apply changes". */
export function withPending(a: AdminArticle): AdminArticle {
  if (!a.pending) return a;
  const p = articleRowToPost({
    id: a.id,
    slug: a.slug,
    kind: a.kind,
    exam_slug: a.examSlug || null,
    title: typeof a.pending.title === "string" ? a.pending.title : a.title,
    description: typeof a.pending.description === "string" ? a.pending.description : a.description,
    body: typeof a.pending.body === "string" ? a.pending.body : a.body,
    tags: Array.isArray(a.pending.tags) ? (a.pending.tags as string[]) : a.tags,
    faq: "faq" in a.pending ? a.pending.faq : a.faq,
    sources: "sources" in a.pending ? a.pending.sources : a.sources,
    reading_minutes: a.readingMinutes,
    status: a.status,
    date_published: a.datePublished || null,
    date_modified: a.dateModified ?? null,
  });
  return { ...a, ...p };
}
