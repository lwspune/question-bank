/**
 * The blog's two sources as one list, and the rules for changing a database
 * article (migration 0263). Pure; spec tests/blog-catalog.test.ts.
 *
 *   * mergeCatalog: code posts (src/lib/blog/posts.ts) + published database
 *     articles, newest first. A code post wins a slug clash, and evergreen pages
 *     are left out (they live at /exams/<exam>/syllabus, not /blog).
 *   * planDraftWrite: what the draft script may write. A draft is overwritten in
 *     place; an edit to a PUBLISHED article goes into `pending` and never onto
 *     the live columns, so nothing reaches readers without the owner's tap.
 *   * planPublish: what the Publish route writes for each button.
 */
import { readingMinutes, type ArticleInput, type ArticleSource } from "./articleBody";
import type { BlogPost } from "./posts";
import type { FaqEntry } from "./faq";
import { ARTICLE_KINDS, type ArticleKind } from "./kinds";

export type ArticleStatus = "draft" | "published";

/**
 * The columns anon may read (0263 column grants), as the typed client returns
 * them: kind and status are plain text there, so articleRowToPost narrows them.
 */
export type ArticleRow = {
  id: string;
  slug: string;
  kind: string;
  exam_slug: string | null;
  title: string;
  description: string;
  body: string;
  tags: string[];
  faq: unknown;
  sources: unknown;
  reading_minutes: number;
  status: string;
  date_published: string | null;
  date_modified: string | null;
};

export const ARTICLE_PUBLIC_COLUMNS =
  "id, slug, kind, exam_slug, title, description, body, tags, faq, sources, reading_minutes, status, date_published, date_modified";

export type CodePost = BlogPost & { source: "code" };
export type DbPost = BlogPost & {
  source: "db";
  id: string;
  status: ArticleStatus;
  body: string;
  sources: ArticleSource[];
};
export type CatalogPost = CodePost | DbPost;

function isFaq(v: unknown): v is FaqEntry {
  return !!v && typeof v === "object" && typeof (v as FaqEntry).q === "string" && typeof (v as FaqEntry).a === "string";
}

function isSource(v: unknown): v is ArticleSource {
  return (
    !!v && typeof v === "object" && typeof (v as ArticleSource).label === "string" && typeof (v as ArticleSource).url === "string"
  );
}

export function articleRowToPost(r: ArticleRow): DbPost {
  return {
    source: "db",
    id: r.id,
    status: r.status === "published" ? "published" : "draft",
    slug: r.slug,
    kind: (ARTICLE_KINDS as readonly string[]).includes(r.kind) ? (r.kind as ArticleKind) : "news",
    title: r.title,
    description: r.description,
    datePublished: r.date_published ?? "",
    dateModified: r.date_modified ?? undefined,
    examSlug: r.exam_slug ?? "",
    tags: r.tags ?? [],
    readingMinutes: r.reading_minutes,
    faq: Array.isArray(r.faq) ? r.faq.filter(isFaq) : [],
    sources: Array.isArray(r.sources) ? r.sources.filter(isSource) : [],
    body: r.body,
  };
}

/** Every post /blog lists, newest first. */
export function mergeCatalog(code: readonly BlogPost[], db: readonly DbPost[]): CatalogPost[] {
  const codeSlugs = new Set(code.map((p) => p.slug));
  const live = db.filter(
    (p) => p.status === "published" && p.datePublished && p.kind !== "evergreen" && !codeSlugs.has(p.slug)
  );
  return [...code.map((p): CodePost => ({ ...p, source: "code" })), ...live].sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished)
  );
}

// ---------------------------------------------------------------------------
// The draft file: a JSON header between two `---` lines, then the body.

export type ParsedFile = { ok: true; article: ArticleInput } | { ok: false; error: string };

export function parseArticleFile(text: string): ParsedFile {
  // A byte-order mark is invisible and Windows tools add it (PowerShell 5.1, Notepad).
  const src = text.replace(/^﻿/, "").replace(/\r\n?/g, "\n");
  if (!src.startsWith("---\n")) return { ok: false, error: "The file must start with a --- line, then the JSON header." };
  const end = src.indexOf("\n---\n", 4);
  if (end < 0) return { ok: false, error: "The JSON header must end with a --- line." };
  let header: unknown;
  try {
    header = JSON.parse(src.slice(4, end));
  } catch (e) {
    return { ok: false, error: `The header is not valid JSON: ${e instanceof Error ? e.message : e}` };
  }
  if (!header || typeof header !== "object" || Array.isArray(header)) {
    return { ok: false, error: "The header must be a JSON object." };
  }
  const h = header as Record<string, unknown>;
  const str = (k: string) => (typeof h[k] === "string" ? (h[k] as string) : "");
  const arr = <T>(k: string) => (Array.isArray(h[k]) ? (h[k] as T[]) : []);
  return {
    ok: true,
    article: {
      slug: str("slug"),
      kind: str("kind") as ArticleKind,
      examSlug: typeof h.examSlug === "string" && h.examSlug ? h.examSlug : null,
      title: str("title"),
      description: str("description"),
      tags: arr<string>("tags").filter((t) => typeof t === "string"),
      sources: arr<unknown>("sources").filter(isSource),
      watch: typeof h.watch === "string" && h.watch ? h.watch : null,
      faq: arr<unknown>("faq").filter(isFaq),
      body: src.slice(end + 5).trim(),
    },
  };
}

/** The content columns an edit may change. Never slug, kind, status or dates. */
const CONTENT_KEYS = ["title", "description", "body", "tags", "faq", "sources", "watch"] as const;

function contentOf(a: ArticleInput): Record<string, unknown> {
  return {
    title: a.title.trim(),
    description: a.description.trim(),
    body: a.body,
    tags: a.tags,
    faq: a.faq,
    sources: a.sources,
    watch: a.watch ?? null,
  };
}

export type ExistingArticle = { status: ArticleStatus; kind: ArticleKind; exam_slug: string | null };

export type DraftWrite =
  | { mode: "insert" | "update" | "pending"; values: Record<string, unknown> }
  | { mode: "refuse"; values: Record<string, never>; reason: string };

export function planDraftWrite(existing: ExistingArticle | null, a: ArticleInput): DraftWrite {
  const content = contentOf(a);
  const minutes = readingMinutes(a.body);
  if (!existing) {
    return {
      mode: "insert",
      values: { slug: a.slug, kind: a.kind, exam_slug: a.examSlug, ...content, reading_minutes: minutes, status: "draft" },
    };
  }
  if (existing.status === "draft") {
    return { mode: "update", values: { kind: a.kind, exam_slug: a.examSlug, ...content, reading_minutes: minutes } };
  }
  if (existing.kind !== a.kind || existing.exam_slug !== a.examSlug) {
    return {
      mode: "refuse",
      values: {},
      reason: "This article is published: its kind and exam cannot change. Unpublish it first, or use a new slug.",
    };
  }
  return { mode: "pending", values: { pending: content } };
}

// ---------------------------------------------------------------------------
// The dashboard buttons.

export const PUBLISH_ACTIONS = ["publish", "unpublish", "apply_changes", "discard_changes"] as const;
export type PublishAction = (typeof PUBLISH_ACTIONS)[number];

export type PublishState = {
  status: ArticleStatus;
  kind: ArticleKind;
  date_published: string | null;
  date_modified: string | null;
  pending: Record<string, unknown> | null;
};

export type PublishPlan = { ok: true; update: Record<string, unknown> } | { ok: false; error: string };

/** `today` is the IST calendar day, YYYY-MM-DD. */
export function planPublish(s: PublishState, action: PublishAction, today: string): PublishPlan {
  switch (action) {
    case "publish":
      if (s.status === "published") return { ok: false, error: "Already published." };
      return { ok: true, update: { status: "published", date_published: s.date_published ?? today } };
    case "unpublish":
      if (s.status !== "published") return { ok: false, error: "Not published." };
      return { ok: true, update: { status: "draft" } };
    case "discard_changes":
      if (!s.pending) return { ok: false, error: "No changes are waiting." };
      return { ok: true, update: { pending: null } };
    case "apply_changes": {
      if (s.status !== "published") return { ok: false, error: "Publish the article first." };
      if (!s.pending) return { ok: false, error: "No changes are waiting." };
      const update: Record<string, unknown> = {};
      for (const k of CONTENT_KEYS) if (k in s.pending) update[k] = s.pending[k];
      if (Object.keys(update).length === 0) return { ok: false, error: "The waiting changes are empty." };
      if (typeof update.body === "string") update.reading_minutes = readingMinutes(update.body);
      update.pending = null;
      if (s.date_published && today > s.date_published) update.date_modified = today;
      return { ok: true, update };
    }
  }
}
