/**
 * Create the GATE CS exam row and the subjects a paper's committed rows use.
 *
 *   npx tsx scripts/gate/seed.ts 2026-cs1           # dry run
 *   npx tsx scripts/gate/seed.ts 2026-cs1 --apply
 *
 * Idempotent. Run IMMEDIATELY before that paper's first `commit.ts --apply`, never as
 * "setting up": a subject with no questions renders as a /browse filter that returns
 * nothing (CISCE README "Do not seed early"), so only the subjects the paper's rows name
 * are created. commitStaged creates chapters and subtopics itself. pass_scope keeps its
 * default 'mocks' (every Indian exam, migration 0206).
 *
 * The production settings come from the environment, never a file in this folder: a
 * worktree holds only .env.test.local (2026-11-18 incident).
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { GATE_CS_SUBJECTS } from "../../src/lib/mocks/blueprints";
import type { UceedKey, UceedPaper } from "../uceed/lib";
import { DATA, EXAM_NAME } from "./config";
import { planGatePaper } from "./lib";

async function main() {
  const paper = process.argv[2];
  if (!paper) throw new Error("usage: seed.ts <year>-cs<set> [--apply]");
  const apply = process.argv.includes("--apply");
  const read = <T>(f: string): T => JSON.parse(readFileSync(join(DATA, f), "utf8"));
  const plan = planGatePaper(paper, read<UceedPaper>(`${paper}.questions.json`), read<UceedKey>(`${paper}.key.json`));
  if (plan.issues.length) throw new Error(`the paper has ${plan.issues.length} issue(s): run commit.ts ${paper} for the list`);
  // In syllabus order, so the subjects list the way the exam does.
  const used = new Set(plan.rows.map((r) => r.subject));
  const wanted = GATE_CS_SUBJECTS.filter((s) => used.has(s));

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !service) throw new Error("set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the environment");
  const client = createClient(url, service, { auth: { persistSession: false } });
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
