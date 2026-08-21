/**
 * OMML export probe for the CBSE Class-12 board PYQ corpus.
 *
 *   npx tsx scripts/cbse-12-pyq/audit-omml.ts
 *
 * WHY A LOCAL COPY. The shared `npm run audit:omml` selects a WIDE row shape
 * (text + context + solution + every option) filtered by `ilike source_file`
 * and ordered by id. `ilike` cannot use an index, so Postgres scans and SORTS
 * all ~49k rows at ~1 kB each to return the CBSE subset — the exact wide-sort
 * pathology recorded for `/browse` on 2026-08-05 — and it dies on a statement
 * timeout before returning a single row. Filtering on `exam_id` rides
 * `questions_filter_idx` instead.
 *
 * It reuses `findOmmlFailures` VERBATIM. A second implementation would be free
 * to disagree with the exporter, which is the whole failure being avoided: a
 * hit here is precisely a raw-LaTeX fallback in a teacher's Word download.
 *
 * These rows render fine on the WEB either way — KaTeX handles constructs
 * mml2omml cannot — so this class is invisible on /board and /browse and
 * surfaces only in the .docx. That is why it gets its own gate.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { findOmmlFailures } from "../../src/lib/export/ommlAudit";
import { ORG_ID, EXAM_ID_CBSE_12 } from "./config";

type Row = {
  id: string; question_number: string; source_file: string;
  text: string | null; context: string | null; solution: string | null;
  options: { label: string; text: string }[];
};

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const rows: Row[] = [];
  for (let from = 0; ; from += 500) {
    const { data, error } = await client.from("questions")
      .select("id, question_number, source_file, text, context, solution, options(label, text)")
      .eq("org_id", ORG_ID).eq("exam_id", EXAM_ID_CBSE_12).eq("question_kind", "pyq")
      .order("id").range(from, from + 499);
    if (error) throw new Error(error.message);
    rows.push(...(data as never as Row[]));
    if (!data || data.length < 500) break;
  }

  if (!rows.length) {
    console.log("\n⚠  NOTHING SCANNED — this is NOT a clean result.");
    process.exit(1);
  }

  let zones = 0, withSolution = 0;
  const hits: string[] = [];
  for (const r of rows) {
    if (r.solution) withSolution++;
    const fields: [string, string | null][] = [
      ["text", r.text], ["context", r.context], ["solution", r.solution],
      ...r.options.map((o) => [`opt ${o.label}`, o.text] as [string, string | null]),
    ];
    for (const [field, val] of fields) {
      if (!val) continue;
      for (const f of findOmmlFailures(val)) {
        zones++;
        hits.push(`${r.source_file} Q${r.question_number} [${field}] ${f.reason}${f.detail ? ` (${f.detail})` : ""}: ${f.latex.slice(0, 120)}`);
      }
    }
  }

  console.log(`Scanned ${rows.length} pyq row(s) | ${withSolution} carry a solution`);
  console.log(`  failing math zones: ${zones}`);
  for (const h of hits) console.log(`    ${h}`);
  if (!zones) console.log(`\nclean.`);
}

main().catch((e) => { console.error(e.message ?? e); process.exit(1); });
