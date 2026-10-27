/**
 * Figures for SSC CGL rows (TCS shifts): which of SSC's own image objects a transcript's
 * `figure:` line stands for, and how a figure row is hashed and stored.
 *
 *   npx tsx scripts/ssc-cgl/figures.ts <shiftId>     # writes figures/<shiftId>/qNNN[-X].png
 *
 * Run it after the transcript is settled and before build.ts (which checks the files exist).
 * A stem picture that also prints the question sentence is trimmed to its figure (stemTrim.ts);
 * look at the result, and record a picture that must stay whole in stem-trim-keep.json.
 * A stem with several image objects is stacked into one picture (scripts/jee/compose_figures.py),
 * because a question carries a single image_url. The transcriber writes `[figure]` as the text
 * of a picture option; the bank stores it as empty text beside options.image_url.
 *
 * Maths set as an image is NOT a figure: write it as LaTeX. A figure is what text cannot say
 * (dice, mirror images, paper folding, a diagram the solution reads off).
 */
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import type { FigureKind } from "./lib";

export const FIGURE_OPTION = "[figure]";
const LABELS = ["A", "B", "C", "D"] as const;

/**
 * The bank keeps one row per (org, exam, content_hash), and content_hash is text + options +
 * answer. Figure items share stock wording ("Select the correct mirror image of the given
 * figure") and blank picture options, so two different ones with the same answer letter would
 * hash alike and the second be skipped as a repeat. Folding the figure bytes in keeps them
 * apart, and a true repeat (the same picture) still hashes equal.
 */
export function figureAwareHash(textHash: string, figures: Buffer[]): string {
  if (!figures.length) return textHash;
  const h = createHash("sha256").update(textHash);
  for (const f of figures) h.update("\n").update(createHash("sha256").update(f).digest("hex"));
  return h.digest("hex");
}

export function optionTextForBank(text: string): string {
  return text === FIGURE_OPTION ? "" : text;
}

type PlanQ = { number: number; figure: FigureKind; options: readonly string[] };
type SheetQ = { number: number; stemImages: string[]; options: string[][]; regions?: { raster?: boolean }[] };
/** crop: the question is on a 2023 scan's raster page, which has no image objects, so its
 * figures are cropped from the page (scan_figures.py). */
export type FigurePlan = { stem: string[] | null; options: string[][] | null; crop?: FigureKind };

export function figurePlan(q: PlanQ, sheet: SheetQ): FigurePlan {
  const wantsStem = q.figure === "stem" || q.figure === "stem+options";
  const wantsOptions = q.figure === "options" || q.figure === "stem+options";
  if (!wantsOptions) {
    const i = q.options.indexOf(FIGURE_OPTION);
    if (i >= 0) throw new Error(`Q${q.number} option ${LABELS[i]} is "${FIGURE_OPTION}" but the row says figure: ${q.figure}`);
  }
  if ((wantsStem || wantsOptions) && sheet.regions?.some((r) => r.raster)) {
    if (wantsOptions) {
      const i = q.options.findIndex((o) => o !== FIGURE_OPTION);
      if (i >= 0) throw new Error(`Q${q.number} option ${LABELS[i]} must be "${FIGURE_OPTION}" when the options are figures`);
    }
    return { stem: null, options: null, crop: q.figure };
  }
  let stem: string[] | null = null;
  if (wantsStem) {
    if (!sheet.stemImages.length) throw new Error(`Q${q.number} stem has no image on the sheet`);
    stem = sheet.stemImages;
  }
  let options: string[][] | null = null;
  if (wantsOptions) {
    options = LABELS.map((l, i) => {
      if (q.options[i] !== FIGURE_OPTION) throw new Error(`Q${q.number} option ${l} must be "${FIGURE_OPTION}" when the options are figures`);
      const imgs = sheet.options[i] ?? [];
      if (!imgs.length) throw new Error(`Q${q.number} option ${l} has no image on the sheet`);
      return imgs;
    });
  }
  return { stem, options };
}

/** Write one figure file from one or more image objects. */
function writeFigure(out: string, sources: string[]) {
  for (const s of sources) if (!existsSync(s)) throw new Error(`image object missing: ${s}`);
  if (sources.length === 1) copyFileSync(sources[0], out);
  else execFileSync("python", ["-P", join(__dirname, "..", "jee", "compose_figures.py"), out, ...sources], { stdio: "pipe" });
}

async function main() {
  // Imported lazily so the pure helpers above load without config's file reads.
  const { FIGURES, OUT, TRANSCRIPTS, requireShift } = require("./config") as typeof import("./config");
  const { parseTranscript } = require("./lib") as typeof import("./lib");
  const { keepKey, loadKeep, trimStemPng } = require("./stemTrimImage") as typeof import("./stemTrimImage");
  const keep = loadKeep();
  let trimmed = 0;
  // SSC often printed the question sentence inside the stem picture; the row stores it as text.
  const trim = async (number: number, file: string) => {
    const decision = keep[keepKey(shift.id, number)];
    if (typeof decision === "string" || !existsSync(file)) return;
    const t = await trimStemPng(readFileSync(file), decision ?? {});
    if (t) {
      writeFileSync(file, t.png);
      trimmed++;
    }
  };
  const shift = requireShift(process.argv[2]);
  const sheetFile = JSON.parse(readFileSync(join(OUT, shift.id, "questions.json"), "utf8"));
  if (sheetFile.format !== "tcs") throw new Error(`${shift.id} is not a TCS shift; its figures are not built from image objects`);
  const byNumber = new Map<number, SheetQ>(sheetFile.questions.map((q: SheetQ) => [q.number, q]));
  const transcript = parseTranscript(readFileSync(join(TRANSCRIPTS, `${shift.id}.txt`), "utf8"));
  const dir = join(FIGURES, shift.id);
  let n = 0;
  for (const q of transcript) {
    const sheet = byNumber.get(q.number);
    if (!sheet) throw new Error(`Q${q.number} is not on the sheet`);
    const plan = figurePlan(q, sheet);
    if (!plan.stem && !plan.options && !plan.crop) continue;
    mkdirSync(dir, { recursive: true });
    const base = join(dir, `q${String(q.number).padStart(3, "0")}`);
    if (plan.crop) {
      execFileSync("python", ["-P", join(__dirname, "scan_figures.py"), shift.id, String(q.number), plan.crop, base], { stdio: "pipe" });
      await trim(q.number, `${base}.png`);
      n++;
      continue;
    }
    const src = (names: string[]) => names.map((x) => join(sheetFile.imgDir, x));
    if (plan.stem) {
      writeFigure(`${base}.png`, src(plan.stem));
      await trim(q.number, `${base}.png`);
    }
    plan.options?.forEach((imgs, i) => writeFigure(`${base}-${LABELS[i]}.png`, src(imgs)));
    n++;
  }
  console.log(`${shift.id}: ${n} question(s) with figures -> ${dir} (${trimmed} stem picture(s) trimmed of the question sentence)`);
}

if (require.main === module)
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
