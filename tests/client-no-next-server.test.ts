/**
 * Browser code never imports `next/server` (PAGE_WEIGHT_SPEC.md item 3, 2026-11-25).
 *
 * `next/server` is Next's server toolkit (NextResponse, NextRequest, a cookie
 * library, a user-agent parser, cache errors). Nothing in it runs in a browser,
 * yet one browser file reaching it puts all of it on every page: on live, 42
 * modules, about 72 KB of code and 22 KB sent, because `lib/billing/pendingOrder.ts`
 * (the checkout's "finish your payment" memory) imported one regex from
 * `lib/billing/returnCheckHttp.ts`, which imports NextResponse for the routes.
 *
 * Walks the static imports of every "use client" file in src/ (no jsdom here).
 */
import { describe, it, expect } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { ORDER_ID_RE } from "../src/lib/billing/orderId";
import { ORDER_ID_RE as ROUTE_ORDER_ID_RE } from "../src/lib/billing/returnCheckHttp";

const SRC = join(process.cwd(), "src");
const rel = (p: string) => relative(SRC, p).split(sep).join("/");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return sourceFiles(p);
    return /\.(ts|tsx)$/.test(e.name) ? [p] : [];
  });
}

function resolve(from: string, spec: string): string | null {
  let base: string;
  if (spec.startsWith("@/")) base = join(SRC, spec.slice(2));
  else if (spec.startsWith("./") || spec.startsWith("../")) base = join(dirname(from), spec);
  else return null;
  for (const ext of [".ts", ".tsx", "/index.ts", "/index.tsx"]) if (existsSync(base + ext)) return base + ext;
  return null;
}

/** Static runtime imports: `import type` / `export type` left out, a dynamic `import()` is not one. */
function runtimeImports(src: string): string[] {
  const out: string[] = [];
  for (const m of src.matchAll(/(?:^|\n)\s*(import|export)\s+(type\s+)?[^;]*?from\s+["']([^"']+)["']/g)) if (!m[2]) out.push(m[3]);
  for (const m of src.matchAll(/(?:^|\n)\s*import\s+["']([^"']+)["']/g)) out.push(m[1]);
  return out;
}

/** "file -> ... -> file that imports next/server (from client file)" for each such file reached. */
function nextServerReachedFromClient(): string[] {
  const found = new Map<string, string>();
  for (const entry of sourceFiles(SRC)) {
    if (!/^\s*["']use client["']/.test(readFileSync(entry, "utf8"))) continue;
    const seen = new Set<string>();
    const stack: [string, string[]][] = [[entry, []]];
    while (stack.length) {
      const [file, chain] = stack.pop()!;
      if (seen.has(file)) continue;
      seen.add(file);
      for (const spec of runtimeImports(readFileSync(file, "utf8"))) {
        if (spec === "next/server" && !found.has(rel(file))) {
          found.set(rel(file), `${[...chain, rel(file)].join(" -> ")} (from ${rel(entry)})`);
        }
        const next = resolve(file, spec);
        if (next) stack.push([next, [...chain, rel(file)]]);
      }
    }
  }
  return [...found.values()];
}

describe("browser code and next/server", () => {
  it("no browser file reaches next/server", () => {
    expect(nextServerReachedFromClient()).toEqual([]);
  });

  it("the checkout's pending-order memory takes the order-id rule from its own small file", () => {
    const pending = readFileSync(join(SRC, "lib/billing/pendingOrder.ts"), "utf8");
    expect(pending).toMatch(/from "\.\/orderId"/);
    expect(pending).not.toMatch(/returnCheckHttp/);
  });

  it("the routes and the browser check order ids by one rule", () => {
    expect(ROUTE_ORDER_ID_RE).toBe(ORDER_ID_RE);
    expect(ORDER_ID_RE.test("order_Ab12Cd34Ef56Gh")).toBe(true);
    expect(ORDER_ID_RE.test("order_")).toBe(false);
    expect(ORDER_ID_RE.test("pay_Ab12Cd34Ef56Gh")).toBe(false);
    expect(ORDER_ID_RE.test(`order_${"a".repeat(41)}`)).toBe(false);
  });
});
