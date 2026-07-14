import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireSuperadmin, getSessionMember, HttpError } from "@/lib/auth";
import { validateEditPayload } from "@/lib/questions/edit";
import { applyEdit } from "@/lib/questions/applyEdit";
import { deleteQuestion } from "@/lib/questions/deleteQuestion";

export const maxDuration = 60;

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Content editing is superadmin-only (migration 0056). The superadmin uses
    // their org membership for the org-scoped edit; cross-org edits go through
    // the superadmin console.
    await requireSuperadmin();
    const member = await getSessionMember();
    if (!member) {
      return NextResponse.json(
        { error: "Cross-org content editing is available in the superadmin console." },
        { status: 400 }
      );
    }
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const validation = validateEditPayload(body);
    if (!validation.ok) {
      return NextResponse.json(
        { error: "Invalid payload", fieldErrors: validation.errors },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServerClient();
    const result = await applyEdit(
      supabase,
      params.id,
      member.orgId,
      validation.payload,
      validation.contentHash,
      member.user.id,
      member.role
    );

    switch (result.kind) {
      case "ok":
        return NextResponse.json({
          ok: true,
          orphanedImagePaths: result.orphanedImagePaths,
        });
      case "not_found":
        return NextResponse.json(
          { error: "Question not found" },
          { status: 404 }
        );
      case "forbidden":
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      case "forbidden_field":
        return NextResponse.json(
          { error: result.reason, field: result.field },
          { status: 403 }
        );
      case "invalid_image_path":
        return NextResponse.json(
          {
            error: `Image path "${result.path}" doesn't belong to your organization.`,
          },
          { status: 400 }
        );
      case "invalid_taxonomy":
        return NextResponse.json({ error: result.reason }, { status: 400 });
      case "invalid_concept_tag":
        return NextResponse.json({ error: result.reason }, { status: 400 });
      case "duplicate":
        return NextResponse.json(
          {
            error:
              "A question with the same text and options already exists in this bank.",
          },
          { status: 409 }
        );
      case "error":
        console.error("applyEdit error:", result.message);
        return NextResponse.json({ error: "internal error" }, { status: 500 });
    }
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("edit route error", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireSuperadmin();
    const member = await getSessionMember();
    if (!member) {
      return NextResponse.json(
        { error: "Cross-org deletion is available in the superadmin console." },
        { status: 400 }
      );
    }
    const supabase = createSupabaseServerClient();
    const result = await deleteQuestion(supabase, params.id, member.orgId);

    switch (result.kind) {
      case "ok":
        return NextResponse.json({
          ok: true,
          removedImagePaths: result.removedImagePaths,
        });
      case "not_found":
        return NextResponse.json(
          { error: "Question not found" },
          { status: 404 }
        );
      case "forbidden":
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      case "error":
        console.error("deleteQuestion error:", result.message);
        return NextResponse.json({ error: "internal error" }, { status: 500 });
    }
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("delete question route error", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
