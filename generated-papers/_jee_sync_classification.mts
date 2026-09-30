// usage: npx tsx generated-papers/_jee_sync_classification.mts [--apply]
// For every classification entry in scripts/jee/papers/*.json, find the committed row
// (JEE Mains, source_file = paper.sourceFile, question_number = key) and set the entry's
// chapter + subtopic to the row's CURRENT DB chapter + subtopic, so a re-commit lands rows
// where the bank already has them instead of recreating renamed chapters.
// A subject is rewritten only where the entry names one and it disagrees with the DB.
// Entries with no DB row, or more than one, are reported and left alone. Dry run by default.
import { createClient } from "@supabase/supabase-js";
import * as fs from "node:fs";
import * as path from "node:path";

const apply = process.argv.includes("--apply");
const c = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const { data: exam } = await c.from("exams").select("id").eq("name", "JEE Mains").single();
const DIR = "scripts/jee/papers";

type Row = { question_number: string; chapter: { name: string; subject: { name: string } } | null; subtopic: { name: string } | null };
const moves = new Map<string, number>();
let changed = 0, same = 0, missing = 0, ambiguous = 0, subjFix = 0, filesChanged = 0;
const missingList: string[] = [];

for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith(".json")).sort()) {
  const file = path.join(DIR, f);
  const raw = fs.readFileSync(file, "utf8");
  const paper = JSON.parse(raw);
  const cls = paper.classification as Record<string, { subject?: string; chapter: string; subtopic: string }> | undefined;
  if (!cls || !paper.sourceFile) continue;
  const { data, error } = await c
    .from("questions")
    .select("question_number, chapter:chapters(name, subject:subjects(name)), subtopic:subtopics(name)")
    .eq("exam_id", exam!.id)
    .eq("source_file", paper.sourceFile)
    .limit(1000);
  if (error) throw error;
  const byNum = new Map<string, Row[]>();
  for (const r of (data ?? []) as unknown as Row[]) {
    const k = String(r.question_number);
    if (!byNum.has(k)) byNum.set(k, []);
    byNum.get(k)!.push(r);
  }
  let dirty = false;
  for (const [num, v] of Object.entries(cls)) {
    const rows = byNum.get(num) ?? [];
    if (rows.length === 0) { missing++; missingList.push(`${f}#${num} (${v.chapter})`); continue; }
    if (rows.length > 1) { ambiguous++; console.log(`AMBIGUOUS ${f}#${num}: ${rows.length} rows`); continue; }
    const r = rows[0];
    if (!r.chapter || !r.subtopic) { missing++; missingList.push(`${f}#${num} (no chapter/subtopic in DB)`); continue; }
    const dbCh = r.chapter.name, dbSub = r.subtopic.name, dbSubj = r.chapter.subject.name;
    let touched = false;
    if (v.chapter !== dbCh || v.subtopic !== dbSub) {
      if (v.chapter !== dbCh) {
        const key = `${dbSubj}: ${v.chapter} -> ${dbCh}`;
        moves.set(key, (moves.get(key) ?? 0) + 1);
      }
      v.chapter = dbCh;
      v.subtopic = dbSub;
      touched = true;
    }
    if (v.subject && v.subject !== dbSubj) {
      console.log(`SUBJECT ${f}#${num}: ${v.subject} -> ${dbSubj}`);
      v.subject = dbSubj;
      subjFix++;
      touched = true;
    }
    if (touched) { changed++; dirty = true; } else same++;
  }
  if (dirty) {
    filesChanged++;
    if (apply) fs.writeFileSync(file, JSON.stringify(paper, null, 2) + (raw.endsWith("\n") ? "\n" : ""));
  }
}

console.log("\nchapter renames (subject: old -> current DB, rows):");
for (const [k, n] of [...moves].sort((a, b) => b[1] - a[1])) console.log(String(n).padStart(5), k);
console.log(`\nentries changed ${changed} (subject fixes ${subjFix}) · already in sync ${same} · no DB row ${missing} · ambiguous ${ambiguous} · files ${filesChanged}`);
if (missingList.length) console.log("no DB row (first 15):\n  " + missingList.slice(0, 15).join("\n  "));
console.log(apply ? "\nwritten" : "\ndry run — nothing written");
