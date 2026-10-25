/**
 * Export a chapter's questions for the visuals agents (triage, then drafting).
 *
 *   npm run visuals:export -- --exam="MHT-CET" --chapter="Applications of Derivative" --out=<dir> [--slices=3]
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
import { verdictsFromBatchFiles } from "./batchFiles";

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
  const rows: Row[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("id, text, context, solution, question_format, numeric_answer, solution_visual, question_number, image_url, options(label, text, is_correct, image_url), exams!inner(name), chapters!inner(name)")
      .eq("visibility", "PUBLIC")
      .eq("exams.name", exam)
      .eq("chapters.name", chapter)
      .not("solution", "is", null)
      .order("id")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    rows.push(...(data as unknown as Row[]));
    if (data.length < 1000) break;
  }
  const decided = verdictsFromBatchFiles();
  const todo = rows.filter((r) => r.solution_visual == null && !decided.has(r.id));

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
    };
  });

  mkdirSync(out, { recursive: true });
  const size = Math.ceil(items.length / slices);
  for (let k = 0; k < slices; k++) writeFileSync(join(out, `slice-${k + 1}.json`), JSON.stringify(items.slice(k * size, (k + 1) * size), null, 1));
  console.log(`${exam} / ${chapter}: ${rows.length} PUBLIC with a solution, ${rows.length - todo.length} already done or decided, ${todo.length} exported in ${slices} slice(s) to ${out}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
