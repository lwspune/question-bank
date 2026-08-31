"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookMarked, BookOpen, Compass, FileText, Library, NotebookPen, Timer } from "lucide-react";
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
    <nav
      aria-label="Primary"
      className="flex min-w-0 shrink items-center gap-0.5 sm:gap-1"
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
              // Icon-only on phones (label hidden) so the tabs + account fit
              // at 360px; label returns from sm: up. Removing the exam pill
              // freed ~70px, which is what affords Mocks being unconditional.
              // (Papers only shows for org members, and Books only for a
              // superadmin — both skew desktop. A superadmin who is ALSO org
              // staff sees seven tabs, which is the widest this row ever gets:
              // ~264px of tabs at 360px. It shrinks rather than overflowing
              // (`min-w-0 shrink` on the nav), but that combination is the one
              // to check first if this row ever needs to lose something.)
              "group inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:px-3 sm:py-1.5 " +
              (isActive
                ? "bg-brand-accent/10 text-brand-accent"
                : "text-muted-foreground hover:bg-accent hover:text-foreground")
            }
          >
            <Icon className="h-4 w-4 shrink-0 sm:h-3.5 sm:w-3.5" aria-hidden />
            <span className="hidden sm:inline">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
