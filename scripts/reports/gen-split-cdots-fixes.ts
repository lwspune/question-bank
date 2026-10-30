/**
 * Restore `\cdots` where a transcription stored `\cdot s` (drawn as "· s").
 *
 *   npx tsx scripts/reports/gen-split-cdots-fixes.ts
 *     -> scripts/reports/data/2026-10-29-split-cdots.json
 *   npx tsx scripts/reports/apply-fixes.ts scripts/reports/data/2026-10-29-split-cdots.json [--apply]
 *
 * Every field and option is rewritten with the probe's own `fixSplitCdots`, so
 * the repair touches exactly what `audit:text` SPLIT_CDOTS flags. A stem or
 * option edit moves content_hash; apply-fixes recomputes it and refuses a
 * collision. Found 2026-10-29 in the animated-solutions work (SUGGESTIONS.md
 * backfill ledger).
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { fixSplitCdots, hasSplitCdots } from "../lib/textProbes";
import type { Fix } from "./fixes";

const OUT = join(process.cwd(), "scripts", "reports", "data", "2026-10-29-split-cdots.json");
const REASON =
  "\\cdots was stored as \\cdot s (drawn as a dot then the letter s); restored with fixSplitCdots";

type Row = {
  id: string;
  text: string;
  context: string | null;
  solution: string | null;
  source_file: string | null;
  question_number: string | null;
  options: { label: string; text: string }[];
};

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // LIKE treats a backslash as its escape, so match the letters only and let
  // the probe decide.
  const ids = new Set<string>();
  for (const col of ["text", "context", "solution"]) {
    const { data, error } = await db.from("questions").select("id").ilike(col, "%cdot s%");
    if (error) throw error;
    for (const r of data ?? []) ids.add(r.id as string);
  }
  const { data: opts, error: oErr } = await db.from("options").select("question_id").ilike("text", "%cdot s%");
  if (oErr) throw oErr;
  for (const r of opts ?? []) ids.add(r.question_id as string);

  const fixes: Fix[] = [];
  const list = [...ids];
  for (let i = 0; i < list.length; i += 200) {
    const { data, error } = await db
      .from("questions")
      .select("id, text, context, solution, source_file, question_number, options(label, text)")
      .in("id", list.slice(i, i + 200));
    if (error) throw error;
    for (const r of (data ?? []) as Row[]) {
      const fix: Fix = { id: r.id, label: `${r.source_file ?? "?"} ${r.question_number ?? "?"}`, reason: REASON };
      if (hasSplitCdots(r.text)) fix.text = fixSplitCdots(r.text);
      if (r.context && hasSplitCdots(r.context)) fix.context = fixSplitCdots(r.context);
      if (r.solution && hasSplitCdots(r.solution)) fix.solution = fixSplitCdots(r.solution);
      const optFixes: Record<string, string> = {};
      for (const o of r.options) if (hasSplitCdots(o.text)) optFixes[o.label] = fixSplitCdots(o.text);
      if (Object.keys(optFixes).length) fix.options = optFixes;
      if (fix.text !== undefined || fix.context !== undefined || fix.solution !== undefined || fix.options) {
        fixes.push(fix);
      }
    }
  }
  fixes.sort((a, b) => a.label.localeCompare(b.label));
  writeFileSync(OUT, JSON.stringify(fixes, null, 2) + "\n");
  console.log(`${ids.size} candidates, ${fixes.length} to fix -> ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
