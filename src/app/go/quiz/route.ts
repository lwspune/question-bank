import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { listRotationQuizzes } from "@/lib/quiz/publicQuiz";
import { dailyQuizPath, parseDailyQuizSource, pickTodaysQuiz } from "@/lib/quiz/today";

export const dynamic = "force-dynamic";

/**
 * GET /go/quiz?src=<story|dm|bio|highlight|telegram>
 *
 * The one link that always opens today's quiz: it sits in the @lws.pune
 * Instagram bio and behind the Daily Quiz highlight's link sticker, so it never
 * has to be edited. Redirects to /quiz/<slug> tagged with where the click came
 * from. Degrades to the home page when nothing is public or the read fails, so
 * a link in a bio never dead-ends.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const src = parseDailyQuizSource(url.searchParams.get("src"));
  try {
    const quiz = pickTodaysQuiz(await listRotationQuizzes(createSupabaseAdminClient()), new Date());
    const path = quiz ? dailyQuizPath(quiz.publicSlug, src) : "/";
    return NextResponse.redirect(new URL(path, url.origin));
  } catch (err) {
    console.error("[go/quiz] could not pick today's quiz:", err);
    return NextResponse.redirect(new URL("/", url.origin));
  }
}
