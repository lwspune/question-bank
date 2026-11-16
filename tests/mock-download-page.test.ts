import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The "Download past papers" page (2026-10-07) is cached and indexable, like
 * the /mock lists beside it: one copy served to everyone. A source scan,
 * because the build's route table cannot tell a page that prerendered from one
 * that bailed out (CLAUDE.md, "One cookies() read in a SHARED SHELL..."). The
 * per-viewer part (free download, pass) is asked from the browser by the
 * download box, never read here.
 */
const ROUTE = "src/app/mock/exam/[examSlug]/download/page.tsx";
/** The page's paper reads, shared with the syllabus page since 2026-11-16. */
const LOADER = "src/lib/mocks/paperFactsServer.ts";

describe(ROUTE, () => {
  const page = readFileSync(join(process.cwd(), ROUTE), "utf8");
  const src = [page, readFileSync(join(process.cwd(), LOADER), "utf8")].join("\n");

  it("refreshes on a schedule instead of rendering per request", () => {
    expect(page).toMatch(/export const revalidate = \d+;/);
  });

  it("builds its pages ahead", () => {
    expect(page).toMatch(/export (async )?function generateStaticParams/);
  });

  it("reads nothing per-viewer on the server (which would make it dynamic)", () => {
    expect(src).not.toMatch(/cookies\(\)|headers\(\)|createSupabaseServerClient|getSession|useSearchParams/);
    expect(src).not.toMatch(/export const dynamic/);
  });

  it("lists past papers only", () => {
    expect(src).toMatch(/mocksOfType\([\s\S]*?"past-papers"\s*\)/);
  });
});
