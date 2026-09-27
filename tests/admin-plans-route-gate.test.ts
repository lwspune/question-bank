/**
 * /api/admin/plans writes public.plans and paywall_settings through the
 * service-role client, which bypasses RLS by design — so the route guard is
 * the ONLY thing between an org admin and the price list. A source scan
 * cannot prove the guard works (requireSuperadmin is tested elsewhere); it
 * proves the guard is still THERE, which is the regression that happens.
 * Same bargain as tests/student-pages-superadmin-gate.test.ts.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROUTE = join(process.cwd(), "src", "app", "api", "admin", "plans", "route.ts");
const PAGE = join(process.cwd(), "src", "app", "dashboard", "pricing", "page.tsx");

function code(path: string): string {
  return readFileSync(path, "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
}

describe("pricing admin is superadmin-gated", () => {
  it("the API route calls requireSuperadmin before any action", () => {
    const src = code(ROUTE);
    const guard = src.indexOf("await requireSuperadmin()");
    const firstWrite = src.indexOf("switch (body.action)");
    expect(guard).toBeGreaterThan(-1);
    expect(firstWrite).toBeGreaterThan(guard);
  });

  it("the page redirects unless getSessionSuperadmin resolves", () => {
    expect(code(PAGE)).toMatch(/if \(!\(await getSessionSuperadmin\(\)\)\) redirect\(/);
  });
});
