/**
 * Turn the raster sheet's pixel geometry (raster_extract.py) into its shift's questions.
 *
 *   python -P scripts/ssc-cgl/raster_extract.py <dayId> "<pdf>"
 *   npx tsx scripts/ssc-cgl/assemble-raster.ts <dayId>
 *   python -P scripts/ssc-cgl/raster_sheets.py <shiftId>
 *
 * Writes out/<shiftId>/questions.json: part, KEY, crop regions and option rows. Like every
 * questions.json it holds the key, so it is read only by build.ts and raster_sheets.py.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DAYS, LAYOUTS, OUT, SHIFTS, shiftsOf } from "./config";
import { assembleRaster, type RasterGeometry } from "./raster";

function main() {
  const dayId = process.argv[2];
  const day = DAYS[dayId];
  if (!day || day.format !== "raster") throw new Error(`usage: assemble-raster.ts <dayId>, a day of format "raster" (got "${dayId}")`);
  const shifts = shiftsOf(day);
  if (shifts.length !== 1) throw new Error(`${dayId}: a raster day holds one sitting, config gives ${shifts.length}`);
  const shiftId = `${dayId}-s${shifts[0]}`;
  if (!SHIFTS[shiftId]) throw new Error(`${shiftId} has no SHIFTS entry`);

  const g: RasterGeometry & { pdf: string } = JSON.parse(readFileSync(join(OUT, dayId, "raster.json"), "utf8"));
  const questions = assembleRaster(g, LAYOUTS[day.tier]);
  const out = join(OUT, shiftId);
  mkdirSync(join(out, "sheets"), { recursive: true });
  writeFileSync(join(out, "questions.json"), JSON.stringify({ shift: shiftId, format: "raster", pdf: g.pdf, questions }, null, 1), "utf8");
  const keys = Object.fromEntries(["A", "B", "C", "D"].map((k) => [k, questions.filter((q) => q.key === k).length]));
  const parts = Object.fromEntries(LAYOUTS[day.tier].map((s) => [s.part, questions.filter((q) => q.part === s.part).length]));
  console.log(`${shiftId}: ${questions.length} questions, parts ${JSON.stringify(parts)}, key spread ${JSON.stringify(keys)}`);
}

main();
