/**
 * Create the UGC NET exam row and its one subject; with --order, set chapter and
 * subtopic order_index from taxonomy.ts (NTA's syllabus order).
 *
 *   npx tsx scripts/ugc-net/seed.ts                    # dry run
 *   npx tsx scripts/ugc-net/seed.ts --apply            # create what is missing
 *   npx tsx scripts/ugc-net/seed.ts --order --apply    # after the commits
 *
 * Idempotent. Run IMMEDIATELY before the first commit, never as "setting up":
 * an empty subject renders as a live /browse filter that returns nothing.
 * commitStaged creates the chapters and subtopics a question uses.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_NAME, SUBJECT } from "./config";
import { UGC_NET_TAXONOMY } from "./taxonomy";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const apply = process.argv.includes("--apply");
  const order = process.argv.includes("--order");
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let { data: exam } = await client.from("exams").select("id, name").eq("name", EXAM_NAME).maybeSingle();
  if (!exam) {
    if (!apply) return console.log(`[dry run] would create exam "${EXAM_NAME}" and subject "${SUBJECT}"`);
    const { data, error } = await client.from("exams").insert({ name: EXAM_NAME }).select("id, name").single();
    if (error) throw new Error(`exam insert failed: ${error.message}`);
    exam = data;
    console.log(`created exam ${exam.name}  ${exam.id}`);
  } else console.log(`exam exists: ${exam.name}  ${exam.id}`);

  const { data: subs, error } = await client.from("subjects").select("id, name").eq("exam_id", exam.id);
  if (error) throw new Error(`subject read failed: ${error.message}`);
  let subject = (subs ?? []).find((s) => s.name === SUBJECT);
  if (!subject) {
    if (!apply) return console.log(`[dry run] would create subject "${SUBJECT}"`);
    const { data, error: iErr } = await client.from("subjects").insert({ exam_id: exam.id, name: SUBJECT }).select("id, name").single();
    if (iErr) throw new Error(`subject insert failed: ${iErr.message}`);
    subject = data;
    console.log(`created subject ${SUBJECT}`);
  } else console.log("subject exists.");
  if (!order) return;

  let changed = 0;
  const { data: chapters } = await client.from("chapters").select("id, name, order_index").eq("subject_id", subject.id);
  for (const ch of chapters ?? []) {
    const ci = UGC_NET_TAXONOMY.findIndex((c) => c.name === ch.name);
    if (ci < 0) {
      console.log(`  ${ch.name}: not in the taxonomy, left as it is`);
      continue;
    }
    if (ch.order_index !== ci + 1) {
      changed++;
      if (apply) await client.from("chapters").update({ order_index: ci + 1 }).eq("id", ch.id);
    }
    const subOrder = UGC_NET_TAXONOMY[ci].subtopics;
    const { data: sts } = await client.from("subtopics").select("id, name, order_index").eq("chapter_id", ch.id);
    for (const st of sts ?? []) {
      const si = subOrder.indexOf(st.name);
      if (si < 0) console.log(`  ${ch.name} / ${st.name}: not in the subtopic list`);
      else if (st.order_index !== si + 1) {
        changed++;
        if (apply) await client.from("subtopics").update({ order_index: si + 1 }).eq("id", st.id);
      }
    }
  }
  console.log(apply ? `order written (${changed} change(s)).` : `[dry run] ${changed} order change(s); pass --apply to write.`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
