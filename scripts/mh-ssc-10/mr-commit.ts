/**
 * Write the Marathi-medium reading of one or more papers onto their English rows
 * (question_translations / option_translations, migration 0118).
 *
 *   npx tsx scripts/mh-ssc-10/mr-commit.ts <paperId>... [--apply]
 *   npx tsx scripts/mh-ssc-10/mr-commit.ts --all [--apply]   # every paper with a .mr.json
 *
 * DRY RUN by default. Refuses a paper whose check (mr-check.ts) has an error or
 * that has no Marathi solutions yet. A row is found by its CONTENT HASH, rebuilt
 * from the English data JSON exactly as commit.ts built it: a question the board
 * repeated across sittings is stored once (per-exam dedup), so ref + source_file
 * would miss it. Each question is written once (marathi.ts planTranslations);
 * the English row is never touched, so hash, key, stats and mocks are unchanged.
 * Idempotent: put_question_translation upserts.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { buildPaperRecords, type PaperQuestion } from "./lib";
import { checkMarathiPaper, mergeSolutions, planTranslations, type MarathiQuestion } from "./marathi";
import {
  EXAM_ID,
  PAPERS,
  marathiJsonPath,
  marathiSolutionsPath,
  paperCatalogs,
  questionsJsonPath,
  requirePaper,
} from "./config";

const args = process.argv.slice(2);
const apply = args.includes("--apply");
const ids = args.includes("--all")
  ? Object.keys(PAPERS).filter((id) => existsSync(marathiJsonPath(id)))
  : args.filter((a) => !a.startsWith("--")).map((id) => requirePaper(id).id);
if (!ids.length) {
  console.error("usage: tsx scripts/mh-ssc-10/mr-commit.ts <paperId>... | --all [--apply]");
  process.exit(1);
}
// PAPERS order decides which print of a repeated question is kept.
const order = Object.keys(PAPERS);
ids.sort((a, b) => order.indexOf(a) - order.indexOf(b));

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
});

type Row = { id: string; content_hash: string; options: { id: string; label: string }[] };

async function rowsByHash(hashes: string[]): Promise<Map<string, Row>> {
  const out = new Map<string, Row>();
  for (let i = 0; i < hashes.length; i += 200) {
    const { data, error } = await client
      .from("questions")
      .select("id, content_hash, options(id, label)")
      .eq("exam_id", EXAM_ID)
      .in("content_hash", hashes.slice(i, i + 200));
    if (error) throw new Error(`read failed: ${error.message}`);
    for (const r of data as Row[]) out.set(r.content_hash, r);
  }
  return out;
}

(async () => {
  const entries: { paperId: string; questionId: string; question: MarathiQuestion }[] = [];
  const optionIds = new Map<string, Map<string, string>>(); // questionId → label → option id
  let refused = 0;

  for (const id of ids) {
    const paper = requirePaper(id);
    const english = JSON.parse(readFileSync(questionsJsonPath(id), "utf8")) as PaperQuestion[];
    if (!existsSync(marathiSolutionsPath(id))) {
      console.log(`${id}: REFUSED, no Marathi solutions (${marathiSolutionsPath(id)})`);
      refused++;
      continue;
    }
    const marathi = mergeSolutions(
      JSON.parse(readFileSync(marathiJsonPath(id), "utf8")),
      JSON.parse(readFileSync(marathiSolutionsPath(id), "utf8")),
    );
    const errors = checkMarathiPaper(english, marathi, { requireSolution: true }).filter((f) => f.level === "error");
    if (errors.length) {
      console.log(`${id}: REFUSED, ${errors.length} check error(s); run mr-check.ts`);
      refused++;
      continue;
    }

    const { rows } = buildPaperRecords(paperCatalogs(paper), english);
    const live = await rowsByHash(rows.map((r) => r.contentHash));
    const mrByRef = new Map(marathi.map((q) => [q.ref, q]));
    let missing = 0;
    english.forEach((q, i) => {
      const row = live.get(rows[i].contentHash);
      if (!row) {
        console.log(`  ${id} ${q.ref}: no live row for its hash`);
        missing++;
        return;
      }
      entries.push({ paperId: id, questionId: row.id, question: mrByRef.get(q.ref)! });
      optionIds.set(row.id, new Map(row.options.map((o) => [o.label, o.id])));
    });
    console.log(`${id}: ${english.length} questions, ${english.length - missing} matched to live rows`);
    if (missing) refused++;
  }
  if (refused) {
    console.log(`\n${refused} paper(s) refused or incomplete: nothing written.`);
    process.exit(1);
  }

  const { writes, conflicts } = planTranslations(entries);
  console.log(`\n${writes.length} question(s) to write (${entries.length - writes.length} repeat(s) of an earlier sitting)`);
  for (const c of conflicts) console.log(`  CONFLICT ${c.ref}: ${c.other}'s print reads differently from ${c.kept}'s (kept ${c.kept})`);

  for (const w of writes) {
    const labels = optionIds.get(w.questionId)!;
    if (w.options.length !== labels.size) throw new Error(`${w.paperId} ${w.ref}: ${w.options.length} Marathi options vs ${labels.size} in the bank`);
  }
  if (!apply) {
    console.log("\n[dry-run] pass --apply to write.");
    return;
  }

  let done = 0;
  const failures: string[] = [];
  for (const w of writes) {
    const labels = optionIds.get(w.questionId)!;
    const { error } = await client.rpc("put_question_translation", {
      p_question_id: w.questionId,
      p_lang: "mr",
      p_text: w.stem,
      p_context: w.context,
      p_solution: w.solution,
      p_options: w.options.map((o) => ({ option_id: labels.get(o.label), text: o.text })),
    });
    if (error) failures.push(`${w.paperId} ${w.ref}: ${error.message}`);
    else done++;
  }
  console.log(`wrote ${done}/${writes.length} Marathi translation(s)`);
  for (const f of failures) console.log(`  FAILED ${f}`);
  if (failures.length) process.exit(1);
})();
