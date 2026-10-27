/**
 * GET /api/chat/progress?exam=<slug>: V's "How's my progress" card
 * (2026-10-27, migration 0191; lib/chat/progressCard.ts). The student's own
 * numbers for one exam, as plain-words rows, plus their other exams to switch
 * to. No AI call. Read with the student's own login and never cached: it is
 * theirs, and it moves with every answer. Not found while the card is switched
 * off at /dashboard/chat.
 *
 * `exam` is only a preference: a slug that is not one of the student's own is
 * ignored (pickProgressExams), so the parameter cannot be used to read anything.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { readChatSettings } from "@/lib/chat/settingsAdmin";
import { loadProgressCard } from "@/lib/chat/progressCardServer";
import { logActivityOnce } from "@/lib/activity/service";
import { surfaceViewedEvent } from "@/lib/activity/views";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, private" } as const;
const SLUG_RE = /^[a-z0-9-]{1,40}$/;

export async function GET(request: NextRequest) {
  let userId: string | null = null;
  try {
    userId = (await getSessionUser())?.id ?? null;
  } catch {
    userId = null;
  }
  if (!userId) return NextResponse.json({ error: "Not signed in." }, { status: 401, headers: NO_STORE });

  const raw = request.nextUrl.searchParams.get("exam");
  const asked = raw && SLUG_RE.test(raw) ? raw : null;

  try {
    if (!(await readChatSettings(createSupabaseAdminClient())).progressEnabled) {
      return NextResponse.json({ error: "Not found" }, { status: 404, headers: NO_STORE });
    }
    const db = createSupabaseServerClient();
    const now = new Date();
    const [card] = await Promise.all([
      loadProgressCard(db, userId, asked, now),
      // One row a day: how many students look, and whether they drill after (growth "v-progress").
      logActivityOnce(db, userId, surfaceViewedEvent(userId, "v_progress", now)),
    ]);
    return NextResponse.json({ card }, { headers: NO_STORE });
  } catch (err) {
    console.error("chat/progress GET failed", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500, headers: NO_STORE });
  }
}
