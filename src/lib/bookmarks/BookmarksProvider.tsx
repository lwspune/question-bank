"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type BookmarksContextValue = {
  /** True once the initial load (session + rows) has settled. */
  hydrated: boolean;
  /** Whether the current viewer is signed in (bookmarks require an account). */
  signedIn: boolean;
  has: (questionId: string) => boolean;
  /** Optimistic toggle; persists via /api/bookmarks. Throws on failure (reverted). */
  toggle: (questionId: string) => Promise<void>;
};

const BookmarksContext = createContext<BookmarksContextValue | null>(null);

/**
 * App-wide saved-questions state (migration 0047). Loads the signed-in user's
 * bookmark ids ONCE via the browser client (own-row RLS) so /browse cards don't
 * each round-trip; toggles are optimistic + persisted through the write API.
 * Anon viewers hydrate empty + `signedIn:false` (the button nudges sign-in).
 */
export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<Set<string>>(new Set());
  const [signedIn, setSignedIn] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    let active = true;

    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!active) return;
      if (!session) {
        setSignedIn(false);
        setHydrated(true);
        return;
      }
      setSignedIn(true);
      const { data } = await supabase.from("question_bookmarks").select("question_id");
      if (!active) return;
      setIds(new Set((data ?? []).map((r) => r.question_id as string)));
      setHydrated(true);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setSignedIn(Boolean(session));
      if (!session) setIds(new Set());
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const has = useCallback((questionId: string) => ids.has(questionId), [ids]);

  const toggle = useCallback(
    async (questionId: string) => {
      const currently = ids.has(questionId);
      const next = !currently;
      setIds((prev) => {
        const s = new Set(prev);
        if (next) s.add(questionId);
        else s.delete(questionId);
        return s;
      });
      try {
        const res = await fetch("/api/bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questionId, bookmarked: next }),
        });
        if (!res.ok) throw new Error(`Bookmark failed (${res.status})`);
      } catch (err) {
        // Revert the optimistic change.
        setIds((prev) => {
          const s = new Set(prev);
          if (currently) s.add(questionId);
          else s.delete(questionId);
          return s;
        });
        throw err;
      }
    },
    [ids]
  );

  const value = useMemo<BookmarksContextValue>(
    () => ({ hydrated, signedIn, has, toggle }),
    [hydrated, signedIn, has, toggle]
  );

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
}

export function useBookmarks(): BookmarksContextValue {
  const ctx = useContext(BookmarksContext);
  if (!ctx) throw new Error("useBookmarks must be used inside a <BookmarksProvider>");
  return ctx;
}
