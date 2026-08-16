/**
 * Repair an arithmetically WRONG line in a SOLVED example's printed solution.
 *
 *   npx tsx scripts/mh-sb-11/apply-solved-fixes.ts <chapterId>          # dry-run
 *   npx tsx scripts/mh-sb-11/apply-solved-fixes.ts <chapterId> --apply  # write
 *
 * Why this script exists at all. A `solved` row ships the BOOK's own worked
 * solution, committed inline from the transcription fragment — so
 * `apply-solutions.ts` never touches it (that one only fills rows where
 * `solution IS NULL`). When the book's printed derivation is not merely ugly but
 * arithmetically WRONG, preserving it verbatim would ship a model answer that
 * teaches the error. The shipped precedent (Ch.4 `4.6 SolvedEx.8`) is: correct
 * the derivation AND carry an errata bracket naming the defect. This does the
 * first half; `apply-errata.ts` does the second, and must run AFTER.
 *
 * Input: data/<id>.solved-fixes.json = [{ref, why, find, replace}].
 *
 * THE GUARD IS THE POINT. `find` must match the stored solution EXACTLY ONCE or
 * the fix is REFUSED — never force-applied to a near miss, never applied to the
 * first of several matches. A repair aimed at a string that no longer exists is
 * a silent no-op that reads as success, which has bitten the sibling
 * mh-hsc-12-pyq pipeline; a fix whose `find` equals its `replace` is likewise
 * refused, since that is what a shell-mangled needle looks like.
 *
 * Writes BOTH the live row and the transcription fragment that carries the ref,
 * so a later re-commit cannot revert the repair.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { findLatexImbalance } from "../practice/lib";
import { DATA, EXAM_ID, requireChapter } from "./config";

type Fix = { ref: string; why: string; find: string; replace: string };

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  loadEnv();
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const chapter = requireChapter(id);

  const fixes: Fix[] = JSON.parse(readFileSync(join(DATA, `${id}.solved-fixes.json`), "utf8"));

  for (const f of fixes) {
    if (!f.why?.trim()) throw new Error(`${f.ref}: every fix must carry a "why"`);
    if (f.find === f.replace) throw new Error(`${f.ref}: find === replace, so this fix is a no-op`);
    const imbalance = findLatexImbalance(f.replace);
    if (imbalance) throw new Error(`${f.ref}: LaTeX imbalance in replacement — ${imbalance}`);
  }

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const SCRATCH = /\.(errata|topaper|mcq-blind|mcq-verify|review|xcheck|diagram-specs|solution-images|solved-fixes)\.json$/;
  const jsonFiles = readdirSync(DATA).filter(
    (f) => f.startsWith(`${id}.`) && f.endsWith(".json") && !SCRATCH.test(f)
  );

  let applied = 0;
  let already = 0;
  for (const f of fixes) {
    const { data, error } = await db
      .from("questions")
      .select("id, solution")
      .eq("source_file", chapter.sourceFile)
      .eq("question_number", f.ref);
    if (error) throw error;
    if (!data?.length) throw new Error(`ref not found in bank: "${f.ref}"`);
    if (data.length > 1) throw new Error(`ref "${f.ref}" matched ${data.length} rows`);

    const current = (data[0].solution ?? "") as string;
    const hits = current.split(f.find).length - 1;
    if (hits === 0) {
      if (current.includes(f.replace)) {
        console.log(`  skip (already fixed): ${f.ref}`);
        already++;
        continue;
      }
      throw new Error(
        `${f.ref}: "find" matches the stored solution 0 times and the replacement is absent — ` +
          `the fix targets text that does not exist. Re-read the row before retrying.`
      );
    }
    if (hits > 1) throw new Error(`${f.ref}: "find" matches ${hits} times; it must match exactly once`);

    const next = normalizeNewlines(current.split(f.find).join(f.replace));
    console.log(`  ${apply ? "fix" : "would fix"}: ${f.ref} — ${f.why}`);
    if (!apply) continue;

    const { error: uerr, count } = await db
      .from("questions")
      .update({ solution: next }, { count: "exact" })
      .eq("id", data[0].id)
      .eq("exam_id", EXAM_ID);
    if (uerr) throw new Error(`update ${f.ref}: ${uerr.message}`);
    if (count !== 1) throw new Error(`update ${f.ref}: matched ${count} rows`);
    applied++;

    let mirrored = false;
    for (const file of jsonFiles) {
      const path = join(DATA, file);
      const arr = JSON.parse(readFileSync(path, "utf8")) as any[];
      const hit = arr.find((r) => r.ref === f.ref);
      if (!hit || typeof hit.solution !== "string") continue;
      if (!hit.solution.includes(f.find)) continue;
      hit.solution = hit.solution.split(f.find).join(f.replace);
      writeFileSync(path, JSON.stringify(arr, null, 2), "utf-8");
      console.log(`      mirrored -> ${file}`);
      mirrored = true;
      break;
    }
    if (!mirrored) {
      console.warn(`      !! NOT mirrored to any source file — ${f.ref} would revert on re-commit`);
    }
  }

  console.log(`\n${apply ? "fixed" : "would fix"} ${apply ? applied : fixes.length - already}; ${already} already fixed.`);
  if (!apply) console.log("[dry-run] pass --apply to write.");
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
