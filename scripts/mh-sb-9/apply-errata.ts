/**
 * Prepend `[Textbook …]` errata brackets to a chapter's solutions (runbook step 6).
 *
 *   npx tsx scripts/mh-sb-9/apply-errata.ts <chapterId>          # dry-run
 *   npx tsx scripts/mh-sb-9/apply-errata.ts <chapterId> --apply  # write
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

  // Source JSON files that may hold each ref's solution text: the authored
  // *.solutions.json AND the transcription fragments (which carry the `solution`
  // of every solved example inline).
  //
  // This deliberately does NOT hand-list fragment name shapes. It used to match
  // only `.solutions.json` / `.s<digit>` / `.misc.json`, which silently mirrored
  // NOTHING for any chapter whose fragments were named differently — the bracket
  // landed in the DB alone and the next re-commit would revert it. Excluding the
  // known REGENERATED artifacts (and the merged output) is the safe polarity: an
  // unrecognised file is searched, never skipped.
  const SCRATCH =
    /\.(errata|topaper|mcq-blind|mcq-verify|anchors|fig|figneed|figtext|review|xcheck|diagram-specs|solution-images)\.json$/;
  //
  // ORDER MATTERS: authored *.solutions.json first, transcription fragments
  // after. An exercise row exists in BOTH — as a question in its fragment (with
  // no `solution`) and as an authored answer in the solutions file — and only
  // the latter is where its solution lives. Searching fragments first would
  // write a bracket-only `solution` into the transcription source, which
  // commit.ts would then treat as an answered row.
  const allJson = readdirSync(DATA).filter(
    (f) =>
      f.startsWith(`${id}.`) &&
      f.endsWith(".json") &&
      f !== `${id}.questions.json` &&
      !SCRATCH.test(f)
  );
  const jsonFiles = [
    ...allJson.filter((f) => f.endsWith(".solutions.json")),
    ...allJson.filter((f) => !f.endsWith(".solutions.json")),
  ];

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
    const dbAlready = current.trimStart().startsWith("[Textbook");
    if (dbAlready) {
      console.log(`  skip DB (already bracketed): ${e.ref}`);
      skipped++;
    } else {
      const next = normalizeNewlines(`${e.bracket}\n\n${current}`);
      console.log(`  ${apply ? "apply" : "would apply"}: ${e.ref} (+${e.bracket.length} chars)`);
    }
    if (!apply) continue;

    if (!dbAlready) {
      const { error: uerr, count } = await db
        .from("questions")
        .update({ solution: normalizeNewlines(`${e.bracket}\n\n${current}`) }, { count: "exact" })
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
    }

    // Mirror into whichever source JSON carries this ref, so DB and source agree.
    // Deliberately INDEPENDENT of the DB skip above: if a previous run bracketed
    // the row but failed to mirror, the source is still stale and a re-commit
    // would revert it — so re-running this script must be able to heal that.
    let mirrored = false;
    for (const f of jsonFiles) {
      const path = join(DATA, f);
      const arr = JSON.parse(readFileSync(path, "utf8")) as any[];
      const hit = arr.find((r) => r.ref === e.ref);
      if (!hit) continue;
      const src = typeof hit.solution === "string" ? hit.solution : "";
      if (src.trimStart().startsWith("[Textbook")) {
        mirrored = true; // already carries it
        break;
      }
      // `src` is "" for a row that has no solution field yet (an MCQ, or a
      // fragment row whose answer is authored elsewhere) — CREATE the field
      // rather than skipping, or the bracket lives only in the database.
      hit.solution = src ? `${e.bracket}\n\n${src}` : e.bracket;
      writeFileSync(path, JSON.stringify(arr, null, 2), "utf-8");
      console.log(`      mirrored -> ${f}`);
      mirrored = true;
      break;
    }
    if (!mirrored) {
      console.warn(
        `      !! NOT MIRRORED: "${e.ref}" was not found in any source JSON for ${id}. ` +
          `The bracket now exists ONLY in the database and the next re-commit will revert it. ` +
          `Check the ref spelling and that its fragment is in data/.`
      );
    }
  }

  if (recorded.length) {
    const result = await recordErrataReviews(db, {
      pipeline: "mh-sb-9",
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
