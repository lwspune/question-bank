/**
 * Prepare a paper's question pages for transcription (whole page + two columns).
 *
 *   npx tsx scripts/milschool/render.ts aissee-9-2025
 *   npx tsx scripts/milschool/render.ts rms-cet-6-2024 --no-columns
 *
 * Writes out/<paperId>/pNN.png, pNN-c1.png, pNN-c2.png (gitignored) and prints
 * the gutter found on every page. A page with gutterFound=false is split at the
 * middle; LOOK at it before a transcription pass is spent on it.
 */
import { execFileSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import { OUT, PDF_ROOT, SOURCE_ROOT, requirePaper } from "./config";

function main() {
  const args = process.argv.slice(2);
  const paper = requirePaper(args.find((a) => !a.startsWith("--")));
  // The original PDF when the paper names one; the viewer JPGs otherwise.
  const src = paper.pdf ? join(PDF_ROOT, paper.pdf) : join(SOURCE_ROOT, paper.pagesDir);
  if (!existsSync(src)) throw new Error(`source pages not found: ${src}`);
  const dir = join(OUT, paper.id);
  rmSync(dir, { recursive: true, force: true });
  const pyArgs = ["-P", join(__dirname, "render.py"), src, dir, JSON.stringify(paper.pages)];
  if (args.includes("--no-columns")) pyArgs.push("--no-columns");
  for (const a of args.filter((a) => a.startsWith("--scale=") || a.startsWith("--dpi="))) pyArgs.push(a);
  const report = JSON.parse(execFileSync("python", pyArgs, { encoding: "utf8", maxBuffer: 1 << 24 })) as {
    pages: { index: number; error?: string; gutterX?: number; gutterMedian?: number; gutterFound?: boolean }[];
  };
  console.log(`${paper.id}: ${paper.pages.length} pages -> ${dir}`);
  for (const p of report.pages) {
    if (p.error) console.log(`  p${p.index}: ${p.error}`);
    else if (p.gutterFound === false) console.log(`  p${p.index}: NO GUTTER (median ${p.gutterMedian}); split at middle, check it`);
  }
  const bad = report.pages.filter((p) => p.error);
  if (bad.length) process.exit(1);
}

main();
