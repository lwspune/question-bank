/**
 * Dump every committed row with its stem + our final answer (authored solution, and
 * for MCQ the marked correct option) for the answer-key cross-check gate.
 * → data/<id>.review.json, grouped by the ref's exercise prefix so a cross-check
 * agent can slice its band.
 *
 *   npx tsx scripts/ncert/dump-review.ts <chapterId>
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { requireChapter, DATA } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const id = process.argv[2];
  const ch = requireChapter(id);
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  type Row = {
    ref: string; format: string; stem: string; context: string | null;
    solution: string | null; mcq_answer: string | null;
    options: { label: string; text: string; correct: boolean }[];
  };
  const rows: Row[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await client
      .from("questions")
      .select("question_number, question_format, context, text, solution, source_row, options(label, text, is_correct)")
      .eq("exam_id", ch.examId)
      .eq("source_file", ch.sourceFile)
      .order("source_row", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    const batch = (data ?? []) as any[];
    for (const r of batch) {
      const opts = (r.options ?? []).map((o: any) => ({ label: o.label, text: o.text, correct: !!o.is_correct }));
      const correct = opts.find((o: any) => o.correct);
      rows.push({
        ref: r.question_number,
        format: r.question_format,
        stem: r.text,
        context: r.context ?? null,
        solution: r.solution ?? null,
        mcq_answer: correct ? correct.label : null,
        options: r.question_format === "mcq" ? opts : [],
      });
    }
    if (batch.length < PAGE) break;
  }

  const out = join(DATA, `${id}.review.json`);
  writeFileSync(out, JSON.stringify(rows, null, 2), "utf8");
  console.log(`dumped ${rows.length} rows → ${out}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
