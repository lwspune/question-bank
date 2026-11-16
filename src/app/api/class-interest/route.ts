/**
 * POST /api/class-interest: a lead for offline classes in Pune (migration 0265).
 * GET: what the cached /classes form prefills for a signed-in visitor.
 *
 * Anyone may answer, signed in or not (owner, 2026-11-16: a parent may have no
 * account), so: rate-limit (IP) first → validate (shared pure validator) →
 * service-role upsert keyed on the MOBILE, so the same number twice updates one
 * lead instead of adding a second. The row never carries `called_at` or
 * `created_at`, so a resubmission keeps the team's "called" tick and the first
 * date; a signed-out answer never carries `user_id`, so it cannot unlink a lead
 * an account already owns. The exam comes from the visitor's qb_exam cookie.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/http";
import { getSessionUser } from "@/lib/auth";
import { getOwnProfile } from "@/lib/profile/service";
import { readExamSlugFromCookieString } from "@/lib/exam/examNav";
import { normaliseFrom } from "@/lib/tutor/interest";
import { CLASS_TEXT_MAX, validateClassInterest } from "@/lib/classes/interest";

export const maxDuration = 15;

const HOUR_MS = 60 * 60 * 1000;
const SUBMIT_LIMIT = 5; // per IP per hour; a family leaves one number, maybe a second

const NO_STORE = { "Cache-Control": "no-store, private" };

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ signedIn: false }, { headers: NO_STORE });
    const profile = await getOwnProfile(createSupabaseServerClient(), user.id);
    const ten = profile?.mobile?.match(/^91(\d{10})$/)?.[1] ?? null;
    return NextResponse.json(
      { signedIn: true, name: user.name ?? null, mobile: ten, city: profile?.city ?? null },
      { headers: NO_STORE }
    );
  } catch (err) {
    console.error("class interest status failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not load your details." }, { status: 500, headers: NO_STORE });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = createSupabaseAdminClient();

    const rl = await checkAndIncrement(admin, `class-interest:${getClientIp(request)}`, {
      limit: SUBMIT_LIMIT,
      windowMs: HOUR_MS,
    });
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many tries. Please try again later.", retryAfter: rl.retryAfter },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    let raw: Record<string, unknown>;
    try {
      raw = (await request.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const v = validateClassInterest(raw);
    if (!v.ok) return NextResponse.json({ error: v.error, field: v.field }, { status: 400 });

    const user = await getSessionUser();
    const accountName = user?.name?.trim().slice(0, CLASS_TEXT_MAX) || null;
    const row = {
      ...(user ? { user_id: user.id } : {}),
      name: v.value.name ?? accountName,
      courses: v.value.courses,
      city: v.value.city,
      is_pune: v.value.isPune,
      mobile: v.value.mobile,
      consent: true,
      from_section: normaliseFrom(raw.from),
      exam_slug: readExamSlugFromCookieString(request.headers.get("cookie") ?? ""),
      updated_at: new Date().toISOString(),
    };

    const { error } = await admin.from("class_interest").upsert(row, { onConflict: "mobile" });
    if (error) {
      console.error("class interest write failed:", error.message);
      return NextResponse.json({ error: "Could not save. Please try again." }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("class interest failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not save. Please try again." }, { status: 500 });
  }
}
