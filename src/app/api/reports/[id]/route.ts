import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin, HttpError } from "@/lib/auth";
import { updateReport } from "@/lib/reports/updateReport";
import {
  isReportStatus,
  REPORT_RESOLUTION_NOTE_MAX,
} from "@/lib/reports/types";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { resolveTriageReview } from "@/lib/reviews/triage";
import { recordReview } from "@/lib/reviews/service";

/**
 * Record the triage as review provenance (0074), best-effort.
 *
 * Runs on the SERVICE-ROLE client because question_reviews is service-role only
 * (RLS on, no policies) — the admin's own JWT cannot write it.
 *
 * The verdict is decided from the report's TRUE category as stored, never from
 * the client's word: a caller could otherwise stamp "confirmed" on a question
 * nobody adjudicated. The client only proposes what the admin says they did.
 *
 * Never throws and never fails the request — the status transition is the
 * primary action, and losing its audit row must not roll it back. A failure is
 * logged so the hole in the trail is visible.
 */
async function recordTriageReview(
  reportId: string,
  status: string,
  proposedVerdict: unknown
): Promise<void> {
  try {
    const admin = createSupabaseAdminClient();
    const { data: report } = await admin
      .from("question_reports")
      .select("question_id, category")
      .eq("id", reportId)
      .maybeSingle();
    if (!report?.question_id) return;

    const verdict = resolveTriageReview({
      category: report.category,
      status: status as never,
      proposedVerdict: typeof proposedVerdict === "string" ? proposedVerdict : null,
    });
    if (!verdict) return;

    const { data: question } = await admin
      .from("questions")
      .select("content_hash")
      .eq("id", report.question_id)
      .maybeSingle();
    if (!question?.content_hash) return;

    const result = await recordReview(admin, {
      questionId: report.question_id,
      reviewedContentHash: question.content_hash,
      method: "report_triage",
      verdict,
      runLabel: `report-triage:${reportId}`,
      note: `student report (${report.category}) marked ${status}`,
    });
    if (result.error || result.rejected.length > 0) {
      console.error("question_reviews: triage row NOT recorded", result);
    }
  } catch (err) {
    console.error("question_reviews: triage row NOT recorded", err);
  }
}

/**
 * PATCH /api/reports/[id]
 *
 * Body: { status: ReportStatus, resolutionNote?: string | null }
 *
 * Auth: ADMIN only (their own-org reports by RLS). Used by the
 * /dashboard/reports triage page to mark status transitions.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const member = await requireAdmin();
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
    const { status, resolutionNote, reviewVerdict } = body as {
      status?: unknown;
      resolutionNote?: unknown;
      reviewVerdict?: unknown;
    };

    if (!isReportStatus(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 422 }
      );
    }

    let normalizedNote: string | null | undefined = undefined;
    if (resolutionNote !== undefined) {
      if (resolutionNote === null) {
        normalizedNote = null;
      } else if (typeof resolutionNote !== "string") {
        return NextResponse.json(
          { error: "resolutionNote must be a string or null" },
          { status: 422 }
        );
      } else {
        const trimmed = resolutionNote.trim();
        if (trimmed.length > REPORT_RESOLUTION_NOTE_MAX) {
          return NextResponse.json(
            {
              error: `Resolution note too long (max ${REPORT_RESOLUTION_NOTE_MAX} characters)`,
            },
            { status: 422 }
          );
        }
        normalizedNote = trimmed.length === 0 ? null : trimmed;
      }
    }

    const supabase = createSupabaseServerClient();
    const result = await updateReport(supabase, {
      reportId: params.id,
      actorUserId: member.user.id,
      status,
      ...(normalizedNote !== undefined ? { resolutionNote: normalizedNote } : {}),
    });

    switch (result.kind) {
      case "ok":
        await recordTriageReview(params.id, status, reviewVerdict);
        return NextResponse.json({ ok: true });
      case "not_found":
        return NextResponse.json(
          { error: "Report not found" },
          { status: 404 }
        );
      case "invalid_status":
        return NextResponse.json(
          { error: "Invalid status" },
          { status: 422 }
        );
      case "invalid_resolution_note":
        return NextResponse.json(
          { error: "Resolution note too long" },
          { status: 422 }
        );
      case "forbidden":
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      case "error":
      default:
        console.error("reports PATCH route helper error", result);
        return NextResponse.json(
          { error: "internal error" },
          { status: 500 }
        );
    }
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("reports PATCH route error", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
