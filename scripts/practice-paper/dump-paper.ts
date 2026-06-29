/**
 * One-off: dump a single paper's questions (in position order) — stem + options
 * (with is_correct) + stored solution — to C:/tmp/paper_<id8>.json, so a review
 * agent can re-derive each question and audit the stored key + solution.
 *
 *   npx tsx scripts/practice-paper/dump-paper.ts <paperId>
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const paperId = process.argv[2];
  if (!paperId) throw new Error("pass <paperId>");

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const { data: pqs, error: e1 } = await db
    .from("paper_questions")
    .select("position, question_id")
    .eq("paper_id", paperId)
    .order("position");
  if (e1) throw e1;
  if (!pqs?.length) throw new Error("no questions for paper " + paperId);

  const ids = pqs.map((p) => p.question_id);
  const { data: qs, error: e2 } = await db
    .from("questions")
    .select(
      "id, text, context, solution, chapter:chapters(name), subtopic:subtopics(name), options(label, text, is_correct)",
    )
    .in("id", ids);
  if (e2) throw e2;

  const byId = new Map(qs!.map((q: any) => [q.id, q]));
  const rows = pqs.map((p, i) => {
    const q: any = byId.get(p.question_id);
    const opts = (q.options ?? []).sort((a: any, b: any) => a.label.localeCompare(b.label));
    const correct = opts.find((o: any) => o.is_correct);
    return {
      n: i + 1,
      id: q.id,
      chapter: q.chapter?.name ?? null,
      subtopic: q.subtopic?.name ?? null,
      context: q.context ?? null,
      stem: q.text,
      options: opts.map((o: any) => `${o.label}. ${o.text}`),
      answer: correct?.label ?? null,
      n_correct: opts.filter((o: any) => o.is_correct).length,
      solution: q.solution ?? null,
    };
  });

  const path = `C:/tmp/mock6/paper_${paperId.slice(0, 8)}.json`;
  writeFileSync(path, JSON.stringify(rows, null, 1), "utf-8");
  console.log(`${rows.length} rows -> ${path}`);
  // sanity: flag any with 0 or >1 correct options
  const bad = rows.filter((r) => r.n_correct !== 1);
  if (bad.length) console.log("WARN n_correct != 1:", bad.map((b) => `${b.n}(${b.n_correct})`).join(" "));
}

main().catch((e) => { console.error(e); process.exit(1); });
