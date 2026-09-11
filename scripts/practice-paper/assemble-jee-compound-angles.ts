/**
 * Assemble the JEE "Compound Angles" module exercise into a PaperRec[] records file.
 *
 * Inputs (all committed under data/):
 *   jee-compound-angles-ex26.band-{a,b,c,d,e}.json  transcriptions (stem + options; NO answers)
 *   jee-compound-angles-ex26.blind-{a1,a2,cd,e}.json blind derivations (answer + workings; key never seen)
 *   jee-compound-angles-ex26.printed-key.json                the booklet's PRINTED answer key
 *   jee-compound-angles-ex26.dupsource.json          full bank rows for the questions that already exist
 *
 * It does three things that matter:
 *   1. CROSSTABS the blind derivation against the printed key and REFUSES to emit
 *      any record where they disagree — every disagreement must be adjudicated by
 *      hand and recorded in ADJUDICATED below. A silent "trust the key" here would
 *      throw away the only independent check this ingest has.
 *   2. MIRRORS a duplicate byte-exact from its bank row, so content_hash collides,
 *      commitStaged inserts nothing and the paper links the pre-existing row.
 *   3. Renumbers the four exercises into one printed 1..N sequence for the paper.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { PaperRec } from "./config";

const DATA = join(__dirname, "data");
const read = (f: string) => JSON.parse(readFileSync(join(DATA, f), "utf-8"));

type Band = { ex: string; n: number; stem: string; context?: string; setLabel?: string;
              optA?: string; optB?: string; optC?: string; optD?: string; yearTag?: string; note?: string };
type Blind = { ex?: string; n: number; answer: string | number; workings?: string[]; solution?: string;
               difficulty: PaperRec["difficulty"]; subtopic: string; confidence: string; runnerUp?: string; note?: string };

// ---- adjudications -------------------------------------------------------
// A blind-vs-key disagreement is NOT resolved automatically. Each entry records a
// decision made by hand against the printed page, with its reason. An entry that
// matches nothing is a hard error, so this list cannot rot.
const ADJUDICATED: Record<string, { take: "key" | "blind"; why: string }> = {};

// Duplicates that are MIRRORED byte-exact from an existing bank row.
// key = "<ex>:<n>" in the booklet's own numbering -> the key used in jee-compound-angles-ex26.dupsource.json
const MIRROR: Record<string, string> = {
  "O-I:27": "O-I:27",
  "JEE-MAIN:10": "JM:10", "JEE-MAIN:11": "JM:11", "JEE-MAIN:12": "JM:12", "JEE-MAIN:13": "JM:13",
  "JEE-MAIN:14": "JM:14", "JEE-MAIN:15": "JM:15", "JEE-MAIN:16": "JM:16",
};

// Duplicates that CANNOT be mirrored because the bank twin has a different FORMAT
// (ours is a numeric grid question, the bank's is an MCQ of the same problem). These
// are transcribed as printed and held PRIVATE forever - they back the faithful paper
// without putting a second copy of the problem into the browsable bank.
const HELD_DUP: Record<string, string> = {
  "O-IV:6": "same problem as the bank's AIEEE-2010 MCQ (56/33 = 1.697), printed here as a numerical-grid question, so no content_hash can match",
  "O-IV:9": "the bank's 2023 NAT (value 4) divided by 100, so the derivation is identical and only a trailing scaling differs",
};

// Defects in the PRINTED source, adjudicated against the page. The question is
// PRESERVED exactly as printed (this bank's standing convention) and the defect is named
// in the solution, so a later reader cannot mistake a faithful transcription for a
// transcription error and "repair" it. Neither of these changes an answer.
const SOURCE_DEFECTS: Record<string, string> = {
  "O-I:20":
    "[Source note: the printed option \\(2(3 + 2\\sqrt{3})\\) carries a spurious factor 2 on the surd. " +
    "The value of the expression is exactly \\(6 + 2\\sqrt{3} = 2(3 + \\sqrt{3})\\), so had that option been " +
    "printed without the extra 2 it would have been the intended answer. As printed, the only true " +
    "statement about the value is that it is irrational.]",
  "JEE-MAIN:5":
    "[Source note: two of the printed alternatives are algebraically identical to each other - their " +
    "difference reduces to \\(4\\cos^2\\theta(1 - \\sin^2\\theta - \\cos^2\\theta) = 0\\). Neither of them " +
    "is the answer, so the question is still unambiguous.]",
};

const PYQ_NOTE = (y: number) =>
  `JEE Main ${y} past-year question, as reprinted in Allen's "Compound Angles" module exercise. ` +
  `The booklet prints the year only - the session and shift are not stated in the source.`;

// ---- load ---------------------------------------------------------------
const bands: Band[] = [
  ...read("jee-compound-angles-ex26.band-a.json"), ...read("jee-compound-angles-ex26.band-b.json"),
  ...read("jee-compound-angles-ex26.band-c.json"), ...read("jee-compound-angles-ex26.band-d.json"), ...read("jee-compound-angles-ex26.band-e.json"),
];
const KEY = read("jee-compound-angles-ex26.printed-key.json");
const DUPSRC = read("jee-compound-angles-ex26.dupsource.json");

// Key blind rows by (exercise, n). The exercise MUST come from the file the row was
// read from, never from a fallback on `n`: O-I Q1-Q9 and JEE-MAIN Q1-Q9 share the
// numbers 1..9, so a merged array keyed on `n` alone silently overwrites one set with
// the other and every affected answer is then cross-checked against the wrong key.
const BLIND_FILES: [string, string | null][] = [
  ["jee-compound-angles-ex26.blind-a1.json", "O-I"],       // O-I Q1-Q15
  ["jee-compound-angles-ex26.blind-a2.json", "O-I"],       // O-I Q16-Q30
  ["jee-compound-angles-ex26.blind-cd.json", null],        // carries its own `ex` (O-III and O-IV)
  ["jee-compound-angles-ex26.blind-e.json", "JEE-MAIN"],   // JEE-MAIN Q1-Q9
];
const blindBy = new Map<string, Blind>();
for (const [file, ex] of BLIND_FILES) {
  for (const b of read(file) as Blind[]) {
    const k = `${ex ?? b.ex}:${b.n}`;
    if (blindBy.has(k)) throw new Error(`two blind derivations claim ${k} (${file})`);
    blindBy.set(k, b);
  }
}

// ---- printed order ------------------------------------------------------
const ORDER: [string, number[]][] = [
  ["O-I", Array.from({ length: 30 }, (_, i) => i + 1)],
  ["O-III", [1, 2, 3, 4, 5, 6, 9]],
  ["O-IV", Array.from({ length: 10 }, (_, i) => i + 1)],
  ["JEE-MAIN", Array.from({ length: 16 }, (_, i) => i + 1)],
];

const bandBy = new Map(bands.map((b) => [`${b.ex}:${b.n}`, b]));
const yearOf = (tag: string) => Number(/(\d{4})/.exec(tag)![1]);

const out: PaperRec[] = [];
const crosstab: string[] = [];
const problems: string[] = [];
let n = 0;

for (const [ex, nums] of ORDER) {
  for (const q of nums) {
    n++;
    const id = `${ex}:${q}`;
    const band = bandBy.get(id);
    if (!band) { problems.push(`${id}: no transcription`); continue; }

    // --- mirrored duplicate: take the bank row verbatim ---
    if (MIRROR[id]) {
      const src = DUPSRC[MIRROR[id]];
      if (!src) { problems.push(`${id}: mirror source missing`); continue; }
      const opts: Record<string, string> = {};
      let ans = "";
      for (const o of src.options) { opts[o.label] = o.text; if (o.is_correct) ans = o.label; }
      out.push({
        n, stem: src.text, optA: opts.A, optB: opts.B, optC: opts.C, optD: opts.D,
        answer: ans as PaperRec["answer"], solution: src.solution ?? "",
        difficulty: src.difficulty, subtopic: src.subtopics.name,
        chapter: src.chapters.name, status: "dup",
        reviewNote: `BANK-MIRRORED from ${src.id} (${src.question_kind}${src.pyq_year ? " " + src.pyq_year : ""}). ` +
          `Text, options and answer are copied from that row verbatim so content_hash collides and this ingest ` +
          `inserts nothing - the paper links the existing row. Printed as ${ex} Q${q} in the booklet, whose option ` +
          `ORDER differs from the bank's.`,
      });
      crosstab.push(`${id.padEnd(13)} MIRROR  bank=${ans}  (no derivation needed)`);
      continue;
    }

    // --- everything else needs a blind derivation ---
    const bl = blindBy.get(id);
    if (!bl) { problems.push(`${id}: no blind derivation`); continue; }

    const numeric = ex === "O-IV";
    const printed = numeric ? KEY["O-IV"][String(q)] : KEY[ex][String(q)];
    const derived = bl.answer;
    // A 'numerical grid' key is printed to the precision of the grid (2 dp), while a
    // derivation yields the exact value - 56/33 is printed 1.70, not 1.6969... Comparing
    // at full precision would report three rounding conventions as three disagreements.
    // So agreement means: the derived value rounds to the PRINTED value at the printed
    // number of decimals. The record then stores the PRINTED value, because the booklet
    // is this paper's source of record; the exact closed form is stated in the solution.
    const dp = (v: string | number) => { const s = String(v); const d = s.indexOf("."); return d < 0 ? 0 : s.length - d - 1; };
    const agree = numeric
      ? Number(Number(derived).toFixed(dp(printed))) === Number(printed)
      : String(derived) === String(printed);

    let use: string | number = printed;
    if (!agree) {
      const adj = ADJUDICATED[id];
      if (!adj) {
        problems.push(`${id}: BLIND ${derived} vs KEY ${printed} - unadjudicated disagreement`);
        continue;
      }
      use = adj.take === "key" ? printed : derived;
    }
    crosstab.push(
      `${id.padEnd(13)} ${agree ? "AGREE " : "DIFFER"}  blind=${String(derived).padEnd(6)} key=${String(printed).padEnd(6)} ` +
      `conf=${bl.confidence}${bl.runnerUp ? "  runnerUp=" + bl.runnerUp.slice(0, 60) : ""}`
    );

    const defect = SOURCE_DEFECTS[id];
    const body = (bl.workings?.length ? bl.workings.join("\n") : (bl.solution ?? "")) +
      (defect ? `\n\n${defect}` : "");
    const solution = numeric
      ? `${body}\nAnswer: \\(${use}\\).`
      : `${body}${body.trim().endsWith(`Matches option ${use}.`) ? "" : `\nMatches option ${use}.`}`;

    const rec: PaperRec = {
      n, stem: band.stem, solution,
      difficulty: bl.difficulty, subtopic: bl.subtopic,
      // The spec is in MULTI-CHAPTER mode (two mirrored duplicates live in
      // "Trigonometric Equations"), and in that mode every record must name its own
      // chapter - there is no spec-level fallback. Everything transcribed here is
      // compound-angle identity work.
      chapter: "Trigonometric Identities",
    };
    if (band.context) rec.context = band.context;
    if (band.setLabel) rec.setLabel = `${ex}-${band.setLabel}`;
    if (numeric) { rec.format = "numeric"; rec.numericAnswer = Number(use); }
    else { rec.optA = band.optA; rec.optB = band.optB; rec.optC = band.optC; rec.optD = band.optD; rec.answer = use as PaperRec["answer"]; }
    if (ex === "JEE-MAIN" && band.yearTag) { rec.kind = "pyq"; rec.pyqYear = yearOf(band.yearTag); rec.pyqNote = PYQ_NOTE(yearOf(band.yearTag)); }
    if (HELD_DUP[id]) { rec.status = "dup"; rec.reviewNote = `DUPLICATE, held PRIVATE: ${HELD_DUP[id]}.`; }
    const flags = [band.note, bl.note, bl.confidence !== "HIGH" ? `confidence ${bl.confidence}${bl.runnerUp ? "; runner-up: " + bl.runnerUp : ""}` : ""]
      .filter(Boolean).join(" | ");
    if (flags) rec.reviewNote = rec.reviewNote ? `${rec.reviewNote} || ${flags}` : flags;
    out.push(rec);
  }
}

// A stale entry in any of these maps means its reasoning no longer applies to anything,
// which is how a hand-maintained list rots. Fail rather than ignore it.
const seen = (k: string) => crosstab.some((c) => c.startsWith(k.padEnd(13)));
for (const [label, keys] of [["ADJUDICATED", Object.keys(ADJUDICATED)], ["SOURCE_DEFECTS", Object.keys(SOURCE_DEFECTS)],
                             ["MIRROR", Object.keys(MIRROR)], ["HELD_DUP", Object.keys(HELD_DUP)]] as [string, string[]][]) {
  const stale = keys.filter((k) => !seen(k));
  if (stale.length) problems.push(`stale ${label} entries (match nothing): ${stale.join(", ")}`);
}

console.log(crosstab.join("\n"));
const differ = crosstab.filter((c) => c.includes("DIFFER")).length;
const agreeN = crosstab.filter((c) => c.includes("AGREE")).length;
const mirrorN = crosstab.filter((c) => c.includes("MIRROR")).length;
console.log(`\ncrosstab: ${agreeN} agree, ${differ} differ, ${mirrorN} mirrored | records built: ${out.length}/63`);

if (problems.length) {
  console.error(`\nREFUSING to write - ${problems.length} problem(s):\n  - ${problems.join("\n  - ")}`);
  process.exit(1);
}
writeFileSync(join(DATA, "jee-compound-angles-ex26.records.json"), JSON.stringify(out, null, 1) + "\n", "utf-8");
console.log(`\nwrote jee-compound-angles-ex26.records.json (${out.length} records)`);
