/**
 * POST /api/tutor-interest — the /tutor interest check's write (migration 0190).
 * PATCH — the answer to the price question that follows a Yes (migration 0223).
 * GET — the visitor's sign-in and profile state for the cached /tutor page.
 *
 * Signed-in only (owner, 2026-10-28), so every answer belongs to someone we can
 * reach: session → rate-limit (IP) → validate (shared pure validator) →
 * service-role upsert on user_id, so answering again replaces the first. The
 * exam comes from the visitor's own qb_exam cookie, never the body.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/http";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getOwnProfile } from "@/lib/profile/service";
import { readExamSlugFromCookieString } from "@/lib/exam/examNav";
import { normaliseFrom, validateTutorInterest } from "@/lib/tutor/interest";
import {
  PRICE_SNOOZE_DAYS,
  normaliseAnsweredFrom,
  pendingPriceStep,
  priceForUser,
  validateStudentPrice,
  validateTeacherRate,
  type StoredTutorAnswer,
} from "@/lib/tutor/price";

export const maxDuration = 15;

const HOUR_MS = 60 * 60 * 1000;
const SUBMIT_LIMIT = 10; // per IP per hour; a person answers once or twice

const NO_STORE = { "Cache-Control": "no-store, private" };

/** The account's stored answer, read with the service role (the table has no read policy). */
async function readStoredAnswer(admin: ReturnType<typeof createSupabaseAdminClient>, userId: string) {
  const { data, error } = await admin
    .from("tutor_interest")
    .select("role, wants, price_answer, teacher_rate")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data ?? null) as StoredTutorAnswer;
}

/**
 * GET: what the cached /tutor page asks from the browser (2026-11-06), so the
 * page reads no session itself: is the visitor signed in, are their mobile
 * and city already on file (each skips a follow-up question), their price,
 * and whether a Yes they gave earlier still owes the price question
 * (2026-11-07). Per-user, so never cached. The page only calls it when a
 * sign-in cookie exists.
 */
export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ signedIn: false, hasMobile: false, hasCity: false }, { headers: NO_STORE });
    const [profile, stored] = await Promise.all([
      getOwnProfile(createSupabaseServerClient(), user.id),
      readStoredAnswer(createSupabaseAdminClient(), user.id),
    ]);
    return NextResponse.json(
      {
        signedIn: true,
        hasMobile: !!profile?.mobile,
        hasCity: !!profile?.city,
        price: priceForUser(user.id),
        pending: pendingPriceStep(stored),
      },
      { headers: NO_STORE }
    );
  } catch (err) {
    console.error("tutor interest status failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not load your details." }, { status: 500, headers: NO_STORE });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Sign in to answer." }, { status: 401 });

    const admin = createSupabaseAdminClient();

    const rl = await checkAndIncrement(admin, `tutor-interest:${getClientIp(request)}`, {
      limit: SUBMIT_LIMIT,
      windowMs: HOUR_MS,
    });
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many answers. Please try again later.", retryAfter: rl.retryAfter },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    let raw: Record<string, unknown>;
    try {
      raw = (await request.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const v = validateTutorInterest(raw);
    if (!v.ok) return NextResponse.json({ error: v.error }, { status: 400 });

    // A student Yes is shown the account's price next, so it is recorded now:
    // one who leaves at the price still counts as having seen it. A fresh
    // answer clears any earlier price answer, so it is asked again.
    const price = v.value.role === "student" && v.value.wants ? priceForUser(user.id) : null;
    const row = {
      ...v.value,
      user_id: user.id,
      from_section: normaliseFrom(raw.from),
      exam_slug: readExamSlugFromCookieString(request.headers.get("cookie") ?? ""),
      price_shown: price,
      price_answer: null,
      price_would_pay: null,
      teacher_rate: null,
      price_answered_at: null,
      price_snoozed_until: null,
      price_answered_from: null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await admin.from("tutor_interest").upsert(row, { onConflict: "user_id" });
    if (error) {
      console.error("tutor interest write failed:", error.message);
      return NextResponse.json({ error: "Could not save your answer. Please try again." }, { status: 500 });
    }
    return NextResponse.json(price === null ? { ok: true } : { ok: true, price });
  } catch (err) {
    console.error("tutor interest failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not save your answer. Please try again." }, { status: 500 });
  }
}

/**
 * PATCH: the price question (owner, 2026-11-07; migration 0223). A student
 * answers the price fixed for their account (never a price from the body); a
 * teacher gives a rate. Only an account whose stored answer is a Yes can
 * answer, and the role comes from that row, not the request. The /me card
 * (migration 0224) sends `from: "me"`, and `{ snooze: true }` for "Not now".
 */
export async function PATCH(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Sign in to answer." }, { status: 401 });

    const admin = createSupabaseAdminClient();

    const rl = await checkAndIncrement(admin, `tutor-interest:${getClientIp(request)}`, {
      limit: SUBMIT_LIMIT,
      windowMs: HOUR_MS,
    });
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many answers. Please try again later.", retryAfter: rl.retryAfter },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const stored = await readStoredAnswer(admin, user.id);
    if (!stored?.wants) {
      return NextResponse.json({ error: "Answer the first questions before this one." }, { status: 409 });
    }

    const now = new Date().toISOString();
    const body = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
    const from = normaliseAnsweredFrom(body.from);
    let changes: Record<string, unknown>;
    if (body.snooze === true) {
      // "Not now" on the /me card (2026-11-07): put it away for a week, save no answer.
      if (stored.role !== "student") {
        return NextResponse.json({ error: "Only a student is asked this question." }, { status: 400 });
      }
      const until = new Date(Date.now() + PRICE_SNOOZE_DAYS * 86_400_000).toISOString();
      changes = { price_snoozed_until: until, updated_at: now };
    } else if (stored.role === "student") {
      const price = priceForUser(user.id);
      const v = validateStudentPrice(raw, price);
      if (!v.ok) return NextResponse.json({ error: v.error }, { status: 400 });
      changes = {
        price_shown: price,
        price_answer: v.value.answer,
        price_would_pay: v.value.wouldPay,
        price_answered_at: now,
        price_answered_from: from,
        updated_at: now,
      };
    } else {
      const v = validateTeacherRate(raw);
      if (!v.ok) return NextResponse.json({ error: v.error }, { status: 400 });
      changes = { teacher_rate: v.value, price_answered_at: now, price_answered_from: from, updated_at: now };
    }

    const { error } = await admin.from("tutor_interest").update(changes).eq("user_id", user.id);
    if (error) {
      console.error("tutor price write failed:", error.message);
      return NextResponse.json({ error: "Could not save your answer. Please try again." }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("tutor price failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not save your answer. Please try again." }, { status: 500 });
  }
}
