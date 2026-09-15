/**
 * Every /dashboard/students surface is SUPERADMIN-ONLY, and this pins it.
 *
 * These pages read one student's own-row data — their attempts, every answer,
 * their mobile — through the service-role client, which bypasses RLS by design.
 * The ONLY thing standing between that and an org admin is the guard at the top
 * of each route. There is no RLS backstop here, because the whole point of the
 * service-role client is that RLS does not apply.
 *
 * WHY A SOURCE SCAN AND NOT A REAL REQUEST. These routes are `force-dynamic`
 * server components; `next build` never executes them, this repo has no
 * jsdom/Playwright, and an anon request to `/dashboard/*` is bounced by
 * middleware before the page compiles — so a 307 proves nothing about the page
 * (see the "probe must reach the code" pitfall in CLAUDE.md). A scan cannot
 * prove the guard WORKS; it proves the guard is still THERE, which is the
 * regression that would actually happen: someone adds a page to this folder, or
 * relaxes `getSessionSuperadmin` to `getSessionMember` to let a teacher in.
 *
 * `requireSuperadmin` counts too — it throws rather than redirecting, and a
 * future route may prefer it.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(process.cwd(), "src", "app", "dashboard", "students");

function pagesUnder(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...pagesUnder(full));
    else if (entry === "page.tsx") out.push(full);
  }
  return out;
}

const GUARDS = ["getSessionSuperadmin", "requireSuperadmin"];

describe("/dashboard/students is superadmin-only", () => {
  const pages = pagesUnder(ROOT);

  it("finds the routes at all — an empty scan would pass every assertion below", () => {
    // Without this, a moved folder turns the whole suite into a no-op that
    // reports green. The count is a floor, not an equality: adding a route
    // should not fail the suite, only an UNGATED one should.
    expect(pages.length).toBeGreaterThanOrEqual(4);
    expect(pages.some((p) => p.includes("performance"))).toBe(true);
  });

  it.each(pagesUnder(ROOT).map((p) => [p.slice(ROOT.length + 1), p] as const))(
    "%s calls a superadmin guard",
    (_label, path) => {
      const src = readFileSync(path, "utf8");
      expect(GUARDS.some((g) => src.includes(g))).toBe(true);
    }
  );

  it("gates the projected score in particular", () => {
    // The card this test exists for: a projection of one student's marks, built
    // from their whole answer history. It lives on exactly one route.
    const perf = readFileSync(join(ROOT, "[id]", "performance", "page.tsx"), "utf8");
    expect(perf).toContain("getSessionSuperadmin");
    expect(perf).toContain("ProjectionList");
    // An org ADMIN or TEACHER must not be the gate here. `requireEditor` and
    // `getSessionMember` both admit a teacher.
    expect(perf).not.toContain("getSessionMember");
    expect(perf).not.toContain("requireEditor");
  });

  it("keeps the projected score off every other surface in the app", () => {
    // The guarantee is "superadmin-only", which is a claim about the WHOLE app,
    // not about one file. If a projection ever renders somewhere else, that
    // route needs its own gate and this test should fail until someone says so.
    const appRoot = join(process.cwd(), "src", "app");
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) walk(full);
        else if (entry.endsWith(".tsx") && !full.startsWith(ROOT)) {
          if (readFileSync(full, "utf8").includes("ProjectionList")) offenders.push(full);
        }
      }
    };
    walk(appRoot);
    expect(offenders).toEqual([]);
  });
});
