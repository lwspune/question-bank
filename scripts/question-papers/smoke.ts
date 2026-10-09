/**
 * npm run papers:smoke — drive /question-papers' own paper loader over every
 * stored paper (published or not) and check each one assembles whole: every
 * question resolves, the marks add up to the printed total, and every
 * case-study part carries its passage. Read-only. The pages render on first
 * visit, so the build never proves this; it proves the DATA, not the layout.
 */
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";
import { getPaperGroup } from "../../src/lib/questionPapers/query";

async function main() {
  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: groups, error } = await admin.from("board_papers").select("exam_id, group_slug").range(0, 4999);
  if (error) throw new Error(error.message);
  const unique = [...new Map((groups ?? []).map((g) => [`${g.exam_id}|${g.group_slug}`, g])).values()];
  let papers = 0;
  let items = 0;
  const problems: string[] = [];
  for (const g of unique) {
    const sets = await getPaperGroup(admin, g.exam_id as string, g.group_slug as string, { publishedOnly: false });
    for (const s of sets) {
      papers++;
      if (!s.items) {
        problems.push(`${s.slug}: a question is missing`);
        continue;
      }
      items += s.items.length;
      const marks = s.items.reduce((n, it) => (it.isAlternative ? n : n + it.marks), 0);
      if (marks !== s.totalMarks) problems.push(`${s.slug}: marks ${marks}, printed ${s.totalMarks}`);
      const noPassage = s.items.filter((it) => it.caseKey && !it.question.context);
      if (noPassage.length) problems.push(`${s.slug}: ${noPassage.length} case-study part(s) without a passage`);
      const blank = s.items.filter((it) => !it.question.text.trim());
      if (blank.length) problems.push(`${s.slug}: ${blank.length} blank question(s)`);
      if (s.sections.length === 0) problems.push(`${s.slug}: no sections`);
    }
  }
  console.log(`${unique.length} group(s), ${papers} paper(s), ${items} item(s) checked`);
  if (problems.length) {
    console.log(`\n${problems.length} problem(s):`);
    for (const p of problems.slice(0, 40)) console.log(`  ${p}`);
    process.exit(1);
  }
  console.log("every paper assembles whole");
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
