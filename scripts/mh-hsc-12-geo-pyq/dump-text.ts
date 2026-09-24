/**
 * Dump a board paper's PDF text layer to out/<id>/text.md.
 *
 *   npx tsx scripts/mh-ssc-10/dump-text.ts <paperId>
 *
 * Most MH-SSC-10 source PDFs are pure RASTER scans with no text layer (vision is
 * the only option). But SOME — notably the Science II back-years 2016-2022 — are
 * born-digital TYPESET reproductions carrying a real text layer. When one does,
 * transcription becomes a hybrid: the text layer is ground truth for wording /
 * options / numbering, and the rendered PNGs are still needed for figures,
 * flow-charts and boxed activities. Always run this before dispatching a
 * transcription agent; if it reports ~0 chars, the paper is a scan → vision-only.
 */
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { OUT, requirePaper } from "./config";

function main() {
  const id = process.argv[2];
  const paper = requirePaper(id);
  const dir = join(OUT, id);
  mkdirSync(dir, { recursive: true });

  // Python writes the file itself in UTF-8 — piping through stdout dies on
  // Windows (cp1252 can't encode the papers' ⟶ / bullet / private-use glyphs).
  const target = join(dir, "text.md");
  const py = `
import fitz, sys
pdf, target = sys.argv[1], sys.argv[2]
d = fitz.open(pdf)
out = []
for p in range(len(d)):
    out.append("\\n\\n===== PAGE " + str(p).zfill(2) + " (p-" + str(p).zfill(2) + ".png) =====\\n")
    out.append(d[p].get_text())
d.close()
open(target, "w", encoding="utf-8").write("".join(out))
`;
  const pyFile = join(OUT, `_text_${id}.py`);
  writeFileSync(pyFile, py);
  const res = spawnSync("python", [pyFile, paper.pdf, target], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (res.status !== 0) throw new Error(`text dump failed: ${res.stderr}`);

  const chars = readFileSync(target, "utf8").replace(/=====[^\n]*=====/g, "").trim().length;
  console.log(`${id}: ${chars} chars → ${target}`);
  if (chars < 500) console.log("  ⚠ effectively no text layer — treat as a SCAN (vision-only).");
}

main();
