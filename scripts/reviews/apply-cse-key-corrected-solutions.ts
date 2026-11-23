/**
 * Rewrite the 83 UPSC CSE solutions whose letter came from UPSC's key over the
 * blind derivation (2026-11-20, SUGGESTIONS.md ledger "83 PUBLIC CSE solutions argue
 * for an answer UPSC's key rejected"; owner: rewrite them).
 *
 *   npx tsx --env-file=<.env.local> scripts/reviews/apply-cse-key-corrected-solutions.ts [--apply]
 *
 * Each kept its working for the derived letter plus a bracket saying so, so a student
 * read a full argument for the wrong option. The new solutions (data/2026-11-20-...)
 * argue for UPSC's answer; 13 whose key is arguable as printed open with a notice and
 * ride as grace in mocks (src/lib/mocks/flawed.json). Solution text only: content_hash
 * is unchanged. Writes the answers JSON (source of record) and the bank together;
 * each DB write is guarded on the text it read, and a row whose bank text no longer
 * matches the JSON is reported and skipped.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { solutionProblems } from "../lib/solutionText";

const APPLY = process.argv.includes("--apply");
type Rewrite = { paper: string; number: number; reasoning: string };
const REWRITES: Rewrite[] = JSON.parse(
  readFileSync(join("scripts", "reviews", "data", "2026-11-20-cse-key-corrected-solutions.json"), "utf8")
);
const MARKER = /retained so the disagreement is visible/;

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: exam, error: ee } = await db.from("exams").select("id").eq("name", "UPSC CSE (Prelims)").single();
  if (ee) throw new Error(ee.message);

  const byPaper = new Map<string, Rewrite[]>();
  for (const r of REWRITES) byPaper.set(r.paper, [...(byPaper.get(r.paper) ?? []), r]);

  let written = 0;
  const notes: string[] = [];
  for (const [paper, rows] of byPaper) {
    const path = join("scripts", "upsc", "data", `${paper}.answers.json`);
    const raw = readFileSync(path, "utf8");
    const doc = JSON.parse(raw);
    for (const r of rows) {
      const a = doc.answers.find((x: { number: number }) => x.number === r.number);
      if (!a) throw new Error(`${paper} Q${r.number}: not in the answers file`);
      if (!MARKER.test(a.reasoning)) {
        notes.push(`${paper} Q${r.number}: already rewritten in the JSON`);
        continue;
      }
      const problems = solutionProblems(r.reasoning);
      if (problems.length) throw new Error(`${paper} Q${r.number}: ${problems.join("; ")}`);
      const old = a.reasoning as string;
      const { data, error } = await db.from("questions").select("id, solution").eq("exam_id", exam.id).eq("solution", old);
      if (error) throw new Error(error.message);
      if (data.length !== 1) {
        notes.push(`${paper} Q${r.number}: ${data.length} bank rows hold the JSON's text; skipped`);
        continue;
      }
      a.reasoning = r.reasoning;
      if (!APPLY) continue;
      const { data: w, error: ue } = await db
        .from("questions").update({ solution: r.reasoning }).eq("id", data[0].id).eq("solution", old).select("id");
      if (ue) throw new Error(ue.message);
      if (w?.length === 1) written++;
    }
    if (APPLY) writeFileSync(path, JSON.stringify(doc, null, 2) + (raw.endsWith("\n") ? "\n" : ""));
  }
  for (const n of notes) console.log(n);
  console.log(`${APPLY ? "APPLIED" : "DRY RUN"}: ${REWRITES.length} rewrites${APPLY ? `, ${written} bank rows written` : ""}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
