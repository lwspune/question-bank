/**
 * The Visuals gallery's pages stay CACHED and light (2026-11-23).
 *
 * - /visuals, /visuals/<subject> and its pictures file read nothing about the
 *   visitor (a student's own chapter order comes from the browser, through
 *   /api/gallery/weak), so one copy serves everyone, like /classes.
 * - Kept out of search for now: the pages repeat the notes' visuals.
 * - No page imports the notes corpus or the builder; the header imports only
 *   the small exam -> subject map, never a subject's visuals.
 * - No useSearchParams (it would bail the cached page out to the browser):
 *   the shared-link ?v= is read from window.location instead.
 * Source pins, because no build fails on any of these.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const read = (...p: string[]) => readFileSync(join(process.cwd(), ...p), "utf8");

const REQUEST_READS = ["cookies(", "headers(", "searchParams", "getSessionUser", "createSupabaseServerClient", "auth.getUser(", "force-dynamic"];
const PAGES = [
  ["src", "app", "visuals", "page.tsx"],
  ["src", "app", "visuals", "[subjectRoute]", "page.tsx"],
  ["src", "app", "visuals", "[subjectRoute]", "thumbs", "route.ts"],
];

describe("the gallery pages", () => {
  for (const f of PAGES) {
    it(`${f.join("/")} reads nothing about the visitor and is cached`, () => {
      const src = read(...f);
      for (const r of REQUEST_READS) expect(src, `${f.join("/")} contains ${r}`).not.toContain(r);
      expect(src).toMatch(/export const revalidate = \d+/);
      expect(src).not.toMatch(/lib\/gallery\/buildInputs|lib\/notes\/chapters"/);
    });
  }

  it("keeps both pages out of search", () => {
    for (const f of PAGES.slice(0, 2)) expect(read(...f)).toMatch(/robots:\s*\{\s*index:\s*false/);
  });

  it("the client gallery never reads search params", () => {
    expect(read("src", "app", "visuals", "[subjectRoute]", "GalleryView.tsx")).not.toMatch(/useSearchParams/);
  });
});

describe("the header's Visuals link", () => {
  const header = read("src", "components", "header", "HeaderBar.tsx");

  it("is in the header, built from the exam -> subject map alone", () => {
    expect(header).toMatch(/function VisualsLink\(/);
    expect(header).toMatch(/galleryHrefFor\(/);
    expect(header).toMatch(/from "@\/lib\/gallery\/galleryNav\.generated"/);
    expect(header).not.toMatch(/galleryIndex\.generated|gallery\/subjects\//);
    expect(header).toMatch(/trackFunnel\("visuals_link_click"/);
  });
});
