/**
 * Post-commit verification for an /lws-test-ingest paper.
 *
 *   npx tsx scripts/practice-paper/verify-commit.ts <slug>
 *
 * Step 5 of the runbook says "verify in the DB: rows are practice+PRIVATE, each
 * has exactly one correct option + a solution; the paper has all N questions,
 * positions 1..N matching question_number". That was a hand-written query every
 * time, which means it was easy to check three of the six things and call it done.
 * This runs all of them, off the SAME spec + records the commit used, and reads
 * the LIVE database rather than trusting commit-paper's own console output.
 *
 * Read-only. Exit 0 = every invariant holds; exit 1 = at least one failed.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { PAPERS, loadRecords, examIdOf, statusOf } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const failures: string[] = [];
const check = (ok: boolean, label: string, detail = "") => {
  console.log(`  ${ok ? "ok  " : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures.push(label);
};

async function main() {
  const slug = process.argv[2];
  if (!slug) throw new Error("usage: verify-commit.ts <slug>");
  const spec = PAPERS[slug];
  if (!spec) throw new Error(`unknown paper "${slug}". Known: ${Object.keys(PAPERS).join(", ")}`);
  const recs = loadRecords(spec);
  const examId = examIdOf(spec);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  const c = createClient(url, key, { auth: { persistSession: false } });

  console.log(`\nverifying "${spec.title}"  (${recs.length} records, source_file=${spec.sourceFile})\n`);

  const { data: qData, error: qErr } = await c
    .from("questions")
    .select("id,question_number,visibility,question_kind,solution,context,set_id,subtopic_id,chapters(name,subjects(name))")
    .eq("exam_id", examId).eq("source_file", spec.sourceFile);
  if (qErr) throw new Error(`questions: ${qErr.message}`);
  const rows = (qData ?? []) as any[];

  check(rows.length === recs.length, "row count matches the records file",
    `${rows.length} in DB vs ${recs.length} records`);
  check(rows.every((q) => q.question_kind === "practice"), "every row is question_kind='practice'");
  check(rows.every((q) => q.solution && q.solution.trim()), "every row has a solution",
    `${rows.filter((q) => !q.solution || !q.solution.trim()).length} missing`);
  check(rows.every((q) => q.subtopic_id), "every row has a subtopic",
    `${rows.filter((q) => !q.subtopic_id).length} null`);

  // Visibility: a `new` row may legitimately be PUBLIC (after flip-public) or PRIVATE
  // (before it), but a dup/flawed row must NEVER be PUBLIC — that is the dedup gate.
  const byNum = new Map(rows.map((q) => [String(q.question_number), q]));
  const leaked = recs
    .filter((r) => statusOf(r) !== "new" && byNum.get(String(r.n))?.visibility === "PUBLIC")
    .map((r) => r.n);
  check(leaked.length === 0, "no dup/flawed row is PUBLIC (the dedup gate)",
    leaked.length ? `leaked: ${leaked.join(", ")}` : "");

  const nums = rows.map((q) => Number(q.question_number)).sort((a, b) => a - b);
  const wantNums = recs.map((r) => r.n).sort((a, b) => a - b);
  check(nums.length === wantNums.length && nums.every((v, i) => v === wantNums[i]),
    "question_number set matches the printed numbering");

  // Options — chunk the .in() FILTER at 200; that is a URL-length limit and is a
  // different limit from the 1000-row cap on a result. Paging one does not fix the other.
  const per = new Map<string, { n: number; correct: number }>();
  const ids = rows.map((q) => q.id);
  for (let i = 0; i < ids.length; i += 200) {
    const { data: opts, error: oErr } = await c
      .from("options").select("question_id,is_correct").in("question_id", ids.slice(i, i + 200));
    if (oErr) throw new Error(`options: ${oErr.message}`);
    for (const o of (opts ?? []) as any[]) {
      const e = per.get(o.question_id) ?? { n: 0, correct: 0 };
      e.n++; if (o.is_correct) e.correct++;
      per.set(o.question_id, e);
    }
  }
  check(per.size === rows.length, "every row has options",
    `${rows.length - per.size} row(s) with none`);
  check([...per.values()].every((v) => v.n === 4), "every row has exactly 4 options",
    `${[...per.values()].filter((v) => v.n !== 4).length} bad`);
  check([...per.values()].every((v) => v.correct === 1), "every row has exactly 1 correct option",
    `${[...per.values()].filter((v) => v.correct !== 1).length} bad`);

  // Set-based questions (a shared comprehension passage) must share ONE set_id.
  const wantSets = new Set(recs.filter((r) => r.setLabel).map((r) => r.setLabel!));
  if (wantSets.size) {
    const withCtx = recs.filter((r) => r.context).map((r) => r.n).sort((a, b) => a - b);
    const dbCtx = rows.filter((q) => q.context).map((q) => Number(q.question_number)).sort((a, b) => a - b);
    check(withCtx.length === dbCtx.length && withCtx.every((v, i) => v === dbCtx[i]),
      "the rows carrying a shared passage are exactly the ones the records declare");
    const dbSets = new Set(rows.filter((q) => q.set_id).map((q) => q.set_id));
    check(dbSets.size === wantSets.size, "set count matches", `${dbSets.size} in DB vs ${wantSets.size} declared`);
  }

  if (spec.createPaper === false) {
    console.log("\n  (createPaper:false — no /dashboard/papers paper expected)");
  } else {
    const { data: papers, error: pErr } = await c
      .from("papers").select("id,title").eq("title", spec.title);
    if (pErr) throw new Error(`papers: ${pErr.message}`);
    const found = (papers ?? []) as any[];
    check(found.length === 1, "exactly one paper carries this title", `found ${found.length}`);
    if (found.length === 1) {
      const paperId = found[0].id;
      const { data: pq, error: lErr } = await c
        .from("paper_questions").select("question_id,position").eq("paper_id", paperId);
      if (lErr) throw new Error(`paper_questions: ${lErr.message}`);
      const links = (pq ?? []) as any[];
      check(links.length === recs.length, "paper holds every question",
        `${links.length} links vs ${recs.length} records`);
      check(new Set(links.map((l) => l.question_id)).size === links.length,
        "no question is linked twice");
      const numById = new Map(rows.map((q) => [q.id, Number(q.question_number)]));
      const ordered = [...links].sort((a, b) => a.position - b.position).map((l) => numById.get(l.question_id));
      check(ordered.every((v) => v !== undefined), "every paper question belongs to this source file");
      check(ordered.every((v, i) => v === wantNums[i]), "paper order == printed Q-order (OMR parity)");
      console.log(`\n  paper id: ${paperId}`);
    }
  }

  if (failures.length) {
    console.error(`\nVERIFY FAILED — ${failures.length} check(s):\n  - ${failures.join("\n  - ")}`);
    process.exit(1);
  }
  console.log(`\nverify OK — all checks passed for "${slug}".`);
}

main().catch((e) => { console.error(e instanceof Error ? e.message : e); process.exit(1); });
