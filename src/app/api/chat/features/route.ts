/**
 * GET /api/chat/features — which of V's switchable features are on, for the
 * "Ask V" buttons on question cards (2026-10-19, migration 0168). The cards
 * sit on cached pages that carry nothing per visitor, so they ask once per
 * page load. Public and cached at the edge for a minute: a switch reaches
 * every page within about a minute, and most loads never reach a function.
 */
import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { readChatSettings } from "@/lib/chat/settingsAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  const s = await readChatSettings(createSupabaseAdminClient());
  return NextResponse.json(
    { explain: s.aiEnabled && s.explainEnabled },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } }
  );
}
