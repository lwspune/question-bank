/**
 * Deterministically backfill questions.plain_text for PYQ rows.
 *   plain_text = latexToPlainText(context + "\n" + text)  — no LLM, regenerable.
 *
 *   npx tsx scripts/grounding/backfill-plain-text.ts                 # dry-run: count + 3 samples
 *   npx tsx scripts/grounding/backfill-plain-text.ts --apply         # write every un-grounded pyq
 *   npx tsx scripts/grounding/backfill-plain-text.ts --apply --limit 30
 *
 * Idempotent: only rows with plain_text IS NULL are touched (needsGrounding).
 * This is the RETRIEVAL-enabling pass — embeddings read plain_text — and runs
 * fully independent of the agent-based solution_json extraction.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { latexToPlainText, needsGrounding } from "./lib";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

const PAGE = 1000;

function plainTextFor(row: { context: string | null; text: string | null }): string {
  const parts = [row.context, row.text].filter((p): p is string => !!p && p.trim().length > 0);
  return latexToPlainText(parts.join("\n"));
}

async function main() {
  loadEnv();
  const apply = process.argv.includes("--apply");
  const limArg = process.argv.indexOf("--limit");
  const limit = limArg !== -1 ? Number(process.argv[limArg + 1]) : Infinity;

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { count } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("question_kind", "pyq")
    .is("plain_text", null);
  console.log(`un-grounded pyq rows: ${count ?? "?"}`);

  if (!apply) {
    const { data } = await client
      .from("questions")
      .select("id, context, text, plain_text")
      .eq("question_kind", "pyq")
      .is("plain_text", null)
      .order("id")
      .range(0, 2);
    for (const row of data ?? []) {
      console.log(`\n[${row.id}]`);
      console.log(`  text : ${(row.text ?? "").slice(0, 120)}`);
      console.log(`  plain: ${plainTextFor(row).slice(0, 120)}`);
    }
    console.log(`\n(dry-run — re-run with --apply${Number.isFinite(limit) ? ` --limit ${limit}` : ""} to write)`);
    return;
  }

  let updated = 0;
  for (;;) {
    if (updated >= limit) break;
    // The WHERE plain_text IS NULL set shrinks as we write, so always take the
    // first page of remaining nulls — no offset bookkeeping needed.
    const { data, error } = await client
      .from("questions")
      .select("id, context, text, plain_text")
      .eq("question_kind", "pyq")
      .is("plain_text", null)
      .order("id")
      .range(0, PAGE - 1);
    if (error) throw error;
    const batch = (data ?? []).filter((r) => needsGrounding(r as { plain_text: string | null }));
    if (batch.length === 0) break;

    for (const row of batch) {
      if (updated >= limit) break;
      const { error: uerr } = await client
        .from("questions")
        .update({ plain_text: plainTextFor(row) })
        .eq("id", row.id);
      if (uerr) throw uerr;
      updated++;
    }
  }
  console.log(`updated ${updated} pyq rows (plain_text).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
