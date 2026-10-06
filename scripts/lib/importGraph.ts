/**
 * Static import-graph walker: every file of OURS reachable from an entry
 * through `import … from`, `export … from`, `import "x"` and `import("x")`.
 *
 * Exists to PIN a run-allowlist (scripts/lib/needsNotesLint.ts): a gate rule
 * that names the roots a script reads can only be trusted while the script's
 * real imports stay inside them, and this is how a test checks that.
 *
 * Pure — the filesystem is injected as `read(path) → contents | null` so the
 * spec (tests/import-graph.test.ts) runs on an in-memory map. Resolution
 * mirrors what tsx does for this repo: relative specifiers, the `@/` alias →
 * `src/`, extension-less imports tried as .ts / .tsx / index.ts / index.tsx.
 * Bare specifiers (`node:fs`, packages) are not our files and are skipped.
 * `import type` counts by default: a type-only import still names a file whose
 * change can break the importer. Pass `{ valueOnly: true }` to skip them when
 * the question is what a BUNDLE carries — type-only imports and re-exports are
 * erased by the compiler (tests/client-bundle-notes-registry.test.ts).
 *
 * Deliberately a regex scanner, not a TypeScript program — that is a few
 * hundred files under /notes and this runs inside `npm test`. Prose inside a
 * string literal that happens to read `from "x"` yields a BARE specifier and
 * is ignored; only `./`, `../` and `@/` are followed.
 */
import path from "node:path";

export type ReadFile = (repoRelativePath: string) => string | null;

export type CollectOptions = {
  /** Skip `import type … from` and `export type … from`: they never reach a bundle. */
  valueOnly?: boolean;
};

// A whole type-only import/export statement, possibly spanning lines. A mixed
// list (`import { type A, b }`) is NOT matched: it still imports a value.
const TYPE_ONLY_RE = /\b(?:import|export)\s+type\s+[^;]*?\bfrom\s*["'][^"'\n]+["']/g;

// `.css`: an App Router layout imports its stylesheet (`import "./globals.css"`).
const EXTENSIONS = [".ts", ".tsx", ".js", ".mjs", ".json", ".css"];

// Three shapes, each capturing the specifier:
//   … from "x"        (import/export lists, possibly spanning lines)
//   import "x"         (side-effect import)
//   import("x")        (dynamic import)
const SPECIFIER_RE =
  /\bfrom\s*["']([^"'\n]+)["']|\bimport\s*["']([^"'\n]+)["']|\bimport\s*\(\s*["']([^"'\n]+)["']\s*\)/g;

/** Strip block comments and whole-line `//` comments (never a `//` mid-line — URLs). */
function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
}

function specifiers(src: string, valueOnly: boolean): string[] {
  const out: string[] = [];
  const code = valueOnly ? stripComments(src).replace(TYPE_ONLY_RE, "") : stripComments(src);
  for (const m of code.matchAll(SPECIFIER_RE)) {
    out.push(m[1] ?? m[2] ?? m[3]);
  }
  return out;
}

/** Repo-relative resolution target for a specifier, or null when it is not ours. */
function target(fromFile: string, spec: string): string | null {
  if (spec.startsWith("@/")) return path.posix.normalize(`src/${spec.slice(2)}`);
  if (spec.startsWith("./") || spec.startsWith("../")) {
    return path.posix.normalize(path.posix.join(path.posix.dirname(fromFile), spec));
  }
  return null;
}

function candidates(p: string): string[] {
  if (EXTENSIONS.some((e) => p.endsWith(e))) return [p];
  return [`${p}.ts`, `${p}.tsx`, `${p}/index.ts`, `${p}/index.tsx`];
}

/**
 * Every file reachable from `entry` (excluding `entry` itself), as a Set of
 * repo-relative POSIX paths. Throws on a relative/alias import that resolves
 * to nothing — a silent drop would let the guard pass on a broken scan.
 */
export function collectImports(entry: string, read: ReadFile, opts: CollectOptions = {}): Set<string> {
  const seen = new Set<string>([entry]);
  const queue = [entry];
  while (queue.length) {
    const file = queue.shift()!;
    const src = read(file);
    if (src === null) throw new Error(`importGraph: cannot read ${file}`);
    for (const spec of specifiers(src, opts.valueOnly === true)) {
      const t = target(file, spec);
      if (t === null) continue; // bare: package or builtin
      const hit = candidates(t).find((c) => read(c) !== null);
      if (!hit) throw new Error(`importGraph: ${file} imports "${spec}" but nothing resolves at ${t}`);
      if (!seen.has(hit)) {
        seen.add(hit);
        queue.push(hit);
      }
    }
  }
  seen.delete(entry);
  return seen;
}
