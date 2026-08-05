/**
 * Standing probe for long-form text defects that every other gate is blind to.
 *
 *   npm run audit:text            # whole bank
 *   npm run audit:text <substr>   # scope to a source_file substring
 *
 * Read-only triage, like `audit:keys` / `audit:omml`. Run after an ingest.
 *
 * Every class here silently degrades rendering rather than erroring:
 *
 * 1. LITERAL_NEWLINE — a two-character `\n` (backslash + n) where a real line
 *    break belongs. The render layer can't tell it from prose, so a GFM
 *    pipe-table authored with `\n` separators collapses into a run of raw
 *    `| a | b |` pipes on the website AND in the Word export. Reaches the DB
 *    when a script builds rows from an agent-written JSON that double-escaped
 *    its newlines. (`commitStaged` now rejects these at the boundary — this
 *    probe is the backstop for rows written before that guard existed, or by
 *    any path that bypasses it.)
 *
 * 2. TABLE_NO_SEPARATOR — consecutive pipe-heavy lines with no `|---|`
 *    separator row. GFM requires the separator; without it `parseTableBlocks`
 *    correctly treats the lines as prose, so the author's intended table
 *    renders as pipe soup. Deliberately uses the REAL parser rather than a
 *    regex, so the probe can never disagree with the renderer.
 *
 * 5. PANDOC_ARTIFACT — a pandoc extraction leftover that reaches the reader as
 *    literal markup: a hard-line-break backslash stranded in prose
 *    ("stability.\ (I) (II)"), a CJK full stop substituted for a period, or
 *    escaped punctuation (`\>`, `\"`). Six of the eight /dashboard/reports open
 *    on 2026-08-01 were this class, and the bank-wide sweep behind it repaired
 *    758 rows. Repairable in place — see scripts/audit-pandoc-artifacts.ts.
 *
 * Every detector reuses production helpers, so a false positive here is a real
 * disagreement worth investigating, not a probe artefact. Math zones are masked
 * by `normalizeNewlines` / `maskMathZones`, so `\neq` / `\nabla` / `\nu` and
 * matrix `\\` row separators are never flagged.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { normalizeNewlines } from "../src/lib/text/normalizeNewlines";
import { parseTableBlocks } from "../src/components/math/parseTableBlocks";
import { hasDroppedSymbol, leakedOptionValues } from "./lib/textProbes";
import { pandocArtifactCount, stripPandocArtifacts } from "./lib/pandocArtifacts";

const FIELDS = ["text", "context", "solution"] as const;
type Field = (typeof FIELDS)[number];

type Row = {
  id: string;
  source_file: string | null;
  question_number: string | null;
  visibility: string;
  text: string;
  context: string | null;
  solution: string | null;
  options: { text: string | null }[] | null;
};

type Finding = {
  id: string;
  source: string;
  qnum: string;
  visibility: string;
  field: Field;
  kind: "LITERAL_NEWLINE" | "TABLE_NO_SEPARATOR" | "DROPPED_SYMBOL" | "OPTION_LEAK" | "PANDOC_ARTIFACT";
  sample: string;
};

/** ≥2 consecutive lines that look like table rows (2+ pipes, not inline math). */
function looksLikeUnseparatedTable(value: string): boolean {
  if (parseTableBlocks(value).some((b) => b.kind === "table")) return false;
  const lines = value.split("\n");
  let run = 0;
  for (const line of lines) {
    const t = line.trim();
    const pipes = (t.match(/\|/g) ?? []).length;
    const rowish = t.startsWith("|") && pipes >= 2;
    run = rowish ? run + 1 : 0;
    if (run >= 2) return true;
  }
  return false;
}

function inspect(r: Row): Finding[] {
  const out: Finding[] = [];
  for (const field of FIELDS) {
    const value = r[field];
    if (typeof value !== "string" || !value) continue;
    const base = {
      id: r.id,
      source: r.source_file ?? "(none)",
      qnum: r.question_number ?? "(none)",
      visibility: r.visibility,
      field,
    };
    if (normalizeNewlines(value) !== value) {
      const at = value.indexOf("\\n");
      out.push({
        ...base,
        kind: "LITERAL_NEWLINE",
        sample: value.slice(Math.max(0, at - 40), at + 40).replace(/\n/g, "⏎"),
      });
      continue; // one finding per field is enough to action it
    }
    if (looksLikeUnseparatedTable(value)) {
      const at = value.indexOf("|");
      out.push({
        ...base,
        kind: "TABLE_NO_SEPARATOR",
        sample: value.slice(Math.max(0, at - 20), at + 90).replace(/\n/g, "⏎"),
      });
    }
    if (pandocArtifactCount(value) > 0) {
      const fixed = stripPandocArtifacts(value);
      let at = 0;
      while (at < value.length && value[at] === fixed[at]) at++;
      out.push({
        ...base,
        kind: "PANDOC_ARTIFACT",
        sample: value.slice(Math.max(0, at - 40), at + 45).replace(/\n/g, "⏎"),
      });
    }
  }

  // Stem-only probes (an option leak or a dropped object is meaningless in a solution).
  const stem = r.text;
  if (typeof stem === "string" && stem) {
    const base = {
      id: r.id,
      source: r.source_file ?? "(none)",
      qnum: r.question_number ?? "(none)",
      visibility: r.visibility,
      field: "text" as Field,
    };
    if (hasDroppedSymbol(stem)) {
      const at = stem.search(/\\\(\s*=/);
      out.push({ ...base, kind: "DROPPED_SYMBOL", sample: stem.slice(Math.max(0, at - 45), at + 45) });
    }
    const opts = (r.options ?? []).map((o) => o.text ?? "");
    if (opts.length && leakedOptionValues(stem, opts)) {
      out.push({ ...base, kind: "OPTION_LEAK", sample: stem.slice(Math.max(0, stem.length - 110)) });
    }
  }
  return out;
}

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const filter = process.argv[2];
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // Page past the PostgREST 1000-row cap — the bank is far larger than that.
  const findings: Finding[] = [];
  let scanned = 0;
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    let q = client
      .from("questions")
      .select("id, source_file, question_number, visibility, text, context, solution, options(text)")
      .order("id", { ascending: true })
      .range(from, from + PAGE - 1);
    if (filter) q = q.ilike("source_file", `%${filter}%`);
    const { data, error } = await q;
    if (error) throw new Error(`read failed: ${error.message}`);
    const rows = (data ?? []) as Row[];
    if (rows.length === 0) break;
    scanned += rows.length;
    for (const r of rows) findings.push(...inspect(r));
    if (rows.length < PAGE) break;
  }

  const byKind = (k: Finding["kind"]) => findings.filter((f) => f.kind === k);
  console.log(`audit:text — scanned ${scanned} question(s)${filter ? ` matching "${filter}"` : ""}\n`);

  // A filter matching nothing falls through to "clean." below, which reads as
  // a pass. Say so loudly instead — the likeliest cause is a typo'd or
  // over-specific substring, not a clean bank.
  if (filter && scanned === 0) {
    console.log(
      `⚠  NOTHING SCANNED — no question has a source_file containing "${filter}".\n` +
        `   This is NOT a clean result. Check the substring against:\n` +
        `     select distinct source_file from questions;`
    );
    process.exitCode = 1;
    return;
  }

  for (const kind of ["LITERAL_NEWLINE", "TABLE_NO_SEPARATOR", "DROPPED_SYMBOL", "OPTION_LEAK", "PANDOC_ARTIFACT"] as const) {
    const hits = byKind(kind);
    console.log(`${kind}: ${hits.length}`);
    for (const f of hits.slice(0, 40)) {
      console.log(`  [${f.visibility}] ${f.source} ${f.qnum} .${f.field}`);
      console.log(`      …${f.sample}…`);
    }
    if (hits.length > 40) console.log(`  … and ${hits.length - 40} more`);
    console.log("");
  }

  if (findings.length === 0) console.log("clean.");
  // Triage tool, not a gate: always exit 0 so it can run after an ingest
  // without failing a script chain. Read the counts.
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
