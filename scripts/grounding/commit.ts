/**
 * Commit the agents' solution_json output for a batch.
 *   npx tsx scripts/grounding/commit.ts <batch>           # dry-run: validate + audit, no write
 *   npx tsx scripts/grounding/commit.ts <batch> --apply   # write solution_json + plain_text + provenance
 *
 * Reads scripts/grounding/data/<batch>.solution.json (the agent output):
 *   [{ id, approach, steps[], final_answer, option_matched }]
 * For each row: validateSolutionJson (rejects malformed agent output), recompute
 * plain_text deterministically from the DB row (canonical truth, not the input
 * file), and UPSERT plain_text + solution_json + derived_model/at.
 *
 * AUDIT: option_matched (agent, blind to the key) is compared against the bank's
 * real is_correct label; disagreements are appended to scripts/logs/key-
 * mismatches.jsonl for human review — a free wrong-key pass.
 *
 * Idempotent: rows that already have solution_json are skipped unless --force.
 */
import { readFileSync, appendFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { validateSolutionJson, latexToPlainText, correctOptionLabel, detectKeyMismatch } from "./lib";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

const DATA = join(process.cwd(), "scripts", "grounding", "data");
const LOGS = join(process.cwd(), "scripts", "logs");
const MISMATCH_LOG = join(LOGS, "key-mismatches.jsonl");
const DERIVED_MODEL = "claude-sonnet-4-6 (agent)";

interface AgentRow {
  id: string;
  approach: string;
  steps: string[];
  final_answer: string;
  option_matched: string | null;
}

function plainTextFor(row: { context: string | null; text: string | null }): string {
  const parts = [row.context, row.text].filter((p): p is string => !!p && p.trim().length > 0);
  return latexToPlainText(parts.join("\n"));
}

async function main() {
  loadEnv();
  const batch = process.argv[2];
  if (!batch || batch.startsWith("--")) throw new Error("usage: commit.ts <batch> [--apply] [--force]");
  const apply = process.argv.includes("--apply");
  const force = process.argv.includes("--force");

  const solPath = join(DATA, `${batch}.solution.json`);
  if (!existsSync(solPath)) throw new Error(`missing agent output: ${solPath}`);
  const agentRows: AgentRow[] = JSON.parse(readFileSync(solPath, "utf8"));

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let written = 0;
  let skipped = 0;
  let held = 0;
  const mismatches: { id: string; option_matched: string | null; correct_label: string | null; final_answer: string }[] = [];

  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  for (const raw of agentRows) {
    // 0. Guard against an agent truncating/garbling the id (e.g. emitting the
    //    8-char prefix) — skip+warn rather than crash the whole batch.
    if (!raw.id || !UUID_RE.test(raw.id)) {
      console.warn(`  ! "${raw.id}": not a full uuid (agent truncation?), skipping`);
      skipped++;
      continue;
    }

    // 1. Validate the agent's structured output up front — a malformed row never
    //    reaches the DB.
    const sol = validateSolutionJson({
      approach: raw.approach,
      steps: raw.steps,
      final_answer: raw.final_answer,
      option_matched: raw.option_matched,
    });

    // 2. Pull canonical truth (context/text for plain_text, options for the audit).
    const { data: q, error: qerr } = await client
      .from("questions")
      .select("id, context, text, solution_json")
      .eq("id", raw.id)
      .maybeSingle();
    if (qerr) throw qerr;
    if (!q) {
      console.warn(`  ! ${raw.id}: not found, skipping`);
      continue;
    }
    if (q.solution_json && !force) {
      skipped++;
      continue;
    }

    const { data: opts, error: oerr } = await client
      .from("options")
      .select("label, is_correct")
      .eq("question_id", raw.id);
    if (oerr) throw oerr;
    const correctLabel = correctOptionLabel(opts ?? []);

    // 3. Audit: blind re-derivation vs the bank's verified key. A disagreement
    //    is HELD, not written — the grounding layer must never carry a
    //    solution_json that contradicts the human-verified is_correct (a tutor
    //    would mis-explain). The row stays solution_json=NULL (tutor falls back
    //    to the raw solution) and lands in the log as an audit candidate.
    //    A NULL option_matched (the agent couldn't pin an option — usually a
    //    corrupt/garbled stem) is ALSO held: shipping an "I can't tell" as
    //    grounding is worse than falling back to the raw solution, and it's a
    //    high-signal flag that the stem needs a source check.
    if (sol.option_matched === null || detectKeyMismatch(sol.option_matched, correctLabel ?? "")) {
      mismatches.push({ id: raw.id, option_matched: sol.option_matched, correct_label: correctLabel, final_answer: sol.final_answer });
      held++;
      continue;
    }

    // 4. Write.
    if (apply) {
      const { error: uerr } = await client
        .from("questions")
        .update({
          plain_text: plainTextFor(q),
          solution_json: sol,
          derived_model: DERIVED_MODEL,
          derived_at: new Date().toISOString(),
        })
        .eq("id", raw.id);
      if (uerr) throw uerr;
    }
    written++;
  }

  // Log mismatches (always — they're audit findings even in dry-run).
  if (mismatches.length) {
    mkdirSync(LOGS, { recursive: true });
    const ts = new Date().toISOString();
    for (const m of mismatches) appendFileSync(MISMATCH_LOG, JSON.stringify({ ...m, batch, ts }) + "\n");
  }

  console.log(`${apply ? "wrote" : "would write"} ${written} | skipped ${skipped} (already grounded) | HELD ${held} (key dispute)`);
  if (mismatches.length) {
    console.log(`\n⚠ HELD — agent re-derivation ≠ bank key (NOT written; review) → ${MISMATCH_LOG}:`);
    for (const m of mismatches) console.log(`  ${m.id}: agent=${m.option_matched} key=${m.correct_label} (${m.final_answer})`);
  }
  if (!apply) console.log(`\n(dry-run — re-run with --apply to write)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
