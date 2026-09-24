/**
 * Apply authored model answers to committed Geography board-paper rows.
 *
 *   npx tsx scripts/mh-hsc-12-geo-pyq/apply-solutions.ts <paperId>          # dry-run
 *   npx tsx scripts/mh-hsc-12-geo-pyq/apply-solutions.ts <paperId> --apply  # write
 *   npx tsx scripts/mh-hsc-12-geo-pyq/apply-solutions.ts --all [--apply]
 *
 * Input: data/<id>.solutions.json — [{ ref, solution }] covering every row of
 * that paper. A board question paper ships NO key and NO answers, so every one
 * of these is AUTHORED, not transcribed; `derived_model` is stamped separately
 * by stamp-provenance.ts and flip-public.ts refuses an unstamped authored row.
 *
 * Editing `solution` ONLY is content_hash-safe — the hash covers stem + options
 * + answer for an MCQ and stem + context for a subjective row, never the
 * solution — so this UPDATEs live rows in place rather than re-committing.
 *
 * MATCHING is on (exam_id, source_file, question_number), which is unique within
 * a paper. A ref that matches NO row is REPORTED, never skipped silently: on
 * this lane the expected cause is a `content_hash` collision, where the board
 * re-asked a question an earlier sitting already put in the bank, so this
 * paper's copy was never inserted. Those rows are answered by the paper that
 * owns the survivor — run `report-collisions.ts` to confirm that is the reason
 * before accepting an unmatched ref. A ref matching more than one row is a bug
 * and aborts.
 *
 * Refuses on any LaTeX-delimiter imbalance before writing anything.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { findLatexImbalance } from "../practice/lib";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { DATA, EXAM_ID, PAPERS, requirePaper } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type SolutionRow = { ref: string; solution: string };

/** Named so `Db` below picks up the CONCRETE client type. `ReturnType<typeof
 *  createClient>` resolves to the no-argument defaults, whose schema parameter is
 *  `never`, and every row property then fails to exist. */
function makeClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}
type Db = ReturnType<typeof makeClient>;


async function applyPaper(client: Db, id: string, apply: boolean) {
  const paper = requirePaper(id);
  const path = join(DATA, `${id}.solutions.json`);
  if (!existsSync(path)) {
    console.log(`\n=== ${id} — no solutions file yet, skipping.`);
    return { matched: 0, unmatched: [] as string[], written: 0 };
  }
  const rows: SolutionRow[] = JSON.parse(readFileSync(path, "utf8"));

  const seen = new Set<string>();
  const bad: string[] = [];
  for (const r of rows) {
    if (!r.ref || !r.solution || !r.solution.trim()) bad.push(`${r.ref}: empty solution`);
    if (seen.has(r.ref)) bad.push(`${r.ref}: duplicate ref`);
    seen.add(r.ref);
    const imb = findLatexImbalance(r.solution ?? "");
    if (imb) bad.push(`${r.ref}: ${imb}`);
  }
  if (bad.length) throw new Error(`${id}: refusing to apply —\n  ${bad.join("\n  ")}`);

  const { data: live, error } = await client
    .from("questions")
    .select("id, question_number, solution")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
  if (error) throw new Error(`load failed: ${error.message}`);

  const byRef = new Map<string, { id: string; solution: string | null }[]>();
  for (const q of live ?? []) {
    const k = q.question_number as string;
    byRef.set(k, [...(byRef.get(k) ?? []), { id: q.id as string, solution: q.solution as string | null }]);
  }

  const unmatched: string[] = [];
  let matched = 0;
  let written = 0;
  for (const r of rows) {
    const hits = byRef.get(r.ref) ?? [];
    if (hits.length > 1) throw new Error(`${id} ${r.ref}: matched ${hits.length} rows — aborting.`);
    if (!hits.length) {
      unmatched.push(r.ref);
      continue;
    }
    matched++;
    const next = normalizeNewlines(r.solution.trim());
    if (hits[0].solution === next) continue;
    if (apply) {
      const { error: uErr } = await client.from("questions").update({ solution: next }).eq("id", hits[0].id);
      if (uErr) throw new Error(`${id} ${r.ref}: update failed: ${uErr.message}`);
    }
    written++;
  }

  const liveCount = (live ?? []).length;
  const stillEmpty = (live ?? []).filter((q) => !q.solution && !rows.some((r) => r.ref === q.question_number)).length;
  console.log(
    `\n=== ${id} (${paper.month} ${paper.year}) — ${rows.length} authored, ${matched} matched of ${liveCount} live rows` +
      `${apply ? `, ${written} written` : `, ${written} would change`}`
  );
  if (unmatched.length) {
    console.log(`  UNMATCHED refs (expected cause: content_hash collision — verify with report-collisions.ts):`);
    console.log(`    ${unmatched.join(", ")}`);
  }
  if (stillEmpty) console.log(`  ⚠ ${stillEmpty} live row(s) have neither a solution nor an authored one.`);
  return { matched, unmatched, written };
}

async function main() {
  const arg = process.argv[2];
  const apply = process.argv.includes("--apply");
  if (!arg) throw new Error("usage: apply-solutions.ts <paperId> | --all  [--apply]");
  const ids = arg === "--all" ? Object.keys(PAPERS) : [arg];
  const client = makeClient();
  let matched = 0;
  let written = 0;
  for (const id of ids) {
    const r = await applyPaper(client, id, apply);
    matched += r.matched;
    written += r.written;
  }
  console.log(`\ntotal: ${matched} matched, ${written} ${apply ? "written" : "would change"}.`);
  if (!apply) console.log("[dry-run] pass --apply to write.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
