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
import { stripArtifacts } from "./lib";
import type { Draft } from "./extract";

type Item = {
  keep: string;
  drop: string;
  tag: string;
  subtopic?: string;
  useText?: string;
  defect?: string;
};
/**
 * One half of a COMPOUND board question — a Section-C/D item pairing a theory
 * part with an unrelated numerical whose halves belong to different chapters.
 * `from` splits ANOTHER copy's text instead of this row's own, for the cases
 * where the sibling transcription is the better one (it prints the question
 * mark this copy drops, or ends the sentence where this copy leaves a stray
 * continuation backslash).
 */
type TrimPart = {
  ref: string;
  from?: string;
  splitAt: string;
  take: "before" | "after";
  /** A clause printed once that governs BOTH halves — see applyTrim. */
  append?: string;
  subtopic?: string;
  why?: string;
};

type Ledger = {
  pairs: { _group: string; items: Item[] }[];
  compounds?: { tag: string; _why?: string; parts: TrimPart[] }[];
  /** Rows expected per chapter AFTER the drops, authored in Phase 0. */
  expectedCounts: Record<string, number>;
};

const chapterOf = (ref: string) => ref.split("#")[0];

/**
 * Cut a COMPOUND question down to the half that belongs to this chapter.
 *
 * A board Section-C/D question pairs a theory part with an unrelated numerical,
 * and the two halves routinely sit in different chapters — so the compilation
 * pasted the whole question into each chapter it touches. Keeping one copy whole
 * would silently cost the other chapter its question; keeping both whole files
 * an ammeter question under Oscillations.
 *
 * The anchor must occur EXACTLY once. Zero means the ledger and the source have
 * drifted; more than one means the cut point is ambiguous and the ledger author
 * has to pick a longer anchor — neither is something to resolve by guessing.
 *
 * Re-cleans afterwards because the cut CREATES a new end of string: pandoc's
 * hard-wrap backslash sits harmlessly mid-sentence until the half after it is
 * removed, and then it is trailing.
 */
export function applyTrim(
  stem: string,
  splitAt: string,
  take: "before" | "after",
  append?: string,
): string {
  const hits = stem.split(splitAt).length - 1;
  if (hits === 0) throw new Error(`split anchor not found: ${JSON.stringify(splitAt)}`);
  if (hits > 1) {
    throw new Error(
      `split anchor occurs ${hits} times, so the cut is ambiguous: ${JSON.stringify(splitAt)} — use a longer anchor`,
    );
  }
  const at = stem.indexOf(splitAt);
  const cut = take === "before" ? stem.slice(0, at) : stem.slice(at);
  let out = stripArtifacts(cut).trim();
  if (!out) throw new Error(`trim leaves an empty stem: ${JSON.stringify(splitAt)} take=${take}`);

  // A clause printed ONCE that governs BOTH halves — "Write preparation of (a)
  // diethyl ether (b) ethyl cyanide FROM ETHYL BROMIDE." names the substrate for
  // both products and sits at the end, so `take: "before"` structurally cannot
  // keep it and the first half is left naming no starting material.
  //
  // Deliberately not a defects.json stem fix: those run at EXTRACT time, and this
  // text only exists after the dedupe pass has made the cut.
  if (append !== undefined) {
    if (!append.trim()) {
      throw new Error(
        `append is blank, so it corrects NOTHING while still reporting success — ` +
          `the same silent-no-op shape as a stem fix whose \`to\` equals its \`from\`.`,
      );
    }
    if (out.endsWith(append.trim()) || out.endsWith(append)) {
      throw new Error(
        `the trimmed half already ends with ${JSON.stringify(append.trim())} — ` +
          `appending it would duplicate the clause`,
      );
    }
    out = stripArtifacts(out + append).trim();
  }
  return out;
}

function main() {
  const apply = process.argv.includes("--apply");
  // One ledger per SUBJECT. Kept apart rather than merged because each carries
  // its own _readme describing how THAT source fails, and the two fail
  // differently — Maths cross-files whole questions, Physics also pastes a
  // compound question into both of the chapters its two halves belong to.
  const ledgers = [
    "cross-chapter-duplicates.json",
    "cross-chapter-duplicates-physics.json",
    // Chemistry's is DELIBERATELY PARTIAL while the subject is worked chapter by
    // chapter: its `expectedCounts` lists only the chapters it touches, and the
    // reconciliation checks only what is listed, so unlisted chapters are left
    // alone rather than silently mis-reconciled.
    "cross-chapter-duplicates-chemistry.json",
  ]
    .filter((f) => existsSync(join(DATA, f)))
    .map((f) => JSON.parse(readFileSync(join(DATA, f), "utf8")) as Ledger);
  const items = ledgers.flatMap((l) => l.pairs.flatMap((p) => p.items));
  const compounds = ledgers.flatMap((l) => l.compounds ?? []);
  const parts = compounds.flatMap((c) => c.parts.map((p) => ({ ...p, tag: c.tag })));

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
  // Validate every trim BEFORE mutating anything, same reason as the pairs
  // above: a half-applied compound leaves one chapter trimmed and the other
  // still carrying both halves, which reads as a transcription error rather
  // than an interrupted run.
  for (const p of parts) {
    const row = find(p.ref);
    if (!row) {
      problems.push(`${p.tag}: trim target ${p.ref} not found`);
      continue;
    }
    const srcRef = p.from ?? p.ref;
    const src = find(srcRef);
    if (!src) {
      problems.push(`${p.tag}: trim source ${srcRef} not found`);
      continue;
    }
    try {
      applyTrim(src.stem, p.splitAt, p.take, p.append);
    } catch (e) {
      problems.push(`${p.tag}: ${p.ref}: ${(e as Error).message}`);
    }
    if (p.subtopic) {
      const ch = CHAPTERS[chapterOf(p.ref)];
      if (ch && !ch.subtopics.includes(p.subtopic)) {
        problems.push(`${p.tag}: subtopic "${p.subtopic}" is not on ${ch.chapterName}'s axis`);
      }
    }
    if (row.options) {
      // A compound is always free-response; an MCQ has one task by construction.
      problems.push(`${p.tag}: ${p.ref} has options — an MCQ is not a compound question`);
    }
  }
  const trimRefs = parts.map((p) => p.ref);
  for (const r of new Set(trimRefs)) {
    if (trimRefs.filter((x) => x === r).length > 1) problems.push(`${r} is trimmed twice`);
  }

  const keeps = items.map((i) => i.keep);
  const drops = items.map((i) => i.drop);
  for (const r of trimRefs) {
    if (drops.includes(r)) problems.push(`${r} is both trimmed and dropped`);
  }
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
  // Trims run AFTER the drops are decided but read the drafts as they stand, so
  // a `from` may legitimately point at a copy that is itself being trimmed —
  // hence every source stem is snapshotted first.
  const stems = new Map(parts.map((p) => [p.from ?? p.ref, find(p.from ?? p.ref)!.stem]));
  for (const p of parts) {
    const row = find(p.ref)!;
    const before = row.stem;
    row.stem = applyTrim(stems.get(p.from ?? p.ref)!, p.splitAt, p.take, p.append);
    if (p.subtopic) subtopicSeed[p.ref] = p.subtopic;
    const src = p.from ? ` (text from ${p.from})` : "";
    log.push(
      `${p.ref}: TRIMMED to the ${p.take === "before" ? "first" : "second"} half${src} — ` +
        `${before.length} -> ${row.stem.length} chars`,
    );
  }

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
  console.log(`ledgers: ${ledgers.length}; ${items.length} pairs across ${ledgers.reduce((n, l) => n + l.pairs.length, 0)} groups; ${compounds.length} compounds -> ${parts.length} trims`);
  for (const [id, n] of [...removed].sort()) console.log(`  ${CHAPTERS[id].chapterName}: -${n}`);
  console.log(`total after dedupe: ${total} rows`);

  // Reconcile against the counts Phase 0 authored, per chapter and not just in
  // total — two offsetting errors sum to the right total. The ledger's own note
  // says a disagreement here is a bug in the parser or the drop list.
  const mismatches: string[] = [];
  let reconciled = 0;
  for (const l of ledgers) {
    // TOTAL is per LEDGER, not global — each one totals its own subject's
    // chapters, so summing them into a single map would have the second
    // ledger's TOTAL silently overwrite the first's.
    let subjectTotal = 0;
    for (const [id, want] of Object.entries(l.expectedCounts)) {
      if (id === "TOTAL" || id.startsWith("_")) continue;
      const rows = drafts.get(id);
      if (!rows) {
        mismatches.push(`${id}: named by a ledger but no draft was extracted`);
        continue;
      }
      reconciled += 1;
      subjectTotal += rows.length;
      if (want !== rows.length) mismatches.push(`${id}: ${rows.length} rows, ledger expects ${want}`);
    }
    const wantTotal = l.expectedCounts.TOTAL;
    if (wantTotal !== undefined && wantTotal !== subjectTotal) {
      mismatches.push(`TOTAL for this ledger: ${subjectTotal}, expects ${wantTotal}`);
    }
  }
  if (mismatches.length) throw new Error(`COUNTS DISAGREE WITH THE LEDGER:\n  ${mismatches.join("\n  ")}`);
  console.log(`reconciled against ${ledgers.length} ledger(s): ${reconciled} chapters + per-subject totals match.`);
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

// Guarded so applyTrim can be imported by a test without the CLI running — and
// the CLI throws on a count mismatch, so an unguarded import fails the suite for
// a reason that has nothing to do with the test.
if (require.main === module) main();
