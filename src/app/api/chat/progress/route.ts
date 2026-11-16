/**
 * GET /api/chat/progress?exam=<slug>: V's "How's my progress" card
 * (2026-10-27, migration 0191; lib/chat/progressCard.ts). The student's own
 * numbers for one exam, as plain-words rows, plus their other exams to switch
 * to. No AI call. Read with the student's own login and never cached: it is
 * theirs, and it moves with every answer. Not found while the card is switched
 * off at /dashboard/chat.
 *
 * `view=day` (2026-11-15, migration 0262) answers V's "Your day" card instead
 * (lib/chat/dayCard.ts): the card that stands in for V's greeting the first
 * time a student opens V each day. `{ day: null }` = nothing to say, and V
 * keeps its greeting. Same switch as the progress card.
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
import { loadDayCard } from "@/lib/chat/dayCardServer";
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
    if (request.nextUrl.searchParams.get("view") === "day") {
      const day = await loadDayCard(db, userId, now);
      if (day) {
        // One row a day: who saw it and which kind, for growth "v-day-card".
        const seen = surfaceViewedEvent(userId, "v_day", now);
        await logActivityOnce(db, userId, { ...seen, metadata: { ...seen.metadata, card: day.kind } });
      }
      return NextResponse.json({ day }, { headers: NO_STORE });
    }
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
