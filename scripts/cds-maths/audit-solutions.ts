/**
 * Standing probe over the STUDENT-FACING solution text of this exam's rows.
 *
 *   npx tsx scripts/cds-maths/audit-solutions.ts            # whole subject
 *   npx tsx scripts/cds-maths/audit-solutions.ts 2023-1     # one paper
 *   npx tsx scripts/cds-maths/audit-solutions.ts --json     # machine-readable work list
 *
 * It exists because `reasoning` serves two audiences. The derivation brief
 * requires it to name the runner-up and say what would flip the answer -- that
 * is exactly what a REVIEWER needs on a disputed row, and exactly what a
 * STUDENT must never see. buildRecords pipes the same string into
 * `questions.solution`, so without this probe the leak is invisible: the row
 * commits, every other gate passes, and the defect is only findable by reading.
 *
 * TRIAGE, not a gate. It exits 0 with findings; publishing is not blocked on it.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_ID, PAPERS } from "./config";
import { auditSolution, type SolutionFinding } from "./solutionText";

/** Mathematics only. The exam also holds CDS English and CDS General Knowledge,
 *  which are different corpora with their own pipelines and their own briefs. */
const SUBJECT_ID = "0125d780-02fe-484b-bd32-6a232dc3ca62";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Row = { id: string; question_number: string | null; source_file: string | null; solution: string | null };

async function main() {
  const args = process.argv.slice(2);
  const json = args.includes("--json");
  const paperId = args.find((a) => !a.startsWith("--"));
  const sourceFile = paperId ? PAPERS[paperId]?.sourceFile : undefined;
  if (paperId && !sourceFile) throw new Error(`unknown paper "${paperId}"`);

  loadEnv();
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  // Page rather than a bare select: this table is far past the PostgREST
  // 1000-row cap, and a truncated audit reads exactly like a clean one.
  const rows: Row[] = [];
  for (let from = 0; ; from += 1000) {
    let q = client
      .from("questions")
      .select("id, question_number, source_file, solution")
      .eq("exam_id", EXAM_ID)
      .eq("subject_id", SUBJECT_ID)
      .not("solution", "is", null)
      .order("source_file")
      .order("question_number")
      .range(from, from + 999);
    if (sourceFile) q = q.eq("source_file", sourceFile);
    const { data, error } = await q;
    if (error) throw new Error(`read failed: ${error.message}`);
    rows.push(...((data ?? []) as Row[]));
    if (!data || data.length < 1000) break;
  }

  const flagged: { row: Row; findings: SolutionFinding[] }[] = [];
  for (const r of rows) {
    const f = auditSolution(r.solution ?? "");
    if (f.length) flagged.push({ row: r, findings: f });
  }

  if (json) {
    console.log(
      JSON.stringify(
        flagged.map(({ row, findings }) => ({
          id: row.id,
          paper: row.source_file,
          number: row.question_number,
          kinds: [...new Set(findings.map((f) => f.kind))],
          findings: findings.map((f) => `${f.kind}: ${f.detail}`),
        })),
        null,
        2,
      ),
    );
    return;
  }

  const byKind = new Map<string, number>();
  for (const { findings } of flagged) {
    for (const k of new Set(findings.map((f) => f.kind))) byKind.set(k, (byKind.get(k) ?? 0) + 1);
  }

  console.log(`\nscanned ${rows.length} solution(s)${paperId ? ` in ${paperId}` : ""}`);
  console.log(`flagged ${flagged.length} row(s)\n`);
  for (const [k, n] of [...byKind].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${k.padEnd(20)} ${String(n).padStart(4)} row(s)`);
  }

  const byPaper = new Map<string, number>();
  for (const { row } of flagged) byPaper.set(row.source_file ?? "?", (byPaper.get(row.source_file ?? "?") ?? 0) + 1);
  console.log("\nby paper:");
  for (const [p, n] of [...byPaper].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${p.padEnd(26)} ${String(n).padStart(4)}`);
  }

  if (flagged.length) {
    console.log("\nfirst 10 findings:");
    for (const { row, findings } of flagged.slice(0, 10)) {
      console.log(`  ${row.source_file} Q${row.question_number}`);
      for (const f of findings) console.log(`      ${f.kind}: ${f.detail}`);
    }
  }
  console.log(
    "\nTRIAGE, not a gate. A clean run means none of the KNOWN defects are present,\n" +
      "never that a solution reads well. Pass --json for the work list.",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
