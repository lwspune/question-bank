/**
 * Flip a committed Pariksha test's rows PRIVATE -> PUBLIC after the human spot-check.
 *
 *   npx tsx scripts/pariksha/flip-public.ts <testId>          # dry-run (count only)
 *   npx tsx scripts/pariksha/flip-public.ts <testId> --apply  # flip
 *
 * Scoped by exam_id + source_file. Keyless tests (hasKey=false) carry DERIVED answers and
 * MUST NOT be flipped until spot-checked — this refuses them unless --force. Pass
 * --except=<n1,n2,...> to keep specific question numbers PRIVATE. The figure-verify gate
 * (shared scripts/lib/figures) blocks PUBLIC until every attached figure is reviewed-OK.
 */
import { join } from "node:path";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, DATA, requireTest } from "./config";
import { blockedFigureQuestions, type VerifyRecord } from "../lib/figures/verify";

const SHARD = /\.(keys|figures.*|figure-verify)\.json$/;

/** Question numbers flagged hasFigure in the test's transcription shards. */
function figureQuestionNumbers(testId: string): string[] {
  const out: string[] = [];
  for (const f of readdirSync(DATA).filter((f) => f.startsWith(`${testId}.`) && f.endsWith(".json") && !SHARD.test(f))) {
    const arr = JSON.parse(readFileSync(join(DATA, f), "utf8")) as { number: number; hasFigure?: boolean }[];
    for (const q of arr) if (q.hasFigure) out.push(String(q.number));
  }
  return out;
}

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

function figureGateBlockers(testId: string): string[] {
  const hasFigures = readdirSync(DATA).some((f) => f.startsWith(`${testId}.figures`) && f.endsWith(".json"));
  if (!hasFigures) return [];
  const vpath = join(DATA, `${testId}.figure-verify.json`);
  if (!existsSync(vpath)) return ["<no figure-verify.json — run verify-figures first>"];
  const verdict = JSON.parse(readFileSync(vpath, "utf8")) as Record<string, VerifyRecord>;
  return blockedFigureQuestions(verdict);
}

async function main() {
  const testId = process.argv[2];
  const apply = process.argv.includes("--apply");
  const force = process.argv.includes("--force");
  const exceptArg = process.argv.find((a) => a.startsWith("--except="));
  const textOnly = process.argv.includes("--textonly");
  const except = exceptArg ? exceptArg.slice("--except=".length).split(",").map((s) => s.trim()).filter(Boolean) : [];
  const test = requireTest(testId);
  loadEnv();

  // --textonly: keep every figure question PRIVATE (they publish once their image is attached).
  if (textOnly) {
    const figNums = figureQuestionNumbers(test.id);
    for (const n of figNums) if (!except.includes(n)) except.push(n);
    console.log(`--textonly: holding ${figNums.length} figure question(s) PRIVATE`);
  }

  if (!test.hasKey && !force) {
    console.error(`test ${test.id} is KEYLESS (derived answers) — refusing to flip PUBLIC without spot-check. Pass --force once reviewed.`);
    process.exit(1);
  }

  const blockers = figureGateBlockers(test.id);
  if (blockers.length) {
    console.log(`figure-verify gate: ${blockers.length} figure(s) not reviewed-OK: ${blockers.join(", ")}`);
    if (apply && !force) { console.error("refusing to flip PUBLIC — review figures first (or pass --force)."); process.exit(1); }
    if (force) console.log("  --force: bypassing the figure gate.");
  } else {
    console.log("figure-verify gate: all figures reviewed-OK (or none).");
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const { count: priv } = await client.from("questions").select("id", { count: "exact", head: true }).eq("exam_id", EXAM_ID).eq("source_file", test.sourceFile).eq("visibility", "PRIVATE");
  console.log(`${test.id}: ${priv} PRIVATE rows${except.length ? `; keeping PRIVATE: ${except.join(", ")}` : ""}`);

  if (!apply) { console.log("\n[dry-run] pass --apply to flip PUBLIC. Nothing changed."); return; }

  let q = client.from("questions").update({ visibility: "PUBLIC" }, { count: "exact" }).eq("exam_id", EXAM_ID).eq("source_file", test.sourceFile).eq("visibility", "PRIVATE");
  if (except.length) q = q.not("question_number", "in", `(${except.join(",")})`);
  const { error, count } = await q;
  if (error) throw new Error(`flip failed: ${error.message}`);
  console.log(`flipped ${count} rows to PUBLIC.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
