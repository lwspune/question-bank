/**
 * Create the IAT exam row and its four subjects; with --order, set chapter and
 * subtopic order_index from taxonomy.ts.
 *
 *   npx tsx scripts/iat/seed.ts                    # dry run
 *   npx tsx scripts/iat/seed.ts --apply            # create what is missing
 *   npx tsx scripts/iat/seed.ts --order --apply    # after the commits
 *
 * Idempotent. Run IMMEDIATELY before the first commit, never as "setting up":
 * an empty subject renders as a live /browse filter that returns nothing.
 * commitStaged creates the chapters and subtopics a question uses, so a chapter
 * no question uses never exists. --order creates nothing; it orders chapters in
 * book order (Class XI then XII, legacy chapters where the old books had them).
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_NAME, SUBJECTS } from "./config";
import { IAT_TAXONOMY } from "./taxonomy";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const apply = process.argv.includes("--apply");
  const order = process.argv.includes("--order");
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let { data: exam } = await client.from("exams").select("id, name").eq("name", EXAM_NAME).maybeSingle();
  if (!exam) {
    if (!apply) return console.log(`[dry run] would create exam "${EXAM_NAME}" and ${SUBJECTS.join(", ")}`);
    const { data, error } = await client.from("exams").insert({ name: EXAM_NAME }).select("id, name").single();
    if (error) throw new Error(`exam insert failed: ${error.message}`);
    exam = data;
    console.log(`created exam ${exam.name}  ${exam.id}`);
  } else console.log(`exam exists: ${exam.name}  ${exam.id}`);

  const { data: subs, error } = await client.from("subjects").select("id, name").eq("exam_id", exam.id);
  if (error) throw new Error(`subject read failed: ${error.message}`);
  const missing = SUBJECTS.filter((n) => !(subs ?? []).some((s) => s.name === n));
  if (missing.length) {
    if (!apply) return console.log(`[dry run] would create subjects: ${missing.join(", ")}`);
    const { error: iErr } = await client.from("subjects").insert(missing.map((name) => ({ exam_id: exam!.id, name })));
    if (iErr) throw new Error(`subject insert failed: ${iErr.message}`);
    console.log(`created subjects: ${missing.join(", ")}`);
  } else console.log("subjects exist.");
  if (!order) return;

  const { data: subjects } = await client.from("subjects").select("id, name").eq("exam_id", exam.id);
  let changed = 0;
  for (const subject of subjects ?? []) {
    const wanted = IAT_TAXONOMY[subject.name as (typeof SUBJECTS)[number]] ?? [];
    const { data: chapters } = await client.from("chapters").select("id, name, order_index").eq("subject_id", subject.id);
    for (const ch of chapters ?? []) {
      const ci = wanted.findIndex((c) => c.name === ch.name);
      if (ci < 0) {
        console.log(`  ${subject.name} / ${ch.name}: not in the taxonomy, left as it is`);
        continue;
      }
      if (ch.order_index !== ci + 1) {
        changed++;
        if (apply) await client.from("chapters").update({ order_index: ci + 1 }).eq("id", ch.id);
      }
      const subOrder = wanted[ci].subtopics;
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
  }
  console.log(apply ? `order written (${changed} change(s)).` : `[dry run] ${changed} order change(s); pass --apply to write.`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
