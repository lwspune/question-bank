/**
 * Turn one NTPC shift's geometry (tcs_extract.py) into its questions.
 *
 *   python -P scripts/ssc-cgl/tcs_extract.py <shiftId> "<pdf>" --out-root=scripts/rrb-ntpc/out
 *   npx tsx scripts/rrb-ntpc/assemble.ts <shiftId>
 *
 * Writes, like the SSC CGL lane's assemble-tcs.ts (so tcs_sheets.py reads it unchanged):
 * - out/<shiftId>/questions.json: each question's key, regions and images. It holds the KEY:
 *   only build.ts and tcs_sheets.py read it, never a drafting agent;
 * - out/<shiftId>/sheets/text.txt: the text layer of each question, NO key. A transcriber's aid
 *   (it loses maths set as pictures); the reading sheet stays the source.
 *
 * Refuses a sheet whose printed Test Date or slot is not the shift it is filed under: one file
 * per shift, so a mismatch is a wrong file, never something to file elsewhere.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { TcsGeometry } from "../ssc-cgl/tcs";
import { OUT, requireShift } from "./config";
import { assembleNtpc } from "./sheet";

function main() {
  const shift = requireShift(process.argv[2]);
  const dir = join(OUT, shift.id);
  const g: TcsGeometry = JSON.parse(readFileSync(join(dir, "geometry.json"), "utf8"));
  const questions = assembleNtpc(g);

  const printed = [...new Set(questions.map((q) => `${q.date} s${q.shift}`))];
  const want = `${shift.date} s${shift.shift}`;
  if (printed.length !== 1 || printed[0] !== want) throw new Error(`${shift.id}: the file prints ${printed.join(", ")}, expected ${want}`);
  if (new Set(questions.map((q) => q.sheet)).size !== 1) throw new Error(`${shift.id}: more than one candidate's sheet in the file`);

  mkdirSync(join(dir, "sheets"), { recursive: true });
  writeFileSync(
    join(dir, "questions.json"),
    JSON.stringify(
      {
        shift: shift.id,
        format: "tcs",
        pdf: shift.file,
        imgDir: join(dir, "img"),
        questions: questions.map((q) => ({ number: q.number, part: q.part, key: q.key, questionId: q.questionId, regions: q.regions, stemImages: q.stemImages, options: q.optionImages })),
      },
      null,
      1
    ),
    "utf8"
  );
  const text = questions.map((q) => [`Q${q.number}`, ...(q.context ? [`[passage] ${q.context}`] : []), q.stem, ...q.options.map((o, i) => `${"ABCD"[i]}. ${o}`)].join("\n")).join("\n\n");
  writeFileSync(join(dir, "sheets", "text.txt"), text + "\n", "utf8");

  const keys = Object.fromEntries(["A", "B", "C", "D"].map((k) => [k, questions.filter((q) => q.key === k).length]));
  const figs = questions.filter((q) => q.stemImages.length || q.optionImages.some((x) => x.length)).map((q) => q.number);
  console.log(`${shift.id}: ${questions.length} questions, key spread ${JSON.stringify(keys)}, pictures on Q${figs.join(", Q") || " none"}`);
}

main();
