import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The /board class hubs and chapter reader are cached (built ahead, refreshed
 * daily) since 2026-10-04; before that every visit rendered from the database
 * at 0.4-1.6 s. A source scan, because the build's route table cannot tell a
 * page that prerendered from one that bailed out (CLAUDE.md, "One cookies()
 * read in a SHARED SHELL…"), and these pages are where Clarity saw dead taps.
 */
const ROUTES = [
  "src/app/board/[examSlug]/page.tsx",
  "src/app/board/[examSlug]/[subjectRoute]/[chapterSlug]/page.tsx",
];

describe.each(ROUTES)("%s", (route) => {
  const src = readFileSync(join(process.cwd(), route), "utf8");

  it("refreshes on a schedule instead of rendering per request", () => {
    expect(src).toMatch(/export const revalidate = \d+;/);
  });

  it("builds its pages ahead", () => {
    expect(src).toMatch(/export (async )?function generateStaticParams/);
  });

  it("reads nothing per-viewer on the server (which would make it dynamic)", () => {
    expect(src).not.toMatch(/cookies\(\)|headers\(\)|createSupabaseServerClient|getSession/);
    expect(src).not.toMatch(/export const dynamic/);
  });
});
