/**
 * Apply authored model solutions to committed State Board exercise questions.
 *
 *   npx tsx scripts/mh-sb-9/apply-solutions.ts <chapterId>          # dry-run (validate)
 *   npx tsx scripts/mh-sb-9/apply-solutions.ts <chapterId> --apply  # write
 *
 * Input: data/<id>.*.solutions.json — arrays of {id, ref, solution} authored for
 * the exercise-subjective rows that shipped without a solution (the book answers
 * only its solved examples). Editing `solution` ONLY is content_hash-safe (the
 * hash is stem+options+answer / stem+context for subjective), so this UPDATEs the
 * live rows in place — no re-commit (which would orphan nothing here but also
 * wouldn't propagate a solution-only change under ignoreDuplicates upsert).
 *
 * Safety: only updates rows that are this exam's SUBJECTIVE rows; validates every
 * solution's LaTeX-delimiter balance first and refuses to apply on any imbalance.
 * After applying, run flip-public.ts (flips subjective + solution IS NOT NULL).
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { findLatexImbalance } from "../practice/lib";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { DATA, EXAM_ID, requireChapter } from "./config";

type SolutionRow = { id: string; ref: string; solution: string };

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  requireChapter(id);
  loadEnv();

  const files = readdirSync(DATA).filter(
    (f) => f.startsWith(`${id}.`) && f.endsWith(".solutions.json")
  );
  const rows: SolutionRow[] = [];
  const seen = new Set<string>();
  for (const f of files) {
    const frag: SolutionRow[] = JSON.parse(readFileSync(join(DATA, f), "utf8"));
    for (const r of frag) {
      if (!r.id || !r.solution || !r.solution.trim()) {
        throw new Error(`${f}: row ${r.ref ?? r.id} has no id or empty solution`);
      }
      if (seen.has(r.id)) throw new Error(`duplicate id ${r.id} (in ${f})`);
      seen.add(r.id);
      rows.push(r);
    }
    console.log(`  ${f.padEnd(34)} ${frag.length} solutions`);
  }
  console.log(`\nloaded ${rows.length} solutions from ${files.length} file(s).`);

  const bad: string[] = [];
  for (const r of rows) {
    const imb = findLatexImbalance(r.solution);
    if (imb) bad.push(`${r.ref}: ${imb}`);
  }
  console.log(bad.length ? `\nLaTeX imbalances (${bad.length}):\n  ${bad.join("\n  ")}` : "\nLaTeX delimiters balanced.");

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write. Nothing updated.");
    return;
  }
  if (bad.length) throw new Error("refusing to apply with LaTeX imbalances — fix the solutions first.");

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let updated = 0;
  for (const r of rows) {
    // Write-boundary rule: long-form text must go through normalizeNewlines so a
    // literal `\n` (backslash+n, e.g. an agent's double-escaped newline) becomes a
    // real line break; math zones are preserved so `\neq`/`\nu` survive.
    const solution = normalizeNewlines(r.solution);
    const { error, count } = await client
      .from("questions")
      .update({ solution }, { count: "exact" })
      .eq("id", r.id)
      .eq("exam_id", EXAM_ID)
      .eq("question_format", "subjective");
    if (error) throw new Error(`update ${r.ref}: ${error.message}`);
    if (count === 1) updated++;
    else console.log(`  WARN ${r.ref} (${r.id}): matched ${count} rows (not this exam's subjective?)`);
  }
  console.log(`\nupdated solution on ${updated} / ${rows.length} subjective rows.`);

  // MCQ verify files (data/<id>.*.mcq-verify.json = [{id, ref, derived_answer,
  // matches_current, solution}]) — apply the brief solution to the mcq rows.
  // A mismatch (matches_current=false) is NOT auto-re-keyed (that needs an
  // is_correct move + content_hash recompute) — it's flagged LOUD for a manual fix.
  const mcqFiles = readdirSync(DATA).filter((f) => f.startsWith(`${id}.`) && f.endsWith(".mcq-verify.json"));
  let mcqUpdated = 0;
  const mismatches: string[] = [];
  for (const f of mcqFiles) {
    const frag = JSON.parse(readFileSync(join(DATA, f), "utf8")) as Array<{
      id: string; ref: string; derived_answer?: string; matches_current?: boolean; solution?: string;
    }>;
    for (const m of frag) {
      if (m.matches_current === false) mismatches.push(`${m.ref}: verifier says ${m.derived_answer}, differs from current key — RE-KEY MANUALLY`);
      if (!m.solution) continue;
      const { error, count } = await client
        .from("questions")
        .update({ solution: normalizeNewlines(m.solution) }, { count: "exact" })
        .eq("id", m.id).eq("exam_id", EXAM_ID).eq("question_format", "mcq");
      if (error) throw new Error(`mcq update ${m.ref}: ${error.message}`);
      if (count === 1) mcqUpdated++;
    }
  }
  if (mcqFiles.length) console.log(`updated solution on ${mcqUpdated} mcq row(s).`);
  if (mismatches.length) console.log(`\n!! MCQ KEY MISMATCHES (${mismatches.length}) — re-key before flipping:\n  ${mismatches.join("\n  ")}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
