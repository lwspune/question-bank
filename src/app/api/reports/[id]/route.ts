import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin, HttpError } from "@/lib/auth";
import { updateReport } from "@/lib/reports/updateReport";
import {
  isReportStatus,
  REPORT_RESOLUTION_NOTE_MAX,
} from "@/lib/reports/types";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { recordTriageReview } from "@/lib/reviews/emit";

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
      case "ok": {
        // Service-role: question_reviews has RLS on and no policies, so the
        // admin's own JWT cannot write it. Best-effort — a lost audit row must
        // not roll back the status transition, but it is logged so the hole is
        // visible. Shared with scripts/reviews/resolve-report.ts.
        const recorded = await recordTriageReview(createSupabaseAdminClient(), {
          reportId: params.id,
          status,
          proposedVerdict: reviewVerdict,
        });
        if (recorded.error || recorded.rejected.length > 0) {
          console.error("question_reviews: triage row NOT recorded", recorded);
        }
        return NextResponse.json({ ok: true });
      }
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
