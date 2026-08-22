/**
 * Audit a paper's ENGLISH section against the structural rules in ./english.ts.
 *
 *   npx tsx scripts/bank-paper/audit-english.ts <paperId>
 *
 * Exits 1 on any violation, so it works as a gate. Read-only — it never edits a
 * paper; the fix is always to rebuild with a corrected spec.
 *
 * The comparison it is really making: a real NDA GAT English section is 50
 * questions in 7-10 directions blocks. Anything materially above that is a paper
 * that reads as dozens of one-question mini-sections.
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { auditEnglishSection, type EnglishRow } from "./english";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/** PostgREST puts an `.in()` list in the URL, so chunk it well below the limit. */
async function bankSetSizes(client: SupabaseClient, setIds: string[]) {
  const sizes = new Map<string, number>();
  for (let i = 0; i < setIds.length; i += 150) {
    const chunk = setIds.slice(i, i + 150);
    const { data, error } = await client
      .from("questions").select("set_id").in("set_id", chunk);
    if (error) throw new Error(`set sizes: ${error.message}`);
    for (const row of (data ?? []) as { set_id: string | null }[]) {
      if (!row.set_id) continue;
      sizes.set(row.set_id, (sizes.get(row.set_id) ?? 0) + 1);
    }
  }
  return sizes;
}

async function main() {
  const paperId = process.argv[2];
  if (!paperId) throw new Error("usage: audit-english.ts <paperId>");

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: paper, error: pErr } = await client
    .from("papers").select("id, title, section_template").eq("id", paperId).single();
  if (pErr || !paper) throw new Error(`paper ${paperId}: ${pErr?.message ?? "not found"}`);

  const template = (paper.section_template ?? []) as { key: string; label: string }[];
  const rank = new Map(template.map((s, i) => [s.key, i]));

  const { data: mem, error: mErr } = await client
    .from("paper_questions")
    .select(
      "question_id, position, section_key, " +
        "questions(id, difficulty, context, set_id, " +
        "chapters(name), subtopics(name), subjects(name, exams(name)))"
    )
    .eq("paper_id", paperId);
  if (mErr) throw new Error(`membership: ${mErr.message}`);

  type Row = {
    position: number; section_key: string;
    questions: {
      id: string; difficulty: EnglishRow["difficulty"]; context: string | null; set_id: string | null;
      chapters: { name: string } | null;
      subtopics: { name: string } | null;
      subjects: { name: string; exams: { name: string } | null } | null;
    } | null;
  };

  // position is scoped per section, so sort by (section rank, position).
  const rows = ((mem ?? []) as unknown as Row[])
    .filter((m) => m.questions?.subjects?.name === "English")
    .sort(
      (a, b) =>
        (rank.get(a.section_key) ?? 0) - (rank.get(b.section_key) ?? 0) || a.position - b.position
    );

  if (!rows.length) {
    console.log(`"${paper.title}" has no English questions — nothing to audit.`);
    return;
  }

  const english: EnglishRow[] = rows.map((m) => ({
    id: m.questions!.id,
    chapter: m.questions!.chapters?.name ?? "(none)",
    subtopic: m.questions!.subtopics?.name ?? null,
    setId: m.questions!.set_id,
    exam: m.questions!.subjects?.exams?.name ?? "(none)",
    difficulty: m.questions!.difficulty,
    contextLen: (m.questions!.context ?? "").length,
  }));

  const setIds = [...new Set(english.map((q) => q.setId).filter((s): s is string => !!s))];
  const violations = auditEnglishSection(english, await bankSetSizes(client, setIds));

  const blocks = new Set(english.map((q, i) => q.setId ?? `none-${i}`)).size;
  console.log(`"${paper.title}"`);
  console.log(`  ${english.length} English questions in ${blocks} directions block(s)` +
    ` — a real GAT English section runs 50 in 7-10.\n`);

  if (!violations.length) {
    console.log("PASS — no rule violations.");
    return;
  }

  const byRule = new Map<string, typeof violations>();
  for (const v of violations) {
    if (!byRule.has(v.rule)) byRule.set(v.rule, []);
    byRule.get(v.rule)!.push(v);
  }
  for (const [rule, list] of [...byRule.entries()].sort()) {
    console.log(`${rule}  (${list.length})`);
    for (const v of list.slice(0, 8)) console.log(`   ${v.detail}`);
    if (list.length > 8) console.log(`   … and ${list.length - 8} more`);
    console.log();
  }
  console.log(`FAIL — ${violations.length} violation(s).`);
  process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
