/**
 * Dependency hygiene (TECH_DEBT_SPEC.md 1.4, measured 2026-11-05).
 *
 * 1. A package imported by production code (src/) must be a dependency, not a
 *    devDependency. jszip and xlsx were devDependencies while src/lib/export and
 *    src/lib/upload imported them; it worked only because the build installs dev packages.
 * 2. xlsx must be at least 0.20.2: npm's latest (0.18.5) carries prototype pollution
 *    (GHSA-4r6h-8v6p-xvw6, fixed 0.19.3) and ReDoS (GHSA-5pgg-2g8v-p4x9, fixed 0.20.2).
 *    SheetJS publishes fixed builds only from cdn.sheetjs.com, so the repo vendors the
 *    tarball (owner decision D3) rather than depend on that host at every install.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(__dirname, "..");
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

function srcFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? srcFiles(p) : /\.(ts|tsx)$/.test(e.name) ? [p] : [];
  });
}

function importedPackages(): Set<string> {
  const out = new Set<string>();
  const re = /(?:from\s+|import\(\s*|require\(\s*)["']([^"'./@][^"']*|@[^"'/]+\/[^"']+)["']/g;
  for (const f of srcFiles(path.join(ROOT, "src"))) {
    for (const m of fs.readFileSync(f, "utf8").matchAll(re)) {
      const spec = m[1];
      const name = spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0];
      if (!name.startsWith("node:")) out.add(name);
    }
  }
  return out;
}

describe("dependency hygiene", () => {
  it("no production import resolves to a devDependency", () => {
    const dev = new Set(Object.keys(pkg.devDependencies ?? {}));
    const prod = new Set(Object.keys(pkg.dependencies ?? {}));
    const wrong = [...importedPackages()].filter((n) => dev.has(n) && !prod.has(n)).sort();
    expect(wrong).toEqual([]);
  });

  it("xlsx is a SheetJS build with both advisories fixed (>= 0.20.2)", () => {
    const v: string = JSON.parse(fs.readFileSync(path.join(ROOT, "node_modules/xlsx/package.json"), "utf8")).version;
    const [maj, min, pat] = v.split(".").map(Number);
    expect(maj * 1e6 + min * 1e3 + pat, `xlsx ${v}`).toBeGreaterThanOrEqual(20 * 1e3 + 2);
  });
});
