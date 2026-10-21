/**
 * Create the SPI exam row and its subjects (SUBJECTS in config.ts).
 *
 *   npx tsx scripts/spi/seed.ts          # dry run: report only
 *   npx tsx scripts/spi/seed.ts --apply  # create whatever is missing
 *
 * Idempotent. commitStaged creates chapters and subtopics but refuses an unknown SUBJECT
 * (a typo would corrupt the top level), so this runs before the first commit.
 *
 * RUN IT ONLY WHEN THE FIRST PAPER IS READY TO COMMIT: /browse lists every row of `exams`,
 * so from this moment an "SPI" with no public questions can show in the exam dropdown.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_NAME, SUBJECTS } from "./config";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const apply = process.argv.includes("--apply");
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

  let { data: exam } = await client.from("exams").select("id, name").eq("name", EXAM_NAME).maybeSingle();
  if (!exam) {
    console.log(`exam "${EXAM_NAME}" does not exist yet.`);
    if (!apply) return console.log(`[dry run] would create it and ${SUBJECTS.length} subjects: ${SUBJECTS.join(", ")}`);
    const { data, error } = await client.from("exams").insert({ name: EXAM_NAME }).select("id, name").single();
    if (error) throw new Error(`exam insert failed: ${error.message}`);
    exam = data;
    console.log(`created exam ${exam.name}  ${exam.id}`);
  } else console.log(`exam exists: ${exam.name}  ${exam.id}`);

  const { data: existing, error } = await client.from("subjects").select("name").eq("exam_id", exam.id);
  if (error) throw new Error(`subject read failed: ${error.message}`);
  const have = new Set((existing ?? []).map((s) => s.name));
  const missing = SUBJECTS.filter((n) => !have.has(n));
  console.log(`missing subjects: ${missing.join(", ") || "(none)"}`);
  if (!missing.length) return;
  if (!apply) return console.log("[dry run] pass --apply to create them.");
  const { error: iErr } = await client.from("subjects").insert(missing.map((name) => ({ exam_id: exam!.id, name })));
  if (iErr) throw new Error(`subject insert failed: ${iErr.message}`);
  const { data: after } = await client.from("subjects").select("name").eq("exam_id", exam.id);
  const still = SUBJECTS.filter((n) => !(after ?? []).some((s) => s.name === n));
  if (still.length) throw new Error(`after apply, still missing: ${still.join(", ")}`);
  console.log(`verified: all ${SUBJECTS.length} subjects exist under ${EXAM_NAME}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
