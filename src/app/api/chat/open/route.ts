/**
 * POST /api/chat/open — records that V's launcher was opened. Pure telemetry
 * for /dashboard/chat: the client fires it once per page mount and ignores the
 * response, so this always answers ok unless the caller is rate-limited.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/http";
import { getSessionUser } from "@/lib/auth";
import { recordChatInteraction } from "@/lib/chat/interactionsAdmin";

export const maxDuration = 10;

const HOUR_MS = 60 * 60 * 1000;
const OPEN_LIMIT = 20; // per IP per hour — the client already sends at most one per page

export async function POST(request: NextRequest) {
  try {
    const admin = createSupabaseAdminClient();

    const rl = await checkAndIncrement(admin, `chat-open:anon:${getClientIp(request)}`, {
      limit: OPEN_LIMIT,
      windowMs: HOUR_MS,
    });
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many requests.", retryAfter: rl.retryAfter },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    const user = await getSessionUser();
    await recordChatInteraction(admin, { eventType: "launcher_open", userId: user?.id ?? null });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("chat/open route error", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
