/**
 * POST /api/activity/self-mark — the student's "Understood / Review later" tap
 * under a written model answer on /browse, the /questions pages or a board
 * reader (2026-10-28). Review later puts the question in the drill; Understood
 * fixes it if it was waiting there. Rules: lib/questions/selfMark.
 *
 * NOT folded into the reveal beacon (/api/activity/practice). That one is a
 * sendBeacon whose reply nothing reads, and here the student is waiting to
 * see "Saved": the reply carries what the tap did.
 *
 * SIGNED-IN ONLY. A signed-out visitor sees the buttons too, but the card asks
 * them to sign in and saves the tap after they return (SelfMarkButtons), so
 * nothing about an anonymous visitor is ever recorded here.
 *
 * Answers: 200 { outcome }, 400 bad body, 401 signed out, 404 not a PUBLIC
 * written question, 429 rate limited.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { parseSelfMark } from "@/lib/questions/selfMark";
import { recordSelfMark } from "@/lib/questions/selfMarkService";

/** A tap per answer read; well past a real study session, tight enough to
 *  bound a scripted client. */
const LIMIT_PER_HOUR = 120;
const HOUR_MS = 60 * 60 * 1000;

export async function POST(request: NextRequest) {
  let user = null;
  try {
    user = await getSessionUser();
  } catch {
    user = null;
  }
  if (!user) return NextResponse.json({ error: "Sign in to save your progress." }, { status: 401 });

  // Rate limit BEFORE parsing, so junk bodies still cost the caller their budget.
  const rl = await checkAndIncrement(createSupabaseAdminClient(), `self-mark:user:${user.id}`, {
    limit: LIMIT_PER_HOUR,
    windowMs: HOUR_MS,
  });
  if (!rl.ok) return NextResponse.json({ error: "Slow down a moment." }, { status: 429 });

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = parseSelfMark(raw);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  try {
    const result = await recordSelfMark(createSupabaseServerClient(), user.id, parsed);
    if (!result) return NextResponse.json({ error: "That question can't be marked." }, { status: 404 });
    return NextResponse.json(result);
  } catch (e) {
    console.error("self-mark failed", e);
    return NextResponse.json({ error: "Couldn't save that. Try again." }, { status: 500 });
  }
}
