/**
 * Rewrite math zones the docx exporter CANNOT convert to OMML.
 *
 *   npx tsx scripts/cbse-12-pyq/fix-omml-zones.ts
 *   npx tsx scripts/cbse-12-pyq/fix-omml-zones.ts --apply
 *
 * THE DEFECT IS INVISIBLE ON THE WEBSITE. KaTeX renders a prime on a
 * parenthesised group containing `\cup`/`\cap` perfectly, so `/browse` and
 * `/board` look right; mml2omml chokes on it, and the exporter falls back to
 * emitting the raw `\(...\)` LaTeX as plain text. So the only person who ever
 * sees it is a teacher opening a downloaded Word answer key — which is exactly
 * why it gets a gate of its own rather than being left to visual review.
 *
 * `\overline{...}` is the ONLY passing form. That is measured, not assumed: the
 * project's NCERT Class-11 ingest tested `^{c}`, `{(...)}'`, `\left(...\right)'`
 * and `^{\prime}` against the real converter and ALL of them fail too, while a
 * prime on a bare symbol (`A'`) is fine. Do not invent a fifth candidate — test
 * it through `findOmmlFailures` first.
 *
 * The rewrite is NOTATIONAL ONLY: `(A \cup B)'` and `\overline{A \cup B}` are
 * the same set, and both are standard school notation for the complement, so
 * nothing a student reads changes in meaning.
 *
 * Every repair must match EXACTLY ONCE or it is refused, and the result is
 * re-checked through the real `findOmmlFailures` before the write — a repair
 * that swaps one unconvertible form for another would otherwise pass silently.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { findOmmlFailures } from "../../src/lib/export/ommlAudit";
import { DATA, ORG_ID, EXAM_ID_CBSE_12 } from "./config";

type Fix = { source: string; qnum: string; find: string; replace: string };

const B = String.fromCharCode(92); // never type a backslash-escape you are describing
const cup = `${B}cup`;
const cap = `${B}cap`;
const ov = `${B}overline`;

const FIXES: Fix[] = [
  {
    source: "cbse-12-pyq-2025-65-1-3", qnum: "7",
    find: `M' ${cap} N' = (M ${cup} N)'`,
    replace: `M' ${cap} N' = ${ov}{M ${cup} N}`,
  },
  {
    source: "cbse-12-pyq-2025-65-7-2", qnum: "17",
    find: `A' ${cap} B' = (A ${cup} B)'`,
    replace: `A' ${cap} B' = ${ov}{A ${cup} B}`,
  },
  {
    source: "cbse-12-pyq-2026-65-2-1", qnum: "18",
    find: `A' ${cap} B' = (A ${cup} B)'`,
    replace: `A' ${cap} B' = ${ov}{A ${cup} B}`,
  },
  {
    source: "cbse-12-pyq-2026-65-2-1", qnum: "18",
    find: `(A ${cap} B)'`,
    replace: `${ov}{A ${cap} B}`,
  },
];

async function main() {
  const apply = process.argv.includes("--apply");
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // Group by row: 2026 65/2/1 Q18 carries TWO failing zones, and applying them
  // one at a time against a stale read would lose the first.
  const byRow = new Map<string, Fix[]>();
  for (const f of FIXES) {
    const k = `${f.source}|${f.qnum}`;
    if (!byRow.has(k)) byRow.set(k, []);
    byRow.get(k)!.push(f);
  }

  const plan: { id: string; label: string; next: string; before: number; after: number }[] = [];
  const bad: string[] = [];

  for (const [k, fixes] of byRow) {
    const [source, qnum] = k.split("|");
    const label = `${source.replace(/^cbse-12-pyq-/, "")} Q${qnum}`;
    const { data, error } = await client.from("questions").select("id, solution")
      .eq("org_id", ORG_ID).eq("exam_id", EXAM_ID_CBSE_12).eq("question_kind", "pyq")
      .eq("source_file", source).eq("question_number", qnum);
    if (error) throw new Error(error.message);
    if (!data || data.length !== 1) { bad.push(`${label}: resolves to ${data?.length ?? 0} rows`); continue; }

    let cur = data[0].solution as string;
    const before = findOmmlFailures(cur).length;
    let ok = true;
    for (const f of fixes) {
      const hits = cur.split(f.find).length - 1;
      if (hits !== 1) { bad.push(`${label}: needle matches ${hits} time(s), need exactly 1`); ok = false; break; }
      cur = cur.split(f.find).join(f.replace);
    }
    if (!ok) continue;
    const after = findOmmlFailures(cur).length;
    // The whole point. A rewrite that leaves a failing zone has not worked.
    if (after !== 0) bad.push(`${label}: STILL ${after} failing zone(s) after the rewrite`);
    plan.push({ id: data[0].id as string, label, next: cur, before, after });
  }

  for (const p of plan) console.log(`${p.label}: failing zones ${p.before} -> ${p.after}`);
  if (bad.length) { console.log(`\n${bad.length} refusal(s):`); for (const b of bad) console.log(`  ${b}`); }

  // Mirror to the source of record where a topaper still holds the row.
  const mirrored: string[] = [];
  for (const file of readdirSync(DATA).filter((x) => x.endsWith(".topaper.json"))) {
    const path = join(DATA, file);
    const doc = JSON.parse(readFileSync(path, "utf8")) as { rows: { questionNumber: string; solution?: string }[] };
    let touched = false;
    for (const f of FIXES) {
      for (const r of doc.rows) {
        if (r.questionNumber !== f.qnum || !r.solution) continue;
        if (r.solution.split(f.find).length - 1 !== 1) continue;
        r.solution = r.solution.split(f.find).join(f.replace);
        touched = true; mirrored.push(`${file} Q${f.qnum}`);
      }
    }
    if (touched && apply) writeFileSync(path, JSON.stringify(doc, null, 1));
  }
  if (mirrored.length) console.log(`\nsource mirror: ${mirrored.join(", ")}`);

  if (!apply) { console.log(`\n[dry run] pass --apply to write.`); return; }
  if (bad.length) throw new Error("refusing to write — resolve the refusals above first.");
  for (const p of plan) {
    const { error } = await client.from("questions").update({ solution: p.next }).eq("id", p.id);
    if (error) throw new Error(`${p.label}: ${error.message}`);
  }
  console.log(`\ndone. ${plan.length} solution(s) rewritten.`);
}

main().catch((e) => { console.error(e.message ?? e); process.exit(1); });
