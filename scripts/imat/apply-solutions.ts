/**
 * Write the worked solutions of the ministry's IMAT papers (2023 on) from
 * mur-solutions.json ({ questionId: solution }) into questions.solution.
 *
 *   npx tsx scripts/imat/apply-solutions.ts           # dry run: checks and counts
 *   npx tsx scripts/imat/apply-solutions.ts --apply   # back up first: npm run db:backup
 *
 * How the file was made (2026-10-23): three agents solved the 240 questions BLIND,
 * without the ministry's key, and wrote a solution each; 239 of 240 agreed with the
 * key. The one disagreement (2024 Q55, the boat's braking power) is defective as
 * printed, so its solution opens with a **Note:** and it is grace in the 2024 mock
 * (scripts/mocks/imatSittings.ts). The main session read every solution.
 *
 * Writes only IMAT past-paper rows that are not publish_blocked, and never over a
 * solution already there (one edited in the dashboard stays). The solution is not
 * part of an MCQ's content_hash, so the rows keep their ids and hashes.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_NAME } from "./config";
import { literalNewlineFields } from "../../src/lib/upload/textGuard";

const FILE = join(__dirname, "mur-solutions.json");

/** Every reason a solution cannot be published as it stands. */
function problems(text: string): string[] {
  const out: string[] = [];
  if (!text.trim()) out.push("empty");
  if (/[\t\f\r\x08\x0b]/.test(text)) out.push("control character (an escape eaten on the way)");
  if (/[–—]/.test(text)) out.push("en or em dash");
  if ((text.match(/\\\(/g) ?? []).length !== (text.match(/\\\)/g) ?? []).length) out.push("unbalanced \\( \\)");
  if (literalNewlineFields({ solution: text }).length) out.push("literal \\n");
  return out;
}

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const apply = process.argv.includes("--apply");
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const solutions = JSON.parse(readFileSync(FILE, "utf8")) as Record<string, string>;

  const bad = Object.entries(solutions).flatMap(([id, s]) => problems(s).map((p) => `${id}: ${p}`));
  if (bad.length) throw new Error(`refusing, ${bad.length} problem(s):\n${bad.join("\n")}`);

  const { data: exam, error: examErr } = await db.from("exams").select("id").eq("name", EXAM_NAME).single();
  if (examErr || !exam) throw new Error(`exam ${EXAM_NAME} not found: ${examErr?.message}`);
  const { data: rows, error } = await db
    .from("questions")
    .select("id, solution")
    .eq("exam_id", exam.id)
    .eq("question_kind", "pyq")
    .is("publish_blocked", null);
  if (error) throw new Error(error.message);
  const inScope = new Map((rows ?? []).map((r) => [r.id as string, (r.solution as string | null) ?? ""]));

  const unknown = Object.keys(solutions).filter((id) => !inScope.has(id));
  if (unknown.length) throw new Error(`not IMAT ministry rows: ${unknown.join(", ")}`);
  const missing = [...inScope.keys()].filter((id) => !(id in solutions));
  const todo = Object.keys(solutions).filter((id) => !inScope.get(id)!.trim());
  console.log(`file ${Object.keys(solutions).length} · rows in scope ${inScope.size} · without a solution in the file ${missing.length}`);
  console.log(`to write ${todo.length} · kept (already have one) ${Object.keys(solutions).length - todo.length}`);
  if (!apply) return console.log("[dry run] pass --apply to write.");

  for (const id of todo) {
    const { error: upErr } = await db.from("questions").update({ solution: solutions[id] }).eq("id", id).or("solution.is.null,solution.eq.");
    if (upErr) throw new Error(`${id}: ${upErr.message}`);
  }
  const { count } = await db
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", exam.id)
    .eq("question_kind", "pyq")
    .is("publish_blocked", null)
    .or("solution.is.null,solution.eq.");
  console.log(`wrote ${todo.length}; ministry rows still without a solution: ${count}`);
  if (count) throw new Error(`${count} ministry row(s) still have no solution`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
