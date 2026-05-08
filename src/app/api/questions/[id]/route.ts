import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin, HttpError } from "@/lib/auth";
import { validateEditPayload } from "@/lib/questions/edit";
import { applyEdit } from "@/lib/questions/applyEdit";

export const maxDuration = 60;

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const member = await requireAdmin();
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
      validation.contentHash
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
      case "invalid_image_path":
        return NextResponse.json(
          {
            error: `Image path "${result.path}" doesn't belong to your organization.`,
          },
          { status: 400 }
        );
      case "invalid_taxonomy":
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
