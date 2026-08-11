/**
 * Resolve a student question-report from the command line, recording the review
 * verdict as it goes.
 *
 *   npm run reviews:resolve                                   # list open reports
 *   npm run reviews:resolve -- --report=<id> --status=resolved --verdict=key_fixed
 *   npm run reviews:resolve -- --report=<id> --status=wont-fix --apply
 *
 * WHY A CLI AND NOT JUST THE ADMIN PAGE. Most reports are resolved here — by a
 * script or a direct DB edit — not by someone clicking `/dashboard/reports`. A
 * verdict that only the web route recorded would therefore miss the common case
 * entirely, which is exactly the gap this closes. Both paths call the SAME
 * `recordTriageReview`, so they cannot drift.
 *
 * NOTHING IS INFERRED FROM A STATUS. `wont-fix` on an answer complaint is
 * unambiguous — someone claimed the answer was wrong and we rejected the claim,
 * so the stored answer stands — and derives `confirmed` on its own. `resolved`
 * is ambiguous (key flipped? stem repaired? solution rewritten?) and records
 * only if you pass --verdict. No verdict, no row; the report still resolves.
 *
 * Service-role: question_reviews is RLS-on-no-policies, and `resolved_by` is
 * stamped with the superadmin from platform_admins (override with --actor=<uuid>).
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { recordTriageReview } from "../../src/lib/reviews/emit";
import { formatRecordResult } from "../../src/lib/reviews/service";
import { isReportStatus, REPORT_CATEGORY_LABELS } from "../../src/lib/reports/types";
import { ANSWER_AFFECTING_CATEGORIES, TRIAGE_VERDICT_CHOICES } from "../../src/lib/reviews/triage";
import { isReviewVerdict } from "../../src/lib/reviews/types";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const TERMINAL = new Set(["resolved", "wont-fix", "duplicate"]);

function arg(name: string): string | null {
  return process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=") ?? null;
}

async function listOpen(db: SupabaseClient) {
  const { data, error } = await db
    .from("question_reports")
    .select("id, category, status, details, created_at, questions:question_id (question_number, source_file)")
    .neq("status", "resolved")
    .neq("status", "wont-fix")
    .neq("status", "duplicate")
    .order("created_at", { ascending: true })
    .limit(200);
  if (error) throw error;
  const rows = data ?? [];
  if (rows.length === 0) {
    console.log("\nNo open reports.\n");
    return;
  }
  console.log(`\n${rows.length} open report(s):\n`);
  for (const r of rows) {
    const q = (r.questions ?? {}) as { question_number?: string; source_file?: string };
    const answerAffecting = ANSWER_AFFECTING_CATEGORIES.has(r.category);
    console.log(
      `  ${r.id}\n` +
        `    ${REPORT_CATEGORY_LABELS[r.category as keyof typeof REPORT_CATEGORY_LABELS] ?? r.category}` +
        `${answerAffecting ? "  [answer-affecting — a verdict can be recorded]" : ""}\n` +
        `    ${q.question_number ?? "?"}  ${q.source_file ?? ""}\n` +
        `    ${(r.details ?? "").slice(0, 140)}\n`
    );
  }
  console.log(`Resolve one:\n  npm run reviews:resolve -- --report=<id> --status=resolved --verdict=<v> --apply\n`);
  console.log(`  verdicts: ${TRIAGE_VERDICT_CHOICES.join(" | ")}\n`);
}

async function main() {
  const db: SupabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const reportId = arg("report");
  if (!reportId) return listOpen(db);

  const status = arg("status");
  const verdict = arg("verdict");
  const note = arg("note");
  const apply = process.argv.includes("--apply");

  if (!status || !isReportStatus(status)) {
    throw new Error(`--status must be one of open | in-review | resolved | wont-fix | duplicate`);
  }
  if (verdict && !isReviewVerdict(verdict)) {
    throw new Error(`--verdict must be one of ${TRIAGE_VERDICT_CHOICES.join(" | ")}`);
  }

  const { data: report, error } = await db
    .from("question_reports")
    .select("id, category, status, question_id, questions:question_id (question_number)")
    .eq("id", reportId)
    .maybeSingle();
  if (error) throw error;
  if (!report) throw new Error(`report not found: ${reportId}`);

  const q = (report.questions ?? {}) as { question_number?: string };
  console.log(`\nreport   ${report.id}`);
  console.log(`question ${q.question_number ?? report.question_id}`);
  console.log(`category ${report.category}`);
  console.log(`status   ${report.status} -> ${status}`);
  console.log(`verdict  ${verdict ?? "(none — no review row will be written)"}`);

  if (verdict && !ANSWER_AFFECTING_CATEGORIES.has(report.category)) {
    console.log(
      `\n  ⚠ ${report.category} is not answer-affecting, so the verdict will be IGNORED.\n` +
        `    Fixing a broken image says nothing about whether the answer is right.`
    );
  }

  if (!apply) {
    console.log(`\n(dry run — nothing written. re-run with --apply)\n`);
    return;
  }

  // 1. The report itself. Mirrors updateReport's terminal-status stamping; done
  //    here on the service-role client because the CLI has no session.
  const patch: Record<string, unknown> = { status };
  if (note !== null) patch.resolution_note = note;
  if (TERMINAL.has(status)) {
    patch.resolved_at = new Date().toISOString();
    const { data: admin } = await db.from("platform_admins").select("user_id").limit(1).maybeSingle();
    patch.resolved_by = arg("actor") ?? admin?.user_id ?? null;
  } else {
    patch.resolved_at = null;
    patch.resolved_by = null;
  }
  const { error: uErr } = await db.from("question_reports").update(patch).eq("id", reportId);
  if (uErr) throw new Error(`update failed: ${uErr.message}`);
  console.log(`\nreport updated.`);

  // 2. The review row — same helper the admin route calls.
  const recorded = await recordTriageReview(db, { reportId, status, proposedVerdict: verdict });
  if (recorded.verdict) {
    console.log(formatRecordResult(recorded, `review provenance (${recorded.verdict})`));
  } else {
    console.log(
      `review provenance: nothing recorded — ` +
        `${ANSWER_AFFECTING_CATEGORIES.has(report.category) ? "no verdict given for a resolved report" : "category is not answer-affecting"}.`
    );
  }
  console.log("");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
