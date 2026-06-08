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
