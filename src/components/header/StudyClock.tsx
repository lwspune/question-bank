"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  FLUSH_EVERY_MS,
  TICK_SECS,
  addSeconds,
  claimUnassigned,
  pageKindFor,
  partialSecs,
  takeBatch,
  tickTarget,
  type ClockState,
  type StudyItem,
} from "@/lib/studyTime/clock";
import { onStudyQuestion, readStudyContext, resetStudyQuestion } from "@/lib/studyTime/clientStore";

const INTERACTIONS = ["pointerdown", "keydown", "wheel", "touchstart", "scroll"] as const;

/**
 * The study clock (2026-11-21; rules in lib/studyTime/clock.ts). Lives in the
 * header, beside the reading beacon, because the header is on every page and
 * knows in the browser whether anyone is signed in. Signed out it does
 * nothing. Renders nothing.
 *
 * Sends straight to Supabase (add_study_time) with the student's own token,
 * not through a route of ours: about 1,500 small calls a day at 2026-11
 * traffic, none of them a paid function call. keepalive lets the last one
 * finish as the tab closes. Best effort: a lost call loses at most two
 * minutes and is never shown to the student.
 */
export default function StudyClock({ signedIn }: { signedIn: boolean }) {
  const pathname = usePathname();
  const pathRef = useRef(pathname ?? "/");

  useEffect(() => {
    pathRef.current = pathname ?? "/";
    resetStudyQuestion();
  }, [pathname]);

  useEffect(() => {
    if (!signedIn) return;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anonKey) return;

    const sb = createSupabaseBrowserClient();
    let token: string | null = null;
    let live = true;
    sb.auth
      .getSession()
      .then(({ data }) => {
        if (live) token = data.session?.access_token ?? null;
      })
      .catch(() => {
        /* no token, nothing sent */
      });
    const { data: auth } = sb.auth.onAuthStateChange((_event, session) => {
      token = session?.access_token ?? null;
    });

    let items: StudyItem[] = [];
    let lastTickAt = Date.now();
    let lastFlushAt = Date.now();
    // Arriving on a page is an act: it usually follows a tap.
    let lastInteractionAt: number | null = Date.now();

    const stateNow = (visible: boolean): ClockState => {
      const ctx = readStudyContext();
      return {
        visible,
        lastInteractionAt,
        page: { kind: pageKindFor(pathRef.current), chapterId: ctx.chapterId },
        lastQuestion: ctx.lastQuestion,
      };
    };

    /** Credit the time since the last tick; `assumeVisible` on the way out of a tab. */
    const credit = (assumeVisible: boolean) => {
      const now = Date.now();
      const visible = assumeVisible || document.visibilityState === "visible";
      const target = tickTarget(stateNow(visible), now);
      if (target) items = addSeconds(items, target, partialSecs(lastTickAt, now));
      lastTickAt = now;
    };

    const flush = () => {
      lastFlushAt = Date.now();
      if (!token || items.length === 0) return;
      const { batch, rest } = takeBatch(items);
      items = rest;
      try {
        void fetch(`${url}/rest/v1/rpc/add_study_time`, {
          method: "POST",
          keepalive: true,
          headers: { apikey: anonKey, Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ p_items: batch }),
        }).catch(() => {
          /* best effort */
        });
      } catch {
        /* best effort */
      }
    };

    const interval = window.setInterval(() => {
      credit(false);
      if (Date.now() - lastFlushAt >= FLUSH_EVERY_MS) flush();
    }, TICK_SECS * 1000);

    const touched = () => {
      lastInteractionAt = Date.now();
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        credit(true);
        flush();
      } else {
        lastTickAt = Date.now();
        touched();
      }
    };
    const onPageHide = () => {
      if (document.visibilityState === "visible") credit(true);
      flush();
    };
    const offQuestion = onStudyQuestion((questionId) => {
      items = claimUnassigned(items, questionId);
    });

    for (const ev of INTERACTIONS) window.addEventListener(ev, touched, { passive: true, capture: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      live = false;
      credit(false);
      flush();
      window.clearInterval(interval);
      offQuestion();
      auth.subscription.unsubscribe();
      for (const ev of INTERACTIONS) window.removeEventListener(ev, touched, { capture: true });
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [signedIn]);

  return null;
}
