/**
 * The reads behind chapter_overview's "start from your mistakes" (2026-11-21):
 * the student's waiting mistakes in one chapter, and the latest one as a worked
 * example. Rules: lib/chat/chapterOverview.ts.
 *
 * THE MISTAKES ARE THE FIX LIST'S. loadOwnPool is the read the drill and the
 * header badge share, so the count V gives is the count /me's "Your weak spots"
 * shows and its Fix button serves, never a second notion of a mistake.
 *
 * Read with the student's own login (user_activity is own-row under RLS); the
 * example question with the anon client, so V only ever sees a PUBLIC one.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { loadOwnPool } from "@/lib/drill/compose";
import { chapterMissesOf, toMissExample, type ChapterOverviewDeps } from "./chapterOverview";
import { loadVQuestion } from "./questionToolsServer";

export function buildChapterMissDeps(
  db: SupabaseClient,
  anon: SupabaseClient,
  userId: string,
  intl: boolean
): Pick<ChapterOverviewDeps, "loadMisses" | "loadMissExample"> {
  return {
    loadMisses: async (hit) => {
      const { drillable } = await loadOwnPool(db, userId, new Date(), intl);
      return chapterMissesOf(drillable, hit);
    },
    loadMissExample: async (questionId) => {
      const [q, pick] = await Promise.all([loadVQuestion(anon, questionId), latestPick(db, userId, questionId)]);
      return toMissExample(q, pick);
    },
  };
}

/** The option picked at the latest miss; null for a mock (it records none) or a failed read. */
async function latestPick(db: SupabaseClient, userId: string, questionId: string): Promise<string | null> {
  const { data, error } = await db
    .from("user_activity")
    .select("metadata")
    .eq("user_id", userId)
    .eq("kind", "answer_wrong")
    .eq("ref_id", questionId)
    .order("created_at", { ascending: false })
    .limit(1);
  if (error) {
    console.error("V: chapter_overview pick unavailable", questionId, error.message);
    return null;
  }
  const chose = (data?.[0]?.metadata as { chose?: unknown } | null)?.chose;
  return typeof chose === "string" ? chose : null;
}
