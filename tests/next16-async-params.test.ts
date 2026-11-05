/**
 * Route `params` are a Promise in Next 15+ (TECH_DEBT_SPEC.md 4.1, upgraded 2026-11-05).
 *
 * WHY: the official codemod rewrote the 86 page files it could see, but not the shared route
 * factories (notesRoutes.tsx, playbookRoute*.tsx) or two opengraph-image routes. Those still read
 * `params.slug` from what is now a Promise, so every notes chapter, notes subtopic and guide
 * playbook page answered 404 on the dev server. `tsc` passed: a page file only re-exports the
 * factory's function, and Next checks page props in its own generated types at BUILD time, which
 * the gate never runs. This scan fails on a synchronous params type anywhere in src/app.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

function files(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? files(p) : /\.(ts|tsx)$/.test(e.name) ? [p] : [];
  });
}

// `{ params }: { params: X }` or `{ params: X }` in a props type, where X is not a Promise.
const SYNC_PARAMS = /\{\s*params(?::\s*\w+)?\s*\}\s*:\s*\{\s*params\s*:\s*(?!Promise<)[A-Za-z{]/;

describe("route params", () => {
  it("are awaited everywhere in src/app (Next 15+ passes a Promise)", () => {
    const offenders = files(path.join(process.cwd(), "src", "app")).flatMap((f) =>
      fs
        .readFileSync(f, "utf8")
        .split("\n")
        .map((line, i) => ({ line, i }))
        .filter(({ line }) => SYNC_PARAMS.test(line) && !/generateStaticParams/.test(line))
        .map(({ line, i }) => `${path.relative(process.cwd(), f)}:${i + 1}: ${line.trim()}`)
    );
    expect(offenders).toEqual([]);
  });
});
