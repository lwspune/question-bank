import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin, HttpError } from "@/lib/auth";
import { deleteUploadJob } from "@/lib/upload/deleteUploadJob";

export const maxDuration = 60;

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const member = await requireAdmin();
    const supabase = createSupabaseServerClient();
    const result = await deleteUploadJob(supabase, params.id, member.orgId);

    switch (result.kind) {
      case "ok":
        return NextResponse.json({
          ok: true,
          deletedQuestionCount: result.deletedQuestionCount,
          removedImagePaths: result.removedImagePaths,
        });
      case "not_found":
        return NextResponse.json({ error: "Upload not found" }, { status: 404 });
      case "forbidden":
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      case "error":
        console.error("deleteUploadJob error:", result.message);
        return NextResponse.json({ error: "internal error" }, { status: 500 });
    }
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("delete upload route error", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
