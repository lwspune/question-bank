/**
 * Write a batch's drafted solutions (SOLUTIONS_BACKFILL_SPEC.md, section 5 step 4).
 *
 *   npx tsx scripts/solutions/apply.ts --batch=pilot              # dry run: verdicts + disputes file
 *   npx tsx scripts/solutions/apply.ts --batch=pilot --sample=10  # also print 10 random solutions to read
 *   npx tsx scripts/solutions/apply.ts --batch=pilot --apply      # back up first: npm run db:backup
 *
 * Reads generated-papers/solutions/<batch>/drafts-*.json
 * ({ id: { solution, solvedAnswer } | { skip } }), re-reads every row from the
 * database, and hands each draft to `judge`. Only a draft whose answer matches
 * the key, whose text passes every check, and whose row is still PUBLIC,
 * unblocked, uncancelled and without a solution is written. Everything else
 * goes to disputes-<batch>.md for the owner, and nothing about it is changed.
 *
 * The key is read from the DATABASE here, not from key.json: the database is
 * the truth at write time. The update repeats the empty-solution filter and
 * selects the row back, because an update that matches no row returns no
 * error: only a returned row counts as written.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { judge, keyOf, type BankRow, type Draft, type Verdict } from "./lib";

const SELECT =
  "id, question_format, visibility, publish_blocked, cancelled_note, solution, numeric_answer, " +
  "image_url, text, context, set_id, exam:exams(name), options(label, text, is_correct)";

type Row = BankRow & { exam: { name: string } | null };

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const batch = process.argv.find((a) => a.startsWith("--batch="))?.slice(8);
  if (!batch) throw new Error("--batch=<name> is required");
  const apply = process.argv.includes("--apply");
  const sample = Number(process.argv.find((a) => a.startsWith("--sample="))?.slice(9) ?? 0);
  const dir = join(process.cwd(), "generated-papers", "solutions", batch);
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const drafts: Record<string, Draft> = {};
  const files = readdirSync(dir).filter((f) => /^drafts-.*\.json$/.test(f));
  if (!files.length) throw new Error(`no drafts-*.json in ${dir}`);
  for (const f of files) {
    for (const [id, d] of Object.entries(JSON.parse(readFileSync(join(dir, f), "utf8")) as Record<string, Draft>)) {
      if (drafts[id]) throw new Error(`${id} is drafted twice (${f})`);
      drafts[id] = d;
    }
  }

  const ids = Object.keys(drafts);
  const rows = new Map<string, Row>();
  for (let i = 0; i < ids.length; i += 200) {
    const { data, error } = await db.from("questions").select(SELECT).in("id", ids.slice(i, i + 200));
    if (error) throw new Error(error.message);
    for (const r of (data ?? []) as unknown as Row[]) rows.set(r.id, r);
  }

  const verdicts = new Map<string, Verdict>();
  for (const id of ids) {
    const row = rows.get(id);
    verdicts.set(id, row ? judge(drafts[id], row) : { kind: "skip", reason: "no such question" });
  }
  const of = (k: Verdict["kind"]) => ids.filter((id) => verdicts.get(id)!.kind === k);

  const exam = (id: string) => rows.get(id)?.exam?.name ?? "?";
  const lines = [`# Disputes and skips: ${batch}`, "", "A dispute is a question, not a verdict: the key may be wrong, or the question defective as printed.", ""];
  lines.push("## Disputed (working reached another answer)", "", "| id | exam | key | got |", "|---|---|---|---|");
  for (const id of of("dispute")) {
    const v = verdicts.get(id) as Extract<Verdict, { kind: "dispute" }>;
    lines.push(`| ${id} | ${exam(id)} | ${v.key} | ${v.got} |`);
  }
  lines.push("", "## Rejected (text checks)", "", "| id | exam | problems |", "|---|---|---|");
  for (const id of of("reject")) {
    lines.push(`| ${id} | ${exam(id)} | ${(verdicts.get(id) as Extract<Verdict, { kind: "reject" }>).problems.join("; ")} |`);
  }
  lines.push("", "## Skipped", "", "| id | exam | why |", "|---|---|---|");
  for (const id of of("skip")) lines.push(`| ${id} | ${exam(id)} | ${(verdicts.get(id) as Extract<Verdict, { kind: "skip" }>).reason} |`);
  lines.push("", "## Disputed working", "");
  for (const id of of("dispute")) lines.push(`### ${id}`, "", rows.get(id)!.text, "", drafts[id].solution ?? "", "");
  writeFileSync(join(dir, `disputes-${batch}.md`), lines.join("\n"));

  const toWrite = of("write");
  console.log(
    `drafts ${ids.length} · to write ${toWrite.length} · disputed ${of("dispute").length} · rejected ${of("reject").length} · skipped ${of("skip").length}`
  );
  const skipWhy = new Map<string, number>();
  for (const id of of("skip")) {
    const r = (verdicts.get(id) as Extract<Verdict, { kind: "skip" }>).reason.replace(/^solver: .*/, "solver skipped");
    skipWhy.set(r, (skipWhy.get(r) ?? 0) + 1);
  }
  for (const [r, n] of skipWhy) console.log(`  skipped, ${r}: ${n}`);
  console.log(`disputes file: ${join(dir, `disputes-${batch}.md`)}`);

  if (sample) {
    const pool = [...toWrite].sort(() => Math.random() - 0.5).slice(0, sample);
    for (const id of pool) {
      const r = rows.get(id)!;
      console.log(`\n=== ${id} · ${exam(id)} · key ${keyOf(r)}\n${r.context ? r.context + "\n" : ""}${r.text}`);
      for (const o of [...r.options].sort((a, b) => a.label.localeCompare(b.label))) console.log(`(${o.label}) ${o.text}`);
      console.log(`--- solution\n${(verdicts.get(id) as Extract<Verdict, { kind: "write" }>).solution}`);
    }
  }
  if (!apply) return console.log("\n[dry run] pass --apply to write.");

  let written = 0;
  const lost: string[] = [];
  for (const id of toWrite) {
    const { data, error } = await db
      .from("questions")
      .update({ solution: (verdicts.get(id) as Extract<Verdict, { kind: "write" }>).solution })
      .eq("id", id)
      .eq("visibility", "PUBLIC")
      .is("publish_blocked", null)
      .is("cancelled_note", null)
      .or("solution.is.null,solution.eq.")
      .select("id");
    if (error) throw new Error(`${id}: ${error.message}`);
    if (data?.length === 1) written++;
    else lost.push(id);
  }
  console.log(`wrote ${written} of ${toWrite.length}`);
  if (lost.length) console.log(`not written (the row changed since the dry run): ${lost.join(", ")}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
