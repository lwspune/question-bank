/**
 * Attach ONE verified figure crop to ONE row named by id.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/paper/attach-figure-by-row.ts <paperId> <ref> <rowId> [--apply]
 *
 * attach-figures.ts finds a reconcile paper's row by year + compilation file +
 * question number, and refuses when two rows match. In Chemistry 2025 two
 * sittings share all three (February and July both have a Q.1.viii), so the
 * refusal is right and the row has to be named. Same rules as that tool: only
 * a crop marked "clean" in data/figures/verified.json, a NEW storage key (the
 * old object stays, so pointing image_url back undoes it), and the row must be
 * this paper's own (subject, year, cover month) and carry this ref.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { DATA, EXAM_ID, requirePaper } from "./config";
import { grammarFor } from "./lib";

const envLocal = join(process.cwd(), ".env.local");
if (existsSync(envLocal)) require("dotenv").config({ path: envLocal, override: true });

const BUCKET = "question-images";
const PREFIX = "logic-12-pyq"; // attach-figures.ts's key prefix, kept so every board-paper crop sits together

async function main() {
  const [id, ref, rowId] = process.argv.slice(2);
  const apply = process.argv.includes("--apply");
  if (!id || !ref || !rowId) throw new Error("usage: attach-figure-by-row.ts <paperId> <ref> <rowId> [--apply]");
  const paper = requirePaper(id);
  const g = grammarFor(paper.subject);
  const file = `${id}.${ref.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.png`;
  const verified = JSON.parse(readFileSync(join(DATA, "figures", "verified.json"), "utf8")) as {
    figures: Record<string, { verdict: string }>;
  };
  if (verified.figures[file]?.verdict !== "clean") throw new Error(`${file} is not marked clean in verified.json`);
  if (!paper.figureRefs.includes(ref)) throw new Error(`${ref} is not in ${id}'s figureRefs`);

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const { data: row, error } = await db
    .from("questions")
    .select("id, exam_id, question_number, pyq_year, pyq_month, image_url, subject:subjects!subject_id(name)")
    .eq("id", rowId)
    .single();
  if (error || !row) throw new Error(`row ${rowId}: ${error?.message}`);
  const subject = (Array.isArray(row.subject) ? row.subject[0] : row.subject) as { name: string } | null;
  if (row.exam_id !== EXAM_ID || subject?.name !== paper.subject || row.pyq_year !== paper.year || row.pyq_month !== paper.month) {
    throw new Error(`row ${rowId} is not ${paper.subject} ${paper.month} ${paper.year}`);
  }
  if (g.normaliseRef(String(row.question_number)) !== g.normaliseRef(ref)) throw new Error(`row ${rowId} is ${row.question_number}, not ${ref}`);

  const key = `${PREFIX}/paper-${id}-${ref.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.png`;
  console.log(`${id} ${ref} -> row ${rowId}\n  was: ${row.image_url}\n  now: ${key}`);
  if (!apply) return console.log("DRY RUN: add --apply.");
  const { error: upErr } = await db.storage.from(BUCKET).upload(key, readFileSync(join(DATA, "figures", file)), { contentType: "image/png", upsert: false });
  if (upErr && !/exists/i.test(upErr.message)) throw new Error(`upload: ${upErr.message}`);
  const { error: uErr } = await db.from("questions").update({ image_url: key }).eq("id", rowId);
  if (uErr) throw new Error(uErr.message);
  console.log(`attached. undo: update questions set image_url='${row.image_url}' where id='${rowId}';`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
