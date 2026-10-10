/**
 * Refresh a row's STALE content_hash: the row's text was corrected after commit
 * but its fingerprint was not recomputed, so the next commit of the same
 * transcription would duplicate it and /question-papers cannot find it.
 *
 *   npx tsx scripts/mh-ssc-10/refresh-hash.ts <paperId> <ref> [--apply]
 *
 * Writes ONLY content_hash, and only when all three hold:
 *  - the transcription's record for <ref> fingerprints to H (the lane's own
 *    buildPaperRecords, the function commit used);
 *  - the bank row's CURRENT text/context/options fingerprint to that same H, so
 *    the row already says what the transcription says and only the stored hash
 *    lags;
 *  - no other row of the exam already carries H.
 * Anything else is a content disagreement, which this tool refuses.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, requirePaper, questionsJsonPath, paperCatalogs } from "./config";
import { buildPaperRecords, type PaperQuestion } from "./lib";
import { contentHash, subjectiveContentHash } from "../../src/lib/upload/hash";

const envLocal = join(process.cwd(), ".env.local");
if (existsSync(envLocal)) require("dotenv").config({ path: envLocal, override: true });

async function main() {
  const [id, ref] = process.argv.slice(2);
  const apply = process.argv.includes("--apply");
  if (!id || !ref) throw new Error("usage: refresh-hash.ts <paperId> <ref> [--apply]");
  const paper = requirePaper(id);
  const raw = JSON.parse(readFileSync(questionsJsonPath(id), "utf8"));
  const questions = (Array.isArray(raw) ? raw : raw.questions) as PaperQuestion[];
  const { rows } = buildPaperRecords(paperCatalogs(paper), questions);
  const i = questions.findIndex((q) => q.ref === ref);
  if (i < 0) throw new Error(`${id}: no ref ${ref}`);
  const want = rows[i].contentHash;

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const { data: hits, error } = await db
    .from("questions")
    .select("id, text, context, content_hash, question_format, options(label, text, is_correct)")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile)
    .eq("question_number", ref);
  if (error) throw new Error(error.message);
  if (hits?.length !== 1) throw new Error(`${id} ${ref}: ${hits?.length ?? 0} rows, expected 1`);
  const row = hits[0] as unknown as { id: string; text: string; context: string | null; content_hash: string; question_format: string; options: { label: string; text: string; is_correct: boolean }[] };
  const opts = [...(row.options ?? [])].sort((a, b) => a.label.localeCompare(b.label));
  const now =
    row.question_format === "mcq"
      ? contentHash(row.text, opts.map((o) => o.text), opts.find((o) => o.is_correct)?.label ?? "")
      : subjectiveContentHash(row.text, row.context ?? null);
  console.log(`${id} ${ref} row ${row.id}\n  stored ${row.content_hash}\n  text   ${now}\n  record ${want}`);
  if (row.content_hash === want) return console.log("already current; nothing to do.");
  if (now !== want) throw new Error("the row's current content does not match the transcription; this is a content disagreement, not a stale hash");
  const { data: other } = await db.from("questions").select("id").eq("exam_id", EXAM_ID).eq("content_hash", want).neq("id", row.id);
  if (other?.length) throw new Error(`row ${other[0].id} already carries ${want}`);
  if (!apply) return console.log("DRY RUN: add --apply.");
  const { data: done, error: uErr } = await db.from("questions").update({ content_hash: want }).eq("id", row.id).eq("content_hash", row.content_hash).select("id");
  if (uErr) throw new Error(uErr.message);
  if (done?.length !== 1) throw new Error("row changed since it was read; nothing written");
  console.log(`refreshed. undo: update questions set content_hash='${row.content_hash}' where id='${row.id}';`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
