/**
 * V's window is browser code: nothing it imports may reach a `node:` module
 * (2026-11-21). The V check-in imported lib/chat/checkIn at runtime, which took
 * drillTimeLine from lib/push/core, which imports lib/email/click and its
 * `node:crypto`. Webpack refused to bundle it ("UnhandledSchemeError") and every
 * page answered 500 in dev; before that, ChatWidget had only a TYPE import of
 * dayCard, so the same chain never reached the browser. Walks ChatWidget's real
 * runtime import graph (type-only imports skipped, as the bundler skips them).
 */
import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const SRC = join(process.cwd(), "src");

function resolve(spec: string): string | null {
  if (!spec.startsWith("@/")) return null;
  const base = join(SRC, spec.slice(2));
  for (const ext of [".ts", ".tsx", "/index.ts", "/index.tsx"]) if (existsSync(base + ext)) return base + ext;
  return null;
}

/** Runtime import specifiers of a file: `import type` / `export type` lines left out. */
function runtimeImports(src: string): string[] {
  const out: string[] = [];
  const re = /(?:^|\n)\s*(import|export)\s+(type\s+)?[^;]*?from\s+["']([^"']+)["']/g;
  for (const m of src.matchAll(re)) if (!m[2]) out.push(m[3]);
  for (const m of src.matchAll(/(?:^|\n)\s*import\s+["']([^"']+)["']/g)) out.push(m[1]);
  return out;
}

function nodeImportsReachedFrom(entry: string): string[] {
  const seen = new Set<string>();
  const bad: string[] = [];
  const stack = [join(SRC, entry)];
  while (stack.length) {
    const file = stack.pop()!;
    if (seen.has(file)) continue;
    seen.add(file);
    for (const spec of runtimeImports(readFileSync(file, "utf8"))) {
      if (spec.startsWith("node:")) bad.push(`${file.slice(SRC.length + 1)} -> ${spec}`);
      const next = resolve(spec);
      if (next) stack.push(next);
    }
  }
  return bad;
}

describe("V's window imports nothing from node", () => {
  it("ChatWidget's runtime import graph has no node: module", () => {
    expect(nodeImportsReachedFrom("components/chat/ChatWidget.tsx")).toEqual([]);
  });

  it("the walker does see node: imports (it would catch the old chain)", () => {
    expect(nodeImportsReachedFrom("lib/push/core.ts").length).toBeGreaterThan(0);
  });
});
