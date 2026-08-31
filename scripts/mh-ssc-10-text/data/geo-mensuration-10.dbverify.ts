// scratch (geo-mensuration-10): verify the shipped state FROM THE DATABASE, not
// from any script's exit code (AGENT_BRIEF §7). Delete after use.
import { join } from "node:path";
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { ORG_ID, EXAM_ID, requireChapter, questionsJsonPath } from "../config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const ID = "geo-mensuration-10";

async function main() {
  const ch = requireChapter(ID);
  const c = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data, error } = await c
    .from("questions")
    .select(
      "id, question_number, visibility, question_kind, question_format, solution, section_kind, section_group, section_label, section_seq, chapter_id, subtopic_id, text, context, chapters(name), subtopics(name), options(label, text, is_correct)"
    )
    .eq("org_id", ORG_ID)
    .eq("exam_id", EXAM_ID)
    .eq("source_file", ch.sourceFile);
  if (error) throw error;
  const rows = data as any[];

  const fail: string[] = [];
  const push = (cond: boolean, msg: string) => { if (!cond) fail.push(msg); };

  push(rows.length === 72, `row count ${rows.length}, expected 72`);
  for (const r of rows) {
    const n = r.question_number;
    push(r.visibility === "PUBLIC", `${n}: visibility ${r.visibility}`);
    push(r.question_kind === "practice", `${n}: kind ${r.question_kind}`);
    push(!!r.solution && r.solution.trim().length > 0, `${n}: no solution`);
    push(r.section_seq != null, `${n}: no section_seq`);
    push(!!r.section_kind && !!r.section_group && !!r.section_label, `${n}: incomplete section_*`);
    push(r.chapter_id != null, `${n}: no chapter`);
    push(r.subtopic_id != null, `${n}: no subtopic`);
    push(r.chapters?.name === ch.chapterName, `${n}: chapter "${r.chapters?.name}"`);
    if (r.question_format === "mcq") {
      push(r.options.length === 4, `${n}: ${r.options.length} options`);
      push(r.options.filter((o: any) => o.is_correct).length === 1, `${n}: not exactly one correct option`);
      push(new Set(r.options.map((o: any) => o.text)).size === 4, `${n}: duplicate option text`);
    } else {
      push(r.options.length === 0, `${n}: subjective row carries ${r.options.length} options`);
    }
    for (const [f, v] of Object.entries({ text: r.text, context: r.context, solution: r.solution })) {
      if (typeof v !== "string") continue;
      if (/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(v)) fail.push(`${n}: control char in ${f}`);
      if (v.includes("�")) fail.push(`${n}: U+FFFD in ${f}`);
      if (v.includes("\\\\(") || v.includes("\\\\)")) fail.push(`${n}: double-escaped delimiter in ${f}`);
      const o = (v.match(/\\\(/g) || []).length, cl = (v.match(/\\\)/g) || []).length;
      if (o !== cl) fail.push(`${n}: ${o} open vs ${cl} close math delimiters in ${f}`);
    }
  }

  // refs in the DB must be exactly the refs we transcribed
  const src = JSON.parse(readFileSync(questionsJsonPath(ID), "utf8")) as any[];
  const want = new Set(src.map((q) => q.ref));
  const got = new Set(rows.map((r) => r.question_number));
  for (const r of want) if (!got.has(r)) fail.push(`ref missing from DB: ${r}`);
  for (const r of got) if (!want.has(r)) fail.push(`unexpected ref in DB: ${r}`);

  // book order: section_seq contiguous 1..N and each block's kind consistent
  const seqs = [...new Set(rows.map((r) => r.section_seq))].sort((a, b) => a - b);
  push(seqs[0] === 1 && seqs[seqs.length - 1] === seqs.length, `section_seq not contiguous: ${seqs.join(",")}`);

  const byBlock = new Map<number, { g: string; k: string; n: number }>();
  for (const r of rows) {
    const b = byBlock.get(r.section_seq) ?? { g: r.section_group, k: r.section_kind, n: 0 };
    b.n++; byBlock.set(r.section_seq, b);
  }
  console.log(`\n${ch.chapterName} — ${rows.length} rows live\n`);
  for (const s of seqs) {
    const b = byBlock.get(s)!;
    console.log(`  [${String(s).padStart(2)}] ${b.g.padEnd(56)} ${String(b.n).padStart(3)} q · ${b.k}`);
  }
  const fmt = rows.reduce((m: any, r) => ((m[r.question_format] = (m[r.question_format] ?? 0) + 1), m), {});
  const vis = rows.reduce((m: any, r) => ((m[r.visibility] = (m[r.visibility] ?? 0) + 1), m), {});
  const sub = rows.reduce((m: any, r) => ((m[r.subtopics?.name] = (m[r.subtopics?.name] ?? 0) + 1), m), {});
  console.log(`\nformat: ${JSON.stringify(fmt)}   visibility: ${JSON.stringify(vis)}`);
  console.log(`subtopics: ${JSON.stringify(sub, null, 2)}`);

  console.log(fail.length ? `\n${fail.length} PROBLEM(S):\n  ${fail.join("\n  ")}` : "\nALL CHECKS PASSED");
  if (fail.length) process.exit(1);
}
main().catch((e) => { console.error(e); process.exit(1); });
