/**
 * Past-year questions in a /notes chapter that carry NO concept tag, per chapter.
 *
 *   npm run notes:untagged            # busiest 30 chapters + total
 *   npm run notes:untagged -- --all   # every chapter with a gap
 *
 * Read-only triage, exits 0. Earned 2026-09-14 (SUGGESTIONS.md): the NDA II 2026
 * tagging pass left three questions untagged because no concept fit, honestly,
 * and nothing reported "PYQs in a noted subtopic with no concept tag", so the gap
 * could only be rediscovered by whoever next read the tags. An untagged row is
 * not a defect by itself (a wrong tag is worse than none); this makes the number
 * visible so a gap that keeps growing earns a new ConceptUnit.
 *
 * Counts follow the notes count rule: pyq only, PUBLIC.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { NOTES_CHAPTERS } from "../src/lib/notes/chapters";
import { readAllPages } from "../src/lib/supabase/readAllPages";
import { readAllByKeyset } from "../src/lib/supabase/keyset";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const all = process.argv.includes("--all");
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const page = <T>(table: string, cols: string) =>
    readAllPages<T>((from, to) => db.from(table).select(cols).order("id").range(from, to) as unknown as PromiseLike<{ data: T[] | null; error: { message: string } | null }>);
  const [exams, subjects, chapters] = await Promise.all([
    page<{ id: string; name: string }>("exams", "id, name"),
    page<{ id: string; name: string; exam_id: string }>("subjects", "id, name, exam_id"),
    page<{ id: string; name: string; subject_id: string }>("chapters", "id, name, subject_id"),
  ]);
  const examName = new Map(exams.map((e) => [e.id, e.name]));
  const subj = new Map(subjects.map((s) => [s.id, { name: s.name, exam: examName.get(s.exam_id) }]));
  const noted = new Map<string, string>(); // chapter id -> route
  for (const c of chapters) {
    const s = subj.get(c.subject_id);
    const n = NOTES_CHAPTERS.find((x) => x.examName === s?.exam && x.subjectName === s?.name && x.chapter.chapterName === c.name);
    if (n) noted.set(c.id, `${n.subjectRoute}/${n.chapterSlug}`);
  }

  type Row = { id: string; chapter_id: string };
  const rows = await readAllByKeyset<Row>(async (last, limit) => {
    let q = db.from("questions").select("id, chapter_id").eq("visibility", "PUBLIC").eq("question_kind", "pyq");
    if (last) q = q.gt("id", last.id);
    const { data, error } = await q.order("id").limit(limit);
    if (error) throw new Error(error.message);
    return (data ?? []) as Row[];
  }, 1000);
  type Tag = { question_id: string };
  const tags = await readAllByKeyset<Tag & { id?: string }>(async (last, limit) => {
    let q = db.from("question_concept_tags").select("question_id");
    if (last) q = q.gt("question_id", last.question_id);
    const { data, error } = await q.order("question_id").limit(limit);
    if (error) throw new Error(error.message);
    return (data ?? []) as Tag[];
  }, 1000);
  const tagged = new Set(tags.map((t) => t.question_id));

  const perChapter = new Map<string, { total: number; untagged: number }>();
  for (const r of rows) {
    const route = noted.get(r.chapter_id);
    if (!route) continue;
    const e = perChapter.get(route) ?? { total: 0, untagged: 0 };
    e.total++;
    if (!tagged.has(r.id)) e.untagged++;
    perChapter.set(route, e);
  }
  const list = [...perChapter].filter(([, v]) => v.untagged > 0).sort((a, b) => b[1].untagged - a[1].untagged);
  const sum = list.reduce((n, [, v]) => n + v.untagged, 0);
  const total = [...perChapter.values()].reduce((n, v) => n + v.total, 0);
  console.log(`notes:untagged: ${sum} of ${total} PUBLIC PYQs in ${perChapter.size} noted chapters carry no concept tag\n`);
  for (const [route, v] of all ? list : list.slice(0, 30)) console.log(`  ${String(v.untagged).padStart(4)} of ${String(v.total).padStart(4)}  ${route}`);
  if (!all && list.length > 30) console.log(`  … ${list.length - 30} more chapters (--all)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
