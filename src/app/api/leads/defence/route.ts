import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { parseFeedRequest, secretMatches, toFeedLead, type FeedRow } from "@/lib/leads/defenceFeed";

export const dynamic = "force-dynamic";

/**
 * GET /api/leads/defence?source=account|quiz&after=<cursor>&limit=<1..500>
 * Authorization: Bearer <GOPOST_LEADS_SECRET>
 *
 * → 200 { leads: FeedLead[], next: string | null }
 *
 * NDA, CDS and AFCAT students who agreed to be contacted, for GoPost's Leads
 * list (LWS's marketing app, which calls this hourly from its server). Who
 * counts is decided in SQL (`defence_leads_after`, migration 0185). `next` is
 * the last lead's cursor, or the `after` that was sent when nothing is new, so
 * the caller can always store it.
 *
 * An unknown secret, no secret, and no secret configured on this server all
 * answer the same 401: fails closed, and a caller cannot probe which it is.
 */
export async function GET(request: NextRequest) {
  if (!secretMatches(request.headers.get("authorization"), process.env.GOPOST_LEADS_SECRET)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const parsed = parseFeedRequest(new URL(request.url).searchParams);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { data, error } = await createSupabaseAdminClient().rpc("defence_leads_after", {
    p_source: parsed.source,
    p_after_at: parsed.after?.at ?? null,
    p_after_id: parsed.after?.id ?? null,
    p_limit: parsed.limit,
  });
  if (error) {
    console.error("defence_leads_after failed", error);
    return NextResponse.json({ error: "query failed" }, { status: 500 });
  }

  const leads = ((data ?? []) as FeedRow[]).map(toFeedLead);
  const sent = new URL(request.url).searchParams.get("after");
  return NextResponse.json(
    { leads, next: leads.length ? leads[leads.length - 1].cursor : sent },
    { headers: { "Cache-Control": "no-store" } }
  );
}
