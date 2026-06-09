"use server";

import { revalidatePath } from "next/cache";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { assembleNextQuiz, type AssembleResult, type QuizTheme } from "@/lib/quiz/assemble";

const THEMES: QuizTheme[] = ["formula", "property", "computation", "fact", "trap"];

/**
 * Assemble the next daily quiz for a chapter from ready, unused atoms — records
 * it (quizzes + quiz_atoms_map) and pushes to nda-tracker IF the push secrets are
 * configured on the server. Admin-only; the quiz pool is service-role-write, so
 * this uses the admin client behind the role guard (same shape as the comp UI).
 *
 * Push needs NDA_TRACKER_IMPORT_URL + QUIZ_IMPORT_SECRET in the Vercel env; without
 * them the quiz is recorded but not delivered (result.pushed === false).
 */
export async function assembleQuizAction(
  route: string,
  chapter: string,
  themeArg?: string
): Promise<AssembleResult> {
  const member = await getSessionMember();
  if (!member || member.role !== "ADMIN") return { ok: false, error: "Not authorized." };

  const db = createSupabaseAdminClient();
  const url = process.env.NDA_TRACKER_IMPORT_URL;
  const secret = process.env.QUIZ_IMPORT_SECRET;
  const push = url && secret ? { url, secret } : null;
  const theme = THEMES.includes(themeArg as QuizTheme) ? (themeArg as QuizTheme) : undefined;

  const result = await assembleNextQuiz(db, { route, chapter, theme, push });
  if (result.ok) revalidatePath("/dashboard/quizzes");
  return result;
}

export type PublishResult = { ok: true; publicSlug: string } | { ok: false; error: string };

/**
 * Publish a quiz to the PUBLIC lead-magnet funnel: sets quizzes.public_slug to
 * the quiz's (already clean, unique) slug, which is BOTH the public gate and the
 * shareable URL /quiz/<slug>. Pass publish=false to take it back private.
 * Admin-only (quizzes is service-role-write).
 */
export async function setQuizPublicAction(quizId: string, publish: boolean): Promise<PublishResult> {
  const member = await getSessionMember();
  if (!member || member.role !== "ADMIN") return { ok: false, error: "Not authorized." };

  const db = createSupabaseAdminClient();
  const { data: quiz, error: readErr } = await db
    .from("quizzes")
    .select("slug, public_slug")
    .eq("id", quizId)
    .maybeSingle();
  if (readErr || !quiz) return { ok: false, error: "Quiz not found." };

  const publicSlug = publish ? (quiz.public_slug ?? quiz.slug) : null;
  const { error } = await db.from("quizzes").update({ public_slug: publicSlug }).eq("id", quizId);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/dashboard/quizzes");
  if (publicSlug) revalidatePath(`/quiz/${publicSlug}`);
  return { ok: true, publicSlug: publicSlug ?? "" };
}
