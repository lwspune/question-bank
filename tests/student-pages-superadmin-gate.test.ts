/**
 * Who may read one student's own-row data — attempts, every answer, their
 * mobile — and through which door.
 *
 * THE RULE CHANGED ON 2026-09-18 and this file changed with it. Before, every
 * /dashboard/students route was superadmin-only, because each one read through
 * the service-role client, which bypasses RLS by design; the page guard was the
 * only thing between that client and an org admin. That is still true of the
 * roster, the profile and the item-stats tabs.
 *
 * The performance route is now deliberately different: three audiences may read
 * it (the student, their org's admin, a teacher of their branch), and "which
 * students may this teacher see" is a join across batch_enrollments, batches
 * and branch_members that a page guard cannot express. So its authorization
 * moved INTO the database — get_student_performance_for_staff (migration 0110)
 * runs that join as the caller and raises 42501 when the answer is no.
 *
 * SO THE PROPERTY UNDER TEST IS NO LONGER "calls getSessionSuperadmin". It is
 * the stronger and more durable one: NO performance route may reach the
 * service-role reader. A page that calls getStudentPerformance() has bypassed
 * RLS and every gate with it, whatever guard sits above it.
 *
 * WHY A SOURCE SCAN AND NOT A REAL REQUEST. These routes are `force-dynamic`
 * server components; `next build` never executes them, this repo has no
 * jsdom/Playwright, and an anon request to `/dashboard/*` is bounced by
 * middleware before the page compiles — so a 307 proves nothing about the page
 * (see the "probe must reach the code" pitfall in CLAUDE.md). A scan cannot
 * prove a gate WORKS; it proves the gate is still THERE, which is the
 * regression that actually happens. That the DB gate works is proven against
 * live roles, recorded in the 2026-09-18 Decisions entry.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(process.cwd(), "src", "app", "dashboard", "students");
const STAFF_PERF = join(ROOT, "[id]", "performance", "page.tsx");
const OWN_PERF = join(process.cwd(), "src", "app", "performance", "page.tsx");
const BODY = join(process.cwd(), "src", "components", "performance", "PerformanceBody.tsx");

function pagesUnder(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...pagesUnder(full));
    else if (entry === "page.tsx") out.push(full);
  }
  return out;
}

/**
 * Read a file with its COMMENTS STRIPPED.
 *
 * A scan that matches prose is not a scan of the code. These files explain
 * their own gating at length, so "getSessionSuperadmin" appears in the
 * performance route's header comment describing the guard it no longer has —
 * which made an earlier version of this suite report a gate that was not there.
 * The same hazard runs the other way: a `getStudentPerformance(` named in a
 * comment would fail a route that never calls it.
 */
function code(path: string): string {
  return readFileSync(path, "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

const GUARDS = ["getSessionSuperadmin", "requireSuperadmin"];

/** The service-role reader. Bypasses RLS; must never be reachable from a route
 *  that any non-superadmin can open. Matched with the open paren so it cannot
 *  collide with getStaffStudentPerformance / getOwnPerformance. */
const SERVICE_ROLE_READ = "getStudentPerformance(";

describe("/dashboard/students student-data routes", () => {
  const pages = pagesUnder(ROOT);

  it("finds the routes at all — an empty scan would pass every assertion below", () => {
    expect(pages.length).toBeGreaterThanOrEqual(4);
    expect(pages.some((p) => p.includes("performance"))).toBe(true);
  });

  it.each(
    pagesUnder(ROOT)
      .filter((p) => p !== STAFF_PERF)
      .map((p) => [p.slice(ROOT.length + 1), p] as const)
  )("%s calls a superadmin guard", (_label, path) => {
    const src = code(path);
    expect(GUARDS.some((g) => src.includes(g))).toBe(true);
  });

  it("the ONE route with a widened audience is the one we think it is", () => {
    // If a second route ever drops its superadmin guard, the exemption above
    // must be a deliberate edit to this list rather than a silent pass.
    const ungated = pagesUnder(ROOT).filter(
      (p) => !GUARDS.some((g) => code(p).includes(g))
    );
    expect(ungated).toEqual([STAFF_PERF]);
  });
});

describe("no performance route reaches the service-role reader", () => {
  it("the staff route gates in the DATABASE, not with a bypass", () => {
    const src = code(STAFF_PERF);
    expect(src).toContain("getStaffStudentPerformance");
    // The security property. A page guard is a policy; this is the mechanism.
    expect(src).not.toContain(SERVICE_ROLE_READ);
    // An org ADMIN or TEACHER must not be the gate in the PAGE — the DB decides
    // which students each of them may see, and these helpers answer a coarser
    // question ("is this person staff at all?").
    expect(src).not.toContain("getSessionMember");
    expect(src).not.toContain("requireEditor");
  });

  it("the student route reads only its OWN payload", () => {
    const src = code(OWN_PERF);
    expect(src).toContain("getOwnPerformance");
    expect(src).not.toContain(SERVICE_ROLE_READ);
    // Passing a user id on a student-facing route is the whole class of bug
    // get_own_performance()'s zero-argument signature exists to prevent.
    expect(src).not.toContain("getStaffStudentPerformance");
  });

  it("the shared body fetches nothing at all", () => {
    // Authorization lives in the routes. A body that could fetch would be a
    // second, ungated door into the same data.
    const src = code(BODY);
    expect(src).not.toContain(SERVICE_ROLE_READ);
    expect(src).not.toContain("getStaffStudentPerformance");
    expect(src).not.toContain("getOwnPerformance");
    expect(src).not.toContain("createSupabaseAdminClient");
  });
});

describe("the projection renders on exactly the sanctioned routes", () => {
  it("nothing outside the shared body imports ProjectionList", () => {
    // The guarantee is a claim about the WHOLE app, not one file. The card is a
    // projection of one student's marks built from their entire answer history;
    // if it ever renders somewhere else, that route needs its own gate and this
    // test should fail until someone says so.
    const appRoot = join(process.cwd(), "src", "app");
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) walk(full);
        else if (entry.endsWith(".tsx")) {
          if (code(full).includes("ProjectionList")) offenders.push(full);
        }
      }
    };
    walk(appRoot);
    expect(offenders).toEqual([]);
  });

  it("and the body that does render it is reached from exactly two routes", () => {
    const appRoot = join(process.cwd(), "src", "app");
    const importers: string[] = [];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) walk(full);
        else if (entry.endsWith(".tsx")) {
          if (code(full).includes("performance/PerformanceBody")) {
            importers.push(full);
          }
        }
      }
    };
    walk(appRoot);
    expect(importers.sort()).toEqual([OWN_PERF, STAFF_PERF].sort());
  });
});
