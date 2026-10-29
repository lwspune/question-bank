import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import {
  INTL_ORIGIN,
  intlHostDecision,
  isFormerIntlHost,
  isIntlHost,
  wwwHostDecision,
  type HostDecision,
} from "@/lib/sites/intl";

const SESSION_PREFIXES = ["/dashboard", "/account", "/upload", "/uploads"];

/** The signed-in surfaces whose session cookie this middleware refreshes (see the matcher note). */
export function needsSession(pathname: string): boolean {
  if (pathname === "/login" || pathname === "/signup") return true;
  return SESSION_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function apply(request: NextRequest, decision: HostDecision): NextResponse | null {
  if (decision.kind === "redirect") {
    return NextResponse.redirect(new URL(decision.url, request.url), decision.permanent ? 308 : 307);
  }
  if (decision.kind === "rewrite") {
    return NextResponse.rewrite(new URL(decision.path, request.url));
  }
  return null;
}

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  const { pathname, search } = request.nextUrl;

  // intl.pyqvault.com (2026-10-30): each page has one host. International exam
  // pages live on intl, PYQ Vault's on www; lib/sites/intl.ts decides.
  if (isFormerIntlHost(host)) {
    return NextResponse.redirect(new URL(`${pathname}${search}`, INTL_ORIGIN), 308);
  }
  const decision = isIntlHost(host)
    ? intlHostDecision(pathname, search)
    : wwwHostDecision(host, pathname, search);
  const moved = apply(request, decision);
  if (moved) return moved;

  return needsSession(pathname) ? updateSession(request) : NextResponse.next();
}

// Scope the middleware to the signed-in surfaces ONLY. updateSession() runs a
// Supabase auth.getUser() network round-trip on every matched request; running
// it on the public, anon-heavy traffic (/browse, /notes, /guide, /quiz, ...)
// burned ~40% of Vercel Active CPU (the whole Edge runtime line) for an auth
// check those pages never use. Each of these four prefixes also self-guards at
// the page level, so this is purely a cost change, not a security change. The
// only behavioural effect: a signed-in user's session cookie refreshes on these
// surfaces (+ server actions) rather than on every public page — fine for a
// public-first site. See the 2026-06-27 Decisions entry.
//
// /login and /signup are matched so a visitor who is ALREADY signed in is sent
// into the site instead of being shown the form (signedInAuthPageRedirect).
// Both are low-traffic and noindex, so the extra getUser() costs little.
//
// intl.pyqvault.com (2026-10-30) adds two kinds of entry, and neither refreshes
// a session (needsSession still decides that):
// - On production www, the paths of the INTERNATIONAL exams, so they 308 to
//   intl. Next needs this list as a literal; a new intl exam adds its lines
//   here, and tests/intl-middleware.test.ts fails until it does.
// - Every page on every OTHER host (the intl host, localhost, previews). The
//   intl host must see every request to keep PYQ Vault pages off it; its
//   traffic is small, and production www is excluded by name.
export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/account",
    "/account/:path*",
    "/upload",
    "/upload/:path*",
    "/uploads",
    "/uploads/:path*",
    "/login",
    "/signup",
    "/intl",
    "/intl/:path*",
    // IMAT
    "/exams/imat",
    "/notes/imat",
    "/notes/(imat-.*)",
    "/notes/print/(imat-.*)",
    "/formula/imat",
    "/formula/imat/:path*",
    "/mock/exam/imat",
    "/mock/exam/imat/:path*",
    "/mock/(imat-.*)",
    "/questions/imat",
    "/questions/imat/:path*",
    {
      source: "/((?!_next/static|_next/image|api/).*)",
      missing: [{ type: "host", value: "www\\.pyqvault\\.com" }],
    },
  ],
};
