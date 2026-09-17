/**
 * Normalise a question that draws its matrices in TWO different brackets —
 * round `pmatrix` becomes square `bmatrix`, the house style (882 question rows
 * against 191).
 *
 *   npx tsx scripts/reviews/normalise-matrix-delimiters.ts          # dry run
 *   npx tsx scripts/reviews/normalise-matrix-delimiters.ts --apply
 *
 * SCOPE COMES FROM THE PROBE, NOT FROM A HARD-CODED LIST — the rows are exactly
 * `audit:text`'s MIXED_MATRIX_DELIM class, so the repair and the detector cannot
 * drift apart. A question that is UNIFORMLY round is deliberately out of scope:
 * nobody can see a mismatch that isn't there, and rewriting one would cost the
 * hash consequences below for no reader-visible gain.
 *
 * WHY THIS IS A SCRIPT AND NOT A SQL UPDATE. `content_hash` is
 * sha256(stem + sorted option texts + answer), so a stem or option edit changes
 * its preimage. Every existing write path in this repo — `commitStaged`,
 * `applyEdit` (via `validateEditPayload`), `fix-option-text.ts` — maintains the
 * invariant that the stored hash describes its own row, so this one does too:
 * text and hash move together, in the right order, per question_format.
 *
 * THE GUARD THAT MAKES IT SAFE, borrowed from fix-option-text.ts: before writing
 * anything, recompute the hash from the row's CURRENT values and require it to
 * equal what the database already stores. That proves this script feeds
 * `contentHash` exactly what the ingest fed it. A row that disagrees is SKIPPED
 * and reported — recomputing a "new" hash from inputs we can't reproduce would
 * silently orphan the row.
 *
 * KNOWN, ACCEPTED CAVEAT — there is no source-of-record to fix alongside. These
 * rows came from .docx/.pdf/.xlsx originals that live outside the repo (checked:
 * the committed `scripts/jee/papers/*.json` do not carry these stems). So a
 * re-ingest of one of those files would hash the ORIGINAL round text, miss this
 * row, and insert a duplicate. That is the price of the invariant above, it is
 * bounded to 15 one-off historical papers, and `audit:text` would show the
 * duplicate as a fresh MIXED_MATRIX_DELIM hit.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import {
  mixedMatrixDelimiters,
  mentionsCombinations,
  toBracketMatrices,
} from "../lib/textProbes";
import {
  contentHash,
  numericContentHash,
  subjectiveContentHash,
} from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");

type Opt = { id: string; label: string; text: string; is_correct: boolean };
type Row = {
  id: string;
  source_file: string | null;
  question_number: string | null;
  visibility: string;
  question_format: string | null;
  text: string;
  context: string | null;
  solution: string | null;
  options: Opt[] | null;
};

/** The hash a row of this format carries, computed from the values given. */
function hashOf(
  format: string | null,
  text: string,
  context: string | null,
  options: Opt[]
): string {
  if (format === "numeric") return numericContentHash(text, context);
  if (format === "subjective") return subjectiveContentHash(text, context);
  const sorted = options.slice().sort((a, b) => a.label.localeCompare(b.label));
  const correct = sorted.find((o) => o.is_correct);
  return contentHash(
    text,
    sorted.map((o) => o.text),
    correct?.label ?? ""
  );
}

(async () => {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // Page past the PostgREST 1000-row cap — the bank is far larger than that.
  const flagged: Row[] = [];
  let scanned = 0;
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("questions")
      .select(
        "id, source_file, question_number, visibility, question_format, text, context, solution, options(id, label, text, is_correct)"
      )
      .order("id", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`read failed: ${error.message}`);
    const rows = (data ?? []) as Row[];
    if (rows.length === 0) break;
    scanned += rows.length;
    for (const r of rows) {
      const fields = [r.text, r.context, r.solution, ...(r.options ?? []).map((o) => o.text)];
      if (mixedMatrixDelimiters(fields)) flagged.push(r);
    }
    if (rows.length < PAGE) break;
  }

  console.log(
    `${APPLY ? "APPLY" : "DRY RUN"} — scanned ${scanned} question(s), ${flagged.length} carry mixed matrix delimiters\n`
  );

  // REVERT SNAPSHOT — written before the first write, not after. The transform
  // is mechanically invertible, but a snapshot beats reasoning about that at the
  // moment something has already gone wrong. Small + targeted rather than a full
  // `db:backup`, because the blast radius here is 15 known rows.
  if (APPLY && flagged.length > 0) {
    mkdirSync(join(process.cwd(), "generated-papers"), { recursive: true });
    const path = join(
      process.cwd(),
      "generated-papers",
      `matrix-delims-revert-${new Date().toISOString().replace(/[:.]/g, "-")}.json`
    );
    const { data: pre, error } = await db
      .from("questions")
      .select("id, content_hash, text, context, solution, options(id, label, text)")
      .in(
        "id",
        flagged.map((r) => r.id)
      );
    if (error) throw new Error(`snapshot failed: ${error.message}`);
    writeFileSync(path, JSON.stringify(pre, null, 2), "utf8");
    console.log(`revert snapshot → ${path}\n`);
  }

  let converted = 0;
  let skipped = 0;
  let unchanged = 0;

  for (const r of flagged) {
    const opts = r.options ?? [];
    const label = `${r.source_file ?? "(none)"} ${r.question_number ?? "(none)"} [${r.visibility}] ${r.id}`;

    // GUARD — can we reproduce the stored hash from what is in the row today?
    const { data: stored, error: hErr } = await db
      .from("questions")
      .select("content_hash")
      .eq("id", r.id)
      .single<{ content_hash: string | null }>();
    if (hErr) throw new Error(`hash read failed for ${r.id}: ${hErr.message}`);

    const currentHash = hashOf(r.question_format, r.text, r.context, opts);
    if (stored?.content_hash !== currentHash) {
      console.log(`  SKIP  ${label}`);
      console.log(
        `        stored hash is not reproducible from the current row ` +
          `(stored ${String(stored?.content_hash).slice(0, 12)}…, recomputed ${currentHash.slice(0, 12)}…)`
      );
      skipped++;
      continue;
    }

    const combos = mentionsCombinations(
      [r.text, r.context, r.solution, ...opts.map((o) => o.text)].filter(Boolean).join("\n")
    );
    const next = {
      text: toBracketMatrices(r.text, combos),
      context: r.context === null ? null : toBracketMatrices(r.context, combos),
      solution: r.solution === null ? null : toBracketMatrices(r.solution, combos),
    };
    const nextOpts = opts.map((o) => ({ ...o, text: toBracketMatrices(o.text, combos) }));

    const changedFields =
      next.text !== r.text || next.context !== r.context || next.solution !== r.solution;
    const changedOpts = nextOpts.filter((o, i) => o.text !== opts[i].text);
    if (!changedFields && changedOpts.length === 0) {
      console.log(`  NOOP  ${label} — flagged, but nothing to convert (literal brackets only)`);
      unchanged++;
      continue;
    }

    const newHash = hashOf(r.question_format, next.text, next.context, nextOpts);
    console.log(`  FIX   ${label}`);
    console.log(
      `        ${[
        next.text !== r.text ? "text" : null,
        next.context !== r.context ? "context" : null,
        next.solution !== r.solution ? "solution" : null,
        changedOpts.length ? `${changedOpts.length} option(s)` : null,
      ]
        .filter(Boolean)
        .join(" + ")}  ·  hash ${currentHash.slice(0, 12)}… → ${newHash.slice(0, 12)}…`
    );

    if (!APPLY) {
      converted++;
      continue;
    }

    // Options first: the new hash is computed over the NEW option texts, so the
    // question row must not advertise it before they exist.
    for (const o of changedOpts) {
      const { error } = await db.from("options").update({ text: o.text }).eq("id", o.id);
      if (error) throw new Error(`option update failed for ${o.id}: ${error.message}`);
    }
    const { error: qErr } = await db
      .from("questions")
      .update({ ...next, content_hash: newHash })
      .eq("id", r.id);
    if (qErr) {
      // (org_id, exam_id, content_hash) is unique — a collision means the
      // converted form already exists as another row. Leave it for a human.
      console.log(`        !! question update FAILED: ${qErr.message}`);
      skipped++;
      continue;
    }
    converted++;
  }

  console.log(
    `\n${APPLY ? "applied" : "would convert"}: ${converted} · noop: ${unchanged} · skipped: ${skipped}`
  );

  if (APPLY && converted > 0) {
    // POST-CONDITION — read every row back and prove the stored hash describes
    // the stored text. An assertion here is worth more than the dry run above,
    // because it runs against what the database actually holds.
    let bad = 0;
    for (const r of flagged) {
      const { data, error } = await db
        .from("questions")
        .select("id, question_format, text, context, content_hash, options(id, label, text, is_correct)")
        .eq("id", r.id)
        .single<Row & { content_hash: string }>();
      if (error) throw new Error(`verify read failed for ${r.id}: ${error.message}`);
      const expected = hashOf(data.question_format, data.text, data.context, data.options ?? []);
      const stillMixed = mixedMatrixDelimiters([
        data.text,
        data.context,
        (data as Row).solution ?? null,
        ...(data.options ?? []).map((o) => o.text),
      ]);
      if (data.content_hash !== expected || stillMixed) {
        bad++;
        console.log(
          `  VERIFY FAIL ${r.id} — ${data.content_hash !== expected ? "hash mismatch" : "still mixed"}`
        );
      }
    }
    console.log(bad === 0 ? "\nverified: every converted row hashes to its own text" : `\n${bad} row(s) FAILED verification`);
    if (bad > 0) process.exitCode = 1;
  }
})();
