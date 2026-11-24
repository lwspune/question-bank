"use client";

import { X } from "lucide-react";
import VFace from "./VFace";
import { V_WINDOW, V_WINDOW_HEADER } from "./chatStyles";

/**
 * V's window frame while the window itself loads (PAGE_WEIGHT_SPEC.md item 2):
 * the first open of a visit on a slow network. The same box and header band as
 * the window, so the tap never looks ignored and nothing jumps when it arrives.
 */
export default function VLoadingFrame({ onClose }: { onClose: () => void }) {
  return (
    <div role="dialog" aria-modal="true" aria-label="Chat with V" aria-busy="true" className={V_WINDOW}>
      <div className={V_WINDOW_HEADER}>
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/25">
            <VFace avatar="talk" className="h-8 w-8 object-contain" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-sans text-base font-semibold leading-tight">Ask V</p>
            <p className="truncate text-xs text-white/85">Your PYQ Vault study guide</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
      <div className="flex-1 space-y-3 px-4 py-4" aria-hidden>
        <div className="h-10 w-3/4 animate-pulse rounded-2xl bg-muted motion-reduce:animate-none" />
        <div className="h-10 w-1/2 animate-pulse rounded-2xl bg-muted motion-reduce:animate-none" />
      </div>
      <p className="sr-only" role="status">
        Opening V
      </p>
    </div>
  );
}
