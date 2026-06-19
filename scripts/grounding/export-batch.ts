/**
 * Export a batch of un-structured PYQ rows for the agent solution_json pass.
 * Writes scripts/grounding/data/<batch>.input.json — the agents read this and
 * return <batch>.solution.json; commit.ts ingests that.
 *
 *   npx tsx scripts/grounding/export-batch.ts <batch> [--limit 30] [--exam NDA] [--subject Mathematics]
 *
 * The agent input deliberately OMITS options.is_correct — the agent re-derives
 * option_matched blind, so commit.ts's option_matched-vs-key comparison is a
 * genuine wrong-key audit, not a rubber-stamp. Scope defaults to NDA Mathematics
 * PUBLIC pyq (the tutor v1 corpus) where solution_json IS NULL (idempotent).
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

const DATA = join(process.cwd(), "scripts", "grounding", "data");

interface InputRow {
  id: string;
  context: string | null;
  text: string;
  solution: string | null;
  options: { label: string; text: string }[];
}

function arg(flag: string, fallback: string): string {
  const i = process.argv.indexOf(flag);
  return i !== -1 ? process.argv[i + 1] : fallback;
}

async function main() {
  loadEnv();
  const batch = process.argv[2];
  if (!batch || batch.startsWith("--")) throw new Error("usage: export-batch.ts <batch> [--limit N] [--exam NDA] [--subject Mathematics]");
  const limArg = process.argv.indexOf("--limit");
  const limit = limArg !== -1 ? Number(process.argv[limArg + 1]) : 30;
  const offArg = process.argv.indexOf("--offset");
  const offset = offArg !== -1 ? Number(process.argv[offArg + 1]) : 0;
  const examName = arg("--exam", "NDA");
  const subjectName = arg("--subject", "Mathematics");

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: exam } = await client.from("exams").select("id").eq("name", examName).maybeSingle();
  if (!exam) throw new Error(`exam not found: ${examName}`);
  const { data: subject } = await client
    .from("subjects")
    .select("id")
    .eq("exam_id", exam.id)
    .eq("name", subjectName)
    .maybeSingle();
  if (!subject) throw new Error(`subject not found: ${subjectName} in ${examName}`);

  const { data: rows, error } = await client
    .from("questions")
    .select("id, context, text, solution")
    .eq("question_kind", "pyq")
    .eq("visibility", "PUBLIC")
    .eq("subject_id", subject.id)
    .is("solution_json", null)
    .order("id")
    .range(offset, offset + limit - 1);
  if (error) throw error;
  if (!rows || rows.length === 0) {
    console.log("no un-structured rows match — nothing to export.");
    return;
  }

  const ids = rows.map((r) => r.id);
  const { data: opts, error: oerr } = await client
    .from("options")
    .select("question_id, label, text")
    .in("question_id", ids)
    .order("label");
  if (oerr) throw oerr;
  const byQ = new Map<string, { label: string; text: string }[]>();
  for (const o of opts ?? []) {
    if (!byQ.has(o.question_id)) byQ.set(o.question_id, []);
    byQ.get(o.question_id)!.push({ label: o.label, text: o.text });
  }

  const input: InputRow[] = rows.map((r) => ({
    id: r.id,
    context: r.context,
    text: r.text,
    solution: r.solution,
    options: byQ.get(r.id) ?? [],
  }));

  mkdirSync(DATA, { recursive: true });
  const path = join(DATA, `${batch}.input.json`);
  writeFileSync(path, JSON.stringify(input, null, 2));
  console.log(`exported ${input.length} rows → ${path}`);
  console.log(`(${examName} / ${subjectName} PUBLIC pyq, solution_json IS NULL)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
