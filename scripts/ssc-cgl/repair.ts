/**
 * Correct LIVE SSC CGL rows in place from their transcript: the row keeps its id (mocks,
 * attempts, saves, history) and takes the transcript's text, options and solution, with a
 * content_hash recomputed by the lane's own path (rows.ts), so a re-commit would find it.
 *
 *   npx tsx scripts/ssc-cgl/build.ts <shiftId>                        # rows.json first
 *   npx tsx scripts/ssc-cgl/repair.ts <shiftId> --only=20,21          # dry run: the diff
 *   npx tsx scripts/ssc-cgl/repair.ts <shiftId> --only=20,21 --apply
 *   ... --allow=128      # a listed question may differ by more than escaped dollar signs
 *
 * A field is written only where the bank still holds what the transcript held before the
 * change, which for this repair (2026-10-18) is the same text with every `\$` a bare `$`:
 * a field edited in the bank since is reported and the question is left alone. `--allow`
 * lifts that for named questions, after reading the printed diff. A new content_hash that
 * another row of the exam already holds stops the run.
 */
import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { OUT, requireExamId, requireShift, tierOf } from "./config";
import { parseCommitRows, type CommitRow } from "./rows";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const unescape = (s: string | null | undefined) => (s ?? "").replace(/\\\$/g, "$");
const nums = (flag: string) =>
  (process.argv.find((a) => a.startsWith(`--${flag}=`))?.split("=")[1] ?? "").split(",").filter(Boolean);

async function main() {
  const shift = requireShift(process.argv.slice(2).find((a) => !a.startsWith("--")));
  const apply = process.argv.includes("--apply");
  const only = new Set(nums("only"));
  const allow = new Set(nums("allow"));
  if (!only.size) throw new Error("name the questions: --only=20,21");
  const examId = requireExamId(tierOf(shift.id));

  const file = join(OUT, shift.id, "rows.json");
  if (!existsSync(file)) throw new Error(`${file} not found: run build.ts ${shift.id} first`);
  const { parsed, errs } = parseCommitRows(JSON.parse(readFileSync(file, "utf8")) as CommitRow[]);
  if (errs.length) throw new Error(`rows.json does not validate:\n${errs.join("\n")}`);

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  let changed = 0;
  for (const n of only) {
    const p = parsed.find((r) => String(r.questionNumber) === n);
    if (!p) throw new Error(`Q${n} is not in ${shift.id}'s rows.json`);
    const { data: q, error } = await db
      .from("questions")
      .select("id, org_id, text, context, solution, content_hash, options(id, label, text)")
      .eq("exam_id", examId)
      .eq("source_file", shift.sourceFile)
      .eq("question_number", n)
      .single();
    if (error || !q) throw new Error(`Q${n}: no live row under ${shift.sourceFile} (${error?.message})`);

    const opts = (q.options ?? []) as { id: string; label: string; text: string }[];
    const fields: [string, string | null, string | null][] = [
      ["text", q.text, p.text],
      ["context", q.context, p.context ?? null],
      ["solution", q.solution, p.solution ?? null],
      ...p.options.map((o): [string, string | null, string | null] => [
        `option ${o.label}`,
        opts.find((x) => x.label === o.label)?.text ?? null,
        o.text,
      ]),
    ];
    const diffs = fields.filter(([, was, now]) => (was ?? "") !== (now ?? ""));
    const foreign = diffs.filter(([, was, now]) => (was ?? "") !== unescape(now));
    console.log(`Q${n}  ${q.id}`);
    for (const [name, was, now] of diffs) console.log(`  ${name}:\n    was ${JSON.stringify(was)}\n    now ${JSON.stringify(now)}`);
    if (q.content_hash !== p.contentHash) console.log(`  content_hash ${q.content_hash.slice(0, 12)} -> ${p.contentHash.slice(0, 12)}`);
    if (foreign.length && !allow.has(n)) {
      console.log(`  !! ${foreign.map(([f]) => f).join(", ")} differ by more than escaped dollars: left alone (--allow=${n} after reading)`);
      continue;
    }
    if (!diffs.length && q.content_hash === p.contentHash) {
      console.log("  already current");
      continue;
    }
    const { data: clash } = await db
      .from("questions")
      .select("id")
      .eq("org_id", q.org_id)
      .eq("exam_id", examId)
      .eq("content_hash", p.contentHash)
      .neq("id", q.id);
    if (clash?.length) throw new Error(`Q${n}: new content_hash already held by ${clash[0].id}`);

    changed++;
    if (!apply) continue;
    const { error: qe } = await db
      .from("questions")
      .update({ text: p.text, context: p.context ?? null, solution: p.solution ?? null, content_hash: p.contentHash })
      .eq("id", q.id);
    if (qe) throw new Error(`Q${n}: ${qe.message}`);
    for (const o of p.options) {
      const row = opts.find((x) => x.label === o.label);
      if (!row) throw new Error(`Q${n}: no option ${o.label} in the bank`);
      if (row.text === o.text) continue;
      const { error: oe } = await db.from("options").update({ text: o.text }).eq("id", row.id);
      if (oe) throw new Error(`Q${n} option ${o.label}: ${oe.message}`);
    }
  }
  console.log(`\n${shift.id}: ${changed} question(s) ${apply ? "corrected" : "to correct (dry run, pass --apply)"}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
