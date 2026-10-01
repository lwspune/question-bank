/**
 * Generate a JEE Mains subject's chapter x year matrix for its /guide.
 *
 *   npm run jee:matrix                               # Maths: src/app/guide/jee-mains-maths/_data/matrix.generated.ts
 *   npm run jee:matrix -- --subject=Chemistry        # Chemistry: src/app/guide/jee-mains-chemistry/_data/matrix.generated.ts
 *   npm run jee:matrix -- --check [--subject=...]    # exit 1 if the committed file is stale
 *
 * Chemistry also counts CALCULATION rows per chapter (numeric answers + all-number MCQs, see
 * isCalculationRow) — the measure its strategy strands are drawn on — so it reads option texts too.
 *
 * Every rate the guide prints (chapter table, tiers, playbooks, trends) is computed from this file, so
 * no page types a count. Re-run after any JEE Maths ingest, key fix that moves a row, or chapter
 * re-cut. Pages past PostgREST's 1000-row cap and reconciles the fetched rows against an exact header
 * count, so a short read fails instead of shrinking the table. Pure core: src/lib/guide/jeeTrendsMatrix.ts.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { buildJeeMatrix, isCalculationRow, type JeeRow } from "../../src/lib/guide/jeeTrendsMatrix";

const local = path.join(process.cwd(), ".env.local");
if (fs.existsSync(local)) require("dotenv").config({ path: local, override: true });

const SUBJECTS = {
  Maths: { route: "jee-mains-maths", countCalc: false },
  Chemistry: { route: "jee-mains-chemistry", countCalc: true },
} as const;
type Subject = keyof typeof SUBJECTS;
const SUBJECT = (process.argv.find((a) => a.startsWith("--subject="))?.slice("--subject=".length) ?? "Maths") as Subject;
if (!(SUBJECT in SUBJECTS)) throw new Error(`--subject must be one of ${Object.keys(SUBJECTS).join(", ")}`);
const CFG = SUBJECTS[SUBJECT];
const CMD = SUBJECT === "Maths" ? "npm run jee:matrix" : `npm run jee:matrix -- --subject=${SUBJECT}`;
const OUT = path.join(process.cwd(), "src", "app", "guide", CFG.route, "_data", "matrix.generated.ts");
const PAGE = 1000;
const CHECK = process.argv.includes("--check");
const FROM_YEAR = 2021;

type Raw = {
  pyq_year: number | null;
  question_format: string | null;
  chapters: { name: string } | null;
  options?: { text: string }[];
};

async function main() {
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data: exam, error: e1 } = await sb.from("exams").select("id").eq("name", "JEE Mains").single();
  if (e1 || !exam) throw new Error(`exams: JEE Mains not found (${e1?.message})`);
  const { data: subj, error: e2 } = await sb
    .from("subjects").select("id").eq("exam_id", exam.id).eq("name", SUBJECT).single();
  if (e2 || !subj) throw new Error(`subjects: JEE ${SUBJECT} not found (${e2?.message})`);

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
      .select(CFG.countCalc ? "pyq_year, question_format, chapters(name), options(text)" : "pyq_year, question_format, chapters(name)")
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

  const rows: JeeRow[] = raw.map((r) => {
    if (!r.chapters) throw new Error(`a PUBLIC JEE ${SUBJECT} row has no chapter`);
    const row: JeeRow = { pyq_year: r.pyq_year, question_format: r.question_format, chapter: r.chapters.name };
    if (CFG.countCalc) row.calc = isCalculationRow(r.question_format, (r.options ?? []).map((o) => o.text));
    return row;
  });
  const m = buildJeeMatrix(rows, { fromYear: FROM_YEAR, countCalc: CFG.countCalc });

  const text = render(m);
  const summary = `${m.years.length} years · ${m.rows.length} chapters · ${rows.length - m.excluded} q (${m.excluded} before ${FROM_YEAR} left out)`;
  if (CHECK) {
    const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8").replace(/\r\n/g, "\n") : "";
    if (current !== text) {
      console.error(`matrix.generated.ts is STALE — run \`${CMD}\` and commit the result.`);
      process.exit(1);
    }
    console.log(`matrix.generated.ts is current (${summary}).`);
    return;
  }
  fs.writeFileSync(OUT, text);
  console.log(`wrote ${path.relative(process.cwd(), OUT)}: ${summary}`);
}

function render(m: ReturnType<typeof buildJeeMatrix>): string {
  const total = m.years.reduce((s, y) => s + y.total, 0);
  const lines: string[] = [];
  lines.push("/**");
  lines.push(` * GENERATED FILE — do not edit by hand. Run \`${CMD}\`.`);
  lines.push(" *");
  lines.push(` * The JEE Mains ${SUBJECT} chapter x year matrix behind /guide/${CFG.route}, derived from the live`);
  lines.push(" * bank by scripts/jee-maths/trends-matrix.ts. `-- --check` fails if this file is stale.");
  lines.push(" *");
  lines.push(` * ${m.years.length} years · ${m.rows.length} chapters · ${total} PUBLIC PYQ questions from ${FROM_YEAR} on`);
  lines.push(` * (${m.excluded} earlier reprints left out).`);
  lines.push(" *");
  lines.push(` * Raw counts do NOT compare across years (papers before 2025 printed 30 ${SUBJECT} questions, from 2025`);
  lines.push(" * 25, and the number of sittings varies); a chapter's share of its year does. Read rates through");
  lines.push(" * `perPaper` / `windowPerPaper` in src/lib/guide/jeeTrendsMatrix.ts.");
  lines.push(" */");
  lines.push('import type { JeeMatrixRow, JeeYear } from "@/lib/guide/jeeTrendsMatrix";');
  lines.push("");
  lines.push("export const YEARS: JeeYear[] = [");
  for (const y of m.years) lines.push(`  ${JSON.stringify(y)},`);
  lines.push("];");
  lines.push("");
  lines.push("/** Heaviest chapter first. Column i is YEARS[i]. */");
  lines.push("export const CHAPTER_MATRIX: JeeMatrixRow[] = [");
  for (const r of m.rows) lines.push(`  ${JSON.stringify(r)},`);
  lines.push("];");
  lines.push("");
  lines.push(`/** PYQ rows before ${FROM_YEAR} (reprints), left out of every rate. */`);
  lines.push(`export const EXCLUDED_BEFORE_${FROM_YEAR} = ${m.excluded};`);
  lines.push("");
  return lines.join("\n");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
