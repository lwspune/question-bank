/**
 * GET /api/partner-course/[id]: a tap on a partner course card on /store
 * (trial, owner 2026-11-17; migration 0269). Counts the tap, then sends the
 * student on to the partner's page with our UTM tags.
 *
 * Counted here, server-side, so signed-out visitors (most of the traffic) are
 * counted and no ad blocker can hide it. Under /api, which robots.txt already
 * disallows, and the card links with rel="nofollow"; a crawler that comes
 * anyway is recognised by its user agent and sent on uncounted.
 *
 * THE TAP ALWAYS REACHES THE PARTNER: a failed session read or write loses the
 * count, never the student. Unique students = one per account when signed in,
 * else one per browser by a random first-party id (qb_vid, a year, httpOnly).
 * Staff are left out at read time (scripts/partner-courses/readout.sql).
 */
import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSessionUser } from "@/lib/auth";
import { isLikelyBot } from "@/lib/analytics/botFilter";
import { courseById, outboundUrl } from "@/lib/partnerCourses/courses";

const VISITOR_COOKIE = "qb_vid";
const YEAR_S = 365 * 24 * 60 * 60;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = courseById(id);
  if (!course) {
    return NextResponse.redirect(new URL("/store", request.url), { status: 302, headers: { "Cache-Control": "no-store" } });
  }

  const res = NextResponse.redirect(outboundUrl(course), { status: 302, headers: { "Cache-Control": "no-store, private" } });
  if (isLikelyBot(request.headers.get("user-agent"), undefined)) return res;

  const carried = request.cookies.get(VISITOR_COOKIE)?.value ?? "";
  const visitorId = UUID_RE.test(carried) ? carried.toLowerCase() : randomUUID();
  if (visitorId !== carried) {
    res.cookies.set(VISITOR_COOKIE, visitorId, { httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: YEAR_S });
  }

  try {
    const user = await getSessionUser().catch((err: unknown) => {
      console.error("partner course tap: session read failed:", err instanceof Error ? err.message : err);
      return null;
    });
    const { error } = await createSupabaseAdminClient()
      .from("partner_course_clicks")
      .insert({
        course_id: course.id,
        exam_slug: course.examSlug,
        visitor_id: visitorId,
        ...(user ? { user_id: user.id } : {}),
      });
    if (error) console.error("partner course tap: write failed:", error.message);
  } catch (err) {
    console.error("partner course tap failed:", err instanceof Error ? err.message : err);
  }
  return res;
}
