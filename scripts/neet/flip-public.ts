/**
 * Flip a committed NEET paper's rows PRIVATE -> PUBLIC after the human spot-check.
 *
 *   npx tsx scripts/neet/flip-public.ts <paperId>          # dry-run (count only)
 *   npx tsx scripts/neet/flip-public.ts <paperId> --apply  # flip
 *
 * Flips ALL of the paper's rows (scoped by exam_id + source_file). If any rows must
 * stay PRIVATE (a flagged-flawed question), pass --except=<n1,n2,...> to skip those
 * question numbers.
 */
import { join } from "node:path";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, DATA, requirePaper } from "./config";
import { blockedFigureQuestions, type VerifyRecord } from "./figures";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

/**
 * Figure-verify gate: a paper with figures cannot go PUBLIC until every figure has
 * been reviewed to "ok" in data/<paper>.figure-verify.json (run verify-figures.ts).
 * Returns the blocking question numbers ([] = clear). `--force` bypasses (logged).
 */
function figureGateBlockers(paperId: string): string[] {
  const hasFigures = readdirSync(DATA).some((f) => f.startsWith(`${paperId}.figures`) && f.endsWith(".json"));
  if (!hasFigures) return [];
  const vpath = join(DATA, `${paperId}.figure-verify.json`);
  if (!existsSync(vpath)) return ["<no figure-verify.json — run verify-figures.ts first>"];
  const verdict = JSON.parse(readFileSync(vpath, "utf8")) as Record<string, VerifyRecord>;
  return blockedFigureQuestions(verdict);
}

async function main() {
  const paperId = process.argv[2];
  const apply = process.argv.includes("--apply");
  const force = process.argv.includes("--force");
  const exceptArg = process.argv.find((a) => a.startsWith("--except="));
  const except = exceptArg ? exceptArg.slice("--except=".length).split(",").map((s) => s.trim()).filter(Boolean) : [];
  const paper = requirePaper(paperId);
  loadEnv();

  const blockers = figureGateBlockers(paper.id);
  if (blockers.length) {
    console.log(`figure-verify gate: ${blockers.length} figure(s) not reviewed-OK: ${blockers.join(", ")}`);
    if (apply && !force) {
      console.error("refusing to flip PUBLIC — review figures via verify-figures.ts (or pass --force).");
      process.exit(1);
    }
    if (force) console.log("  --force: bypassing the figure gate.");
  } else {
    console.log("figure-verify gate: all figures reviewed-OK (or none).");
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

  const { count: priv } = await client.from("questions").select("id", { count: "exact", head: true }).eq("exam_id", EXAM_ID).eq("source_file", paper.sourceFile).eq("visibility", "PRIVATE");
  console.log(`${paper.id}: ${priv} PRIVATE rows${except.length ? `; keeping PRIVATE: ${except.join(", ")}` : ""}`);

  if (!apply) { console.log("\n[dry-run] pass --apply to flip PUBLIC. Nothing changed."); return; }

  let q = client.from("questions").update({ visibility: "PUBLIC" }, { count: "exact" }).eq("exam_id", EXAM_ID).eq("source_file", paper.sourceFile).eq("visibility", "PRIVATE");
  if (except.length) q = q.not("question_number", "in", `(${except.join(",")})`);
  const { error, count } = await q;
  if (error) throw new Error(`flip failed: ${error.message}`);
  console.log(`flipped ${count} rows to PUBLIC.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
