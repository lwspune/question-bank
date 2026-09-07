/**
 * Adjudicated repairs for the underline records that never applied.
 *
 * Every fix below was settled against the PRINTED PAGE (rendered from the
 * source PDF), never by reasoning about which side looked more plausible — and
 * that mattered, because it went BOTH ways: three times the recorded word was
 * wrong, three times the transcribed stem was. See `audit-underlines.ts` for
 * how they were found and why the failure was silent.
 *
 * IN-PLACE UPDATE, NOT commit + resync. Those two insert-new-then-delete-stale,
 * which mints a fresh question id — and all six rows are inside PUBLISHED CDS
 * mocks, whose snapshots store question IDs. A new id there does not error: the
 * runner renders a BLANK question and the grader finds no key and marks every
 * attempt wrong. Two of the rows are also in teacher papers, which `resync`
 * refuses to orphan. So the stem and its `content_hash` are re-stamped on the
 * existing row.
 *
 * The source JSON is patched FIRST and the DB row is then rebuilt through
 * `buildRecords`, so the stored text is byte-identical to what a future
 * re-commit would produce and this repair cannot be silently reverted.
 *
 *   npx tsx scripts/cds/apply-underline-fixes.ts          # dry run
 *   npx tsx scripts/cds/apply-underline-fixes.ts --apply
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";
import { DATA, PAPERS } from "./config";
import { buildRecords, type Section, type TQ, type Underlines } from "./lib";
import { contentHash } from "../../src/lib/upload/hash";

type Fix = {
  paper: string;
  n: number;
  /** What the printed page shows, and where it was read. */
  evidence: string;
} & (
  | { kind: "record"; slot: "single"; from: string; to: string }
  | { kind: "record"; slot: "triple"; part: string; from: string; to: string }
  | { kind: "stem"; from: string; to: string }
  | { kind: "answer"; from: string; to: string; reasoning: string }
);

const FIXES: Fix[] = [
  {
    paper: "2018-1", n: 33, kind: "record", slot: "single",
    from: "criticism", to: "criticisms",
    evidence: "p6 (printed p7): 'Some of the <u>criticisms</u> which they had to put up were very unfair.' The record dropped the plural, so \\bcriticism\\b could not match.",
  },
  {
    paper: "2018-1", n: 35, kind: "record", slot: "single",
    from: "idle", to: "activity",
    evidence: "p6 (printed p7): '...there should have been much <u>activity</u> for the cultivation of the physical sciences in this part of the world.' The record held 'idle', which is OPTION (d), not the target.",
  },
  {
    paper: "2018-1", n: 35, kind: "stem",
    from: "in that part of the world",
    to: "in this part of the world",
    evidence: "p6 (printed p7) prints 'this part of the world'; the transcription drifted to 'that'.",
  },
  {
    paper: "2018-1", n: 35, kind: "answer",
    from: "A", to: "C",
    reasoning:
      "The underlined word is the noun 'activity', so its antonym must also be a noun. 'Indolence' (laziness, habitual inactivity) is the only noun among the options; 'dull', 'dormant' and 'idle' are adjectives and are near-synonyms of one another, which is the standard three-lookalike-distractors pattern. 'Dull' is the opposite of 'bright' or 'lively', not of 'activity'.",
    evidence: "Consequence of the record fix above: the previous answer was derived while the target was believed to be 'idle' (an option), for which NO option is an antonym. The stored reasoning even noted 'indolence is a noun (laziness)' and then set it aside. Confidence was LOW.",
  },
  {
    paper: "2019-2", n: 73, kind: "record", slot: "single",
    from: "discard", to: "discord",
    evidence: "p15 (printed p16): '...a unanimous decision to <u>discord</u> some of the rulings...'. Key (a) Accord is the antonym of discord, and is unchanged.",
  },
  {
    paper: "2020-2", n: 74, kind: "stem",
    from: "Peace and tranquillity are instruments",
    to: "Peace and tranquility are instruments",
    evidence: "p18 (printed p19): 'Peace and <u>tranquility</u> are instruments...' — printed with ONE 'l'. The transcription silently applied the British double-l spelling.",
  },
  {
    paper: "2025-1", n: 27, kind: "stem",
    from: "Seance, Sconce, Scone\n1. Those who practise spiritualism are at times seen to participate in a seance.",
    to: "Séance, Sconce, Scone\n1. Those who practise spiritualism are at times seen to participate in a séance.",
    evidence: "p5 (printed p6): the headword list reads 'Séance, Sconce, Scone' and sentence 1 underlines 'séance' — both accented. Only this one of the three underlines failed; 'sconce' and 'scone' applied.",
  },
  {
    paper: "2025-2", n: 7, kind: "stem",
    from: "He was accused of nimulism",
    to: "He was accused of simulism",
    evidence: "p1 (printed p2): 'He was accused of <u>simulism</u> for having copied from someone else without due acknowledgement.' The stem's leading 'n' is a transcription error for 's'.",
  },
];

/**
 * Rows needing NO source edit, but whose live text is stale because the FIX WAS
 * IN THE CODE. 2023-2 Q4's target is "Oh no!" and both the record and the stem
 * were already correct — `\bOh no!\b` simply could never match, because `\b`
 * after "!" demands a word character. `undPattern` now drops that boundary, so
 * `buildRecords` produces a marked stem where the live row has none.
 *
 * Listed explicitly rather than by sweeping every row for drift: a blanket
 * "re-stamp anything that differs" would quietly rewrite rows changed for
 * reasons nobody adjudicated. `verify-underline-fixes.ts` does the sweep and
 * REPORTS, which is the right split.
 */
const RESTAMP: { paper: string; n: number; why: string }[] = [
  { paper: "2023-2", n: 4, why: "undPattern boundary fix — target 'Oh no!' ends in punctuation" },
];

const APPLY = process.argv.includes("--apply");
const P = (paper: string, kind: string) => join(DATA, `${paper}.${kind}.json`);
const read = <T,>(paper: string, kind: string): T =>
  JSON.parse(readFileSync(P(paper, kind), "utf8")) as T;

/**
 * Rewrite a data file PRESERVING ITS OWN INDENTATION.
 *
 * These files are not written to a house style: `*.questions.json` is indented
 * with ONE space and `*.underlines.json` with two. Re-emitting at a fixed width
 * reformats every line, which turned a 4-line repair into a 12,627-line diff —
 * burying the actual change and making the commit impossible to review.
 */
function write(paper: string, kind: string, value: unknown): void {
  const path = P(paper, kind);
  const raw = readFileSync(path, "utf8");
  // `questions.json` is a top-level ARRAY and `underlines.json` an object, so
  // the probe must accept either opener — anchoring on `{` alone silently fell
  // back to the default and reformatted all 3,142 lines.
  const m = raw.match(/^[[{]\r?\n( +)/);
  const indent = m ? m[1].length : 2;
  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  const body = JSON.stringify(value, null, indent).replace(/\n/g, eol);
  writeFileSync(path, body + (raw.endsWith(eol) ? eol : ""));
}

// ─────────────────────────── phase 1: source of record ───────────────────────
let patched = 0;
let already = 0;
const touchedPapers = new Set<string>();

for (const f of FIXES) {
  const tag = `${f.paper} Q${f.n} [${f.kind}]`;
  if (f.kind === "record") {
    const un = read<Underlines>(f.paper, "underlines");
    const cur =
      f.slot === "single"
        ? un.single?.[String(f.n)]
        : (un.triple?.[String(f.n)] as Record<string, string> | undefined)?.[f.part];
    if (cur === f.to) { already++; console.log(`  = ${tag} already ${JSON.stringify(f.to)}`); continue; }
    if (cur !== f.from) throw new Error(`${tag}: expected ${JSON.stringify(f.from)}, found ${JSON.stringify(cur)} — REFUSING`);
    if (f.slot === "single") un.single![String(f.n)] = f.to;
    else (un.triple![String(f.n)] as Record<string, string>)[f.part] = f.to;
    if (APPLY) write(f.paper, "underlines", un);
    patched++; touchedPapers.add(f.paper);
    console.log(`  ✓ ${tag} ${JSON.stringify(f.from)} -> ${JSON.stringify(f.to)}`);
  } else {
    const qs = read<TQ[]>(f.paper, "questions");
    const q = qs.find((x) => x.number === f.n);
    if (!q) throw new Error(`${tag}: no such question — REFUSING`);
    if (f.kind === "stem") {
      if (q.stem.includes(f.to)) { already++; console.log(`  = ${tag} already applied`); continue; }
      if (!q.stem.includes(f.from)) throw new Error(`${tag}: stem does not contain ${JSON.stringify(f.from)} — REFUSING`);
      q.stem = q.stem.replace(f.from, f.to);
    } else {
      if (q.answer === f.to) { already++; console.log(`  = ${tag} already ${f.to}`); continue; }
      if (q.answer !== f.from) throw new Error(`${tag}: expected answer ${f.from}, found ${q.answer} — REFUSING`);
      q.answer = f.to;
      q.reasoning = f.reasoning;
      q.confidence = "HIGH";
    }
    if (APPLY) write(f.paper, "questions", qs);
    patched++; touchedPapers.add(f.paper);
    console.log(`  ✓ ${tag} patched`);
  }
}
console.log(`\nsource files: ${patched} patched, ${already} already correct`);

// ─────────────────────────── phase 2: the live rows ──────────────────────────
if (!APPLY) {
  console.log("\nDRY RUN — nothing written. Re-run with --apply.");
  process.exit(0);
}

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const affected = [
  ...new Set([
    ...FIXES.map((f) => `${f.paper}:${f.n}`),
    ...RESTAMP.map((r) => `${r.paper}:${r.n}`),
  ]),
];
let updated = 0;

async function main() {
for (const key of affected) {
  const [paper, nStr] = key.split(":");
  const n = Number(nStr);
  const sourceFile = PAPERS[paper].sourceFile;

  const sections = read<Section[]>(paper, "sections");
  const questions = read<TQ[]>(paper, "questions");
  const underlines = read<Underlines>(paper, "underlines");
  const { rows } = buildRecords(sections, questions, underlines);
  const row = rows.find((r) => Number(r.questionNumber) === n);
  if (!row) throw new Error(`${key}: buildRecords produced no row — REFUSING`);

  const opts = [row.optionA!, row.optionB!, row.optionC!, row.optionD!];
  const hash = contentHash(row.question, opts, row.answer!);

  const { data: live, error } = await db
    .from("questions")
    .select("id, text, content_hash")
    .eq("source_file", sourceFile)
    .eq("question_number", String(n));
  if (error) throw error;
  if (!live || live.length !== 1) throw new Error(`${key}: expected exactly 1 live row, found ${live?.length ?? 0} — REFUSING`);
  const id = live[0].id as string;

  if (live[0].text === row.question && live[0].content_hash === hash) {
    console.log(`  = ${key} live row already correct`);
    continue;
  }

  const { error: uErr } = await db
    .from("questions")
    .update({ text: row.question, content_hash: hash })
    .eq("id", id);
  if (uErr) throw uErr;
  console.log(`  ✓ ${key} stem + content_hash re-stamped IN PLACE (${id})`);
  updated++;

  // Key flip: move `is_correct` and rewrite the solution. Done only where an
  // `answer` fix was adjudicated, and the marker-free solution is written
  // deliberately — 93% of CDS rows still leak the internal provenance bracket
  // into student-facing text, and this repair must not add to that.
  const ansFix = FIXES.find((f) => f.paper === paper && f.n === n && f.kind === "answer");
  if (ansFix && ansFix.kind === "answer") {
    const { data: os, error: oErr } = await db.from("options").select("id,label,is_correct").eq("question_id", id);
    if (oErr) throw oErr;
    for (const o of os ?? []) {
      const should = o.label === ansFix.to;
      if (o.is_correct !== should) {
        const { error: e } = await db.from("options").update({ is_correct: should }).eq("id", o.id);
        if (e) throw e;
        console.log(`      option ${o.label}: is_correct ${o.is_correct} -> ${should}`);
      }
    }
    const solution = `Answer: ${ansFix.to}. ${ansFix.reasoning}`;
    const { error: sErr } = await db.from("questions").update({ solution }).eq("id", id);
    if (sErr) throw sErr;
    console.log(`      solution rewritten (marker-free)`);
  }
}

console.log(`\nlive rows updated: ${updated}`);
console.log("Now re-run: npx tsx scripts/cds/audit-underlines.ts  (expect 0)");
}

main().catch((e) => { console.error(e); process.exit(1); });
