/**
 * Strip the internal provenance bracket from the CDS solutions used by a paper,
 * moving the fact it records into question_reviews instead of deleting it.
 *
 *   npx tsx scripts/cds/clean-markers.ts <paperId>            # dry run
 *   npx tsx scripts/cds/clean-markers.ts <paperId> --apply
 *
 * WHY. The CDS ingest appends
 *   [LLM-derived, confidence: MED; no official key — verify before PUBLIC]
 * to every solution (see buildRecords in ./lib.ts). The answer-key export prints
 * `solution` verbatim, so an internal review note reaches students in a printed
 * paper. It is not a rendering flag the exporter can suppress — it is part of the
 * stored string.
 *
 * WHY NOT JUST DELETE IT. That bracket is currently the ONLY in-row record that
 * these answers are LLM-derived and awaiting a human spot-check: all 2,280 CDS
 * rows carry it and NONE has `derived_model` set. So each cleaned row gets a
 * `question_reviews` row (0074) carrying the same fact — including the row's own
 * confidence level — in a table no student-facing surface renders.
 *
 * `derived_model` is deliberately LEFT NULL: the bank's convention for that column
 * is a real model id ("claude-opus-5 (agent)"), the CDS ingest never recorded one,
 * and inventing a plausible id would put a fabrication where the schema promises a
 * fact. The note says "model not recorded" instead.
 *
 * VERDICT IS `unverifiable` — BUT ONLY FOR A ROW THAT HAS NO BETTER EVIDENCE.
 * The source booklets carry no printed key, so by default there is nothing to
 * verify against, and the 2026-08-21 blind pass that examined these rows ran
 * without the section directions, which is exactly how it produced three wrong
 * "fixes" (see fix-keys.ts). Recording `confirmed` on that basis would turn an
 * unverified answer green, which is the failure 0074's own header warns about.
 *
 * SUPERSEDED FOR SOME ROWS (2026-08-23). A re-run WITH the directions supplied
 * blind-re-derived 95 CDS questions and agreed with the stored key on 89
 * (93.7%); those carry a `confirmed` review under run_label
 * "bank-paper:cds-english-blind-2026-08-23". `question_reviews` is append-only
 * and the newest row is the current belief, so writing `unverifiable` over one
 * of those would DOWNGRADE a row that has genuinely been checked. This script
 * therefore strips the marker from every row but emits a review only where none
 * already confirms the key.
 *
 * SAFE ON HASHES: `contentHash` takes question + options + answer. `solution` is
 * not an input, so nothing here can desync dedup identity. Asserted at run time.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { stripDerivationMarker } from "./lib";
import { contentHash } from "../../src/lib/upload/hash";
import { recordReviews } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const RUN_LABEL = "cds:marker-cleanup-2026-08-22";
const CONFIDENCE_RE = /confidence:\s*([A-Za-z]+(?:\s*\(verified in review\))?)/;

type Row = {
  id: string;
  text: string;
  solution: string | null;
  content_hash: string;
  options: { label: string; text: string; is_correct: boolean }[];
  exams: { name?: string } | null;
};

async function main() {
  const apply = process.argv.includes("--apply");
  const paperId = process.argv[2]?.startsWith("--") ? undefined : process.argv[2];
  const setsArg = process.argv.find((a) => a.startsWith("--sets="))?.slice("--sets=".length);
  if (!paperId && !setsArg) {
    throw new Error("usage: clean-markers.ts <paperId> [--apply]   |   clean-markers.ts --sets=<setId,...> [--apply]");
  }
  if (paperId && setsArg) throw new Error("give a paperId OR --sets=, not both");

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  let ids: string[];
  if (paperId) {
    const { data: pq, error: pqErr } = await client
      .from("paper_questions")
      .select("question_id")
      .eq("paper_id", paperId);
    if (pqErr) throw new Error(`paper_questions: ${pqErr.message}`);
    ids = (pq ?? []).map((r) => r.question_id as string);
    if (ids.length === 0) throw new Error(`paper ${paperId} has no questions`);
  } else {
    // SET SCOPE, for cleaning rows a paper has not been built from yet.
    //
    // The paper scope alone is circular: scripts/bank-paper/build.ts REFUSES to
    // apply while any selected row trips P7-internal-provenance (added
    // 2026-08-26), and this marker is exactly that violation — so the paper
    // cannot be created, and without a paper this script had nothing to scope to.
    // Cleaning by directions-set breaks the loop and matches how the English
    // half of a GAT mock is specified (`blocks`), so the sets pasted here are the
    // same ones the spec names.
    const setIds = setsArg!.split(",").map((s) => s.trim()).filter(Boolean);
    if (!setIds.length) throw new Error("--sets= given but empty");
    const seen = new Set<string>();
    for (let i = 0; i < setIds.length; i += 50) {
      const { data, error } = await client
        .from("questions").select("id").in("set_id", setIds.slice(i, i + 50));
      if (error) throw new Error(`questions by set: ${error.message}`);
      for (const r of data ?? []) seen.add(r.id as string);
    }
    ids = [...seen];
    if (ids.length === 0) throw new Error(`no questions found for ${setIds.length} set(s)`);
    console.log(`set scope: ${setIds.length} set(s) -> ${ids.length} question(s)`);
  }

  const rows: Row[] = [];
  for (let i = 0; i < ids.length; i += 100) {
    const { data, error } = await client
      .from("questions")
      .select("id, text, solution, content_hash, options(label, text, is_correct), exams(name)")
      .in("id", ids.slice(i, i + 100));
    if (error) throw new Error(`questions: ${error.message}`);
    rows.push(...((data ?? []) as Row[]));
  }

  /**
   * Scope is EVERY CDS row in the paper, not just the marked ones. A row whose
   * solution was rewritten by hand no longer carries the bracket, but its answer
   * is still LLM-derived against a booklet with no key — selecting on the marker
   * alone would silently leave that row with no provenance anywhere.
   */
  const inScope = rows.filter((r) => (r.exams as { name?: string } | null)?.name === "CDS");
  const marked = inScope.filter((r) => (r.solution ?? "").includes("LLM-derived"));
  console.log(
    `${paperId ? `paper ${paperId}` : `${ids.length} question(s) in set scope`}: ${rows.length} question(s), ${inScope.length} from CDS, ` +
      `${marked.length} still carrying the derivation marker\n`
  );
  if (inScope.length === 0) {
    console.log("nothing to do.");
    return;
  }

  // Rows a properly-instrumented pass has already confirmed. Chunked at 200
  // because `.in()` puts the list in the URL.
  const alreadyConfirmed = new Set<string>();
  {
    const ids = inScope.map((r) => r.id);
    for (let i = 0; i < ids.length; i += 200) {
      const { data, error } = await client
        .from("question_reviews")
        .select("question_id")
        .eq("verdict", "confirmed")
        .in("question_id", ids.slice(i, i + 200));
      if (error) throw new Error(`question_reviews: ${error.message}`);
      for (const r of data ?? []) alreadyConfirmed.add(r.question_id as string);
    }
  }

  const reviews: ReviewInput[] = [];
  let changed = 0;
  let skippedReview = 0;

  for (const r of inScope) {
    const before = r.solution ?? "";
    const hadMarker = before.includes("LLM-derived");
    const after = stripDerivationMarker(before);

    if (after.includes("LLM-derived") || after.includes("verify before PUBLIC")) {
      throw new Error(`${r.id}: marker survived the strip — refusing.`);
    }
    if (after.length === 0) {
      throw new Error(`${r.id}: stripping emptied the solution — refusing.`);
    }
    // The bracket is a suffix/insert, never the whole meaning: a strip that
    // removes more than the marker's own length has matched something else.
    const removed = before.length - after.length;
    if (removed > 120) {
      throw new Error(`${r.id}: strip removed ${removed} chars, expected <=120 — refusing.`);
    }

    // Hash neutrality, asserted rather than assumed.
    const key = r.options.find((o) => o.is_correct)?.label ?? "";
    const hash = contentHash(r.text, r.options.map((o) => o.text), key);
    if (hash !== r.content_hash) {
      throw new Error(
        `${r.id}: stored content_hash does not match a recomputation — refusing to write ` +
          `(the row's identity is already inconsistent; fix that first).`
      );
    }

    const conf = CONFIDENCE_RE.exec(before)?.[1] ?? "unrecorded";
    if (hadMarker) {
      changed += 1;
      console.log(`${r.id}  confidence ${conf}`);
      console.log(`  -${removed} chars: …${before.slice(-90).replace(/\s+/g, " ")}`);
    } else {
      console.log(`${r.id}  no marker (already clean) — recording provenance only`);
    }

    if (apply && hadMarker) {
      const { error } = await client
        .from("questions")
        .update({ solution: after })
        .eq("id", r.id);
      if (error) throw new Error(`solution ${r.id}: ${error.message}`);
    }

    if (alreadyConfirmed.has(r.id)) {
      // A confirmation already stands; `unverifiable` is APPEND-ONLY and newest
      // wins, so emitting one here would overwrite better evidence with worse.
      skippedReview += 1;
      console.log(`  provenance: already confirmed by a directions-supplied pass — no review emitted`);
      console.log();
      continue;
    }

    reviews.push({
      questionId: r.id,
      // Unchanged by this edit — solution is not a hash input.
      reviewedContentHash: r.content_hash,
      method: "blind_rederivation",
      verdict: "unverifiable",
      runLabel: RUN_LABEL,
      note:
        `Answer is LLM-derived at ingest (confidence: ${conf}; model not recorded). The CDS source ` +
        `booklet carries NO printed answer key, so there is nothing to verify against and this row ` +
        `has had no human spot-check. ` +
        (hadMarker
          ? `Provenance moved here from the solution text, which the answer-key export prints verbatim to students. `
          : `Solution was rewritten by hand and carries no marker, so this row is its only provenance. `) +
        `NOT a confirmation.`,
    });
    console.log();
  }

  console.log(`${changed} row(s) ${apply ? "cleaned" : "would be cleaned"}.`);
  console.log(
    `${reviews.length} provenance review(s) to record; ` +
      `${skippedReview} skipped (already confirmed by a directions-supplied pass).`
  );

  if (apply) {
    const res = await recordReviews(client, reviews);
    if (res.error) throw new Error(`question_reviews: ${res.error}`);
    console.log(
      `question_reviews: ${res.written} written (${res.accepted} accepted of ${res.attempted})` +
        (res.rejected.length ? `, ${res.rejected.length} rejected` : "")
    );
    for (const rej of res.rejected) console.log(`  rejected: ${JSON.stringify(rej)}`);
  } else {
    console.log(`[dry-run] would record ${reviews.length} question_reviews row(s).`);
    console.log("[dry-run] pass --apply to write.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
