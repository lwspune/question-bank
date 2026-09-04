/**
 * Push rewritten STUDENT-FACING solution text from `data/<paper>.answers.json`
 * into rows that are already committed.
 *
 *   npx tsx scripts/cds-maths/apply-solutions.ts 2023-1
 *   npx tsx scripts/cds-maths/apply-solutions.ts 2023-1 --apply
 *
 * `commit.ts` skips rows that already exist (content_hash dedup), so it cannot
 * be used to revise a solution after publication. This can -- and it is the
 * ONLY thing that should, because it updates `solution` and NOTHING else.
 *
 * Two guards, both of which have a real failure behind them elsewhere in this
 * repo:
 *
 *  - IT REFUSES IF AN ANSWER MOVED. A rewrite pass exists to change prose; if
 *    the answers file now disagrees with the stored key, something bigger
 *    happened than a wording fix and applying it silently would ship a key
 *    change disguised as an edit. The script stops and names every row.
 *
 *  - IT REFUSES A ROW IT CANNOT PAIR. Matching is by question_number within one
 *    source_file. A missing or duplicated match means the file and the bank have
 *    diverged, and guessing which row was meant is how a solution lands on its
 *    neighbour -- a permutation that no count check can see.
 *
 * `content_hash` deliberately EXCLUDES `solution`, so this changes no row
 * identity: no re-commit, no fresh uuids, no re-attaching figures, and the
 * question_reviews fingerprints stay valid.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, dataPath, requirePaper } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Row = { number: number; answer: string; confidence: string; reasoning: string; solution?: string };

async function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");
  const p = dataPath(paper.id, "answers");
  if (!existsSync(p)) throw new Error(`no answers file for ${paper.id}`);
  const file = JSON.parse(readFileSync(p, "utf8")) as { derivations: Row[] };

  loadEnv();
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const { data, error } = await client
    .from("questions")
    .select("id, question_number, solution, options:options(label, is_correct)")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
  if (error) throw new Error(`read failed: ${error.message}`);

  const byNumber = new Map<string, { id: string; solution: string | null; key: string | null }[]>();
  for (const r of (data ?? []) as never[]) {
    const row = r as { id: string; question_number: string; solution: string | null; options: { label: string; is_correct: boolean }[] };
    const key = (row.options ?? []).find((o) => o.is_correct)?.label ?? null;
    const list = byNumber.get(row.question_number) ?? [];
    list.push({ id: row.id, solution: row.solution, key });
    byNumber.set(row.question_number, list);
  }

  const problems: string[] = [];
  const updates: { id: string; solution: string; number: number }[] = [];

  for (const d of file.derivations) {
    const hits = byNumber.get(String(d.number)) ?? [];
    if (hits.length !== 1) {
      problems.push(`Q${d.number}: expected exactly 1 stored row, found ${hits.length}`);
      continue;
    }
    const hit = hits[0];
    if (hit.key && hit.key.toUpperCase() !== d.answer.toUpperCase()) {
      problems.push(`Q${d.number}: ANSWER MOVED — stored key ${hit.key}, answers file says ${d.answer}`);
      continue;
    }
    // Rebuild exactly what buildRecords would emit, so the two cannot drift.
    const text = (d.solution ?? d.reasoning).trim();
    // A control character here is ALWAYS corruption, never content. It arrives
    // when LaTeX is authored through a shell heredoc or a non-raw Python string:
    // UNKNOWN escapes survive (\( and \sqrt come through fine) but KNOWN ones do
    // not, so \approx becomes BEL + "pprox", \theta becomes TAB + "heta", \frac
    // becomes FF + "rac". It is invisible in a console and invisible in review.
    // One reached this bank -- 2023-I Q79 shipped `\sqrt{2353}<BEL>pprox 48.5`
    // -- and was found by an agent reading the file, not by any gate.
    //
    // REFUSE rather than strip. The source of record has to be corrected, or the
    // next re-apply silently reinstates it.
    // Tested by CODEPOINT, deliberately, not by a regex character class. Such a
    // class has to be written with escapes, which is exactly what gets eaten --
    // writing this very guard through a heredoc corrupted it twice, once into a
    // class of literal control BYTES (which works, but makes this file read as
    // binary to grep, hiding it from every text probe in the repo).
    const ctrl = [...text].find((ch) => {
      const n = ch.charCodeAt(0);
      return n < 32 && ch !== "\n" && ch !== "\t";
    });
    if (ctrl) {
      const code = ctrl.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0");
      problems.push(
        `Q${d.number}: control character U+${code} in the solution text — ` +
          `authored through a heredoc? Fix the answers file; do not strip it here.`,
      );
      continue;
    }
    if (text !== (hit.solution ?? "")) updates.push({ id: hit.id, solution: text, number: d.number });
  }

  if (problems.length) {
    console.error(`\nREFUSING (${problems.length} problem(s)):`);
    for (const x of problems.slice(0, 20)) console.error(`  - ${x}`);
    process.exit(1);
  }

  console.log(`${paper.id}: ${file.derivations.length} row(s) in file, ${updates.length} solution(s) differ from the bank.`);
  if (!apply) {
    for (const u of updates.slice(0, 5)) console.log(`  Q${u.number}: ${u.solution.slice(0, 110)}...`);
    console.log(`\n[dry-run] pass --apply to write. Nothing written.`);
    return;
  }

  let n = 0;
  for (const u of updates) {
    const { error: e } = await client.from("questions").update({ solution: u.solution }).eq("id", u.id);
    if (e) throw new Error(`update Q${u.number} failed: ${e.message}`);
    n++;
  }
  console.log(`updated ${n} solution(s). Answers, options and content_hash untouched.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
