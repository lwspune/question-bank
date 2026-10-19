/**
 * Make board answers' bare figure citations honest (citeTextbookFigures).
 *
 *   npx tsx scripts/solution-figures/cite-textbook.ts            # dry run: writes out/cite-textbook/plan.json
 *   npx tsx scripts/solution-figures/cite-textbook.ts --apply    # rewrites the AUTO rows
 *
 * Reads the answers `audit:figures` reports as SOLUTION-CITES-NO-IMAGE (a
 * solution leaning on a figure neither it nor its question carries). For a
 * BOARD exam, where the student has the textbook, a bare "Fig. 6.7" becomes
 * "the textbook's Fig. 6.7". A row goes to MANUAL instead when it is not a
 * board exam (a competitive paper's "figure" is the paper's own), or when the
 * rewrite leaves it still citing something (a "[diagram]" placeholder, "the
 * figure at the end of this answer"). Re-running after --apply finds nothing.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { citeTextbookFigures, solutionCitesFigure } from "../lib/figureRefs";

const BOARD = new Set([
  "CBSE Class 10", "CBSE Class 11", "CBSE Class 12", "Maharashtra HSC Class 12",
  "Maharashtra State Board Class 9", "Maharashtra State Board Class 10", "Maharashtra State Board Class 11",
]);

type Row = { id: string; question_number: string | null; source_file: string | null; solution: string | null; exams: { name: string } | null };

async function main() {
  const apply = process.argv.includes("--apply");
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

  const rows: Row[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("id,question_number,source_file,solution,exams(name)")
      .is("solution_image_url", null)
      .is("image_url", null)
      .or("solution.ilike.*fig*,solution.ilike.*diagram]*,solution.ilike.*graph]*,solution.ilike.*end of this answer*")
      .order("id")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    rows.push(...((data ?? []) as unknown as Row[]));
    if (!data || data.length < 1000) break;
  }

  const auto: { id: string; exam: string; before: string; after: string }[] = [];
  const manual: { id: string; exam: string; ref: string; why: string; solution: string }[] = [];
  for (const r of rows) {
    const sol = r.solution ?? "";
    if (!solutionCitesFigure(sol)) continue;
    const exam = r.exams?.name ?? "?";
    const next = citeTextbookFigures(sol);
    if (!BOARD.has(exam)) manual.push({ id: r.id, exam, ref: `${r.source_file} ${r.question_number ?? ""}`, why: "not a board exam", solution: sol });
    else if (next === sol || solutionCitesFigure(next)) manual.push({ id: r.id, exam, ref: `${r.source_file} ${r.question_number ?? ""}`, why: "still cites a figure after the rewrite", solution: sol });
    else auto.push({ id: r.id, exam, before: sol, after: next });
  }

  const outdir = join(__dirname, "out", "cite-textbook");
  mkdirSync(outdir, { recursive: true });
  writeFileSync(join(outdir, "plan.json"), JSON.stringify({ auto, manual }, null, 1));
  console.log(`${auto.length} auto rewrites, ${manual.length} for a person; plan: ${join(outdir, "plan.json")}`);
  if (!apply) return;
  for (const a of auto) {
    const { error } = await db.from("questions").update({ solution: a.after }).eq("id", a.id).eq("solution", a.before);
    if (error) throw new Error(`${a.id}: ${error.message}`);
  }
  console.log(`applied ${auto.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
