/**
 * Create the AFCAT exam row and its one subject, "Numerical Ability".
 *
 *   npx tsx scripts/afcat/seed.ts          # dry run: report only
 *   npx tsx scripts/afcat/seed.ts --apply  # create whatever is missing
 *
 * Idempotent. Subjects are never created by commitStaged (a typo would corrupt
 * the top-level taxonomy), so this must run before the first commit. Chapters
 * and subtopics ARE created by the commit.
 *
 * RUN IT ONLY WHEN THE FIRST CHAPTER IS READY TO COMMIT: /browse lists every
 * row of `exams` (listExams), so from this moment an "AFCAT" with no public
 * questions shows in the exam dropdown until the first chapter goes PUBLIC.
 */
import { EXAM_NAME, SUBJECT_NAME } from "./config";
import { adminClient } from "./db";

async function main() {
  const apply = process.argv.includes("--apply");
  const client = adminClient();

  let { data: exam } = await client.from("exams").select("id, name").eq("name", EXAM_NAME).maybeSingle();
  if (!exam) {
    console.log(`exam "${EXAM_NAME}" does not exist yet.`);
    if (!apply) return console.log(`[dry run] would create it and subject "${SUBJECT_NAME}".`);
    const { data, error } = await client.from("exams").insert({ name: EXAM_NAME }).select("id, name").single();
    if (error) throw new Error(`exam insert failed: ${error.message}`);
    exam = data;
    console.log(`created exam ${exam.name}  ${exam.id}`);
  } else console.log(`exam exists: ${exam.name}  ${exam.id}`);

  const { data: subj } = await client.from("subjects").select("id").eq("exam_id", exam.id).eq("name", SUBJECT_NAME).maybeSingle();
  if (subj) return console.log(`subject exists: ${SUBJECT_NAME}  ${subj.id}`);
  if (!apply) return console.log(`[dry run] would create subject "${SUBJECT_NAME}".`);
  const { data: made, error: sErr } = await client.from("subjects").insert({ exam_id: exam.id, name: SUBJECT_NAME }).select("id").single();
  if (sErr) throw new Error(`subject insert failed: ${sErr.message}`);
  console.log(`created subject ${SUBJECT_NAME}  ${made.id}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
