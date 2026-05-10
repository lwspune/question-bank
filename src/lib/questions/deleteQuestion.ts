import type { SupabaseClient } from "@supabase/supabase-js";
import { deleteImage } from "@/lib/storage/images";

export type DeleteQuestionResult =
  | { kind: "ok"; removedImagePaths: string[] }
  | { kind: "not_found" }
  | { kind: "forbidden" }
  | { kind: "error"; message: string };

type Existing = {
  id: string;
  org_id: string;
  image_url: string | null;
  options: { image_url: string | null }[];
};

export async function deleteQuestion(
  client: SupabaseClient,
  questionId: string,
  callerOrgId: string
): Promise<DeleteQuestionResult> {
  const { data: existing, error: loadErr } = await client
    .from("questions")
    .select("id, org_id, image_url, options(image_url)")
    .eq("id", questionId)
    .maybeSingle<Existing>();

  if (loadErr) return { kind: "error", message: loadErr.message };
  if (!existing) return { kind: "not_found" };
  if (existing.org_id !== callerOrgId) return { kind: "forbidden" };

  const imagePaths = collectImagePaths(existing);

  const { error: delErr } = await client
    .from("questions")
    .delete()
    .eq("id", questionId);
  if (delErr) return { kind: "error", message: delErr.message };

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

  return { kind: "ok", removedImagePaths: imagePaths };
}

function collectImagePaths(existing: Existing): string[] {
  const paths = new Set<string>();
  if (existing.image_url) paths.add(existing.image_url);
  for (const opt of existing.options) {
    if (opt.image_url) paths.add(opt.image_url);
  }
  return Array.from(paths);
}
