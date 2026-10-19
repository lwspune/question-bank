/**
 * The real data sources behind V's question tools (lib/chat/questionToolSet.ts).
 *
 * Questions are read with the anon client, so V can only ever see PUBLIC
 * questions. The free-answer check and its record go through the student's
 * own login: user_activity is own-row under RLS, and the count is the same
 * one every reveal on the site uses (lib/questions/revealQuota.ts, which
 * counts the "v" surface since 2026-10-19).
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { queryQuestionsByIds } from "@/lib/questions/query";
import { loadRevealedToday } from "@/lib/questions/revealQuota";
import { getPremiumLimits } from "@/lib/billing/premiumLimits";
import { logActivityOnce } from "@/lib/activity/service";
import { istDayKey, istDayStartIso } from "@/lib/email/dueNudge";
import { pickSimilar, revealCheck, toVQuestion, type RevealCheck, type VQuestion } from "./questionTools";
import type { QuestionMatch } from "./questionToolSet";

const SIMILAR_POOL = 40;
const SNIPPET_CHARS = 140;
// Pasted text from a rendered page is full of maths debris ("cot ⁡ x", "d x"):
// search on its longest real words, which the stored stem also carries.
const SEARCH_WORDS = [6, 4] as const;

export async function loadVQuestion(anon: SupabaseClient, id: string): Promise<VQuestion | null> {
  const rows = await queryQuestionsByIds(anon, [id]);
  return rows[0] ? toVQuestion(rows[0]) : null;
}

/** The day's opened questions for this student, or none when it cannot be read. */
export async function revealedToday(db: SupabaseClient, userId: string, now: Date): Promise<string[]> {
  try {
    return await loadRevealedToday(db, userId, istDayStartIso(now));
  } catch (e) {
    console.error("V: revealed-today read failed", e);
    return [];
  }
}

/**
 * Check the free answers and record the explanation as a reveal ("v" surface),
 * once per question per IST day. Limits that cannot be read mean no limit,
 * as GET /api/me/reveals treats them.
 */
export async function spendVReveal(db: SupabaseClient, userId: string, questionId: string, now = new Date()): Promise<RevealCheck> {
  const limits = await getPremiumLimits(db);
  const limit = !limits || limits.hasPass ? null : limits.revealsPerDay;
  const check = revealCheck({ limit, todayIds: limit === null ? [] : await revealedToday(db, userId, now), questionId });
  if (check.kind === "ok") {
    await logActivityOnce(db, userId, {
      kind: "question_practiced",
      refId: questionId,
      refKind: "question",
      metadata: { surface: "v" },
      dedupeKey: `v_explain:${questionId}:${userId}:${istDayKey(now)}`,
    });
  }
  return check;
}

/** A PUBLIC single-answer question from the same subtopic, not this one and not one opened today. */
export async function loadSimilarId(anon: SupabaseClient, q: VQuestion, exclude: readonly string[]): Promise<string | null> {
  if (!q.subtopicId) return null;
  const { data, error } = await anon
    .from("questions")
    .select("id")
    .eq("subtopic_id", q.subtopicId)
    .eq("visibility", "PUBLIC")
    .eq("question_format", "mcq")
    .is("set_id", null)
    .neq("id", q.id)
    .limit(SIMILAR_POOL);
  if (error) {
    console.error("V: similar question read failed", error.message);
    return null;
  }
  return pickSimilar(((data ?? []) as { id: string }[]).map((r) => r.id), new Set(exclude));
}

/** The search words of pasted text: its longest distinct real words, longest first. */
export function searchWordsOf(text: string, n: number): string[] {
  const words = [...new Set((text.toLowerCase().match(/[a-z]{5,}/g) ?? []))];
  return words.sort((a, b) => b.length - a.length).slice(0, n);
}

export async function searchVQuestions(anon: SupabaseClient, text: string): Promise<QuestionMatch[]> {
  for (const n of SEARCH_WORDS) {
    const words = searchWordsOf(text, n);
    if (words.length < 2) return [];
    const { data, error } = await anon
      .from("questions")
      .select("id, text, chapter:chapters(name), exam:exams(name)")
      .eq("visibility", "PUBLIC")
      .textSearch("search_vector", words.join(" "), { type: "plain", config: "english" })
      .limit(3);
    if (error) {
      console.error("V: question search failed", error.message);
      return [];
    }
    const rows = (data ?? []) as unknown as { id: string; text: string; chapter: { name: string } | null; exam: { name: string } | null }[];
    if (rows.length > 0) {
      return rows.map((r) => ({
        id: r.id,
        snippet: r.text.length > SNIPPET_CHARS ? `${r.text.slice(0, SNIPPET_CHARS)}...` : r.text,
        where: [r.exam?.name, r.chapter?.name].filter(Boolean).join(", "),
      }));
    }
  }
  return [];
}
