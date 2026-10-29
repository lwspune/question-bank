import type { NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { saveIntlTargets } from "@/lib/profile/service";
import { INTL_EXAMS, safeNextFrom } from "@/lib/sites/intl";

/**
 * intl.pyqvault.com's /welcome (the middleware rewrites it here, 2026-10-30).
 * PYQ Vault's onboarding asks for Indian exams and a mobile number; an intl
 * student instead gets the international exams recorded on their profile, so
 * the email and push jobs can leave them out, and goes where they were headed.
 * Best-effort: a failed save never blocks the student.
 */
export async function GET(request: NextRequest) {
  const destination = safeNextFrom(request.nextUrl.search);
  try {
    const user = await getSessionUser();
    if (user) await saveIntlTargets(createSupabaseServerClient(), user, INTL_EXAMS.map((e) => e.slug));
  } catch (e) {
    console.error("intl welcome: saving the exam failed", e instanceof Error ? e.message : e);
  }
  // A RELATIVE Location: behind the middleware's rewrite, request.url names the
  // internal host, not intl.pyqvault.com, so an absolute URL built from it
  // would send the student off the intl site.
  return new Response(null, { status: 307, headers: { Location: destination, "Cache-Control": "no-store" } });
}
