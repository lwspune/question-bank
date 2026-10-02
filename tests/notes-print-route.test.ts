/**
 * The print handout route builds ON DEMAND and stays out of search.
 *
 * WHY (2026-10-02). It pre-rendered every chapter at build time: 801 files,
 * ~420 MB of .next, up to 13 MB per page (MHT-CET Vectors: 3,764 KaTeX
 * formulas, each written as HTML plus MathML). Handouts are opened rarely, so
 * each is now built on its first visit and then cached for `revalidate`, like
 * any static page. That is only free because the route is NOINDEX and absent
 * from the sitemap — a crawler never asks for it, so nobody waits on a cold
 * render that matters. Both properties are pinned here.
 *
 * A source test, not a render: the route is a one-line config choice, and
 * importing the page would load the whole notes registry for nothing.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const SRC = fs.readFileSync(
  path.resolve(__dirname, "../src/app/notes/print/[subjectRoute]/[chapterSlug]/page.tsx"),
  "utf8"
);

describe("/notes/print route", () => {
  it("pre-renders no chapter at build time (generateStaticParams returns [])", () => {
    expect(SRC).toMatch(/export function generateStaticParams\(\)[^{]*\{\s*return \[\];\s*\}/);
  });

  it("is cached after the first visit (ISR revalidate), not rendered per request", () => {
    expect(SRC).toMatch(/export const revalidate = \d+;/);
    expect(SRC).not.toMatch(/export const dynamic = "force-dynamic"/);
  });

  it("stays noindex — the on-demand trade-off depends on crawlers never requesting it", () => {
    const noindex = SRC.match(/robots: \{ index: false, follow: false \}/g) ?? [];
    expect(noindex.length).toBe(2);
  });
});
