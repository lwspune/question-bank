/**
 * Figures for NTPC rows: RRB's own image objects, as the transcript's `figure:` lines name them.
 *
 *   npx tsx scripts/rrb-ntpc/figures.ts <shiftId>     # writes figures/<shiftId>/qNNN[-X].png
 *
 * Run it after the transcript is settled and before build.ts (which checks the files exist).
 * Which object is which (figurePlan) and how a figure row is hashed are the SSC CGL lane's
 * (scripts/ssc-cgl/figures.ts). A stem with several objects is stacked into one picture
 * (scripts/jee/compose_figures.py), since a question carries one image_url.
 *
 * Prepp's logo and page header are dropped by tcs_extract.py (the same picture on 5+ pages),
 * so the objects here are RRB's. LOOK at each one anyway: audit:watermark is the standing check.
 * Maths set as an image (pi, a unit, a fraction) is NOT a figure: write it as LaTeX.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { figurePlan } from "../ssc-cgl/figures";
import { parseTranscript } from "../ssc-cgl/lib";
import { FIGURES, OUT, TRANSCRIPTS, requireShift } from "./config";

const LABELS = ["A", "B", "C", "D"] as const;

function writeFigure(out: string, sources: string[]) {
  for (const s of sources) if (!existsSync(s)) throw new Error(`image object missing: ${s}`);
  if (sources.length === 1) copyFileSync(sources[0], out);
  else execFileSync("python", ["-P", join(__dirname, "..", "jee", "compose_figures.py"), out, ...sources], { stdio: "pipe" });
}

function main() {
  const shift = requireShift(process.argv[2]);
  const sheetFile = JSON.parse(readFileSync(join(OUT, shift.id, "questions.json"), "utf8"));
  const byNumber = new Map<number, { number: number; stemImages: string[]; options: string[][] }>(sheetFile.questions.map((q: { number: number }) => [q.number, q]));
  const transcript = parseTranscript(readFileSync(join(TRANSCRIPTS, `${shift.id}.txt`), "utf8"));
  const dir = join(FIGURES, shift.id);
  let n = 0;
  for (const q of transcript) {
    const sheet = byNumber.get(q.number);
    if (!sheet) throw new Error(`Q${q.number} is not on the sheet`);
    const plan = figurePlan(q, sheet);
    if (!plan.stem && !plan.options) continue;
    mkdirSync(dir, { recursive: true });
    const base = join(dir, `q${String(q.number).padStart(3, "0")}`);
    const src = (names: string[]) => names.map((x) => join(sheetFile.imgDir, x));
    if (plan.stem) writeFigure(`${base}.png`, src(plan.stem));
    plan.options?.forEach((imgs, i) => writeFigure(`${base}-${LABELS[i]}.png`, src(imgs)));
    n++;
  }
  console.log(`${shift.id}: ${n} question(s) with figures -> ${dir}`);
}

main();
