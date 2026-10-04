"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useSignedIn } from "@/components/auth/useSignedIn";
import { useRevealedIds } from "@/components/reveal/useRevealMeter";
import { trackFunnel } from "@/lib/analytics/trackFunnel";
import { shouldGreet, type Hello, type HelloSurface } from "@/lib/growth/secondPage";

/** Set once this device has seen the hello. Per-device convenience only. */
const STORAGE_KEY = "qb_v_hello_seen";

function readSeen(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    // Storage blocked: treat as seen, so a visitor we cannot remember is never
    // greeted on every page.
    return true;
  }
}

function markSeen() {
  try {
    window.localStorage.setItem(STORAGE_KEY, new Date().toISOString());
  } catch {
    /* blocked storage: readSeen already returns true */
  }
}

/** How many answers this device had revealed before this page (useRevealMeter's key). */
function readRevealedCount(): number {
  try {
    const ids = JSON.parse(window.localStorage.getItem("qb_revealed") ?? "[]");
    return Array.isArray(ids) ? ids.length : 0;
  } catch {
    return 0;
  }
}

/** V's chat panel is open (ChatWidget renders it with this label). */
function chatOpen(): boolean {
  return document.querySelector('[role="dialog"][aria-label="Chat with V"]') !== null;
}

/**
 * V's one-time hello: a small speech bubble above V's launcher with one next
 * step for this page. Shown to a signed-out visitor once per device, only after
 * interest (reveals on this page, or time plus a scroll), never on arrival, and
 * never over the content. Rules: lib/growth/secondPage.ts. Growth registry:
 * "second-page".
 */
export default function VHello({ hello, surface }: { hello: Hello | null; surface: HelloSurface }) {
  const { signedIn, loading } = useSignedIn();
  const revealed = useRevealedIds();
  const baseline = useRef<number | null>(null);
  const [open, setOpen] = useState(false);
  const decided = useRef(false);

  // Reveals made on THIS page: the store's size now, minus its size on arrival.
  // The arrival count is read from storage after mount, not from the store's
  // first render, which is the empty server snapshot during hydration.
  useEffect(() => {
    baseline.current = readRevealedCount();
  }, []);
  const revealsThisVisit =
    baseline.current === null ? 0 : Math.max(0, revealed.length - baseline.current);
  const latest = useRef({ signedIn, loading, revealsThisVisit });
  latest.current = { signedIn, loading, revealsThisVisit };

  useEffect(() => {
    if (!hello) return;
    const start = Date.now();
    let scrolled = false;
    const onScroll = () => {
      if (window.scrollY > 200) scrolled = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      if (decided.current) return;
      const s = latest.current;
      const greet = shouldGreet({
        signedIn: s.signedIn,
        authLoading: s.loading,
        alreadyGreeted: readSeen(),
        chatOpen: chatOpen(),
        bottomBarOpen: document.documentElement.dataset.bottomBar === "open",
        revealsThisVisit: s.revealsThisVisit,
        secondsOnPage: (Date.now() - start) / 1000,
        scrolled,
      });
      if (!greet) return;
      decided.current = true;
      markSeen();
      setOpen(true);
      trackFunnel("v_hello_shown", { surface, target: hello.target });
    };
    const timer = window.setInterval(tick, 1000);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [hello, surface]);

  // Step aside if the chat opens, the notes test bar slides up, or V's
  // celebration bubble (VSays) takes the corner.
  useEffect(() => {
    if (!open) return;
    const timer = window.setInterval(() => {
      const root = document.documentElement.dataset;
      if (chatOpen() || root.bottomBar === "open" || root.vSays === "open") setOpen(false);
    }, 500);
    return () => window.clearInterval(timer);
  }, [open]);

  if (!open || !hello) return null;
  return (
    // Sits above V's launcher (same corner offset, lifted by the launcher's
    // height), so it never covers the questions.
    <div className="chat-launcher-offset fixed right-4 z-50 mb-16 w-[17rem] max-w-[calc(100vw-2rem)] print:hidden">
      <div
        role="status"
        aria-label="A tip from V"
        className="relative rounded-lg border border-input bg-background p-3 pr-9 text-sm shadow-lg motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2"
      >
        <Link
          href={hello.href}
          onClick={() => trackFunnel("v_hello_click", { surface, target: hello.target })}
          className="block rounded-sm text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span className="font-semibold text-brand-accent">V: </span>
          {hello.text}
        </Link>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close V's tip"
          className="absolute right-1.5 top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
        {/* The bubble's tail, pointing down at V. */}
        <span
          aria-hidden
          className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-input bg-background"
        />
      </div>
    </div>
  );
}
