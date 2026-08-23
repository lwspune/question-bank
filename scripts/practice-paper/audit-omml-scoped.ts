/**
 * OMML export audit scoped to ONE paper's rows, via an EXACT `source_file`
 * match rather than the leading-wildcard `ilike` + wide-payload sort that
 * `npm run audit:omml` uses — that shape is a full scan of the whole
 * `questions` table and reliably trips the anon/authenticated statement
 * timeout on a bank this size.
 *
 * Same conversion as the real docx exporter (`findOmmlFailures` -> `latexToOmml`),
 * so a hit here is a math zone that would land in a teacher's downloaded Word
 * paper as RAW LATEX. Those are invisible on the website, because KaTeX renders
 * the very forms the OMML converter refuses.
 *
 *   npx tsx scripts/practice-paper/audit-omml-scoped.ts <slug>
 *
 * Tooling for the ingest core, NOT a committed data artifact.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { findOmmlFailures } from "../../src/lib/export/ommlAudit";
import { PAPERS, examIdOf } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");

const slug = process.argv[2];
const spec = PAPERS[slug];
if (!spec) throw new Error(`unknown paper slug ${JSON.stringify(slug)}`);

type Row = {
  question_number: string | null;
  text: string | null;
  context: string | null;
  solution: string | null;
  options: { label: string; text: string }[] | null;
};

async function main() {
  const db = createClient(url!, key!, { auth: { persistSession: false } });
  const { data, error } = await db
    .from("questions")
    .select("question_number, text, context, solution, options(label, text)")
    .eq("exam_id", examIdOf(spec))
    .eq("source_file", spec.sourceFile);
  if (error) throw new Error(error.message);

  const rows = (data ?? []) as Row[];
  let zones = 0;
  const findings: string[] = [];

  for (const r of rows) {
    const fields: [string, string | null][] = [
      ["text", r.text],
      ["context", r.context],
      ["solution", r.solution],
      ...(r.options ?? []).map(
        (o) => [`option ${o.label}`, o.text] as [string, string | null]
      ),
    ];
    for (const [field, value] of fields) {
      if (!value) continue;
      // findOmmlFailures returns OmmlFailure[] directly.
      zones += (value.match(/\\\(/g) ?? []).length;
      for (const f of findOmmlFailures(value)) {
        const why = f.reason + (f.detail ? `: ${f.detail}` : "");
        findings.push(`  Q${r.question_number ?? "?"}  ${field}  ${f.latex}  -> ${why}`);
      }
    }
  }

  console.log(
    `audit:omml (scoped) — ${rows.length} row(s), source_file="${spec.sourceFile}", ${zones} math zone(s)`
  );
  if (findings.length === 0) {
    console.log("clean — 0 failing zones.");
    return;
  }
  console.log(`${findings.length} FAILING ZONE(S):`);
  console.log(findings.join("\n"));
  process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
