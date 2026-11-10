/**
 * Move committed UGC NET rows to another subtopic of the SAME chapter, in the
 * transcription (data/<shift>.questions.json) and in the bank together, so the
 * two never disagree.
 *
 *   npx tsx scripts/ugc-net/refile.ts            # dry run
 *   npx tsx scripts/ugc-net/refile.ts --apply
 *
 * The moves are data/refile.json: [{ shift, ref, subtopic, why }]. A move to a
 * subtopic outside the row's chapter, or one taxonomy.ts does not know, is
 * refused. The subtopic row is created in the bank if no question used it yet.
 * Idempotent: a row already in place is left as it is.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { EXAM_NAME, SUBJECT, dataDir, shiftById, sourceFile } from "./config";
import type { UgcPaper } from "./lib";
import { UGC_NET_TAXONOMY } from "./taxonomy";

type Move = { shift: string; ref: string; subtopic: string; why: string };

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const apply = process.argv.includes("--apply");
  const moves = JSON.parse(readFileSync(join(dataDir(), "refile.json"), "utf8")) as Move[];
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: exam } = await client.from("exams").select("id").eq("name", EXAM_NAME).single();
  const { data: subject } = await client.from("subjects").select("id").eq("exam_id", exam!.id).eq("name", SUBJECT).single();

  const papers = new Map<string, UgcPaper>();
  let moved = 0;
  for (const m of moves) {
    const file = join(dataDir(), `${m.shift}.questions.json`);
    if (!papers.has(m.shift)) papers.set(m.shift, JSON.parse(readFileSync(file, "utf8")) as UgcPaper);
    const row = papers.get(m.shift)!.rows.find((r) => r.ref === m.ref);
    if (!row) throw new Error(`${m.shift} Q${m.ref}: no such row`);
    const ch = UGC_NET_TAXONOMY.find((c) => c.name === row.chapter);
    if (!ch?.subtopics.includes(m.subtopic)) throw new Error(`${m.shift} Q${m.ref}: "${m.subtopic}" is not a subtopic of ${row.chapter}`);

    const { data: chapter } = await client.from("chapters").select("id").eq("subject_id", subject!.id).eq("name", row.chapter).single();
    const { data: q } = await client
      .from("questions").select("id, subtopic_id, subtopics(name)")
      .eq("exam_id", exam!.id).eq("source_file", sourceFile(shiftById(m.shift))).eq("question_number", m.ref).single();
    if (!q) throw new Error(`${m.shift} Q${m.ref}: not in the bank`);
    const current = (q.subtopics as unknown as { name: string } | null)?.name;
    if (current === m.subtopic && row.subtopic === m.subtopic) continue;
    console.log(`${m.shift} Q${m.ref}: ${current} -> ${m.subtopic}  (${m.why})`);
    moved++;
    if (!apply) continue;

    let { data: st } = await client.from("subtopics").select("id").eq("chapter_id", chapter!.id).eq("name", m.subtopic).maybeSingle();
    if (!st) {
      const { data, error } = await client.from("subtopics").insert({ chapter_id: chapter!.id, name: m.subtopic }).select("id").single();
      if (error) throw new Error(`subtopic insert failed: ${error.message}`);
      st = data;
    }
    const { error } = await client.from("questions").update({ subtopic_id: st!.id }).eq("id", q.id);
    if (error) throw new Error(`${m.shift} Q${m.ref}: update failed: ${error.message}`);
    row.subtopic = m.subtopic;
  }
  if (apply) for (const [shift, p] of papers) writeFileSync(join(dataDir(), `${shift}.questions.json`), JSON.stringify(p, null, 2) + "\n");
  console.log(apply ? `moved ${moved} row(s).` : `[dry run] ${moved} move(s); pass --apply to write.`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
