/**
 * POST /api/me/class-offer: the /me class card's taps (migration 0282).
 *
 *   seen  the card came into view: a row, once (never overwrites the first)
 *   more  "Know more" was tapped: stamps more_at; the card stays
 *   no    the answer; the card goes for good
 *   yes   record_class_offer_yes: the class_interest lead (courses merged with
 *         any earlier lead on that mobile) and the answer in one transaction
 *
 * Signed in only (the card lives on /me). Order: session → rate limit (per
 * account) → body → validate (lib/classes/meOffer.ts) → service-role write.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getSessionUser } from "@/lib/auth";
import { readExamSlugFromCookieString } from "@/lib/exam/examNav";
import { CLASS_TEXT_MAX } from "@/lib/classes/interest";
import { validateClassOfferAction } from "@/lib/classes/meOffer";

export const maxDuration = 15;

const HOUR_MS = 60 * 60 * 1000;
const LIMIT = 30; // per account per hour: a sighting and a tap or two per card

const SAVE_FAILED = "Could not save. Please try again.";

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });

    const admin = createSupabaseAdminClient();
    const rl = await checkAndIncrement(admin, `class-offer:${user.id}`, { limit: LIMIT, windowMs: HOUR_MS });
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many tries. Please try again later.", retryAfter: rl.retryAfter },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const v = validateClassOfferAction(raw);
    if (!v.ok) return NextResponse.json({ error: v.error, field: v.field }, { status: 400 });
    const a = v.value;
    const now = new Date().toISOString();

    let error: { message: string } | null;
    if (a.action === "yes") {
      ({ error } = await admin.rpc("record_class_offer_yes", {
        p_user_id: user.id,
        p_offer: a.offer,
        p_name: user.name?.trim().slice(0, CLASS_TEXT_MAX) || null,
        p_city: a.lead.city,
        p_is_pune: a.lead.isPune,
        p_mobile: a.lead.mobile,
        p_exam_slug: readExamSlugFromCookieString(request.headers.get("cookie") ?? ""),
      }));
    } else if (a.action === "seen") {
      ({ error } = await admin
        .from("class_offer_answers")
        .upsert({ user_id: user.id, offer: a.offer }, { onConflict: "user_id,offer", ignoreDuplicates: true }));
    } else if (a.action === "more") {
      ({ error } = await admin
        .from("class_offer_answers")
        .upsert({ user_id: user.id, offer: a.offer, more_at: now }, { onConflict: "user_id,offer" }));
    } else {
      ({ error } = await admin
        .from("class_offer_answers")
        .upsert({ user_id: user.id, offer: a.offer, answer: "no", answered_at: now }, { onConflict: "user_id,offer" }));
    }

    if (error) {
      console.error("class offer write failed:", error.message);
      return NextResponse.json({ error: SAVE_FAILED }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("class offer failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: SAVE_FAILED }, { status: 500 });
  }
}
