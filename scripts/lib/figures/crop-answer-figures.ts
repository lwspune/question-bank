/**
 * Crop a textbook chapter's answer figures (the book's own figure as the model
 * answer to a "draw a labelled diagram" question) and write the manifest that
 * <lane>/attach-solution-image.ts uploads.
 *
 *   npx tsx scripts/lib/figures/crop-answer-figures.ts <lane> <chapterId>          # crop + report, writes no manifest
 *   npx tsx scripts/lib/figures/crop-answer-figures.ts <lane> <chapterId> --write  # also write data/<id>.solution-images.json
 *
 * <lane> is the folder under scripts/ (stateboard, mh-sb-11). Reads
 * data/<id>.diagram-answers.json, where each entry carries `page` (0-based) and
 * `bbox` (page fractions) for the book figure; plan + checks in answerFigures.ts.
 * VIEW every crop before --write: a box that clips a label or takes in the
 * caption's neighbour is only visible on the image.
 */
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { join, relative } from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import { planAnswerFigures, type DiagramAnswer } from "./answerFigures";

async function main() {
  const [lane, id] = process.argv.slice(2);
  const write = process.argv.includes("--write");
  if (!lane || !id) throw new Error("usage: crop-answer-figures.ts <lane> <chapterId> [--write]");
  const cfg = await import(pathToFileURL(join(__dirname, "..", "..", lane, "config.ts")).href);
  const ch = cfg.requireChapter(id);

  const entries = JSON.parse(readFileSync(join(cfg.DATA, `${id}.diagram-answers.json`), "utf8")) as DiagramAnswer[];
  const plan = planAnswerFigures(entries);
  for (const n of plan.none) console.log(`  no book figure (decision): ${n}`);
  if (plan.errors.length) {
    for (const e of plan.errors) console.log(`  !! ${e}`);
    process.exit(1);
  }
  if (!plan.jobs.length) {
    console.log(`${id}: nothing to crop.`);
    return;
  }

  const outdir = join(cfg.OUT, `${id}-answerfigs`);
  const spec = join(mkdtempSync(join(tmpdir(), "ansfig-")), "jobs.json");
  writeFileSync(spec, JSON.stringify({ pdf: ch.pdf, outdir, jobs: plan.jobs }));
  const res = spawnSync("python", [join(__dirname, "crop_answer_figs.py"), spec], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (res.status !== 0) throw new Error(`crop failed: ${res.stderr}`);
  const crops = JSON.parse(res.stdout.trim().split("\n").pop()!) as Record<string, string>;

  for (const [ref, path] of Object.entries(crops)) {
    console.log(`  ${ref.padEnd(14)} ${String(readFileSync(path).length).padStart(9)} B  ${path}`);
  }
  if (!write) {
    console.log(`\n[dry run] ${plan.jobs.length} crop(s) in ${outdir}. View each, then re-run with --write.`);
    return;
  }
  const manifest = Object.entries(crops).map(([ref, path]) => ({ ref, png: relative(process.cwd(), path).replace(/\\/g, "/") }));
  writeFileSync(join(cfg.DATA, `${id}.solution-images.json`), JSON.stringify(manifest, null, 2) + "\n");
  console.log(`\nwrote data/${id}.solution-images.json (${manifest.length}).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
