"use client";

import { useEffect, useState } from "react";
import { isSupabaseAuthCookieName } from "@/lib/auth-identity";
import type { HeaderSession } from "@/lib/header-session";

/**
 * The viewer's identity, resolved in the BROWSER and shared by every client
 * component that needs it.
 *
 * WHY IT IS SHARED: `/board`, `/notes` and the 317 `/questions` landing pages
 * are ISR-cached and deliberately read no identity during server render — that
 * read is what once cost this site every prerendered page, and `/questions`
 * still hardcodes `isLoggedIn={false}` for the same reason. Anything that must
 * know "is this viewer org staff?" on one of those pages therefore has to ask
 * from the client. `/api/me/header` already answers exactly that question and
 * AppHeader already calls it on every page, so a second caller must NOT mean a
 * second request.
 *
 * Hence the module-level promise: the first caller on a page load starts the
 * fetch, every later caller awaits the same one. Client-side navigation keeps
 * the module alive, so a session is resolved once per full page load rather
 * than once per route.
 *
 * ANON PAYS NOTHING. The cookie short-circuit mirrors the server helper: no
 * Supabase auth cookie means no session, and the bulk of this site's traffic is
 * anonymous. Those visitors never issue the request at all.
 *
 * The cached value is not invalidated on sign-out within the same page load.
 * That is deliberate and safe for what this drives: staff-only chrome over
 * content that is already public on the page. Nothing gated on it reveals data
 * a stale `true` would leak — the server re-checks on every route that matters.
 */

let inFlight: Promise<HeaderSession | null> | null = null;

function hasAuthCookie(): boolean {
  try {
    return document.cookie
      .split(";")
      .some((c) => isSupabaseAuthCookieName(c.trim().split("=")[0] ?? ""));
  } catch {
    return false;
  }
}

/** Resolve the viewer's session, at most once per page load. */
export function fetchViewerSession(): Promise<HeaderSession | null> {
  if (inFlight) return inFlight;
  inFlight = (async () => {
    if (!hasAuthCookie()) return null;
    try {
      const res = await fetch("/api/me/header", { cache: "no-store" });
      if (!res.ok) return null;
      const data: { session: HeaderSession | null } = await res.json();
      return data.session ?? null;
    } catch {
      // Identity lookup must never throw into a render. Degrade to signed-out.
      return null;
    }
  })();
  return inFlight;
}

/** Test-only escape hatch: drop the memoised promise. */
export function resetViewerSessionCache(): void {
  inFlight = null;
}

export type ViewerSessionState = {
  session: HeaderSession | null;
  loading: boolean;
};

export function useViewerSession(): ViewerSessionState {
  const [state, setState] = useState<ViewerSessionState>({
    session: null,
    loading: true,
  });

  useEffect(() => {
    let active = true;
    fetchViewerSession().then((session) => {
      if (active) setState({ session, loading: false });
    });
    return () => {
      active = false;
    };
  }, []);

  return state;
}

/** True only once identity has resolved AND the viewer holds an org_members row. */
export function useIsStaff(): { isStaff: boolean; loading: boolean } {
  const { session, loading } = useViewerSession();
  return { isStaff: !!session?.isStaff, loading };
}
