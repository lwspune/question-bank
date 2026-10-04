"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { registerVSays, type VMessage } from "@/components/celebrate/celebrate";

/** How long V's bubble stays before it goes on its own. */
const SHOW_MS = 3000;

/**
 * V's speech bubble for celebrations (2026-10-04): "3 in a row on Probability!
 * Keep going.", "Smart! 80%+ got this wrong. You got it right." Rendered inside
 * ChatWidget's corner container, above the launcher, so it inherits V's
 * placement (hidden on the drill and the mock runner, lifted over /browse's
 * cart pill) and is unmounted while the chat panel is open — in all of those
 * cases celebrate() falls back to the toast.
 *
 * TAPS GO THROUGH. The bubble sits near the thumb and over the lower right of
 * the page for three seconds; only its close button catches a tap, so it can
 * never swallow a tap meant for the next question.
 *
 * The live region is always mounted so a screen reader hears each message.
 * While a message shows, `data-v-says="open"` on <html> tells VHello's tip to
 * step aside, so the two bubbles never stack in the same corner.
 */
export default function VSays() {
  const [message, setMessage] = useState<VMessage | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const unregister = registerVSays((m) => {
      if (timer.current) clearTimeout(timer.current);
      setMessage(m);
      timer.current = setTimeout(() => setMessage(null), SHOW_MS);
    });
    return () => {
      unregister();
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (message) root.dataset.vSays = "open";
    else delete root.dataset.vSays;
    return () => {
      delete root.dataset.vSays;
    };
  }, [message]);

  function close() {
    if (timer.current) clearTimeout(timer.current);
    setMessage(null);
  }

  return (
    <div role="status" aria-live="polite" className="pointer-events-none absolute bottom-full right-0 mb-3 w-[17rem] max-w-[calc(100vw-2rem)]">
      {message && (
        <div className="relative flex items-start gap-2.5 rounded-xl border border-input bg-background p-3 pr-9 text-sm shadow-lg motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2">
          {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized static asset, see ChatWidget's VFace */}
          <img src={`/chat/v-${message.face}.png`} alt="" aria-hidden className="h-9 w-9 shrink-0 rounded-full" />
          <p className="leading-snug text-foreground">
            <span className="font-semibold text-brand-accent">V: </span>
            {message.text}
          </p>
          <button
            type="button"
            onClick={close}
            aria-label="Close V's message"
            className="pointer-events-auto absolute right-1.5 top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
          {/* The bubble's tail, pointing down at V. */}
          <span aria-hidden className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-input bg-background" />
        </div>
      )}
    </div>
  );
}
