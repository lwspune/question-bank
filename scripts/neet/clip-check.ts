/**
 * Two figure-review aids that the snapCrop anchor guard cannot provide.
 *
 *   npx tsx scripts/neet/clip-check.ts <paperId>            # CLIPPED probe (mechanical)
 *   npx tsx scripts/neet/clip-check.ts <paperId> --context  # context montage (visual)
 *
 * CLIPPED probe — a crop is clipped when the figure's ink runs up to a bbox edge AND
 * continues immediately outside it. Deterministic, so it scans a whole paper for free.
 *
 * Context montage — renders each figure WITH its surroundings and the stored bbox drawn
 * on top. This is the one that catches a DETACHED label (the "P"/"Q" on a wheel, the "C"
 * junction of a bridge) sitting just outside the crop with whitespace in between: the
 * clip probe cannot see those, and they are frequently the very thing the stem names.
 *
 * Neither replaces the verify-figures contact sheet — an answer leak is still only
 * caught by eye, because a wrong `answerY` is geometrically indistinguishable from a
 * right one. Run all three before flip-public.
 */
import { readdirSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { DATA, OUT, requirePaper } from "./config";

function main() {
  const paper = requirePaper(process.argv[2]);
  const wantContext = process.argv.includes("--context");
  const manifests = readdirSync(DATA)
    .filter((f) => f.startsWith(`${paper.id}.figures`) && f.endsWith(".json"))
    .map((f) => join(DATA, f));
  if (!manifests.length) throw new Error(`no figures manifest for ${paper.id}`);

  const lib = join(__dirname, "..", "lib", "figures");
  let args: string[];
  if (wantContext) {
    if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });
    const out = join(OUT, `${paper.id}-figure-context.png`);
    // context_montage takes ONE merged manifest; pass them through a temp merge
    args = [join(lib, "context_montage.py"), paper.pdf, out, ...manifests];
  } else {
    args = [join(lib, "clipprobe.py"), paper.pdf, ...manifests];
  }

  const res = spawnSync("python", args, { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
  if (res.status !== 0) throw new Error(res.stderr || "python failed");
  console.log(res.stdout.trim());
}

main();
