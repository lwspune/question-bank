/**
 * Create the UCEED exam row and the subjects a paper's committed rows use.
 *
 *   npx tsx scripts/uceed/seed.ts 2026           # dry run
 *   npx tsx scripts/uceed/seed.ts 2026 --apply
 *
 * Idempotent. Run IMMEDIATELY before that paper's first `commit.ts --apply`, never as
 * "setting up": listSubjects applies no question-count filter, so a subject with no
 * questions renders as a /browse filter that returns nothing (CISCE README "Do not
 * seed early"). That is also why only the subjects the paper's committable rows name
 * are created, not all seven. commitStaged creates chapters and subtopics itself.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { DATA, EXAM_NAME, SUBJECTS } from "./config";
import { planPaper, type UceedKey, type UceedPaper } from "./lib";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const year = Number(process.argv[2]);
  if (!year) throw new Error("usage: seed.ts <year> [--apply]");
  const apply = process.argv.includes("--apply");
  const read = <T>(f: string): T => JSON.parse(readFileSync(join(DATA, f), "utf8"));
  const plan = planPaper(read<UceedPaper>(`${year}.questions.json`), read<UceedKey>(`${year}.key.json`));
  if (plan.issues.length) throw new Error(`the paper has ${plan.issues.length} issue(s): run commit.ts ${year} for the list`);
  const wanted = [...new Set(plan.rows.map((r) => r.subject))];
  const unknown = wanted.filter((s) => !(SUBJECTS as readonly string[]).includes(s));
  if (unknown.length) throw new Error(`not a syllabus area: ${unknown.join(", ")}`);

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  let { data: exam } = await client.from("exams").select("id, name").eq("name", EXAM_NAME).maybeSingle();
  if (!exam) {
    if (!apply) return console.log(`[dry run] would create exam "${EXAM_NAME}" and subjects: ${wanted.join(", ")}`);
    const { data, error } = await client.from("exams").insert({ name: EXAM_NAME }).select("id, name").single();
    if (error) throw new Error(`exam insert failed: ${error.message}`);
    exam = data;
    console.log(`created exam ${exam.name}  ${exam.id}`);
  } else console.log(`exam exists: ${exam.name}  ${exam.id}`);

  const { data: subs, error } = await client.from("subjects").select("name").eq("exam_id", exam.id);
  if (error) throw new Error(`subject read failed: ${error.message}`);
  const missing = wanted.filter((n) => !(subs ?? []).some((s) => s.name === n));
  if (!missing.length) return console.log("subjects exist.");
  if (!apply) return console.log(`[dry run] would create subjects: ${missing.join(", ")}`);
  const { error: iErr } = await client.from("subjects").insert(missing.map((name) => ({ exam_id: exam!.id, name })));
  if (iErr) throw new Error(`subject insert failed: ${iErr.message}`);
  console.log(`created subjects: ${missing.join(", ")}`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
