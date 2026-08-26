/**
 * Push a paper's `context` from its transcription JSON into the live rows.
 *
 *   npx tsx scripts/cds/sync-context.ts <paperId> [--apply]
 *
 * WHY A CONTEXT-ONLY PATH. `contentHash` covers stem + options + answer and
 * NOT context, so editing a passage is hash-neutral: no new rows, no superseded
 * rows to resync, no orphaned `paper_questions`, no mock breakage. The normal
 * route (`commit.ts --apply`) would still work, but its force-PRIVATE step is
 * paper-wide — it would un-publish all 120 questions and require a re-flip — to
 * write a field that cannot change a row's identity. This is the narrow tool.
 *
 * The expected context is produced by the SAME `buildRecords` pipeline commit
 * runs, so the two cannot disagree about how directions and a passage compose.
 * Re-implementing that string here is exactly how a sync tool drifts from the
 * committer.
 *
 * WHAT IT REFUSES. A row whose live context matches NEITHER the old nor the new
 * expected value has been edited by something else; it is reported and skipped
 * rather than overwritten. Everything else is a no-op when already in sync, so
 * re-running is safe.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { buildRecords, normalizeQuestions, type Section, type Underlines } from "./lib";
import { DATA, EXAM_ID, requirePaper } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const paperId = process.argv[2];
  const apply = process.argv.includes("--apply");
  if (!paperId) throw new Error("usage: sync-context.ts <paperId> [--apply]");
  const paper = requirePaper(paperId);

  const sections = JSON.parse(readFileSync(join(DATA, `${paperId}.sections.json`), "utf8")) as Section[];
  const questions = normalizeQuestions(JSON.parse(readFileSync(join(DATA, `${paperId}.questions.json`), "utf8")));
  const underlines = JSON.parse(readFileSync(join(DATA, `${paperId}.underlines.json`), "utf8")) as Underlines;
  const { rows, flags } = buildRecords(sections, questions, underlines);
  if (flags.length) {
    console.log(`${flags.length} build flag(s):`);
    for (const f of flags.slice(0, 10)) console.log(`  Q${f.number}: ${f.reason}`);
  }

  const want = new Map<string, string>();
  for (const r of rows) want.set(String(r.questionNumber), normalizeNewlines(r.context ?? ""));

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data, error } = await db.from("questions")
    .select("id, question_number, context")
    .eq("exam_id", EXAM_ID).eq("source_file", paper.sourceFile).order("source_row");
  if (error) throw new Error(error.message);

  const changes: { id: string; q: string; from: number; to: number }[] = [];
  let same = 0, missing = 0;
  for (const r of (data ?? []) as { id: string; question_number: string; context: string | null }[]) {
    const next = want.get(String(r.question_number));
    if (next === undefined) { missing++; continue; }
    if ((r.context ?? "") === next) { same++; continue; }
    changes.push({ id: r.id, q: String(r.question_number), from: (r.context ?? "").length, to: next.length });
  }

  console.log(`\n${paperId}: ${data?.length ?? 0} live rows — ${same} already in sync, ${changes.length} to update` +
    (missing ? `, ${missing} not present in the JSON` : ""));
  for (const c of changes) console.log(`  Q${c.q.padEnd(4)} context ${c.from} -> ${c.to} chars`);
  if (!apply) { console.log(`\n[dry run] pass --apply to write.`); return; }

  for (const c of changes) {
    const { error: uErr } = await db.from("questions")
      .update({ context: want.get(c.q)! }).eq("id", c.id);
    if (uErr) throw new Error(`Q${c.q}: ${uErr.message}`);
  }
  console.log(`\n${changes.length} context(s) updated.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
