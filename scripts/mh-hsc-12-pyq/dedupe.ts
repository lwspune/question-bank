/**
 * Apply the reviewed cross-chapter duplicate ledger to the extracted drafts.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/dedupe.ts          # dry-run, all chapters
 *   npx tsx scripts/mh-hsc-12-pyq/dedupe.ts --apply
 *
 * Runs AFTER extract.ts and BEFORE assign.ts — extract.ts rewrites draft.json
 * from the source, so anything this does is undone by a re-extract, by design.
 *
 * WHY A LEDGER AND NOT A THRESHOLD. The compilation cross-files the same board
 * question under two chapters (all 8 Application-of-Definite-Integration
 * questions are also in Definite Integration; 15 of 16 Binomial questions are
 * also in Probability Distributions). `content_hash` will NOT dedup these: it is
 * per-question text, the two copies differ in wording, and they land in
 * different chapters anyway. A similarity threshold does not work either — the
 * ledger was built at 0.90 and missed four real pairs sitting at 0.76-0.89,
 * while the "same direction ratios, different question" pair at 0.83 must NOT be
 * dropped. Every pair here was adjudicated by reading both copies.
 *
 * THREE DECISIONS PER PAIR, kept separate on purpose:
 *   keep      — which chapter the question belongs to, by its own taxonomy;
 *   useText   — which copy's TRANSCRIPTION is better. Often the DROPPED one: it
 *               may be fuller or less corrupted than the copy we are keeping;
 *   subtopic  — pre-assigned in the ledger, since the adjudication established it.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { OUT, DATA, CHAPTERS } from "./config";
import type { Draft } from "./extract";

type Item = {
  keep: string;
  drop: string;
  tag: string;
  subtopic?: string;
  useText?: string;
  defect?: string;
};
type Ledger = {
  pairs: { _group: string; items: Item[] }[];
  /** Rows expected per chapter AFTER the drops, authored in Phase 0. */
  expectedCounts: Record<string, number>;
};

const chapterOf = (ref: string) => ref.split("#")[0];

function main() {
  const apply = process.argv.includes("--apply");
  const ledger = JSON.parse(readFileSync(join(DATA, "cross-chapter-duplicates.json"), "utf8")) as Ledger;
  const items = ledger.pairs.flatMap((p) => p.items);

  const drafts = new Map<string, Draft[]>();
  for (const id of Object.keys(CHAPTERS)) {
    const p = join(OUT, `${id}.draft.json`);
    if (existsSync(p)) drafts.set(id, JSON.parse(readFileSync(p, "utf8")) as Draft[]);
  }
  const find = (ref: string) => drafts.get(chapterOf(ref))?.find((d) => d.ref === ref);

  const problems: string[] = [];
  const log: string[] = [];
  const subtopicSeed: Record<string, string> = {};

  // Validate the WHOLE ledger before mutating anything — a half-applied dedupe
  // leaves two chapters disagreeing about who owns a question.
  for (const it of items) {
    if (!find(it.keep)) problems.push(`${it.tag}: keep ${it.keep} not found`);
    if (!find(it.drop)) {
      // This script is NOT idempotent by design — it rewrites the drafts in
      // place, so a second run cannot find rows the first one removed. Say that,
      // because the bare "not found" reads like a bad ledger entry. It must stay
      // a refusal rather than a no-op: a `useText` edit made since the last run
      // would otherwise be silently skipped.
      problems.push(
        find(it.keep)
          ? `${it.tag}: drop ${it.drop} is already gone — re-run extract.ts before dedupe.ts`
          : `${it.tag}: drop ${it.drop} not found`,
      );
    }
    if (it.useText && it.useText !== "either" && !find(it.useText)) {
      problems.push(`${it.tag}: useText ${it.useText} not found`);
    }
    if (it.subtopic) {
      const ch = CHAPTERS[chapterOf(it.keep)];
      if (ch && !ch.subtopics.includes(it.subtopic)) {
        problems.push(`${it.tag}: subtopic "${it.subtopic}" is not on ${ch.chapterName}'s axis`);
      }
    }
  }
  const keeps = items.map((i) => i.keep);
  const drops = items.map((i) => i.drop);
  for (const r of new Set(drops)) {
    if (drops.filter((x) => x === r).length > 1) problems.push(`${r} is dropped twice`);
    if (keeps.includes(r)) problems.push(`${r} is both kept and dropped`);
  }
  if (problems.length) throw new Error(`REFUSING:\n  ${problems.join("\n  ")}`);

  for (const it of items) {
    const keep = find(it.keep)!;
    const drop = find(it.drop)!;

    // The better TRANSCRIPTION is frequently the copy being dropped — one Vectors
    // copy has a truncated math zone the Line-and-Plane copy keeps intact, and
    // another drops a whole second part of the question. Carrying the text across
    // is the point of separating `useText` from `keep`.
    if (it.useText && it.useText !== "either" && it.useText !== it.keep) {
      const src = find(it.useText)!;
      keep.stem = src.stem;
      if (src.options) keep.options = src.options;
      if (src.image) keep.image = src.image;
      keep.format = src.format;
      log.push(`${it.keep}: text taken from ${it.useText}`);
    }
    if (it.subtopic) subtopicSeed[it.keep] = it.subtopic;
    if (it.defect) log.push(`${it.keep}: DEFECT — ${it.defect.split(".")[0]}`);
  }

  const dropSet = new Set(drops);
  const removed = new Map<string, number>();
  for (const [id, rows] of drafts) {
    const before = rows.length;
    const kept = rows.filter((r) => !dropSet.has(r.ref));
    if (kept.length !== before) {
      removed.set(id, before - kept.length);
      drafts.set(id, kept);
    }
  }

  const total = [...drafts.values()].reduce((n, r) => n + r.length, 0);
  console.log(`ledger: ${items.length} pairs across ${ledger.pairs.length} groups`);
  for (const [id, n] of [...removed].sort()) console.log(`  ${CHAPTERS[id].chapterName}: -${n}`);
  console.log(`total after dedupe: ${total} rows`);

  // Reconcile against the counts Phase 0 authored, per chapter and not just in
  // total — two offsetting errors sum to the right total. The ledger's own note
  // says a disagreement here is a bug in the parser or the drop list.
  const exp = ledger.expectedCounts;
  const mismatches: string[] = [];
  for (const [id, rows] of drafts) {
    if (exp[id] !== undefined && exp[id] !== rows.length) {
      mismatches.push(`${id}: ${rows.length} rows, ledger expects ${exp[id]}`);
    }
  }
  if (exp.TOTAL !== undefined && exp.TOTAL !== total) mismatches.push(`TOTAL: ${total}, ledger expects ${exp.TOTAL}`);
  if (mismatches.length) throw new Error(`COUNTS DISAGREE WITH THE LEDGER:\n  ${mismatches.join("\n  ")}`);
  console.log(`reconciled against the ledger: all ${drafts.size} chapters + TOTAL match.`);
  for (const l of log) console.log(`  ${l}`);

  if (!apply) {
    console.log("\n[dry-run] pass --apply to rewrite the drafts. Nothing changed.");
    return;
  }
  for (const [id, rows] of drafts) {
    writeFileSync(join(OUT, `${id}.draft.json`), JSON.stringify(rows, null, 2) + "\n");
  }
  writeFileSync(join(OUT, "subtopic-seed.json"), JSON.stringify(subtopicSeed, null, 2) + "\n");
  console.log(`\nrewrote ${drafts.size} drafts; ${Object.keys(subtopicSeed).length} subtopics pre-assigned from the ledger.`);
}

main();
