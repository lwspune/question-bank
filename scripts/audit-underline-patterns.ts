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
 * This script scans every question's text / context / solution and every
 * option's text for inline `\(\underline{...}\)` segments, then classifies
 * each one as "covered" (bypassed → native underline) or "fall-through"
 * (still routes through borderBox → broken in Word).
 *
 * Exits 0 always — informational. Run after each new English / Biology
 * batch lands to catch silent failure-mode regressions.
 *
 * Usage:
 *   npx tsx scripts/audit-underline-patterns.ts              # whole bank
 *   npm run audit:underlines -- Eng_CDS                      # one source
 *
 * TWO CHANGES MADE 2026-08-25, both forced by the CDS ingest:
 *
 * 1. IT SCANS ALL VISIBILITIES, NOT JUST PUBLIC. It used to filter
 *    `visibility='PUBLIC'`, which made it structurally blind to any corpus
 *    still being prepared — exactly the case it is most useful for. CDS sat
 *    PRIVATE with 1,241 underline zones (its ENTIRE math surface) and this
 *    audit could not see one of them until the moment they went live. A
 *    defect you can only detect after publishing is detected too late.
 *
 * 2. IT USES THE SERVICE-ROLE CLIENT, and that is a timeout fix, not a
 *    permissions one. The scan is an unindexed triple-OR `LIKE '%underline%'`
 *    over three long-form columns — an unavoidable seq scan, measured at
 *    ~2.9s / 10,522 buffers once the bank passed ~56k rows. The `anon` role
 *    carries `statement_timeout=3s`, so the audit began failing outright with
 *    `canceling statement due to statement timeout`; `service_role` connects
 *    via `authenticator` (8s) and has comfortable headroom.
 *
 *    Keyset pagination was measured as an alternative and is WORSE, not
 *    better: ordering by the pkey turns the sequential read into random heap
 *    access — 9.1s / 21,558 buffers, 3x slower. Do not "optimise" this into
 *    an id-ordered walk. If it ever times out again the levers are the source
 *    filter above, or a narrower id-only first pass.
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in env.
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
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env."
    );
    process.exit(1);
  }
  const client = createClient(url, key, { auth: { persistSession: false } });

  // Optional source_file substring filter, like audit:text / audit:omml.
  const srcFilter = process.argv.slice(2).find((a) => !a.startsWith("--"));
  console.log(
    `Scanning questions for \\underline{...} payloads` +
      `${srcFilter ? ` (source_file ~ "${srcFilter}")` : " (whole bank)"}...\n`
  );

  const hits: Hit[] = [];

  // Stream questions in pages of 500 (defends against the PostgREST 1000-row
  // cap as the bank grows past it).
  const pageSize = 500;
  let from = 0;
  for (;;) {
    let q = client
      .from("questions")
      .select("id, text, context, solution")
      .or("text.like.*underline*,context.like.*underline*,solution.like.*underline*");
    if (srcFilter) q = q.ilike("source_file", `%${srcFilter}%`);
    const { data, error } = await q.range(from, from + pageSize - 1);
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
    // `options` has no source_file of its own, so a scoped run must filter
    // through its parent question with an INNER join. Without this the filtered
    // run silently reported OTHER exams' option hits — it printed CDS question
    // counts beside Chemistry option fall-throughs, which reads as a CDS defect.
    // The select string must be a literal for supabase-js to type the result,
    // so the two shapes are built as separate queries rather than a ternary.
    const scoped = client
      .from("options")
      .select("question_id, label, text, questions!inner(source_file)")
      .like("text", "%underline%")
      .ilike("questions.source_file", `%${srcFilter ?? ""}%`)
      .range(from, from + pageSize - 1);
    const unscoped = client
      .from("options")
      .select("question_id, label, text")
      .like("text", "%underline%")
      .range(from, from + pageSize - 1);
    const { data, error } = srcFilter ? await scoped : await unscoped;
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
