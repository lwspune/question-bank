/**
 * Underline-pattern audit (export-coverage check).
 *
 * The docx export bypasses the OMML borderBox pipeline for the two
 * documented underline patterns — `\(\underline{\text{x}}\)` and
 * `\(\underline{\textit{x}}\)` — and emits native Word underline runs
 * instead (Word's borderBox rendering is unreliable; see the 2026-05-26
 * decisions log). Any other shape falls through to the OMML pipeline,
 * where it silently renders without an underline.
 *
 * This script scans every PUBLIC question's text / context / solution
 * and every option's text for inline `\(\underline{...}\)` segments,
 * then classifies each one as "covered" (bypassed → native underline)
 * or "fall-through" (still routes through borderBox → broken in Word).
 *
 * Exits 0 always — informational. Run after each new English / Biology
 * batch lands to catch silent failure-mode regressions.
 *
 * Usage:
 *   npx tsx scripts/audit-underline-patterns.ts
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY in env.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { parseLatex } from "../src/components/math/parseLatex";
import { UNDERLINE_BYPASS_RE } from "../src/lib/export/ommlBuilder";

function loadEnv() {
  const local = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(local)) {
    const dotenv = require("dotenv");
    dotenv.config({ path: local, override: true });
  }
}

type Hit = {
  questionId: string;
  field: string;
  payload: string;
};

function collectHits(
  text: string | null,
  questionId: string,
  field: string,
  bucket: Hit[]
) {
  if (!text || !text.includes("\\underline")) return;
  for (const seg of parseLatex(text)) {
    if (seg.type !== "inline") continue;
    if (!seg.content.includes("\\underline")) continue;
    bucket.push({ questionId, field, payload: seg.content });
  }
}

async function main() {
  loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in env."
    );
    process.exit(1);
  }
  const client = createClient(url, key);

  console.log("Scanning PUBLIC questions for \\underline{...} payloads...\n");

  const hits: Hit[] = [];

  // Stream PUBLIC questions in pages of 500 (defends against the
  // PostgREST 1000-row cap as the bank grows past it).
  const pageSize = 500;
  let from = 0;
  for (;;) {
    const { data, error } = await client
      .from("questions")
      .select("id, text, context, solution")
      .eq("visibility", "PUBLIC")
      .or("text.like.*underline*,context.like.*underline*,solution.like.*underline*")
      .range(from, from + pageSize - 1);
    if (error) {
      console.error("Query failed:", error.message);
      process.exit(1);
    }
    if (!data || data.length === 0) break;
    for (const row of data) {
      collectHits(row.text, row.id, "text", hits);
      collectHits(row.context, row.id, "context", hits);
      collectHits(row.solution, row.id, "solution", hits);
    }
    if (data.length < pageSize) break;
    from += pageSize;
  }

  // Options live in their own table — separate pass.
  from = 0;
  for (;;) {
    const { data, error } = await client
      .from("options")
      .select("question_id, label, text")
      .like("text", "%underline%")
      .range(from, from + pageSize - 1);
    if (error) {
      console.error("Options query failed:", error.message);
      process.exit(1);
    }
    if (!data || data.length === 0) break;
    for (const row of data) {
      collectHits(row.text, row.question_id, `option_${row.label}`, hits);
    }
    if (data.length < pageSize) break;
    from += pageSize;
  }

  const covered: Hit[] = [];
  const fallThrough: Hit[] = [];
  for (const h of hits) {
    if (UNDERLINE_BYPASS_RE.test(h.payload)) covered.push(h);
    else fallThrough.push(h);
  }

  console.log(`Total \\underline payloads:  ${hits.length}`);
  console.log(`  covered (bypass → native): ${covered.length}`);
  console.log(`  fall-through (OMML path):  ${fallThrough.length}\n`);

  if (fallThrough.length === 0) {
    console.log("All underline payloads render via native Word underline. ✓");
    return;
  }

  // Group fall-throughs by payload shape so the operator sees how many
  // distinct patterns need attention vs how many duplicates there are.
  const byPayload = new Map<string, Hit[]>();
  for (const h of fallThrough) {
    const list = byPayload.get(h.payload) ?? [];
    list.push(h);
    byPayload.set(h.payload, list);
  }
  const ranked = [...byPayload.entries()].sort(
    (a, b) => b[1].length - a[1].length
  );

  console.log("Fall-through patterns (renders without underline in Word):");
  for (const [payload, samples] of ranked) {
    const sample = samples[0];
    console.log(
      `  ${samples.length}x  ${payload}\n        e.g. q=${sample.questionId} field=${sample.field}`
    );
  }

  console.log(
    "\nFix path: either reshape DB content to \\underline{\\text{...}} / " +
      "\\underline{\\textit{...}}, or extend UNDERLINE_BYPASS_RE in " +
      "src/lib/export/ommlBuilder.ts to cover the new variant."
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
