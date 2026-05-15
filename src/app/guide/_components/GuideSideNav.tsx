"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SideNavItem = {
  href: string;
  label: string;
};

type Props = {
  guideTitle: string;
  items: SideNavItem[];
};

/**
 * Sticky vertical list of routes on desktop (left rail); chevron-triggered
 * Sheet on mobile. Active link computed from usePathname.
 */
export default function GuideSideNav({ guideTitle, items }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    // Exact match for the landing page; prefix match for sub-pages.
    if (href.endsWith("/nda-maths")) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const list = (
    <ul className="space-y-1">
      {items.map((item) => {
        const active = isActive(item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Mobile trigger */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            aria-label="Open guide navigation"
          >
            <Menu className="h-4 w-4" aria-hidden />
            Sections
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="border-b px-5 pb-4 pt-6">
            <SheetTitle>{guideTitle}</SheetTitle>
          </SheetHeader>
          <nav className="p-4">{list}</nav>
        </SheetContent>
      </Sheet>

      {/* Desktop rail */}
      <aside className="hidden lg:block">
        <div className="sticky top-20 space-y-3">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {guideTitle}
          </p>
          <nav>{list}</nav>
        </div>
      </aside>
    </>
  );
}
