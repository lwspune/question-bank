/**
 * POST /api/admin/blog: the dashboard's article buttons (migration 0263).
 * Superadmin only. { action, id } where action is publish · unpublish ·
 * apply_changes · discard_changes (lib/blog/catalog.ts planPublish decides
 * what each writes).
 *
 * This is the ONLY way an article reaches readers: the draft script writes
 * drafts and waiting edits, never a live page. After a change it clears the
 * article cache and every page that shows it (the post or the exam's syllabus
 * page, /blog, the exam home, the sitemap), so it is live on the next load,
 * and sends the changed pages to IndexNow (lib/blog/indexnow.ts).
 */
import { NextResponse, after, type NextRequest } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { requireSuperadmin, HttpError } from "@/lib/auth";
import { createTypedAdminClient } from "@/lib/supabase/admin";
import { istDayKey } from "@/lib/email/dueNudge";
import { ARTICLES_CACHE_TAG, pendingObject } from "@/lib/blog/articles";
import { PUBLISH_ACTIONS, planPublish } from "@/lib/blog/catalog";
import { articlePath } from "@/lib/blog/paths";
import { examHomeHref } from "@/lib/exam/examHome";
import { ARTICLE_KINDS, type ArticleKind } from "@/lib/blog/kinds";
import { articleIndexNowUrls, shouldNotifyIndexNow, submitArticleToIndexNow } from "@/lib/blog/indexnow";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(request: NextRequest) {
  try {
    await requireSuperadmin();
    const body = (await request.json().catch(() => null)) as { action?: string; id?: string } | null;
    const action = PUBLISH_ACTIONS.find((a) => a === body?.action);
    if (!action || typeof body?.id !== "string" || !UUID.test(body.id)) {
      return NextResponse.json({ error: "Send an action and an article id." }, { status: 400 });
    }

    const db = createTypedAdminClient();
    const { data, error } = await db
      .from("articles")
      .select("id, slug, kind, exam_slug, status, date_published, date_modified, pending")
      .eq("id", body.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) return NextResponse.json({ error: "No such article." }, { status: 404 });
    const kind: ArticleKind = (ARTICLE_KINDS as readonly string[]).includes(data.kind) ? (data.kind as ArticleKind) : "news";
    const row = {
      ...data,
      kind,
      status: data.status === "published" ? ("published" as const) : ("draft" as const),
      pending: pendingObject(data.pending),
    };

    const plan = planPublish(row, action, istDayKey(new Date()));
    if (!plan.ok) return NextResponse.json({ error: plan.error }, { status: 409 });

    const { error: upErr } = await db
      .from("articles")
      .update({ ...plan.update, updated_at: new Date().toISOString() })
      .eq("id", row.id);
    // A database rule (an em dash in a waiting edit, a short title) surfaces here, in words.
    if (upErr) return NextResponse.json({ error: `Not saved: ${upErr.message}` }, { status: 422 });

    revalidateTag(ARTICLES_CACHE_TAG, { expire: 0 });
    const paths = new Set([
      articlePath({ kind: row.kind, slug: row.slug, examSlug: row.exam_slug }),
      "/blog",
      "/sitemap.xml",
    ]);
    if (row.exam_slug) paths.add(examHomeHref(row.exam_slug));
    for (const path of paths) revalidatePath(path);

    // Tell IndexNow (Bing and ChatGPT search) at once, after the reply: it never
    // delays or fails a publish, and the daily IndexNow workflow is the backstop.
    if (shouldNotifyIndexNow(action)) {
      const urls = articleIndexNowUrls({ kind: row.kind, slug: row.slug, examSlug: row.exam_slug });
      after(async () => {
        try {
          const r = await submitArticleToIndexNow(urls);
          if (!r.ok) console.error("blog publish: IndexNow did not accept", { slug: row.slug, status: r.status });
        } catch (e) {
          console.error("blog publish: IndexNow submit failed", row.slug, e instanceof Error ? e.message : e);
        }
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof HttpError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("admin blog route error", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not save." }, { status: 500 });
  }
}
