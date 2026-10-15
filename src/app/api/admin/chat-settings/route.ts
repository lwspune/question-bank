import { NextResponse, type NextRequest } from "next/server";
import { requireSuperadmin, HttpError } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { parseChatSettingsInput } from "@/lib/chat/settings";
import { saveChatSettings } from "@/lib/chat/settingsAdmin";

/**
 * POST /api/admin/chat-settings: save V's settings (migration 0158) from
 * /dashboard/chat. Platform-wide, so superadmin only. The typed-question route
 * reads them per request, so a change applies to the next message.
 */
export async function POST(request: NextRequest) {
  try {
    await requireSuperadmin();
    const body = await request.json().catch(() => null);
    const parsed = parseChatSettingsInput(body);
    if (!parsed.ok) return NextResponse.json({ error: parsed.message }, { status: 400 });

    const result = await saveChatSettings(createSupabaseAdminClient(), parsed.settings);
    if (result.kind === "error") {
      console.error("admin chat-settings error:", result.message);
      return NextResponse.json({ error: "internal error" }, { status: 500 });
    }
    return NextResponse.json({ ok: true, settings: result.settings });
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("admin chat-settings route error", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
