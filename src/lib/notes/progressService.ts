/**
 * Server-only write for the notes_progress track layer (migration 0046).
 * Upserts a student's OWN row through the RLS-bound client (their JWT) — own-row
 * INSERT/UPDATE policies enforce ownership; the explicit user_id is what the
 * WITH CHECK validates. Column mapping is the pure mergeProgressPatch.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { mergeProgressPatch, type ProgressWrite } from "./progress";

export async function saveOwnProgress(
  db: SupabaseClient,
  userId: string,
  write: ProgressWrite,
  nowMs: number = Date.now()
): Promise<void> {
  const nowIso = new Date(nowMs).toISOString();
  const row = {
    user_id: userId,
    subtopic_slug: write.subtopicSlug,
    chapter_slug: write.chapterSlug,
    subject_route: write.subjectRoute,
    ...mergeProgressPatch(write, nowIso),
  };
  const { error } = await db
    .from("notes_progress")
    .upsert(row, { onConflict: "user_id,subtopic_slug" });
  if (error) throw new Error(`saveOwnProgress: ${error.message}`);
}
