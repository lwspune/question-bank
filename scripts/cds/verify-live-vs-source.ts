/**
 * Standing probe: every live CDS row must match what its source JSON builds.
 *
 * The committed `data/<paper>.{sections,questions,underlines}.json` are this
 * pipeline's SOURCE OF RECORD, but nothing ever checked that the live rows still
 * agree with them. Two ways they drift, both silent:
 *
 *   1. a fix applied to the DATABASE ONLY, which the next re-commit reverts;
 *   2. a fix applied to the SOURCE ONLY, which never reaches a student.
 *
 * Reports, never repairs — a difference could be legitimate (a later
 * adjudication) or a defect, and only a human can say which. Exits 0.
 *
 *   npx tsx scripts/cds/verify-live-vs-source.ts [paperId]
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";
import { DATA, PAPERS } from "./config";
import { buildRecords, type Section, type TQ, type Underlines } from "./lib";
import { contentHash } from "../../src/lib/upload/hash";

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const only = process.argv[2];
const norm = (s: string) => s.trim().replace(/\s+/g, " ");

type Diff = { paper: string; n: number; field: string; live: string; built: string };

async function main() {
  const diffs: Diff[] = [];
  let checked = 0;
  let missing = 0;
  let solutionDiffs = 0;

  for (const id of Object.keys(PAPERS)) {
    if (only && id !== only) continue;
    const f = (k: string) => join(DATA, `${id}.${k}.json`);
    if (!existsSync(f("questions")) || !existsSync(f("sections"))) continue;

    const sections = JSON.parse(readFileSync(f("sections"), "utf8")) as Section[];
    const questions = JSON.parse(readFileSync(f("questions"), "utf8")) as TQ[];
    const underlines = existsSync(f("underlines"))
      ? (JSON.parse(readFileSync(f("underlines"), "utf8")) as Underlines)
      : {};
    const { rows } = buildRecords(sections, questions, underlines);

    const { data: live, error } = await db
      .from("questions")
      .select("id,question_number,text,content_hash,solution,options(label,text,is_correct)")
      .eq("source_file", PAPERS[id].sourceFile);
    if (error) throw error;
    const byNum = new Map((live ?? []).map((r: any) => [String(r.question_number), r]));

    for (const row of rows) {
      const lr: any = byNum.get(String(row.questionNumber));
      if (!lr) { missing++; continue; }
      checked++;

      if (norm(lr.text) !== norm(row.question)) {
        diffs.push({ paper: id, n: Number(row.questionNumber), field: "stem", live: lr.text, built: row.question });
      }

      const opts = [row.optionA!, row.optionB!, row.optionC!, row.optionD!];
      const hash = contentHash(row.question, opts, row.answer!);
      if (lr.content_hash !== hash) {
        diffs.push({ paper: id, n: Number(row.questionNumber), field: "content_hash", live: lr.content_hash, built: hash });
      }

      const liveAns = (lr.options ?? []).find((o: any) => o.is_correct)?.label ?? "(none)";
      if (liveAns !== row.answer) {
        diffs.push({ paper: id, n: Number(row.questionNumber), field: "answer", live: liveAns, built: row.answer! });
      }

      // SOLUTION IS COUNTED, NOT TREATED AS A DIFFERENCE.
      //
      // Divergence here is often legitimate: a solution rewritten by hand after
      // an adjudication (fix-keys, apply-underline-fixes) is BETTER than what
      // buildRecords regenerates, and re-committing must not clobber it. What
      // this count is really for is the opposite direction — if it suddenly
      // covers the whole corpus, the generator and the live rows have drifted
      // wholesale, which is what the "[LLM-derived ...]" marker used to cause.
      if (norm(lr.solution ?? "") !== norm(row.solution ?? "")) solutionDiffs++;
    }
  }

  console.log(`rows compared: ${checked}   (source rows with no live match: ${missing})`);
  console.log(`differences: ${diffs.length}`);
  console.log(
    `solution text differing from the generator: ${solutionDiffs} ` +
      `(informational — hand-rewritten solutions legitimately differ)\n`
  );

  const byField = new Map<string, number>();
  for (const d of diffs) byField.set(d.field, (byField.get(d.field) ?? 0) + 1);
  for (const [k, v] of byField) console.log(`  ${k}: ${v}`);
  console.log();

  for (const d of diffs.slice(0, 40)) {
    console.log(`  ${d.paper} Q${d.n}  [${d.field}]`);
    console.log(`     live  : ${d.live.slice(0, 110)}`);
    console.log(`     built : ${d.built.slice(0, 110)}`);
    console.log();
  }
  if (diffs.length > 40) console.log(`  ... and ${diffs.length - 40} more`);
}

main().catch((e) => { console.error(e); process.exit(1); });
