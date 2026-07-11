/**
 * Dump the committed exercise rows that still need an authored solution (subjective
 * rows with solution IS NULL — the solved examples already carry the book's answer)
 * to data/<id>.tosolve.json, one file the authoring agents slice by subtopic.
 *
 *   npx tsx scripts/ncert/dump-tosolve.ts <chapterId>
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, requireChapter, DATA } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const id = process.argv[2];
  const ch = requireChapter(id);
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const rows: { id: string; ref: string; subtopic: string; context: string | null; stem: string }[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await client
      .from("questions")
      .select("id, question_number, context, text, subtopic:subtopics!subtopic_id(name)")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", ch.sourceFile)
      .eq("question_format", "subjective")
      .is("solution", null)
      .order("source_row", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    const batch = data ?? [];
    for (const r of batch as any[]) {
      rows.push({
        id: r.id,
        ref: r.question_number,
        subtopic: Array.isArray(r.subtopic) ? r.subtopic[0]?.name : r.subtopic?.name,
        context: r.context ?? null,
        stem: r.text,
      });
    }
    if (batch.length < PAGE) break;
  }

  const out = join(DATA, `${id}.tosolve.json`);
  writeFileSync(out, JSON.stringify(rows, null, 2), "utf8");
  const bySub = new Map<string, number>();
  for (const r of rows) bySub.set(r.subtopic, (bySub.get(r.subtopic) ?? 0) + 1);
  console.log(`dumped ${rows.length} rows needing a solution → ${out}`);
  for (const [k, n] of [...bySub].sort()) console.log(`  ${k.padEnd(52)} ${n}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
