import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { listRotationQuizzes } from "@/lib/quiz/publicQuiz";
import { dailyQuizUrl, parseDailyQuizSource, pickTodaysQuiz } from "@/lib/quiz/today";

export const dynamic = "force-dynamic";

/**
 * GET /api/quiz/today?src=<story|dm|bio|highlight|telegram>
 *
 * Today's quiz for the LWS publisher (the Story card, the story-reply DM and the
 * Telegram post), from the same picker /go/quiz redirects with. Public data
 * only: a public quiz's slug and title are already in the sitemap. `url` is the
 * canonical quiz link tagged for `src`.
 */
export async function GET(request: NextRequest) {
  const src = parseDailyQuizSource(new URL(request.url).searchParams.get("src"));
  try {
    const quiz = pickTodaysQuiz(await listRotationQuizzes(createSupabaseAdminClient()), new Date());
    if (!quiz) {
      return NextResponse.json(
        { ok: false, error: { code: "no_public_quiz", message: "No quiz is public yet." } },
        { status: 404 }
      );
    }
    return NextResponse.json({
      ok: true,
      data: { ...quiz, url: dailyQuizUrl(quiz.publicSlug, src) },
    });
  } catch (err) {
    console.error("[api/quiz/today] could not pick today's quiz:", err);
    return NextResponse.json(
      { ok: false, error: { code: "read_failed", message: "Could not read today's quiz." } },
      { status: 500 }
    );
  }
}
