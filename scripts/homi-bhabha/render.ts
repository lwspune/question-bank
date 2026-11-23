/**
 * Prepare a paper's question pages for transcription.
 *
 *   npx tsx scripts/homi-bhabha/render.ts hb-9-2024              # English booklet
 *   npx tsx scripts/homi-bhabha/render.ts hb-9-2024 --marathi    # its Marathi twin
 *   npx tsx scripts/homi-bhabha/render.ts hb-9-2024 --columns    # also split columns
 *
 * Writes out/<paperId>/pNN.png (out/<paperId>-mr/ with --marathi; gitignored).
 * MSTA prints every booklet single-column, so pages are whole by default.
 * Run with the Python that has PyMuPDF (PowerShell's `python` on this machine).
 */
import { execFileSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import { OUT, PDF_ROOT, requirePaper } from "./config";

function main() {
  const args = process.argv.slice(2);
  const paper = requirePaper(args.find((a) => !a.startsWith("--")));
  const marathi = args.includes("--marathi");
  if (marathi && !paper.marathi) throw new Error(`${paper.id} has no Marathi booklet`);
  if (marathi && paper.marathi!.pages.length === 0) throw new Error(`${paper.id}: set marathi.pages in config.ts first`);
  const pdf = marathi ? paper.marathi!.pdf : paper.pdf;
  const pages = marathi ? paper.marathi!.pages : paper.pages;
  const src = join(PDF_ROOT, pdf);
  if (!existsSync(src)) throw new Error(`source PDF not found: ${src}`);
  const dir = join(OUT, marathi ? `${paper.id}-mr` : paper.id);
  rmSync(dir, { recursive: true, force: true });
  const pyArgs = ["-P", join(__dirname, "render.py"), src, dir, JSON.stringify(pages)];
  if (!args.includes("--columns")) pyArgs.push("--no-columns");
  for (const a of args.filter((a) => a.startsWith("--scale=") || a.startsWith("--dpi="))) pyArgs.push(a);
  const report = JSON.parse(execFileSync("python", pyArgs, { encoding: "utf8", maxBuffer: 1 << 24 })) as {
    pages: { index: number; error?: string; gutterFound?: boolean; gutterMedian?: number }[];
  };
  console.log(`${paper.id}${marathi ? " (Marathi)" : ""}: ${pages.length} pages -> ${dir}`);
  for (const p of report.pages) {
    if (p.error) console.log(`  p${p.index}: ${p.error}`);
    else if (p.gutterFound === false) console.log(`  p${p.index}: NO GUTTER (median ${p.gutterMedian}); split at middle, check it`);
  }
  if (report.pages.some((p) => p.error)) process.exit(1);
}

main();
