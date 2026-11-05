/**
 * The deploy build's report (TECH_DEBT_SPEC.md Phase 5): what one build cost, read from its log.
 *
 * WHY: the build went from ~18 to ~30 minutes in three weeks and ran out of memory on 2026-11-04,
 * and nobody saw it coming because no number was written down per build. This puts the numbers
 * in every deploy's job summary and WARNS (never fails) past a threshold.
 */
import { describe, it, expect } from "vitest";
import { parseBuildLog, buildReport, BUILD_THRESHOLDS } from "../scripts/deploy/buildReportCore";

const LOG = [
  "   ▲ Next.js 16.4.5 (Turbopack)",
  " ✓ Compiled successfully in 68s",
  "  Generating static pages using 4 workers (0/3359) ...",
  "✓ Generating static pages using 4 workers (3359/3359) in 2.7min",
  "Route (app)                         Revalidate  Expire",
  "┌ ○ /                                        ",
  "├ ● /notes/nda-maths/[chapterSlug]           1d      1y",
  "├ ƒ /api/export",
  "└ ○ /robots.txt",
  "\tElapsed (wall clock) time (h:mm:ss or m:ss): 18:34.12",
  "\tMaximum resident set size (kbytes): 6291456",
].join("\n");

describe("parseBuildLog", () => {
  it("reads the numbers a Next 16 build and GNU time print", () => {
    expect(parseBuildLog(LOG)).toEqual({
      compileSeconds: 68,
      pagesGenerated: 3359,
      routes: 4,
      wallSeconds: 18 * 60 + 34.12,
      peakRssMb: 6144,
    });
  });

  it("reads h:mm:ss wall time", () => {
    expect(parseBuildLog("\tElapsed (wall clock) time (h:mm:ss or m:ss): 1:02:03").wallSeconds).toBe(3723);
  });

  it("leaves out what the log does not have (no GNU time on the runner)", () => {
    expect(parseBuildLog(" ✓ Compiled successfully in 2.5min")).toEqual({ compileSeconds: 150, routes: 0 });
  });
});

describe("buildReport", () => {
  it("lists every number and warns on none when all are inside the thresholds", () => {
    const r = buildReport(parseBuildLog(LOG));
    expect(r.markdown).toContain("| Build time | 18.6 min |");
    expect(r.markdown).toContain("| Pages pre-built | 3,359 |");
    expect(r.markdown).toContain("| Peak memory | 6,144 MB |");
    expect(r.warnings).toEqual([]);
  });

  it("warns past a threshold and says which", () => {
    const r = buildReport({ wallSeconds: (BUILD_THRESHOLDS.wallMinutes + 1) * 60, peakRssMb: BUILD_THRESHOLDS.peakRssMb + 1, routes: 1 });
    expect(r.warnings).toHaveLength(2);
    expect(r.warnings[0]).toMatch(/Build time/);
    expect(r.warnings[1]).toMatch(/Peak memory/);
  });

  it("says when a number was not in the log instead of printing zero", () => {
    expect(buildReport({ routes: 3 }).markdown).toContain("| Peak memory | not logged |");
  });
});
