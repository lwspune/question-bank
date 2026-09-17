/**
 * Push the sitemap's URLs to IndexNow (Bing · Yandex · Naver · Seznam).
 *
 *   npm run seo:indexnow                 # DRY RUN — prints, submits nothing
 *   npm run seo:indexnow -- --apply      # actually submit
 *   npm run seo:indexnow -- --only=/guide     # just one subtree
 *   npm run seo:indexnow -- --limit=50        # first N after filtering
 *
 * DRY RUN BY DEFAULT, like `email:send` and `itemstats:rollup`. Submitting is
 * an outward-facing action against someone else's index, so it takes an
 * explicit `--apply`.
 *
 * WHY: Search Console reads 12 indexed / 1,462 not, and the crawl export shows
 * **21 discovery requests in 51 days** — a ~9.5-year backlog. Google has no API
 * for this and does not participate in IndexNow. What this reaches is Bing
 * (already the #3 referrer at 204 visitors/30d, and the index behind ChatGPT
 * search) plus Yandex, Naver and Seznam. See src/lib/seo/indexnow.ts.
 *
 * URLs come from the LIVE sitemap, not the local loader, for two reasons: it is
 * what search engines actually see, and `listChapterLandings` is wrapped in
 * `unstable_cache`, which throws outside a Next render context — the sitemap's
 * own `catch` then returns `[]` and a local dump silently loses all 631
 * `/questions` URLs. That trap has already cost one false alarm; see the
 * 2026-09-17 ROADMAP entry.
 */
import { join } from "path";
import { readdirSync } from "fs";
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

import {
  buildIndexNowPayloads,
  isValidIndexNowKey,
  INDEXNOW_ENDPOINT,
  type IndexNowPayload,
} from "../../src/lib/seo/indexnow";

const HOST = "www.pyqvault.com";
const SITE = `https://${HOST}`;

/**
 * Prefixes held back from submission.
 *
 * `/formula` shipped 2026-09-17 and has NOT had a browser pass. Asking an index
 * to fetch an unverified surface is the "reported done before the golden path
 * was walked" failure the project's definition of done exists to prevent.
 *
 * TO REMOVE: walk /formula and one identity page in a browser, confirm they
 * render, then delete this entry. It is a dated hold, not a permanent rule.
 */
const HOLD_PREFIXES = ["/formula"];

function arg(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : undefined;
}
const has = (name: string) => process.argv.includes(`--${name}`);

/** The key file lives in public/ and its NAME is the key. */
function resolveKey(): string {
  const fromEnv = process.env.INDEXNOW_KEY;
  if (fromEnv && isValidIndexNowKey(fromEnv)) return fromEnv;

  const files = readdirSync(join(process.cwd(), "public")).filter(
    (f) => f.endsWith(".txt") && isValidIndexNowKey(f.slice(0, -4))
  );
  if (files.length === 1) return files[0].slice(0, -4);
  if (files.length === 0) {
    throw new Error(
      "No IndexNow key file in public/. Create public/<key>.txt containing <key>."
    );
  }
  throw new Error(
    `Ambiguous IndexNow key: ${files.length} candidate .txt files in public/ (${files.join(", ")}). ` +
      `Set INDEXNOW_KEY to pick one.`
  );
}

async function fetchSitemapUrls(): Promise<string[]> {
  const res = await fetch(`${SITE}/sitemap.xml`, {
    headers: { "user-agent": "pyqvault-indexnow/1.0" },
  });
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urls.length === 0) throw new Error("sitemap.xml parsed to zero URLs");
  return urls;
}

async function main() {
  const apply = has("apply");
  const only = arg("only");
  const limit = arg("limit") ? Number(arg("limit")) : undefined;
  const key = resolveKey();
  const keyLocation = `${SITE}/${key}.txt`;

  console.log("IndexNow submission%s", apply ? "" : "  [DRY RUN — nothing is sent]");
  console.log("  host        %s", HOST);
  console.log("  key         %s…%s", key.slice(0, 4), key.slice(-4));
  console.log("  keyLocation %s", keyLocation);
  console.log("");

  // The ownership check must resolve BEFORE we submit, or every engine rejects
  // the batch. Cheaper to fail here than to read a 403 per engine.
  const probe = await fetch(keyLocation);
  const probeBody = probe.ok ? (await probe.text()).trim() : "";
  if (!probe.ok || probeBody !== key) {
    console.error(
      "FAIL: %s did not serve the key (HTTP %d, body %j).",
      keyLocation,
      probe.status,
      probeBody.slice(0, 40)
    );
    console.error("      Deploy public/%s.txt before submitting.", key);
    // exitCode + return, never process.exit(): an immediate exit while the
    // fetch handle is still open trips a libuv assertion on Windows and buries
    // the real message under a C-level stack trace.
    process.exitCode = 1;
    return;
  }
  console.log("  key file verified live ✓\n");

  const all = await fetchSitemapUrls();
  let urls = all.filter((u) => {
    const path = u.startsWith(SITE) ? u.slice(SITE.length) : u;
    return !HOLD_PREFIXES.some((p) => path === p || path.startsWith(p + "/"));
  });
  const held = all.length - urls.length;

  if (only) urls = urls.filter((u) => u.includes(only));
  if (limit !== undefined && Number.isFinite(limit)) urls = urls.slice(0, limit);

  console.log("  sitemap URLs      %d", all.length);
  if (held) console.log("  held back         %d  (%s — unverified)", held, HOLD_PREFIXES.join(", "));
  if (only) console.log("  after --only=%s   %d", only, urls.length);
  if (limit !== undefined) console.log("  after --limit     %d", urls.length);

  let payloads: IndexNowPayload[];
  try {
    payloads = buildIndexNowPayloads(urls, { host: HOST, key, keyLocation });
  } catch (e) {
    console.error("\nFAIL building payload: %s", (e as Error).message);
    process.exitCode = 1;
    return;
  }

  console.log("  submissions       %d\n", payloads.length);
  if (payloads.length === 0) {
    console.log("Nothing to submit.");
    return;
  }

  for (const [i, p] of payloads.entries()) {
    console.log("  [%d/%d] %d URLs", i + 1, payloads.length, p.urlList.length);
    console.log("        first: %s", p.urlList[0]);
    console.log("        last : %s", p.urlList[p.urlList.length - 1]);

    if (!apply) continue;

    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify(p),
    });
    const body = await res.text().catch(() => "");
    // 200 accepted · 202 accepted, key pending validation. Both are successes.
    const ok = res.status === 200 || res.status === 202;
    console.log("        -> HTTP %d %s %s", res.status, ok ? "OK" : "FAILED", body.slice(0, 200));
    if (!ok) process.exitCode = 1;
  }

  console.log("");
  console.log(
    apply
      ? "Submitted. Bing indexes on its own schedule — check Bing Webmaster Tools in a few days."
      : "DRY RUN complete. Re-run with `-- --apply` to submit."
  );
  console.log("NOTE: Google does not participate in IndexNow. This does not affect Google.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
