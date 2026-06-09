import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/dashboard";
  const signupSource = url.searchParams.get("signup_source");

  if (code) {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Attribution: stamp the funnel source onto a first-time OAuth sign-up
      // (e.g. "quiz"). Only if not already set, so a returning Google login
      // doesn't overwrite the original source. Best-effort — never block sign-in.
      if (signupSource) {
        try {
          const { data } = await supabase.auth.getUser();
          if (data.user && !data.user.user_metadata?.signup_source) {
            await supabase.auth.updateUser({ data: { signup_source: signupSource } });
          }
        } catch {
          /* ignore — attribution is non-critical */
        }
      }
      return NextResponse.redirect(new URL(next, url.origin));
    }
  }
  return NextResponse.redirect(new URL("/login?error=auth", url.origin));
}
