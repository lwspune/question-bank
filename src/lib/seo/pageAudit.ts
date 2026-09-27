/**
 * Pure core of `npm run seo:titles` (scripts/seo/titles.ts): read each live
 * page's <head> and report what a search engine's SEO report would flag.
 *
 * Built after Bing's report of 2026-09-27 named 28 long titles; a crawl of the
 * whole sitemap then found 1,198, plus duplicate titles and 57 sitemap URLs
 * that 404'd. Bing only analyses what it has crawled, so its count is a floor —
 * this reads every page. Spec: tests/seo-page-audit.test.ts.
 */
import { TITLE_MAX } from "@/lib/seo/title";

/** Bing's "Meta Description too long or too short" range. */
export const DESCRIPTION_MIN = 25;
export const DESCRIPTION_MAX = 160;

export type Head = { title: string; description: string; robots: string };
export type PageRow = Head & { url: string; status: number };

function decode(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();
}

function metaContent(head: string, name: string): string {
  const tag = head.match(new RegExp(`<meta[^>]*name="${name}"[^>]*>`, "i"))?.[0];
  return tag ? decode(tag.match(/content="([^"]*)"/i)?.[1] ?? "") : "";
}

/** Title, description and robots from the document head (the body is ignored). */
export function readHead(html: string): Head {
  const head = html.split(/<\/head>/i)[0];
  const title = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "";
  return { title: decode(title), description: metaContent(head, "description"), robots: metaContent(head, "robots") };
}

export type AuditReport = {
  checked: number;
  failed: PageRow[];
  longTitles: PageRow[];
  duplicateTitles: { title: string; urls: string[] }[];
  badDescriptions: PageRow[];
  noindex: PageRow[];
};

export function auditPages(rows: PageRow[]): AuditReport {
  const live = rows.filter((r) => r.status === 200);
  const byTitle = new Map<string, string[]>();
  for (const r of live) byTitle.set(r.title, [...(byTitle.get(r.title) ?? []), r.url]);
  return {
    checked: rows.length,
    failed: rows.filter((r) => r.status !== 200),
    longTitles: live.filter((r) => r.title.length > TITLE_MAX),
    duplicateTitles: [...byTitle]
      .filter(([, urls]) => urls.length > 1)
      .map(([title, urls]) => ({ title, urls })),
    badDescriptions: live.filter(
      (r) => r.description.length < DESCRIPTION_MIN || r.description.length > DESCRIPTION_MAX
    ),
    noindex: live.filter((r) => /noindex/i.test(r.robots)),
  };
}
