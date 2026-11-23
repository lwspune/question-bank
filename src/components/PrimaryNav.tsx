"use client";

import Link from "next/link";
import { usePublicPathname } from "@/lib/nav/usePublicPathname";
import { BookMarked, BookOpen, CalendarDays, Compass, FileText, Library, NotebookPen, Target, Timer } from "lucide-react";
import { getActiveTab, type ActiveTab } from "@/lib/exam/examContext";
import { FIX_TAB_HREF, type FifthTab } from "@/lib/nav/fifthTab";

type Props = {
  bankHref: string;
  notesHref: string;
  mockHref: string;
  boardHref: string;
  /** The exam's homework page, or every plan when no exam is chosen (lib/exam/examNav). */
  homeworkHref: string;
  /** Board, or Fix for a graduate student (lib/nav/fifthTab). Default Board. */
  fifth?: FifthTab;
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
  /** False for a page built fresh per student, so it is not loaded on every page view. */
  prefetch?: false;
};

export default function PrimaryNav({
  bankHref,
  notesHref,
  mockHref,
  boardHref,
  homeworkHref,
  fifth = "board",
  showPapers = false,
  showBooks = false,
}: Props) {
  const pathname = usePublicPathname();
  const active = getActiveTab(pathname);

  const tabs: Tab[] = [
    { id: "bank", label: "PYQs", href: bankHref, Icon: Compass },
    // Guides left this nav for the avatar menu at every width (owner,
    // 2026-11-18): the tabs ran under Ebooks, Classes and Play on a ~1000 px
    // smart board. Signed-out readers reach it from the Footer, as on a phone.
    { id: "notes", label: "Notes", href: notesHref, Icon: NotebookPen },
    // Homework took Learn's place at every width (owner, 2026-11-04); Learn is
    // in the account menu. See lib/nav/mobileTabs.
    { id: "homework", label: "Homework", href: homeworkHref, Icon: CalendarDays },
    // Mocks — always visible, like Board. It used to be gated on the active
    // exam's `hasMocks`, which hid a working page for 11 of 13 exam states.
    // mockHref is the exam's own catalogue when it has mocks, else /mock, which
    // lists every published mock — so the tab can't dead-end anyone.
    { id: "mock", label: "Mocks", href: mockHref, Icon: Timer },
    // Board reader — boardHref resolves per-exam: /board (index) normally,
    // /board/<slug> when a board exam is active. A graduate student gets Fix
    // (/drill) in this slot instead, never both: see lib/nav/fifthTab.
    fifth === "fix"
      ? { id: "fix", label: "Fix", href: FIX_TAB_HREF, Icon: Target, prefetch: false }
      : { id: "board", label: "Board", href: boardHref, Icon: Library },
    // Blog and About left this nav on 2026-11-02 (owner): they are not places
    // you go to study, and they crowded the study tabs. Both are in the Footer
    // on every page and in the account menu at every width.
    ...(showBooks
      ? [
          {
            id: "books" as const,
            // "Book editor", not "Books": the public store's button is "Store".
            label: "Book editor",
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
    // overflow-x-auto (2026-11-18): when the tabs still do not fit, they
    // scroll inside this strip instead of painting under the buttons beside
    // it. The scrollbar is hidden; py-1/px-1 leave room for the focus ring,
    // which an overflow box would otherwise clip.
    <nav
      aria-label="Primary"
      className="hidden min-w-0 shrink items-center gap-1 overflow-x-auto px-1 py-1 [scrollbar-width:none] sm:flex [&::-webkit-scrollbar]:hidden"
    >
      {tabs.map(({ id, label, href, Icon, prefetch }) => {
        const isActive = active === id;
        return (
          <Link
            key={id}
            href={href}
            prefetch={prefetch}
            aria-current={isActive ? "page" : undefined}
            aria-label={label}
            className={
              // Labels are unconditional here: this nav no longer renders on a
              // phone, so there is nothing to win by hiding them. It used to go
              // icon-only below sm, which left every mobile visitor decoding
              // glyphs — Bank as a compass, and three book-ish icons in a row.
              // That is what MobileTabBar exists to fix.
              "group inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1.5 text-sm xl:px-3 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
              (isActive
                ? // A solid fill, not the old 10% tint: students could not
                  // tell which tab they were on (owner, 2026-10-15).
                  "bg-brand text-brand-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-foreground")
            }
          >
            {/* Words carry the meaning; the icon shows only from 2xl, where
                there is room (2026-11-18). */}
            <Icon className="hidden h-3.5 w-3.5 shrink-0 2xl:block" aria-hidden />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
