/**
 * POST /api/tutor-interest — the /tutor interest check's write (migration 0190).
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

export const maxDuration = 15;

const HOUR_MS = 60 * 60 * 1000;
const SUBMIT_LIMIT = 10; // per IP per hour; a person answers once or twice

const NO_STORE = { "Cache-Control": "no-store, private" };

/**
 * GET: what the cached /tutor page asks from the browser (2026-11-06), so the
 * page reads no session itself: is the visitor signed in, and are their mobile
 * and city already on file (each skips a follow-up question). Per-user, so
 * never cached. The page only calls it when a sign-in cookie exists.
 */
export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ signedIn: false, hasMobile: false, hasCity: false }, { headers: NO_STORE });
    const profile = await getOwnProfile(createSupabaseServerClient(), user.id);
    return NextResponse.json(
      { signedIn: true, hasMobile: !!profile?.mobile, hasCity: !!profile?.city },
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

    const row = {
      ...v.value,
      user_id: user.id,
      from_section: normaliseFrom(raw.from),
      exam_slug: readExamSlugFromCookieString(request.headers.get("cookie") ?? ""),
      updated_at: new Date().toISOString(),
    };

    const { error } = await admin.from("tutor_interest").upsert(row, { onConflict: "user_id" });
    if (error) {
      console.error("tutor interest write failed:", error.message);
      return NextResponse.json({ error: "Could not save your answer. Please try again." }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("tutor interest failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not save your answer. Please try again." }, { status: 500 });
  }
}
