/**
 * The trends pages as REPORTS: one registry naming each `/guide/<subject>/
 * trends` page as a dated, citable piece of original analysis, feeding the
 * provenance block on the page and the /guide/reports index.
 *
 * The registry and the filesystem are asserted in BOTH directions, because
 * either drift is silent: an entry without a page is a dead link on the index;
 * a trends page without an entry is a report nobody can find.
 */
import { describe, it, expect } from "vitest";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  TRENDS_REPORTS,
  trendsReportFor,
  reportUpdatedIso,
} from "../src/lib/guide/trendsReports";

const APP = join(process.cwd(), "src", "app");

describe("TRENDS_REPORTS", () => {
  it("names every trends page on disk, and nothing that is not one", () => {
    const onDisk = readdirSync(join(APP, "guide"), { withFileTypes: true })
      .filter((d) => d.isDirectory() && existsSync(join(APP, "guide", d.name, "trends", "page.tsx")))
      .map((d) => `/guide/${d.name}/trends`)
      .sort();
    const listed = TRENDS_REPORTS.map((r) => r.route).sort();
    expect(listed).toEqual(onDisk);
  });

  it("has unique routes", () => {
    const routes = TRENDS_REPORTS.map((r) => r.route);
    expect(new Set(routes).size).toBe(routes.length);
  });

  it("states a claim with a number in it, and says what the data runs through", () => {
    for (const r of TRENDS_REPORTS) {
      expect(r.claim, r.route).toMatch(/\d/);
      expect(r.claim.length, r.route).toBeLessThanOrEqual(110);
      expect(r.dataThrough.trim().length, r.route).toBeGreaterThan(0);
      expect(r.exam.trim().length, r.route).toBeGreaterThan(0);
      expect(r.subject.trim().length, r.route).toBeGreaterThan(0);
    }
  });
});

describe("trendsReportFor", () => {
  it("resolves a route and returns null for anything else", () => {
    expect(trendsReportFor("/guide/nda-maths/trends")?.subject).toBe("Mathematics");
    expect(trendsReportFor("/guide/nda-maths")).toBeNull();
  });
});

describe("reportUpdatedIso", () => {
  it("takes the guide subtree's committed content date", () => {
    const dates = { "/guide/nda-maths": "2026-09-19T14:48:07+05:30" };
    expect(reportUpdatedIso("/guide/nda-maths/trends", dates)).toBe("2026-09-19T14:48:07+05:30");
  });

  it("is null when the subtree has no recorded date rather than inventing one", () => {
    expect(reportUpdatedIso("/guide/unknown/trends", {})).toBeNull();
  });
});
