import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// 2026-11-17 (TECH_DEBT_SPEC 4.2 / SUGGESTIONS 2026-11-05): /guide/nda-maths/
// principles/[slug] read through createSupabaseServerClient(), which reads
// cookies, and had no revalidate, so it rendered on EVERY request (live:
// private, no-store, X-Vercel-Cache MISS) although its route table showed SSG.
// Its content is public and the same for everyone, like the other guide pages.
const page = readFileSync(
  join(__dirname, "..", "src", "app", "guide", "nda-maths", "principles", "[slug]", "page.tsx"),
  "utf8"
);

describe("NDA Maths principle detail page is cacheable", () => {
  it("reads through the anon client, never the cookie-reading server client", () => {
    expect(page).not.toMatch(/createSupabaseServerClient/);
    expect(page).toMatch(/createSupabaseAnonClient\(\)/);
  });
  it("declares a revalidate window like its sibling guide pages", () => {
    expect(page).toMatch(/export const revalidate = \d+;/);
  });
});
