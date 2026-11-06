import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

/**
 * Every page the /dashboard hub links to carries the same way back to it
 * (dashboard/BackToDashboard). Until 2026-11-06 four pages had one, each in its
 * own wording ("← Dashboard", "Back to dashboard", a breadcrumb), and twenty
 * had none.
 *
 * A source scan, since the repo renders no React in tests. A folder whose own
 * page.tsx only redirects (planner, syllabus) is checked at the page it
 * redirects into, its direct [param]/page.tsx.
 */
const DASHBOARD = path.resolve(__dirname, "../src/app/dashboard");

function hubLandingPages(): string[] {
  const out: string[] = [];
  for (const d of fs.readdirSync(DASHBOARD, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    const dir = path.join(DASHBOARD, d.name);
    const own = path.join(dir, "page.tsx");
    if (!fs.existsSync(own)) continue;
    if (fs.readFileSync(own, "utf8").includes("<main")) {
      out.push(own);
      continue;
    }
    for (const sub of fs.readdirSync(dir, { withFileTypes: true })) {
      const child = path.join(dir, sub.name, "page.tsx");
      if (sub.isDirectory() && sub.name.startsWith("[") && fs.existsSync(child)) out.push(child);
    }
  }
  return out;
}

describe("dashboard back link", () => {
  const pages = hubLandingPages();

  it("finds the pages (planner and syllabus through their child page)", () => {
    const rel = pages.map((p) => path.relative(DASHBOARD, p).replace(/\\/g, "/"));
    expect(rel).toContain("reports/page.tsx");
    expect(rel).toContain("planner/[plan]/page.tsx");
    expect(rel).toContain("syllabus/[subject]/page.tsx");
    expect(rel.length).toBeGreaterThanOrEqual(26);
  });

  it("gives every page the shared back link and no home-made one", () => {
    const missing = pages
      .filter((p) => {
        const src = fs.readFileSync(p, "utf8");
        return !src.includes("<BackToDashboard") || src.includes('href="/dashboard"');
      })
      .map((p) => path.relative(DASHBOARD, p).replace(/\\/g, "/"));
    expect(missing).toEqual([]);
  });
});
