/**
 * Numbering triage: decide the LANE for each paper not yet ingested for a subject.
 *
 *   npx tsx scripts/jee/triage.ts [--subject=Chemistry] [--all]
 *
 * The lane decision is the core judgement of this pipeline, because a SHIFTED
 * source key is worse than no key at all: it is confidently wrong on every
 * question, and an agent told to "verify" against it will rationalise the shift.
 *
 *   SAFE   the key can be trusted as a PEER — agents classify, solve, and flag
 *          disagreements, and `assemble-safe` stores the SOURCE answer.
 *   BLIND  the key cannot be trusted — agents solve from scratch and never see
 *          it, and `assemble-blind` stores the DERIVED answer.
 *
 * Two independent facts drive it, and BOTH must hold for SAFE:
 *
 * 1. Are there keys at all? An MCQ key lives on the OPTIONS (`isCorrect`), a NAT
 *    key in `numericAnswer`. Counting only a top-level `answer` field undercounts
 *    every MCQ and reports a fully-keyed paper as keyless — that mistake was made
 *    here once already.
 * 2. Can a key be tied to its question? Either the solution doc numbers its blocks
 *    (distinct labels == question count: NUMBER-MATCHED, the safest case), or it
 *    renumbers every block "1." and position is the only link (POSITIONAL — safe
 *    ONLY if the block count matches exactly, since one missing block silently
 *    shifts every key after it).
 *
 * Anything else is UNSAFE. A partial-key paper is also UNSAFE as a whole: mixing
 * lanes inside one paper files identical questions by different standards.
 *
 * This is a REPORT, not an oracle. Known-bad papers override it — 2023-feb01's
 * entire shift-2 key block is displaced by +2 (confirmed against 18 independent
 * derivations during the Physics ingest), so it goes BLIND whatever its numbering
 * looks like. Check the paper's own `notes` before trusting a SAFE verdict.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID } from "./config";
import { parseSubjectArg } from "./lib";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const PAPERS_DIR = join("scripts", "jee", "papers");

export type Lane = "SAFE" | "BLIND" | "REVIEW";

export function decideLane(input: {
  records: number;
  chem: number;
  keyed: number;
  distinctLabels: number;
  oneLabels: number;
}): { lane: Lane; why: string } {
  const { records, chem, keyed, distinctLabels, oneLabels } = input;
  if (keyed === 0) return { lane: "BLIND", why: "no keys extracted at all" };
  // A couple of unextracted keys is normal — an image-options row, a mangled
  // block — and says nothing about the rest, so those fall through to the
  // agent's own derivation inside the SAFE lane. A LARGE hole is different: it
  // means the extractor lost its footing somewhere, and the keys it did find
  // may be attached to the wrong questions.
  const missing = chem - keyed;
  if (missing > Math.max(2, Math.floor(chem * 0.1))) {
    return { lane: "BLIND", why: `${keyed} of ${chem} keyed — a hole that large suggests the extractor lost its place` };
  }
  const gap = missing ? ` (${missing} unkeyed, agent derives those)` : "";
  if (distinctLabels === records) return { lane: "SAFE", why: `number-matched${gap}` };
  if (distinctLabels <= 1 && oneLabels === records) {
    return { lane: "SAFE", why: `positional, and all ${records} blocks present${gap}` };
  }
  if (distinctLabels <= 1) {
    return { lane: "BLIND", why: `positional but ${oneLabels} blocks for ${records} questions — a missing block shifts every later key` };
  }
  return { lane: "BLIND", why: `${distinctLabels} labels for ${records} questions` };
}

async function ingestedSourceFiles(subject: string): Promise<Set<string>> {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
  const { data: subs, error: se } = await db.from("subjects").select("id,name").eq("exam_id", EXAM_ID);
  if (se) throw se;
  const sub = (subs ?? []).find((s) => s.name === subject);
  if (!sub) throw new Error(`subject not found: ${subject}`);
  const out = new Set<string>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("source_file")
      .eq("exam_id", EXAM_ID)
      .eq("subject_id", sub.id)
      .range(from, from + 999);
    if (error) throw error;
    if (!data?.length) break;
    for (const r of data) out.add(r.source_file as string);
    if (data.length < 1000) break;
  }
  return out;
}

async function main() {
  const subject = parseSubjectArg(process.argv) ?? "Chemistry";
  const all = process.argv.includes("--all");
  const done = all ? new Set<string>() : await ingestedSourceFiles(subject);

  const rows: { id: string; lane: Lane; why: string; chem: number; keyed: number; notes: string }[] = [];
  for (const f of readdirSync(PAPERS_DIR).sort()) {
    if (!f.endsWith(".json")) continue;
    const id = f.replace(/\.json$/, "");
    const paper = JSON.parse(readFileSync(join(PAPERS_DIR, f), "utf8"));
    if (!paper.sourceFile || done.has(paper.sourceFile)) continue;

    const recPath = join("scripts", "jee", "out", `${id}.records.json`);
    if (!existsSync(recPath)) {
      rows.push({ id, lane: "REVIEW", why: "no records — run extract first", chem: 0, keyed: 0, notes: "" });
      continue;
    }
    const recs = JSON.parse(readFileSync(recPath, "utf8"));
    const chemRecs = recs.filter((r: any) => r.subject === subject);
    const keyed = chemRecs.filter(
      (r: any) =>
        (r.options ?? []).some((o: any) => o.isCorrect) ||
        (r.numericAnswer !== undefined && r.numericAnswer !== null) ||
        r.answer,
    ).length;

    let distinctLabels = 0;
    let oneLabels = 0;
    const solPath = join("scripts", "jee", "out", `${id}_soln.md`);
    if (existsSync(solPath)) {
      const labels = readFileSync(solPath, "utf8")
        .split("\n")
        .map((l) => l.match(/^(\d+)\./)?.[1])
        .filter(Boolean) as string[];
      distinctLabels = new Set(labels).size;
      oneLabels = labels.filter((l) => l === "1").length;
    }
    const { lane, why } = decideLane({
      records: recs.length,
      chem: chemRecs.length,
      keyed,
      distinctLabels,
      oneLabels,
    });
    rows.push({ id, lane, why, chem: chemRecs.length, keyed, notes: paper.notes ?? "" });
  }

  for (const lane of ["SAFE", "BLIND", "REVIEW"] as Lane[]) {
    const group = rows.filter((r) => r.lane === lane);
    console.log(`\n=== ${lane} (${group.length} papers, ${group.reduce((n, r) => n + r.chem, 0)} ${subject} questions)`);
    for (const r of group) {
      const warn = /displaced|shifted|SINGLE shift|no soln/i.test(r.notes) ? "  <-- CHECK paper notes" : "";
      console.log(`  ${r.id.padEnd(16)} ${String(r.chem).padStart(3)} q, ${String(r.keyed).padStart(3)} keyed — ${r.why}${warn}`);
    }
  }
  console.log(`\ntotal: ${rows.length} papers, ${rows.reduce((n, r) => n + r.chem, 0)} ${subject} questions remaining`);
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
