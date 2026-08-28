/**
 * Rasterise a booklet's ENGLISH question pages for vision transcription.
 *
 *   npx tsx scripts/upsc/render.ts 2025-p1
 *   npx tsx scripts/upsc/render.ts 2025-p2 --dpi=220
 *   npx tsx scripts/upsc/render.ts 2025-p1 --no-columns
 *
 * Writes, per declared English page, into out/<paperId>/ (gitignored):
 *
 *   pNN.png     the whole page          — structure, and anything spanning the gutter
 *   pNN-c1.png  the LEFT column         — the text to transcribe from
 *   pNN-c2.png  the RIGHT column        —      "
 *
 * WHY COLUMNS. Both papers are set in two columns, and the single most expensive
 * defect this bank has recorded comes from reading them in the wrong order: an
 * option block attributed to the neighbouring question. It produced 19 wrong keys
 * on the CDS English corpus, and — the part that matters — a blind re-derivation
 * CANNOT catch it, because the deriver reads the corrupted options, reasons
 * correctly from them, and confirms the wrong letter. Handing the agent one
 * column at a time removes the ambiguity at the source instead of asking it to
 * be careful.
 *
 * The full page is still emitted because a question, and in Paper II a whole
 * passage, may span the gutter: the columns are for FIDELITY, the page for
 * STRUCTURE. The transcription brief says so explicitly.
 *
 * THE GUTTER IS MEASURED, NOT ASSUMED. Page geometry drifts across eleven years
 * of scans (page widths here range 539-618pt and several booklets are visibly
 * skewed), so a hardcoded midpoint would slice text on some years. This finds the
 * widest low-ink vertical band in the middle of the page and reports the result
 * for EVERY page — a gutter that lands somewhere daft is meant to be visible
 * before a transcription pass is spent on it, not after.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { OUT, requirePaper, pattern } from "./config";

const DEFAULT_DPI = 200;

/** Emits the per-page render + gutter detection in one Python pass (PyMuPDF + PIL). */
const PY = String.raw`
import json, sys
import fitz
from PIL import Image
import io

pdf, outdir, dpi, pages_json, want_columns = sys.argv[1], sys.argv[2], int(sys.argv[3]), sys.argv[4], sys.argv[5] == "1"
pages = json.loads(pages_json)

doc = fitz.open(pdf)
report = {"pageCount": doc.page_count, "pages": []}

for idx in pages:
    if idx < 0 or idx >= doc.page_count:
        report["pages"].append({"index": idx, "error": "out of range"})
        continue
    pix = doc[idx].get_pixmap(dpi=dpi)
    im = Image.open(io.BytesIO(pix.tobytes("png"))).convert("L")
    W, H = im.size
    im.save(f"{outdir}/p{idx:02d}.png")

    entry = {"index": idx, "width": W, "height": H}

    if want_columns:
        # Ink profile: count dark pixels per column, over the vertical middle of
        # the page only. Headers and the footer/page-number band run full width
        # and would fill the gutter, hiding it.
        top, bot = int(H * 0.12), int(H * 0.92)
        crop = im.crop((0, top, W, bot))
        px = crop.load()
        cw, ch = crop.size
        ink = [0] * cw
        # Sample every 3rd row: the profile is smooth at this scale and a full
        # scan is ~3x slower for no change in the detected boundary.
        for x in range(cw):
            c = 0
            for y in range(0, ch, 3):
                if px[x, y] < 160:
                    c += 1
            ink[x] = c

        # Score each candidate column by the MEDIAN ink in a window around it,
        # then take the lowest-scoring column, nearest the page centre on a tie.
        #
        # Median, not mean, and that is the whole trick. Paper II prints a
        # VERTICAL RULE down the gutter: ~12px of solid ink whose MEAN over a
        # 50px window (~37/col) is indistinguishable from body text (~40/col).
        # Under a median the rule is just a dozen outliers among fifty samples,
        # so the gutter scores ~2 against text's ~35 — an order of magnitude of
        # separation instead of none.
        #
        # Two earlier attempts are recorded because both failed on real pages and
        # both looked reasonable:
        #   - "widest run of near-zero columns" chose x=959 on 2025-p1 p21, where
        #     the right column is nearly empty and its internal whitespace is
        #     wider than the gutter. It sliced the "99." and "100." item numbers
        #     into the LEFT crop, leaving the right crop's questions unnumbered.
        #   - raising the near-zero threshold to catch speckle let runs CHAIN
        #     across inter-word gaps, dragging the merged midpoint to x=660.
        HALF = 25
        centre = cw // 2
        lo, hi = int(cw * 0.30), int(cw * 0.70)
        best = None
        for x in range(lo, hi):
            window = sorted(ink[max(0, x - HALF): min(cw, x + HALF + 1)])
            med = window[len(window) // 2]
            key = (med, abs(x - centre))
            if best is None or key < best[0]:
                best = (key, x)
        best_mid = best[1]
        best_med = best[0][0]
        # Report the clear width actually found at the chosen split, for the log.
        best_len = sum(1 for v in ink[max(0, best_mid - HALF): min(cw, best_mid + HALF + 1)] if v <= 5)
        found = best_med <= 8
        if not found:
            best_mid = W // 2

        entry["gutterX"] = best_mid
        entry["gutterWidth"] = best_len
        entry["gutterFound"] = found

        # Overlap past the gutter so a glyph on the boundary is not sliced, and
        # pad the two sides ASYMMETRICALLY.
        #
        # An item NUMBER hangs to the LEFT of its column's text, in its own
        # narrow indent. When the detected split lands even slightly right of
        # that indent, the right column's numbers fall into c1 and c2 opens on
        # un-numbered stems — measured on 2022-p1, where three bands
        # independently reported it on all their pages ("c2 opens with a bare
        # '.'", "reads 4. for 64"). No body text is lost, but the transcriber
        # then has to recover every right-column number from the whole page.
        #
        # So c2 reaches back far enough to keep its own numbers. c1's overlap
        # stays small: widening it would pull the right column's numbers into c1
        # too, which is the other half of the same complaint.
        pad_c1 = 12
        pad_c2 = 56
        page_im = Image.open(io.BytesIO(pix.tobytes("png")))
        page_im.crop((0, 0, min(W, best_mid + pad_c1), H)).save(f"{outdir}/p{idx:02d}-c1.png")
        page_im.crop((max(0, best_mid - pad_c2), 0, W, H)).save(f"{outdir}/p{idx:02d}-c2.png")

    report["pages"].append(entry)

doc.close()
print(json.dumps(report))
`;

function main() {
  const args = process.argv.slice(2);
  const id = args.find((a) => !a.startsWith("--"));
  const paper = requirePaper(id);
  const dpiArg = args.find((a) => a.startsWith("--dpi="));
  const dpi = dpiArg ? Number(dpiArg.split("=")[1]) : DEFAULT_DPI;
  const wantColumns = !args.includes("--no-columns");

  if (!existsSync(paper.pdf)) throw new Error(`source PDF not found: ${paper.pdf}`);
  if (!Number.isFinite(dpi) || dpi < 80 || dpi > 600) throw new Error(`--dpi out of range: ${dpi}`);

  const dir = join(OUT, paper.id);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  const pat = pattern(paper);
  console.log(`${paper.id}  Paper ${paper.paper}  ${pat.questions} items  source DPI ~${paper.dpi}`);
  console.log(`${paper.pdf}`);
  console.log(`rendering ${paper.englishPages.length} English page(s) at ${dpi} DPI -> ${dir}\n`);

  const raw = execFileSync(
    "python",
    ["-c", PY, paper.pdf, dir, String(dpi), JSON.stringify(paper.englishPages), wantColumns ? "1" : "0"],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }
  );
  const report = JSON.parse(raw.trim().split("\n").pop()!);

  const bad = report.pages.filter((p: { error?: string }) => p.error);
  if (bad.length) {
    throw new Error(
      `page index out of range for a ${report.pageCount}-page document: ` +
        bad.map((p: { index: number }) => p.index).join(", ")
    );
  }

  if (wantColumns) {
    const missed = report.pages.filter((p: { gutterFound: boolean }) => !p.gutterFound);
    const xs = report.pages.map((p: { gutterX: number }) => p.gutterX);
    const min = Math.min(...xs);
    const max = Math.max(...xs);
    for (const p of report.pages) {
      const flag = p.gutterFound ? "  " : "!!";
      console.log(
        `  ${flag} p${String(p.index).padStart(2, "0")}  ${p.width}x${p.height}  ` +
          `gutter x=${p.gutterX} (${p.gutterWidth}px clear)`
      );
    }
    console.log(`\ngutter x range across pages: ${min}..${max}  (spread ${max - min}px)`);
    if (missed.length) {
      console.log(
        `\n!! ${missed.length} page(s) had NO detectable gutter and fell back to the page ` +
          `midpoint: ${missed.map((p: { index: number }) => p.index).join(", ")}\n` +
          `   OPEN THOSE COLUMN CROPS before transcribing them — a midpoint split on a ` +
          `full-width table or a skewed scan slices text down the middle.`
      );
    }
    if (max - min > 60) {
      console.log(
        `\n!! the gutter moves more than 60px across pages, which usually means a skewed\n` +
          `   scan or a full-width element on some page. Spot-check the outliers.`
      );
    }
  }

  writeFileSync(join(dir, "_render.json"), JSON.stringify({ paper: paper.id, dpi, ...report }, null, 2));
  console.log(`\nwrote ${report.pages.length} page render(s)${wantColumns ? " + column crops" : ""}.`);
  console.log(`report: ${join(dir, "_render.json")}`);
}

main();
