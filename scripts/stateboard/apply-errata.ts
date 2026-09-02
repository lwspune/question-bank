/**
 * Prepend `[Textbook …]` errata brackets to a chapter's solutions (runbook step 6).
 *
 *   npx tsx scripts/stateboard/apply-errata.ts <chapterId>          # dry-run
 *   npx tsx scripts/stateboard/apply-errata.ts <chapterId> --apply  # write
 *
 * Input: data/<id>.errata.json = [{ref, bracket}] — one entry per verified book
 * defect, adjudicated against the source page by a human. The bracket MUST sit at
 * the START of `solution`: errata.ts finds them with a `startsWith("[")` scan, so
 * a bracket appended at the end is invisible to the publisher report (this bit the
 * Vectors chapter).
 *
 * Two conventions (see the runbook):
 *   [Textbook misprint: …]         the QUESTION or the book's own printed SOLUTION
 *                                  is defective; we preserve it and explain.
 *   [Textbook answer-key error: …] the question is fine and OUR answer is correct;
 *                                  the book's printed KEY is wrong.
 *
 * Writes BOTH the live row and the source JSON (a *.solutions.json entry, or the
 * transcription fragment for a solved example committed inline) so the two can't
 * drift. Idempotent: a solution already starting with "[" is skipped.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { findLatexImbalance } from "../practice/lib";
import { DATA, EXAM_ID, requireChapter } from "./config";
import { recordErrataReviews, type ErratumApplied } from "../../src/lib/reviews/emit";
import { formatRecordResult } from "../../src/lib/reviews/service";

type Erratum = { ref: string; bracket: string };

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  loadEnv();
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const chapter = requireChapter(id);

  const errata: Erratum[] = JSON.parse(readFileSync(join(DATA, `${id}.errata.json`), "utf8"));
  const bad = errata.filter((e) => !e.bracket.startsWith("[Textbook"));
  if (bad.length) throw new Error(`bracket must start with "[Textbook": ${bad.map((b) => b.ref).join(", ")}`);
  const imbalanced = errata.map((e) => [e.ref, findLatexImbalance(e.bracket)] as const).filter(([, m]) => m);
  if (imbalanced.length) {
    throw new Error(`LaTeX imbalance in bracket:\n  ${imbalanced.map(([r, m]) => `${r}: ${m}`).join("\n  ")}`);
  }

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // Source JSON files that may hold each ref's solution text.
  //
  // ⚠ This list used to be `.solutions.json` / `.s<digit>` / `.misc.json` only —
  // the Maths chapters' naming. A Physics band is called `.solved-a.json` /
  // `.ex-mcq.json` / `.band-a.json`, so a bracket on a SOLVED EXAMPLE (whose
  // solution is committed inline from the band fragment, never from a solutions
  // file) mirrored NOWHERE and lived in the DB alone — to be silently reverted by
  // the next re-commit. It failed quietly because nothing warned when a bracket
  // matched no file. Confirmed live on Ch.9 Current Electricity, 4 brackets.
  //
  // Now: any non-scratch fragment, with SOLUTIONS FILES RANKED FIRST. The order
  // is load-bearing — the loop takes the first file carrying the ref, and for an
  // exercise row the authored solution is the one a re-commit reads back.
  const SCRATCH = /\.(mcq-blind|mcq-verify|book-answers|review|topaper|xcheck|errata|anchors|solution-images|sections|diagram-specs|imgfig)\.json$|\.diagram-specs/;
  const jsonFiles = readdirSync(DATA)
    .filter((f) => f.startsWith(`${id}.`) && f.endsWith(".json") && f !== `${id}.questions.json` && !SCRATCH.test(f))
    .sort((a, b) => Number(b.endsWith(".solutions.json")) - Number(a.endsWith(".solutions.json")));

  let applied = 0;
  let skipped = 0;
  // Review provenance (0074): a [Textbook ...] bracket is an adjudication that
  // the SOURCE is defective and our content stands.
  const recorded: ErratumApplied[] = [];
  for (const e of errata) {
    const { data, error } = await db
      .from("questions")
      .select("id, solution, content_hash")
      .eq("source_file", chapter.sourceFile)
      .eq("question_number", e.ref);
    if (error) throw error;
    if (!data?.length) throw new Error(`ref not found in bank: "${e.ref}"`);
    if (data.length > 1) throw new Error(`ref "${e.ref}" matched ${data.length} rows`);

    const row = data[0];
    const current = row.solution ?? "";
    if (current.trimStart().startsWith("[Textbook")) {
      console.log(`  skip (already bracketed): ${e.ref}`);
      skipped++;
      continue;
    }
    const next = normalizeNewlines(`${e.bracket}\n\n${current}`);
    console.log(`  ${apply ? "apply" : "would apply"}: ${e.ref} (+${e.bracket.length} chars)`);
    if (!apply) continue;

    const { error: uerr, count } = await db
      .from("questions")
      .update({ solution: next }, { count: "exact" })
      .eq("id", row.id)
      .eq("exam_id", EXAM_ID);
    if (uerr) throw new Error(`update ${e.ref}: ${uerr.message}`);
    if (count !== 1) throw new Error(`update ${e.ref}: matched ${count} rows`);
    applied++;
    // An erratum edits the solution only, which is not part of content_hash, so
    // the stored hash is unchanged by the write above.
    recorded.push({
      questionId: row.id,
      ref: e.ref,
      bracket: e.bracket,
      contentHash: row.content_hash as string,
    });

    // Mirror into whichever source JSON carries this ref, so DB and source agree.
    let mirrored = false;
    for (const f of jsonFiles) {
      const path = join(DATA, f);
      const arr = JSON.parse(readFileSync(path, "utf8")) as any[];
      const hit = arr.find((r) => r.ref === e.ref);
      if (!hit) continue;
      const cur = typeof hit.solution === "string" ? hit.solution : "";
      if (!cur.trimStart().startsWith("[Textbook")) {
        // CREATE the field when absent: an MCQ fragment row carries a key, not a
        // solution, so `typeof hit.solution === "string"` was false and the
        // bracket was dropped without a word (the mh-sb-11 bug, same shape).
        hit.solution = cur ? `${e.bracket}\n\n${cur}` : e.bracket;
        writeFileSync(path, JSON.stringify(arr, null, 2), "utf-8");
        console.log(`      mirrored -> ${f}`);
      }
      mirrored = true;
      break;
    }
    if (!mirrored) {
      // LOUD, because the failure is otherwise invisible: the bracket is live in
      // the DB and absent from the source, so the next re-commit reverts it and
      // every gate still passes.
      console.warn(
        `      ⚠ ${e.ref}: bracket mirrored to NO source file — it exists only in the DB and ` +
          `the next re-commit will silently revert it. Searched: ${jsonFiles.join(", ") || "(none)"}`
      );
    }
  }

  if (recorded.length) {
    const result = await recordErrataReviews(db, {
      pipeline: "stateboard",
      artifactId: id,
      items: recorded,
    });
    console.log(formatRecordResult(result, "review provenance"));
  }

  console.log(`\n${apply ? "applied" : "would apply"} ${apply ? applied : errata.length - skipped} bracket(s); ${skipped} already bracketed.`);
  if (!apply) console.log("[dry-run] pass --apply to write.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
