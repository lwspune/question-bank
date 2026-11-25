/**
 * The shared spine of /api/rooms/[slug]/* (migration 0289): session → exam
 * slug → per-account rate limit → handler, and one error shape. A guard
 * trigger's refusal comes back as its plain line (lib/rooms/errors); a
 * RoomAccessError as its own status; anything else is logged and a 500.
 */
import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getSessionUser, type SessionUser } from "@/lib/auth";
import { roomErrorOf } from "./errors";
import { RoomAccessError, roomName } from "./server";

type Admin = ReturnType<typeof createSupabaseAdminClient>;

const HOUR_MS = 60 * 60 * 1000;

export async function roomRoute(
  params: Promise<{ slug: string }>,
  opts: { limitKey: string; perHour: number },
  handler: (ctx: { db: Admin; user: SessionUser; slug: string }) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
    const { slug } = await params;
    if (!roomName(slug)) return NextResponse.json({ error: "There is no room for that exam." }, { status: 404 });
    const db = createSupabaseAdminClient();
    const rl = await checkAndIncrement(db, `${opts.limitKey}:${user.id}`, { limit: opts.perHour, windowMs: HOUR_MS });
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many tries. Please try again later.", retryAfter: rl.retryAfter },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }
    return await handler({ db, user, slug });
  } catch (err) {
    if (err instanceof RoomAccessError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error(`rooms ${opts.limitKey} failed:`, err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

/** A guard trigger's refusal, or a logged 500. */
export function dbErrorResponse(where: string, message: string): NextResponse {
  const known = roomErrorOf(message);
  if (known) return NextResponse.json({ error: known.error }, { status: known.status });
  console.error(`rooms ${where} write failed:`, message);
  return NextResponse.json({ error: "Could not save. Please try again." }, { status: 500 });
}

export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
