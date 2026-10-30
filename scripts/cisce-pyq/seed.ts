/**
 * Create the ISC Class 12 exam row and its three subjects; with --order, set
 * chapter and subtopic order_index from the syllabus.
 *
 *   npx tsx scripts/isc-12-pyq/seed.ts                 # dry run
 *   npx tsx scripts/isc-12-pyq/seed.ts --apply         # create what is missing
 *   npx tsx scripts/isc-12-pyq/seed.ts --order --apply # after the commits
 *
 * Idempotent. commitStaged creates chapters and subtopics itself but refuses an
 * unknown SUBJECT (a typo there would corrupt the top level), so the subjects
 * are made here, IMMEDIATELY before the first commit and never as "setting up":
 * listSubjects applies no question-count filter, so an empty subject renders as
 * a live /browse filter that returns nothing (README "Do not seed early").
 *
 * --order writes chapters in ISC_TAXONOMY order (the syllabus's unit order) and
 * subtopics in ISC_SUBTOPICS order, for the chapters commitStaged created. It
 * creates nothing: a chapter no question uses stays absent.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { ISC_12_EXAM_NAME, ISC_SUBJECTS, ISC_SUBTOPICS, ISC_TAXONOMY } from "./config";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const apply = process.argv.includes("--apply");
  const order = process.argv.includes("--order");
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let { data: exam } = await client.from("exams").select("id, name").eq("name", ISC_12_EXAM_NAME).maybeSingle();
  if (!exam) {
    if (!apply) return console.log(`[dry run] would create exam "${ISC_12_EXAM_NAME}" and ${ISC_SUBJECTS.join(", ")}`);
    const { data, error } = await client.from("exams").insert({ name: ISC_12_EXAM_NAME }).select("id, name").single();
    if (error) throw new Error(`exam insert failed: ${error.message}`);
    exam = data;
    console.log(`created exam ${exam.name}  ${exam.id}`);
  } else console.log(`exam exists: ${exam.name}  ${exam.id}`);

  const { data: subs, error } = await client.from("subjects").select("id, name").eq("exam_id", exam.id);
  if (error) throw new Error(`subject read failed: ${error.message}`);
  const missing = ISC_SUBJECTS.filter((n) => !(subs ?? []).some((s) => s.name === n));
  if (missing.length) {
    if (!apply) return console.log(`[dry run] would create subjects: ${missing.join(", ")}`);
    const { error: iErr } = await client.from("subjects").insert(missing.map((name) => ({ exam_id: exam!.id, name })));
    if (iErr) throw new Error(`subject insert failed: ${iErr.message}`);
    console.log(`created subjects: ${missing.join(", ")}`);
  } else console.log("subjects exist.");
  if (!order) return;

  const { data: subjects } = await client.from("subjects").select("id, name").eq("exam_id", exam.id);
  for (const subject of subjects ?? []) {
    const wanted = ISC_TAXONOMY[subject.name as keyof typeof ISC_TAXONOMY]?.map((c) => c.name) ?? [];
    const { data: chapters } = await client.from("chapters").select("id, name, order_index").eq("subject_id", subject.id);
    for (const ch of chapters ?? []) {
      const ci = wanted.indexOf(ch.name);
      if (ci < 0) {
        console.log(`  ${subject.name} / ${ch.name}: not in ISC_TAXONOMY, left as it is`);
        continue;
      }
      if (ch.order_index !== ci + 1) {
        console.log(`  ${subject.name} / ${ch.name}: order ${ch.order_index} -> ${ci + 1}`);
        if (apply) await client.from("chapters").update({ order_index: ci + 1 }).eq("id", ch.id);
      }
      const subOrder = ISC_SUBTOPICS[ch.name] ?? [];
      const { data: sts } = await client.from("subtopics").select("id, name, order_index").eq("chapter_id", ch.id);
      for (const st of sts ?? []) {
        const si = subOrder.indexOf(st.name);
        if (si >= 0 && st.order_index !== si + 1) {
          if (apply) await client.from("subtopics").update({ order_index: si + 1 }).eq("id", st.id);
        } else if (si < 0) console.log(`  ${ch.name} / ${st.name}: not in ISC_SUBTOPICS`);
      }
    }
  }
  console.log(apply ? "order written." : "[dry run] pass --apply to write the order.");
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
