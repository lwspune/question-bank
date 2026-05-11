/**
 * One-shot backfill: walk every question + option, apply normalizeNewlines
 * to text-bearing fields, write back only when a field changes.
 *
 * Idempotent — running a second time changes 0 rows.
 *
 * Usage:
 *   npx tsx scripts/normalize-newlines.ts            # dry-run, prints diffs
 *   npx tsx scripts/normalize-newlines.ts --apply    # writes back
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in env
 * (service role to bypass RLS — this touches every org's rows).
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { normalizeNewlines } from "../src/lib/text/normalizeNewlines";

function loadEnv() {
  const local = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(local)) {
    const dotenv = require("dotenv");
    dotenv.config({ path: local, override: true });
  }
}

type QuestionRow = {
  id: string;
  text: string;
  context: string | null;
  solution: string | null;
};

type OptionRow = {
  id: string;
  text: string;
};

const APPLY = process.argv.includes("--apply");
const PAGE = 500;

async function main() {
  loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
  }
  const admin = createClient(url, key, { auth: { persistSession: false } });

  console.log(`mode: ${APPLY ? "APPLY (writes will happen)" : "DRY-RUN"}`);

  const qStats = await processQuestions(admin);
  console.log(
    `questions: scanned ${qStats.scanned}, would update ${qStats.changed}` +
      (APPLY ? `, updated ${qStats.applied}` : "")
  );

  const oStats = await processOptions(admin);
  console.log(
    `options:   scanned ${oStats.scanned}, would update ${oStats.changed}` +
      (APPLY ? `, updated ${oStats.applied}` : "")
  );
}

async function processQuestions(
  admin: SupabaseClient
): Promise<{ scanned: number; changed: number; applied: number }> {
  let scanned = 0;
  let changed = 0;
  let applied = 0;
  let from = 0;
  while (true) {
    const { data, error } = await admin
      .from("questions")
      .select("id, text, context, solution")
      .range(from, from + PAGE - 1)
      .order("id");
    if (error) throw new Error(`questions select: ${error.message}`);
    if (!data || data.length === 0) break;

    const rows = data as unknown as QuestionRow[];
    for (const row of rows) {
      scanned += 1;
      const newText = normalizeNewlines(row.text);
      const newContext =
        row.context == null ? null : normalizeNewlines(row.context);
      const newSolution =
        row.solution == null ? null : normalizeNewlines(row.solution);

      if (
        newText === row.text &&
        newContext === row.context &&
        newSolution === row.solution
      ) {
        continue;
      }

      changed += 1;
      if (!APPLY) continue;

      const { error: upErr } = await admin
        .from("questions")
        .update({
          text: newText,
          context: newContext,
          solution: newSolution,
        })
        .eq("id", row.id);
      if (upErr) {
        console.error(`update question ${row.id} failed: ${upErr.message}`);
        continue;
      }
      applied += 1;
    }

    if (data.length < PAGE) break;
    from += PAGE;
  }
  return { scanned, changed, applied };
}

async function processOptions(
  admin: SupabaseClient
): Promise<{ scanned: number; changed: number; applied: number }> {
  let scanned = 0;
  let changed = 0;
  let applied = 0;
  let from = 0;
  while (true) {
    const { data, error } = await admin
      .from("options")
      .select("id, text")
      .range(from, from + PAGE - 1)
      .order("id");
    if (error) throw new Error(`options select: ${error.message}`);
    if (!data || data.length === 0) break;

    const rows = data as unknown as OptionRow[];
    for (const row of rows) {
      scanned += 1;
      const newText = normalizeNewlines(row.text);
      if (newText === row.text) continue;

      changed += 1;
      if (!APPLY) continue;

      const { error: upErr } = await admin
        .from("options")
        .update({ text: newText })
        .eq("id", row.id);
      if (upErr) {
        console.error(`update option ${row.id} failed: ${upErr.message}`);
        continue;
      }
      applied += 1;
    }

    if (data.length < PAGE) break;
    from += PAGE;
  }
  return { scanned, changed, applied };
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
