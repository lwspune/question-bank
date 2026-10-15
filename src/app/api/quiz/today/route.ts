import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { listRotationQuizzes } from "@/lib/quiz/publicQuiz";
import { dailyQuizLinks, dailyQuizUrl, parseDailyQuizSource, parseIstDate, pickTodaysQuiz } from "@/lib/quiz/today";

export const dynamic = "force-dynamic";

/**
 * GET /api/quiz/today?src=<story|dm|bio|highlight|telegram>&date=<YYYY-MM-DD>
 *
 * Today's quiz for the LWS publisher (the Story card, the story-reply DM and the
 * Telegram post), from the same picker /go/quiz redirects with. `date` asks for
 * another IST day's pick, so a week of Stories can be planned ahead. Public data
 * only: a public quiz's slug and title are already in the sitemap. `url` is the
 * canonical quiz link tagged for `src`; `links` has one per place.
 */
export async function GET(request: NextRequest) {
  const params = new URL(request.url).searchParams;
  const src = parseDailyQuizSource(params.get("src"));
  const rawDate = params.get("date");
  const day = rawDate === null ? new Date() : parseIstDate(rawDate);
  if (!day) {
    return NextResponse.json(
      { ok: false, error: { code: "invalid_date", message: "date must be a calendar date as YYYY-MM-DD." } },
      { status: 400 }
    );
  }
  try {
    const quiz = pickTodaysQuiz(await listRotationQuizzes(createSupabaseAdminClient()), day);
    if (!quiz) {
      return NextResponse.json(
        { ok: false, error: { code: "no_public_quiz", message: "No quiz is public yet." } },
        { status: 404 }
      );
    }
    return NextResponse.json({
      ok: true,
      data: { ...quiz, url: dailyQuizUrl(quiz.publicSlug, src), links: dailyQuizLinks(quiz.publicSlug) },
    });
  } catch (err) {
    console.error("[api/quiz/today] could not pick today's quiz:", err);
    return NextResponse.json(
      { ok: false, error: { code: "read_failed", message: "Could not read today's quiz." } },
      { status: 500 }
    );
  }
}
