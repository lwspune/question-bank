"use client";

import { useEffect, useState } from "react";
import { isSupabaseAuthCookieName } from "@/lib/auth-identity";
import type { HeaderSession } from "@/lib/header-session";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { createIdentityTracker } from "@/lib/viewer/identityTracker";

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
 * SIGN-IN AND SIGN-OUT ASK AGAIN (2026-11-16). Signing in on /login (password
 * or Google) and signing out from the menu both move on WITHOUT a page reload,
 * so a kept answer outlived the change: the header said "Sign in" after a sign-in
 * until the person refreshed, and kept their name after a sign-out. The hook now
 * listens to Supabase's auth events and, when the signed-in user changes
 * (createIdentityTracker), drops the kept answer, asks again and tells every
 * mounted hook. The server still re-checks on every route that matters; this
 * only keeps the chrome honest.
 */

let inFlight: Promise<HeaderSession | null> | null = null;

type Listener = (session: HeaderSession | null) => void;
const listeners = new Set<Listener>();

/** Be told whenever the viewer's identity is asked again. Returns the unsubscribe. */
export function subscribeViewerSession(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Drop the kept answer, ask again, and tell every subscriber. */
export async function refreshViewerSession(): Promise<HeaderSession | null> {
  inFlight = null;
  const session = await fetchViewerSession();
  for (const listener of listeners) listener(session);
  return session;
}

// One auth listener per page load, started by the first hook that mounts. The
// browser client is a singleton and UserMenu already ships it on every page, so
// this adds no bundle; for a signed-out visitor it reads cookies and makes no request.
let authWatchStarted = false;

function watchAuthChanges(): void {
  if (authWatchStarted) return;
  authWatchStarted = true;
  const tracker = createIdentityTracker();
  try {
    createSupabaseBrowserClient().auth.onAuthStateChange((_event, session) => {
      if (tracker.observe(session?.user?.id ?? null)) void refreshViewerSession();
    });
  } catch {
    // No browser client (missing env in a preview): the header keeps today's behaviour.
  }
}

/** A Supabase sign-in cookie is present (not proof of a live session; the server decides). */
export function hasAuthCookie(): boolean {
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
    const unsubscribe = subscribeViewerSession((session) => {
      if (active) setState({ session, loading: false });
    });
    watchAuthChanges();
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return state;
}

/** True only once identity has resolved AND the viewer holds an org_members row. */
export function useIsStaff(): { isStaff: boolean; loading: boolean } {
  const { session, loading } = useViewerSession();
  return { isStaff: !!session?.isStaff, loading };
}
