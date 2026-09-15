/**
 * Every `<Link>` on the /dashboard/students surface must set `prefetch={false}`.
 *
 * WHY THIS IS A CORRECTNESS RULE AND NOT A PREFERENCE. These pages each run one
 * very expensive server read — `get_student_performance` returns 1,270 kB and
 * takes ~500 ms for the heaviest student — and Next prefetches links in the
 * viewport. The exam and subject pills are QUERY-PARAM links on the SAME route,
 * so there is no `loading.tsx` boundary for a prefetch to stop at: each one is a
 * full page render.
 *
 * On 2026-09-15 that took production down for one student. Measured:
 *
 *      5 concurrent calls   0/5  failed
 *      9 concurrent         7/9  failed
 *     12 concurrent        12/12 failed   (57014, statement timeout)
 *
 * and that student's page renders 13 links pointing back at itself. Production
 * logged 24 calls in one minute, 18 of them 500s, while every other minute that
 * day ran 1-11 calls with zero errors. The user saw "Something went wrong".
 *
 * The roster is the same shape and worse: it renders one link PER STUDENT (315
 * of them), each pointing at a page that re-reads that student's whole profile.
 *
 * A count-based check rather than a per-tag parse: JSX attributes wrap across
 * lines and contain `>` inside arrow functions, so anything regex-shaped that
 * tries to find each tag's end is a probe that can quietly stop matching. Counts
 * cannot drift silently — add a Link without the prop and the numbers differ.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = join(process.cwd(), "src", "app", "dashboard", "students");

function tsxUnder(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) tsxUnder(full, out);
    else if (entry.endsWith(".tsx")) out.push(full);
  }
  return out;
}

const count = (haystack: string, needle: string) => haystack.split(needle).length - 1;

describe("/dashboard/students never prefetches", () => {
  const files = tsxUnder(ROOT);

  it("found the surface at all", () => {
    // An empty scan would pass every assertion below.
    expect(files.length).toBeGreaterThanOrEqual(8);
  });

  it.each(files.map((f) => [relative(ROOT, f), f] as const))(
    "%s opts every Link out of prefetch",
    (_label, path) => {
      const src = readFileSync(path, "utf8");
      const links = count(src, "<Link");
      if (links === 0) return;
      expect({ links, optedOut: count(src, "prefetch={false}") }).toEqual({
        links,
        optedOut: links,
      });
    }
  );

  it("covers the pills and the roster row in particular", () => {
    // The two that actually caused the outage: the nav pills (13 same-route
    // links on one page) and the roster row (one per student, 315 of them).
    const perf = readFileSync(join(ROOT, "[id]", "performance", "page.tsx"), "utf8");
    expect(perf).toContain("prefetch={false}");
    const roster = readFileSync(join(ROOT, "StudentRosterClient.tsx"), "utf8");
    expect(roster).toContain("prefetch={false}");
  });
});
