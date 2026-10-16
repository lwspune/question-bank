/**
 * Turn every TCS file's geometry (tcs_extract.py) into questions, one folder per shift.
 *
 *   python -P scripts/ssc-cgl/tcs_extract.py <dayId> "<pdf>"     (each TCS day in DAYS)
 *   npx tsx scripts/ssc-cgl/assemble-tcs.ts
 *
 * A hosted 2024 file runs past its own day, so this reads EVERY TCS file and files each sheet
 * under the Exam Date it prints (groupTcsShifts). Per shift it writes:
 * - out/<shiftId>/questions.json: part, key, the sheet's regions and images. Like assemble.ts's
 *   file it holds the KEY, and is read only by build.ts and tcs_sheets.py.
 * - out/<shiftId>/sheets/text.txt: the text layer of each question, numbers and options, NO
 *   key. A transcriber's aid: the text layer loses math set as images and misplaces
 *   superscripts, so the reading sheet stays the source.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { OUT, SHIFTS, tcsFiles } from "./config";
import { assembleTcs, groupTcsShifts, type TcsGeometry } from "./tcs";

function main() {
  const files = tcsFiles().map(({ dir, day }) => {
    const path = join(OUT, dir, "geometry.json");
    if (!existsSync(path)) throw new Error(`${path} not found: run tcs_extract.py ${dir} "${day.file}" first`);
    const g: TcsGeometry = JSON.parse(readFileSync(path, "utf8"));
    return { dir, pdf: day.file, tier: day.tier, questions: assembleTcs(g, { slots: day.slots }) };
  });
  const tiers = [...new Set(files.map((f) => f.tier))];
  if (tiers.length !== 1) throw new Error(`TCS files of more than one tier: ${tiers.join(", ")}`);
  const shifts = groupTcsShifts(tiers[0], files);

  for (const [id, { dir, questions }] of shifts) {
    if (!SHIFTS[id]) throw new Error(`${id} (from ${dir}) has no SHIFTS entry: register its day in config.ts`);
    const out = join(OUT, id);
    mkdirSync(join(out, "sheets"), { recursive: true });
    const pdf = files.find((f) => f.dir === dir)!.pdf;
    writeFileSync(
      join(out, "questions.json"),
      JSON.stringify(
        {
          shift: id,
          format: "tcs",
          pdf,
          imgDir: join(OUT, dir, "img"),
          questions: questions.map((q) => ({
            number: q.number,
            part: q.part,
            key: q.key,
            questionId: q.questionId,
            regions: q.regions,
            stemImages: q.stemImages,
            options: q.optionImages,
          })),
        },
        null,
        1
      ),
      "utf8"
    );
    const text = questions
      .map((q) => [`Q${q.number}`, q.stem, ...q.options.map((o, i) => `${i + 1}. ${o}`)].join("\n"))
      .join("\n\n");
    writeFileSync(join(out, "sheets", "text.txt"), text + "\n", "utf8");
    const keys = Object.fromEntries(["A", "B", "C", "D"].map((k) => [k, questions.filter((q) => q.key === k).length]));
    const figs = questions.filter((q) => q.stemImages.length || q.optionImages.some((x) => x.length)).length;
    console.log(`${id}: ${questions.length} questions from ${dir}, ${figs} with images, key spread ${JSON.stringify(keys)}`);
  }
  const missing = Object.keys(SHIFTS).filter((id) => SHIFTS[id].day.startsWith(`t${tiers[0]}-2024`) && !shifts.has(id));
  if (missing.length) console.log(`registered but in no file: ${missing.join(", ")}`);
}

main();
