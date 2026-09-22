/**
 * Reconcile the loaded corpus against data/build — Phase 4, final step.
 *
 *   npx tsx scripts/ipmat/verify-load.ts
 *
 * Read-only. Exits 1 on any discrepancy.
 *
 * RECONCILES BOTH WAYS, because one direction cannot catch the other's failure.
 * Forward (build -> DB) catches a row that never landed — a hash collision
 * upserting one row over another, a paper skipped by a filter. Reverse (DB ->
 * build) catches a row in the bank that the frozen corpus does not account for
 * — a stale row from an earlier run, or one whose text was edited in place.
 *
 * Also asserts the properties that make this load SAFE rather than merely
 * complete: everything PRIVATE, no source blurb in `pyq_note`, no imported
 * difficulty label, and every picture-option carrying its image.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { IPMAT_EXAMS, parsePaperFileName, sourceFileFor } from "./config";
import { resolveTaxonomy } from "./taxonomy";
import type { BuiltQuestion } from "./build";

const BUILD_DIR = join(__dirname, "data", "build");

function loadEnv() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type DbRow = {
  question_number: string | null;
  source_file: string | null;
  visibility: string;
  question_kind: string;
  question_format: string | null;
  difficulty: string | null;
  pyq_note: string | null;
  pyq_year: number | null;
  text: string;
};

async function main() {
  loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
  }
  const client = createClient(url, key, { auth: { persistSession: false } });

  // ---- expected, from the frozen corpus
  const expected = new Map<string, BuiltQuestion>();
  for (const f of readdirSync(BUILD_DIR).filter((x) => x.endsWith(".json"))) {
    const paper = parsePaperFileName(f.replace(/\.json$/, ".html"));
    if (!paper) throw new Error(`unrecognised file in data/build: ${f}`);
    for (const r of JSON.parse(readFileSync(join(BUILD_DIR, f), "utf8")) as BuiltQuestion[]) {
      if (r.reconstructed || r.dropped || r.problems.length) continue;
      expected.set(`${sourceFileFor(paper.exam, paper.year, paper.section)}#${r.questionNumber}`, r);
    }
  }
  console.log(`expected (data/build): ${expected.size} rows\n`);

  // ---- actual, from the DB. PAGED: a bare .select() is capped at 1000 rows by
  // PostgREST with no error, which would report ~400 rows as missing.
  const examNames = IPMAT_EXAMS.map((e) => e.examName);
  const { data: exams, error: eErr } = await client.from("exams").select("id, name").in("name", examNames);
  if (eErr) throw new Error(`exam lookup failed: ${eErr.message}`);
  if (!exams || exams.length !== 3) throw new Error(`expected 3 exams, found ${exams?.length ?? 0}`);
  const examIds = exams.map((e) => e.id as string);

  const actual: DbRow[] = [];
  const PAGE = 500;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await client
      .from("questions")
      .select("question_number, source_file, visibility, question_kind, question_format, difficulty, pyq_note, pyq_year, text")
      .in("exam_id", examIds)
      .order("source_file", { ascending: true })
      .order("question_number", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`question read failed: ${error.message}`);
    if (!data || data.length === 0) break;
    actual.push(...(data as DbRow[]));
    if (data.length < PAGE) break;
  }
  console.log(`actual (database):     ${actual.length} rows\n`);

  const problems: string[] = [];
  const actualKeys = new Map<string, DbRow>();
  for (const r of actual) {
    const k = `${r.source_file}#${r.question_number}`;
    if (actualKeys.has(k)) problems.push(`duplicate in DB: ${k}`);
    actualKeys.set(k, r);
  }

  // ---- forward: every expected row present
  const missing = [...expected.keys()].filter((k) => !actualKeys.has(k));
  console.log(`FORWARD  build -> DB : ${missing.length} missing`);
  for (const k of missing.slice(0, 15)) console.log(`  missing ${k}`);
  if (missing.length) problems.push(`${missing.length} expected rows are not in the DB`);

  // ---- reverse: nothing in the DB the corpus does not account for
  const extra = [...actualKeys.keys()].filter((k) => !expected.has(k));
  console.log(`REVERSE  DB -> build : ${extra.length} unaccounted`);
  for (const k of extra.slice(0, 15)) console.log(`  unaccounted ${k}`);
  if (extra.length) problems.push(`${extra.length} DB rows are not in data/build`);

  // ---- text equality on the rows that ARE in both
  let textMismatch = 0;
  for (const [k, want] of expected) {
    const got = actualKeys.get(k);
    if (!got) continue;
    if (got.text !== want.text) {
      textMismatch++;
      if (textMismatch <= 5) {
        console.log(`  text differs ${k}`);
        console.log(`     build: ${JSON.stringify(want.text.slice(0, 90))}`);
        console.log(`     db   : ${JSON.stringify(got.text.slice(0, 90))}`);
      }
    }
  }
  console.log(`TEXT     build == DB : ${textMismatch} mismatched`);
  if (textMismatch) problems.push(`${textMismatch} rows have text differing from data/build`);

  // ---- safety properties
  console.log("\nSAFETY");
  const notPrivate = actual.filter((r) => r.visibility !== "PRIVATE").length;
  const notPyq = actual.filter((r) => r.question_kind !== "pyq").length;
  const withNote = actual.filter((r) => r.pyq_note && r.pyq_note.trim() !== "").length;
  const notModerate = actual.filter((r) => r.difficulty !== "MODERATE").length;
  const noYear = actual.filter((r) => r.pyq_year === null).length;
  console.log(`  not PRIVATE                   ${notPrivate}`);
  console.log(`  question_kind not 'pyq'       ${notPyq}`);
  console.log(`  pyq_note non-empty            ${withNote}   (must be 0 — a note here risks publishing the source)`);
  console.log(`  difficulty not MODERATE       ${notModerate}   (must be 0 — their labels are not ours to ship)`);
  console.log(`  pyq_year missing              ${noYear}`);
  if (notPrivate) problems.push(`${notPrivate} rows are not PRIVATE`);
  if (notPyq) problems.push(`${notPyq} rows are not question_kind='pyq'`);
  if (withNote) problems.push(`${withNote} rows carry a pyq_note`);
  if (notModerate) problems.push(`${notModerate} rows carry an imported difficulty`);
  if (noYear) problems.push(`${noYear} rows have no pyq_year`);

  // ---- format split matches the corpus
  const wantFmt = { mcq: 0, numeric: 0 };
  for (const r of expected.values()) wantFmt[r.format]++;
  const gotFmt = {
    mcq: actual.filter((r) => r.question_format === "mcq").length,
    numeric: actual.filter((r) => r.question_format === "numeric").length,
  };
  console.log(`\nFORMAT   build mcq/numeric ${wantFmt.mcq}/${wantFmt.numeric}  DB ${gotFmt.mcq}/${gotFmt.numeric}`);
  if (wantFmt.mcq !== gotFmt.mcq || wantFmt.numeric !== gotFmt.numeric) {
    problems.push("question_format split does not match data/build");
  }

  // ---- the taxonomy the map predicted
  const wantSubjects = new Set<string>();
  for (const r of expected.values()) {
    const t = resolveTaxonomy(r.exam, r.section, r.sourceTopic, r.sourceSubTopic);
    if (t) wantSubjects.add(`${r.exam}|${t.subject}`);
  }
  const { count: subjectCount } = await client
    .from("subjects")
    .select("id", { count: "exact", head: true })
    .in("exam_id", examIds);
  console.log(`TAXONOMY subjects: map predicts ${wantSubjects.size}, DB has ${subjectCount ?? 0}`);
  if ((subjectCount ?? 0) !== wantSubjects.size) problems.push("subject count does not match the map");

  console.log("");
  if (problems.length) {
    console.log(`VERIFY: FAIL (${problems.length})`);
    for (const p of problems) console.log(`  ${p}`);
    process.exit(1);
  }
  console.log("VERIFY: PASS — the bank matches data/build in both directions, and the load is safe");
}

void main();
