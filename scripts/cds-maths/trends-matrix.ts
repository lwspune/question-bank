/**
 * Generate the CDS Maths chapter x sitting matrix for /guide/cds-maths/trends.
 *
 *   npm run cds:matrix            # rewrite src/app/guide/cds-maths/_data/matrix.generated.ts
 *   npm run cds:matrix -- --check # exit 1 if the committed file is stale
 *
 * 26 chapters x 21 sittings is past what a hand transcription can be trusted with, so the grid is
 * derived and committed (the page stays cached; the diff shows what an ingest moved). Re-run after
 * any CDS Maths ingest or chapter re-cut. Pages past PostgREST's 1000-row cap and reconciles the
 * fetched rows against an exact header count, so a short read fails instead of shrinking the table.
 * A row whose sitting cannot be read fails the run too. Pure core: scripts/lib/cdsTrendsMatrix.ts.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { buildCdsMatrix, type CdsRow } from "../lib/cdsTrendsMatrix";

const local = path.join(process.cwd(), ".env.local");
if (fs.existsSync(local)) require("dotenv").config({ path: local, override: true });

const OUT = path.join(process.cwd(), "src", "app", "guide", "cds-maths", "_data", "matrix.generated.ts");
const PAGE = 1000;
const CHECK = process.argv.includes("--check");

type Raw = { pyq_year: number | null; pyq_note: string | null; difficulty: string | null; chapters: { name: string } | null };

async function main() {
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data: exam, error: e1 } = await sb.from("exams").select("id").eq("name", "CDS").single();
  if (e1 || !exam) throw new Error(`exams: CDS not found (${e1?.message})`);
  const { data: subj, error: e2 } = await sb
    .from("subjects").select("id").eq("exam_id", exam.id).eq("name", "Mathematics").single();
  if (e2 || !subj) throw new Error(`subjects: CDS Mathematics not found (${e2?.message})`);

  const { count, error: e3 } = await sb
    .from("questions")
    .select("*", { count: "exact", head: true })
    .eq("exam_id", exam.id)
    .eq("subject_id", subj.id)
    .eq("visibility", "PUBLIC")
    .eq("question_kind", "pyq");
  if (e3) throw new Error(`head count failed: ${e3.message}`);
  const expected = count ?? 0;

  const raw: Raw[] = [];
  for (let from = 0; from < expected; from += PAGE) {
    const { data, error } = await sb
      .from("questions")
      .select("pyq_year, pyq_note, difficulty, chapters(name)")
      .eq("exam_id", exam.id)
      .eq("subject_id", subj.id)
      .eq("visibility", "PUBLIC")
      .eq("question_kind", "pyq")
      .order("id", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`page at ${from} failed: ${error.message}`);
    raw.push(...((data ?? []) as unknown as Raw[]));
  }
  if (raw.length !== expected) {
    throw new Error(`short read: fetched ${raw.length} rows, the bank reports ${expected}`);
  }

  const rows: CdsRow[] = raw.map((r) => {
    if (!r.chapters) throw new Error("a PUBLIC CDS Maths row has no chapter");
    return { pyq_year: r.pyq_year, pyq_note: r.pyq_note, difficulty: r.difficulty, chapter: r.chapters.name };
  });
  const m = buildCdsMatrix(rows);
  if (m.unparsed.length) {
    throw new Error(`${m.unparsed.length} row(s) name no readable sitting: ${JSON.stringify(m.unparsed.slice(0, 5))}`);
  }

  const text = render(m, rows.length);
  if (CHECK) {
    const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8").replace(/\r\n/g, "\n") : "";
    if (current !== text) {
      console.error("matrix.generated.ts is STALE — run `npm run cds:matrix` and commit the result.");
      process.exit(1);
    }
    console.log(`matrix.generated.ts is current (${m.papers.length} papers · ${m.rows.length} chapters · ${rows.length} q).`);
    return;
  }
  fs.writeFileSync(OUT, text);
  console.log(`wrote ${path.relative(process.cwd(), OUT)}: ${m.papers.length} papers · ${m.rows.length} chapters · ${rows.length} q`);
}

function render(m: ReturnType<typeof buildCdsMatrix>, total: number): string {
  const lines: string[] = [];
  lines.push("/**");
  lines.push(" * GENERATED FILE — do not edit by hand. Run `npm run cds:matrix`.");
  lines.push(" *");
  lines.push(" * The CDS Maths chapter x sitting matrix behind /guide/cds-maths/trends, derived from the live bank");
  lines.push(" * by scripts/cds-maths/trends-matrix.ts. `-- --check` fails if this file is stale.");
  lines.push(" *");
  lines.push(` * ${m.papers.length} papers · ${m.rows.length} chapters · ${total} PUBLIC PYQ questions.`);
  lines.push(" *");
  lines.push(" * Every CDS Maths paper is 100 questions, so raw counts compare across every column. A zero is a");
  lines.push(" * measured zero, not missing data.");
  lines.push(" */");
  lines.push('import type { MatrixPaper, MatrixRow } from "@/app/guide/_components/ExamPaperMatrix";');
  lines.push("");
  lines.push("export const PAPERS: MatrixPaper[] = [");
  for (const p of m.papers) lines.push(`  ${JSON.stringify(p)},`);
  lines.push("];");
  lines.push("");
  lines.push("/** Heaviest chapter first. Column i is PAPERS[i]. */");
  lines.push("export const CHAPTER_MATRIX: MatrixRow[] = [");
  for (const r of m.rows) lines.push(`  ${JSON.stringify(r)},`);
  lines.push("];");
  lines.push("");
  lines.push("/** Questions and HARD questions per paper. Aligned 1:1 to PAPERS. */");
  lines.push("export const PAPER_TOTALS: { id: string; total: number; hard: number }[] = [");
  for (const t of m.byPaper) lines.push(`  ${JSON.stringify(t)},`);
  lines.push("];");
  lines.push("");
  return lines.join("\n");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
