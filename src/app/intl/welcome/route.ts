import type { NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getOnboardingState, saveIntlTargets } from "@/lib/profile/service";
import { readAcquisitionCookie } from "@/lib/acquisition/cookie";
import { intlExamPickerPath, intlWelcomeExam, safeNextFrom } from "@/lib/sites/intl";

/**
 * intl.pyqvault.com's /welcome (the middleware rewrites it here, 2026-10-30).
 * PYQ Vault's onboarding asks for Indian exams and a mobile number; an intl
 * student instead gets ONE international exam recorded on their profile
 * (2026-11-18): the one the page they are headed to names, else the one their
 * first landing page named. When neither does, a student with no exam yet
 * picks it on /welcome/exam. The email and push jobs read it to leave intl
 * students out. Best-effort: a failed save never blocks the student.
 */
export async function GET(request: NextRequest) {
  const destination = safeNextFrom(request.nextUrl.search);
  let location = destination;
  try {
    const user = await getSessionUser();
    if (user) {
      const exam = intlWelcomeExam({
        next: destination,
        landing: readAcquisitionCookie(request.cookies.get("qb_acq")?.value ?? null)?.landing,
      });
      const db = createSupabaseServerClient();
      if (exam) {
        await saveIntlTargets(db, user, [exam]);
      } else if ((await getOnboardingState(db, user.id)).targetExams.length === 0) {
        location = intlExamPickerPath(destination);
      }
    }
  } catch (e) {
    console.error("intl welcome: saving the exam failed", e instanceof Error ? e.message : e);
  }
  // A RELATIVE Location: behind the middleware's rewrite, request.url names the
  // internal host, not intl.pyqvault.com, so an absolute URL built from it
  // would send the student off the intl site.
  return new Response(null, { status: 307, headers: { Location: location, "Cache-Control": "no-store" } });
}
