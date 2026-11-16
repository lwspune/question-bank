/**
 * POST /api/score/alert  { calculator }  ->  "tell me when the key is out".
 *
 * Signed-in students only (401 otherwise; the page sends them to sign in and
 * back). Written with the student's own session, so the score_alerts RLS
 * policy (own row, never pre-marked as sent; migration 0266) is the guard.
 * Asking twice is fine: the second ask changes nothing.
 *
 * Replies: 200 { ok: true } · 4xx { ok: false, error }.
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const Body = z.object({ calculator: z.literal("jee-main") });

export async function POST(request: NextRequest) {
  let user = null;
  try {
    user = await getSessionUser();
  } catch {
    user = null;
  }
  if (!user) return NextResponse.json({ ok: false, error: "Sign in first." }, { status: 401 });

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Something went wrong. Try again." }, { status: 400 });
  }
  const body = Body.safeParse(raw);
  if (!body.success) return NextResponse.json({ ok: false, error: "Unknown exam." }, { status: 400 });

  const { error } = await createSupabaseServerClient()
    .from("score_alerts")
    .upsert({ user_id: user.id, calculator: body.data.calculator }, { onConflict: "user_id,calculator", ignoreDuplicates: true });
  if (error) {
    console.error(`[score/alert] insert failed: ${error.message}`);
    return NextResponse.json({ ok: false, error: "Could not save that. Try again." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
