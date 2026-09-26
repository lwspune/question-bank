/**
 * Reveal reagents and conditions hidden over reaction arrows by `\phantom{...}`
 * — `audit:text`'s PHANTOM_ARROW class. See scripts/lib/phantomArrows.ts for the
 * defect, the rewrite (`\xrightarrow[below]{above}`) and its false-positive boundary.
 *
 *   npx tsx scripts/reviews/reveal-phantom-arrows.ts          # dry run
 *   npx tsx scripts/reviews/reveal-phantom-arrows.ts --apply
 *
 * SCOPE COMES FROM THE PROBE — every row where `hasHiddenArrowLabel` fires on the
 * stem, context, solution or an option, all visibilities. The probe is defined as
 * "the repair would change this text", so detector and repair cannot drift.
 *
 * HASHES, following normalise-matrix-delimiters.ts: `content_hash` covers the stem
 * and the option texts, so an edit to either moves the hash with it — but only
 * after proving the stored hash is reproducible from the row as it stands. A row
 * whose hash is ALREADY stale (an earlier repair edited it without rehashing) gets
 * its text fixed and its hash left alone, reported as TEXT-ONLY: the reader sees
 * the reagent either way, and recomputing a hash we can't reproduce would only
 * move the problem. A solution-only change never touches the hash.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { revealArrowLabels, hasHiddenArrowLabel } from "../lib/phantomArrows";
import { contentHash, numericContentHash, subjectiveContentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");

type Opt = { id: string; label: string; text: string; is_correct: boolean };
type Row = {
  id: string;
  source_file: string | null;
  question_number: string | null;
  visibility: string;
  question_format: string | null;
  content_hash: string | null;
  text: string;
  context: string | null;
  solution: string | null;
  options: Opt[] | null;
};

function hashOf(format: string | null, text: string, context: string | null, options: Opt[]): string {
  if (format === "numeric") return numericContentHash(text, context);
  if (format === "subjective") return subjectiveContentHash(text, context);
  const sorted = options.slice().sort((a, b) => a.label.localeCompare(b.label));
  const correct = sorted.find((o) => o.is_correct);
  return contentHash(text, sorted.map((o) => o.text), correct?.label ?? "");
}

const fix = (v: string | null) => (v === null ? null : revealArrowLabels(v));

(async () => {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const flagged: Row[] = [];
  let scanned = 0;
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("questions")
      .select("id, source_file, question_number, visibility, question_format, content_hash, text, context, solution, options(id, label, text, is_correct)")
      .order("id", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`read failed: ${error.message}`);
    const rows = (data ?? []) as Row[];
    if (rows.length === 0) break;
    scanned += rows.length;
    for (const r of rows) {
      const fields = [r.text, r.context, r.solution, ...(r.options ?? []).map((o) => o.text)];
      if (fields.some((f) => typeof f === "string" && hasHiddenArrowLabel(f))) flagged.push(r);
    }
    if (rows.length < PAGE) break;
  }
  console.log(`${APPLY ? "APPLY" : "DRY RUN"} — scanned ${scanned} question(s), ${flagged.length} hide an arrow label\n`);

  if (APPLY && flagged.length > 0) {
    mkdirSync(join(process.cwd(), "generated-papers"), { recursive: true });
    const path = join(process.cwd(), "generated-papers", `phantom-arrows-revert-${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
    writeFileSync(
      path,
      JSON.stringify(flagged.map((r) => ({ id: r.id, content_hash: r.content_hash, text: r.text, context: r.context, solution: r.solution, options: r.options })), null, 2),
      "utf8"
    );
    console.log(`revert snapshot → ${path}\n`);
  }

  let rehashed = 0, textOnly = 0, failed = 0;
  for (const r of flagged) {
    const opts = r.options ?? [];
    const label = `${r.source_file ?? "(none)"} ${r.question_number ?? "(none)"} [${r.visibility}] ${r.id}`;
    const next = { text: revealArrowLabels(r.text), context: fix(r.context), solution: fix(r.solution) };
    const nextOpts = opts.map((o) => ({ ...o, text: revealArrowLabels(o.text) }));
    const changedOpts = nextOpts.filter((o, i) => o.text !== opts[i].text);
    const hashInputsChanged = next.text !== r.text || next.context !== r.context || changedOpts.length > 0;

    const reproducible = r.content_hash === hashOf(r.question_format, r.text, r.context, opts);
    const moveHash = hashInputsChanged && reproducible;
    const patch: Record<string, unknown> = { ...next };
    if (moveHash) patch.content_hash = hashOf(r.question_format, next.text, next.context, nextOpts);

    const what = [
      next.text !== r.text ? "text" : null,
      next.context !== r.context ? "context" : null,
      next.solution !== r.solution ? "solution" : null,
      changedOpts.length ? `${changedOpts.length} option(s)` : null,
    ].filter(Boolean).join(" + ");
    const mode = !hashInputsChanged ? "no hash input" : moveHash ? "hash moves" : "TEXT-ONLY (stored hash already stale)";
    console.log(`  FIX   ${label}\n        ${what} · ${mode}`);
    if (hashInputsChanged && !moveHash) textOnly++;
    if (!APPLY) continue;

    for (const o of changedOpts) {
      const { error } = await db.from("options").update({ text: o.text }).eq("id", o.id);
      if (error) throw new Error(`option update failed for ${o.id}: ${error.message}`);
    }
    const { error: qErr } = await db.from("questions").update(patch).eq("id", r.id);
    if (qErr) {
      console.log(`        !! question update FAILED: ${qErr.message}`);
      failed++;
      continue;
    }
    if (moveHash) rehashed++;
  }
  console.log(`\n${APPLY ? "applied" : "would fix"}: ${flagged.length - failed} · hash moved: ${rehashed} · text-only: ${textOnly} · failed: ${failed}`);

  if (APPLY && flagged.length > 0) {
    // POST-CONDITION — nothing hidden remains on any row we touched.
    const { data, error } = await db
      .from("questions")
      .select("id, text, context, solution, options(text)")
      .in("id", flagged.map((r) => r.id).slice(0, 200));
    if (error) throw new Error(`verify read failed: ${error.message}`);
    const still = (data ?? []).filter((r) =>
      [r.text, r.context, r.solution, ...((r.options as { text: string }[]) ?? []).map((o) => o.text)].some(
        (f) => typeof f === "string" && hasHiddenArrowLabel(f)
      )
    );
    console.log(still.length === 0 ? "verified: no hidden arrow label remains" : `${still.length} row(s) STILL hide a label`);
    if (still.length || failed) process.exitCode = 1;
  }
})();
