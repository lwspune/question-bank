/**
 * Build a PDF-sourced (2026+) MHT-CET shift from its hand-authored transcript.
 *
 *   npx tsx scripts/mhtcet/build-pdf-shift.ts <shiftId>            # check + write
 *   npx tsx scripts/mhtcet/build-pdf-shift.ts <shiftId> --partial  # check what is there, write nothing
 *
 * Inputs: transcripts/<shiftId>.txt (source of record), out/pdf/<shiftId>/meta.json
 * (pdf-extract.py: section order, the PDF key, the text layer), out/taxonomy.json
 * (dump-taxonomy.ts) and figures/<year>/<shiftId>/ (our redrawn figures).
 *
 * Checks, all before anything is written:
 *  - every chapter + subtopic exists in the live taxonomy (no auto-created chapters);
 *  - every word of the PDF text layer is in the transcription, and no prose word is
 *    invented (pdfSource.textLayerFidelity) — the formulas are checked by the key;
 *  - KaTeX renders every math zone; delimiters balance; no raw unicode math;
 *  - each figure the transcript declares exists on disk, and a question the PDF
 *    printed with a figure declares one (or is noted as made text-only);
 *  - our answer differs from the PDF key only where a `note:` explains why.
 *
 * Writes out/<shiftId>.records.json (the shape commit.ts / attach-images.ts read)
 * and shifts/<shiftId>.json (ShiftData), so the rest of the pipeline is unchanged.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import katex from "katex";
import { parseLatex } from "../../src/components/math/parseLatex";
import { renderCorruption } from "../lib/render-lint";
import { PDF_SHIFTS, recordsPath, shiftDataPath, requireShiftId, type ShiftData, type ShiftQuestion } from "./config";
import type { Subject } from "./lib";
import { subjectForNumberInOrder, textLayerFidelity } from "./pdfSource";
import { parseTranscript, type TranscriptQuestion } from "./transcript";

type Meta = { subjectOrder: Subject[]; key: Record<string, "A" | "B" | "C" | "D">; textLayer: Record<string, string>; figures: Record<string, number> };

const LABELS = ["A", "B", "C", "D"] as const;
const RAW_UNICODE = /[×÷→←⇌≥≤≠≈∞√∑∏∫°±·²³¹⁰⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉αβγδεζηθλμνξπρστφχψωΩΔΣΠΘΦ½⅓¼¾∂∇∈∉⊆∪∩Å]/;

function katexErr(text: string): string | null {
  for (const seg of parseLatex(text)) {
    if (seg.type === "text") continue;
    try {
      katex.renderToString(seg.content, { throwOnError: true, strict: false });
    } catch (e) {
      return `${seg.content.slice(0, 50)} :: ${String((e as Error).message).slice(0, 70)}`;
    }
  }
  return null;
}

function textProblems(where: string, val: string, isStem: boolean): string[] {
  const out: string[] = [];
  const err = katexErr(val);
  if (err) out.push(`${where} KaTeX: ${err}`);
  const cnt = (re: RegExp) => (val.match(re) || []).length;
  if (cnt(/\\\(/g) !== cnt(/\\\)/g) || cnt(/\\\[/g) !== cnt(/\\\]/g)) out.push(`${where} unbalanced delimiters`);
  const uni = val.match(new RegExp(RAW_UNICODE, "g"));
  if (uni) out.push(`${where} raw unicode: ${[...new Set(uni)].join("")}`);
  for (const flag of renderCorruption(val, { isStem })) out.push(`${where} render-corruption: ${flag}`);
  return out;
}

function figureRefs(dir: string, n: number, q: TranscriptQuestion): string[] {
  const base = join(dir, `q${String(n).padStart(3, "0")}`);
  const stem = q.figure === "stem" || q.figure === "stem+options" ? [`${base}.png`] : [];
  const opts = q.figure === "options" || q.figure === "stem+options" ? LABELS.map((l) => `${base}-${l}.png`) : [];
  return [...stem, ...opts];
}

function main() {
  const shiftId = requireShiftId(process.argv, 2, "build-pdf-shift.ts <shiftId> [--partial]");
  const partial = process.argv.includes("--partial");
  const shift = PDF_SHIFTS[shiftId];
  if (!shift) throw new Error(`unknown PDF shift ${shiftId} (see PDF_SHIFTS in config.ts)`);

  const here = __dirname;
  const meta: Meta = JSON.parse(readFileSync(join(here, "out", "pdf", shiftId, "meta.json"), "utf8"));
  const taxonomy: Record<string, Record<string, string[]>> = JSON.parse(readFileSync(join(here, "out", "taxonomy.json"), "utf8"));
  const transcript = parseTranscript(readFileSync(join(here, "transcripts", `${shiftId}.txt`), "utf8"));
  const figDir = join(here, "figures", String(shift.pyqYear), shiftId);

  const problems: string[] = [];
  const disagreements: string[] = [];
  const records: unknown[] = [];
  const questions: Record<string, ShiftQuestion> = {};

  for (const q of transcript) {
    const n = q.number;
    const p = (s: string) => problems.push(`Q${n} ${s}`);
    const subject = subjectForNumberInOrder(n, meta.subjectOrder);

    const subs = taxonomy[subject]?.[q.chapter];
    if (!subs) p(`chapter "${q.chapter}" is not a ${subject} chapter`);
    else if (!subs.includes(q.subtopic)) p(`subtopic "${q.subtopic}" is not in ${q.chapter}`);

    // Option-figure labels ("Structure (a)") are ours, not printed text, so they are left out of the word check.
    const optText = q.figure === "options" || q.figure === "stem+options" ? "" : q.options.join(" ");
    const fid = textLayerFidelity(`${q.stem} ${optText}`, meta.textLayer[String(n)] ?? "");
    if (fid.missing.length) p(`missing words from the PDF: ${fid.missing.join(", ")}`);
    if (fid.extra.length) p(`prose words not in the PDF: ${fid.extra.join(", ")}`);

    problems.push(...textProblems("stem", q.stem, true).map((s) => `Q${n} ${s}`));
    q.options.forEach((o, i) => problems.push(...textProblems(`opt ${LABELS[i]}`, o, false).map((s) => `Q${n} ${s}`)));
    problems.push(...textProblems("solution", q.solution, false).map((s) => `Q${n} ${s}`));

    const refs = figureRefs(figDir, n, q);
    for (const r of refs) if (!existsSync(r)) p(`figure file missing: ${r}`);
    const printed = meta.figures[String(n)] ?? 0;
    if (printed > 0 && q.figure === "none" && !q.note) p(`the PDF prints ${printed} figure(s) but the transcript declares none (add figure: or a note: saying it is now text)`);

    const ak = meta.key[String(n)];
    const agrees = ak === q.answer;
    if (!agrees) {
      disagreements.push(`Q${n} ours ${q.answer} vs PDF ${ak}${q.note ? ` :: ${q.note}` : ""}`);
      if (!q.note) p(`answer ${q.answer} differs from the PDF key ${ak} with no note: explaining why`);
    }

    records.push({
      questionNumber: n,
      subject,
      status: "ok",
      stem: q.stem,
      options: q.options.map((text, i) => ({ label: LABELS[i], text, isCorrect: LABELS[i] === q.answer })),
      akAnswer: ak,
      akSolution: null,
      imageRefs: refs,
      hasStemImage: q.figure === "stem" || q.figure === "stem+options",
      contentHash: null,
    });
    questions[String(n)] = {
      chapter: q.chapter,
      subtopic: q.subtopic,
      difficulty: q.difficulty,
      answer: q.answer,
      solution: q.solution,
      akAnswer: ak,
      agreesWithAk: agrees,
      ...(q.note ? { note: q.note } : {}),
      ...(q.figure === "options" || q.figure === "stem+options" ? { optionFigures: true } : {}),
      ...(q.flawed ? { flawed: true } : {}),
    };
  }

  const nums = transcript.map((q) => q.number);
  const missing = [];
  for (let i = 1; i <= 150; i++) if (!nums.includes(i)) missing.push(i);

  console.log(`${shiftId}: ${transcript.length}/150 transcribed${missing.length ? ` (missing ${missing.length})` : ""}`);
  console.log(`disagreements with the PDF key: ${disagreements.length}`);
  for (const d of disagreements) console.log(`  ${d}`);
  console.log(`problems: ${problems.length}`);
  for (const s of problems) console.log(`  ${s}`);

  if (partial) {
    console.log("\n[--partial] nothing written.");
    process.exit(problems.length ? 1 : 0);
  }
  if (missing.length) throw new Error(`transcript incomplete: missing ${missing.join(", ")}`);
  if (problems.length) throw new Error(`${problems.length} problems — fix the transcript first`);

  writeFileSync(recordsPath(shiftId), JSON.stringify(records, null, 2), "utf8");
  const data: ShiftData = { sourceFile: shift.sourceFile, pyqYear: shift.pyqYear, pyqMonth: shift.pyqMonth, pyqNote: shift.pyqNote, questions };
  writeFileSync(shiftDataPath(shiftId), JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(`\nwrote ${recordsPath(shiftId)}\nwrote ${shiftDataPath(shiftId)}`);
}

main();
