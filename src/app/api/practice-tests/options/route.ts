/**
 * GET /api/practice-tests/options — the choices for each step of V's
 * practice-test builder:
 *   (none)               the exams       { ok, exams: [{ slug, name }] }
 *   ?exam=               its subjects    { ok, subjects: [{ key, label }] }
 *   ?exam=&subject=      its chapters    { ok, chapters: [{ id, name, available, recentPyq }], mostAsked: [id] }
 *
 * The same for every visitor (nothing here reads a session), so the CDN keeps
 * each answer for an hour; the chapter pool behind it is cached for a day
 * (lib/practiceTests/poolQuery.ts). Signed-out visitors may walk the steps;
 * only building a test needs an account.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getPracticeExam, getPracticeSubject, PRACTICE_EXAMS } from "@/lib/practiceTests/config";
import { getSubjectPool } from "@/lib/practiceTests/poolQuery";
import { mostAskedChapters } from "@/lib/practiceTests/pick";

export const maxDuration = 20;

const SHARED = { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" };

function refuse(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const examSlug = params.get("exam");
  const subjectKey = params.get("subject");

  if (!examSlug) {
    return NextResponse.json(
      { ok: true, exams: PRACTICE_EXAMS.map((e) => ({ slug: e.slug, name: e.shortName })) },
      { headers: SHARED }
    );
  }
  const exam = getPracticeExam(examSlug);
  if (!exam) return refuse(404, "V can't build a practice test for that exam yet.");

  if (!subjectKey) {
    return NextResponse.json(
      { ok: true, subjects: exam.subjects.map((s) => ({ key: s.key, label: s.label })) },
      { headers: SHARED }
    );
  }
  const subject = getPracticeSubject(exam, subjectKey);
  if (!subject) return refuse(404, "That exam has no such subject.");

  try {
    const found = await getSubjectPool(exam, subject);
    if (!found) return refuse(404, "That subject has no questions yet.");
    const chapters = found.pool.chapters.map(({ id, name, available, recentPyq }) => ({
      id,
      name,
      available,
      recentPyq,
    }));
    return NextResponse.json(
      { ok: true, chapters, mostAsked: mostAskedChapters(chapters) },
      { headers: SHARED }
    );
  } catch (err) {
    console.error("practice-tests/options pool read failed", err);
    return refuse(500, "V couldn't load the chapters. Please try again.");
  }
}
