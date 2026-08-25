/**
 * Flip the committed CDS English corpus from PRIVATE to PUBLIC.
 *
 *   npx tsx scripts/cds/flip-public.ts                 # dry-run, all 19 papers
 *   npx tsx scripts/cds/flip-public.ts 2026-1          # dry-run, one paper
 *   npx tsx scripts/cds/flip-public.ts --apply         # write, all 19 papers
 *
 * WHY THIS SCRIPT SCOPES BY exam_id, NOT source_file ALONE
 * -------------------------------------------------------
 * On 2026-08-01 `scripts/jee/scan-flip.ts` matched on `source_file` alone and
 * published two Maths rows a previous pass had deliberately WITHHELD — a JEE
 * paper file carries three subjects, each ingested in its own pass. CDS is a
 * single-subject exam with its own exam row, so scoping every read AND every
 * write to `exam_id` makes the blast radius exactly this corpus and nothing else.
 * The post-write assertions below prove that rather than assuming it.
 *
 * WHAT IS AND IS NOT VERIFIED
 * ---------------------------
 * CDS booklets ship with NO official answer key, so every answer here is
 * LLM-DERIVED and confidence-flagged (1,423 HIGH / 648 MED / 132 LOW / 77
 * unmarked as at 2026-08-25). Flipping PUBLIC was an explicit product decision
 * (2026-08-25) with the blind re-derivation deferred to a later pass — see the
 * Decisions log and the SUGGESTIONS.md backfill ledger. This script therefore
 * gates on STRUCTURAL soundness only (exactly 4 options, exactly 1 correct); it
 * cannot and does not attest that a key is right.
 *
 * The structural gate FAILS CLOSED: if any row in scope is malformed the script
 * refuses the whole flip rather than publishing the sound subset, because a
 * partial flip leaves the corpus in a state no later count can distinguish from
 * a completed one.
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { EXAM_ID, PAPERS } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

/** PUBLIC count across the WHOLE bank — the guard that no other exam moved. */
async function totalPublic(db: SupabaseClient): Promise<number> {
  const { count, error } = await db
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("visibility", "PUBLIC");
  if (error) throw new Error(`totalPublic: ${error.message}`);
  return count ?? 0;
}

/** Per-visibility counts for the CDS rows in scope. */
async function cdsCounts(db: SupabaseClient, sourceFiles: string[]) {
  const one = async (visibility: "PUBLIC" | "PRIVATE") => {
    const { count, error } = await db
      .from("questions")
      .select("id", { count: "exact", head: true })
      .eq("exam_id", EXAM_ID)
      .in("source_file", sourceFiles)
      .eq("visibility", visibility);
    if (error) throw new Error(`cdsCounts(${visibility}): ${error.message}`);
    return count ?? 0;
  };
  return { pub: await one("PUBLIC"), priv: await one("PRIVATE") };
}

type Defect = { id: string; src: string; qnum: string; nopt: number; ncorrect: number };
type DupRow = { src: string; qnum: string; text: string; labels: string[]; keyInGroup: boolean };

/**
 * Two scans in one pass over the rows in scope.
 *
 * `blocking` — exactly 4 options and exactly one flagged correct. A violation
 * REFUSES the flip: a row that cannot be answered or cannot be graded has no
 * business being PUBLIC.
 *
 * `dups` — two or more options with character-identical text. This does NOT
 * block, deliberately: on /browse a duplicated distractor is a display wart on
 * an otherwise sound question, and refusing would hold 2,000+ clean rows for a
 * handful. But it is reported, and `keyInGroup` separates the two severities —
 * where the KEY is one of the duplicates, an auto-graded mock marks a student
 * WRONG for picking character-identical text. Those must be repaired at source
 * (or marked grace) BEFORE their paper is published as a mock; a plain
 * duplicate distractor merely costs the question one distractor.
 */
async function scanRows(db: SupabaseClient, sourceFiles: string[]) {
  const blocking: Defect[] = [];
  const dups: DupRow[] = [];
  const PAGE = 500;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("questions")
      .select("id, source_file, question_number, options(label, text, is_correct)")
      .eq("exam_id", EXAM_ID)
      .in("source_file", sourceFiles)
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`scanRows: ${error.message}`);
    for (const row of (data ?? []) as Record<string, unknown>[]) {
      const opts = ((row.options as Record<string, unknown>[]) ?? []) as {
        label: string;
        text: string | null;
        is_correct: boolean;
      }[];
      const src = (row.source_file as string) ?? "?";
      const qnum = String(row.question_number ?? "?");
      const ncorrect = opts.filter((o) => o.is_correct).length;
      if (opts.length !== 4 || ncorrect !== 1) {
        blocking.push({ id: row.id as string, src, qnum, nopt: opts.length, ncorrect });
        continue; // a malformed row's duplicate report would be noise
      }
      const byText = new Map<string, string[]>();
      for (const o of opts) {
        const t = (o.text ?? "").trim();
        byText.set(t, [...(byText.get(t) ?? []), o.label]);
      }
      const keyLabel = opts.find((o) => o.is_correct)?.label;
      for (const [text, labels] of byText) {
        if (labels.length < 2) continue;
        dups.push({
          src,
          qnum,
          text: text.length > 48 ? `${text.slice(0, 45)}…` : text,
          labels: labels.sort(),
          keyInGroup: keyLabel != null && labels.includes(keyLabel),
        });
      }
    }
    if (!data || data.length < PAGE) break;
  }
  return { blocking, dups };
}

async function main() {
  const apply = process.argv.includes("--apply");
  const paperId = process.argv.slice(2).find((a) => !a.startsWith("--"));
  if (paperId && !PAPERS[paperId]) {
    throw new Error(`unknown paper "${paperId}". Known: ${Object.keys(PAPERS).join(", ")}`);
  }
  const papers = paperId ? [PAPERS[paperId]] : Object.values(PAPERS);
  const sourceFiles = papers.map((p) => p.sourceFile);

  loadEnv();
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  console.log(`CDS flip-public — ${papers.length} paper(s) in scope\n`);

  const before = await cdsCounts(db, sourceFiles);
  const bankBefore = await totalPublic(db);
  console.log(`  in scope : PUBLIC ${before.pub} / PRIVATE ${before.priv}`);
  console.log(`  bank-wide PUBLIC before: ${bankBefore}`);

  const { blocking, dups } = await scanRows(db, sourceFiles);
  if (blocking.length > 0) {
    console.log(`\n✗ REFUSING: ${blocking.length} structurally unsound row(s) in scope:`);
    for (const d of blocking.slice(0, 20)) {
      console.log(`    ${d.src} Q${d.qnum}  options=${d.nopt} correct=${d.ncorrect}  (${d.id})`);
    }
    if (blocking.length > 20) console.log(`    … and ${blocking.length - 20} more`);
    console.log(`\nFix the source and re-commit before flipping. Nothing was written.`);
    process.exit(1);
  }
  console.log(`  structural gate: OK (every row has 4 options + exactly 1 correct)`);

  // Non-blocking, but the key-in-group rows MUST be settled before this paper
  // ships as an auto-graded mock — see scanRows().
  const keyDups = dups.filter((d) => d.keyInGroup);
  if (dups.length > 0) {
    console.log(
      `\n  ⚠ duplicate options: ${dups.length} group(s) — ${keyDups.length} contain the ANSWER KEY`
    );
    for (const d of keyDups) {
      console.log(`      KEY-IN-GROUP  ${d.src} Q${d.qnum}  ${d.labels.join("=")}  "${d.text}"`);
    }
    for (const d of dups.filter((x) => !x.keyInGroup)) {
      console.log(`      distractor    ${d.src} Q${d.qnum}  ${d.labels.join("=")}  "${d.text}"`);
    }
    if (keyDups.length > 0) {
      console.log(
        `\n    A key-in-group row grades a student WRONG for picking character-identical\n` +
          `    text. Repair at source or mark the question grace BEFORE publishing its\n` +
          `    paper as a mock. This does NOT block the flip (/browse is unaffected).`
      );
    }
  } else {
    console.log(`  duplicate-option scan: none`);
  }

  if (!apply) {
    console.log(`\n[dry-run] would flip ${before.priv} row(s) to PUBLIC. Re-run with --apply.`);
    return;
  }

  const { error, count } = await db
    .from("questions")
    .update({ visibility: "PUBLIC" }, { count: "exact" })
    .eq("exam_id", EXAM_ID)
    .in("source_file", sourceFiles)
    .eq("visibility", "PRIVATE");
  if (error) throw new Error(`flip: ${error.message}`);
  console.log(`\n  updated ${count ?? 0} row(s)`);

  // ── Post-write assertions (prove the blast radius, don't assume it) ────────
  const after = await cdsCounts(db, sourceFiles);
  const bankAfter = await totalPublic(db);
  const expectedPub = before.pub + before.priv;
  const bankDelta = bankAfter - bankBefore;

  console.log(`  in scope : PUBLIC ${after.pub} / PRIVATE ${after.priv}  (expected ${expectedPub} / 0)`);
  console.log(`  bank-wide PUBLIC after: ${bankAfter}  (delta ${bankDelta}, expected ${before.priv})`);

  const problems: string[] = [];
  if (after.pub !== expectedPub) problems.push(`in-scope PUBLIC is ${after.pub}, expected ${expectedPub}`);
  if (after.priv !== 0) problems.push(`in-scope PRIVATE is ${after.priv}, expected 0`);
  if (count !== before.priv) problems.push(`updated ${count}, expected ${before.priv}`);
  if (bankDelta !== before.priv) {
    problems.push(
      `bank-wide PUBLIC moved by ${bankDelta} but only ${before.priv} CDS row(s) were flipped ` +
        `— something outside this exam changed`
    );
  }
  if (problems.length > 0) {
    console.log(`\n✗ POST-WRITE ASSERTIONS FAILED:`);
    problems.forEach((p) => console.log(`    ${p}`));
    process.exit(1);
  }
  console.log(`\n✓ flip complete and verified.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
