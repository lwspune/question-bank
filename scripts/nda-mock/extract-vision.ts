/**
 * Build a VISION-LANE paper's extract from transcribed page JSON.
 *
 *   npx tsx scripts/nda-mock/extract-vision.ts m9
 *
 * Produces the SAME `data/<id>.extract.json` shape the pandoc lane produces, so
 * everything downstream — `dump-blind`, `validate`, `adjudicate`, `commit`,
 * `drift`, `resync`, `verify` — works on Mock 9 unchanged. Only the reading step
 * differs.
 *
 * Inputs:
 *   data/<id>.transcribe.*.json   the vision passes (globbed, merged by number)
 *   the solution PDF's TEXT layer  for answer letters
 *
 * The answer letters come from text, not vision, because they are ordinary
 * characters rather than math: the solution PDF heads each entry `N. (b)`, and
 * 109 of 120 parse cleanly. That matters beyond convenience — a letter read by
 * eye is exactly the kind of thing a transcription slip corrupts silently, and
 * this way the key has a machine-checkable provenance.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { requirePaper, DATA, type Paper } from "./config";
import type { ExtractedQuestion } from "./extract";
import { stripKatexUnsupported, fixStackedOperators } from "./parse";

type Transcribed = {
  number: number;
  stem: string;
  options: string[];
  page?: number;
  notes?: string;
};

const PY = `
import sys, fitz
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
d = fitz.open(sys.argv[1])
print("\\n".join(d[i].get_text() for i in range(d.page_count)))
`;

/**
 * Fold Unicode MATHEMATICAL ITALIC letters back to ASCII.
 *
 * This document typesets several of its answer letters as math rather than text:
 * Q32's key is `(𝑎)` — U+1D44E MATHEMATICAL ITALIC SMALL A, not `a`. Six of the
 * eleven keys that first failed to parse failed for exactly this reason, and the
 * text looks identical on screen, so the gap reads as a missing key rather than a
 * character-class problem.
 */
export function foldMathItalic(text: string): string {
  return text.replace(/[\u{1D400}-\u{1D7FF}]/gu, (ch) => {
    const cp = ch.codePointAt(0)!;
    // Italic small a-z, then italic capital A-Z. Other faces in the block (bold,
    // script, double-struck) are left alone: none has been observed carrying a
    // key here, and folding them blindly could rewrite genuine math.
    if (cp >= 0x1d44e && cp <= 0x1d467) return String.fromCharCode(97 + (cp - 0x1d44e));
    if (cp >= 0x1d434 && cp <= 0x1d44d) return String.fromCharCode(65 + (cp - 0x1d434));
    return ch;
  });
}

/**
 * Answer letters from a solution document's text: `1.  (b)  ...` at line start.
 * Anchored at the start of a line and requiring the letter ALONE in its parens,
 * so an inline `(a)` inside a worked solution cannot be mistaken for a key.
 *
 * The number may be followed by `.` OR `)` — this document mixes both (`14)` and
 * `88)` against `11.`), and accepting only the dot lost those.
 */
export function parseVisionAnswerKey(text: string, max: number): Map<number, string> {
  const out = new Map<number, string>();
  const re = /(?:^|\n)\s*(\d{1,3})\s*[.)]\s*\(\s*([a-dA-D])\s*\)/g;
  let m: RegExpExecArray | null;
  const folded = foldMathItalic(text);
  while ((m = re.exec(folded)) !== null) {
    const n = Number(m[1]);
    // First occurrence wins: a solution that cites an earlier question's number
    // must not overwrite that question's own heading.
    if (n >= 1 && n <= max && !out.has(n)) out.set(n, m[2].toUpperCase());
  }
  return out;
}

export function buildVisionExtract(
  paper: Paper,
  transcribed: Transcribed[],
  keys: Map<number, string>
): { questions: ExtractedQuestion[]; report: string[] } {
  const report: string[] = [];
  const byNumber = new Map<number, Transcribed>();
  const dupes: number[] = [];
  for (const t of transcribed) {
    if (byNumber.has(t.number)) dupes.push(t.number);
    else byNumber.set(t.number, t);
  }
  if (dupes.length) {
    // Two page-range passes overlapping is a real risk (a question straddling a
    // page boundary gets transcribed twice), and the two copies may differ.
    report.push(`!! transcribed TWICE (first kept): ${dupes.join(", ")}`);
  }
  report.push(`transcribed questions: ${byNumber.size}`);
  report.push(`answer letters from the solution text layer: ${keys.size}`);

  // Worked solutions, transcribed by vision from the solution PDF. Optional:
  // this paper committed without any, and the file merely fills them in.
  const workedSolutions = new Map<number, string>();
  const solPath = join(DATA, `${paper.id}.solutions.json`);
  if (existsSync(solPath)) {
    const raw = JSON.parse(readFileSync(solPath, "utf8")) as Record<string, string>;
    for (const [k, v] of Object.entries(raw)) {
      const n = Number(k);
      if (!Number.isInteger(n) || n < 1 || n > paper.questionCount) {
        throw new Error(`${paper.id}.solutions.json: "${k}" is not a question number of this paper`);
      }
      if (typeof v === "string" && v.trim()) workedSolutions.set(n, v.trim());
    }
    report.push(`worked solutions transcribed  : ${workedSolutions.size}/${paper.questionCount}`);
  }

  const clean = (s: string) => fixStackedOperators(stripKatexUnsupported(s));
  const questions: ExtractedQuestion[] = [];
  for (const n of [...byNumber.keys()].sort((a, b) => a - b)) {
    const t = byNumber.get(n)!;
    const defects: string[] = [];
    const errata = paper.errata?.[n];

    let options = t.options.map((text, i) => ({ label: "ABCD"[i], text: clean(text) }));
    if (errata?.optionTexts) {
      options = ["A", "B", "C", "D"].map((label, i) => ({ label, text: clean(errata.optionTexts![i]) }));
    }
    if (errata?.options) {
      for (const [label, text] of Object.entries(errata.options)) {
        const o = options.find((x) => x.label === label);
        if (o) o.text = clean(text);
        else defects.push(`errata targets missing option ${label}`);
      }
    }
    if (options.length !== 4) defects.push(`transcribed ${options.length} option(s), expected 4`);
    if (options.some((o) => !o.text.trim())) {
      defects.push(`blank option(s): ${options.filter((o) => !o.text.trim()).map((o) => o.label).join(",")}`);
    }

    const answer = errata?.answer ?? keys.get(n) ?? null;
    if (!answer) defects.push("no answer from any source");
    if (t.notes) defects.push(`transcriber note: ${t.notes}`);

    questions.push({
      number: n,
      stem: clean(errata?.stem ?? t.stem),
      options,
      answer,
      answerSource: errata?.answer ? "errata" : answer ? "solution-text" : null,
      // Worked solutions come from a SEPARATE vision transcription of the
      // solution PDF (data/<id>.solutions.json), because pandoc reduces this
      // paper's math to positioned glyphs. Absent that file the row still
      // commits — a solution has never been required — so this stays optional
      // rather than becoming a new hard dependency for the vision lane.
      solution: errata?.solution ?? workedSolutions.get(n) ?? null,
      defects,
    });
  }

  const missing: number[] = [];
  for (let n = 1; n <= paper.questionCount; n++) if (!byNumber.has(n)) missing.push(n);
  if (missing.length) report.push(`!! MISSING question numbers: ${missing.join(", ")}`);

  const withDefects = questions.filter((q) => q.defects.length);
  report.push(`questions with defects  : ${withDefects.length}`);
  for (const q of withDefects) report.push(`   Q${q.number}: ${q.defects.join(" | ")}`);
  return { questions, report };
}

function main() {
  const paper = requirePaper(process.argv[2]);
  if (!paper.visionPdfs) throw new Error(`${paper.id} is not a vision-lane paper`);

  const files = readdirSync(DATA).filter((f) => f.startsWith(`${paper.id}.transcribe.`) && f.endsWith(".json"));
  if (!files.length) throw new Error(`no ${paper.id}.transcribe.*.json in ${DATA}`);
  const transcribed = files.flatMap((f) => JSON.parse(readFileSync(join(DATA, f), "utf8")) as Transcribed[]);

  const solText = execFileSync("python", ["-c", PY, paper.visionPdfs.sol], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  const keys = parseVisionAnswerKey(solText, paper.questionCount);

  const { questions, report } = buildVisionExtract(paper, transcribed, keys);
  mkdirSync(DATA, { recursive: true });
  const out = join(DATA, `${paper.id}.extract.json`);
  writeFileSync(out, JSON.stringify(questions, null, 2) + "\n", "utf8");

  console.log(`\n=== ${paper.id} — ${paper.sourceFile} (vision lane) ===`);
  console.log(`merged ${files.length} transcription file(s): ${files.join(", ")}`);
  for (const line of report) console.log(line);
  console.log(`\nwrote ${out} (${questions.length} questions)`);
}

if (require.main === module) main();
