import * as fs from "node:fs";
import * as path from "node:path";
import { createClient } from "@supabase/supabase-js";
require("dotenv").config({ path: path.join(process.cwd(), ".env.local"), override: true });
const [chapterName, outName] = process.argv.slice(2);
async function main() {
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data: exam } = await sb.from("exams").select("id").eq("name", process.env.EXAM ?? "JEE Mains").single();
  const { data: subj } = await sb.from("subjects").select("id").eq("exam_id", exam!.id).eq("name", "Maths").single();
  const { data: ch } = await sb.from("chapters").select("id,name,order_index").eq("subject_id", subj!.id).eq("name", chapterName).single();
  const { data: subs } = await sb.from("subtopics").select("id,name,order_index").eq("chapter_id", ch!.id);
  const { data: qs, error } = await sb.from("questions")
    .select("id,difficulty,pyq_year,pyq_month,pyq_note,set_id,subtopic_id,text,context,solution,question_number,source_file,image_url,question_kind,visibility,options(label,text,is_correct)")
    .eq("chapter_id", ch!.id).eq("visibility", "PUBLIC").order("pyq_year", { ascending: false }).limit(1000);
  if (error) throw error;
  const { data: tags } = await sb.from("question_concept_tags").select("question_id,subtopic_slug,concept_slug").in("question_id", qs!.map(q => q.id));
  const out = { chapter: ch, subtopics: subs, questions: qs, tags };
  fs.writeFileSync(path.join("generated-papers", `${outName}.json`), JSON.stringify(out, null, 1));
  console.log(`chapter ${ch!.name} (${ch!.id}) order ${ch!.order_index}`);
  console.log(`subtopics:`); for (const s of subs!) console.log(`  ${s.id} ${s.name} (order ${s.order_index}) — ${qs!.filter(q => q.subtopic_id === s.id).length} q`);
  console.log(`questions: ${qs!.length}  kinds: ${JSON.stringify(Object.fromEntries(Object.entries(qs!.reduce((m: any, q) => (m[q.question_kind] = (m[q.question_kind] || 0) + 1, m), {}))))}`);
  console.log(`concept tags: ${tags!.length}`);
  const diff: any = {}; for (const q of qs!) diff[q.difficulty] = (diff[q.difficulty] || 0) + 1; console.log(`difficulty: ${JSON.stringify(diff)}`);
  const yrs: any = {}; for (const q of qs!) { const k = `${q.pyq_year}`; yrs[k] = (yrs[k] || 0) + 1; } console.log(`years: ${JSON.stringify(yrs)}`);
  console.log(`sets: ${qs!.filter(q => q.set_id).length}  images: ${qs!.filter(q => q.image_url).length}  no-solution: ${qs!.filter(q => !q.solution).length}`);
}
main().catch(e => { console.error(e); process.exit(1); });
