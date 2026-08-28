// geo-mensuration-10: read three shipped rows back out of the DB verbatim, so the
// stored text is inspected rather than assumed, plus the exam-level totals.
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { ORG_ID, EXAM_ID, requireChapter } from "../config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const ch = requireChapter("geo-mensuration-10");
  const c = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  for (const ref of ["Ex 7.4 Q1", "PS7 Q1(3)", "Ex 7.2 Q2(ii)"]) {
    const { data } = await c
      .from("questions")
      .select("question_number, context, text, solution, section_group, options(label, text, is_correct), subtopics(name)")
      .eq("org_id", ORG_ID).eq("exam_id", EXAM_ID).eq("source_file", ch.sourceFile)
      .eq("question_number", ref).single();
    const r = data as any;
    console.log(`\n${"=".repeat(78)}\n${r.question_number}   [${r.section_group}]   subtopic: ${r.subtopics?.name}`);
    if (r.context) console.log(`CONTEXT: ${r.context}`);
    console.log(`STEM: ${r.text}`);
    for (const o of r.options ?? []) console.log(`   (${o.label}) ${o.text}${o.is_correct ? "   <= correct" : ""}`);
    console.log(`SOLUTION:\n${r.solution}`);
  }

  const { count: mens } = await c.from("questions").select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID).eq("source_file", ch.sourceFile).eq("visibility", "PUBLIC");
  const { count: exam } = await c.from("questions").select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID).eq("visibility", "PUBLIC");
  const { count: prac } = await c.from("questions").select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID).eq("visibility", "PUBLIC").eq("question_kind", "practice");
  console.log(`\n${"=".repeat(78)}`);
  console.log(`Mensuration PUBLIC: ${mens}`);
  console.log(`mh-ssc-10 PUBLIC total: ${exam}   (of which practice: ${prac})`);
}
main().catch((e) => { console.error(e); process.exit(1); });
