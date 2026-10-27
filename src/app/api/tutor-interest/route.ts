/**
 * POST /api/tutor-interest — the /tutor interest check's write (migration 0190).
 *
 * Open to signed-out visitors: rate-limit (IP) → validate (shared pure
 * validator) → service-role write. A signed-in visitor's answer upserts on
 * user_id, so answering again replaces the first; a signed-out answer adds a
 * row. The exam comes from the visitor's own qb_exam cookie, never the body.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/http";
import { getSessionUser } from "@/lib/auth";
import { readExamSlugFromCookieString } from "@/lib/exam/examNav";
import { normaliseFrom, validateTutorInterest } from "@/lib/tutor/interest";

export const maxDuration = 15;

const HOUR_MS = 60 * 60 * 1000;
const SUBMIT_LIMIT = 10; // per IP per hour; a person answers once or twice

export async function POST(request: NextRequest) {
  try {
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

    const user = await getSessionUser();
    const row = {
      ...v.value,
      from_section: normaliseFrom(raw.from),
      exam_slug: readExamSlugFromCookieString(request.headers.get("cookie") ?? ""),
      updated_at: new Date().toISOString(),
    };

    const { error } = user
      ? await admin.from("tutor_interest").upsert({ ...row, user_id: user.id }, { onConflict: "user_id" })
      : await admin.from("tutor_interest").insert(row);
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
