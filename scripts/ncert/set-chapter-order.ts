/**
 * Set `chapters.order_index` for one (exam, subject) from each chapter's BOOK
 * number in config.ts, so /browse and /board list chapters in book order.
 *
 *   npx tsx scripts/ncert/set-chapter-order.ts <examId> <subjectName>          # dry-run
 *   npx tsx scripts/ncert/set-chapter-order.ts <examId> <subjectName> --apply
 *
 * WHY: commit.ts assigns order_index = max+1, i.e. INGEST order. A pilot chapter
 * committed first, or a wave whose agents finish out of order, leaves the
 * chapters scrambled (Biology Class 11 shipped Ch.16 first, then 6/7 and 8/9
 * swapped). The book number is the truth and config carries it as `chapterNo`.
 *
 * 0-based (order_index = chapterNo - 1), matching every other subject. Scoped by
 * exam AND subject AND chapter name, and refuses unless each lookup returns
 * exactly one chapter: a chapter NAME alone is not unique across exams.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { CHAPTERS } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const [examId, subjectName] = process.argv.slice(2);
  const apply = process.argv.includes("--apply");
  if (!examId || !subjectName) throw new Error("usage: set-chapter-order.ts <examId> <subjectName> [--apply]");
  loadEnv();
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const wanted = Object.values(CHAPTERS).filter((c) => c.examId === examId && c.subjectName === subjectName);
  if (!wanted.length) throw new Error(`no config chapters for exam ${examId} / ${subjectName}`);
  const missingNo = wanted.filter((c) => c.chapterNo == null);
  if (missingNo.length) throw new Error(`chapterNo missing in config for: ${missingNo.map((c) => c.id).join(", ")}`);

  const { data: subj, error: sErr } = await client
    .from("subjects").select("id").eq("exam_id", examId).eq("name", subjectName);
  if (sErr) throw new Error(sErr.message);
  if (subj?.length !== 1) throw new Error(`expected exactly 1 subject "${subjectName}" for exam ${examId}, got ${subj?.length}`);
  const subjectId = subj[0].id as string;

  const { data: rows, error: cErr } = await client
    .from("chapters").select("id, name, order_index").eq("subject_id", subjectId);
  if (cErr) throw new Error(cErr.message);

  const plan: { id: string; name: string; from: number | null; to: number }[] = [];
  for (const c of wanted.sort((a, b) => a.chapterNo! - b.chapterNo!)) {
    const hits = (rows ?? []).filter((r) => r.name === c.chapterName);
    if (hits.length === 0) {
      console.log(`  - Ch.${c.chapterNo} ${c.chapterName}: not committed yet, skipped`);
      continue;
    }
    if (hits.length > 1) throw new Error(`"${c.chapterName}" matches ${hits.length} chapters under this subject`);
    plan.push({ id: hits[0].id, name: c.chapterName, from: hits[0].order_index, to: c.chapterNo! - 1 });
  }
  for (const p of plan) console.log(`  ${p.from === p.to ? " " : "*"} [${p.to}] ${p.name}  (was ${p.from})`);

  const changes = plan.filter((p) => p.from !== p.to);
  if (!apply) {
    console.log(`\n[dry-run] ${changes.length} change(s). Pass --apply to write.`);
    return;
  }
  for (const p of changes) {
    const { error } = await client.from("chapters").update({ order_index: p.to }).eq("id", p.id);
    if (error) throw new Error(`${p.name}: ${error.message}`);
  }
  console.log(`\nAPPLIED: ${changes.length} chapter order_index value(s) updated.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
