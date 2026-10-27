/**
 * GET /api/learn/progress — a signed-in student's own Learn progress (migration 0193).
 *
 *   ?chapters=a,b          their state on every concept of those lesson chapters (all if omitted)
 *   &concept=<chapter>/<slug>   and their answers on that one concept, oldest first
 *
 * Lesson pages are cached for everyone, so this is how one student's progress reaches them.
 * Read through the student's own JWT; the functions answer for auth.uid() only. A guest gets
 * 401 and the page stays in guest mode. Reply: { ok: true, data } | { ok: false, error }.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, private" } as const;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const fail = (status: number, error: string) => NextResponse.json({ ok: false, error }, { status, headers: NO_STORE });

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const chapters = params.get("chapters")?.split(",").filter(Boolean) ?? null;
  const concept = params.get("concept")?.split("/") ?? null;
  if (chapters && (chapters.length > 50 || !chapters.every((c) => SLUG.test(c)))) return fail(400, "Invalid chapters.");
  if (concept && (concept.length !== 2 || !concept.every((c) => SLUG.test(c)))) return fail(400, "Invalid concept.");

  const user = await getSessionUser();
  if (!user) return fail(401, "Sign in to see your progress.");

  const db = createSupabaseServerClient();
  const [progress, attempts] = await Promise.all([
    db.rpc("learn_my_progress", { p_chapters: chapters }),
    concept ? db.rpc("learn_my_attempts", { p_chapter: concept[0], p_concept: concept[1] }) : Promise.resolve({ data: null, error: null }),
  ]);
  const error = progress.error ?? attempts.error;
  if (error) {
    console.error("learn progress: read failed", error.message);
    return fail(500, "Couldn't load your progress.");
  }
  return NextResponse.json({ ok: true, data: { userId: user.id, progress: progress.data, attempts: attempts.data } }, { headers: NO_STORE });
}
