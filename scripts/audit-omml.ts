/**
 * Bank-wide OMML-export audit — `npm run audit:omml`.
 *
 * Runs every question's math (text / context / solution / options) through the
 * SAME conversion the docx exporter uses (findOmmlFailures → latexToOmml). Any
 * hit is a math zone that temml → mml2omml can't turn into OMML, so the Word
 * export silently falls back to raw \(...\) LaTeX — an unprofessional but
 * "readable" paper. Construct-agnostic: it flags the known nested-prime
 * complement crash (`(B' \cap A)'`) AND any future mml2omml failure.
 *
 * Read-only. Paginates past the PostgREST 1000-row cap; caches per distinct
 * field string (options/stems repeat heavily). Writes a grouped report to
 * generated-papers/omml-sweep.md (gitignored). Too heavy for the prepush gate
 * (temml+mml2omml over the whole bank) — run on demand after a new ingest.
 */
import { join } from "node:path";
import { writeFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { findOmmlFailures } from "../src/lib/export/ommlAudit";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Opt = { label: string; text: string | null };
type Row = {
  id: string;
  question_number: string | null;
  source_file: string | null;
  visibility: string;
  text: string;
  context: string | null;
  solution: string | null;
  options: Opt[];
};

type Finding = {
  id: string;
  qnum: string | null;
  source: string | null;
  visibility: string;
  field: string;
  latex: string;
};

// Cache findOmmlFailures per distinct field string — options and set-shared
// context/stems repeat across thousands of rows.
const cache = new Map<string, ReturnType<typeof findOmmlFailures>>();
const check = (s: string) => {
  let hit = cache.get(s);
  if (!hit) {
    hit = findOmmlFailures(s);
    cache.set(s, hit);
  }
  return hit;
};

async function main() {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // Optional `source_file` substring, matching `audit:text` / `audit:keys`.
  // Unfiltered this reads all ~37,600 questions with their text, context,
  // solution and option text — ~30 MB of egress, about a full `next build`'s
  // worth — and after an ingest only the new rows are unvetted. Applied IN THE
  // QUERY, so scoping genuinely reduces rows fetched rather than rows printed.
  // `ilike` (not `like`) so a lowercase filter matches a mixed-case
  // source_file — the case-sensitivity bug that made `audit:keys` silently
  // scan 0 rows while reporting "clean" (fixed 2026-08-05).
  const filter = process.argv[2];

  const PAGE = 1000;
  let from = 0;
  let total = 0;
  const findings: Finding[] = [];
  const byVisibility: Record<string, number> = {};

  for (;;) {
    let q = client
      .from("questions")
      .select(
        "id, question_number, source_file, visibility, text, context, solution, options(label, text)"
      )
      .order("id")
      .range(from, from + PAGE - 1);
    if (filter) q = q.ilike("source_file", `%${filter}%`);
    const { data, error } = await q;
    if (error) throw new Error(error.message);
    const rows = (data ?? []) as Row[];
    if (rows.length === 0) break;
    total += rows.length;

    for (const r of rows) {
      const fields: [string, string | null][] = [
        ["text", r.text],
        ["context", r.context],
        ["solution", r.solution],
        ...r.options.map((o) => [`opt ${o.label}`, o.text] as [string, string | null]),
      ];
      for (const [field, val] of fields) {
        if (!val) continue;
        for (const fail of check(val)) {
          findings.push({
            id: r.id,
            qnum: r.question_number,
            source: r.source_file,
            visibility: r.visibility,
            field,
            latex: fail.latex,
          });
          byVisibility[r.visibility] = (byVisibility[r.visibility] ?? 0) + 1;
        }
      }
    }

    process.stderr.write(`  scanned ${total}\r`);
    if (rows.length < PAGE) break;
    from += PAGE;
  }

  // A filter that matches nothing scans 0 rows, finds 0 zones and writes a
  // report saying so — indistinguishable from a clean bank. Say it loudly and
  // exit non-zero instead, and do NOT overwrite the existing report with an
  // empty one. Likeliest cause is a typo'd or over-specific substring.
  if (filter && total === 0) {
    console.log(
      `\n⚠  NOTHING SCANNED — no question has a source_file containing "${filter}".` +
        `\n   This is NOT a clean result, and ${join("generated-papers", "omml-sweep.md")} was left untouched.` +
        `\n   Check the substring against:  select distinct source_file from questions;`
    );
    process.exitCode = 1;
    return;
  }

  const affectedRows = new Set(findings.map((f) => f.id));

  const lines: string[] = [];
  // The heading must state the scope: a filtered report that claims to be
  // bank-wide reads as an all-clear for questions it never looked at.
  lines.push(
    filter
      ? `# OMML-export sweep — SCOPED to source_file ~ "${filter}" (NOT bank-wide)`
      : `# Bank-wide OMML-export sweep`
  );
  lines.push(``);
  lines.push(`Questions scanned: ${total}`);
  lines.push(`Distinct math strings checked: ${cache.size}`);
  lines.push(`Failing math zones (raw): ${findings.length}`);
  lines.push(`Affected questions (distinct): ${affectedRows.size}`);
  lines.push(`Failing zones by visibility: ${JSON.stringify(byVisibility)}`);
  lines.push(``);
  lines.push(`## Findings by source file`);
  const bySource: Record<string, Finding[]> = {};
  for (const f of findings) (bySource[f.source ?? "(null)"] ??= []).push(f);
  for (const [src, fs] of Object.entries(bySource).sort((a, b) => b[1].length - a[1].length)) {
    lines.push(``);
    lines.push(`### ${src}  (${fs.length})`);
    for (const f of fs)
      lines.push(
        `- [${f.visibility}] Q${f.qnum ?? "?"} ${f.field} :: \`${f.latex.slice(0, 80)}\`  {${f.id}}`
      );
  }

  const outPath = join(process.cwd(), "generated-papers", "omml-sweep.md");
  writeFileSync(outPath, lines.join("\n"));

  console.log(`\n\nQuestions scanned: ${total}`);
  console.log(`Failing math zones: ${findings.length}`);
  console.log(`Affected questions: ${affectedRows.size}`);
  console.log(`By visibility:`, byVisibility);
  console.log(`Report: ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
