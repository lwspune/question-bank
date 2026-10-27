/**
 * GET /api/learn/misses?course=<slug> — "From your mistakes" (migration 0194): the course's
 * chapters in which the signed-in student has questions still wrong anywhere in PYQ Vault (mocks,
 * chapter tests, the board reader, the drill), most first. Read through the student's own JWT;
 * the function answers for auth.uid() only. A guest gets 401.
 * Reply: { ok: true, data: [{ slug, title, misses }] } | { ok: false, error }.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getExamBySlug } from "@/lib/exam/examContext";
import { type BankMiss, missesByCourseChapter } from "@/lib/learn/bankChapters";
import { getOutline } from "@/lib/learn/query";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, private" } as const;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const fail = (status: number, error: string) => NextResponse.json({ ok: false, error }, { status, headers: NO_STORE });

export async function GET(request: NextRequest) {
  const course = request.nextUrl.searchParams.get("course") ?? "";
  const user = await getSessionUser();
  if (!user) return fail(401, "Sign in to see your mistakes.");
  if (!SLUG.test(course)) return fail(400, "Invalid course.");

  const outline = await getOutline(course);
  const exam = outline ? getExamBySlug(outline.exam) : null;
  if (!outline || !exam) return fail(404, "No such course.");

  const { data, error } = await createSupabaseServerClient().rpc("learn_my_misses", { p_exam: exam.examName });
  if (error) {
    console.error("learn misses: read failed", error.message);
    return fail(500, "Couldn't load your mistakes.");
  }
  return NextResponse.json({ ok: true, data: missesByCourseChapter(outline.slug, outline.chapters, data as BankMiss[]) }, { headers: NO_STORE });
}
