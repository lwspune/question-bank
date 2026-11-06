/**
 * `/` and `/tutor` must stay CACHED pages (2026-11-06).
 *
 * Both used to read the session during server render: `/` to send signed-in
 * people to their own home, `/tutor` to show the form or a sign-in card. That
 * made every visit a fresh server render. On 2026-11-06 crawlers alone fetched
 * `/` ~1.4K and `/tutor` ~2.7K times a day (OAI-SearchBot follows the header
 * links), each one a paid render. The signed-in work now happens in middleware
 * (`/`) and in the browser (`/tutor`), and the pages read nothing about the
 * request.
 *
 * A request read (cookies(), headers(), a session helper, the server Supabase
 * client) would silently make them per-request again and no build fails, so
 * this pins it in source, like tests/mock-catalogue-stays-static.test.ts.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const read = (...p: string[]) => readFileSync(join(process.cwd(), ...p), "utf8");

const REQUEST_READS = [
  "cookies(",
  "headers(",
  "searchParams",
  "getSessionUser",
  "getSessionMember",
  "getPageIdentity",
  "createSupabaseServerClient",
  "auth.getUser(",
  "force-dynamic",
];

const SERVER_FILES: string[][] = [
  ["src", "app", "page.tsx"],
  ["src", "components", "home", "HomeLanding.tsx"],
  ["src", "app", "home-exam", "[examSlug]", "page.tsx"],
  ["src", "app", "tutor", "page.tsx"],
];

describe("cached pages read nothing about the request", () => {
  for (const file of SERVER_FILES) {
    it(`${file.join("/")} has no request read`, () => {
      const src = read(...file);
      for (const r of REQUEST_READS) expect(src, `${file.join("/")} contains ${r}`).not.toContain(r);
    });
  }

  it("the three page files declare a revalidate window", () => {
    for (const file of [SERVER_FILES[0], SERVER_FILES[2], SERVER_FILES[3]]) {
      expect(read(...file)).toMatch(/export const revalidate = \d+/);
    }
  });
});

describe("the per-exam homepage copies", () => {
  const src = read("src", "app", "home-exam", "[examSlug]", "page.tsx");

  it("are kept out of search and point search engines at /", () => {
    expect(src).toMatch(/index:\s*false/);
    expect(src).toMatch(/canonical:\s*"\/"/);
  });

  it("refuse a slug that is not an exam", () => {
    expect(src).toContain("isExamSlug");
    expect(src).toContain("notFound()");
  });
});

describe("/tutor resolves the visitor in the browser", () => {
  const island = read("src", "app", "tutor", "TutorGate.tsx");

  it("is a client island that asks only when a sign-in cookie exists", () => {
    expect(island.startsWith('"use client"')).toBe(true);
    expect(island).toContain("hasAuthCookie");
    expect(island).toContain("/api/tutor-interest");
  });

  it("reads ?from= from the address bar, not useSearchParams (which would undo the prerender)", () => {
    expect(island).not.toContain("useSearchParams");
    expect(island).toContain("window.location.search");
  });
});
