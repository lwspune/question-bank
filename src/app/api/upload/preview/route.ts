import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin, HttpError } from "@/lib/auth";
import { parseXlsx } from "@/lib/upload/parser";
import { validateRow } from "@/lib/upload/validate";

export const maxDuration = 60;

const MAX_ROWS = 1500;

export async function POST(request: NextRequest) {
  try {
    const member = await requireAdmin();
    const formData = await request.formData();
    const file = formData.get("file");
    const examId = formData.get("examId");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "file is required" },
        { status: 400 }
      );
    }
    if (typeof examId !== "string" || !examId) {
      return NextResponse.json(
        { error: "examId is required" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    let parsed;
    try {
      parsed = parseXlsx(buffer);
    } catch (err) {
      return NextResponse.json(
        { error: err instanceof Error ? err.message : "parse failed" },
        { status: 400 }
      );
    }

    if (parsed.rows.length > MAX_ROWS) {
      return NextResponse.json(
        {
          error: `Too many rows (${parsed.rows.length}). Max ${MAX_ROWS} per upload — split the file and try again.`,
        },
        { status: 400 }
      );
    }

    const validated = parsed.rows.map(validateRow);
    const validRows = validated
      .filter((v) => v.errors.length === 0)
      .map((v) => v.parsed!);
    const errors = validated
      .filter((v) => v.errors.length > 0)
      .map((v) => ({ sourceRow: v.sourceRow, messages: v.errors }));

    const supabase = createSupabaseServerClient();
    const { data: job, error: jobErr } = await supabase
      .from("upload_jobs")
      .insert({
        org_id: member.orgId,
        filename: file.name,
        status: "PENDING",
        total_rows: parsed.rows.length,
        created_by: member.user.id,
        staged_rows: { examId, rows: validRows },
        errors_json: errors,
      })
      .select("id")
      .single();
    if (jobErr || !job) {
      return NextResponse.json(
        { error: `failed to stage upload: ${jobErr?.message ?? "unknown"}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      jobId: job.id,
      filename: file.name,
      totalRows: parsed.rows.length,
      validCount: validRows.length,
      errorCount: errors.length,
      errors,
    });
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("preview route error", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
