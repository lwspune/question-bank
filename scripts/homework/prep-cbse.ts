// Prepare a CBSE 12 subject for the repeat review: slots (a question, or a case
// study's parts together), one evidence file per chapter, and a slots.json.
//   npx tsx scripts/homework/prep-cbse.ts <Subject> generated-papers/homework/cbse-12-<subject>
// Then reviewers follow scripts/homework/REVIEW_BRIEF.md, and scripts/homework/assemble.ts builds the plan file.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { isInstructionOnlyContext } from "@/lib/mocks/instructionContext";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Row = {
  id: string; question_number: string | null; text: string; context: string | null; question_format: string;
  pyq_year: number; source_file: string | null; pyq_note: string | null; image_url: string | null;
  chapter: { name: string } | null; subtopic: { name: string } | null;
  options: { label: string; text: string }[];
};

const qnum = (s: string | null) => {
  const m = /(\d+)/.exec(s ?? "");
  return m ? Number(m[1]) : 9999;
};

async function main() {
  const [subject, out] = process.argv.slice(2);
  const c = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const { data: ex } = await c.from("exams").select("id").eq("name", "CBSE Class 12").single();
  const { data: sub } = await c.from("subjects").select("id").eq("exam_id", ex!.id).eq("name", subject).single();
  const rows: Row[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await c.from("questions")
      .select("id,question_number,text,context,question_format,pyq_year,source_file,pyq_note,image_url,chapter:chapters(name),subtopic:subtopics(name),options(label,text)")
      .eq("exam_id", ex!.id).eq("subject_id", sub!.id).eq("question_kind", "pyq").eq("visibility", "PUBLIC")
      .order("id").range(from, from + 999);
    if (error) throw error;
    rows.push(...(data as unknown as Row[]));
    if (data.length < 1000) break;
  }

  // A case study = rows of one paper sharing a real passage (not an instruction).
  const slots = new Map<string, Row[]>();
  for (const r of rows) {
    const passage = r.context && r.context.trim() && !isInstructionOnlyContext(r.context);
    const key = passage ? `cs|${r.source_file}|${r.context!.trim()}` : `q|${r.id}`;
    (slots.get(key) ?? slots.set(key, []).get(key)!).push(r);
  }
  const paperOf = (r: Row) => /question paper ([\d/A-Z-]+)/.exec(r.pyq_note ?? "")?.[1] ?? r.source_file ?? "?";
  const slotList = [...slots.values()].map((rs) => {
    rs.sort((a, b) => qnum(a.question_number) - qnum(b.question_number) || (a.question_number ?? "").localeCompare(b.question_number ?? ""));
    const lead = rs[0];
    return {
      id: lead.id, rows: rs.map((r) => r.id), year: String(lead.pyq_year), paper: paperOf(lead),
      qno: lead.question_number ?? "", chapter: lead.chapter?.name ?? "(none)", subtopic: lead.subtopic?.name ?? "",
      caseStudy: rs.length > 1 || !!(lead.context && !isInstructionOnlyContext(lead.context)), rs,
    };
  });

  mkdirSync(join(out, "evidence"), { recursive: true });
  const byChapter = new Map<string, typeof slotList>();
  for (const s of slotList) (byChapter.get(s.chapter) ?? byChapter.set(s.chapter, []).get(s.chapter)!).push(s);
  const index: { chapter: string; file: string; slots: number }[] = [];
  for (const [ch, list] of [...byChapter.entries()].sort()) {
    list.sort((a, b) => a.subtopic.localeCompare(b.subtopic) || a.year.localeCompare(b.year));
    const file = ch.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + ".md";
    let md = `# ${subject} | ${ch} | ${list.length} items\n\n`;
    for (const s of list) {
      const fig = s.rs.some((r) => r.image_url) ? " | [has a figure you cannot see]" : "";
      md += `### ${s.id} | ${s.year} | paper ${s.paper} Q.${s.qno} | ${s.subtopic}${s.caseStudy ? " | CASE STUDY" : ""}${fig}\n`;
      if (s.caseStudy && s.rs[0].context) md += `Passage: ${s.rs[0].context.replace(/\s+/g, " ").trim()}\n`;
      for (const r of s.rs) {
        md += `${s.rs.length > 1 ? `Part ${r.question_number}: ` : ""}${r.text.replace(/\s+/g, " ").trim()}\n`;
        for (const o of [...r.options].sort((a, b) => a.label.localeCompare(b.label))) md += `  (${o.label}) ${o.text.replace(/\s+/g, " ").trim()}\n`;
      }
      md += "\n";
    }
    writeFileSync(join(out, "evidence", file), md);
    index.push({ chapter: ch, file, slots: list.length });
  }
  writeFileSync(join(out, "slots.json"), JSON.stringify(slotList.map(({ rs, ...s }) => s), null, 1));
  writeFileSync(join(out, "index.json"), JSON.stringify(index, null, 1));
  const years: Record<string, number> = {};
  slotList.forEach((s) => (years[s.year] = (years[s.year] ?? 0) + 1));
  console.log(`${rows.length} rows -> ${slotList.length} items (${slotList.filter((s) => s.rows.length > 1).length} multi-part case studies) in ${byChapter.size} chapters`, years);
  for (const i of index) console.log(`  ${i.slots}\t${i.chapter}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
