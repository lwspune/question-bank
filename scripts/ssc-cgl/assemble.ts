/**
 * Turn one exam day's geometry (extract.py) into questions, one file per shift.
 *
 *   python scripts/ssc-cgl/extract.py <dayId> "<pdf>"
 *   npx tsx scripts/ssc-cgl/assemble.ts <dayId>
 *
 * Writes out/<shiftId>/questions.json: per question its part, the images of its stem
 * and of each option (paths into out/<dayId>/img), and SSC's key. assembleQuestions
 * refuses anything that does not read as one stem + four options + one key colour,
 * so a run that finishes is a run where every question of every shift resolved.
 *
 * The key is written here and read ONLY by build.ts, which compares it with the
 * transcript's own answers. The reading sheets (sheets.py) never show it.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DAYS, OUT, SHIFTS } from "./config";
import { assembleQuestions, type Geometry } from "./lib";

function main() {
  const day = process.argv[2];
  if (!day || !DAYS[day]) throw new Error(`usage: assemble.ts <dayId>. Known: ${Object.keys(DAYS).join(", ")}`);
  const geometry: Geometry = JSON.parse(readFileSync(join(OUT, day, "geometry.json"), "utf8"));
  const questions = assembleQuestions(geometry, {
    missing: DAYS[day].missing,
    onRepair: (m) => console.log(`repaired: ${m}`),
  });
  for (const [s, nums] of Object.entries(DAYS[day].missing ?? {})) {
    console.log(`declared missing from the source, shift ${s}: Q${nums[0]}-Q${nums[nums.length - 1]} (${nums.length})`);
  }

  const shifts = [...new Set(questions.map((q) => q.shift))].sort();
  if (shifts.length !== DAYS[day].shifts) {
    throw new Error(`${day}: DAYS says ${DAYS[day].shifts} shift(s), the PDF has ${shifts.length} (${shifts.join(", ")})`);
  }
  for (const s of shifts) {
    const id = `${day}-s${s}`;
    if (!SHIFTS[id]) throw new Error(`no SHIFTS entry for ${id}`);
    const qs = questions.filter((q) => q.shift === s);
    const dir = join(OUT, id);
    mkdirSync(dir, { recursive: true });
    const imgDir = join(OUT, day, "img");
    writeFileSync(
      join(dir, "questions.json"),
      JSON.stringify(
        {
          shift: id,
          imgDir,
          questions: qs.map((q) => ({ number: q.number, part: q.part, pages: q.pages, stemImages: q.stemImages, options: q.options, key: q.key })),
        },
        null,
        1
      ),
      "utf8"
    );
    const keys = Object.fromEntries(["A", "B", "C", "D"].map((k) => [k, qs.filter((q) => q.key === k).length]));
    const parts = Object.fromEntries(["A", "B", "C", "D"].map((p) => [p, qs.filter((q) => q.part === p).length]));
    console.log(`${id}: ${qs.length} questions, parts ${JSON.stringify(parts)}, key spread ${JSON.stringify(keys)}`);
  }
}

main();
