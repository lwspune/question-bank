/**
 * Give the 12 NDA I 2026 GAT pair questions real tables (2026-11-19, SUGGESTIONS.md
 * ledger "One NDA GAT sitting lost the GFM separator row"). Their source .xlsx is
 * not in the repo, so the bank is the only copy and the edit is made there alone.
 *
 *   npx tsx --env-file=<.env.local> scripts/reviews/repair-gat-nda1-2026-tables.ts [--apply]
 *
 * `text` is a content_hash input, so the hash is recomputed with the real helper,
 * collision-checked within (org_id, exam_id), and re-stamped IN PLACE: ids, paper
 * membership and attempts are untouched. Each write is guarded on the old hash.
 */
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";
import { pairsToTable } from "../lib/pairTable";

const APPLY = process.argv.includes("--apply");
const SOURCE = "GAT_NDA1_2026_QuestionBank.xlsx";
// Two lists open on an item, so they get a header from their own stem.
const HEADERS: Record<string, [string, string]> = {
  "90": ["Reaction", "Property"],
  "150": ["List-I (Rescue Operations)", "List-II (Countries)"],
};

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data, error } = await db
    .from("questions")
    .select("id, org_id, exam_id, question_number, text, content_hash, options(label, text, is_correct)")
    .eq("source_file", SOURCE)
    .like("text", "%|%|%");
  if (error) throw new Error(error.message);
  const rows = data.filter((q) => !String(q.text).includes("|---"));
  if (rows.length !== 12) throw new Error(`expected 12 rows, found ${rows.length}`);

  let written = 0;
  for (const q of rows) {
    const opts = [...(q.options as { label: string; text: string; is_correct: boolean }[])].sort((a, b) => a.label.localeCompare(b.label));
    const key = opts.filter((o) => o.is_correct).map((o) => o.label);
    if (key.length !== 1) throw new Error(`Q${q.question_number}: ${key.length} keys`);
    if (contentHash(q.text, opts.map((o) => o.text), key[0]) !== q.content_hash) {
      throw new Error(`Q${q.question_number}: stored content_hash does not reproduce`);
    }
    const text = pairsToTable(q.text, HEADERS[q.question_number]);
    const hash = contentHash(text, opts.map((o) => o.text), key[0]);
    const { data: clash } = await db
      .from("questions").select("id").eq("org_id", q.org_id).eq("exam_id", q.exam_id).eq("content_hash", hash).neq("id", q.id);
    if (clash?.length) throw new Error(`Q${q.question_number}: new hash collides with ${clash[0].id}`);
    console.log(`Q${q.question_number}  ${q.content_hash.slice(0, 10)} -> ${hash.slice(0, 10)}`);
    if (!APPLY) continue;
    const { data: w, error: ue } = await db
      .from("questions").update({ text, content_hash: hash }).eq("id", q.id).eq("content_hash", q.content_hash).select("id");
    if (ue) throw new Error(ue.message);
    if (w?.length === 1) written++;
  }
  console.log(`${APPLY ? "APPLIED" : "DRY RUN"}: 12 rows${APPLY ? `, ${written} written` : ""}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
