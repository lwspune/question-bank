import type { SupabaseClient } from "@supabase/supabase-js";

export type UploadDetailJob = {
  id: string;
  filename: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  inserted: number;
  skipped: number;
  createdAt: string;
};

export type UploadDetailQuestion = {
  id: string;
  text: string;
  context: string | null;
  difficulty: "EASY" | "MODERATE" | "HARD";
  visibility: "PUBLIC" | "PRIVATE";
  sourceRow: number | null;
  questionNumber: string | null;
  subjectName: string;
  chapterName: string;
  subtopicName: string | null;
};

export type PyqAggregate = {
  year: number | "mixed" | null;
  month: string | "mixed" | null;
  note: string | "mixed" | null;
};

export type UploadDetailResult =
  | {
      kind: "ok";
      job: UploadDetailJob;
      questions: UploadDetailQuestion[];
      pyqMetadata: PyqAggregate;
    }
  | { kind: "not_found" }
  | { kind: "forbidden" };

type RawJob = {
  id: string;
  org_id: string;
  filename: string;
  status: UploadDetailJob["status"];
  inserted: number;
  skipped: number;
  created_at: string;
};

type RawQuestion = {
  id: string;
  text: string;
  context: string | null;
  difficulty: UploadDetailQuestion["difficulty"];
  visibility: UploadDetailQuestion["visibility"];
  source_row: number | null;
  question_number: string | null;
  pyq_year: number | null;
  pyq_month: string | null;
  pyq_note: string | null;
  subjects: { name: string } | null;
  chapters: { name: string } | null;
  subtopics: { name: string } | null;
};

export async function getUploadDetail(
  client: SupabaseClient,
  jobId: string,
  callerOrgId: string
): Promise<UploadDetailResult> {
  const { data: job } = await client
    .from("upload_jobs")
    .select("id, org_id, filename, status, inserted, skipped, created_at")
    .eq("id", jobId)
    .maybeSingle<RawJob>();

  if (!job) return { kind: "not_found" };
  if (job.org_id !== callerOrgId) return { kind: "forbidden" };

  const { data: questions } = await client
    .from("questions")
    .select(
      `
      id, text, context, difficulty, visibility, source_row, question_number,
      pyq_year, pyq_month, pyq_note,
      subjects(name),
      chapters(name),
      subtopics(name)
    `
    )
    .eq("upload_job_id", jobId)
    .order("source_row", { ascending: true, nullsFirst: false })
    .returns<RawQuestion[]>();

  const rows = questions ?? [];
  return {
    kind: "ok",
    job: {
      id: job.id,
      filename: job.filename,
      status: job.status,
      inserted: job.inserted,
      skipped: job.skipped,
      createdAt: job.created_at,
    },
    questions: rows.map((q) => ({
      id: q.id,
      text: q.text,
      context: q.context,
      difficulty: q.difficulty,
      visibility: q.visibility,
      sourceRow: q.source_row,
      questionNumber: q.question_number,
      subjectName: q.subjects?.name ?? "",
      chapterName: q.chapters?.name ?? "",
      subtopicName: q.subtopics?.name ?? null,
    })),
    pyqMetadata: {
      year: aggregate(rows.map((q) => q.pyq_year)),
      month: aggregate(rows.map((q) => q.pyq_month)),
      note: aggregate(rows.map((q) => q.pyq_note)),
    },
  };
}

// Empty list → null. All values equal (including all null) → that value.
// Otherwise → "mixed".
function aggregate<T extends number | string | null>(
  values: T[]
): T | "mixed" {
  if (values.length === 0) return null as T;
  const first = values[0];
  for (const v of values) {
    if (v !== first) return "mixed";
  }
  return first;
}
