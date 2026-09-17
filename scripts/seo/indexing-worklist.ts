/**
 * Regenerate SEO_INDEXING_WORKLIST.md — the ranked queue for Search Console's
 * manual "Request Indexing".
 *
 *   npm run seo:worklist
 *   npm run seo:worklist -- --include-held                         # stop holding /formula
 *   npm run seo:worklist -- --out=/tmp/list.md
 *
 * WHY: Google's only manual lever is ~10–12 URLs/day, and the sitemap holds
 * ~1,279. That is a 128-day queue, so the ORDER is the deliverable. Ranking
 * rules and the reasoning behind them live in src/lib/seo/indexingPriority.ts.
 *
 * Read-only. Writes one markdown file and nothing else.
 *
 * URLs come from the LIVE sitemap rather than the local loader, because
 * `listChapterLandings` is wrapped in `unstable_cache` and throws outside a Next
 * render context — `sitemap.ts`'s own `catch` then returns `[]`, so a local dump
 * silently loses all 631 `/questions` URLs and looks like a catastrophic
 * regression. That already cost one false alarm; see the 2026-09-17 ROADMAP
 * entry.
 */
import { join } from "path";
import { writeFileSync } from "fs";
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

import { createSupabaseAdminClient } from "../../src/lib/supabase/admin";
import { slugifyName } from "../../src/lib/questions/slugs";
import {
  rankForIndexing,
  DEFAULT_HOLD_PREFIXES,
} from "../../src/lib/seo/indexingPriority";

const SITE = "https://www.pyqvault.com";

function arg(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : undefined;
}

async function fetchSitemapUrls(): Promise<string[]> {
  const res = await fetch(`${SITE}/sitemap.xml`, {
    headers: { "user-agent": "pyqvault-worklist/1.0" },
  });
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urls.length === 0) throw new Error("sitemap.xml parsed to zero URLs");
  return urls;
}

/**
 * PUBLIC question count per "<examSlug>/<subjectSlug>/<chapterSlug>".
 *
 * Paged in 1000-row windows: PostgREST silently truncates a raw select at row
 * 1000, and this derives a count from the row payload — the single most-repeated
 * bug in this codebase.
 */
async function fetchQuestionCounts(): Promise<Record<string, number>> {
  const db = createSupabaseAdminClient();
  const counts: Record<string, number> = {};
  let from = 0;

  for (;;) {
    const { data, error } = await db
      .from("questions")
      .select("id, chapter:chapters(name, subject:subjects(name, exam:exams(name)))")
      .eq("visibility", "PUBLIC")
      // ORDER BY is NOT optional when paging with .range(). Without a stable
      // sort Postgres may return rows in a different order per window, so rows
      // are silently skipped and others counted twice -- two runs minutes apart
      // reported 774 and 753 chapters off the identical bank. `id` is the
      // primary key, so it is total and stable.
      .order("id", { ascending: true })
      .range(from, from + 999);
    if (error) throw error;
    if (!data || data.length === 0) break;

    for (const row of data as unknown as Record<string, unknown>[]) {
      const ch = (Array.isArray(row.chapter) ? row.chapter[0] : row.chapter) as
        | { name: string; subject: unknown }
        | undefined;
      if (!ch) continue;
      const sub = (Array.isArray(ch.subject) ? ch.subject[0] : ch.subject) as
        | { name: string; exam: unknown }
        | undefined;
      if (!sub) continue;
      const ex = (Array.isArray(sub.exam) ? sub.exam[0] : sub.exam) as
        | { name: string }
        | undefined;
      if (!ex) continue;

      const key = `${slugifyName(ex.name)}/${slugifyName(sub.name)}/${slugifyName(ch.name)}`;
      counts[key] = (counts[key] ?? 0) + 1;
    }

    if (data.length < 1000) break;
    from += 1000;
  }
  return counts;
}

async function main() {
  const out = arg("out") ?? join(process.cwd(), "SEO_INDEXING_WORKLIST.md");
  const holdPrefixes = process.argv.includes("--include-held") ? [] : DEFAULT_HOLD_PREFIXES;

  console.log("Regenerating the Request-Indexing worklist");
  console.log("  holding   %s", holdPrefixes.length ? holdPrefixes.join(", ") : "(nothing)");

  const [urls, questionCounts] = await Promise.all([
    fetchSitemapUrls(),
    fetchQuestionCounts(),
  ]);
  console.log("  sitemap   %d URLs", urls.length);
  console.log("  counts    %d chapters\n", Object.keys(questionCounts).length);

  const ranked = rankForIndexing(urls, { site: SITE, holdPrefixes, questionCounts });
  const held = urls.length - ranked.length;

  const today = new Date().toISOString().slice(0, 10);
  const lines: string[] = [
    "# Search Console — manual Request-Indexing worklist",
    "",
    `Generated ${today} from the live sitemap. **${ranked.length} URLs**` +
      (held ? `, after withholding ${held}` : "") +
      (holdPrefixes.length ? ` (${holdPrefixes.join(", ")} — no browser pass yet, and the 192 thin mock leaves).` : "."),
    "",
    "Regenerate with `npm run seo:worklist`.",
    "",
    "## How to use this",
    "",
    "Open **Search Console → URL Inspection** (the search bar across the top of the",
    "page). Copy a URL from the day's block below, paste it in, press Enter, wait for",
    "the live check, then click **Request Indexing**.",
    "",
    "Google offers no bulk submission — one page at a time is the whole manual lever.",
    "Budget about **5–7 minutes for a day's ten**. The quota is roughly 10–12 per",
    "property per day and resets daily; GSC says plainly when you hit it, so stop",
    "there and pick up tomorrow.",
    "",
    "**Track by day number, not by ticking rows.** Submission is not indexing — that",
    "lands days later and is read in the Pages report, never here.",
    "",
    "**Bulk submission exists, just not for Google.** `npm run seo:indexnow -- --apply`",
    "pushes every URL to Bing, Yandex, Naver and Seznam in one request. Google does",
    "not participate in IndexNow, which is why this hand-worked list exists at all.",
    "",
    "## Why this order",
    "",
    "Ranked by **winnability, not content depth**. At domain-authority zero a JEE or",
    "NEET page cannot outrank Allen or Physics Wallah whatever is on it, while an NDA",
    "or CDS page competes today — so exam weight outranks question count, and count",
    "only breaks ties within an exam. Pages answering a query Search Console has",
    "actually recorded get a bonus. **Do not re-sort by question count**; see",
    "`src/lib/seo/indexingPriority.ts` and its spec.",
    "",
    "Day 1 is the hubs — they pass authority to everything beneath them.",
  ];

  // PLAIN URLs in a fenced block, one per line.
  //
  // The first build emitted markdown links to Search Console's URL Inspection
  // deep link. They are not clickable everywhere the file gets read (IDE
  // previews, GitHub's blob view, a plain editor), and a link that only works
  // in some readers is worse than no link: it hides the URL you actually need
  // to copy. A fenced block renders as selectable text everywhere and picks up
  // a copy button in most viewers.
  ranked.forEach((r, i) => {
    if (i % 10 === 0) {
      if (i > 0) lines.push("```");
      lines.push("", `### Day ${Math.floor(i / 10) + 1}`, "", "```");
    }
    lines.push(r.url);
  });
  if (ranked.length) lines.push("```");

  writeFileSync(out, lines.join("\n") + "\n", "utf-8");
  console.log("wrote %s", out);
  console.log("  %d URLs across %d days", ranked.length, Math.ceil(ranked.length / 10));
  console.log("\nfirst 5:");
  // Node's console.log has no width/precision specifiers, so format first.
  for (const r of ranked.slice(0, 5)) {
    console.log("  %s  %s", r.score.toFixed(1).padStart(8), r.path);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
