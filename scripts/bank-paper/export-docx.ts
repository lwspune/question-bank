/**
 * Export a /dashboard/papers paper to Word — question paper + answer key.
 *
 *   npx tsx scripts/bank-paper/export-docx.ts <paperId> [outNamePrefix]
 *
 * Uses buildQuestionPaper / buildAnswerKey, the SAME builders behind the
 * /browse and /dashboard download buttons, so the offline file is byte-for-byte
 * the document a teacher would get from the UI.
 *
 * ORDERING — `paper_questions.position` is a fractional sort key scoped to a
 * SECTION, not a paper-wide ordinal: addQuestion takes the max position WITHIN
 * `section_key` before appending. So every section restarts at 1, and ordering the
 * membership globally by position interleaves them — on a GAT mock that shuffles
 * English through the General-Knowledge block. The printed order is therefore
 * (section's place in the paper's section_template, then position within it).
 *
 * `groupBySubtopic` is deliberately OFF. It is right for a chapter drill, where the
 * headings teach; on a mock it would print the answer key's own topic labels above
 * each run of questions and tell the candidate what each one is testing.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { buildQuestionPaper, buildAnswerKey } from "../../src/lib/export/docxBuilder";
import { queryQuestionsByIds } from "../../src/lib/questions/query";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const paperId = process.argv[2];
  if (!paperId) throw new Error("usage: export-docx.ts <paperId> [outNamePrefix]");

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: paper, error: pErr } = await client
    .from("papers").select("id, title, section_template").eq("id", paperId).single();
  if (pErr || !paper) throw new Error(`paper ${paperId}: ${pErr?.message ?? "not found"}`);

  const template = (paper.section_template ?? []) as { key: string }[];
  const sectionRank = new Map(template.map((s, i) => [s.key, i]));

  const { data: mem, error: mErr } = await client
    .from("paper_questions")
    .select("question_id, position, section_key")
    .eq("paper_id", paperId);
  if (mErr) throw new Error(`membership: ${mErr.message}`);

  const rows0 = (mem ?? []) as { question_id: string; position: number; section_key: string }[];
  const unknown = rows0.filter((m) => !sectionRank.has(m.section_key));
  if (unknown.length) {
    // Sorting these to the front or back would silently move questions.
    throw new Error(
      `${unknown.length} question(s) in section(s) not in the paper's template: ` +
        `${[...new Set(unknown.map((m) => m.section_key))].join(", ")}`
    );
  }

  const ids = rows0
    .sort((a, b) =>
      sectionRank.get(a.section_key)! - sectionRank.get(b.section_key)! || a.position - b.position
    )
    .map((m) => m.question_id);
  if (!ids.length) throw new Error("paper has no questions");

  const rows = await queryQuestionsByIds(client, ids);
  const byId = new Map(rows.map((r) => [r.id, r]));
  const ordered = ids.map((id) => byId.get(id)).filter((r): r is NonNullable<typeof r> => !!r);
  if (ordered.length !== ids.length) {
    // A membership row whose question is gone would silently shorten the paper.
    throw new Error(`resolved ${ordered.length} of ${ids.length} questions — refusing to write a short paper`);
  }

  const prefix = process.argv[3] ?? "paper";
  const dir = join(process.cwd(), "generated-papers");
  mkdirSync(dir, { recursive: true });

  const qp = await buildQuestionPaper({ title: paper.title as string, questions: ordered });
  const key = await buildAnswerKey({
    title: `${paper.title as string} — Answer Key`,
    questions: ordered,
    includeSolutions: true,
  });

  writeFileSync(join(dir, `${prefix}.docx`), qp);
  writeFileSync(join(dir, `${prefix}_Key.docx`), key);
  console.log(`${ordered.length} questions`);
  console.log(`  generated-papers/${prefix}.docx      ${Math.round(qp.length / 1024)} KB`);
  console.log(`  generated-papers/${prefix}_Key.docx  ${Math.round(key.length / 1024)} KB`);
}

main().catch((e) => { console.error(e); process.exit(1); });
