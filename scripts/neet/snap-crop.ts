/**
 * Derive a leak-safe figure bbox from COARSE anchors via snapcrop.py, and (with
 * --write) store it in the figures manifest. This replaces eyeballing 4 float
 * coordinates: you give the rough column + the two whitespace-gap anchors + the
 * answer ceiling, and the exact bbox is computed from the page ink.
 *
 *   npx tsx scripts/neet/snap-crop.ts <paperId> <qnum> \
 *        --col=0.14,0.44 --top=0.69 --bottom=0.816 --answer=0.822        # dry-run
 *   npx tsx scripts/neet/snap-crop.ts <paperId> <qnum> ... --write       # update manifest
 *
 * Refuses to --write a not-ok result (misplaced anchor / leak-guard trip) unless
 * --force. After writing, re-attach with attach-images.ts (clear image_url first).
 * ALWAYS eyeball the crop / the verify-figures contact sheet — a WRONG answerY is
 * the one error geometry can't catch.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { DATA, requirePaper } from "./config";
import { validateAnchors, type Anchors, type FigureEntry } from "./figures";

function opt(name: string): string | undefined {
  const p = process.argv.find((a) => a.startsWith(`--${name}=`));
  return p ? p.slice(name.length + 3) : undefined;
}

function main() {
  const paper = requirePaper(process.argv[2]);
  const qnum = process.argv[3];
  const write = process.argv.includes("--write");
  const force = process.argv.includes("--force");
  if (!qnum || !opt("col") || !opt("top") || !opt("bottom") || !opt("answer")) {
    throw new Error("usage: snap-crop.ts <paperId> <qnum> --col=x0,x1 --top=t --bottom=b --answer=y [--write]");
  }
  const col = opt("col")!.split(",").map(Number) as [number, number];
  const anchors: Anchors = { col, top: Number(opt("top")), bottom: Number(opt("bottom")), answerY: Number(opt("answer")) };
  const errs = validateAnchors(anchors);
  if (errs.length) throw new Error("bad anchors: " + errs.join("; "));

  // locate the qnum's entry across data/<paper>.figures*.json
  const files = readdirSync(DATA).filter((f) => f.startsWith(`${paper.id}.figures`) && f.endsWith(".json"));
  let targetFile: string | undefined;
  let manifest: Record<string, FigureEntry> | undefined;
  for (const f of files) {
    const m = JSON.parse(readFileSync(join(DATA, f), "utf8")) as Record<string, FigureEntry>;
    if (m[qnum]) { targetFile = f; manifest = m; break; }
  }
  if (!targetFile || !manifest) throw new Error(`Q${qnum} not found in ${paper.id} figures manifest`);
  const page = manifest[qnum].page;

  const res = spawnSync(
    "python",
    [join(__dirname, "snapcrop.py"), paper.pdf, String(page), String(col[0]), String(col[1]), String(anchors.top), String(anchors.bottom), String(anchors.answerY)],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
  );
  if (res.status !== 0) throw new Error(`snapcrop.py failed: ${res.stderr}`);
  const out = JSON.parse(res.stdout.trim()) as { bbox: [number, number, number, number]; warnings: string[]; ok: boolean };
  console.log(`Q${qnum} (page ${page}): bbox ${JSON.stringify(out.bbox)}  ${out.ok ? "OK" : "WARN: " + out.warnings.join("; ")}`);

  if (!write) { console.log("[dry-run] pass --write to update the manifest"); return; }
  if (!out.ok && !force) throw new Error("refusing to --write a not-ok bbox (fix the anchor, or pass --force)");
  manifest[qnum] = { page, bbox: out.bbox, anchors };
  writeFileSync(join(DATA, targetFile), JSON.stringify(manifest, null, 2) + "\n", "utf8");
  console.log(`wrote ${targetFile} (Q${qnum}). Re-attach: null image_url, then attach-images.ts ${paper.id} --apply`);
}

main();
