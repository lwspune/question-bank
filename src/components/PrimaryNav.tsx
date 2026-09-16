"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookMarked, BookOpen, Compass, FileText, Library, NotebookPen, PenLine, Timer, User } from "lucide-react";
import { getActiveTab, type ActiveTab } from "@/lib/exam/examContext";

type Props = {
  bankHref: string;
  guidesHref: string;
  notesHref: string;
  boardHref: string;
  /** Org members (ADMIN/TEACHER) get the Papers tab; everyone else doesn't —
   *  /dashboard/papers redirects non-members to /login, so showing it to anon
   *  or students would dead-end them. */
  showPapers?: boolean;
  /** Superadmins get the Books tab; /books requires superadmin, so showing it
   *  to anyone else would dead-end them. The gate is chrome — the real
   *  boundary is requireSuperadmin() on the pages themselves. */
  showBooks?: boolean;
};

type Tab = {
  id: ActiveTab;
  label: string;
  href: string;
  Icon: typeof BookOpen;
};

export default function PrimaryNav({
  bankHref,
  guidesHref,
  notesHref,
  boardHref,
  showPapers = false,
  showBooks = false,
}: Props) {
  const pathname = usePathname() ?? "/";
  const active = getActiveTab(pathname);

  const tabs: Tab[] = [
    { id: "bank", label: "Bank", href: bankHref, Icon: Compass },
    { id: "guides", label: "Guides", href: guidesHref, Icon: BookOpen },
    { id: "notes", label: "Notes", href: notesHref, Icon: NotebookPen },
    // Mocks — always visible, like Board. It used to be gated on the active
    // exam's `hasMocks`, which hid a working page for 11 of 13 exam states:
    // /mock lists EVERY published mock (its own breadcrumb reads "All exams")
    // and its left rail does the per-exam scoping, so an unscoped tab can't
    // dead-end anyone. `hasMocks` still drives that rail — see mocksNav.ts.
    { id: "mock", label: "Mocks", href: "/mock", Icon: Timer },
    // Board reader — always visible (like Notes); boardHref resolves per-exam:
    // /board (index) normally, /board/<slug> when a board exam is active.
    { id: "board", label: "Board", href: boardHref, Icon: Library },
    // Blog — public, so it sits with the open surfaces rather than after the
    // role-gated pair below. It has no phone tab: MobileTabBar is a fixed five
    // (lib/nav/mobileTabs.ts), so below sm it appears in the account menu, the
    // same place Papers and Books go.
    { id: "blog", label: "Blog", href: "/blog", Icon: PenLine },
    // About — public, and last of the public tabs because it is an identity
    // page, not a place you go to study. Same phone story as Blog: no tab in
    // the fixed-five MobileTabBar, so below sm it lives in the account menu
    // and, for anon visitors, the Footer.
    { id: "about", label: "About", href: "/about", Icon: User },
    ...(showBooks
      ? [
          {
            id: "books" as const,
            label: "Books",
            href: "/books",
            Icon: BookMarked,
          },
        ]
      : []),
    ...(showPapers
      ? [
          {
            id: "papers" as const,
            label: "Papers",
            href: "/dashboard/papers",
            Icon: FileText,
          },
        ]
      : []),
  ];

  return (
    // Tablet and desktop only. Below sm the phone bar (MobileTabBar) takes
    // over, so exactly one nav is ever displayed — which is also why both can
    // carry the "Primary" label without ambiguity.
    <nav
      aria-label="Primary"
      className="hidden min-w-0 shrink items-center gap-1 sm:flex"
    >
      {tabs.map(({ id, label, href, Icon }) => {
        const isActive = active === id;
        return (
          <Link
            key={id}
            href={href}
            aria-current={isActive ? "page" : undefined}
            aria-label={label}
            className={
              // Labels are unconditional here: this nav no longer renders on a
              // phone, so there is nothing to win by hiding them. It used to go
              // icon-only below sm, which left every mobile visitor decoding
              // glyphs — Bank as a compass, and three book-ish icons in a row.
              // That is what MobileTabBar exists to fix.
              "group inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
              (isActive
                ? "bg-brand-accent/10 text-brand-accent"
                : "text-muted-foreground hover:bg-accent hover:text-foreground")
            }
          >
            <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
