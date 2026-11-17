/**
 * Print the chapters and subtopics a UP subject may file a question on.
 *
 *   npx tsx scripts/up-board/catalog.ts maths10
 *
 * Copy names EXACTLY: a chapter or subtopic differing by one character forks
 * the taxonomy on commit. validate.ts refuses any name not printed here.
 */
import { SUBJECTS, subtopicCatalog, type UpSubjectKey } from "./config";

const key = process.argv[2] as UpSubjectKey;
const subject = SUBJECTS[key];
if (!subject) throw new Error(`usage: catalog.ts <${Object.keys(SUBJECTS).join("|")}>`);
for (const [chapter, subs] of subtopicCatalog(subject)) {
  console.log(chapter);
  for (const s of subs) console.log(`  - ${s}`);
}
