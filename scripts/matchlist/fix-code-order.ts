/**
 * Move a stranded Code column-label row ("A  B  C  D") from ABOVE a repaired
 * match-list table to BELOW it.
 *
 *   npx tsx scripts/matchlist/fix-code-order.ts          # dry run
 *   npx tsx scripts/matchlist/fix-code-order.ts --apply
 *
 * WHY THIS EXISTS SEPARATELY. scripts/matchlist/apply.ts reads a dump and
 * refuses any row whose stem moved since it was taken, which is the right guard
 * — but it means a follow-up correction to already-repaired rows cannot go
 * through it. rebuild.ts is fixed so this cannot recur; this repairs the 7 rows
 * written before that fix.
 *
 * Same discipline as the original repair: layout-only, no word may be lost, the
 * result must still parse as a table, and content_hash is re-stamped because it
 * covers the stem.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { parseTableBlocks } from "../../src/components/math/parseTableBlocks";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const CODE_ROW = /^\(?[A-H]\)?(?:\s+\(?[A-H]\)?){2,}\s*$/;
const words = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").split(" ").filter(Boolean);

function moveCodeRow(text: string): string | null {
  const lines = text.split("\n");
  const tableAt = lines.findIndex((l) => /^\|\s*-{3,}\s*\|/.test(l));
  if (tableAt < 1) return null;
  const idx = lines.findIndex((l, i) => i < tableAt && CODE_ROW.test(l.trim()));
  if (idx === -1) return null;

  const row = lines[idx].trim();
  const rest = lines.filter((_, i) => i !== idx);
  // Drop a blank line left behind, then append the code row at the end.
  while (rest.length && rest[rest.length - 1].trim() === "") rest.pop();
  return [...rest, "", row].join("\n").replace(/\n{3,}/g, "\n\n");
}

async function main() {
  const apply = process.argv.includes("--apply");
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // Addressed by id rather than scanned: a LIKE over the stem of ~57k rows is an
  // unindexed seq scan that exceeds the statement timeout, and this is a
  // one-shot correction to a known set (found with the same predicate in SQL,
  // where the timeout is longer). moveCodeRow is still the gate — an id that
  // does not actually have the defect is skipped, not forced.
  const IDS = [
    "2e20c6d3-3cac-4b38-b060-35e29d458ba4",
    "476d257b-eb32-405d-b966-65ae585e53e1",
    "483f8c00-29bc-4229-80d0-0edbfbdb5a8e",
    "71e8408b-ad4f-4456-9f4d-90ec77de0eec",
    "9f05769b-80cd-4f0c-ba46-08e85812e15c",
    "af549231-0143-4635-9bd7-cadb071c88b4",
    "b05c6955-16f4-4526-8355-044960c94526",
  ];
  const { data, error } = await db.from("questions").select("id, text").in("id", IDS);
  if (error) throw new Error(error.message);
  const rows = (data ?? []) as { id: string; text: string }[];

  let n = 0;
  for (const r of rows) {
    const next = moveCodeRow(r.text);
    if (!next) continue;

    if (!parseTableBlocks(next).some((b) => (b as { kind?: string }).kind === "table")) {
      console.log(`REFUSED ${r.id} — no longer parses as a table`);
      continue;
    }
    const before = words(r.text).sort().join(" ");
    const after = words(next).sort().join(" ");
    if (before !== after) { console.log(`REFUSED ${r.id} — word set changed`); continue; }

    n++;
    console.log(`${r.id}\n  ...${r.text.slice(0, 120).replace(/\n/g, "\\n")}\n  -> ...${next.slice(0, 120).replace(/\n/g, "\\n")}`);

    if (apply) {
      const { data: q, error: qe } = await db
        .from("questions").select("content_hash, options(label, text, is_correct)").eq("id", r.id).single();
      if (qe || !q) throw new Error(`load ${r.id}: ${qe?.message}`);
      const opts = (q.options ?? []) as { label: string; text: string; is_correct: boolean }[];
      const correct = opts.filter((o) => o.is_correct);
      if (correct.length !== 1) throw new Error(`${r.id}: ${correct.length} correct options`);
      const { error } = await db
        .from("questions")
        .update({ text: next, content_hash: contentHash(next, opts.map((o) => o.text), correct[0].label) })
        .eq("id", r.id);
      if (error) throw new Error(`update ${r.id}: ${error.message}`);
    }
  }
  console.log(`\n${n} row(s) ${apply ? "fixed" : "would be fixed"}.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
