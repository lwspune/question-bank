/**
 * Per-paper solution coverage across the whole CBSE board-PYQ corpus.
 *
 *   npx tsx scripts/cbse-12-pyq/solution-status.ts
 *   npx tsx scripts/cbse-12-pyq/solution-status.ts --todo    # only papers with work left
 *
 * A row is COMMITTED under whichever series won the dedup race, so this counts
 * by `source_file` — i.e. "rows this paper OWNS", not "questions this paper
 * printed". A sibling that reprints 50 of its 54 questions owns 4 rows and needs
 * an agent for those 4 only.
 *
 * This is the work plan for the tail: it is the difference between dispatching
 * 52 agents and dispatching however many papers genuinely own an unsolved row.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { ORG_ID, EXAM_ID_CBSE_12 } from "./config";

async function main() {
  const todoOnly = process.argv.includes("--todo");
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // Page the RESULT — a bare .select() truncates at 1000 with no error, and this
  // corpus is 1,766 rows, so an unpaged count would silently under-report by 43%.
  const rows: { source_file: string; solution: string | null }[] = [];
  for (let from = 0; ; from += 500) {
    const { data, error } = await client.from("questions").select("source_file, solution")
      .eq("org_id", ORG_ID).eq("exam_id", EXAM_ID_CBSE_12).eq("question_kind", "pyq")
      .order("source_file").range(from, from + 499);
    if (error) throw new Error(error.message);
    rows.push(...(data as never as typeof rows));
    if (!data || data.length < 500) break;
  }

  const byPaper = new Map<string, { own: number; solved: number }>();
  for (const r of rows) {
    const k = r.source_file.replace(/^cbse-12-pyq-/, "");
    if (!byPaper.has(k)) byPaper.set(k, { own: 0, solved: 0 });
    const e = byPaper.get(k)!;
    e.own++;
    if (r.solution) e.solved++;
  }

  const papers = [...byPaper.entries()].sort(([a], [b]) => a.localeCompare(b));
  const todo = papers.filter(([, v]) => v.own > v.solved);

  const byYear = new Map<string, { own: number; solved: number; papers: number; todoPapers: number }>();
  for (const [k, v] of papers) {
    const y = k.slice(0, 4);
    if (!byYear.has(y)) byYear.set(y, { own: 0, solved: 0, papers: 0, todoPapers: 0 });
    const e = byYear.get(y)!;
    e.own += v.own; e.solved += v.solved; e.papers++;
    if (v.own > v.solved) e.todoPapers++;
  }

  for (const [p, v] of (todoOnly ? todo : papers)) {
    const left = v.own - v.solved;
    console.log(`${p}  owns ${String(v.own).padStart(3)} | solved ${String(v.solved).padStart(3)} | LEFT ${String(left).padStart(3)}`);
  }

  console.log(`\nby year:`);
  for (const [y, v] of [...byYear.entries()].sort()) {
    console.log(`  ${y}  ${v.papers} papers, ${v.own} rows | solved ${v.solved} | left ${v.own - v.solved}  (${v.todoPapers} paper(s) still owe work)`);
  }
  const own = rows.length, solved = rows.filter((r) => r.solution).length;
  console.log(`\nTOTAL ${solved}/${own} solved | ${own - solved} left across ${todo.length} of ${papers.length} papers`);
}

main().catch((e) => { console.error(e.message ?? e); process.exit(1); });
