"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { launcherHiddenAfterScroll } from "@/lib/chat/launcherScroll";

/**
 * Phones only: tuck V's button away while the student scrolls down a page and
 * bring it back on any scroll up (UX_ACTION_PLAN.md A7). It used to sit over
 * card content on every page. Never while the chat is open. Shared by V's
 * launcher and its window (PAGE_WEIGHT_SPEC.md item 2), which draw one button.
 * The setter lets the window bring the button back when a reply lands.
 */
export function useLauncherTucked(open: boolean): readonly [boolean, Dispatch<SetStateAction<boolean>>] {
  const [tucked, setTucked] = useState(false);
  useEffect(() => {
    if (open) {
      setTucked(false);
      return;
    }
    const phone = window.matchMedia("(max-width: 639px)");
    let prevY = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setTucked((hidden) => (phone.matches ? launcherHiddenAfterScroll({ prevY, y, hidden }) : false));
        prevY = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [open]);
  return [tucked, setTucked] as const;
}
