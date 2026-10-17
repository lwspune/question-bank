/**
 * Check one SSC CGL shift's transcript and, when it is whole and clean, write the rows
 * commit.ts reads.
 *
 *   npx tsx scripts/ssc-cgl/build.ts <shiftId> --partial   # check what is there, write nothing
 *   npx tsx scripts/ssc-cgl/build.ts <shiftId>             # -> out/<shiftId>/rows.json
 *   npx tsx scripts/ssc-cgl/build.ts <shiftId> --blind --file=<draft.txt>
 *       a drafting agent's check: catalog, parts and rendering only. It prints nothing
 *       about SSC's key and writes nothing, so a draft stays a blind derivation.
 *
 * Inputs: transcripts/<shiftId>.txt (the source of record), out/<shiftId>/questions.json
 * (assemble.ts: each question's part and SSC's key), catalog.json, figures/<shiftId>/.
 *
 * Refuses to write until every question 1..100 is transcribed and:
 *  - it is filed under a subject of its own part, inside the catalog (lib.checkShift);
 *  - an answer that differs from SSC's key carries a note saying why;
 *  - KaTeX renders every math zone, delimiters balance, no raw unicode math symbol;
 *  - every figure the transcript declares is on disk.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import katex from "katex";
import { parseLatex } from "../../src/components/math/parseLatex";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { renderCorruption } from "../lib/render-lint";
import { CATALOG, DAYS, FIGURES, OUT, TRANSCRIPTS, requireShift, sectionSubjects, tierOf } from "./config";
import { checkShift, parseTranscript, studentSolution, type Label, type Part, type TranscriptQuestion } from "./lib";

const LABELS: Label[] = ["A", "B", "C", "D"];
const RAW_UNICODE = /[×÷→←⇌≥≤≠≈∞√∑∏∫°±·²³¹⁰⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉αβγδεζηθλμνξπρστφχψωΩΔΣΠΘΦ½⅓¼¾∂∇∈∉⊆∪∩]/;

type SheetQ = { number: number; part: Part; key: Label };

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

export function figurePaths(shiftId: string, q: TranscriptQuestion): { stem: string | null; options: string[] | null } {
  const base = join(FIGURES, shiftId, `q${String(q.number).padStart(3, "0")}`);
  const stem = q.figure === "stem" || q.figure === "stem+options" ? `${base}.png` : null;
  const options = q.figure === "options" || q.figure === "stem+options" ? LABELS.map((l) => `${base}-${l}.png`) : null;
  return { stem, options };
}

function main() {
  const shift = requireShift(process.argv[2]);
  const blind = process.argv.includes("--blind");
  const fileArg = process.argv.find((a) => a.startsWith("--file="))?.slice("--file=".length);
  const partial = blind || !!fileArg || process.argv.includes("--partial");
  // In blind mode the key is dropped as it is read, so nothing below can print it.
  const sheet: SheetQ[] = JSON.parse(readFileSync(join(OUT, shift.id, "questions.json"), "utf8")).questions.map(
    (q: SheetQ) => (blind ? { number: q.number, part: q.part, key: "A" } : q)
  );
  const transcript = parseTranscript(readFileSync(fileArg ?? join(TRANSCRIPTS, `${shift.id}.txt`), "utf8"));

  const check = checkShift(transcript, sheet, CATALOG, sectionSubjects(tierOf(shift.id)), { compareKey: !blind });
  const problems = [...check.problems];
  const rows: unknown[] = [];

  for (const q of transcript) {
    const p = (s: string) => problems.push(`Q${q.number} ${s}`);
    if (q.context) problems.push(...textProblems("context", q.context, false).map((s) => `Q${q.number} ${s}`));
    problems.push(...textProblems("stem", q.stem, true).map((s) => `Q${q.number} ${s}`));
    q.options.forEach((o, i) => problems.push(...textProblems(`opt ${LABELS[i]}`, o, false).map((s) => `Q${q.number} ${s}`)));
    problems.push(...textProblems("solution", q.solution, false).map((s) => `Q${q.number} ${s}`));
    if (q.notice) problems.push(...textProblems("notice", q.notice, false).map((s) => `Q${q.number} ${s}`));

    const fig = figurePaths(shift.id, q);
    // A draft declares figures; figures.ts writes the files after review, so only the full build needs them.
    if (!partial) for (const f of [fig.stem, ...(fig.options ?? [])]) if (f && !existsSync(f)) p(`figure file missing: ${f}`);

    rows.push({
      sourceRow: q.number,
      questionNumber: String(q.number),
      subject: check.subjects.get(q.number),
      chapter: q.chapter,
      subtopic: q.subtopic,
      ...(q.context ? { context: normalizeNewlines(q.context) } : {}),
      question: normalizeNewlines(q.stem),
      optionA: q.options[0],
      optionB: q.options[1],
      optionC: q.options[2],
      optionD: q.options[3],
      answer: q.answer,
      difficulty: q.difficulty,
      solution: normalizeNewlines(studentSolution(q)),
      flawed: q.flawed,
      figures: fig,
    });
  }

  const keyName = `SSC's ${DAYS[shift.day].provisionalKey ? "PROVISIONAL " : ""}key`;
  const { agree, of } = check.blindAgreement;
  if (blind) {
    console.log(`${shift.id} (blind check of ${fileArg ?? "the transcript"}): ${transcript.length} block(s), numbers ${transcript.map((q) => q.number).join(",")}`);
    console.log(`problems: ${problems.length}`);
    for (const s of problems) console.log(`  ${s}`);
    process.exit(problems.length ? 1 : 0);
  }
  console.log(`${shift.id}: ${transcript.length}/${sheet.length} transcribed${check.missing.length ? ` (missing ${check.missing.length})` : ""}`);
  console.log(`blind agreement with ${keyName}: ${agree}/${of}`);
  console.log(`key adopted on review (blind answer differed): ${check.adopted.length}`);
  for (const d of check.adopted) console.log(`  ${d}`);
  console.log(`bank answer still differs from the key: ${check.disagreements.length}`);
  for (const d of check.disagreements) console.log(`  ${d}`);
  console.log(`problems: ${problems.length}`);
  for (const s of problems) console.log(`  ${s}`);

  if (partial) {
    console.log("\n[--partial] nothing written.");
    process.exit(problems.length ? 1 : 0);
  }
  if (check.missing.length) throw new Error(`transcript incomplete: missing ${check.missing.join(", ")}`);
  if (problems.length) throw new Error(`${problems.length} problem(s): fix the transcript first`);
  writeFileSync(join(OUT, shift.id, "rows.json"), JSON.stringify(rows, null, 2), "utf8");
  console.log(`\nwrote ${join(OUT, shift.id, "rows.json")}`);
}

if (require.main === module) main();
