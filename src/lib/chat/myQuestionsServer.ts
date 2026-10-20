/**
 * The data sources behind V's recent_questions and save_question
 * (lib/chat/myQuestions.ts). The student's activity is read, and the save
 * written, with their own login (user_activity and question_bookmarks are
 * own-row under RLS); the questions themselves with the anon client, so V
 * only ever names PUBLIC ones.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { queryQuestionsByIds } from "@/lib/questions/query";
import { setBookmark } from "@/lib/bookmarks/service";
import { SaveLimitReached } from "@/lib/bookmarks/limit";
import { logActivity } from "@/lib/activity/service";
import {
  RECENT_HOURS,
  recentQuestionList,
  type MyQuestionDeps,
  type RecentActivity,
  type RecentQuestion,
} from "./myQuestions";

const SNIPPET_CHARS = 90;
const KINDS: RecentActivity["kind"][] = ["question_practiced", "answer_wrong", "question_bookmarked"];

function snippetOf(text: string): string {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > SNIPPET_CHARS ? `${flat.slice(0, SNIPPET_CHARS)}...` : flat;
}

export async function loadRecentQuestions(
  own: SupabaseClient,
  anon: SupabaseClient,
  userId: string,
  now: Date
): Promise<RecentQuestion[]> {
  const since = new Date(now.getTime() - RECENT_HOURS * 3600_000).toISOString();
  const { data, error } = await own
    .from("user_activity")
    .select("ref_id, kind, metadata, created_at")
    .eq("user_id", userId)
    .eq("ref_kind", "question")
    .in("kind", KINDS)
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) {
    console.error("V: recent questions read failed", error.message);
    return [];
  }
  const acts: RecentActivity[] = ((data ?? []) as { ref_id: string | null; kind: RecentActivity["kind"]; metadata: unknown; created_at: string }[])
    .filter((r) => r.ref_id)
    .map((r) => {
      const correct = (r.metadata as { correct?: unknown } | null)?.correct;
      return { questionId: r.ref_id!, kind: r.kind, at: r.created_at, ...(typeof correct === "boolean" ? { correct } : {}) };
    });
  const list = recentQuestionList(acts);
  if (list.length === 0) return [];
  const rows = await queryQuestionsByIds(anon, list.map((q) => q.id));
  const byId = new Map(rows.map((r) => [r.id, r]));
  return list.flatMap((q) => {
    const r = byId.get(q.id);
    return r ? [{ ...q, snippet: snippetOf(r.text), where: [r.exam?.name, r.chapter?.name].filter(Boolean).join(", ") }] : [];
  });
}

export function buildMyQuestionDeps(own: SupabaseClient, anon: SupabaseClient, userId: string): Omit<MyQuestionDeps, "signedIn"> {
  return {
    now: () => new Date(),
    loadRecent: () => loadRecentQuestions(own, anon, userId, new Date()),
    save: async (questionId) => {
      // Only a question the public can see: never a bookmark V could not name.
      const [row] = await queryQuestionsByIds(anon, [questionId]);
      if (!row) return { kind: "missing" };
      try {
        await setBookmark(own, userId, questionId, true);
      } catch (err) {
        if (err instanceof SaveLimitReached) return { kind: "limit", message: err.message };
        throw err;
      }
      await logActivity(own, userId, { kind: "question_bookmarked", refId: questionId, refKind: "question" });
      return { kind: "saved" };
    },
  };
}
