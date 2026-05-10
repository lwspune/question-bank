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
  subjectName: string;
  chapterName: string;
  subtopicName: string | null;
};

export type UploadDetailResult =
  | {
      kind: "ok";
      job: UploadDetailJob;
      questions: UploadDetailQuestion[];
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
      id, text, context, difficulty, visibility, source_row,
      subjects(name),
      chapters(name),
      subtopics(name)
    `
    )
    .eq("upload_job_id", jobId)
    .order("source_row", { ascending: true, nullsFirst: false })
    .returns<RawQuestion[]>();

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
    questions: (questions ?? []).map((q) => ({
      id: q.id,
      text: q.text,
      context: q.context,
      difficulty: q.difficulty,
      visibility: q.visibility,
      sourceRow: q.source_row,
      subjectName: q.subjects?.name ?? "",
      chapterName: q.chapters?.name ?? "",
      subtopicName: q.subtopics?.name ?? null,
    })),
  };
}
