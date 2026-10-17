/**
 * Turn every TCS file's geometry (tcs_extract.py) into questions, one folder per shift.
 *
 *   python -P scripts/ssc-cgl/tcs_extract.py <dayId> "<pdf>"     (each TCS day in DAYS)
 *   npx tsx scripts/ssc-cgl/assemble-tcs.ts --year=2024 [--tier=2]   (--year is the SITTING year)
 *
 * A file with no text layer (the 2022 vector print) is read by vector.ts instead, its date
 * and shift taken from config (DAYS[...].shiftFiles), since its header is glyphs.
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
import { OUT, SHIFTS, layoutOf, tcsFiles } from "./config";
import {
  assembleTcs,
  groupTcsShifts,
  type TcsGeometry,
  type TcsQuestion,
} from "./tcs";
import { assembleVector, type VectorGeometry } from "./vector";

/** No "Q.n" label anywhere in the text layer: the vector print. */
// The vector print has no "Q.n" text, except the OCR layer of a 2023 scan's raster first
// page (the pages carrying scan marks).
const isVector = (g: TcsGeometry & Partial<VectorGeometry>) => {
  const scanPages = new Set((g.marks ?? []).map((m) => m.page));
  return (
    !g.spans.some((s) => /^Q\.\d+/.test(s.text.trim()) && !scanPages.has(s.page)) &&
    (g.frames?.length ?? 0) > 0
  );
};

function main() {
  const year = process.argv
    .find((a) => a.startsWith("--year="))
    ?.slice("--year=".length);
  if (!year) throw new Error("usage: assemble-tcs.ts --year=YYYY [--tier=2]");
  const tier = Number(process.argv.find((a) => a.startsWith("--tier="))?.slice("--tier=".length) ?? 1);
  const files = tcsFiles()
    .filter(({ day }) => day.date.startsWith(year) && day.tier === tier)
    .map(({ dir, day, file, shift, pages }) => {
      const path = join(OUT, dir, "geometry.json");
      if (!existsSync(path))
        throw new Error(
          `${path} not found: run tcs_extract.py ${dir} "${file}"${pages ? ` --pages=${pages}` : ""} first`,
        );
      const g: TcsGeometry & VectorGeometry = JSON.parse(
        readFileSync(path, "utf8"),
      );
      let questions: TcsQuestion[];
      try {
        if (isVector(g)) {
          if (!shift)
            throw new Error(
              `${dir} is the vector print but config gives it no shift`,
            );
          questions = assembleVector(g).map((q) => ({
            ...q,
            sheet: 0,
            date: day.date,
            shift,
            context: null,
            stem: "",
            options: ["", "", "", ""],
            questionId: null,
          }));
        } else
          questions = assembleTcs(g, {
            slots: day.slots,
            layout: layoutOf(day),
            ...(day.headerless ? { headerless: { date: day.date } } : {}),
          });
      } catch (e) {
        throw new Error(`${dir}: ${(e as Error).message}`);
      }
      return { dir, pdf: file, tier: day.tier, questions };
    });
  const tiers = [...new Set(files.map((f) => f.tier))];
  if (tiers.length !== 1)
    throw new Error(`TCS files of more than one tier: ${tiers.join(", ")}`);
  const shifts = groupTcsShifts(tiers[0], files);

  for (const [id, { dir, questions }] of shifts) {
    if (!SHIFTS[id])
      throw new Error(
        `${id} (from ${dir}) has no SHIFTS entry: register its day in config.ts`,
      );
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
        1,
      ),
      "utf8",
    );
    const text = questions
      .map((q) =>
        [
          `Q${q.number}`,
          ...(q.context ? [`[passage] ${q.context}`] : []),
          q.stem,
          ...q.options.map((o, i) => `${i + 1}. ${o}`),
        ].join("\n"),
      )
      .join("\n\n");
    // The vector print has no text layer, so it gets no text aid.
    if (questions.some((q) => q.stem)) writeFileSync(join(out, "sheets", "text.txt"), text + "\n", "utf8");
    const keys = Object.fromEntries(
      ["A", "B", "C", "D"].map((k) => [
        k,
        questions.filter((q) => q.key === k).length,
      ]),
    );
    const figs = questions.filter(
      (q) => q.stemImages.length || q.optionImages.some((x) => x.length),
    ).length;
    console.log(
      `${id}: ${questions.length} questions from ${dir}, ${figs} with images, key spread ${JSON.stringify(keys)}`,
    );
  }
  const missing = Object.keys(SHIFTS).filter(
    (id) =>
      SHIFTS[id].day.startsWith(`t${tiers[0]}-${year}`) && !shifts.has(id),
  );
  if (missing.length)
    console.log(`registered but in no file: ${missing.join(", ")}`);
}

main();
