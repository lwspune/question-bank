/**
 * The reads behind chapter_overview's "start from your mistakes" (2026-11-21):
 * the student's waiting mistakes in one chapter, and the latest one in the part
 * as the "Your turn" card (2026-11-23; it was V's worked example, shown to the
 * student without its question). Rules: lib/chat/chapterOverview.ts.
 *
 * THE MISTAKES ARE THE FIX LIST'S. loadOwnPool is the read the drill and the
 * header badge share, so the count V gives is the count /me's "Your weak spots"
 * shows and its Fix button serves, never a second notion of a mistake.
 *
 * Read with the student's own login (user_activity is own-row under RLS); the
 * example question with the anon client, so V only ever sees a PUBLIC one.
 *
 * THE QUESTION TO TRY: their own latest mistake in the part when the card can
 * show it (an MCQ with a key, PUBLIC). Else (2026-11-21, mockup "Teach, then one
 * question") one from that mistake's topic, else the part's, the easiest first;
 * never a question the student already opened today, and never one of their
 * waiting mistakes.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { loadOwnPool } from "@/lib/drill/compose";
import { chapterMissesOf, type ChapterOverviewDeps } from "./chapterOverview";
import { canTryOnCard } from "./questionCard";
import { loadLessonTryId, loadSubtopicId, loadVQuestion } from "./questionToolsServer";
import { revealedToday } from "./questionReveal";

/** Of their mistakes in a part, how many are read to find one the card can show. */
const OWN_TRY_MAX = 5;

export function buildChapterMissDeps(
  db: SupabaseClient,
  anon: SupabaseClient,
  userId: string,
  intl: boolean
): Pick<ChapterOverviewDeps, "loadMisses" | "loadOwnTry" | "loadTryId"> {
  // A notes lesson asks for one question per part at once (2026-11-27): read "opened today" once.
  let openedToday: Promise<string[]> | null = null;
  return {
    loadMisses: async (hit) => {
      const { drillable } = await loadOwnPool(db, userId, new Date(), intl);
      return chapterMissesOf(drillable, hit);
    },
    loadOwnTry: async (questionIds) => {
      // Newest first; a few at once, so a part of written questions costs one round, not many.
      const ids = questionIds.slice(0, OWN_TRY_MAX);
      const qs = await Promise.all(ids.map((id) => loadVQuestion(anon, id)));
      return ids.find((_, i) => canTryOnCard(qs[i])) ?? null;
    },
    loadTryId: async ({ chapterId, subtopic, near, exclude }) => {
      openedToday ??= revealedToday(db, userId, new Date());
      const skip = [...exclude, ...(await openedToday)];
      // Their latest mistake's own topic when there is one, else the part's topic by name.
      const near_ = near ? await loadVQuestion(anon, near) : null;
      const subtopicId = near_?.subtopicId ?? (chapterId && subtopic ? await loadSubtopicId(anon, chapterId, subtopic) : null);
      return subtopicId ? loadLessonTryId(anon, subtopicId, skip) : null;
    },
  };
}
