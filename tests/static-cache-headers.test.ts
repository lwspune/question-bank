/**
 * Icons, the manifest and V's pictures may be kept by the browser
 * (VERCEL_COST_SPEC.md item 1).
 *
 * Why: every file in `public/` was served with `max-age=0, must-revalidate`
 * (curl, 2026-11-24), so a browser asked for each icon again on every page
 * view. Each ask is a billed CDN request: about 20K of 228K in 12 hours, while
 * the cycle must stay under 10M requests or the CDN tier moves from $20 to
 * $100 a month.
 *
 * The service worker is the one file that must NOT be kept: a browser that
 * keeps an old `sw.js` never installs the new one.
 */
import { describe, expect, it } from "vitest";
import nextConfig from "../next.config.mjs";

type Rule = { source: string; headers: { key: string; value: string }[] };

const WEEK = 7 * 24 * 60 * 60;
const DAY = 24 * 60 * 60;

/** Next's `source` patterns as used here: exact paths, or a prefix ending in `/:path*`. */
function matches(source: string, path: string): boolean {
  if (source.endsWith("/:path*")) return path.startsWith(source.slice(0, -"/:path*".length) + "/");
  return source === path;
}

async function cacheControlFor(path: string): Promise<string[]> {
  const rules = (await nextConfig.headers!()) as Rule[];
  return rules
    .filter((r) => matches(r.source, path))
    .flatMap((r) => r.headers.filter((h) => h.key.toLowerCase() === "cache-control").map((h) => h.value));
}

describe("browser cache for icons and the manifest", () => {
  it.each([
    "/icons/icon-192.png",
    "/icons/icon-maskable-512.png",
    "/icons/mark-96.png",
    "/chat/v-idle.png",
    "/marketing/answer-card.webp",
    "/favicon.ico",
    "/icon.png",
    "/apple-icon.png",
  ])("%s is kept for 7 days", async (path) => {
    expect(await cacheControlFor(path)).toEqual([`public, max-age=${WEEK}`]);
  });

  it("the manifest is kept for 1 day", async () => {
    expect(await cacheControlFor("/manifest.webmanifest")).toEqual([`public, max-age=${DAY}`]);
  });

  it.each(["/sw.js", "/", "/browse", "/notes/nda-maths", "/api/chat/features", "/_next/static/chunks/a.js"])(
    "%s is left to Next and Vercel",
    async (path) => {
      expect(await cacheControlFor(path)).toEqual([]);
    },
  );
});
