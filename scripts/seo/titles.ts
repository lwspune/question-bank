/**
 * Read every sitemap page's <head> and report what a search engine's SEO report
 * would flag: long titles, duplicate titles, descriptions outside Bing's range,
 * noindex pages, and sitemap URLs that do not return 200.
 *
 *   npm run seo:titles                                  # the live site
 *   npm run seo:titles -- --site=http://localhost:3000  # a local `next start`, before deploying
 *   npm run seo:titles -- --only=notes --limit=100    # no leading slash in Git Bash
 *
 * READ-ONLY TRIAGE — fetches pages, writes nothing, always exits 0. Run it
 * after a content release, and before an IndexNow submission (2026-09-27 sent
 * 57 URLs that 404'd because nobody looked first). Pure core:
 * src/lib/seo/pageAudit.ts.
 */
import { readHead, auditPages, type PageRow } from "../../src/lib/seo/pageAudit";
import { TITLE_MAX } from "../../src/lib/seo/title";

const LIVE = "https://www.pyqvault.com";
const CONCURRENCY = 6; // gentle: this is our own production site
const SHOW = 15;

function arg(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : undefined;
}

async function fetchText(url: string): Promise<{ status: number; body: string }> {
  const res = await fetch(url, { headers: { "User-Agent": "pyqvault-seo-titles" }, redirect: "manual" });
  return { status: res.status, body: res.status === 200 ? await res.text() : "" };
}

async function main() {
  const site = (arg("site") ?? LIVE).replace(/\/$/, "");
  // Accepts "notes" as well as "/notes": Git Bash rewrites a leading-slash
  // argument into a Windows path, which silently filtered out every page.
  const rawOnly = arg("only");
  const only = rawOnly ? `/${rawOnly.replace(/^\/+/, "")}` : undefined;
  const limit = Number(arg("limit") ?? Infinity);

  const sitemap = await fetchText(`${site}/sitemap.xml`);
  if (sitemap.status !== 200) throw new Error(`sitemap: HTTP ${sitemap.status}`);
  // The sitemap always names the live host; point each URL at --site.
  const paths = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(/^https?:\/\/[^/]+/, "") || "/")
    .filter((p) => !only || p.startsWith(only))
    .slice(0, limit);

  console.log(`Reading ${paths.length} pages from ${site} ...`);
  const rows: PageRow[] = new Array(paths.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (next < paths.length) {
        const i = next++;
        try {
          const { status, body } = await fetchText(site + paths[i]);
          rows[i] = { url: paths[i], status, ...readHead(body) };
        } catch {
          rows[i] = { url: paths[i], status: 0, title: "", description: "", robots: "" };
        }
      }
    })
  );

  const r = auditPages(rows);
  const list = (label: string, items: string[]) => {
    console.log(`\n${label}: ${items.length}`);
    for (const s of items.slice(0, SHOW)) console.log(`  ${s}`);
    if (items.length > SHOW) console.log(`  … and ${items.length - SHOW} more`);
  };
  console.log(`\nChecked ${r.checked} pages.`);
  list("Not 200", r.failed.map((x) => `${x.status} ${x.url}`));
  list(`Titles over ${TITLE_MAX}`, r.longTitles.map((x) => `${x.title.length} ${x.url} | ${x.title}`));
  list("Duplicate titles", r.duplicateTitles.map((d) => `${d.title} <- ${d.urls.join(", ")}`));
  list("Descriptions outside 25-160", r.badDescriptions.map((x) => `${x.description.length} ${x.url}`));
  list("noindex in the sitemap", r.noindex.map((x) => x.url));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
