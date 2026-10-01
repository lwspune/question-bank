/**
 * Dump one CDS General Knowledge chapter for a /notes pass.
 *
 *   npx tsx scripts/notes-pipeline/cds-gk/dump.ts <Subject> "<Chapter>" <code>
 *
 * Writes generated-papers/_cdsk_<code>.json ({ questions: [...] }, the shape
 * scripts/notes-pipeline/jee/tag-chapter.ts reads) and _cdsk_<code>.md, one
 * block per row: id, sitting, Q#, difficulty, subtopic, stem, options (key
 * starred), solution. PUBLIC rows only; it says how many others the chapter has,
 * because a withheld row can still sit in a subtopic a re-cut wants to drop.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const [subject, chapter, code] = process.argv.slice(2);
  if (!subject || !chapter || !code) throw new Error('usage: dump.ts <Subject> "<Chapter>" <code>');
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  const { data: chs, error: ce } = await sb
    .from("chapters")
    .select("id, subjects!inner(name, exams!inner(name))")
    .eq("name", chapter);
  if (ce) throw ce;
  const hit = (chs ?? []).filter((c: any) => c.subjects?.name === subject && c.subjects?.exams?.name === "CDS");
  if (hit.length !== 1) throw new Error(`expected 1 CDS ${subject} chapter "${chapter}", found ${hit.length}`);
  const chapterId = (hit[0] as any).id as string;

  const { data, error } = await sb
    .from("questions")
    .select(
      "id, visibility, question_kind, pyq_year, pyq_note, question_number, source_file, difficulty, set_id, image_url, text, context, solution, subtopics(name), options(label, text, is_correct, image_url)"
    )
    .eq("chapter_id", chapterId)
    .order("pyq_year")
    .limit(1000);
  if (error) throw error;
  const all = (data ?? []) as any[];
  const pub = all.filter((r) => r.visibility === "PUBLIC");

  const questions = pub.map((r) => {
    const opts = [...(r.options ?? [])].sort((a: any, b: any) => a.label.localeCompare(b.label));
    return {
      id: r.id as string,
      sitting: String(r.pyq_note ?? "").split(" — ")[0],
      year: r.pyq_year,
      number: r.question_number,
      sourceFile: r.source_file,
      difficulty: r.difficulty,
      subtopic: r.subtopics?.name ?? null,
      setId: r.set_id,
      image: r.image_url,
      context: r.context,
      text: r.text,
      options: opts.map((o: any) => ({ label: o.label, text: o.text, correct: o.is_correct, image: o.image_url })),
      answer: opts.find((o: any) => o.is_correct)?.label ?? null,
      solution: r.solution,
    };
  });
  const out = join("generated-papers", `_cdsk_${code}`);
  writeFileSync(`${out}.json`, JSON.stringify({ subject, chapter, chapterId, questions }, null, 1));

  const md: string[] = [];
  for (const q of questions) {
    md.push(`### ${q.id.slice(0, 8)} | ${q.sitting} Q${q.number} | ${q.difficulty} | ${q.subtopic}${q.image ? " | IMG" : ""}${q.setId ? " | SET" : ""}`);
    if (q.context) md.push(`CTX: ${q.context}`);
    md.push(`Q: ${q.text}`);
    md.push(`O: ${q.options.map((o) => `${o.label}${o.correct ? "*" : ""}) ${o.text}${o.image ? "[IMG]" : ""}`).join("  ")}`);
    md.push(`S: ${q.solution}`, "");
  }
  writeFileSync(`${out}.md`, md.join("\n"));

  const bySub = new Map<string, number>();
  for (const q of questions) bySub.set(q.subtopic ?? "(none)", (bySub.get(q.subtopic ?? "(none)") ?? 0) + 1);
  console.log(`${chapter}: ${pub.length} PUBLIC${all.length > pub.length ? `, ${all.length - pub.length} not public` : ""} -> ${out}.{json,md}`);
  for (const [s, n] of [...bySub].sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(3)}  ${s}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
