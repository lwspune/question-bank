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
 * `import type` counts: a type-only import still names a file whose change
 * can break the importer.
 *
 * Deliberately a regex scanner, not a TypeScript program — that is a few
 * hundred files under /notes and this runs inside `npm test`. Prose inside a
 * string literal that happens to read `from "x"` yields a BARE specifier and
 * is ignored; only `./`, `../` and `@/` are followed.
 */
import path from "node:path";

export type ReadFile = (repoRelativePath: string) => string | null;

const EXTENSIONS = [".ts", ".tsx", ".js", ".mjs", ".json"];

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

function specifiers(src: string): string[] {
  const out: string[] = [];
  for (const m of stripComments(src).matchAll(SPECIFIER_RE)) {
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
export function collectImports(entry: string, read: ReadFile): Set<string> {
  const seen = new Set<string>([entry]);
  const queue = [entry];
  while (queue.length) {
    const file = queue.shift()!;
    const src = read(file);
    if (src === null) throw new Error(`importGraph: cannot read ${file}`);
    for (const spec of specifiers(src)) {
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
