import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin, HttpError } from "@/lib/auth";
import { parseXlsx } from "@/lib/upload/parser";
import { validateRow } from "@/lib/upload/validate";
import { detectCourse } from "@/lib/upload/detectCourse";
import { resolveExam } from "@/lib/upload/resolveExam";

export const maxDuration = 60;

const MAX_ROWS = 1500;
const MIN_YEAR = 1980;
const MAX_YEAR = new Date().getFullYear() + 1;
const MAX_MONTH_LEN = 20;
const MAX_NOTE_LEN = 200;

export async function POST(request: NextRequest) {
  try {
    const member = await requireAdmin();
    const formData = await request.formData();
    const file = formData.get("file");
    const examIdRaw = formData.get("examId");
    const formExamId =
      typeof examIdRaw === "string" && examIdRaw.length > 0 ? examIdRaw : null;

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "file is required" },
        { status: 400 }
      );
    }

    const pyqYearRaw = formData.get("pyqYear");
    const pyqMonthRaw = formData.get("pyqMonth");
    const pyqNoteRaw = formData.get("pyqNote");

    let pyqYear: number | null = null;
    if (typeof pyqYearRaw === "string" && pyqYearRaw.trim() !== "") {
      const n = Number(pyqYearRaw);
      if (
        !Number.isInteger(n) ||
        n < MIN_YEAR ||
        n > MAX_YEAR
      ) {
        return NextResponse.json(
          {
            error: `pyqYear must be an integer between ${MIN_YEAR} and ${MAX_YEAR}.`,
          },
          { status: 400 }
        );
      }
      pyqYear = n;
    }

    let pyqMonth: string | null = null;
    if (typeof pyqMonthRaw === "string") {
      const trimmed = pyqMonthRaw.trim();
      if (trimmed.length > MAX_MONTH_LEN) {
        return NextResponse.json(
          { error: `pyqMonth max ${MAX_MONTH_LEN} chars.` },
          { status: 400 }
        );
      }
      pyqMonth = trimmed === "" ? null : trimmed;
    }

    let pyqNote: string | null = null;
    if (typeof pyqNoteRaw === "string") {
      const trimmed = pyqNoteRaw.trim();
      if (trimmed.length > MAX_NOTE_LEN) {
        return NextResponse.json(
          { error: `pyqNote max ${MAX_NOTE_LEN} chars.` },
          { status: 400 }
        );
      }
      pyqNote = trimmed === "" ? null : trimmed;
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

    const supabase = createSupabaseServerClient();
    const { data: knownExamRows, error: examsErr } = await supabase
      .from("exams")
      .select("id, name")
      .order("name");
    if (examsErr || !knownExamRows) {
      return NextResponse.json(
        { error: `failed to load exams: ${examsErr?.message ?? "unknown"}` },
        { status: 500 }
      );
    }

    const detection = detectCourse(parsed.rows);
    const resolved = resolveExam(detection, formExamId, knownExamRows);
    if (!resolved.ok) {
      return NextResponse.json({ error: resolved.error }, { status: 400 });
    }
    const examId = resolved.examId;

    const validated = parsed.rows.map(validateRow);
    const validRows = validated
      .filter((v) => v.errors.length === 0)
      .map((v) => v.parsed!);
    const errors = validated
      .filter((v) => v.errors.length > 0)
      .map((v) => ({ sourceRow: v.sourceRow, messages: v.errors }));

    const { data: job, error: jobErr } = await supabase
      .from("upload_jobs")
      .insert({
        org_id: member.orgId,
        filename: file.name,
        status: "PENDING",
        total_rows: parsed.rows.length,
        created_by: member.user.id,
        staged_rows: {
          examId,
          rows: validRows,
          pyqYear,
          pyqMonth,
          pyqNote,
        },
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
      detectedExam: {
        id: resolved.examId,
        name: resolved.examName,
        source: resolved.source,
      },
    });
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("preview route error", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
