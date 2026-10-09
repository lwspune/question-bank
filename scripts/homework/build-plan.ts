/**
 * Build a daily homework plan from a reviewed repeat analysis and write it.
 *
 *   npx tsx scripts/homework/build-plan.ts scripts/homework/data/mh-hsc-12-maths.json            # dry run
 *   npx tsx scripts/homework/build-plan.ts scripts/homework/data/mh-hsc-12-maths.json --apply    # write
 *   ... --apply --publish     also make the plan public (the page lists published plans only)
 *
 * The data file names every question of the subject (a case study as ONE entry
 * whose `rows` list its parts, the entry's own id first) and the groups a reviewer
 * found: "repeat" = the same question asked in more than one paper, "type" =
 * the same kind of question with new numbers (see src/lib/homework/plan.ts for
 * the order they produce). Chapters are read from the bank, never the file.
 *
 * REFUSES, before writing anything, when the file and the bank disagree in
 * EITHER direction: a question in the file that is gone, private or in another
 * subject, or a PUBLIC past-year question of the subject that the file never
 * saw (a later ingest: review it, add it to the file, then rebuild).
 *
 * The items are replaced in one transaction (homework_replace_items), so a
 * plan is never half old, half new. Re-running is safe.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { buildPlanOrder, type PlanGroup } from "@/lib/homework/plan";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type PlanFile = {
  slug: string;
  examName: string;
  subjectName: string;
  title: string;
  summary: string;
  perDay: number;
  sittings: string[];
  questions: { id: string; sitting: string; rows?: string[] }[];
  /** Rows left out on purpose (a chapter off the syllabus); see assemble.ts. */
  excluded?: string[];
  groups: PlanGroup[];
};

type BankRow = { id: string; visibility: string; exam_id: string; subject_id: string; chapter: { name: string } | null };

async function loadBank(client: SupabaseClient, ids: string[]): Promise<Map<string, BankRow>> {
  const out = new Map<string, BankRow>();
  for (let i = 0; i < ids.length; i += 200) {
    const { data, error } = await client
      .from("questions")
      .select("id, visibility, exam_id, subject_id, chapter:chapters(name)")
      .in("id", ids.slice(i, i + 200));
    if (error) throw new Error(`questions: ${error.message}`);
    for (const r of (data ?? []) as unknown as BankRow[]) out.set(r.id, r);
  }
  return out;
}

async function publicPyqIds(client: SupabaseClient, examId: string, subjectId: string): Promise<string[]> {
  const out: string[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await client
      .from("questions")
      .select("id")
      .eq("exam_id", examId)
      .eq("subject_id", subjectId)
      .eq("question_kind", "pyq")
      .eq("visibility", "PUBLIC")
      .order("id")
      .range(from, from + 999);
    if (error) throw new Error(`public pyq ids: ${error.message}`);
    out.push(...(data ?? []).map((r) => r.id as string));
    if (!data || data.length < 1000) return out;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const file = args.find((a) => !a.startsWith("--"));
  if (!file) throw new Error("usage: build-plan.ts <data file> [--apply] [--publish]");
  const apply = args.includes("--apply");
  const publish = args.includes("--publish");
  const plan = JSON.parse(readFileSync(file, "utf8")) as PlanFile;

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: exam } = await client.from("exams").select("id").eq("name", plan.examName).single();
  if (!exam) throw new Error(`no exam named ${plan.examName}`);
  const { data: subject } = await client
    .from("subjects")
    .select("id")
    .eq("exam_id", exam.id)
    .eq("name", plan.subjectName)
    .single();
  if (!subject) throw new Error(`no subject ${plan.subjectName} in ${plan.examName}`);

  // Reconcile the file against the bank, both ways.
  const fileIds = plan.questions.flatMap((q) => q.rows ?? [q.id]);
  if (new Set(fileIds).size !== fileIds.length) throw new Error("a bank row is listed twice in the file");
  const bank = await loadBank(client, fileIds);
  const problems: string[] = [];
  for (const id of fileIds) {
    const r = bank.get(id);
    if (!r) problems.push(`${id}: not in the bank`);
    else if (r.visibility !== "PUBLIC") problems.push(`${id}: ${r.visibility}`);
    else if (r.exam_id !== exam.id || r.subject_id !== subject.id) problems.push(`${id}: another exam or subject`);
    else if (!r.chapter?.name) problems.push(`${id}: no chapter`);
  }
  const inFile = new Set([...fileIds, ...(plan.excluded ?? [])]);
  const unseen = (await publicPyqIds(client, exam.id, subject.id)).filter((id) => !inFile.has(id));
  for (const id of unseen) problems.push(`${id}: PUBLIC past-year question the file has not reviewed`);
  if (problems.length) {
    console.error(`REFUSED: ${problems.length} problem(s)\n  ${problems.slice(0, 30).join("\n  ")}`);
    process.exit(1);
  }

  const items = buildPlanOrder({
    perDay: plan.perDay,
    sittings: plan.sittings,
    questions: plan.questions.map((q) => ({ ...q, chapter: bank.get(q.id)!.chapter!.name })),
    groups: plan.groups,
  });
  const days = items.reduce((m, i) => Math.max(m, i.day), 0);
  const parts = [1, 2, 3].map((p) => items.filter((i) => i.part === p).length);
  console.log(`${plan.slug}: ${items.length} questions over ${days} days (asked again ${parts[0]}, types ${parts[1]}, asked once ${parts[2]})`);
  const printedRows = items.reduce((n, i) => n + i.rows.length, 0);
  console.log(`prints ${printedRows} of the ${fileIds.length} bank rows; the rest are other wordings of a printed repeat`);
  for (const i of items.filter((x) => x.day === 1)) {
    console.log(`  day 1 #${i.position}: ${bank.get(i.questionId)!.chapter!.name} | ${i.note}`);
  }
  if (!apply) {
    console.log("dry run: nothing written. Add --apply to write.");
    return;
  }

  const { data: saved, error: upErr } = await client
    .from("homework_plans")
    .upsert(
      {
        slug: plan.slug,
        exam_id: exam.id,
        subject_id: subject.id,
        title: plan.title,
        summary: plan.summary,
        per_day: plan.perDay,
        ...(publish ? { published: true } : {}),
      },
      { onConflict: "slug" }
    )
    .select("id, published")
    .single();
  if (upErr || !saved) throw new Error(`plan: ${upErr?.message}`);
  // One database row per part; a plain question is part 1 of its slot.
  const rows = items.flatMap((i) => i.rows.map((questionId, k) => ({ ...i, questionId, sub: k + 1 })));
  const { data: written, error } = await client.rpc("homework_replace_items", { p_plan_id: saved.id, p_items: rows });
  if (error) throw new Error(`items: ${error.message}`);
  console.log(`wrote ${written} items; plan is ${saved.published ? "PUBLISHED" : "not published (add --publish)"}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
