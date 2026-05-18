import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSessionMember } from "@/lib/auth";
import { createReport } from "@/lib/reports/createReport";
import { isReportCategory, REPORT_DETAILS_MAX } from "@/lib/reports/types";

/**
 * POST /api/questions/[id]/reports
 *
 * Body: { category: ReportCategory, details?: string | null }
 *
 * Auth: signed-in user required. Anon → 401. The user's JWT scopes both the
 * question visibility check and the INSERT (RLS enforces reported_by = auth.uid()).
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const member = await getSessionMember();
    if (!member) {
      return NextResponse.json(
        { error: "Sign in to report a question" },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
    const { category, details } = body as {
      category?: unknown;
      details?: unknown;
    };

    if (!isReportCategory(category)) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 422 }
      );
    }
    let normalizedDetails: string | null = null;
    if (details != null) {
      if (typeof details !== "string") {
        return NextResponse.json(
          { error: "Details must be a string" },
          { status: 422 }
        );
      }
      const trimmed = details.trim();
      if (trimmed.length > REPORT_DETAILS_MAX) {
        return NextResponse.json(
          {
            error: `Details too long (max ${REPORT_DETAILS_MAX} characters)`,
          },
          { status: 422 }
        );
      }
      normalizedDetails = trimmed.length === 0 ? null : trimmed;
    }

    const supabase = createSupabaseServerClient();
    const result = await createReport(supabase, {
      questionId: params.id,
      reportedBy: member.user.id,
      category,
      details: normalizedDetails,
    });

    switch (result.kind) {
      case "ok":
        return NextResponse.json({ id: result.id }, { status: 201 });
      case "duplicate_open_report":
        return NextResponse.json(
          {
            error:
              "You already have an open report for this question. We'll get to it.",
          },
          { status: 409 }
        );
      case "question_not_found":
        return NextResponse.json(
          { error: "Question not found" },
          { status: 404 }
        );
      case "invalid_category":
        return NextResponse.json(
          { error: "Invalid category" },
          { status: 422 }
        );
      case "invalid_details":
        return NextResponse.json(
          { error: "Details too long" },
          { status: 422 }
        );
      case "error":
      default:
        console.error("reports route helper error", result);
        return NextResponse.json(
          { error: "internal error" },
          { status: 500 }
        );
    }
  } catch (err) {
    console.error("reports route error", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
