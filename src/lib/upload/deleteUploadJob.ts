import type { SupabaseClient } from "@supabase/supabase-js";
import { deleteImage } from "@/lib/storage/images";

export type DeleteUploadJobResult =
  | {
      kind: "ok";
      deletedQuestionCount: number;
      removedImagePaths: string[];
    }
  | { kind: "not_found" }
  | { kind: "forbidden" }
  | { kind: "error"; message: string };

type RawQuestion = {
  id: string;
  image_url: string | null;
  options: { image_url: string | null }[];
};

export async function deleteUploadJob(
  client: SupabaseClient,
  jobId: string,
  callerOrgId: string
): Promise<DeleteUploadJobResult> {
  const { data: job, error: jobErr } = await client
    .from("upload_jobs")
    .select("id, org_id")
    .eq("id", jobId)
    .maybeSingle<{ id: string; org_id: string }>();

  if (jobErr) return { kind: "error", message: jobErr.message };
  if (!job) return { kind: "not_found" };
  if (job.org_id !== callerOrgId) return { kind: "forbidden" };

  const { data: questions, error: qLoadErr } = await client
    .from("questions")
    .select("id, image_url, options(image_url)")
    .eq("upload_job_id", jobId)
    .returns<RawQuestion[]>();
  if (qLoadErr) return { kind: "error", message: qLoadErr.message };

  const imagePaths = collectImagePaths(questions ?? []);
  const questionIds = (questions ?? []).map((q) => q.id);

  if (questionIds.length > 0) {
    const { error: qDelErr } = await client
      .from("questions")
      .delete()
      .in("id", questionIds);
    if (qDelErr) return { kind: "error", message: qDelErr.message };
  }

  await Promise.all(
    imagePaths.map(async (path) => {
      try {
        await deleteImage(client, path);
      } catch (err) {
        console.warn(
          `failed to delete image ${path}: ${
            err instanceof Error ? err.message : err
          }`
        );
      }
    })
  );

  const { error: jobDelErr } = await client
    .from("upload_jobs")
    .delete()
    .eq("id", jobId);
  if (jobDelErr) return { kind: "error", message: jobDelErr.message };

  return {
    kind: "ok",
    deletedQuestionCount: questionIds.length,
    removedImagePaths: imagePaths,
  };
}

function collectImagePaths(questions: RawQuestion[]): string[] {
  const paths = new Set<string>();
  for (const q of questions) {
    if (q.image_url) paths.add(q.image_url);
    for (const opt of q.options) {
      if (opt.image_url) paths.add(opt.image_url);
    }
  }
  return Array.from(paths);
}
