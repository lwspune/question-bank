/**
 * POST /api/activity/visual — record what a signed-in student did with an
 * animated solution (kind `solution_visual`, migration 0208): shown, finished,
 * replayed, opened in Still, switched to Still or back. Rules and the reason it
 * exists: lib/visuals/usage.
 *
 * Its own route and rate limit rather than /api/activity/event: a student
 * working through animated questions sends two or three of these per solution,
 * and sharing that route's 120 an hour with page views would drop the views.
 * Best effort: the client never retries and reads nothing back.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { logActivityOnce } from "@/lib/activity/service";
import { parseVisualEvent } from "@/lib/visuals/usage";

/** Three events per solution over 100 animated solutions an hour. */
const LIMIT_PER_HOUR = 300;
const HOUR_MS = 60 * 60 * 1000;

export async function POST(request: NextRequest) {
  let user = null;
  try {
    user = await getSessionUser();
  } catch {
    user = null;
  }
  // Signed-out visitors are not recorded, by design (see lib/visuals/usage).
  if (!user) return new NextResponse(null, { status: 401 });

  // Rate limit BEFORE parsing, so junk bodies still cost the caller their budget.
  const rl = await checkAndIncrement(createSupabaseAdminClient(), `visual:user:${user.id}`, {
    limit: LIMIT_PER_HOUR,
    windowMs: HOUR_MS,
  });
  if (!rl.ok) return new NextResponse(null, { status: 429 });

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = parseVisualEvent(raw, user.id, new Date());
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  // Through the student's JWT: user_activity is own-row under RLS.
  await logActivityOnce(createSupabaseServerClient(), user.id, parsed.value);
  return new NextResponse(null, { status: 204 });
}
