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
import { PAPERS, loadRecords, examIdOf, statusOf, kindOf, formatOf, recToParsedRow } from "./config";

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

  const SELECT =
    "id,question_number,visibility,question_kind,question_format,numeric_answer,pyq_year,solution,context,set_id,subtopic_id,source_file,content_hash,chapters(name,subjects(name))";

  // Rows this ingest OWNS — inserted under its own source_file.
  const { data: qData, error: qErr } = await c
    .from("questions").select(SELECT)
    .eq("exam_id", examId).eq("source_file", spec.sourceFile);
  if (qErr) throw new Error(`questions: ${qErr.message}`);
  const owned = (qData ?? []) as any[];

  // A record whose content_hash already existed in the bank is SKIPPED by commitStaged
  // (ignoreDuplicates on org_id,exam_id,content_hash), so it has no row under our
  // source_file — commit-paper references the pre-existing bank row instead. Resolve
  // those the same way commit-paper does, or every check below silently measures the
  // wrong set. A fully bank-mirrored paper owns ZERO rows and is legitimate.
  const ownedByNum = new Map(owned.map((q) => [String(q.question_number), q]));
  const rowOf = new Map<number, any>();
  const mirroredHashes: { n: number; hash: string }[] = [];
  for (const r of recs) {
    const hit = ownedByNum.get(String(r.n));
    if (hit) rowOf.set(r.n, hit);
    else mirroredHashes.push({ n: r.n, hash: recToParsedRow(spec, r).contentHash });
  }
  for (let i = 0; i < mirroredHashes.length; i += 200) {
    const chunk = mirroredHashes.slice(i, i + 200);
    const { data: mData, error: mErr } = await c
      .from("questions").select(SELECT)
      .eq("exam_id", examId).in("content_hash", chunk.map((m) => m.hash));
    if (mErr) throw new Error(`mirrored questions: ${mErr.message}`);
    const byHash = new Map(((mData ?? []) as any[]).map((q) => [q.content_hash, q]));
    for (const m of chunk) {
      const hit = byHash.get(m.hash);
      if (hit) rowOf.set(m.n, hit);
    }
  }
  // Mirrors commit-paper's `commitRecs`: with no paper to back the test, dup/flawed rows
  // have no consumer, so a createPaper:false ingest commits ONLY the genuinely-new ones.
  // Expecting all N to resolve there would be a permanent false alarm.
  const expected = spec.createPaper === false ? recs.filter((r) => statusOf(r) === "new") : recs;
  const rows = expected.map((r) => rowOf.get(r.n)).filter(Boolean) as any[];
  const mirrored = rows.filter((q) => q.source_file !== spec.sourceFile);
  if (mirrored.length) {
    console.log(`  note  ${mirrored.length}/${recs.length} question(s) are BANK-MIRRORED — the printed item already`);
    console.log(`        existed in the bank, so the paper references the pre-existing row and this ingest`);
    console.log(`        inserted nothing for it. Those rows keep their own kind/visibility/question_number.\n`);
  }

  check(rows.length === expected.length, "every expected record resolves to a bank row",
    `${rows.length} resolved (${owned.length} own, ${mirrored.length} mirrored) vs ${expected.length} expected of ${recs.length} records`);
  // Per-RECORD kind: a booklet may reprint real past-year questions beside its own
  // authored practice. A blanket 'practice' assertion would either fail on a correct
  // mixed paper or, worse, pass while a PYQ sat mis-filed as practice.
  const kindMismatch = expected
    .map((r) => ({ r, q: rowOf.get(r.n) }))
    .filter(({ r, q }) => q && q.source_file === spec.sourceFile && q.question_kind !== kindOf(r))
    .map(({ r, q }) => `Q${r.n} want ${kindOf(r)} got ${q.question_kind}`);
  check(kindMismatch.length === 0, "every row this ingest created carries its record's question_kind",
    kindMismatch.length ? kindMismatch.join("; ") : `${owned.length} own row(s)`);

  const yearMismatch = expected
    .filter((r) => kindOf(r) === "pyq")
    .map((r) => ({ r, q: rowOf.get(r.n) }))
    .filter(({ r, q }) => q && q.source_file === spec.sourceFile && q.pyq_year !== r.pyqYear)
    .map(({ r, q }) => `Q${r.n} want ${r.pyqYear} got ${q.pyq_year}`);
  check(yearMismatch.length === 0, "every pyq row carries its printed sitting year",
    yearMismatch.length ? yearMismatch.join("; ") : `${expected.filter((r) => kindOf(r) === "pyq").length} pyq row(s)`);

  const fmtMismatch = expected
    .map((r) => ({ r, q: rowOf.get(r.n) }))
    .filter(({ r, q }) => q && q.source_file === spec.sourceFile && (q.question_format ?? "mcq") !== formatOf(r))
    .map(({ r, q }) => `Q${r.n} want ${formatOf(r)} got ${q.question_format}`);
  check(fmtMismatch.length === 0, "every row carries its record's question_format",
    fmtMismatch.length ? fmtMismatch.join("; ") : "");
  check(rows.every((q) => q.solution && q.solution.trim()), "every row has a solution",
    `${rows.filter((q) => !q.solution || !q.solution.trim()).length} missing`);
  check(rows.every((q) => q.subtopic_id), "every row has a subtopic",
    `${rows.filter((q) => !q.subtopic_id).length} null`);

  // Visibility: a `new` row may legitimately be PUBLIC (after flip-public) or PRIVATE
  // (before it), but a dup/flawed row must NEVER be PUBLIC — that is the dedup gate.
  // Scoped to rows this ingest CREATED: a mirrored row's visibility was decided by
  // whatever ingest first committed it, and this paper neither set it nor can leak it.
  const leaked = recs
    .filter((r) => statusOf(r) !== "new")
    .filter((r) => {
      const q = rowOf.get(r.n);
      return q && q.source_file === spec.sourceFile && q.visibility === "PUBLIC";
    })
    .map((r) => r.n);
  check(leaked.length === 0, "no dup/flawed row this ingest created is PUBLIC (the dedup gate)",
    leaked.length ? `leaked: ${leaked.join(", ")}` : "");

  const wantNums = recs.map((r) => r.n).sort((a, b) => a - b);
  const nums = owned.map((q) => Number(q.question_number)).sort((a, b) => a - b);
  const wantOwned = expected.filter((r) => rowOf.get(r.n)?.source_file === spec.sourceFile)
    .map((r) => r.n).sort((a, b) => a - b);
  check(nums.length === wantOwned.length && nums.every((v, i) => v === wantOwned[i]),
    "question_number set matches the printed numbering (rows this ingest created)");

  // Options — chunk the .in() FILTER at 200; that is a URL-length limit and is a
  // different limit from the 1000-row cap on a result. Paging one does not fix the other.
  const per = new Map<string, { n: number; correct: number }>();
  // A NAT question has no options by construction, so the 4-options/1-correct
  // invariants apply to the MCQ rows only — asserting them over numeric rows would
  // be a permanent false alarm, and asserting nothing would let an optionless MCQ
  // through. Both sets are checked, each against its own contract.
  const mcqRows = expected.filter((r) => formatOf(r) === "mcq").map((r) => rowOf.get(r.n)).filter(Boolean) as any[];
  const numRows = expected.filter((r) => formatOf(r) === "numeric").map((r) => rowOf.get(r.n)).filter(Boolean) as any[];
  const ids = mcqRows.map((q) => q.id);
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
  check(per.size === mcqRows.length, "every MCQ row has options",
    `${mcqRows.length - per.size} row(s) with none`);
  check([...per.values()].every((v) => v.n === 4), "every MCQ row has exactly 4 options",
    `${[...per.values()].filter((v) => v.n !== 4).length} bad`);
  check([...per.values()].every((v) => v.correct === 1), "every MCQ row has exactly 1 correct option",
    `${[...per.values()].filter((v) => v.correct !== 1).length} bad`);

  if (numRows.length) {
    const numIds = numRows.map((q) => q.id);
    let strayOpts = 0;
    for (let i = 0; i < numIds.length; i += 200) {
      const { data: o, error: nErr } = await c
        .from("options").select("question_id").in("question_id", numIds.slice(i, i + 200));
      if (nErr) throw new Error(`numeric options: ${nErr.message}`);
      strayOpts += (o ?? []).length;
    }
    check(strayOpts === 0, "no numeric row has options", `${strayOpts} stray option row(s)`);
    const missingVal = numRows.filter((q) => q.numeric_answer === null || q.numeric_answer === undefined);
    check(missingVal.length === 0, "every numeric row has a stored numeric_answer",
      `${missingVal.length} null of ${numRows.length}`);
  }

  // Set-based questions (a shared comprehension passage) must share ONE set_id.
  const wantSets = new Set(recs.filter((r) => r.setLabel).map((r) => r.setLabel!));
  if (wantSets.size) {
    const withCtx = recs.filter((r) => r.context).map((r) => r.n).sort((a, b) => a - b);
    const dbCtx = recs.filter((r) => rowOf.get(r.n)?.context).map((r) => r.n).sort((a, b) => a - b);
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
      // Map by the row this record RESOLVED to, not by question_number: a mirrored row
      // carries its original paper's number, so numbering can't identify a printed Q.
      const nById = new Map<string, number>();
      for (const r of recs) {
        const q = rowOf.get(r.n);
        if (q) nById.set(q.id, r.n);
      }
      const ordered = [...links].sort((a, b) => a.position - b.position).map((l) => nById.get(l.question_id));
      check(ordered.every((v) => v !== undefined), "every paper question is one of this paper's records",
        `${ordered.filter((v) => v === undefined).length} unrecognised`);
      check(ordered.length === wantNums.length && ordered.every((v, i) => v === wantNums[i]),
        "paper order == printed Q-order (OMR parity)");
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
