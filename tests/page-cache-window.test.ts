/**
 * A cached page refreshes as often as the SHORTEST cache anything on it uses.
 *
 * Next.js takes the minimum of the page's own `revalidate` and every
 * `unstable_cache` / `fetch(..., { next: { revalidate } })` reached while it
 * renders. From 2026-07-29 to 2026-10-06 the header's exam-id cache
 * (src/lib/exam/examIdMap.ts) and the chapter-test links
 * (src/lib/mocks/chapterTestsQuery.ts) were both set to one hour, so 3,258 of
 * 3,264 cached pages refreshed HOURLY while their files said daily. Nothing
 * failed and the route table looked right; only the build's
 * prerender-manifest.json showed it, and it showed up on the Vercel bill as
 * 24x the server calls, CPU and memory.
 *
 * This walks the import graph of every page that declares a daily window,
 * plus the layouts above it, and fails if anything reachable caches for less.
 * Static, no DB.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { collectImports } from "../scripts/lib/importGraph";
import { cacheWindows } from "../scripts/lib/cacheWindows";

const REPO = path.resolve(__dirname, "..");
const DAILY = 86400;

const fileCache = new Map<string, string | null>();
function readRepoFile(rel: string): string | null {
  if (fileCache.has(rel)) return fileCache.get(rel)!;
  let out: string | null = null;
  try {
    const abs = path.join(REPO, rel);
    if (fs.statSync(abs).isFile()) out = fs.readFileSync(abs, "utf8");
  } catch {
    out = null;
  }
  fileCache.set(rel, out);
  return out;
}

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(path.join(REPO, dir), { withFileTypes: true })) {
    const rel = path.posix.join(dir, e.name);
    if (e.isDirectory()) walk(rel, out);
    else if (e.name === "page.tsx") out.push(rel);
  }
  return out;
}

/** Layout files from src/app down to the page's own directory. */
function layoutsAbove(page: string): string[] {
  const parts = path.posix.dirname(page).split("/");
  const out: string[] = [];
  for (let i = 2; i <= parts.length; i++) {
    const layout = `${parts.slice(0, i).join("/")}/layout.tsx`;
    if (readRepoFile(layout) !== null) out.push(layout);
  }
  return out;
}

const dailyPages = walk("src/app").filter((p) =>
  /export const revalidate\s*=\s*86_?400\b/.test(readRepoFile(p) ?? ""),
);

/** A file's DIRECT imports: the walker, fed only the entry's own source. */
function directImports(file: string): string[] {
  const onlyEntry = (rel: string) => (rel === file ? readRepoFile(rel) : readRepoFile(rel) === null ? null : "");
  return [...collectImports(file, onlyEntry, { valueOnly: true })];
}

// The whole graph once, from every daily page and its layouts.
const entriesOf = new Map(dailyPages.map((p) => [p, [p, ...layoutsAbove(p)]]));
const edges = new Map<string, string[]>();
{
  const queue = [...new Set([...entriesOf.values()].flat())];
  while (queue.length) {
    const f = queue.pop()!;
    if (edges.has(f)) continue;
    const next = directImports(f);
    edges.set(f, next);
    for (const n of next) if (!edges.has(n)) queue.push(n);
  }
}

function reach(entry: string): Set<string> {
  const seen = new Set<string>([entry]);
  const stack = [entry];
  while (stack.length) for (const n of edges.get(stack.pop()!) ?? []) if (!seen.has(n)) (seen.add(n), stack.push(n));
  return seen;
}

/** Every file that can reach `target`, walking the edges backwards. */
function reachers(target: string): Set<string> {
  const back = new Map<string, string[]>();
  for (const [f, ns] of edges) for (const n of ns) back.set(n, [...(back.get(n) ?? []), f]);
  const seen = new Set<string>([target]);
  const stack = [target];
  while (stack.length) for (const p of back.get(stack.pop()!) ?? []) if (!seen.has(p)) (seen.add(p), stack.push(p));
  return seen;
}

describe("daily pages stay daily", () => {
  it("finds the daily pages and walks into the shared header (the scan is not vacuous)", () => {
    expect(dailyPages.length).toBeGreaterThan(100);
    const anyQuestions = dailyPages.find((p) => p.startsWith("src/app/questions/"));
    expect(anyQuestions).toBeDefined();
    const r = reach(anyQuestions!);
    expect(r.has("src/components/AppHeader.tsx")).toBe(true);
    expect(r.has("src/lib/exam/examIdMap.ts")).toBe(true);
  });

  it("no daily page reaches a cache shorter than a day", () => {
    const report: string[] = [];
    for (const f of edges.keys()) {
      const short = cacheWindows(readRepoFile(f) ?? "").filter((w) => !(w >= DAILY));
      if (short.length === 0) continue;
      const up = reachers(f);
      const pages = dailyPages.filter((p) => entriesOf.get(p)!.some((e) => up.has(e)));
      if (pages.length === 0) continue;
      report.push(`${f}: revalidate ${short.join(", ")} reached by ${pages.length} daily page(s), e.g. ${pages[0]}`);
    }
    expect(
      report,
      "A shared cache shorter than the page's own window makes the PAGE refresh that often. " +
        "Raise it to 86400 or more, or move the call off the cached page.",
    ).toEqual([]);
  });
});
