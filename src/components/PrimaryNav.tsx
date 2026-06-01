"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Compass, NotebookPen } from "lucide-react";
import { getActiveTab, type ActiveTab } from "@/lib/exam/examContext";

type Props = {
  bankHref: string;
  guidesHref: string;
  notesHref: string;
};

type Tab = {
  id: ActiveTab;
  label: string;
  href: string;
  Icon: typeof BookOpen;
};

export default function PrimaryNav({ bankHref, guidesHref, notesHref }: Props) {
  const pathname = usePathname() ?? "/";
  const active = getActiveTab(pathname);

  const tabs: Tab[] = [
    { id: "bank", label: "Bank", href: bankHref, Icon: Compass },
    { id: "guides", label: "Guides", href: guidesHref, Icon: BookOpen },
    { id: "notes", label: "Notes", href: notesHref, Icon: NotebookPen },
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
            className={
              "group inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:px-3 " +
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
