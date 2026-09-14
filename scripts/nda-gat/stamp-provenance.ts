/**
 * Stamp derived-answer provenance onto a committed paper's rows.
 *
 *   npx tsx scripts/nda-gat/stamp-provenance.ts 2026-2
 *   npx tsx scripts/nda-gat/stamp-provenance.ts 2026-2 --apply
 *
 * Sets `derived_model` + `derived_at`. Idempotent: a row already carrying
 * `derived_model` is skipped.
 *
 * WHY IT RUNS BEFORE PUBLISHING. A UPSC question booklet prints no answer key,
 * so every answer here is derived. A published derived answer that does not
 * announce itself reads as an official key — and on the sibling CDS General
 * Knowledge corpus that was caught at the publish gate, one step too late. The
 * rule earned there: for a key-less corpus, provenance belongs to COMMIT, not
 * to publish. `flip-public.ts` therefore REFUSES to publish a row carrying no
 * `derived_model`, which makes this step impossible to forget rather than
 * merely documented.
 *
 * PROVENANCE IS STRUCTURED DATA, NOT PROSE. `derived_model` / `derived_at` are
 * what a query can find and what the publish gate keys on — never a prose
 * match — so re-wording anything cannot silently disarm the gate. Nothing is
 * written to `pyq_note`: that field has one consumer, the /browse source line,
 * and a disclosure there is the wrong moment (the reader has not seen an answer
 * yet) and crowds out the only thing it is for.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { requirePaper } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/**
 * ONE blind pass, THEN cross-checked against TWO INDEPENDENT answer keys — and
 * the string says exactly that, because it is the one field a later reader
 * trusts to tell them how the answer was established.
 *
 * This is a stronger standard than the sibling NDA Mathematics paper, which had
 * one key, and it is stated separately rather than inherited:
 *
 *  - The two keys (Dreamers Eduhub, Centurion Defence Academy) are genuinely
 *    independent, and that is MEASURED, not assumed: they agree with each other
 *    on 135/150 = 90.0%. Two copies of one sheet would agree at or near 100%.
 *  - Neither is official. No UPSC key exists for this sitting and none is
 *    expected, so this is the final evidence standard, not an interim one.
 *  - All 21 rows where the three sources disagreed were adjudicated by hand and
 *    recorded in data/2026-2.adjudication.json with the dissent preserved. Two
 *    of those (Q143, Q144) were settled on maintainer knowledge rather than by
 *    derivation, and say so in their own notes.
 *
 * What it still cannot do is catch an error all three make the same way. Q118 is
 * the live instance: we hold an answer against BOTH keys, and the note explains
 * why. Agreement is not independence when the sources share a failure mode.
 */
export const DERIVED_MODEL =
  "claude-opus-5 (blind derivation, cross-checked against two independent answer keys)";

async function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await db
    .from("questions")
    .select("id, question_number, derived_model")
    .eq("source_file", paper.sourceFile);
  if (error) throw error;
  const rows = data ?? [];
  const need = rows.filter((r) => !r.derived_model);

  console.log(`${paper.id}: ${rows.length} row(s) under ${paper.sourceFile}`);
  console.log(`  already stamped: ${rows.length - need.length}`);
  console.log(`  to stamp:        ${need.length}`);
  console.log(`  derived_model:   ${DERIVED_MODEL}`);

  if (!need.length) {
    console.log("\nnothing to do.");
    return;
  }
  if (!apply) {
    console.log(`\n[dry-run] pass --apply. Nothing written.`);
    return;
  }

  const stampedAt = new Date().toISOString();
  let done = 0;
  for (let i = 0; i < need.length; i += 100) {
    const ids = need.slice(i, i + 100).map((r) => r.id);
    const { error: e, count } = await db
      .from("questions")
      .update({ derived_model: DERIVED_MODEL, derived_at: stampedAt }, { count: "exact" })
      .in("id", ids);
    if (e) throw e;
    done += count ?? 0;
  }
  console.log(`\nstamped ${done} row(s) at ${stampedAt}.`);

  const { count: unstamped } = await db
    .from("questions")
    .select("*", { count: "exact", head: true })
    .eq("source_file", paper.sourceFile)
    .is("derived_model", null);
  console.log(`rows still unstamped: ${unstamped}`);
  if (unstamped) throw new Error("some rows remain unstamped — flip-public will refuse them.");
}

main().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
