/**
 * Step 1 of the IPMAT pipeline: fetch the source pages and cache them.
 *
 * Caches raw HTML under scripts/ipmat/out/html/ (gitignored via the top-level
 * `out/` rule). Re-running skips anything already on disk, so the extractor can
 * be iterated on freely without re-hitting the source — which is the point.
 * Pass --force to refetch.
 *
 *   npx tsx scripts/ipmat/fetch.ts                  # all three exams
 *   npx tsx scripts/ipmat/fetch.ts -- --exam=jipmat # one exam
 *   npx tsx scripts/ipmat/fetch.ts -- --force
 *
 * WHAT TO FETCH IS DISCOVERED, NOT ASSUMED. Each exam's landing page is read
 * first and its year/section links are parsed. Iterating PAPER_GRID instead —
 * which is what the first version did — makes the grid unfalsifiable: a sitting
 * the source has newly published would never be fetched, so it could never be
 * reported. The fetch list is the UNION of discovered and grid papers, so both
 * directions of disagreement surface: a new paper appears, and a grid paper
 * whose page has gone is still attempted and still fails loudly.
 *
 * Deliberately sequential with a delay between requests. 48 pages is a small
 * job and there is no reason to hammer someone else's server for it.
 */
import { existsSync, mkdirSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  IPMAT_EXAMS,
  PAPER_GRID,
  discoverPapers,
  landingUrl,
  pageUrl,
  paperFileName,
  type IpmatExamSlug,
  type PaperKey,
} from "./config";

const HTML_DIR = join(__dirname, "out", "html");
const DELAY_MS = 1200;
/** Below this, the response is an error page or a truncated body, not a paper. */
const MIN_PLAUSIBLE_BYTES = 20_000;

function arg(name: string): string | undefined {
  const hit = process.argv.slice(2).find((a) => a.startsWith(`--${name}=`));
  return hit?.split("=").slice(1).join("=");
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const keyOf = (p: PaperKey) => `${p.exam}/${p.year}/${p.section}`;

async function main() {
  const force = process.argv.includes("--force");
  const only = arg("exam") as IpmatExamSlug | undefined;
  const exams = IPMAT_EXAMS.filter((e) => !only || e.slug === only);
  if (exams.length === 0) {
    console.error(`no exam matched --exam=${only}`);
    process.exit(1);
  }

  mkdirSync(HTML_DIR, { recursive: true });

  // ---- discovery
  console.log("discovering papers from each exam's landing page\n");
  const discovered: PaperKey[] = [];
  const discoveryFailures: string[] = [];

  for (const exam of exams) {
    try {
      const res = await fetch(landingUrl(exam.slug), { redirect: "follow" });
      if (!res.ok) {
        discoveryFailures.push(`${exam.slug} landing page: HTTP ${res.status}`);
        continue;
      }
      const found = discoverPapers(exam.slug, await res.text());
      discovered.push(...found);
      const years = [...new Set(found.map((p) => p.year))].sort();
      console.log(
        `  ${exam.slug.padEnd(14)} ${String(found.length).padStart(2)} papers, years ${years.join(", ") || "(none)"}`
      );
      if (found.length === 0) discoveryFailures.push(`${exam.slug}: landing page listed no papers`);
    } catch (err) {
      discoveryFailures.push(`${exam.slug} landing page: ${(err as Error).message}`);
    }
    await sleep(DELAY_MS);
  }

  // ---- reconcile discovery against the grid, BEFORE fetching
  const gridPapers = PAPER_GRID.filter((p) => !only || p.exam === only);
  const gridKeys = new Set(gridPapers.map(keyOf));
  const discoveredKeys = new Set(discovered.map(keyOf));

  const newToUs = discovered.filter((p) => !gridKeys.has(keyOf(p)));
  const goneFromSource = gridPapers.filter((p) => !discoveredKeys.has(keyOf(p)));

  if (newToUs.length) {
    console.log(`\nNEW PAPERS the grid does not list (${newToUs.length}):`);
    for (const p of newToUs) console.log(`  ${p.exam} ${p.year} ${p.section}`);
    console.log("  -> fetching them, but extract will FAIL until config.ts records their size");
  }
  if (goneFromSource.length) {
    console.log(`\nGRID PAPERS the landing page no longer links (${goneFromSource.length}):`);
    for (const p of goneFromSource) console.log(`  ${p.exam} ${p.year} ${p.section}`);
    console.log("  -> still attempting them, so the failure is explicit rather than a silent skip");
  }

  // Union, so neither direction of disagreement can hide.
  const byKey = new Map<string, PaperKey>();
  for (const p of [...discovered, ...gridPapers.map((g) => ({ exam: g.exam, year: g.year, section: g.section }))]) {
    byKey.set(keyOf(p), p);
  }
  const papers = [...byKey.values()].sort(
    (a, b) => a.exam.localeCompare(b.exam) || a.year - b.year || a.section.localeCompare(b.section)
  );

  // ---- fetch
  console.log(`\nfetching ${papers.length} papers into ${HTML_DIR}`);
  if (!force) console.log("(already-cached pages are skipped; use --force to refetch)\n");

  let fetched = 0;
  let skipped = 0;
  const failures: string[] = [...discoveryFailures];

  for (const p of papers) {
    const dest = join(HTML_DIR, paperFileName(p.exam, p.year, p.section));
    const label = `${p.exam} ${p.year} ${p.section}`;

    if (!force && existsSync(dest) && statSync(dest).size >= MIN_PLAUSIBLE_BYTES) {
      skipped++;
      continue;
    }

    try {
      const res = await fetch(pageUrl(p.exam, p.year, p.section), { redirect: "follow" });
      if (!res.ok) {
        failures.push(`${label}: HTTP ${res.status}`);
        console.log(`  ${label.padEnd(28)} HTTP ${res.status}`);
        continue;
      }
      const body = await res.text();
      if (body.length < MIN_PLAUSIBLE_BYTES) {
        // Saving this would make the next extract run fail confusingly, against
        // a file that looks like a cached page.
        failures.push(`${label}: body only ${body.length} bytes — not saved`);
        console.log(`  ${label.padEnd(28)} SHORT ${body.length}B — not saved`);
        continue;
      }
      writeFileSync(dest, body, "utf8");
      fetched++;
      console.log(`  ${label.padEnd(28)} ok ${(body.length / 1024).toFixed(0)}KB`);
    } catch (err) {
      failures.push(`${label}: ${(err as Error).message}`);
      console.log(`  ${label.padEnd(28)} ERROR ${(err as Error).message}`);
    }

    await sleep(DELAY_MS);
  }

  console.log(`\nfetched ${fetched} | cached already ${skipped} | failed ${failures.length}`);
  if (failures.length) {
    console.log("\nfailures:");
    for (const f of failures) console.log("  " + f);
    process.exit(1);
  }
  if (newToUs.length) {
    console.log("\nACTION NEEDED: record the new paper(s) in scripts/ipmat/config.ts PAPER_GRID");
    process.exit(1);
  }
  console.log("\nnext: npx tsx scripts/ipmat/extract.ts");
}

void main();
