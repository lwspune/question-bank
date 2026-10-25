/**
 * Correct wrong solutions found while building animated solutions (owner,
 * 2026-10-25: "if you find any solution wrong, fix it as we go").
 *
 *   npm run visuals:fix-solutions -- <batch>            # dry run: checks every fix, writes nothing
 *   npm run visuals:fix-solutions -- <batch> --apply
 *
 * <batch> names solution-fixes/<batch>.json: [{ id, before, solution, note }],
 * where `before` is solutionFingerprint() of the solution being replaced. A fix
 * is refused if the stored solution no longer has that fingerprint (someone
 * changed it since), or if the new text fails the solutions checks
 * (scripts/lib/solutionText solutionProblems). Writes ONLY `solution`, row id
 * kept; content_hash excludes the solution, and the script asserts it did not
 * move. Each fix is recorded in question_reviews (method solution_audit,
 * verdict solution_rewritten). The committed batch file is the before/after
 * record. Fix a solution BEFORE building its visual: a visual's steps carry the
 * solution's fingerprint.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { solutionProblems } from "../lib/solutionText";
import { solutionFingerprint } from "../../src/lib/visuals/visual";
import { formatRecordResult, recordReviews } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

type Fix = { id: string; before: string; solution: string; note: string };

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const name = process.argv[2];
  const apply = process.argv.includes("--apply");
  if (!name || name.startsWith("--")) throw new Error("usage: visuals:fix-solutions -- <batch> [--apply]");
  const fixes = JSON.parse(readFileSync(join(__dirname, "solution-fixes", `${name}.json`), "utf8")) as Fix[];
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

  const problems: string[] = [];
  const ready: { fix: Fix; hash: string }[] = [];
  for (const fix of fixes) {
    const { data, error } = await db.from("questions").select("solution, content_hash").eq("id", fix.id).maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) {
      problems.push(`${fix.id}: no such question`);
      continue;
    }
    if (data.solution === fix.solution) {
      console.log(`${fix.id}: already corrected`);
      continue;
    }
    if (solutionFingerprint(data.solution ?? "") !== fix.before) {
      problems.push(`${fix.id}: the stored solution changed since this fix was written (fingerprint ${solutionFingerprint(data.solution ?? "")}, expected ${fix.before})`);
      continue;
    }
    const issues = solutionProblems(fix.solution);
    if (issues.length) {
      problems.push(`${fix.id}: new text fails the solutions checks: ${issues.join("; ")}`);
      continue;
    }
    if (!fix.note?.trim()) {
      problems.push(`${fix.id}: say what was wrong (note)`);
      continue;
    }
    ready.push({ fix, hash: data.content_hash as string });
    console.log(`${fix.id}: ready (${fix.note})`);
  }
  if (problems.length) {
    for (const p of problems) console.log(`  !! ${p}`);
    process.exit(1);
  }
  if (!apply) {
    console.log(`[dry run] ${ready.length} to correct; re-run with --apply.`);
    return;
  }

  const reviews: ReviewInput[] = [];
  for (const { fix, hash } of ready) {
    const { error } = await db.from("questions").update({ solution: fix.solution }).eq("id", fix.id);
    if (error) throw new Error(`${fix.id}: ${error.message}`);
    const { data: after, error: aErr } = await db.from("questions").select("solution, content_hash").eq("id", fix.id).single();
    if (aErr) throw new Error(aErr.message);
    if (after.solution !== fix.solution) throw new Error(`${fix.id}: the write did not stick`);
    if (after.content_hash !== hash) throw new Error(`${fix.id}: content_hash moved, which must not happen`);
    reviews.push({ questionId: fix.id, reviewedContentHash: hash, method: "solution_audit", verdict: "solution_rewritten", runLabel: `visuals:${name}`, source: "live", note: fix.note });
    console.log(`  corrected ${fix.id}`);
  }
  if (reviews.length) console.log(formatRecordResult(await recordReviews(db, reviews), `visuals:${name}`));
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
