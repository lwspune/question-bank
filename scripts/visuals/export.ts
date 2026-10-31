/**
 * Export a chapter's questions for the visuals agents (triage, then drafting).
 *
 *   npm run visuals:export -- --exam="MHT-CET" --chapter="Applications of Derivative" --out=<dir> [--slices=3]
 *   ... --recheck=noFit   instead, ONLY the questions recorded noFit, each with
 *                         its earlier reason (`earlier`): for a new scene or
 *                         kind (sketch) to try them again
 *
 * Writes <dir>/slice-<k>.json: PUBLIC questions with a solution, each with its
 * options (the key marked), and its solution split into numbered sentences by
 * the same rule the player uses (lib/visuals/visual sentenceStarts), so an
 * agent names steps by sentence number and never counts characters. Questions
 * that already carry a visual, or a verdict in data/*.json, are left out.
 * Read-only.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { sentenceStarts } from "../../src/lib/visuals/visual";
import { reasonsFromBatchFiles, verdictsFromBatchFiles } from "./batchFiles";

const arg = (name: string) => process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const exam = arg("exam");
  const chapter = arg("chapter");
  const out = arg("out");
  const slices = Math.max(1, Number(arg("slices") ?? 1));
  if (!exam || !chapter || !out) throw new Error('usage: visuals:export -- --exam="..." --chapter="..." --out=<dir> [--slices=N]');
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

  type Row = {
    id: string;
    text: string;
    context: string | null;
    solution: string | null;
    question_format: string;
    numeric_answer: number | string | null;
    solution_visual: unknown;
    question_number: string | null;
    image_url: string | null;
    options: { label: string; text: string; is_correct: boolean; image_url: string | null }[] | null;
  };
  // Ids first, then filter the questions on their own columns: filtering through the
  // embedded exams/chapters names made PostgREST plan the whole join, and on
  // 2026-10-31 that hit the statement timeout on a 264-question chapter.
  const ex = await db.from("exams").select("id").eq("name", exam);
  if (ex.error) throw new Error(ex.error.message);
  if (ex.data.length !== 1) throw new Error(`exam "${exam}": ${ex.data.length} matches`);
  const ch = await db.from("chapters").select("id, subjects!inner(exam_id)").eq("name", chapter).eq("subjects.exam_id", ex.data[0].id);
  if (ch.error) throw new Error(ch.error.message);
  if (!ch.data.length) throw new Error(`no chapter "${chapter}" in ${exam}`);
  const rows: Row[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("id, text, context, solution, question_format, numeric_answer, solution_visual, question_number, image_url, options(label, text, is_correct, image_url)")
      .eq("visibility", "PUBLIC")
      .eq("exam_id", ex.data[0].id)
      .in("chapter_id", ch.data.map((c) => c.id))
      .not("solution", "is", null)
      .order("id")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    rows.push(...(data as unknown as Row[]));
    if (data.length < 1000) break;
  }
  const decided = verdictsFromBatchFiles();
  const recheck = arg("recheck");
  if (recheck !== undefined && recheck !== "noFit") throw new Error("--recheck takes noFit");
  const todo = rows.filter((r) => r.solution_visual == null && (recheck ? decided.get(r.id) === "noFit" : !decided.has(r.id)));
  const reasons = recheck ? reasonsFromBatchFiles() : new Map<string, string>();

  const items = todo.map((r, i) => {
    const sol = r.solution!;
    const starts = sentenceStarts(sol);
    return {
      n: i + 1,
      id: r.id,
      format: r.question_format,
      text: r.text,
      context: r.context,
      // Whether a picture is attached, so agents can flag a question that needs one it lacks.
      stemImage: !!r.image_url,
      options: (r.options ?? []).sort((a, b) => a.label.localeCompare(b.label)).map((o) => `${o.label}) ${o.text}${o.image_url ? "  [IMAGE]" : ""}${o.is_correct ? "  [KEY]" : ""}`),
      numericAnswer: r.numeric_answer === null ? null : Number(r.numeric_answer),
      sentences: starts.map((s, k) => `[${k}] ${sol.slice(s, starts[k + 1] ?? sol.length).trim()}`),
      ...(recheck ? { earlier: reasons.get(r.id) } : {}),
    };
  });

  mkdirSync(out, { recursive: true });
  const size = Math.ceil(items.length / slices);
  for (let k = 0; k < slices; k++) writeFileSync(join(out, `slice-${k + 1}.json`), JSON.stringify(items.slice(k * size, (k + 1) * size), null, 1));
  const what = recheck ? `${todo.length} noFit re-exported` : `${rows.length - todo.length} already done or decided, ${todo.length} exported`;
  console.log(`${exam} / ${chapter}: ${rows.length} PUBLIC with a solution, ${what} in ${slices} slice(s) to ${out}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
