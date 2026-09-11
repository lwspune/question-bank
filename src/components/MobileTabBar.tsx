"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Compass, Library, NotebookPen, Timer } from "lucide-react";
import { getActiveTab } from "@/lib/exam/examContext";
import {
  isMobileTabActive,
  resolveMobileTabs,
  type MobileTabId,
} from "@/lib/nav/mobileTabs";
import type { ExamNav } from "@/lib/exam/examNav";

/**
 * The phone navigation — five labelled tabs pinned to the bottom of the
 * viewport, below `sm` only. See `lib/nav/mobileTabs.ts` for why it is five and
 * why it never changes shape by role.
 *
 * ONE NAV AT EVERY WIDTH is the rule that keeps this from becoming two
 * competing menus: this is `sm:hidden` and PrimaryNav is `hidden sm:flex`, so
 * exactly one of them is ever displayed. Both are in the DOM, but the hidden
 * one is `display: none` and therefore out of the accessibility tree too, which
 * is why they can share the "Primary" label without ambiguity.
 *
 * Z-INDEX 40 is deliberate and matches the header. Radix overlays (Sheet,
 * Dialog) are z-50, so the browse filter sheet, the download dialog and the
 * cart sheet all cover this correctly with no change on their side.
 *
 * Rendered from HeaderBar rather than mounted separately, so the exam cookie
 * and session are resolved once for both navs — a second mount would repeat
 * HeaderBar's `/api/me/header` fetch on every page load.
 *
 * Being a child of AppHeader also means it is absent exactly where it should
 * be: the mock runner, the print pages, /login, /signup and /welcome render no
 * AppHeader at all, so none of them needs a special case here.
 */
const ICONS: Record<MobileTabId, typeof BookOpen> = {
  bank: Compass,
  guides: BookOpen,
  notes: NotebookPen,
  mock: Timer,
  board: Library,
};

export default function MobileTabBar({ nav }: { nav: ExamNav }) {
  const pathname = usePathname() ?? "/";
  const active = getActiveTab(pathname);
  const tabs = resolveMobileTabs(nav);

  return (
    <nav
      id="mobile-tab-bar"
      aria-label="Primary"
      // The inset keeps the tabs clear of the iOS home indicator; the bar's
      // own background extends underneath it so the strip isn't transparent.
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t bg-background sm:hidden"
    >
      {tabs.map(({ id, label, href }) => {
        const Icon = ICONS[id];
        const isActive = isMobileTabActive(id, active);
        return (
          <Link
            key={id}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={
              // 56px tall — comfortably past the 44px minimum touch target,
              // and at 360px each tab gets 72px of width.
              "flex h-14 flex-col items-center justify-center gap-0.5 text-[10px] font-medium leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring " +
              (isActive
                ? "text-brand-accent"
                : "text-muted-foreground active:bg-accent")
            }
          >
            <Icon className="h-5 w-5 shrink-0" aria-hidden />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
