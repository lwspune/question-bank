/**
 * GET /api/chat/features — which of V's switchable features are on, for the
 * "Ask V" buttons on question cards (2026-10-19, migration 0168) and V's own
 * "Plan my week" button (2026-10-20, migration 0170; the button gave way to
 * "How's my progress" on 2026-10-27, 0191, which needs no AI). The cards
 * sit on cached pages that carry nothing per visitor, so they ask once per
 * page load. Public and cached at the edge for a minute: a switch reaches
 * every page within about a minute, and most loads never reach a function.
 *
 * READ LIVE, NEVER FROM THE BUILD (2026-10-19). The first deploy kept answering
 * {explain:false} after the switch was saved, while /api/chat/question (which
 * reads its request) saw it on: a GET that ignores its request can be built as
 * static and its database read cached. So it takes the request and opts out of
 * Next's caches explicitly; the minute at the edge is the only cache.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { readChatSettings } from "@/lib/chat/settingsAdmin";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET(_request: NextRequest) {
  const s = await readChatSettings(createSupabaseAdminClient());
  return NextResponse.json(
    { explain: s.aiEnabled && s.explainEnabled, plan: s.aiEnabled && s.planEnabled, progress: s.progressEnabled },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } }
  );
}
