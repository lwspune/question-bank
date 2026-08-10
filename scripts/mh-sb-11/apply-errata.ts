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
  // Mirror into EVERY source file that could carry this ref's `solution`: the
  // authored *.solutions.json AND the transcription fragments (a solved example's
  // solution is the book's own, committed inline from the fragment) AND the merged
  // questions.json that commit.ts actually reads. The Class-9 filter here matched
  // only `.solutions.json` / `.s<digit>` / `.misc.json`, which silently missed
  // fragments named anything else (this pipeline's are `.band-a.json` etc.) — the
  // bracket then lived only in the DB and the next re-commit would revert it.
  // Exclude the scratch/dump artifacts, which are regenerated and carry no truth.
  const SCRATCH = /\.(errata|topaper|mcq-blind|mcq-verify|review|xcheck|diagram-specs|solution-images)\.json$/;
  const jsonFiles = readdirSync(DATA).filter(
    (f) => f.startsWith(`${id}.`) && f.endsWith(".json") && !SCRATCH.test(f)
  );

  let applied = 0;
  let skipped = 0;
  for (const e of errata) {
    const { data, error } = await db
      .from("questions")
      .select("id, solution")
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

  console.log(`\n${apply ? "applied" : "would apply"} ${apply ? applied : errata.length - skipped} bracket(s); ${skipped} already bracketed.`);
  if (!apply) console.log("[dry-run] pass --apply to write.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
