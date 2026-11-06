import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { signedInAuthPageRedirect, signedInHome } from "@/lib/auth/redirect";
import { hasSupabaseAuthCookie } from "@/lib/auth-identity";
import { isExamSlug } from "@/lib/exam/examContext";

type CookieToSet = { name: string; value: string; options?: CookieOptions };

const PROTECTED_PREFIXES = ["/dashboard"];

function isProtected(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

export async function updateSession(request: NextRequest): Promise<NextResponse> {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isProtected(request.nextUrl.pathname) && !user) {
    // Public pivot: anon users hitting an admin route go to the public browse
    // page (login is reachable from the AppHeader Sign in button).
    const url = request.nextUrl.clone();
    url.pathname = "/browse";
    return NextResponse.redirect(url);
  }

  // A signed-in visitor on /login or /signup goes straight into the site
  // rather than being shown the form again.
  const authPageTarget = user
    ? signedInAuthPageRedirect(
        request.nextUrl.pathname,
        request.nextUrl.searchParams.get("next")
      )
    : null;
  if (authPageTarget) {
    return NextResponse.redirect(new URL(authPageTarget, request.url));
  }

  return response;
}

/**
 * The homepage `/` (2026-11-06). The page is cached and reads nothing about the
 * request, so the choice it used to make during render is made here:
 *
 * - No Supabase cookie (nearly all traffic, every crawler): the cached page, or
 *   its cached per-exam copy when qb_exam names an exam. No auth call at all.
 * - A Supabase cookie and a live user: a redirect to their own home, the same
 *   signedInHome the page used (admin /dashboard, teacher /browse, student /me).
 * - A Supabase cookie that is no longer a session: as signed out.
 *
 * A rewrite, not a redirect, so the address bar stays `/`.
 */
export async function routeHome(request: NextRequest): Promise<NextResponse> {
  const chosen = request.cookies.get("qb_exam")?.value;
  const examPath = isExamSlug(chosen) ? `/home-exam/${chosen}` : null;
  const signedOut = () =>
    examPath ? NextResponse.rewrite(new URL(examPath, request.url)) : NextResponse.next({ request });

  if (!hasSupabaseAuthCookie(request.cookies.getAll().map((c) => c.name))) {
    return signedOut();
  }

  // A refreshed session's cookies must ride on whatever response goes back.
  const refreshed: CookieToSet[] = [];
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          refreshed.push(...cookiesToSet);
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let response: NextResponse;
  if (user) {
    const { data: membership } = await supabase
      .from("org_members")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();
    const role = membership?.role === "ADMIN" || membership?.role === "TEACHER" ? membership.role : null;
    response = NextResponse.redirect(new URL(signedInHome(role), request.url));
  } else {
    response = signedOut();
  }
  for (const { name, value, options } of refreshed) response.cookies.set(name, value, options);
  return response;
}
