/**
 * Prove a paper's stems, options and solutions RENDER — web (KaTeX) and Word (OMML).
 *
 *   npx tsx scripts/reviews/render-check-paper.ts <paperId>
 *
 * Parameterised sibling of probe-render.ts / verify-render.ts, both of which are
 * pinned to the 2026-08-16 run's directories.
 *
 * WHY BOTH. A solution can be mathematically perfect and still take the whole
 * stem down in the browser, OR fall back to raw LaTeX in a downloaded answer key.
 * Those are different pipelines with different failure modes — the contract this
 * project keeps re-learning is (field x surface), so both are checked against the
 * same text. For an OFFLINE paper the Word half is the one that ships.
 *
 * Uses the REAL helpers (katex, findOmmlFailures), never a regex approximation,
 * so a hit is a genuine disagreement rather than a probe artefact.
 */
import { join } from "node:path";
import katex from "katex";
import { createClient } from "@supabase/supabase-js";
import { findOmmlFailures } from "../../src/lib/export/ommlAudit";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/** Pull every inline math zone out of a field, the way the renderers see them. */
const zones = (s: string): string[] => [...(s ?? "").matchAll(/\\\((.+?)\\\)/gs)].map((m) => m[1]);

async function main() {
  const paperId = process.argv[2];
  if (!paperId) {
    console.error("usage: render-check-paper.ts <paperId>");
    process.exit(2);
  }
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data, error } = await db
    .from("paper_questions")
    .select(
      "position, questions!inner(question_number, text, context, solution, options(label, text))"
    )
    .eq("paper_id", paperId);
  if (error) throw error;

  let fields = 0;
  let zoneCount = 0;
  const katexFails: string[] = [];
  const ommlFails: string[] = [];
  const controlChars: string[] = [];

  for (const row of data as any[]) {
    const q = row.questions;
    const where = `pos ${row.position} Q${q.question_number}`;
    const parts: [string, string | null][] = [
      ["text", q.text],
      ["context", q.context],
      ["solution", q.solution],
      ...q.options.map((o: any) => [`option ${o.label}`, o.text] as [string, string]),
    ];
    for (const [fld, v] of parts) {
      if (!v) continue;
      fields++;
      // eslint-disable-next-line no-control-regex
      if (/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(v)) controlChars.push(`${where} ${fld}`);
      for (const z of zones(v)) {
        zoneCount++;
        try {
          katex.renderToString(z, { throwOnError: true });
        } catch (e: any) {
          katexFails.push(`${where} ${fld}: ${String(e.message).slice(0, 90)}  <<${z.slice(0, 70)}>>`);
        }
      }
      for (const f of findOmmlFailures(v)) {
        ommlFails.push(`${where} ${fld}: <<${String((f as any).latex ?? f).slice(0, 80)}>>`);
      }
    }
  }

  console.log(`scanned ${data.length} questions | ${fields} fields | ${zoneCount} math zones`);
  const report = (label: string, rows: string[]) => {
    console.log(`\n${label}: ${rows.length}`);
    rows.slice(0, 40).forEach((r) => console.log("  " + r));
    if (rows.length > 40) console.log(`  ... ${rows.length - 40} more`);
  };
  report("KaTeX failures (web reveal would break)", katexFails);
  report("OMML failures (Word key ships raw LaTeX)", ommlFails);
  report("control characters", controlChars);

  const bad = katexFails.length + ommlFails.length + controlChars.length;
  console.log(bad === 0 ? "\nPASS — renders on both surfaces" : `\nFAIL — ${bad} problem(s)`);
  process.exit(bad === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
