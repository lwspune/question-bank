/**
 * Tell IndexNow (Bing, Yandex, Naver, Seznam; Bing's index is the one ChatGPT
 * search reads) about an article the moment the owner publishes it or applies a
 * waiting edit (owner, 2026-11-17). Before this, a new article waited for the
 * daily IndexNow workflow (04:00 UTC), or a hand-started run.
 *
 * Best-effort: the Publish route calls submitArticleToIndexNow inside Next's
 * after(), so it never delays or fails a publish. The daily workflow stays as
 * the backstop; IndexNow accepts the same URL again without harm.
 *
 * Google does not take IndexNow. Google goes through the /gsc-index queue.
 *
 * Spec: tests/blog-indexnow.test.ts.
 */
import { SITE_URL } from "@/lib/brand";
import { examHomeHref } from "@/lib/exam/examHome";
import { INDEXNOW_ENDPOINT, INDEXNOW_KEY, buildIndexNowPayloads } from "@/lib/seo/indexnow";
import { articlePath } from "./paths";
import type { ArticleKind } from "./kinds";
import type { PublishAction } from "./catalog";

/** Only these change what readers see; unpublish and discard do not add a page to index. */
export function shouldNotifyIndexNow(action: PublishAction): boolean {
  return action === "publish" || action === "apply_changes";
}

/**
 * The pages a publish changes: the article itself, the /blog list (for a blog
 * post), and the exam's own page, which links its syllabus page and lists posts.
 */
export function articleIndexNowUrls(a: { kind: ArticleKind; slug: string; examSlug: string | null }): string[] {
  const paths = [articlePath(a)];
  if (a.kind !== "evergreen") paths.push("/blog");
  if (a.examSlug) paths.push(examHomeHref(a.examSlug));
  return paths.map((p) => `${SITE_URL}${p}`);
}

export type IndexNowResult = { ok: boolean; status: number | null; urls: number };

export async function submitArticleToIndexNow(urls: readonly string[]): Promise<IndexNowResult> {
  const host = new URL(SITE_URL).host;
  const [payload] = buildIndexNowPayloads(urls, {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
  });
  if (!payload) return { ok: true, status: null, urls: 0 };
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000),
  });
  // IndexNow answers 200 or 202 for an accepted submission.
  return { ok: res.status === 200 || res.status === 202, status: res.status, urls: payload.urlList.length };
}
