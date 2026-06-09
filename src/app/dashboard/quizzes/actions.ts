"use server";

// Assembly lives in the CLI (`npm run quiz:assemble`) — the dashboard is a
// read-only view. The only write action here is publish-to-public.
import { revalidatePath } from "next/cache";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

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
