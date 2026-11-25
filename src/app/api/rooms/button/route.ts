/**
 * POST /api/rooms/button { mode: "show" | "2h" | "off" }: hide the exam rooms
 * button for focused study, or show it again (owner, 2026-11-25; migration
 * 0290). Saved on the account (lib/rooms/button), so it holds on every device.
 * Returns the stored value: null, a time, or "infinity".
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getSessionUser } from "@/lib/auth";
import { hideUntilFor } from "@/lib/rooms/button";
import { setButtonHidden } from "@/lib/rooms/server";

const Body = z.object({ mode: z.enum(["show", "2h", "off"]) });

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
    const db = createSupabaseAdminClient();
    const rl = await checkAndIncrement(db, `room-button:${user.id}`, { limit: 30, windowMs: 3600_000 });
    if (!rl.ok) return NextResponse.json({ error: "Too many tries. Please try again later." }, { status: 429 });
    const parsed = Body.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    const until = hideUntilFor(parsed.data.mode, Date.now());
    await setButtonHidden(db, user.id, until);
    return NextResponse.json({ ok: true, hiddenUntil: until });
  } catch (err) {
    console.error("rooms button failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not save. Please try again." }, { status: 500 });
  }
}
