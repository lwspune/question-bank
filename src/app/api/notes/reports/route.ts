import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSessionUser } from "@/lib/auth";
import { createConceptReport } from "@/lib/notes-reports/createConceptReport";
import {
  isConceptReportCategory,
  REPORT_DETAILS_MAX,
} from "@/lib/notes-reports/types";

/**
 * POST /api/notes/reports
 *
 * Body: { subtopicSlug: string, conceptSlug: string,
 *         category: ConceptReportCategory, details?: string | null }
 *
 * Auth: signed-in user required (any account — students included; concepts
 * are global content, so this is NOT org-member gated). Anon → 401. The
 * user's JWT scopes the INSERT (RLS enforces reported_by = auth.uid()).
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json(
        { error: "Sign in to report a concept" },
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
    const { subtopicSlug, conceptSlug, category, details } = body as {
      subtopicSlug?: unknown;
      conceptSlug?: unknown;
      category?: unknown;
      details?: unknown;
    };

    if (typeof subtopicSlug !== "string" || typeof conceptSlug !== "string") {
      return NextResponse.json(
        { error: "Missing concept identifier" },
        { status: 400 }
      );
    }
    if (!isConceptReportCategory(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 422 });
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
          { error: `Details too long (max ${REPORT_DETAILS_MAX} characters)` },
          { status: 422 }
        );
      }
      normalizedDetails = trimmed.length === 0 ? null : trimmed;
    }

    const supabase = createSupabaseServerClient();
    const result = await createConceptReport(supabase, {
      subtopicSlug,
      conceptSlug,
      reportedBy: user.id,
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
              "You already have an open report for this concept. We'll get to it.",
          },
          { status: 409 }
        );
      case "unknown_concept":
        return NextResponse.json(
          { error: "Concept not found" },
          { status: 404 }
        );
      case "org_unresolved":
        // Shipped concepts always resolve; treat as a server-side problem.
        console.error("concept report org unresolved", result);
        return NextResponse.json({ error: "internal error" }, { status: 500 });
      case "invalid_category":
        return NextResponse.json({ error: "Invalid category" }, { status: 422 });
      case "invalid_details":
        return NextResponse.json(
          { error: "Details too long" },
          { status: 422 }
        );
      case "error":
      default:
        console.error("concept reports route helper error", result);
        return NextResponse.json({ error: "internal error" }, { status: 500 });
    }
  } catch (err) {
    console.error("concept reports route error", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
