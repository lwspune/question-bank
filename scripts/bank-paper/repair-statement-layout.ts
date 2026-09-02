/**
 * Lay every run-on labelled-statement stem out on separate lines, bank-wide.
 *
 *   npx tsx scripts/bank-paper/repair-statement-layout.ts            # dry run
 *   npx tsx scripts/bank-paper/repair-statement-layout.ts --apply
 *   npx tsx scripts/bank-paper/repair-statement-layout.ts --revert=<snapshot.json>
 *
 * WHY THESE ROWS SURVIVED THE 2026-09-02 SWEEP. That pass repaired 285 stems in
 * the BARE-NUMERAL style ("Consider the following statements: 1. ... 2. ...").
 * It could not touch the LITERAL-WORD style ("Statement I: ... Statement II:")
 * because `layoutStatements` had no colon-delimited style at all — measured, it
 * fixed 0 of 327 such rows, including NDA's 22 which were fully in scope. So
 * this is NOT the exam allow-list that pass used; the allow-list exists to keep
 * bare numerals from matching prose, and a word label cannot occur as prose.
 * The style was added to `scripts/lib/statementLayout.ts` first, and the P1 gate
 * now imports that ONE definition rather than keeping its own copy.
 *
 * WHY A PLAIN UPDATE IS SAFE HERE — measured, not assumed. `contentHash` does
 * `norm(s) = s.trim().replace(/\s+/g, " ")`, and `\s` includes a newline, so
 * inserting one where a space was leaves the normalised string byte-identical
 * and the hash UNCHANGED. This script asserts that per row rather than trusting
 * it. Consequently no `paper_questions` ref, mock snapshot ref, review row,
 * concept tag or bookmark can be orphaned — which matters, because 9 of these
 * rows sit in a teacher's paper and 24 in a published mock.
 *
 * WHY NO `question_reviews` ROWS. This changes no claim, no option and no key;
 * `reviewed_content_hash` would be unchanged, so a row would mark nothing stale
 * and assert nothing about correctness. Migration 0074's own rule is that only
 * an ADJUDICATED flag earns a row — a mechanical whitespace repair does not.
 * The snapshot file is the audit trail.
 *
 * THE ACCEPTANCE CRITERION IS "WHITESPACE-ONLY". Every repaired stem must be
 * character-identical to the original once all whitespace is stripped. That is
 * what makes 307 unattended edits reviewable: no claim can have been altered.
 */
import { writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { layoutStatements } from "../lib/statementLayout";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const REVERT = process.argv.find((a) => a.startsWith("--revert="))?.slice("--revert=".length);

type Row = {
  id: string;
  question_number: string | null;
  source_file: string | null;
  text: string;
  content_hash: string;
};

const strip = (s: string) => s.replace(/\s+/g, "");

async function loadAll(db: SupabaseClient): Promise<Row[]> {
  const rows: Row[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("id, question_number, source_file, text, content_hash")
      .eq("visibility", "PUBLIC")
      .like("text", "%Statement%")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    rows.push(...((data ?? []) as Row[]));
    if (!data || data.length < 1000) break;
  }
  return rows;
}

async function optionTexts(db: SupabaseClient, id: string): Promise<{ opts: string[]; key: string }> {
  const { data, error } = await db
    .from("options")
    .select("label, text, is_correct")
    .eq("question_id", id)
    .order("label");
  if (error) throw new Error(error.message);
  const rows = (data ?? []) as { label: string; text: string; is_correct: boolean }[];
  const correct = rows.filter((o) => o.is_correct);
  return { opts: rows.map((o) => o.text), key: correct.length === 1 ? correct[0]!.label : "" };
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  const db = createClient(url, key, { auth: { persistSession: false } });

  if (REVERT) {
    const snap = JSON.parse(readFileSync(REVERT, "utf8")) as { id: string; before: string }[];
    console.log(`reverting ${snap.length} rows from ${REVERT}`);
    for (const s of snap) {
      const { error } = await db.from("questions").update({ text: s.before }).eq("id", s.id);
      if (error) throw new Error(`${s.id}: ${error.message}`);
    }
    console.log("reverted.");
    return;
  }

  const all = await loadAll(db);
  const planned: { row: Row; next: string }[] = [];
  const skipped: Record<string, number> = {};

  for (const r of all) {
    if (!/Statement[ -]?(II|2)\b/.test(r.text)) continue;
    const res = layoutStatements(r.text);
    if (!res.changed) {
      // Already laid out is the overwhelmingly common case and is not a skip
      // worth reporting; only report a stem the tool DECLINED to touch.
      if (res.skipped) skipped[res.skipped] = (skipped[res.skipped] ?? 0) + 1;
      continue;
    }
    // GUARD 1 — whitespace-only. A changed claim would fail here.
    if (strip(res.text) !== strip(r.text)) {
      throw new Error(`REFUSED ${r.id} (${r.source_file} Q${r.question_number}): edit is NOT whitespace-only`);
    }
    planned.push({ row: r, next: res.text });
  }

  console.log(`scanned ${all.length} rows containing "Statement"`);
  console.log(`to repair: ${planned.length}   declined:`, skipped);

  if (planned.length === 0) {
    console.log("nothing to do (idempotent).");
    return;
  }

  const bySource: Record<string, number> = {};
  for (const p of planned) bySource[p.row.source_file ?? "?"] = (bySource[p.row.source_file ?? "?"] ?? 0) + 1;
  const top = Object.entries(bySource).sort((a, b) => b[1] - a[1]).slice(0, 6);
  console.log("top sources:", top.map(([s, n]) => `${s}=${n}`).join("  "));

  if (!APPLY) {
    const s = planned[0]!;
    console.log(`\nsample — ${s.row.source_file} Q${s.row.question_number}`);
    console.log("BEFORE:", s.row.text.slice(0, 170));
    console.log("AFTER :", s.next.slice(0, 210).replace(/\n/g, "\n        "));
    console.log(`\nDRY RUN — re-run with --apply`);
    return;
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const snapPath = join(process.cwd(), "generated-papers", `statement-layout-snapshot-${stamp}.json`);
  writeFileSync(snapPath, JSON.stringify(planned.map((p) => ({ id: p.row.id, before: p.row.text })), null, 2));
  console.log(`\nsnapshot written: ${snapPath}`);

  let done = 0;
  for (const { row, next } of planned) {
    // GUARD 2 — the hash must not move. Recomputed from the row's own stored
    // fields so a pre-existing inconsistency surfaces rather than being written over.
    const { opts, key: label } = await optionTexts(db, row.id);
    if (label) {
      const before = contentHash(row.text, opts, label);
      const after = contentHash(next, opts, label);
      if (before !== after) throw new Error(`REFUSED ${row.id}: recomputed hash MOVED ${before} -> ${after}`);
    }

    const { error } = await db.from("questions").update({ text: next }).eq("id", row.id);
    if (error) throw new Error(`${row.id}: ${error.message}`);

    // GUARD 3 — read back and confirm the STORED hash is untouched.
    const { data: chk, error: cErr } = await db
      .from("questions").select("text, content_hash").eq("id", row.id).single();
    if (cErr) throw new Error(`${row.id}: ${cErr.message}`);
    if (chk.text !== next) throw new Error(`${row.id}: write did not stick`);
    if (chk.content_hash !== row.content_hash) {
      throw new Error(`${row.id}: stored content_hash MOVED — row identity changed`);
    }

    done += 1;
    if (done % 50 === 0) console.log(`  ${done}/${planned.length}`);
  }
  console.log(`\nrepaired ${done} rows. Revert with --revert=${snapPath}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
