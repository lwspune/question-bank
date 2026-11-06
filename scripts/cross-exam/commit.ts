// Write one settled exam-twin run (scripts/cross-exam/data/<run>.json) to
// public.exam_twins (migration 0220).
//
//   npx tsx scripts/cross-exam/commit.ts <run>             # DRY RUN: checks + what would change
//   npx tsx scripts/cross-exam/commit.ts <run> --apply     # write it
//
// The file is the record of its run: pairs in it are upserted, and rows stored
// under the same run but no longer in the file (a re-review dropped them) are
// deleted. The whole file is refused if any pair breaks a rule: a question
// that does not exist, is not PUBLIC, a target that is not a past-paper
// question, two questions of one exam, or a question outside the chapters the
// file names. The database enforces the first three as well (0220's trigger);
// checking here makes a dry run say so before anything is written.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { validateSettled, type ChapterRef, type SettledFile } from "@/lib/crossExam/settled";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type BankRow = {
  id: string;
  visibility: string;
  question_kind: string;
  exam_id: string;
  exam: { name: string } | null;
  subject: { name: string } | null;
  chapter: { name: string } | null;
};

async function loadBank(client: SupabaseClient, ids: string[]): Promise<Map<string, BankRow>> {
  const out = new Map<string, BankRow>();
  for (let i = 0; i < ids.length; i += 150) {
    const { data, error } = await client
      .from("questions")
      .select("id, visibility, question_kind, exam_id, exam:exams(name), subject:subjects(name), chapter:chapters(name)")
      .in("id", ids.slice(i, i + 150));
    if (error) throw new Error(`questions: ${error.message}`);
    for (const r of (data ?? []) as unknown as BankRow[]) out.set(r.id, r);
  }
  return out;
}

const inChapter = (r: BankRow, c: ChapterRef) =>
  r.exam?.name === c.exam && r.subject?.name === c.subject && r.chapter?.name === c.chapter;

async function main() {
  const arg = process.argv.slice(2).find((a) => !a.startsWith("--"));
  const apply = process.argv.includes("--apply");
  if (!arg) throw new Error("usage: commit.ts <run> [--apply]");
  const path = arg.endsWith(".json") ? arg : join(process.cwd(), "scripts/cross-exam/data", `${arg}.json`);
  const file = JSON.parse(readFileSync(path, "utf8")) as SettledFile;

  const shape = validateSettled(file);
  if (shape.length) throw new Error(`settled file is malformed:\n  ${shape.join("\n  ")}`);

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const ids = Array.from(new Set(file.pairs.flatMap((p) => [p.source, p.target])));
  const bank = await loadBank(client, ids);

  const errors: string[] = [];
  file.pairs.forEach((p, i) => {
    const s = bank.get(p.source);
    const t = bank.get(p.target);
    const at = `pairs[${i}]`;
    if (!s) return void errors.push(`${at}: source ${p.source} does not exist`);
    if (!t) return void errors.push(`${at}: target ${p.target} does not exist`);
    if (s.visibility !== "PUBLIC" || t.visibility !== "PUBLIC") errors.push(`${at}: both questions must be PUBLIC`);
    if (t.question_kind !== "pyq") errors.push(`${at}: target is not a past-paper question`);
    if (s.exam_id === t.exam_id) errors.push(`${at}: both questions are in ${s.exam?.name}`);
    if (!file.targets.some((c) => inChapter(t, c))) errors.push(`${at}: target is in ${t.exam?.name} / ${t.chapter?.name}, not one of the file's target chapters`);
    if (!file.board.some((b) => inChapter(s, b))) errors.push(`${at}: source is in ${s.exam?.name} / ${s.chapter?.name}, not one of the file's board chapters`);
  });
  if (errors.length) throw new Error(`refusing ${file.run}:\n  ${errors.slice(0, 30).join("\n  ")}${errors.length > 30 ? `\n  ...${errors.length - 30} more` : ""}`);

  // What is stored now: this run's rows, and any of these pairs stored under another run.
  const { data: stored, error: se } = await client
    .from("exam_twins")
    .select("source_question_id, target_question_id, kind, review_run")
    .eq("review_run", file.run)
    .range(0, 9999);
  if (se) throw new Error(`exam_twins: ${se.message}`);
  const key = (s: string, t: string) => `${s}>${t}`;
  const inFile = new Set(file.pairs.map((p) => key(p.source, p.target)));
  const storedRun = new Map((stored ?? []).map((r) => [key(r.source_question_id, r.target_question_id), r]));
  const stale = (stored ?? []).filter((r) => !inFile.has(key(r.source_question_id, r.target_question_id)));
  const added = file.pairs.filter((p) => !storedRun.has(key(p.source, p.target)));
  const changed = file.pairs.filter((p) => storedRun.get(key(p.source, p.target))?.kind !== undefined && storedRun.get(key(p.source, p.target))!.kind !== p.kind);

  const kinds: Record<string, number> = {};
  for (const p of file.pairs) kinds[p.kind] = (kinds[p.kind] ?? 0) + 1;
  console.log(`${file.run}: ${file.pairs.length} pairs (${Object.entries(kinds).map(([k, n]) => `${n} ${k}`).join(", ")})`);
  console.log(`  ${new Set(file.pairs.map((p) => p.source)).size} board questions -> ${new Set(file.pairs.map((p) => p.target)).size} ${file.targets[0].exam} questions`);
  console.log(`  new ${added.length} · kind changed ${changed.length} · dropped from this run ${stale.length}`);
  if (!apply) {
    console.log("DRY RUN: nothing written. Add --apply to write.");
    return;
  }

  const rows = file.pairs.map((p) => ({
    source_question_id: p.source,
    target_question_id: p.target,
    kind: p.kind,
    why: p.why.trim(),
    review_run: file.run,
  }));
  for (let i = 0; i < rows.length; i += 500) {
    const { error } = await client
      .from("exam_twins")
      .upsert(rows.slice(i, i + 500), { onConflict: "source_question_id,target_question_id" });
    if (error) throw new Error(`upsert: ${error.message}`);
  }
  for (const r of stale) {
    const { error } = await client
      .from("exam_twins")
      .delete()
      .eq("source_question_id", r.source_question_id)
      .eq("target_question_id", r.target_question_id)
      .eq("review_run", file.run);
    if (error) throw new Error(`delete: ${error.message}`);
  }
  console.log(`written: ${rows.length} upserted, ${stale.length} deleted`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
