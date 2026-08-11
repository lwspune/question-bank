/**
 * Stamp `matches_current` onto a blind MCQ derivation by comparing it against
 * the key already committed to the bank.
 *
 *   npx tsx scripts/mh-ssc-10-text/mark-blind-verdict.ts <chapterId>
 *   npx tsx scripts/mh-ssc-10-text/mark-blind-verdict.ts <chapterId> --apply
 *
 * The verifying agent is deliberately NOT allowed to compute this field: it
 * cannot see the committed key, and the moment it could, its derivation would
 * stop being blind. So the agent emits only {id, ref, derived_answer, solution}
 * and the comparison happens here, against the database.
 *
 * Reads  data/<id>.blind.mcq-verify.json   (agent output — no verdict)
 * Writes data/<id>.mcq-verify.json         (same rows + matches_current)
 *
 * apply-solutions.ts consumes the OUTPUT file: it applies each `solution` to its
 * mcq row and shouts about any `matches_current: false`, which it deliberately
 * does NOT auto-fix — re-keying needs an is_correct move plus a content_hash
 * recompute, and that is a human adjudication, not a script's call.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, DATA, requireChapter } from "./config";

type Blind = { id: string; ref: string; derived_answer: string | null; solution?: string };

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const ch = requireChapter(id);
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const inPath = join(DATA, `${id}.blind.mcq-verify.json`);
  const rows: Blind[] = JSON.parse(readFileSync(inPath, "utf8"));

  const { data, error } = await client
    .from("questions")
    .select("id, question_number, options(label, is_correct)")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", ch.sourceFile)
    .eq("question_format", "mcq");
  if (error) throw new Error(`read failed: ${error.message}`);

  const keyById = new Map<string, string | null>();
  for (const q of (data ?? []) as unknown as { id: string; options: { label: string; is_correct: boolean }[] }[]) {
    keyById.set(q.id, q.options.find((o) => o.is_correct)?.label ?? null);
  }

  let agree = 0;
  const disagree: string[] = [];
  const out = rows.map((r) => {
    if (!keyById.has(r.id)) throw new Error(`${r.ref}: id ${r.id} is not a committed MCQ of this chapter`);
    const current = keyById.get(r.id) ?? null;
    const matches = r.derived_answer !== null && r.derived_answer === current;
    if (matches) agree++;
    else disagree.push(`${r.ref}: blind derived ${r.derived_answer ?? "(none)"}, committed key is ${current ?? "(none)"}`);
    return { ...r, current_answer: current, matches_current: matches };
  });

  console.log(`blind vs committed: ${agree}/${rows.length} agree`);
  if (disagree.length) {
    console.log(`\n!! ${disagree.length} DISAGREEMENT(S) — adjudicate against the source before flipping PUBLIC:`);
    for (const d of disagree) console.log(`  ${d}`);
  }

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write the verdict file.");
    return;
  }
  const outPath = join(DATA, `${id}.mcq-verify.json`);
  writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log(`\nwrote ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
