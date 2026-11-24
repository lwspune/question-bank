/**
 * How heavy each page is on a student's phone (PAGE_WEIGHT_SPEC.md item 0).
 *
 *   npm run audit:page-weight                                  # the standard page set, live site
 *   npm run audit:page-weight -- --pages=/,/pricing --runs=3   # median of 3 runs
 *   npm run audit:page-weight -- --base=http://localhost:3000  # a local server instead
 *   npm run audit:page-weight -- --save-baseline               # write scripts/perf/page-weight-baseline.json
 *   npm run audit:page-weight -- --check                       # exit 1 if a page rose >10% over the baseline
 *   npm run audit:page-weight -- --html-diff --before=https://www.pyqvault.com --after=http://localhost:3000
 *   npm run audit:page-weight -- --save-html=<dir> --base=http://localhost:3001   # save, then --html-diff two folders
 *
 * Each page is opened in a FRESH headless Edge (empty cache, signed out) as a
 * 390 px phone with its processor slowed `--cpu` times (default 4, the usual
 * stand-in for a mid-range Android). It records every request until the page
 * settles, then scrolls to the foot and records again, because the footer's
 * links make the router fetch dozens more pages in advance.
 *
 * --html-diff is the spec's Rule A: it fetches each page's server HTML from
 * both sides and lists every difference in what a search engine reads (title,
 * meta, canonical, JSON-LD, headings, links, visible text). Empty = no SEO
 * change. Data can differ between two servers (a count that moved), so read a
 * difference before calling it a regression.
 *
 * Writes report.md + results.json to generated-papers/page-weight/<stamp>/.
 * Reads only; never signs in, never writes to any site. Local only: it needs
 * Edge, so it is not in the push gate. Pure half: scripts/lib/pageWeight.ts.
 */
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { evaluate, launch, PHONE_UA, sleep, type Cdp } from "../ui/edge";
import { pageSlug } from "../ui/lib";
import {
  blockingTime,
  compareToBaseline,
  diffSeoViews,
  isSavedFolder,
  parsePageWeightArgs,
  prefetchedPages,
  seoView,
  summarise,
  type Measurement,
  type RequestRecord,
} from "../lib/pageWeight";

const GOOGLEBOT_UA =
  "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const BASELINE = resolve("scripts/perf/page-weight-baseline.json");
const SETTLE_MS = 12_000;
const AFTER_SCROLL_MS = 6_000;

/** Long tasks, largest paint and layout shift, collected from the very first frame. */
const OBSERVE = `(() => {
  window.__pw = { lt: [], lcp: 0, cls: 0 };
  const watch = (type, fn) => { try { new PerformanceObserver((l) => l.getEntries().forEach(fn)).observe({ type, buffered: true }); } catch {} };
  watch('longtask', (e) => window.__pw.lt.push(e.duration));
  watch('largest-contentful-paint', (e) => { window.__pw.lcp = e.startTime; });
  watch('layout-shift', (e) => { if (!e.hadRecentInput) window.__pw.cls += e.value; });
})()`;

type Live = RequestRecord & { id: string };

async function measureOnce(url: string, cpu: number): Promise<Measurement> {
  const profile = mkdtempSync(join(tmpdir(), "page-weight-"));
  const { proc, cdp } = await launch(profile);
  try {
    const reqs = new Map<string, Live>();
    cdp.on("Network.requestWillBeSent", (p) => {
      const r = p.request as { url: string };
      reqs.set(String(p.requestId), { id: String(p.requestId), url: r.url, type: String(p.type ?? "Other"), sentBytes: 0, unpackedBytes: 0 });
    });
    cdp.on("Network.dataReceived", (p) => {
      const r = reqs.get(String(p.requestId));
      if (r) r.unpackedBytes += Number(p.dataLength) || 0;
    });
    cdp.on("Network.loadingFinished", (p) => {
      const r = reqs.get(String(p.requestId));
      if (r) r.sentBytes = Number(p.encodedDataLength) || 0;
    });
    await cdp.send("Network.enable");
    await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
    await cdp.send("Page.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 3, mobile: true });
    await cdp.send("Emulation.setUserAgentOverride", { userAgent: PHONE_UA });
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu });
    await cdp.send("Page.addScriptToEvaluateOnNewDocument", { source: OBSERVE });
    await cdp.send("Page.navigate", { url });
    await sleep(SETTLE_MS);

    const host = new URL(url).host;
    const atOpen = [...reqs.values()].map((r) => ({ ...r }));
    const perf = (await evaluate(
      cdp,
      `JSON.stringify({ lt: window.__pw.lt, lcp: window.__pw.lcp, cls: window.__pw.cls, elements: document.getElementsByTagName('*').length })`,
    )) as string;
    const p = JSON.parse(perf) as { lt: number[]; lcp: number; cls: number; elements: number };

    await evaluate(
      cdp,
      `(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 250)); } })()`,
    );
    await sleep(AFTER_SCROLL_MS);
    const all = [...reqs.values()];
    const openIds = new Set(atOpen.map((r) => r.id));

    return {
      path: url,
      open: summarise(atOpen, host),
      scrolled: summarise(all, host),
      prefetchOpen: prefetchedPages(atOpen),
      prefetchScrolled: prefetchedPages(all.filter((r) => !openIds.has(r.id))),
      perf: {
        blockingMs: blockingTime(p.lt),
        longTasks: p.lt.length,
        longestTaskMs: Math.round(Math.max(0, ...p.lt)),
        lcpMs: Math.round(p.lcp),
        cls: Math.round(p.cls * 1000) / 1000,
        elements: p.elements,
      },
    };
  } finally {
    await closeQuietly(cdp, proc, profile);
  }
}

async function closeQuietly(cdp: Cdp, proc: { kill: () => boolean }, profile: string) {
  cdp.close();
  proc.kill();
  await sleep(800);
  // Edge can hold the profile for a moment after kill; a failed delete must
  // not hide the real result. The ui-shots leftover rule applies: report it.
  try {
    rmSync(profile, { recursive: true, force: true, maxRetries: 8, retryDelay: 300 });
  } catch (e) {
    console.warn(`could not remove the temporary profile ${profile}: ${e instanceof Error ? e.message : e}`);
  }
}

const median = (xs: number[]) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];

/** Several runs of one page: the run with the median blocking time, so all its numbers belong together. */
function pickMedian(runs: Measurement[]): Measurement {
  const mid = median(runs.map((r) => r.perf.blockingMs));
  return runs.find((r) => r.perf.blockingMs === mid) ?? runs[0];
}

const pathOf = (page: string) => (page.startsWith("http") ? page : page);
const urlOf = (base: string, page: string) => (page.startsWith("http") ? page : base + page);

function report(results: Measurement[], regressions: string[] | null, cpu: number, base: string): string {
  const lines = [
    `# Page weight, ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC`,
    "",
    `${base} · signed-out phone, 390 px · processor ${cpu}x slower · empty cache. KB: sent = compressed download, unpacked = what the phone reads.`,
    "",
    "| Page | Sent at open | Sent scrolled | Unpacked scrolled | Requests open / scrolled | Blocking | Largest paint | Elements |",
    "|---|---|---|---|---|---|---|---|",
    ...results.map(
      (r) =>
        `| ${r.path} | ${r.open.sentKB} | ${r.scrolled.sentKB} | ${r.scrolled.unpackedKB} | ${r.open.requests} / ${r.scrolled.requests} | ${(r.perf.blockingMs / 1000).toFixed(1)} s | ${(r.perf.lcpMs / 1000).toFixed(1)} s | ${r.perf.elements} |`,
    ),
    "",
  ];
  for (const r of results) {
    lines.push(`## ${r.path}`, "", "| Part | Requests | Sent KB | Unpacked KB |", "|---|---|---|---|");
    for (const [k, t] of Object.entries(r.open.byKind).sort((a, b) => (b[1]?.sentKB ?? 0) - (a[1]?.sentKB ?? 0))) {
      lines.push(`| ${k} | ${t?.requests} | ${t?.sentKB} | ${t?.unpackedKB} |`);
    }
    lines.push("", `Fetched in advance at open: ${r.prefetchOpen.length} pages. After scrolling: ${r.prefetchScrolled.length} more.`);
    const top = [...r.prefetchOpen, ...r.prefetchScrolled].sort((a, b) => b.unpackedKB - a.unpackedKB).slice(0, 8);
    if (top.length) lines.push("", "Largest: " + top.map((p) => `${p.path} ${p.unpackedKB} KB${p.requests > 1 ? ` (${p.requests} requests)` : ""}`).join(" · "));
    lines.push("");
  }
  if (regressions) {
    lines.push("## Against the baseline", "", regressions.length ? regressions.map((x) => `- ${x}`).join("\n") : "No page rose more than 10%.", "");
  }
  return lines.join("\n");
}

type Saved = { origin: string; status: Record<string, number> };

async function fetchPage(base: string, page: string) {
  // As Google's phone crawler: Next serves a crawler the full head (metadata
  // not streamed), so this is the HTML a search engine actually reads.
  const res = await fetch(urlOf(base, page), { headers: { "user-agent": GOOGLEBOT_UA }, redirect: "follow" });
  return { status: res.status, html: await res.text() };
}

/** --save-html: each page's server HTML, one file each, plus the origin and status codes. */
async function saveHtml(pages: string[], base: string, dir: string) {
  mkdirSync(dir, { recursive: true });
  const meta: Saved = { origin: new URL(base).origin, status: {} };
  for (const page of pages) {
    const p = await fetchPage(base, page);
    writeFileSync(join(dir, `${pageSlug(page)}.html`), p.html);
    meta.status[page] = p.status;
    console.log(`${p.status} ${page}`);
  }
  writeFileSync(join(dir, "pages.json"), JSON.stringify(meta, null, 1));
}

/** One --html-diff side: a live fetch from a server, or a page saved by --save-html. */
async function readSide(side: string, page: string) {
  if (!isSavedFolder(side)) return { ...(await fetchPage(side, page)), origin: new URL(side).origin };
  const meta = JSON.parse(readFileSync(join(side, "pages.json"), "utf8")) as Saved;
  if (!(page in meta.status)) throw new Error(`${side} has no saved copy of ${page}`);
  return { status: meta.status[page], html: readFileSync(join(side, `${pageSlug(page)}.html`), "utf8"), origin: meta.origin };
}

async function htmlDiff(pages: string[], before: string, after: string): Promise<string[]> {
  const out: string[] = [];
  for (const page of pages) {
    const [a, b] = await Promise.all([readSide(before, page), readSide(after, page)]);
    const diffs = a.status !== b.status ? [`status ${a.status} -> ${b.status}`] : diffSeoViews(seoView(a.html, a.origin), seoView(b.html, b.origin));
    console.log(`${diffs.length ? "DIFFERS" : "same   "} ${page}`);
    out.push(`## ${page}`, "", diffs.length ? "```\n" + diffs.join("\n") + "\n```" : "No difference in what a search engine reads.", "");
  }
  return out;
}

async function main() {
  const args = parsePageWeightArgs(process.argv.slice(2));
  const stamp = new Date().toISOString().replace(/[:T]/g, "-").slice(0, 19);
  const dir = resolve(args.out ?? join("generated-papers", "page-weight", stamp));
  mkdirSync(dir, { recursive: true });

  if (args.mode === "save-html") {
    await saveHtml(args.pages, args.base, resolve(args.saveHtml!));
    console.log(`\nsaved: ${resolve(args.saveHtml!)}`);
    return;
  }

  if (args.mode === "html-diff") {
    const body = await htmlDiff(args.pages, args.before!, args.after!);
    writeFileSync(join(dir, "html-diff.md"), [`# What a search engine reads: ${args.before} vs ${args.after}`, "", ...body].join("\n"));
    console.log(`\nreport: ${join(dir, "html-diff.md")}`);
    return;
  }

  const results: Measurement[] = [];
  for (const page of args.pages) {
    const runs: Measurement[] = [];
    for (let i = 0; i < args.runs; i++) {
      process.stdout.write(`${page} run ${i + 1}/${args.runs} ... `);
      const m = await measureOnce(urlOf(args.base, page), args.cpu);
      runs.push({ ...m, path: pathOf(page) });
      console.log(`${m.open.sentKB} KB sent, ${(m.perf.blockingMs / 1000).toFixed(1)} s blocking`);
    }
    results.push(pickMedian(runs));
  }

  const baseline: Measurement[] | null = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, "utf8")) : null;
  const regressions = baseline ? compareToBaseline(results, baseline) : null;
  writeFileSync(join(dir, "results.json"), JSON.stringify(results, null, 1));
  writeFileSync(join(dir, "report.md"), report(results, regressions, args.cpu, args.base));
  console.log(`\nreport: ${join(dir, "report.md")}`);

  if (args.mode === "save-baseline") {
    writeFileSync(BASELINE, JSON.stringify(results, null, 1) + "\n");
    console.log(`baseline saved: ${BASELINE}`);
  }
  if (args.mode === "check" && regressions?.length) {
    console.error(`\n${regressions.length} page(s) rose more than 10%:\n${regressions.join("\n")}`);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
