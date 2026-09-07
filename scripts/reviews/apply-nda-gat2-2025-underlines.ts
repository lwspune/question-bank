/**
 * Restore the lost underline markup on NDA GAT 2025 (II) Q16-Q20.
 *
 *   npx tsx scripts/reviews/apply-nda-gat2-2025-underlines.ts            # dry run
 *   npx tsx scripts/reviews/apply-nda-gat2-2025-underlines.ts --apply
 *
 * All five sit in the paper's SYNONYMS block, whose printed Directions read
 * "a sentence or a phrase is given with a word that is underlined ... Select the
 * option that is nearest in meaning to the underlined word". The bank stems
 * carried no marking at all, so a student was shown a sentence and four options
 * with nothing indicating which word was being asked about.
 *
 * EVERY TARGET WAS READ OFF THE PRINTED PAGE — `C:\tmp\PYQPs\NDA\GAT_Edited\
 * GAT_2025_NDA2.pdf`, sheet page 4 (printed page 5), rendered at 150 dpi. The
 * booklet is a pure scan with no text layer, so this could only be done by eye.
 * The stems and the keys were checked at the same time and are FAITHFUL — the
 * markup is the only thing that was missing, which is why nothing here touches
 * an option or an answer.
 *
 * NO COMMITTED SOURCE OF RECORD EXISTS for this paper: it was ingested from
 * `NDA_GAT2_2025_QuestionBank.xlsx`, which is not tracked in the repo (no .xlsx
 * is). The database IS the record, so unlike the CDS repair there is no source
 * file to mirror into — hence this script, holding the adjudication.
 *
 * IN-PLACE UPDATE. All five are inside the published `nda-2025-sep-gat` mock and
 * carry 22-23 student answers each; the mock stores question IDs, so a
 * delete-and-re-commit would blank them in the runner. The id is preserved and
 * `content_hash` is recomputed, because the stem is the hash preimage and a
 * stale hash would let a re-ingest insert a duplicate.
 *
 * GRADING IS UNAFFECTED — no answer changes, so the existing attempts stay valid
 * and no regrade is owed.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const SOURCE_FILE = "NDA_GAT2_2025_QuestionBank.xlsx";

/** question_number -> the word underlined on the printed page. */
const TARGETS: Record<string, string> = {
  "16": "instil",
  "17": "allegiance",
  "18": "inscrutability",
  "19": "dodgy",
  "20": "inclement",
};

const und = (w: string) => `\\(\\underline{\\text{${w}}}\\)`;

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: rows, error } = await db
    .from("questions")
    .select("id,question_number,text,visibility,options(label,text,is_correct)")
    .eq("source_file", SOURCE_FILE)
    .in("question_number", Object.keys(TARGETS));
  if (error) throw error;
  if (!rows || rows.length !== 5) {
    throw new Error(`expected 5 rows, found ${rows?.length ?? 0} — REFUSING`);
  }

  let planned = 0;
  let done = 0;

  for (const r of rows as any[]) {
    const word = TARGETS[String(r.question_number)];
    const tag = `Q${r.question_number} (${word})`;

    if (r.text.includes("\\underline")) {
      console.log(`  = ${tag} already marked`);
      continue;
    }

    // Must occur EXACTLY once as a whole word — a near-miss would mark the
    // wrong span, which is precisely the defect class being repaired.
    const re = new RegExp(`\\b${word}\\b`, "g");
    const hits = r.text.match(re);
    if (!hits || hits.length !== 1) {
      throw new Error(`${tag}: expected exactly 1 occurrence, found ${hits?.length ?? 0} — REFUSING`);
    }

    const text = r.text.replace(re, und(word));
    const opts = (r.options ?? []).map((o: any) => o.text as string);
    const answer = (r.options ?? []).find((o: any) => o.is_correct)?.label as string | undefined;
    if (!answer) throw new Error(`${tag}: no correct option — REFUSING`);
    if (opts.length !== 4) throw new Error(`${tag}: expected 4 options, found ${opts.length} — REFUSING`);

    const hash = contentHash(text, opts, answer);
    planned++;
    console.log(`  ${APPLY ? "✓" : "·"} ${tag}`);
    console.log(`      ${text.slice(0, 110)}`);

    if (APPLY) {
      const { error: uErr } = await db
        .from("questions")
        .update({ text, content_hash: hash })
        .eq("id", r.id);
      if (uErr) throw uErr;
      done++;
    }
  }

  console.log(`\n${APPLY ? `updated ${done}` : `${planned} would be updated`} of 5`);
  if (!APPLY) console.log("DRY RUN — nothing written. Re-run with --apply.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
