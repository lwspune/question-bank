/**
 * Review a newly ingested paper into an existing homework plan (2026-11-06),
 * without re-reviewing the chapters the plan already has.
 *
 *   npm run homework:new -- <plan slug> [--out=generated-papers/homework/<slug>-new]
 *
 * Finds the PUBLIC past questions the plan file has never seen (the same check
 * as homework:coverage and the daily prod check), and writes, per chapter:
 *   evidence/<chapter>.md   the new questions, then every group the plan already
 *                           has in that chapter (its index, kind, sittings, label
 *                           and newest question), so a reviewer only decides
 *                           where each new question belongs
 *   new-slots.json          the new questions, one slot each (a case study = its parts)
 * A reviewer follows scripts/homework/REVIEW_BRIEF_NEW.md and writes
 * out/<chapter>.json; `npm run homework:add-new -- <plan slug>` folds them in.
 * A question in a chapter the plan leaves out needs no review: add-new excludes it.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { isHomeworkPassage } from "@/lib/homework/slotContext";
import { compareSittings, sittingFor } from "@/lib/homework/sittings";
import type { NewSlot } from "@/lib/homework/newQuestions";
import { readPlanCoverage, readPlanFiles } from "../lib/homeworkCoverage";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Row = {
  id: string; question_number: string | null; text: string; context: string | null;
  pyq_year: number; pyq_month: string | null; pyq_note: string | null; source_file: string | null; image_url: string | null;
  chapter: { name: string } | null; subtopic: { name: string } | null;
  options: { label: string; text: string }[];
};

const COLS = "id,question_number,text,context,pyq_year,pyq_month,pyq_note,source_file,image_url,chapter:chapters(name),subtopic:subtopics(name),options(label,text)";

async function loadRows(client: SupabaseClient, ids: string[]): Promise<Map<string, Row>> {
  const out = new Map<string, Row>();
  for (let i = 0; i < ids.length; i += 150) {
    const { data, error } = await client.from("questions").select(COLS).in("id", ids.slice(i, i + 150));
    if (error) throw new Error(`questions: ${error.message}`);
    for (const r of (data ?? []) as unknown as Row[]) out.set(r.id, r);
  }
  return out;
}

const qnum = (s: string | null) => Number(/(\d+)/.exec(s ?? "")?.[1] ?? 9999);
const flat = (s: string) => s.replace(/\s+/g, " ").trim();
const fileName = (chapter: string) => chapter.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function main() {
  const slug = process.argv.slice(2).find((a) => !a.startsWith("--"));
  if (!slug) throw new Error("usage: npm run homework:new -- <plan slug> [--out=<dir>]");
  const out = process.argv.find((a) => a.startsWith("--out="))?.slice(6) ?? join("generated-papers", "homework", `${slug}-new`);
  const plan = readPlanFiles().find((p) => p.slug === slug);
  if (!plan) throw new Error(`no plan file with slug ${slug} in scripts/homework/data`);
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const coverage = await readPlanCoverage(client, plan);
  if (coverage.unplanned.length === 0) {
    console.log(`${slug}: nothing new; the plan covers every PUBLIC past question of ${plan.examName} ${plan.subjectName}.`);
    return;
  }
  const rows = await loadRows(client, coverage.unplanned.map((u) => u.id));

  // One slot per question; a case study (rows of one paper sharing a real passage) is one slot.
  const bySlot = new Map<string, Row[]>();
  for (const r of rows.values()) {
    const key = isHomeworkPassage(r.context) ? `cs|${r.source_file}|${r.context!.trim()}` : `q|${r.id}`;
    (bySlot.get(key) ?? bySlot.set(key, []).get(key)!).push(r);
  }
  const slots: (NewSlot & { rs: Row[] })[] = [...bySlot.values()].map((rs) => {
    rs.sort((a, b) => qnum(a.question_number) - qnum(b.question_number));
    const lead = rs[0];
    return {
      id: lead.id,
      sitting: sittingFor(plan.examName, lead),
      chapter: lead.chapter?.name ?? "(none)",
      ...(rs.length > 1 ? { rows: rs.map((r) => r.id) } : {}),
      rs,
    };
  });

  // The plan's groups by chapter, each shown by its newest question.
  const oldIds = [...new Set(plan.groups.flatMap((g) => g.questionIds))];
  const sittingOfOld = new Map(plan.questions.map((q) => [q.id, q.sitting]));
  const newestOf = plan.groups.map((g) =>
    [...g.questionIds].sort((a, b) => compareSittings(sittingOfOld.get(a) ?? "", sittingOfOld.get(b) ?? "")).at(-1)!
  );
  // Every planned question's chapter, so a chapter's evidence can list its groups
  // and the questions in no group (a new paper most often repeats one of those).
  const planIds = plan.questions.map((q) => q.id);
  const chapterOfOld = new Map<string, string>();
  for (let i = 0; i < planIds.length; i += 200) {
    const { data, error } = await client.from("questions").select("id, chapter:chapters(name)").in("id", planIds.slice(i, i + 200));
    if (error) throw new Error(`plan chapters: ${error.message}`);
    for (const r of (data ?? []) as unknown as { id: string; chapter: { name: string } | null }[]) chapterOfOld.set(r.id, r.chapter?.name ?? "");
  }
  const grouped = new Set(oldIds);
  const touched = new Set(slots.map((s) => s.chapter));
  const ungrouped = planIds.filter((id) => !grouped.has(id) && touched.has(chapterOfOld.get(id) ?? ""));
  const old = await loadRows(client, [...new Set([...newestOf, ...ungrouped])]);

  const leftOut = new Set(plan.excludedChapters ?? []);
  mkdirSync(join(out, "evidence"), { recursive: true });
  mkdirSync(join(out, "out"), { recursive: true });
  const chapters = [...new Set(slots.map((s) => s.chapter))].sort();
  for (const ch of chapters) {
    const mine = slots.filter((s) => s.chapter === ch).sort((a, b) => compareSittings(a.sitting, b.sitting));
    let md = `# ${plan.subjectName} | ${ch} | ${mine.length} new\n\n`;
    if (leftOut.has(ch)) md += `This chapter is LEFT OUT of the plan; these questions need no review (homework:add-new excludes them).\n\n`;
    md += `## New questions\n\n`;
    for (const s of mine) {
      const lead = s.rs[0];
      const fig = s.rs.some((r) => r.image_url) ? " | [has a figure you cannot see]" : "";
      md += `### ${s.id} | ${s.sitting} | Q.${lead.question_number ?? ""} | ${lead.subtopic?.name ?? ""}${s.rs.length > 1 ? " | CASE STUDY" : ""}${fig}\n`;
      if (lead.context?.trim()) md += `${s.rs.length > 1 ? "Passage" : "Instruction"}: ${flat(lead.context)}\n`;
      for (const r of s.rs) {
        md += `${s.rs.length > 1 ? `Part ${r.question_number}: ` : ""}${flat(r.text)}\n`;
        for (const o of [...r.options].sort((a, b) => a.label.localeCompare(b.label))) md += `  (${o.label}) ${flat(o.text)}\n`;
      }
      md += "\n";
    }
    md += `## Groups already in this chapter\n\nRefer to a group by its index. Join a repeat with {"id", "repeat": <index>, "changed": true|false}; a type with {"id", "type": <index>}.\n\n`;
    plan.groups.forEach((g, i) => {
      if (!g.questionIds.some((id) => chapterOfOld.get(id) === ch)) return;
      const ex = old.get(newestOf[i]);
      md += `- G${i} | ${g.tier} | ${g.sittings.length} sittings (${g.sittings.join(", ")}) | ${g.label}\n`;
      if (ex) md += `    newest (${sittingOfOld.get(ex.id)}): ${flat(ex.text).slice(0, 300)}\n`;
    });
    md += `
## Questions of this chapter in no group yet

A new question that repeats one of these makes a NEW group with it.

`;
    for (const id of ungrouped.filter((id) => chapterOfOld.get(id) === ch).sort((a, b) => compareSittings(sittingOfOld.get(a)!, sittingOfOld.get(b)!))) {
      const r = old.get(id);
      if (r) md += `- ${id} | ${sittingOfOld.get(id)} | ${flat(r.text).slice(0, 220)}
`;
    }
    writeFileSync(join(out, "evidence", `${fileName(ch)}.md`), md);
  }
  writeFileSync(join(out, "new-slots.json"), JSON.stringify(slots.map(({ rs, ...s }) => s), null, 1));
  const toReview = slots.filter((s) => !leftOut.has(s.chapter)).length;
  console.log(`${slug}: ${slots.length} new question(s) in ${chapters.length} chapter(s), ${toReview} to review -> ${out}`);
  for (const ch of chapters) console.log(`  ${slots.filter((s) => s.chapter === ch).length}\t${ch}${leftOut.has(ch) ? "  (left out of the plan)" : ""}`);
  console.log(`Review by scripts/homework/REVIEW_BRIEF_NEW.md into ${join(out, "out")}/<chapter>.json, then npm run homework:add-new -- ${slug}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
