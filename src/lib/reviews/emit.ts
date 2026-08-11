/**
 * Review-provenance emitters for the ingestion pipelines.
 *
 * Five pipelines (stateboard, ncert, mh-sb-9, mh-sb-11, mh-ssc-10*) each carry a
 * near-identical `mark-mcq-verify.ts` and `apply-errata.ts`. Rather than
 * copy-paste an emit block into nine scripts, each calls one of these and gains
 * about four lines.
 *
 * NOT marked `server-only`: the scripts run under tsx. The caller injects the
 * service-role client.
 *
 * Both helpers are best-effort in the same sense as service.ts — they return a
 * result for the caller to print and never throw, because losing an audit row
 * must not roll back the errata write or the file patch it describes.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { liveRunLabel } from "./artifacts";
import { recordReviews, type RecordReviewsResult } from "./service";
import { resolveTriageReview } from "./triage";
import type { ReviewInput } from "./record";

const IN_CHUNK = 200;

const EMPTY: RecordReviewsResult = { attempted: 0, accepted: 0, written: 0, rejected: [] };

/** questions.content_hash for a set of ids, chunked for the PostgREST URL limit. */
async function hashesFor(
  db: SupabaseClient,
  ids: string[]
): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  for (let i = 0; i < ids.length; i += IN_CHUNK) {
    const { data, error } = await db
      .from("questions")
      .select("id, content_hash")
      .in("id", ids.slice(i, i + IN_CHUNK));
    if (error) throw error;
    for (const q of data ?? []) out.set(q.id as string, q.content_hash as string);
  }
  return out;
}

export type McqVerifyRow = {
  id: string;
  ref: string;
  derived_answer: string | null;
  matches_current?: boolean;
};

/**
 * A blind re-derivation that AGREES with the committed key is a confirmation —
 * the single most common review this bank performs, and until now it was only
 * ever a console line.
 *
 * A MISMATCH emits nothing. It is a flag, not a verdict: the script itself says
 * it "never auto-re-keys — that needs a human adjudication", and recording a
 * verdict before that adjudication would assert an outcome nobody has reached.
 * The same rule the grounding HELD queue follows.
 */
export async function recordMcqVerifyReviews(
  db: SupabaseClient,
  input: {
    pipeline: string;
    artifactId: string;
    rows: readonly McqVerifyRow[];
    derivedModel?: string | null;
  }
): Promise<RecordReviewsResult> {
  const agreed = input.rows.filter((r) => r.matches_current === true && r.id);
  if (agreed.length === 0) return EMPTY;

  const hashes = await hashesFor(db, agreed.map((r) => r.id));
  const runLabel = liveRunLabel(input.pipeline, input.artifactId, "mcq-verify");

  const inputs: ReviewInput[] = [];
  for (const row of agreed) {
    const hash = hashes.get(row.id);
    if (!hash) continue;
    inputs.push({
      questionId: row.id,
      reviewedContentHash: hash,
      method: "blind_rederivation",
      verdict: "confirmed",
      runLabel,
      derivedModel: input.derivedModel ?? null,
      note: `blind re-derivation (${row.ref}) matched the committed key ${row.derived_answer ?? "?"}`,
    });
  }
  return recordReviews(db, inputs);
}

/**
 * Record a report triage as review provenance.
 *
 * Shared by `PATCH /api/reports/[id]` and `scripts/reviews/resolve-report.ts`
 * SO THEY CANNOT DRIFT — most reports are resolved from the command line, not
 * the admin page, and a verdict that only the web path records would leave the
 * common case unrecorded.
 *
 * The verdict is derived from the report's TRUE stored category, never from what
 * the caller claims: otherwise a caller could stamp "confirmed" on a question
 * nobody adjudicated. `proposedVerdict` only says what the operator did.
 *
 * Requires a SERVICE-ROLE client (question_reviews has RLS on and no policies).
 * Never throws — the status transition is the primary action.
 */
export async function recordTriageReview(
  db: SupabaseClient,
  input: { reportId: string; status: string; proposedVerdict?: unknown }
): Promise<RecordReviewsResult & { verdict?: string | null }> {
  try {
    const { data: report } = await db
      .from("question_reports")
      .select("question_id, category")
      .eq("id", input.reportId)
      .maybeSingle();
    if (!report?.question_id) return { ...EMPTY, verdict: null };

    const verdict = resolveTriageReview({
      category: report.category,
      status: input.status as never,
      proposedVerdict: typeof input.proposedVerdict === "string" ? input.proposedVerdict : null,
    });
    if (!verdict) return { ...EMPTY, verdict: null };

    const { data: question } = await db
      .from("questions")
      .select("content_hash")
      .eq("id", report.question_id)
      .maybeSingle();
    if (!question?.content_hash) return { ...EMPTY, verdict };

    const result = await recordReviews(db, [
      {
        questionId: report.question_id,
        reviewedContentHash: question.content_hash as string,
        method: "report_triage",
        verdict,
        runLabel: `report-triage:${input.reportId}`,
        note: `student report (${report.category}) marked ${input.status}`,
      },
    ]);
    return { ...result, verdict };
  } catch (err) {
    return {
      ...EMPTY,
      error: err instanceof Error ? err.message : String(err),
      verdict: null,
    };
  }
}

export type ErratumApplied = {
  questionId: string;
  ref: string;
  bracket: string;
  /** content_hash as stored. An erratum edits `solution` only, which is not part
   *  of the hash, so it is unchanged by the write this accompanies. */
  contentHash: string;
};

/**
 * A `[Textbook …]` bracket means the review concluded the SOURCE is defective and
 * our content stands — `defect_preserved`, for both bracket conventions:
 * "answer-key error" (the book's key is wrong, our answer right) and "misprint"
 * (the question or the book's own printed solution is broken and we preserve and
 * explain it). Either way we changed nothing of ours, so it is never `corrected`.
 */
export async function recordErrataReviews(
  db: SupabaseClient,
  input: { pipeline: string; artifactId: string; items: readonly ErratumApplied[] }
): Promise<RecordReviewsResult> {
  if (input.items.length === 0) return EMPTY;
  const runLabel = liveRunLabel(input.pipeline, input.artifactId, "crosscheck");
  return recordReviews(
    db,
    input.items.map((item) => ({
      questionId: item.questionId,
      reviewedContentHash: item.contentHash,
      method: "textbook_answer_key" as const,
      verdict: "defect_preserved" as const,
      runLabel,
      note: `${item.ref}: ${item.bracket}`,
    }))
  );
}
