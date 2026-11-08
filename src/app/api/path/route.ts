/**
 * /api/path — the signed-in student's board path (MENTOR_SPEC.md Phase 1).
 *
 * GET   today on the path ({ today }), or the start offer when there is no
 *       path ({ today: null, offer }). No-store: it is the student's own.
 * POST  { action: "start", exam, stream } · { action: "stop" } ·
 *       { action: "defer", chapterId } ("Not taught yet"). Answers with the
 *       day as it now stands.
 *
 * The body is checked before any database work. Reads and the student's own
 * writes go through their JWT (RLS); today's pick and the test grants are
 * written by the service role inside lib/path/service, never from anything
 * the browser sent. Rules: lib/path.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getOwnProfile } from "@/lib/profile/service";
import { parsePathAction } from "@/lib/path/parse";
import { PathError, deferChapter, getPathOffer, getPathToday, setPace, startPath, stopPath } from "@/lib/path/service";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, private" } as const;
/** Taps, not reads: an hour of real use is a handful. */
const LIMIT_PER_HOUR = 60;
const HOUR_MS = 3_600_000;

async function signedIn() {
  try {
    return await getSessionUser();
  } catch {
    return null;
  }
}

async function todayFor(userId: string) {
  const db = createSupabaseServerClient();
  const profile = await getOwnProfile(db, userId);
  const today = await getPathToday(db, userId, { write: true, profile });
  if (today) return { today: today.view, offer: null };
  return { today: null, offer: await getPathOffer(profile) };
}

export async function GET() {
  const user = await signedIn();
  if (!user) return NextResponse.json({ error: "Sign in to see your path." }, { status: 401, headers: NO_STORE });
  try {
    return NextResponse.json(await todayFor(user.id), { headers: NO_STORE });
  } catch (e) {
    console.error("path read failed", e);
    return NextResponse.json({ error: "Couldn't load your path." }, { status: 500, headers: NO_STORE });
  }
}

export async function POST(request: NextRequest) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400, headers: NO_STORE });
  }
  const parsed = parsePathAction(raw);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400, headers: NO_STORE });

  const user = await signedIn();
  if (!user) return NextResponse.json({ error: "Sign in to use the path." }, { status: 401, headers: NO_STORE });

  const rl = await checkAndIncrement(createSupabaseAdminClient(), `path:user:${user.id}`, {
    limit: LIMIT_PER_HOUR,
    windowMs: HOUR_MS,
  });
  if (!rl.ok) return NextResponse.json({ error: "Slow down a moment." }, { status: 429, headers: NO_STORE });

  const db = createSupabaseServerClient();
  try {
    const action = parsed.value;
    if (action.action === "start") {
      const profile = await getOwnProfile(db, user.id);
      await startPath(db, user.id, { exam: action.exam, stream: action.stream }, profile);
    } else if (action.action === "stop") {
      await stopPath(db, user.id);
    } else if (action.action === "pace") {
      await setPace(db, user.id, action.direction);
    } else {
      await deferChapter(db, user.id, action.chapterId);
    }
    return NextResponse.json(await todayFor(user.id), { headers: NO_STORE });
  } catch (e) {
    if (e instanceof PathError) return NextResponse.json({ error: e.message }, { status: e.status, headers: NO_STORE });
    console.error("path action failed", e);
    return NextResponse.json({ error: "Couldn't save that. Try again." }, { status: 500, headers: NO_STORE });
  }
}
