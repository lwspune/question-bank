import { describe, expect, it } from "vitest";
import {
  articleRowToPost,
  mergeCatalog,
  parseArticleFile,
  planDraftWrite,
  planPublish,
  type ArticleRow,
} from "@/lib/blog/catalog";
import { BLOG_POSTS } from "@/lib/blog/posts";

const BODY =
  "The Consortium of NLUs has announced the date.\n\n## What the paper looks like\n\n120 questions in 2 hours. Practise with [real papers](/mock).";

function row(over: Partial<ArticleRow> = {}): ArticleRow {
  return {
    id: "11111111-1111-4111-8111-111111111111",
    slug: "clat-2027-exam-date",
    kind: "news",
    exam_slug: "clat",
    title: "CLAT 2027 exam date announced: 6 December 2026",
    description:
      "The Consortium has set CLAT 2027 for 6 December 2026. The date, the pattern, and how to use the weeks left with real past papers.",
    body: BODY,
    tags: ["CLAT"],
    faq: [{ q: "When is CLAT 2027?", a: "6 December 2026." }],
    sources: [{ label: "Notice", url: "https://consortiumofnlus.ac.in/" }],
    reading_minutes: 1,
    status: "published",
    date_published: "2026-11-16",
    date_modified: null,
    ...over,
  };
}

describe("articleRowToPost", () => {
  it("maps a row to the post shape the pages and JSON-LD read", () => {
    const p = articleRowToPost(row());
    expect(p).toMatchObject({
      source: "db",
      slug: "clat-2027-exam-date",
      kind: "news",
      examSlug: "clat",
      datePublished: "2026-11-16",
      readingMinutes: 1,
      body: BODY,
    });
    expect(p.dateModified).toBeUndefined();
  });

  it("drops malformed FAQ and source entries rather than rendering them", () => {
    const p = articleRowToPost(row({ faq: [{ q: "ok?", a: "yes" }, { q: 3 }, null] as never, sources: ["x"] as never }));
    expect(p.faq).toEqual([{ q: "ok?", a: "yes" }]);
    expect(p.sources).toEqual([]);
  });
});

describe("mergeCatalog", () => {
  it("lists code and database posts newest first", () => {
    const merged = mergeCatalog(BLOG_POSTS, [articleRowToPost(row({ date_published: "2027-01-01" }))]);
    expect(merged[0].slug).toBe("clat-2027-exam-date");
    expect(merged).toHaveLength(BLOG_POSTS.length + 1);
  });

  it("lets a code post win a slug clash", () => {
    const clash = articleRowToPost(row({ slug: BLOG_POSTS[0].slug }));
    const merged = mergeCatalog(BLOG_POSTS, [clash]);
    expect(merged.filter((p) => p.slug === BLOG_POSTS[0].slug)).toHaveLength(1);
    expect(merged.find((p) => p.slug === BLOG_POSTS[0].slug)!.source).toBe("code");
  });

  it("keeps evergreen pages off the blog", () => {
    const merged = mergeCatalog([], [articleRowToPost(row({ kind: "evergreen" }))]);
    expect(merged).toEqual([]);
  });

  it("never lists a draft", () => {
    expect(mergeCatalog([], [articleRowToPost(row({ status: "draft", date_published: null }))])).toEqual([]);
  });
});

describe("planPublish", () => {
  const draft = { status: "draft" as const, date_published: null, date_modified: null, pending: null, kind: "news" as const };

  it("publishes a draft with today's date", () => {
    expect(planPublish(draft, "publish", "2026-11-16")).toEqual({
      ok: true,
      update: { status: "published", date_published: "2026-11-16" },
    });
  });

  it("keeps the first publish date when publishing again", () => {
    const r = planPublish({ ...draft, date_published: "2026-11-10" }, "publish", "2026-11-16");
    expect(r).toEqual({ ok: true, update: { status: "published", date_published: "2026-11-10" } });
  });

  it("refuses to publish what is already live", () => {
    expect(planPublish({ ...draft, status: "published", date_published: "2026-11-10" }, "publish", "2026-11-16").ok).toBe(false);
  });

  it("applies a waiting edit and stamps the modified date", () => {
    const live = { ...draft, status: "published" as const, date_published: "2026-11-10" };
    const pending = { title: "New title for CLAT 2027 exam date news", body: BODY + " More." };
    const r = planPublish({ ...live, pending }, "apply_changes", "2026-11-16");
    expect(r).toEqual({
      ok: true,
      update: { title: pending.title, body: pending.body, reading_minutes: 1, pending: null, date_modified: "2026-11-16" },
    });
  });

  it("does not stamp a modified date on the publish day itself", () => {
    const live = { ...draft, status: "published" as const, date_published: "2026-11-16", pending: { tags: ["CLAT"] } };
    expect(planPublish(live, "apply_changes", "2026-11-16")).toEqual({ ok: true, update: { tags: ["CLAT"], pending: null } });
  });

  it("refuses to apply when nothing is waiting, and ignores unknown pending keys", () => {
    const live = { ...draft, status: "published" as const, date_published: "2026-11-10" };
    expect(planPublish(live, "apply_changes", "2026-11-16").ok).toBe(false);
    const r = planPublish({ ...live, pending: { status: "draft", slug: "x", title: "A safe new title for this page" } }, "apply_changes", "2026-11-16");
    expect(r).toMatchObject({ ok: true, update: { title: "A safe new title for this page" } });
    expect(r.ok && "status" in r.update).toBe(false);
    expect(r.ok && "slug" in r.update).toBe(false);
  });

  it("unpublishes and discards", () => {
    const live = { ...draft, status: "published" as const, date_published: "2026-11-10", pending: { tags: ["x"] } };
    expect(planPublish(live, "unpublish", "2026-11-16")).toEqual({ ok: true, update: { status: "draft" } });
    expect(planPublish(live, "discard_changes", "2026-11-16")).toEqual({ ok: true, update: { pending: null } });
    expect(planPublish(draft, "unpublish", "2026-11-16").ok).toBe(false);
  });
});

const FILE = [
  "---",
  JSON.stringify(
    {
      slug: "clat-2027-exam-date",
      kind: "news",
      examSlug: "clat",
      title: "CLAT 2027 exam date announced: 6 December 2026",
      description:
        "The Consortium has set CLAT 2027 for 6 December 2026. The date, the pattern, and how to use the weeks left with real past papers.",
      tags: ["CLAT"],
      sources: [{ label: "Notice", url: "https://consortiumofnlus.ac.in/" }],
      faq: [{ q: "When is CLAT 2027?", a: "6 December 2026." }],
    },
    null,
    2
  ),
  "---",
  "",
  BODY,
].join("\n");

describe("parseArticleFile", () => {
  it("reads the JSON header and the markdown body", () => {
    const r = parseArticleFile(FILE);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.article.slug).toBe("clat-2027-exam-date");
      expect(r.article.body).toBe(BODY);
      expect(r.article.watch).toBeNull();
      expect(r.article.examSlug).toBe("clat");
    }
  });

  it("accepts a file saved with a byte-order mark (PowerShell 5.1, Notepad)", () => {
    expect(parseArticleFile(`﻿${FILE}`).ok).toBe(true);
  });

  it("explains a missing header or bad JSON", () => {
    expect(parseArticleFile(BODY)).toMatchObject({ ok: false });
    expect(parseArticleFile("---\n{bad\n---\nbody")).toMatchObject({ ok: false });
    expect(parseArticleFile("---\n[]\n---\nbody")).toMatchObject({ ok: false });
  });
});

describe("planDraftWrite", () => {
  const parsed = parseArticleFile(FILE);
  if (!parsed.ok) throw new Error("fixture");
  const input = parsed.article;

  it("inserts a new article as a draft", () => {
    const w = planDraftWrite(null, input);
    expect(w.mode).toBe("insert");
    expect(w.values).toMatchObject({ slug: input.slug, status: "draft", reading_minutes: 1, exam_slug: "clat" });
  });

  it("overwrites a draft in place", () => {
    expect(planDraftWrite({ status: "draft", kind: "news", exam_slug: "clat" }, input).mode).toBe("update");
  });

  it("parks an edit to a published article in pending, never on the live columns", () => {
    const w = planDraftWrite({ status: "published", kind: "news", exam_slug: "clat" }, input);
    expect(w.mode).toBe("pending");
    expect(Object.keys(w.values)).toEqual(["pending"]);
    expect((w.values.pending as Record<string, unknown>).title).toBe(input.title);
  });

  it("refuses to change the kind or exam of a published article", () => {
    const w = planDraftWrite({ status: "published", kind: "data", exam_slug: "clat" }, input);
    expect(w.mode).toBe("refuse");
  });
});
