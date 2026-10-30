/**
 * Create a CISCE exam row and its subjects; with --order, set
 * chapter and subtopic order_index from the syllabus.
 *
 *   npx tsx scripts/cisce-pyq/seed.ts icse-10                 # dry run
 *   npx tsx scripts/cisce-pyq/seed.ts icse-10 --apply         # create what is missing
 *   npx tsx scripts/cisce-pyq/seed.ts icse-10 --order --apply # after the commits
 *
 * Idempotent. commitStaged creates chapters and subtopics itself but refuses an
 * unknown SUBJECT (a typo there would corrupt the top level), so the subjects
 * are made here, IMMEDIATELY before the first commit and never as "setting up":
 * listSubjects applies no question-count filter, so an empty subject renders as
 * a live /browse filter that returns nothing (README "Do not seed early").
 *
 * --order writes chapters in the exam's taxonomy order (the syllabus's unit order)
 * and subtopics in its subtopic order, for the chapters commitStaged created. It
 * creates nothing: a chapter no question uses stays absent.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { cisceExam } from "./exams";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const apply = process.argv.includes("--apply");
  const order = process.argv.includes("--order");
  const slug = process.argv.slice(2).find((a) => !a.startsWith("--"));
  if (!slug) throw new Error("usage: seed.ts <exam> [--order] [--apply]");
  const cisce = cisceExam(slug);
  const EXAM_NAME = cisce.examName;
  const SUBJECTS = cisce.subjects;
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
  for (const subject of subjects ?? []) {
    const wanted = cisce.taxonomy[subject.name]?.map((c) => c.name) ?? [];
    const { data: chapters } = await client.from("chapters").select("id, name, order_index").eq("subject_id", subject.id);
    for (const ch of chapters ?? []) {
      const ci = wanted.indexOf(ch.name);
      if (ci < 0) {
        console.log(`  ${subject.name} / ${ch.name}: not in the taxonomy, left as it is`);
        continue;
      }
      if (ch.order_index !== ci + 1) {
        console.log(`  ${subject.name} / ${ch.name}: order ${ch.order_index} -> ${ci + 1}`);
        if (apply) await client.from("chapters").update({ order_index: ci + 1 }).eq("id", ch.id);
      }
      const subOrder = cisce.subtopics[ch.name] ?? [];
      const { data: sts } = await client.from("subtopics").select("id, name, order_index").eq("chapter_id", ch.id);
      for (const st of sts ?? []) {
        const si = subOrder.indexOf(st.name);
        if (si >= 0 && st.order_index !== si + 1) {
          if (apply) await client.from("subtopics").update({ order_index: si + 1 }).eq("id", st.id);
        } else if (si < 0) console.log(`  ${ch.name} / ${st.name}: not in the subtopic list`);
      }
    }
  }
  console.log(apply ? "order written." : "[dry run] pass --apply to write the order.");
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
