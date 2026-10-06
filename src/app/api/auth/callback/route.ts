import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getOnboardingState } from "@/lib/profile/service";
import { needsOnboarding } from "@/lib/profile/onboarding";
import { safeNextPath, signedInHome, type OrgRole } from "@/lib/auth/redirect";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const rawNext = url.searchParams.get("next");
  const signupSource = url.searchParams.get("signup_source");

  if (code) {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // No `next`: the person's own home, not /dashboard (which only redirects
      // a student on to /me). An off-site `next` is refused the same way, and
      // /dashboard stays the fallback if the user cannot be read.
      let next = safeNextPath(rawNext, "/dashboard");
      let destination = next;
      try {
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          if (!rawNext || next !== rawNext) {
            const { data: m } = await supabase.from("org_members").select("role").eq("user_id", data.user.id).maybeSingle();
            const role: OrgRole = m?.role === "ADMIN" || m?.role === "TEACHER" ? m.role : null;
            next = signedInHome(role);
            destination = next;
          }
          // Attribution: stamp the funnel source onto a first-time OAuth sign-up
          // (e.g. "quiz"). Only if not already set, so a returning Google login
          // doesn't overwrite the original source. Best-effort — never block sign-in.
          if (signupSource && !data.user.user_metadata?.signup_source) {
            await supabase.auth.updateUser({ data: { signup_source: signupSource } });
          }
          // Route a student who hasn't done the one-time intent capture through
          // /welcome first, then on to where they were headed. /welcome
          // self-guards, so an already-onboarded user still lands on `next`.
          const state = await getOnboardingState(supabase, data.user.id);
          if (needsOnboarding(state)) {
            destination = `/welcome?next=${encodeURIComponent(next)}`;
          }
        }
      } catch {
        /* ignore — attribution + onboarding routing are non-critical */
      }
      return NextResponse.redirect(new URL(destination, url.origin));
    }
  }
  return NextResponse.redirect(new URL("/login?error=auth", url.origin));
}
