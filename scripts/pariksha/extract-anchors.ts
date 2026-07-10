/**
 * Extract inline snapCrop anchors from a test's transcription shards into the figures
 * manifest that attach-images.ts reads.
 *
 *   npx tsx scripts/pariksha/extract-anchors.ts <testId> [--write]
 *
 * Some transcription agents emit `figureAnchors` (col/top/bottom/answerY) + `figureImg`
 * inline on each hasFigure question. This pulls those into data/<testId>.figures.json:
 *   { "<qnum>": { "img": "p003_L", "col": [c0,c1], "top": t, "bottom": b, "answerY": a } }
 * Questions that are hasFigure but LACK inline anchors are reported — they need a
 * FIGURE_ANCHORS.md anchor-pass agent (or manual authoring) before they can be cropped.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DATA, dataPath, requireTest } from "./config";

const RESERVED = /\.(keys|figures.*|figure-verify)\.json$/;

function main() {
  const testId = process.argv[2];
  const write = process.argv.includes("--write");
  const test = requireTest(testId);

  const files = readdirSync(DATA).filter((f) => f.startsWith(`${test.id}.`) && f.endsWith(".json") && !RESERVED.test(f));
  const manifest: Record<string, unknown> = {};
  const missing: number[] = [];
  let figs = 0;
  for (const f of files) {
    const arr = JSON.parse(readFileSync(join(DATA, f), "utf8")) as Record<string, unknown>[];
    for (const q of arr) {
      if (!q.hasFigure) continue;
      figs++;
      const a = q.figureAnchors as { col?: unknown; top?: unknown; bottom?: unknown; answerY?: unknown } | undefined;
      const img = q.figureImg as string | undefined;
      if (a && img && a.col && a.top != null && a.bottom != null && a.answerY != null) {
        manifest[String(q.number)] = { img, col: a.col, top: a.top, bottom: a.bottom, answerY: a.answerY };
      } else {
        missing.push(Number(q.number));
      }
    }
  }

  const have = Object.keys(manifest).length;
  console.log(`${test.id}: ${figs} figure question(s) — ${have} with inline anchors, ${missing.length} missing${missing.length ? " -> Q" + missing.sort((a, b) => a - b).join(", Q") : ""}`);
  if (!write) { console.log("[dry-run] pass --write to save data/<id>.figures.json"); return; }
  if (!have) { console.log("no inline anchors — nothing written (run a FIGURE_ANCHORS.md anchor pass)."); return; }
  const out = dataPath(test.id, "figures");
  writeFileSync(out, JSON.stringify(manifest, null, 2));
  console.log(`wrote ${out} (${have} anchors)`);
}

main();
