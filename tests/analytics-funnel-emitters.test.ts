import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { FUNNEL_EVENTS } from "@/lib/analytics/funnelEvents";

/**
 * The drift gate for funnel telemetry, asserting BOTH directions of the map
 * between declared event names and real emitters.
 *
 * A forward-only check cannot catch an omission — that is how `question_practiced`
 * shipped as a label in `get_pmf_snapshot` that could never render, and how a
 * whole funnel stayed hidden behind a mapping nobody checked in reverse. So:
 *
 *   forward  — every declared name has at least one emitter (no dead labels)
 *   backward — every emitted name is declared (no unbudgeted spend, no event
 *              landing in the Vercel dashboard that no reader knows to look for)
 */

const SRC = join(process.cwd(), "src");
const ANALYTICS_LIB = join(SRC, "lib", "analytics");

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.tsx?$/.test(entry)) out.push(full);
  }
  return out;
}

/** Call sites, excluding the wrapper's own definition. */
const EMITTER_CALL = /trackFunnel(?:Once)?\(\s*"([^"]+)"/g;

function emittedNames(): { name: string; file: string }[] {
  const hits: { name: string; file: string }[] = [];
  for (const file of walk(SRC)) {
    if (file.startsWith(ANALYTICS_LIB)) continue; // the wrapper itself, not a call site
    const src = readFileSync(file, "utf8");
    for (const m of src.matchAll(EMITTER_CALL)) {
      hits.push({ name: m[1], file: file.slice(SRC.length + 1).replace(/\\/g, "/") });
    }
  }
  return hits;
}

describe("funnel event emitters", () => {
  const hits = emittedNames();

  it("finds emitters at all (guards against a probe that reaches no code)", () => {
    // A green result from an empty scan proves nothing. This asserts ONLY that
    // the walk and the regex reached real code — deliberately not a count tied
    // to FUNNEL_EVENTS.length, which would make this fail for the unrelated
    // reason that one name lacks an emitter and mask what actually broke.
    expect(hits.length).toBeGreaterThan(0);
  });

  it("forward: every declared event has a real emitter", () => {
    const emitted = new Set(hits.map((h) => h.name));
    const dead = FUNNEL_EVENTS.filter((n) => !emitted.has(n));
    expect(dead, `declared but never emitted: ${dead.join(", ")}`).toEqual([]);
  });

  it("backward: every emitted event is declared", () => {
    const declared = new Set<string>(FUNNEL_EVENTS);
    const stray = hits.filter((h) => !declared.has(h.name));
    expect(
      stray.map((s) => `${s.name} (${s.file})`),
      "emitted but not in FUNNEL_EVENTS"
    ).toEqual([]);
  });

  it("every emitter lives in a client component", () => {
    // trackFunnel calls `track()` from @vercel/analytics, which is browser-only.
    // A server-component caller would also be a caching hazard on this codebase,
    // where one cookies() read in a shared shell once de-cached the whole site.
    const files = [...new Set(hits.map((h) => h.file))];
    for (const rel of files) {
      const head = readFileSync(join(SRC, rel), "utf8").slice(0, 200);
      expect(head, `${rel} is missing "use client"`).toMatch(/^["']use client["']/);
    }
  });
});
