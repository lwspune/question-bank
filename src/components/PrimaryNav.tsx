"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Compass, FileText, Library, NotebookPen } from "lucide-react";
import { getActiveTab, type ActiveTab } from "@/lib/exam/examContext";

type Props = {
  bankHref: string;
  guidesHref: string;
  notesHref: string;
  boardHref: string;
  /** The active exam is a school board — surfaces the "Board" reader tab. */
  showBoard?: boolean;
  /** Org members (ADMIN/TEACHER) get the Papers tab; everyone else doesn't —
   *  /dashboard/papers redirects non-members to /login, so showing it to anon
   *  or students would dead-end them. */
  showPapers?: boolean;
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
  showBoard = false,
  showPapers = false,
}: Props) {
  const pathname = usePathname() ?? "/";
  const active = getActiveTab(pathname);

  const tabs: Tab[] = [
    { id: "bank", label: "Bank", href: bankHref, Icon: Compass },
    { id: "guides", label: "Guides", href: guidesHref, Icon: BookOpen },
    { id: "notes", label: "Notes", href: notesHref, Icon: NotebookPen },
    // Board reader — only for school-board exams (textbook, book-faithful view).
    ...(showBoard
      ? [{ id: "board" as const, label: "Board", href: boardHref, Icon: Library }]
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
              // Icon-only on phones (label hidden) so the tabs + exam pill +
              // account fit at 360px; label returns from sm: up. (Papers only
              // shows for org members, who skew desktop.)
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
