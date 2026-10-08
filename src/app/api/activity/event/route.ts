import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { logActivity, logActivityOnce } from "@/lib/activity/service";
import { parseClientEvent } from "@/lib/activity/clientEvents";
import { readCountry, withCountry } from "@/lib/acquisition/country";

const LIMIT_PER_HOUR = 120;
const HOUR_MS = 60 * 60 * 1000;

/**
 * The generic client beacon, beside /api/activity/practice: a signed-in
 * browser may record a surface view or a paywall impression/dismissal —
 * nothing else (parseClientEvent is the closed list). Anonymous pings are
 * not recorded, by design. Best-effort: the client never retries.
 */
export async function POST(request: NextRequest) {
  let user = null;
  try {
    user = await getSessionUser();
  } catch {
    user = null;
  }
  if (!user) return new NextResponse(null, { status: 401 });

  const rl = await checkAndIncrement(createSupabaseAdminClient(), `event:user:${user.id}`, {
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

  const parsed = parseClientEvent(raw, user.id, new Date());
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  // Country on paywall events only, stamped here so the browser cannot set it.
  const event =
    parsed.value.kind === "paywall_event" ? withCountry(parsed.value, readCountry(request.headers)) : parsed.value;

  const db = createSupabaseServerClient();
  if (event.dedupeKey) await logActivityOnce(db, user.id, event);
  else await logActivity(db, user.id, event);

  return new NextResponse(null, { status: 204 });
}
