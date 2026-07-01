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
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, requirePaper } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const paperId = process.argv[2];
  const apply = process.argv.includes("--apply");
  const exceptArg = process.argv.find((a) => a.startsWith("--except="));
  const except = exceptArg ? exceptArg.slice("--except=".length).split(",").map((s) => s.trim()).filter(Boolean) : [];
  const paper = requirePaper(paperId);
  loadEnv();

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
