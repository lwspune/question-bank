/**
 * Prepend `[Textbook …]` errata brackets to committed rows' solutions, and MIRROR
 * each bracket back into the source file it came from.
 *
 *   npx tsx scripts/ncert/apply-errata.ts <chapterId>            # dry-run
 *   npx tsx scripts/ncert/apply-errata.ts <chapterId> --apply
 *
 * Input: `data/<id>.errata.json` = [{ ref, bracket }] where `bracket` is the FULL
 * text including the square brackets, e.g.
 *   { "ref": "2.1 Eg.1",
 *     "bracket": "[Textbook misprint: the principal-value branch of sin⁻¹ is …]" }
 *
 * WHY THIS EXISTS (this pipeline had no way to do it):
 * Most `[Textbook …]` brackets here are authored INLINE — into a `.solutions.json`
 * before `apply-solutions` runs, which is idempotent and needs no mirroring. But a
 * SOLVED-example row carries the BOOK's own worked solution, committed straight
 * from the transcription band fragment, and `commit.ts` upserts on `content_hash`
 * so a re-commit SKIPS an existing row and never updates its solution. A bracket
 * on a solved row therefore has no route in without this script.
 *
 * TWO RULES LEARNED THE HARD WAY IN THE SIBLING PIPELINES — do not "simplify" them:
 *
 * 1. **`apply-errata` must be the LAST write of a chapter.** It edits the live row;
 *    re-running `apply-solutions` afterwards rewrites that row from the solutions
 *    file and DESTROYS the bracket. On mh-sb-11 that silently destroyed 9 of 17
 *    brackets, and every gate stayed green — a missing erratum is not malformed,
 *    it is absent. The only signal is a stored-bracket count vs the errata file's
 *    entry count, which this script prints.
 *
 * 2. **The source mirror runs INDEPENDENTLY of the DB skip.** If the DB row already
 *    carries the bracket but the source file does not, a later re-commit or
 *    re-apply reverts it. Doing the mirror only on the not-yet-applied path makes
 *    the script unable to heal a half-applied state. It warns LOUDLY when a bracket
 *    mirrors nowhere, because a bracket that lives only in the database is one
 *    re-run away from gone.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { DATA, EXAM_ID, requireChapter } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Erratum = { ref: string; bracket: string };

/** Source files that can hold a `solution` for this chapter, SOLUTIONS FILES FIRST.
 *  Ordering is load-bearing: a band fragment sorts before `<id>.<group>.solutions.json`
 *  alphabetically, and for an EXERCISE row the band fragment has no `solution` key at
 *  all — mirroring there would CREATE one holding the bracket alone, which a later
 *  re-commit would read as that question's entire model answer. */
function sourceFiles(id: string): string[] {
  // The mirror target must be a file `apply-solutions.ts` or `commit.ts` will READ
  // BACK, or the bracket is reverted on the next run. That is three kinds of file,
  // and the ORDER matters:
  //   1. `<id>.<group>.solutions.json`  — authored solutions for exercise rows
  //   2. `<id>.blind.mcq-verify.json`   — where an MCQ row's solution actually lives
  //      (apply-solutions writes MCQ solutions from the blind re-derivation, so this
  //      is the source of record for them even though it is a "verify" file — do NOT
  //      add it to merge.ts's question scan, where it is correctly excluded)
  //   3. band fragments               — where a SOLVED example's solution lives
  // Solutions files rank first because a band fragment sorts before them
  // alphabetically, and for an EXERCISE row the band has no `solution` key at all —
  // mirroring there would CREATE one holding the bracket alone, which a later
  // re-commit would read as that question's entire model answer.
  const all = readdirSync(DATA).filter((f) => f.startsWith(`${id}.`) && f.endsWith(".json"));
  const SCRATCH = /\.(tosolve|review|mcq-blind|crosscheck|errata|solution-images)\.json$/;
  const usable = all.filter(
    (f) => !SCRATCH.test(f) && !/\.diagram-specs[.-]/.test(f) && f !== `${id}.questions.json`
  );
  const sols = usable.filter((f) => f.endsWith(".solutions.json")).sort();
  const mcq = usable.filter((f) => f.endsWith(".mcq-verify.json")).sort();
  const rest = usable.filter((f) => !f.endsWith(".solutions.json") && !f.endsWith(".mcq-verify.json")).sort();
  return [...sols, ...mcq, ...rest];
}

function mirror(id: string, ref: string, bracket: string, apply: boolean): string[] {
  const hits: string[] = [];
  for (const f of sourceFiles(id)) {
    const p = join(DATA, f);
    const rows = JSON.parse(readFileSync(p, "utf8"));
    if (!Array.isArray(rows)) continue;
    let touched = false;
    for (const r of rows) {
      if (r?.ref !== ref) continue;
      if (typeof r.solution !== "string") continue; // never CREATE a solution field
      if (r.solution.startsWith(bracket)) { hits.push(`${f} (already)`); touched = false; break; }
      if (apply) r.solution = `${bracket} ${r.solution}`;
      touched = true;
      hits.push(f);
      break;
    }
    if (touched && apply) writeFileSync(p, JSON.stringify(rows, null, 2) + "\n", "utf8");
    if (hits.length) break; // first (solutions-file-preferred) match wins
  }
  return hits;
}

async function main() {
  loadEnv();
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const ch = requireChapter(id);
  const p = join(DATA, `${id}.errata.json`);
  if (!existsSync(p)) throw new Error(`no errata file at ${p}`);
  const errata: Erratum[] = JSON.parse(readFileSync(p, "utf8"));
  if (!errata.length) throw new Error("errata file is empty");

  for (const e of errata) {
    if (!e.ref || !e.bracket) throw new Error(`malformed erratum: ${JSON.stringify(e)}`);
    if (!e.bracket.startsWith("[Textbook")) {
      throw new Error(`${e.ref}: bracket must start with "[Textbook" — errata.ts scans for exactly that`);
    }
    if (!e.bracket.includes("]")) throw new Error(`${e.ref}: bracket has no closing "]"`);
    if (/\\\\[({[\]a-zA-Z]/.test(e.bracket) || /[\f\t\b\v\0]/.test(e.bracket)) {
      throw new Error(`${e.ref}: bracket carries a double-escape or control char (shell corruption) — author it via the Write tool`);
    }
  }

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  console.log(`${ch.chapterName}: ${errata.length} erratum/errata.\n`);
  let wrote = 0, already = 0, orphan = 0;
  for (const e of errata) {
    const { data: row, error } = await db
      .from("questions")
      .select("id, solution")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", ch.sourceFile)
      .eq("question_number", e.ref)
      .maybeSingle();
    if (error) throw new Error(`${e.ref}: ${error.message}`);
    if (!row) { console.log(`  ${e.ref}: NO COMMITTED ROW — skipping`); orphan++; continue; }

    const has = typeof row.solution === "string" && row.solution.startsWith(e.bracket);
    if (has) already++;
    else if (apply) {
      const next = row.solution ? `${e.bracket} ${row.solution}` : e.bracket;
      const { error: uErr } = await db.from("questions").update({ solution: next }).eq("id", row.id);
      if (uErr) throw new Error(`${e.ref}: ${uErr.message}`);
      wrote++;
    } else wrote++;

    // The mirror runs regardless of the DB outcome — see rule 2 in the header.
    const hits = mirror(id, e.ref, e.bracket, apply);
    if (!hits.length) {
      console.log(`  ${e.ref}: ${has ? "db already" : "db set"} · *** MIRRORED NOWHERE — the bracket lives only in the DB and the next re-commit/re-apply will revert it ***`);
      orphan++;
    } else {
      console.log(`  ${e.ref}: ${has ? "db already" : "db set"} · mirrored -> ${hits.join(", ")}`);
    }
  }

  // Verify: count the brackets actually stored, and compare with the file.
  const { data: stored } = await db
    .from("questions")
    .select("question_number")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", ch.sourceFile)
    .like("solution", "[Textbook%");
  // A chapter's brackets come from TWO sources, so the count check is one-sided.
  // Some are authored INLINE into a `.solutions.json` by the solution pass (the
  // normal route for a defect found while solving); the rest come from this errata
  // file (the route for a solved example, an MCQ, or anything the cross-check
  // adjudicates later). So stored > entries is NORMAL and means inline brackets
  // exist. Only stored < entries is a failure — it means a bracket in this file did
  // not land, which is the silent-loss mode this script exists to prevent.
  const storedCount = (stored ?? []).length;
  const shortfall = apply && storedCount < errata.length;
  console.log(
    `\n${apply ? "APPLIED" : "[dry-run]"}: ${wrote} to write, ${already} already present, ${orphan} problem(s).` +
      `\nstored brackets now: ${storedCount} · errata file entries: ${errata.length}` +
      `${storedCount > errata.length ? `  (${storedCount - errata.length} authored inline elsewhere — expected)` : ""}` +
      `${shortfall ? "  <-- SHORTFALL: a bracket in this file did not land. Investigate before shipping." : ""}` +
      `\nREMINDER: this must be the LAST write for this chapter. Re-running apply-solutions after it destroys these brackets.`
  );
  if (shortfall) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
