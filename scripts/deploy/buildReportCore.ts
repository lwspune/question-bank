/**
 * Pure core of the deploy build report (TECH_DEBT_SPEC.md Phase 5). Spec: tests/deploy-build-report.test.ts.
 */
export type BuildMetrics = {
  compileSeconds?: number;
  pagesGenerated?: number;
  routes: number;
  wallSeconds?: number;
  peakRssMb?: number;
};

/**
 * Warn (never fail) past these. PROVISIONAL, set 2026-11-05 from the levels that hurt: the build
 * took ~30 min and died at the default heap on 2026-11-04; the heap is now 8 GB. Retune from the
 * first deploys after the tech-debt pass (TECH_DEBT_SPEC.md 2.5).
 */
export const BUILD_THRESHOLDS = { wallMinutes: 30, peakRssMb: 7000 };

function seconds(n: string, unit: string): number {
  const v = Number(n);
  return unit.startsWith("min") ? v * 60 : unit === "ms" ? v / 1000 : v;
}

export function parseBuildLog(log: string): BuildMetrics {
  const out: BuildMetrics = { routes: 0 };
  const compiled = log.match(/Compiled successfully in ([\d.]+)\s*(ms|s|min)/);
  if (compiled) out.compileSeconds = seconds(compiled[1], compiled[2]);
  const pages = [...log.matchAll(/Generating static pages[^(\n]*\((\d+)\/(\d+)\)/g)].pop();
  if (pages) out.pagesGenerated = Number(pages[2]);
  out.routes = log.split("\n").filter((l) => /^[\s┌├└│]*[○●ƒ]\s+\//.test(l)).length;
  const wall = log.match(/Elapsed \(wall clock\) time \(h:mm:ss or m:ss\):\s*(?:(\d+):)?(\d+):([\d.]+)/);
  if (wall) out.wallSeconds = Number(wall[1] ?? 0) * 3600 + Number(wall[2]) * 60 + Number(wall[3]);
  const rss = log.match(/Maximum resident set size \(kbytes\):\s*(\d+)/);
  if (rss) out.peakRssMb = Math.round(Number(rss[1]) / 1024);
  return out;
}

const fmt = (n: number) => n.toLocaleString("en-US");

export function buildReport(m: BuildMetrics, t = BUILD_THRESHOLDS): { markdown: string; warnings: string[] } {
  const row = (label: string, v: string | undefined) => `| ${label} | ${v ?? "not logged"} |`;
  const warnings: string[] = [];
  if (m.wallSeconds !== undefined && m.wallSeconds / 60 > t.wallMinutes)
    warnings.push(`Build time ${(m.wallSeconds / 60).toFixed(1)} min is over ${t.wallMinutes} min`);
  if (m.peakRssMb !== undefined && m.peakRssMb > t.peakRssMb)
    warnings.push(`Peak memory ${fmt(m.peakRssMb)} MB is over ${fmt(t.peakRssMb)} MB (heap limit 8 GB)`);
  const markdown = [
    "### Build report",
    "",
    "| Measure | Value |",
    "|---|---|",
    row("Build time", m.wallSeconds !== undefined ? `${(m.wallSeconds / 60).toFixed(1)} min` : undefined),
    row("Compile", m.compileSeconds !== undefined ? `${Math.round(m.compileSeconds)} s` : undefined),
    row("Pages pre-built", m.pagesGenerated !== undefined ? fmt(m.pagesGenerated) : undefined),
    row("Routes", fmt(m.routes)),
    row("Peak memory", m.peakRssMb !== undefined ? `${fmt(m.peakRssMb)} MB` : undefined),
    "",
    warnings.length ? warnings.map((w) => `- WARNING: ${w}`).join("\n") : "Within thresholds.",
    "",
  ].join("\n");
  return { markdown, warnings };
}
