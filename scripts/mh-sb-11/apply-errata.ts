/**
 * Prepend `[Textbook …]` errata brackets to a chapter's solutions (runbook step 6).
 *
 *   npx tsx scripts/mh-sb-11/apply-errata.ts <chapterId>          # dry-run
 *   npx tsx scripts/mh-sb-11/apply-errata.ts <chapterId> --apply  # write
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
  // DOUBLE-ESCAPING GUARD. An errata file is hand-authored JSON, and the easy
  // mistake is applying JSON escaping twice: writing \\" for a quote (which
  // DECODES to backslash-quote and renders as a visible \" on the page) or \\(
  // for a math delimiter (decodes to a doubled backslash, which KaTeX rejects).
  // Neither is caught by findLatexImbalance — the delimiters still balance — and
  // both reach the student. This bit the batch-1 chapters (14 files repaired
  // after audit:text flagged them) and then bit the batch-2 chapters again,
  // which is why it is a guard here rather than another one-off repair.
  //
  // REFUSE rather than silently repair: the bracket must be fixed in the SOURCE
  // file, or the next re-apply reinstates it. Same reasoning as commitStaged's
  // literal-newline rejection.
  //
  // Known false positive: LaTeX's umlaut accent is \" (as in \"o for ö). No
  // Balbharati maths erratum has ever needed one; if that changes, widen this to
  // ignore \" followed by a letter or a brace.
  const escaped = errata
    .map((e) => [e.ref, /\\"/.test(e.bracket), /\\\\[()[\]]/.test(e.bracket)] as const)
    .filter(([, q, d]) => q || d);
  if (escaped.length) {
    throw new Error(
      "double-JSON-escaped bracket — apply ONE level of JSON escaping, not two. " +
        "A quote inside the bracket is a backslash then a quote in the file; a math " +
        "delimiter is a doubled backslash then the paren. Adding an extra backslash " +
        "to either puts a stray backslash into the rendered page.\n  " +
        escaped
          .map(([r, q, d]) => `${r}: ${[q && "backslash-quote", d && "doubled math delimiter"].filter(Boolean).join(", ")}`)
          .join("\n  ")
    );
  }

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // Source JSON files that may hold each ref's solution text.
  // Mirror into EVERY source file that could carry this ref's `solution`: the
  // authored *.solutions.json AND the transcription fragments (a solved example's
  // solution is the book's own, committed inline from the fragment) AND the merged
  // questions.json that commit.ts actually reads. The Class-9 filter here matched
  // only `.solutions.json` / `.s<digit>` / `.misc.json`, which silently missed
  // fragments named anything else (this pipeline's are `.band-a.json` etc.) — the
  // bracket then lived only in the DB and the next re-commit would revert it.
  // Exclude the scratch/dump artifacts, which are regenerated and carry no truth.
  const SCRATCH = /\.(errata|topaper|mcq-blind|mcq-verify|review|xcheck|diagram-specs|solution-images)\.json$/;
  //
  // ORDER IS LOAD-BEARING: authored `*.solutions.json` files are searched FIRST.
  // The loop below stops at the first file it mirrors into, and for an
  // exercise-subjective row TWO files can hold the ref — the transcription band
  // fragment (which has NO `solution` key, since exercise answers are authored
  // later) and the authored `*.solutions.json` (which does). In `readdirSync`
  // order `<id>.band-a.json` sorts before `<id>.ex-6.solutions.json`, so the
  // applier CREATED a solution field on the band row holding the bracket alone
  // and never touched the real one. Two ways that bites: the authored solution
  // keeps no record of the bracket, and a later re-commit would read the band's
  // bracket-only field as that question's whole model answer.
  // (An MCQ row is the legitimate create-the-field case — it has no
  // `*.solutions.json` entry at all, so the band fragment IS its only home.)
  // Same defect and same fix as `scripts/mh-sb-9`; this pipeline never took it.
  const rank = (f: string) => (f.endsWith(".solutions.json") ? 0 : 1);
  const jsonFiles = readdirSync(DATA)
    .filter((f) => f.startsWith(`${id}.`) && f.endsWith(".json") && !SCRATCH.test(f))
    .sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));

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
    //
    // An MCQ fragment row carries NO `solution` field at all (the brief gives an MCQ a key,
    // not a solution), so a `typeof === "string"` test skips it and the bracket ends up living
    // ONLY in the database — where the next re-commit silently reverts it. That is exactly the
    // drift found in scripts/stateboard (3 of its 76 brackets, all on MCQ rows). So when the
    // field is absent we CREATE it, mirroring what the DB got (bracket alone, since `current`
    // was empty). Only stop searching once we have actually mirrored.
    let mirrored = false;
    for (const f of jsonFiles) {
      const path = join(DATA, f);
      const arr = JSON.parse(readFileSync(path, "utf8")) as any[];
      const hit = arr.find((r) => r.ref === e.ref);
      if (!hit) continue;
      const existing = typeof hit.solution === "string" ? hit.solution : "";
      if (existing.trimStart().startsWith("[Textbook")) {
        mirrored = true;
        break;
      }
      hit.solution = existing ? `${e.bracket}\n\n${existing}` : e.bracket;
      writeFileSync(path, JSON.stringify(arr, null, 2), "utf-8");
      console.log(`      mirrored -> ${f}${existing ? "" : " (created solution field)"}`);
      mirrored = true;
      break;
    }
    if (!mirrored) {
      console.warn(`      !! NOT mirrored to any source file — ${e.ref} would revert on re-commit`);
    }
  }

  if (recorded.length) {
    const result = await recordErrataReviews(db, {
      pipeline: "mh-sb-11",
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
