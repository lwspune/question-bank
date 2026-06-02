import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin, HttpError } from "@/lib/auth";
import { updateConceptReport } from "@/lib/notes-reports/updateConceptReport";
import {
  isReportStatus,
  REPORT_RESOLUTION_NOTE_MAX,
} from "@/lib/notes-reports/types";

/**
 * PATCH /api/notes/reports/[id]
 *
 * Body: { status: ReportStatus, resolutionNote?: string | null }
 *
 * Auth: ADMIN only (own-org reports by RLS). Used by the
 * /dashboard/notes-reports triage page for status transitions.
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
    const { status, resolutionNote } = body as {
      status?: unknown;
      resolutionNote?: unknown;
    };

    if (!isReportStatus(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 422 });
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
    const result = await updateConceptReport(supabase, {
      reportId: params.id,
      actorUserId: member.user.id,
      status,
      ...(normalizedNote !== undefined ? { resolutionNote: normalizedNote } : {}),
    });

    switch (result.kind) {
      case "ok":
        return NextResponse.json({ ok: true });
      case "not_found":
        return NextResponse.json(
          { error: "Report not found" },
          { status: 404 }
        );
      case "invalid_status":
        return NextResponse.json({ error: "Invalid status" }, { status: 422 });
      case "invalid_resolution_note":
        return NextResponse.json(
          { error: "Resolution note too long" },
          { status: 422 }
        );
      case "error":
      default:
        console.error("concept reports PATCH route helper error", result);
        return NextResponse.json({ error: "internal error" }, { status: 500 });
    }
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("concept reports PATCH route error", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
