/**
 * Repair linearised match-list stems into GFM pipe tables.
 *
 *   npx tsx scripts/matchlist/apply.ts NDA            # dry run — prints every diff
 *   npx tsx scripts/matchlist/apply.ts NDA --apply
 *
 * THREE GATES, all of which must pass before a row is written. Any failure
 * REFUSES that row and leaves it linearised, per GAT_RULES rule 2 — a wrong
 * column boundary reads as authoritative and is worse than a flat stem.
 *
 *   1. the rebuild itself succeeds (scripts/matchlist/rebuild.ts)
 *   2. the result parses as a table through the REAL parseTableBlocks — the same
 *      helper /browse, /board and the docx exporter run
 *   3. NO WORD IS LOST. The transform is layout-only, so every word in the old
 *      stem must still be in the new one. This is what stops a bad column split
 *      silently eating half an item.
 *
 * `content_hash` covers question + options + answer, so a stem rewrite MUST
 * re-stamp it or the row's dedup identity desyncs and a later re-ingest inserts
 * a second copy. Re-stamped with the real helper, never a local reimplementation.
 *
 * NOTE ON THE SOURCE OF RECORD: most of these rows came from .xlsx uploads that
 * are NOT tracked in this repo, so for them the DB is the only record and there
 * is no resync to revert the fix. Rows whose source_file maps to a tracked
 * scripts/practice-paper records.json are REPORTED at the end — those need the
 * mirror too, or committing that paper again reverts them.
 */
import { join } from "node:path";
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { parseTableBlocks } from "../../src/components/math/parseTableBlocks";
import { contentHash } from "../../src/lib/upload/hash";
import { rebuildMatchList } from "./rebuild";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Dumped = {
  id: string; q: string | null; kind: string; source_file: string | null;
  chapter: string | null; subject: string | null; text: string; context: string | null;
};

const words = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, " ").split(" ").filter(Boolean);

function lostWords(before: string, after: string): string[] {
  const have = new Map<string, number>();
  for (const w of words(after)) have.set(w, (have.get(w) ?? 0) + 1);
  const lost: string[] = [];
  for (const w of words(before)) {
    const n = have.get(w) ?? 0;
    if (n === 0) lost.push(w);
    else have.set(w, n - 1);
  }
  return lost;
}

/** source_file values whose rows also live in a tracked records.json. */
const TRACKED_SOURCES = new Set([
  "NDA_GAT_Practice__APJ_GAT_Mock_5.docx",
  "NDA_GAT_Practice__APJ_GAT_Mock_7.docx",
  "NDA_GAT_Practice__APJ_GAT_Mock_8.docx",
]);

async function main() {
  const exam = process.argv[2] ?? "NDA";
  const apply = process.argv.includes("--apply");
  const rows: Dumped[] = JSON.parse(
    readFileSync(join("scripts/matchlist", `${exam.toLowerCase()}.dump.json`), "utf8")
  );

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  let ok = 0;
  const refused: { id: string; q: string | null; why: string }[] = [];
  const needMirror: Dumped[] = [];

  for (const r of rows) {
    const res = rebuildMatchList(r.text);
    if (!res.ok) { refused.push({ id: r.id, q: r.q, why: res.why }); continue; }

    const parsed = parseTableBlocks(res.text);
    if (!parsed.some((b) => (b as { kind?: string }).kind === "table")) {
      refused.push({ id: r.id, q: r.q, why: "rebuilt text still does not parse as a table" });
      continue;
    }
    const lost = lostWords(r.text, res.text);
    if (lost.length) {
      refused.push({ id: r.id, q: r.q, why: `would LOSE words: ${lost.slice(0, 8).join(" ")}` });
      continue;
    }

    ok++;
    console.log("=".repeat(72));
    console.log(`${r.id} Q${r.q ?? "?"}  ${r.subject ?? ""} / ${r.chapter ?? ""}  [${r.source_file ?? "-"}]`);
    console.log("--- before ---\n" + r.text);
    console.log("--- after ----\n" + res.text);

    if (TRACKED_SOURCES.has(r.source_file ?? "")) needMirror.push(r);

    if (apply) {
      const { data: q, error: qErr } = await db
        .from("questions").select("id, text, content_hash, options(label, text, is_correct)")
        .eq("id", r.id).single();
      if (qErr || !q) throw new Error(`load ${r.id}: ${qErr?.message ?? "not found"}`);
      // Fail closed: refuse if the row moved since the dump.
      if ((q.text as string) !== r.text) throw new Error(`${r.id}: stem changed since dump — refusing`);

      const opts = (q.options ?? []) as { label: string; text: string; is_correct: boolean }[];
      const correct = opts.filter((o) => o.is_correct);
      if (correct.length !== 1) throw new Error(`${r.id}: ${correct.length} correct options — refusing`);
      const nextHash = contentHash(res.text, opts.map((o) => o.text), correct[0].label);

      const { error } = await db
        .from("questions").update({ text: res.text, content_hash: nextHash }).eq("id", r.id);
      if (error) throw new Error(`update ${r.id}: ${error.message}`);
      console.log(`  applied. hash ${(q.content_hash as string).slice(0, 12)}… -> ${nextHash.slice(0, 12)}…`);
    }
  }

  console.log("\n" + "=".repeat(72));
  console.log(`rebuilt: ${ok} / ${rows.length}   refused: ${refused.length}`);
  for (const f of refused) console.log(`  REFUSED ${f.id} Q${f.q ?? "?"} — ${f.why}`);

  if (needMirror.length) {
    console.log(`\n⚠ ${needMirror.length} row(s) ALSO need a source mirror (tracked records.json):`);
    for (const m of needMirror) console.log(`  ${m.id} Q${m.q} [${m.source_file}]`);
  }
  if (!apply) console.log("\n[dry-run] pass --apply to write.");
}

main().catch((e) => { console.error(e); process.exit(1); });
