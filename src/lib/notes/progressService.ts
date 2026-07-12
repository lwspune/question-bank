/**
 * Server-only write for the notes_progress track layer (migration 0046).
 * Upserts a student's OWN row through the RLS-bound client (their JWT) — own-row
 * INSERT/UPDATE policies enforce ownership; the explicit user_id is what the
 * WITH CHECK validates. Column mapping is the pure mergeProgressPatch.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { mergeProgressPatch, type NotesProgressRow, type ProgressWrite } from "./progress";

/**
 * Server-side read of a student's OWN notes_progress rows (RLS own-row via their
 * JWT). Mirrors the client `fetchAllOwnProgress` select so a server-rendered
 * surface (the /me dashboard) can feed `summarizeNotesProgress` without mounting
 * the client island. The `.eq("user_id")` is belt-and-suspenders on top of RLS.
 */
export async function listOwnNotesProgress(
  db: SupabaseClient,
  userId: string
): Promise<NotesProgressRow[]> {
  const { data, error } = await db
    .from("notes_progress")
    .select(
      "subtopic_slug, chapter_slug, subject_route, bookmarked, mastered_at, checkpoint_score, checkpoint_total, checkpoint_at, last_viewed_at"
    )
    .eq("user_id", userId);
  if (error) throw new Error(`listOwnNotesProgress: ${error.message}`);
  return ((data ?? []) as Record<string, unknown>[]).map((r) => ({
    subtopicSlug: r.subtopic_slug as string,
    chapterSlug: r.chapter_slug as string,
    subjectRoute: r.subject_route as string,
    bookmarked: Boolean(r.bookmarked),
    masteredAt: (r.mastered_at as string | null) ?? null,
    checkpointScore: (r.checkpoint_score as number | null) ?? null,
    checkpointTotal: (r.checkpoint_total as number | null) ?? null,
    checkpointAt: (r.checkpoint_at as string | null) ?? null,
    lastViewedAt: (r.last_viewed_at as string) ?? "",
  }));
}

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
