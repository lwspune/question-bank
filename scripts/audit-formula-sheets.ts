/**
 * npm run audit:formula-sheets — does every chapter's formula sheet FIT its page?
 *
 * The sheet (POST /api/export/formula-sheet) is two columns on A4. A reference
 * table cannot shrink below its widest cell that will not wrap, and a display
 * formula cannot wrap at all, so width is a property of the fonts, not of the
 * data: tests/formula-sheet-registry.test.ts proves every sheet BUILDS, and
 * nothing short of a browser can say whether it fits. Before the page's fit
 * step (2026-10-12) this measured 84 tables in 33 chapters running under the
 * other column and 29 formulas in 15 chapters cut off by the formula box,
 * which looks complete and so is never reported.
 *
 * Builds every registered chapter's sheet into one page, runs the sheet's OWN
 * fit step (FIT_SCRIPT) on each in the printer's Chromium, then measures: any
 * table or formula still reaching past its box is a defect and the run exits 1.
 * Also reports how many sections went full width and anything scaled down.
 * Local only (needs Edge/Chrome, or PDF_BROWSER); read-only, no database.
 */
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import { buildFormulaSheetHtml } from "@/lib/export/pdf/formulaSheetHtml";
import { pdfHead } from "@/lib/export/pdf/assets";
import { pdfBrowser } from "@/lib/export/pdf/printPdf";

type Result = {
  id: string;
  blocks: number;
  full: number;
  zoom: number[];
  overflow: string[];
  /** Before the fit: items wider than their column. */
  tooWide: number;
};

/** `--no-fit` measures the sheets as they printed before the fit step: the baseline it fixes. */
const NO_FIT = process.argv.includes("--no-fit");

const MEASURE = `
addEventListener("load", function () {
  document.body.offsetHeight;
  document.fonts.ready.then(function () {
    var out = [];
    var sections = document.querySelectorAll("section[data-id]");
    for (var i = 0; i < sections.length; i++) {
      var s = sections[i], before = s.querySelectorAll(".f"), tooWide = 0;
      for (var b = 0; b < before.length; b++) {
        if (fitNatural(before[b]) > before[b].clientWidth + 1) tooWide++;
      }
      if (FIT) fitFormulaSheet(s);
      var overflow = [];
      var items = s.querySelectorAll(".f");
      for (var j = 0; j < items.length; j++) {
        var f = items[j], edge = f.getBoundingClientRect().right + 1;
        var parts = f.querySelectorAll("table.ref, .katex-html > .base");
        for (var k = 0; k < parts.length; k++) {
          if (parts[k].getBoundingClientRect().right > edge) { overflow.push(f.querySelector(".lbl").textContent); break; }
        }
      }
      var zoomed = s.querySelectorAll("[style*=zoom]"), zoom = [];
      for (var z = 0; z < zoomed.length; z++) zoom.push(Number(zoomed[z].style.zoom));
      out.push({ id: s.getAttribute("data-id"), blocks: s.querySelectorAll(".block").length,
        full: s.querySelectorAll(".block.full").length, zoom: zoom, overflow: overflow,
        tooWide: tooWide });
    }
    var pre = document.createElement("pre");
    pre.id = "AUDIT";
    pre.textContent = JSON.stringify(out);
    document.body.appendChild(pre);
  });
});`;

async function main() {
  let css = "";
  let fit = "";
  const sections: string[] = [];
  for (const c of NOTES_CHAPTERS) {
    const html = buildFormulaSheetHtml({ chapter: c, head: "", branded: false });
    if (!css) {
      css = html.slice(html.indexOf("<style>") + 7, html.indexOf("</style>"));
      fit = html.slice(html.indexOf("<script>") + 8, html.indexOf("\naddEventListener"));
    }
    const main = html.slice(html.indexOf('<main class="cols">'), html.lastIndexOf("</main>") + 7);
    sections.push(`<section data-id="${c.subjectRoute}/${c.chapterSlug}">${main}</section>`);
  }
  const page =
    `<!doctype html><html><head><meta charset="utf-8">${pdfHead()}<style>${css}` +
    `section { margin-bottom: 20mm; }</style></head><body>${sections.join("")}` +
    `<script>${fit}\nvar FIT = ${!NO_FIT};\n${MEASURE}</script></body></html>`;

  const dir = mkdtempSync(join(tmpdir(), "pv-sheet-audit-"));
  try {
    const file = join(dir, "sheets.html");
    writeFileSync(file, page, "utf8");
    const { path, args } = await pdfBrowser();
    const run = spawnSync(
      path,
      [
        ...args,
        "--disable-gpu",
        "--no-first-run",
        "--allow-file-access-from-files",
        `--user-data-dir=${join(dir, "profile")}`,
        "--virtual-time-budget=120000",
        "--dump-dom",
        pathToFileURL(file).href,
      ],
      { encoding: "utf8", maxBuffer: 512 * 1024 * 1024, timeout: 600_000 }
    );
    const m = (run.stdout ?? "").match(/<pre id="AUDIT">([\s\S]*?)<\/pre>/);
    if (!m) {
      console.error("The browser returned no measurement.", run.error?.message ?? "", (run.stderr ?? "").slice(-2000));
      process.exit(2);
    }
    const unescape = (s: string) =>
      s.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    report(JSON.parse(unescape(m[1])) as Result[]);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function report(results: Result[]) {
  const blocks = results.reduce((a, r) => a + r.blocks, 0);
  const full = results.reduce((a, r) => a + r.full, 0);
  const zooms = results.flatMap((r) => r.zoom.map((z) => ({ id: r.id, z })));
  const bad = results.filter((r) => r.overflow.length > 0);

  const tooWide = results.reduce((a, r) => a + r.tooWide, 0);
  console.log(`Formula sheets measured${NO_FIT ? " WITHOUT the fit step" : ""}: ${results.length} chapters, ${blocks} sections.`);
  console.log(`  in a column: ${tooWide} items wider than it (${results.filter((r) => r.tooWide > 0).length} chapters)`);
  console.log(`  laid out full width: ${full} sections in ${results.filter((r) => r.full > 0).length} chapters`);
  console.log(`  scaled down to fit the page: ${zooms.length} items` + (zooms.length ? ` (smallest ${Math.min(...zooms.map((x) => x.z))})` : ""));
  for (const { id, z } of zooms.sort((a, b) => a.z - b.z)) console.log(`    ${z}  ${id}`);
  if (bad.length === 0) {
    console.log("  still past its box: 0. Every sheet fits.");
    return;
  }
  console.log(`  STILL PAST ITS BOX: ${bad.reduce((a, r) => a + r.overflow.length, 0)} items in ${bad.length} chapters`);
  for (const r of bad) console.log(`    ${r.id}: ${r.overflow.join(" | ")}`);
  process.exit(1);
}

main();
