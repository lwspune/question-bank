/**
 * The subtopic handout for transcription agents: every SPI chapter with the subtopics the bank
 * already files questions under, busiest first. Read-only.
 *
 *   npx tsx scripts/spi/subtopics-handout.ts <paperId>    # writes out/<paperId>/subtopics.txt
 *
 * Why: pass 1 names each row's subtopic itself, and without this list it coins a fresh name
 * per question. The 2026 paper's first commit put 128 of 148 rows in 104 subtopics no other
 * SPI row used, so /browse and the notes saw one-question topics; 117 rows were refiled by
 * hand. Agents pick from this list and coin a name only when nothing fits.
 */
import { createClient } from "@supabase/supabase-js";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { EXAM_NAME, OUT, requirePaper } from "./config";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const paper = requirePaper(process.argv[2]);
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data: exam, error: examErr } = await db.from("exams").select("id").eq("name", EXAM_NAME).single();
  if (examErr || !exam) throw new Error(`exam ${EXAM_NAME}: ${examErr?.message}`);

  // Paged: the SPI bank is past PostgREST's 1000-row cap.
  const counts = new Map<string, Map<string, number>>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("chapters(name, subjects(name)), subtopics(name)")
      .eq("exam_id", exam.id)
      .neq("source_file", paper.sourceFile)
      .range(from, from + 999);
    if (error) throw error;
    for (const q of data as unknown as { chapters: { name: string; subjects: { name: string } }; subtopics: { name: string } | null }[]) {
      if (!q.subtopics) continue;
      const key = `${q.chapters.subjects.name} / ${q.chapters.name}`;
      const subs = counts.get(key) ?? new Map<string, number>();
      subs.set(q.subtopics.name, (subs.get(q.subtopics.name) ?? 0) + 1);
      counts.set(key, subs);
    }
    if (data.length < 1000) break;
  }

  const lines = [...counts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([chapter, subs]) => `${chapter}: ${[...subs.entries()].sort((a, b) => b[1] - a[1]).map(([n, k]) => `${n} (${k})`).join("; ")}`);
  const dir = join(OUT, paper.id);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "subtopics.txt"), lines.join("\n") + "\n");
  console.log(`wrote ${lines.length} chapters to ${join(dir, "subtopics.txt")}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
