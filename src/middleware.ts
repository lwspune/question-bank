import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
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
  ],
};
