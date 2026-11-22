/**
 * GET /api/learn/lesson?chapter=<lesson chapter>&concept=<lesson> — one Learn lesson as its
 * page draws it (slides, questions without keys, the chapter's pool and the courses it sits
 * in), for the lesson played full screen in V (2026-11-22, owner: "let Learn run as it is, full
 * screen, in V"). The same for everyone, so it is cached like the page; each viewer's progress
 * loads after, from /api/learn/progress, exactly as on the page.
 *
 * Reply: { ok: true, data: { chapter, code, slug, title, slides, items, pool, homes } } | { ok: false, error }.
 */
import { NextResponse, type NextRequest } from "next/server";
import { loadLessonProps } from "@/lib/learn/lessonProps";

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const CACHED = { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400" } as const;
const NO_STORE = { "Cache-Control": "no-store" } as const;

const fail = (status: number, error: string) => NextResponse.json({ ok: false, error }, { status, headers: NO_STORE });

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const chapter = params.get("chapter") ?? "";
  const concept = params.get("concept") ?? "";
  if (!SLUG.test(chapter) || !SLUG.test(concept)) return fail(400, "Invalid lesson.");

  try {
    const data = await loadLessonProps(chapter, concept);
    if (!data) return fail(404, "No such lesson.");
    const { lesson, pool, homes } = data;
    return NextResponse.json(
      {
        ok: true,
        data: {
          chapter,
          code: lesson.concept.code,
          slug: lesson.concept.slug,
          title: lesson.concept.title,
          slides: lesson.slides,
          items: lesson.items,
          pool,
          homes,
        },
      },
      { headers: CACHED }
    );
  } catch (err) {
    console.error("learn lesson: read failed", chapter, concept, err);
    return fail(500, "Could not load this lesson.");
  }
}
