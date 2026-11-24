"use client";

import type { CSSProperties, ReactNode, RefObject } from "react";
import { X } from "lucide-react";
import type { LauncherBadge } from "@/lib/chat/launcher";
import VSays from "./VSays";
import VFace from "./VFace";

type Props = {
  open: boolean;
  label: string;
  tucked: boolean;
  badge: LauncherBadge | null;
  /** /browse's cart pill is showing: V sits above it. */
  aboveCart: boolean;
  onClick: () => void;
  /** First touch, hover or focus: V's launcher starts loading the window here (PAGE_WEIGHT_SPEC.md item 2). */
  onWarm?: () => void;
  buttonRef?: RefObject<HTMLButtonElement>;
  /** The window (or the frame drawn while it loads), above the button. */
  children?: ReactNode;
};

/**
 * V's corner: the round button, its badge and V's celebration bubble. Drawn by
 * V's small launcher before the window has loaded and by the window after, so
 * the button never changes when one takes over from the other
 * (PAGE_WEIGHT_SPEC.md item 2, 2026-11-24).
 */
export default function VLauncher({ open, label, tucked, badge, aboveCart, onClick, onWarm, buttonRef, children }: Props) {
  // Vertical position lives in globals.css (.chat-launcher-offset): clear of
  // MobileTabBar below sm, and raised by --v-lift over /browse's cart pill.
  const lift = { "--v-lift": aboveCart ? "3.5rem" : "0px" } as CSSProperties;
  return (
    <div className="chat-launcher-offset fixed right-4 z-50 print:hidden" style={lift}>
      {children}
      {/* Celebrations, in V's voice (2026-10-04). Unmounted while the chat is
          open, so celebrate() falls back to the toast then. */}
      {!open && <VSays />}
      <button
        ref={buttonRef}
        type="button"
        onClick={onClick}
        onPointerEnter={onWarm}
        onTouchStart={onWarm}
        onFocus={onWarm}
        aria-label={label}
        aria-expanded={open}
        title="Chat with V"
        tabIndex={tucked ? -1 : undefined}
        className={`relative ml-auto ${open ? "hidden" : "flex"} h-11 w-11 items-center justify-center rounded-full bg-background shadow-lg transition-[transform,opacity] duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none sm:h-14 sm:w-14 ${
          tucked ? "pointer-events-none translate-y-[160%] opacity-0" : ""
        }`}
      >
        {open ? (
          <X className="h-5 w-5 text-foreground" aria-hidden />
        ) : (
          <VFace avatar="idle" className="h-9 w-9 object-contain sm:h-12 sm:w-12" />
        )}
        {/* What waits inside V (lib/chat/launcher): unread replies in the brand
            colour, as before; otherwise a red count of the "Your day" card
            (2026-11-20, was a 12 px blue dot that read as decoration) and a
            gift (2026-11-21), the way a phone marks something new. red-600
            under white text is 4.8:1. */}
        {badge && (
          <span
            aria-hidden
            className={`absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-semibold leading-none ring-2 ring-background ${
              badge.tone === "reply" ? "bg-brand text-brand-foreground" : "bg-red-600 text-white"
            }`}
          >
            {badge.count > 9 ? "9+" : badge.count}
          </span>
        )}
      </button>
    </div>
  );
}
