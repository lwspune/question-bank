/**
 * Post-commit verification of a board-PYQ chapter, read back FROM THE DATABASE.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/verify-db.ts <chapterId>
 *
 * Reads the committed rows rather than the source JSON on purpose: the source is
 * what we intended, the rows are what shipped, and every defect worth catching
 * lives in the gap between them.
 *
 * Covers the structural key classes the practice-bank `audit:keys` probe checks
 * (not-exactly-4-options, not-exactly-1-correct, duplicate options) — that probe
 * filters question_kind='practice' and so cannot see a pyq row at all; it says so
 * loudly rather than reporting a false clean, which is how this gap was found.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_ID, requireChapter } from "./config";
import { probeRow } from "./textProbes";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Opt = { label: string; text: string; is_correct: boolean };

async function main() {
  const id = process.argv[2];
  const ch = requireChapter(id);
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: rows, error } = await client
    .from("questions")
    .select("id,question_number,pyq_year,pyq_month,visibility,question_kind,question_format,difficulty,text,solution,image_url,subtopic_id,options(label,text,is_correct)")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", ch.sourceFile);
  if (error) throw new Error(error.message);
  if (!rows?.length) throw new Error(`no rows for ${ch.sourceFile}`);

  // Fetch ONLY the subtopics these rows use. An unfiltered `select` on this
  // table is silently truncated at 1000 rows by PostgREST while the bank holds
  // ~4,900 — which made every row here report "unfiled" on the first run. The
  // id list is tiny (one chapter's worth), well under the ~200 `.in()` limit.
  const subIds = [...new Set(rows.map((r) => r.subtopic_id).filter(Boolean))] as string[];
  const { data: subs, error: sErr } = await client.from("subtopics").select("id,name").in("id", subIds);
  if (sErr) throw new Error(sErr.message);
  const subName = Object.fromEntries((subs ?? []).map((s) => [s.id, s.name]));

  const problems: string[] = [];
  const tag = (r: { question_number: string | null; pyq_year: number | null }) =>
    `${r.question_number} (${r.pyq_year})`;

  for (const r of rows) {
    if (r.question_kind !== "pyq") problems.push(`${tag(r)}: question_kind=${r.question_kind}`);
    if (!r.pyq_year) problems.push(`${tag(r)}: no pyq_year`);
    if (!r.difficulty) problems.push(`${tag(r)}: no difficulty`);
    if (!r.solution?.trim()) problems.push(`${tag(r)}: no solution`);
    if (!subName[r.subtopic_id as string]) problems.push(`${tag(r)}: unfiled subtopic`);

    const opts = (r.options ?? []) as Opt[];
    if (r.question_format === "mcq") {
      if (opts.length !== 4) problems.push(`${tag(r)}: ${opts.length} options, expected 4`);
      const correct = opts.filter((o) => o.is_correct).length;
      if (correct !== 1) problems.push(`${tag(r)}: ${correct} options marked correct`);
      const texts = opts.map((o) => o.text.trim());
      if (new Set(texts).size !== texts.length) problems.push(`${tag(r)}: duplicate option text`);
    } else if (opts.length) {
      problems.push(`${tag(r)}: subjective row carries ${opts.length} options`);
    }

    for (const d of probeRow(tag(r), [
      ["text", r.text ?? ""],
      ["solution", r.solution ?? ""],
      ...opts.map((o) => [`option ${o.label}`, o.text] as [string, string]),
    ])) {
      problems.push(`${d.ref} ${d.field}: ${d.reason}`);
    }
  }

  const pub = rows.filter((r) => r.visibility === "PUBLIC").length;
  const figs = rows.filter((r) => r.image_url).length;
  const sittings = new Set(rows.map((r) => `${r.pyq_month ?? "?"} ${r.pyq_year}`));
  const mcq = rows.filter((r) => r.question_format === "mcq").length;

  console.log(`${ch.chapterName} — ${rows.length} rows in the DB`);
  console.log(`  PUBLIC ${pub} | PRIVATE ${rows.length - pub}`);
  console.log(`  mcq ${mcq} | subjective ${rows.length - mcq} | figures ${figs}`);
  console.log(`  sittings ${sittings.size}: ${[...sittings].sort().join(" · ")}`);
  const bySub = new Map<string, number>();
  for (const r of rows) {
    const n = subName[r.subtopic_id as string] ?? "(unfiled)";
    bySub.set(n, (bySub.get(n) ?? 0) + 1);
  }
  for (const [k, n] of [...bySub].sort()) console.log(`    ${String(n).padStart(3)}  ${k}`);

  console.log(problems.length ? `\nPROBLEMS (${problems.length}):` : "\nclean.");
  for (const p of problems) console.log(`  ${p}`);
  if (problems.length) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
