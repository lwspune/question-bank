"use client";

import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";

/**
 * A one-line row on Home with a "Know more" button that opens a panel on the
 * same page (owner, 2026-11-15, approved mockup: Vault Points and Invite a
 * friend each took a full card). The panel opens like V's chat and the repeat
 * line's panel: the whole screen on a phone, the right side from sm up. The
 * close button, Esc and Back all return the student to Home.
 */
export default function InfoRowPanel({
  id,
  icon,
  label,
  title,
  subtitle,
  open,
  onOpenChange,
  children,
}: {
  /** The row's anchor (the avatar menu links to /me#invite). */
  id?: string;
  icon: ReactNode;
  label: string;
  title: string;
  subtitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-label={title} className="scroll-mt-20 rounded-xl border bg-card">
      <div className="flex items-center gap-2 px-4 py-2">
        <span className="shrink-0" aria-hidden>
          {icon}
        </span>
        <span className="min-w-0 truncate text-sm font-semibold">{label}</span>
        <button
          type="button"
          onClick={() => onOpenChange(true)}
          aria-label={`Know more about ${title}`}
          className="ml-auto inline-flex min-h-11 shrink-0 items-center gap-0.5 whitespace-nowrap rounded-sm text-sm font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Know more
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="flex flex-col gap-0 p-0 sm:max-w-[30rem]"
          closeClassName="right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white opacity-100 focus:ring-white"
        >
          <div className="hero-brand flex shrink-0 items-center gap-3 px-4 pb-3 pr-16 pt-[max(0.75rem,env(safe-area-inset-top))] font-sans sm:pt-3">
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/25" aria-hidden>
              {icon}
            </span>
            <div className="min-w-0">
              <SheetTitle className="truncate text-base font-semibold leading-tight text-white">{title}</SheetTitle>
              <SheetDescription className="truncate text-xs text-white/85">{subtitle}</SheetDescription>
            </div>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto bg-background px-4 py-5 font-sans">{children}</div>
        </SheetContent>
      </Sheet>
    </section>
  );
}
