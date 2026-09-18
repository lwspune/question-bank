/**
 * Any list of links INTO a mock result page must set `prefetch={false}`.
 *
 * WHY THIS IS A CORRECTNESS RULE AND NOT A PREFERENCE, and why it is new: as of
 * the findings card the result page runs `get_own_performance` — the SAME RPC
 * behind the 2026-09-15 outage, which returns the student's entire answer
 * history (1,270 kB / ~500 ms for the heaviest student). Before that card the
 * page was cheap and prefetching it cost nothing.
 *
 * `AttemptsList` renders one link PER ATTEMPT and is rendered on /me and
 * /mock/attempts. A student with ten sittings therefore fires ten full-history
 * RPCs on page load, from links they have not clicked — the exact shape that
 * failed 12/12 concurrent calls with 57014 statement timeouts that day.
 *
 * Sibling rule, same incident, different surface:
 * tests/dashboard-students-no-prefetch.test.ts. Kept apart because that one
 * scans whole directories and this one follows a specific expensive ROUTE.
 *
 * A count-based check, for the reason the sibling documents: JSX attributes
 * wrap across lines and contain `>` inside arrow functions, so a tag-parsing
 * regex is a probe that can quietly stop matching.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/** Every component that renders links to /mock/attempt/<id>/result. */
const FILES = [join("src", "app", "mock", "_components", "AttemptsList.tsx")];

const count = (haystack: string, needle: string) => haystack.split(needle).length - 1;

describe("nothing prefetches a mock result page", () => {
  it.each(FILES)("%s opts every Link out of prefetch", (rel) => {
    const src = readFileSync(join(process.cwd(), rel), "utf8");
    const links = count(src, "<Link");
    // A zero here means the file stopped rendering links — which would make
    // every assertion below vacuously true, so it fails instead.
    expect(links).toBeGreaterThan(0);
    expect({ links, optedOut: count(src, "prefetch={false}") }).toEqual({
      links,
      optedOut: links,
    });
  });

  it("still points at the result route this rule exists for", () => {
    // If the href is refactored away, the rule above is guarding nothing and
    // the list must be revisited rather than left green.
    const src = readFileSync(join(process.cwd(), FILES[0]), "utf8");
    expect(src).toContain("/result");
  });
});
