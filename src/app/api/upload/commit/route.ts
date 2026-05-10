import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin, HttpError } from "@/lib/auth";
import { commitStaged } from "@/lib/upload/commit";
import type { ParsedRowPayload } from "@/lib/upload/validate";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const member = await requireAdmin();
    const body = (await request.json()) as { jobId?: string };
    const { jobId } = body;

    if (typeof jobId !== "string" || !jobId) {
      return NextResponse.json(
        { error: "jobId is required" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServerClient();

    const { data: job, error: jobErr } = await supabase
      .from("upload_jobs")
      .select("id, org_id, filename, staged_rows, status")
      .eq("id", jobId)
      .single();
    if (jobErr || !job) {
      return NextResponse.json({ error: "job not found" }, { status: 404 });
    }
    if (job.org_id !== member.orgId) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
    if (job.status !== "PENDING") {
      return NextResponse.json(
        { error: `job already ${job.status}` },
        { status: 409 }
      );
    }

    const staged = job.staged_rows as
      | { examId: string; rows: ParsedRowPayload[] }
      | null;
    if (!staged?.examId || !Array.isArray(staged.rows)) {
      return NextResponse.json(
        { error: "staged_rows malformed" },
        { status: 500 }
      );
    }

    await supabase
      .from("upload_jobs")
      .update({ status: "PROCESSING" })
      .eq("id", jobId);

    try {
      const result = await commitStaged(supabase, {
        orgId: member.orgId,
        examId: staged.examId,
        filename: job.filename,
        createdBy: member.user.id,
        rows: staged.rows,
        uploadJobId: job.id,
      });

      await supabase
        .from("upload_jobs")
        .update({
          status: "COMPLETED",
          inserted: result.inserted,
          skipped: result.skipped,
          finished_at: new Date().toISOString(),
          errors_json: result.errors.length > 0 ? result.errors : null,
        })
        .eq("id", jobId);

      return NextResponse.json({
        inserted: result.inserted,
        skipped: result.skipped,
        failed: result.failed,
        errors: result.errors,
      });
    } catch (err) {
      await supabase
        .from("upload_jobs")
        .update({
          status: "FAILED",
          finished_at: new Date().toISOString(),
          errors_json: {
            fatal: err instanceof Error ? err.message : String(err),
          },
        })
        .eq("id", jobId);
      throw err;
    }
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("commit route error", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
