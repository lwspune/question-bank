/**
 * Create the `MPSC Group B & C Prelims` exam row and its seven subjects.
 *
 *   npx tsx scripts/mpsc/seed.ts          # dry-run: report only
 *   npx tsx scripts/mpsc/seed.ts --apply  # create whatever is missing
 *
 * Idempotent. Prints the exam id to paste into config.ts as EXAM_ID — every row
 * this pipeline writes hangs off it, so it is created by a script with a record,
 * not by ad-hoc SQL.
 *
 * ONE EXAM, NOT TWO. Group B and Group C sit the same "सामान्य क्षमता चाचणी"
 * (General Ability Test) with the same syllabus, and the 2023 sitting was one
 * joint paper for both. Which group a paper was set for lives in each row's
 * pyq_note, and each paper remains its own mock.
 *
 * Subjects are curated here, not auto-created: commitStaged never creates a
 * subject, so a typo in a transcription batch fails loudly instead of forking
 * the taxonomy. Chapters and subtopics DO auto-create, as for every exam.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_NAME } from "./config";

export const SUBJECTS = [
  "History",
  "Geography",
  "Polity",
  "Economics",
  "General Science",
  "Current Affairs",
  "Reasoning and Aptitude",
] as const;

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const apply = process.argv.includes("--apply");
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let { data: exam, error } = await client.from("exams").select("id, name").eq("name", EXAM_NAME).maybeSingle();
  if (error) throw new Error(`exam read failed: ${error.message}`);
  if (!exam) {
    console.log(`"${EXAM_NAME}" does not exist yet.`);
    if (!apply) return console.log("[dry-run] pass --apply to create it and its subjects.");
    const ins = await client.from("exams").insert({ name: EXAM_NAME }).select("id, name").single();
    if (ins.error) throw new Error(`exam insert failed: ${ins.error.message}`);
    exam = ins.data;
    console.log(`created exam ${exam.id}`);
  }

  const { data: have, error: sErr } = await client.from("subjects").select("name").eq("exam_id", exam.id);
  if (sErr) throw new Error(`subject read failed: ${sErr.message}`);
  const missing = SUBJECTS.filter((s) => !(have ?? []).some((h) => h.name === s));
  console.log(`subjects present ${(have ?? []).length}, missing ${missing.length ? missing.join(", ") : "none"}`);
  if (missing.length && apply) {
    const { error: iErr } = await client.from("subjects").insert(missing.map((name) => ({ exam_id: exam!.id, name })));
    if (iErr) throw new Error(`subject insert failed: ${iErr.message}`);
    console.log(`created ${missing.length} subject(s)`);
  } else if (missing.length) {
    console.log("[dry-run] pass --apply to create them.");
  }
  console.log(`\nEXAM_ID = "${exam.id}"`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
