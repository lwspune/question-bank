"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { NotesProgressRow, ProgressWrite } from "@/lib/notes/progress";

/**
 * Client data helpers for the notes track layer. READS go through the browser
 * Supabase client (own-row RLS auto-scopes to the user) so notes pages stay
 * ISR-static; WRITES go through the validated /api/notes/progress route.
 */

type ProgressWritePatch = Omit<ProgressWrite, "subtopicSlug" | "chapterSlug" | "subjectRoute"> & {
  subtopicSlug: string;
  chapterSlug: string;
  subjectRoute: string;
};

export async function postProgress(body: ProgressWritePatch): Promise<void> {
  const res = await fetch("/api/notes/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const j = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(j.error ?? `Save failed (${res.status})`);
  }
}

export type OwnProgress = {
  bookmarked: boolean;
  masteredAt: string | null;
  checkpointScore: number | null;
  checkpointTotal: number | null;
};

/** The signed-in user's row for one subtopic (null if none / anon). */
export async function fetchOwnProgressRow(subtopicSlug: string): Promise<OwnProgress | null> {
  const supabase = createSupabaseBrowserClient();
  const { data } = await supabase
    .from("notes_progress")
    .select("bookmarked, mastered_at, checkpoint_score, checkpoint_total")
    .eq("subtopic_slug", subtopicSlug)
    .maybeSingle();
  if (!data) return null;
  return {
    bookmarked: Boolean(data.bookmarked),
    masteredAt: (data.mastered_at as string | null) ?? null,
    checkpointScore: (data.checkpoint_score as number | null) ?? null,
    checkpointTotal: (data.checkpoint_total as number | null) ?? null,
  };
}

/** All of the signed-in user's progress rows (for the "Your notes" strip). */
export async function fetchAllOwnProgress(): Promise<NotesProgressRow[]> {
  const supabase = createSupabaseBrowserClient();
  const { data } = await supabase
    .from("notes_progress")
    .select(
      "subtopic_slug, chapter_slug, subject_route, bookmarked, mastered_at, checkpoint_score, checkpoint_total, checkpoint_at, last_viewed_at"
    );
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
