/**
 * Correct twins that are already in the bank, IN PLACE: the row keeps its id
 * (and so any attempt, save or report on it) and takes the twin file's current
 * text, options, solution and content hash.
 *
 *   npx tsx scripts/imat/practice/correct.ts <before.json>           # dry run
 *   npx tsx scripts/imat/practice/correct.ts <before.json> --apply   # write
 *
 * <before.json> is an array of the twins AS THEY WERE LOADED (copy each one
 * out of its year file before editing it). The stored row is found by the
 * hash of that old version; re-committing the edited twin instead would add a
 * second row beside the faulty one. Idempotent: a row already carrying the
 * new hash is found by it and simply written again.
 *
 * Refuses unless check.ts passes, and unless the edit keeps the answer letter
 * and the figure (those change what the question asks: write a new twin).
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { EXAM_NAME, ORG_ID } from "../config";
import { checkAllTwins } from "./check";
import { buildTwinRow, type ImatTwin } from "./lib";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const [file] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const apply = process.argv.includes("--apply");
  if (!file) throw new Error("give the JSON file of twins as they were loaded");
  const before = JSON.parse(readFileSync(file, "utf8")) as ImatTwin[];

  const { twins, problems } = checkAllTwins();
  if (problems.length) throw new Error(`check.ts reports ${problems.length} problem(s); fix them first`);
  const now = new Map(twins.map((t) => [t.id, t]));

  const plan = before.map((old) => {
    const cur = now.get(old.id);
    if (!cur) throw new Error(`${old.id}: not in any twin file`);
    if (cur.answer !== old.answer) throw new Error(`${old.id}: the answer changed; that is a new question, not a correction`);
    if (cur.figure?.file !== old.figure?.file) throw new Error(`${old.id}: the figure changed; that is a new question, not a correction`);
    return { id: old.id, oldRow: buildTwinRow(old, 1), newRow: buildTwinRow(cur, 1) };
  });
  for (const p of plan) console.log(`  ${p.id}: ${p.oldRow.contentHash.slice(0, 10)} -> ${p.newRow.contentHash.slice(0, 10)}`);

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: exam } = await client.from("exams").select("id").eq("name", EXAM_NAME).maybeSingle();
  if (!exam) throw new Error(`exam "${EXAM_NAME}" not found`);

  const find = async (hash: string) => {
    const { data, error } = await client
      .from("questions")
      .select("id")
      .eq("org_id", ORG_ID)
      .eq("exam_id", exam.id)
      .eq("content_hash", hash)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data?.id as string | undefined;
  };

  for (const { id, oldRow, newRow } of plan) {
    // The hash covers stem, options and key, not the solution, so a
    // solution-only edit keeps it: old and new then name the same row.
    const oldId = await find(oldRow.contentHash);
    const newId = oldRow.contentHash === newRow.contentHash ? oldId : await find(newRow.contentHash);
    if (oldId && newId && oldId !== newId) throw new Error(`${id}: both the old and the new version are stored; resolve by hand`);
    const rowId = oldId ?? newId;
    if (!rowId) {
      console.log(`  ${id}: not stored, nothing to correct (commit.ts will insert it)`);
      continue;
    }
    console.log(`  ${id}: row ${rowId} will be corrected`);
    if (!apply) continue;
    const { error } = await client
      .from("questions")
      .update({ text: newRow.text, solution: newRow.solution, content_hash: newRow.contentHash })
      .eq("id", rowId);
    if (error) throw new Error(`${id} question: ${error.message}`);
    for (const o of newRow.options) {
      const { error } = await client.from("options").update({ text: o.text }).eq("question_id", rowId).eq("label", o.label);
      if (error) throw new Error(`${id} option ${o.label}: ${error.message}`);
    }
  }
  if (!apply) console.log("\n[dry run] pass --apply to write.");
}

if (require.main === module)
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
