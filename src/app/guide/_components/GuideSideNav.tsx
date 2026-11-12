"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sideNavSegments, type SideNavGroup } from "@/lib/nav/sideNavGroups";

export type SideNavItem = {
  href: string;
  label: string;
  /** Other routes that light this item up — a collapsed exam family's link
   *  stays active on each member exam's own page (/mock). */
  alsoActive?: string[];
  /** A heading to list this item under (2026-11-04, /homework's exams). Items
   *  without one render as before; see lib/nav/sideNavGroups. */
  group?: SideNavGroup;
};

type Props = {
  guideTitle: string;
  items: SideNavItem[];
  /** The "landing" route — uses exact-match for active state so it doesn't
   *  light up on every sub-route. Defaults to the first item's href, which
   *  matches the convention that Overview is always the first nav entry. */
  landingHref?: string;
  /** The phone button's label; "Sections" unless the list is something else
   *  (the mock pages list exams). */
  sheetLabel?: string;
};

/**
 * The guide's section links in two places, one list: a "Sections" button that
 * opens a Sheet below `lg` (GuideSideNavSheet, placed in the breadcrumb row by
 * GuideShell since 2026-11-10, so it no longer takes a full-width row above
 * the page), and a sticky left rail from `lg` up (GuideSideNavRail).
 */
function NavList({
  items,
  landingHref,
  onNavigate,
}: {
  items: SideNavItem[];
  landingHref?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const landing = landingHref ?? items[0]?.href;

  const isActive = (href: string) => {
    // Exact match for the landing page; prefix match for sub-pages.
    if (href === landing) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const link = (item: SideNavItem) => {
    const active = isActive(item.href) || (item.alsoActive ?? []).some(isActive);
    return (
      <li key={item.href}>
        <Link
          href={item.href}
          onClick={onNavigate}
          className={cn(
            "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
            active
              ? "bg-brand/10 text-brand-accent"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
          aria-current={active ? "page" : undefined}
        >
          {item.label}
        </Link>
      </li>
    );
  };

  return (
    <ul className="space-y-1">
      {sideNavSegments(items).map((seg, i) =>
        seg.group ? (
          <li key={`group-${seg.group.label}`} className={i > 0 ? "pt-3" : undefined}>
            {seg.group.href ? (
              <Link
                href={seg.group.href}
                onClick={onNavigate}
                className="block rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {seg.group.label}
              </Link>
            ) : (
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground">{seg.group.label}</p>
            )}
            <ul className="mt-1 space-y-1 border-l pl-2 ml-3">{seg.items.map(link)}</ul>
          </li>
        ) : (
          seg.items.map(link)
        )
      )}
    </ul>
  );
}

/** Below `lg`: a small "Sections" button that opens the list in a Sheet. */
export function GuideSideNavSheet({ guideTitle, items, landingHref, sheetLabel = "Sections" }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 shrink-0 rounded-full px-3 lg:hidden">
          <Menu className="h-4 w-4" aria-hidden />
          {sheetLabel}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b px-5 pb-4 pt-6">
          <SheetTitle>{guideTitle}</SheetTitle>
        </SheetHeader>
        <nav className="p-4">
          <NavList items={items} landingHref={landingHref} onNavigate={() => setOpen(false)} />
        </nav>
      </SheetContent>
    </Sheet>
  );
}

/** From `lg` up: the sticky left rail. */
export function GuideSideNavRail({ guideTitle, items, landingHref }: Props) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20 space-y-3">
        <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {guideTitle}
        </p>
        <nav>
          <NavList items={items} landingHref={landingHref} />
        </nav>
      </div>
    </aside>
  );
}
