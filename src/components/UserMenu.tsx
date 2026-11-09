"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Popover from "@radix-ui/react-popover";
import { BookMarked, BookOpen, Bookmark, GraduationCap, Building2, CreditCard, FileCheck2, FileText, LayoutDashboard, Lightbulb, LogOut, MessageSquarePlus, PenLine, ShieldCheck, TrendingUp, User, Target } from "lucide-react";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { totalsLine, type Pulse } from "@/lib/pulse/cache";
import { weeklyProgress } from "@/lib/goals/weekly";
import { examCountdownSentence } from "@/lib/exam/calendar";
import { drillHref } from "@/lib/drill/from";

export default function UserMenu({
  email,
  role,
  isStaff = false,
  isSuperadmin = false,
  pulse = null,
  guidesHref = "/guide",
  learnHref = "/learn",
}: {
  email: string;
  // null = signed-in student (no org membership).
  role: "ADMIN" | "TEACHER" | null;
  /** Holds an org_members row — same source PrimaryNav uses for the Papers tab. */
  isStaff?: boolean;
  isSuperadmin?: boolean;
  /** Due drill count + this week's study days (usePulse). Null until resolved,
   *  and then the badge and the two lines below render; nothing is shown for
   *  a zero due count, because an empty badge is noise. */
  pulse?: Pulse | null;
  /** The active exam's Guides link (lib/exam/examNav), for the phone-only Guides entry. */
  guidesHref?: string;
  /** The active exam's Learn course, or the Learn hub (lib/exam/examNav). */
  learnHref?: string;
}) {
  const router = useRouter();
  const due = pulse?.due ?? 0;
  // Unread replies to their feedback (migration 0243). Shown on the feedback
  // item, not on the avatar: the avatar's number is the mistakes to fix.
  const replies = pulse?.replies ?? 0;
  const week = pulse ? weeklyProgress(pulse.week.done, pulse.week.goal) : null;
  const exam = pulse?.exam ?? null;
  const totals = pulse?.totals ? totalsLine(pulse.totals) : null;
  const [signingOut, setSigningOut] = useState(false);

  async function onSignOut() {
    setSigningOut(true);
    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
      toast.success("Signed out");
      router.replace("/browse");
      router.refresh();
    } catch (err) {
      setSigningOut(false);
      toast.error(err instanceof Error ? err.message : "Sign-out failed");
    }
  }

  const initial = email.charAt(0).toUpperCase();

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          aria-label={menuLabel(due, replies)}
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-input bg-background text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span aria-hidden>{initial}</span>
          {due > 0 && (
            // The due queue, made visible. Capped at 99 so a heavy pool cannot
            // widen the badge past the avatar.
            <span
              aria-hidden
              className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold leading-none text-brand-foreground"
            >
              {due > 99 ? "99+" : due}
            </span>
          )}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={8}
          className="z-50 w-64 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <div className="border-b px-3 py-2">
            <p className="flex items-center gap-2 text-sm font-medium">
              <User className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
              <span className="truncate">{email}</span>
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {role ?? "Student"}
              {week && (
                <>
                  {" · "}
                  <span className={week.met ? "text-brand-accent" : undefined}>
                    This week {week.done} of {week.goal}
                  </span>
                </>
              )}
            </p>
            {totals && <p className="mt-0.5 truncate text-xs tabular-nums text-muted-foreground">{totals}</p>}
            {exam && (
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {examCountdownSentence({ ...exam, source: "calendar", exam: null, date: "" })}
              </p>
            )}
          </div>
          {isSuperadmin && (
            <Link
              href="/superadmin"
              className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
            >
              <ShieldCheck className="h-4 w-4 text-brand-accent" aria-hidden />
              Superadmin console
            </Link>
          )}
          {isSuperadmin && (
            <Link
              href="/superadmin/orgs"
              prefetch={false}
              className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
            >
              <Building2 className="h-4 w-4 text-brand-accent" aria-hidden />
              Organisations
            </Link>
          )}
          {/*
            Guides, Papers and Books are PHONE-ONLY entries (`sm:hidden`): from sm
            up they are tabs in PrimaryNav, and duplicating them here would give
            two answers to "where do I go?". Below sm they are deliberately not
            in the tab bar — that bar is a fixed five for every visitor, and
            Papers/Books are desktop work for ten staff against three hundred
            students. See lib/nav/mobileTabs.ts.

            BLOG IS THE ODD ONE AND THE GAP IS KNOWN. Papers and Books are
            role-gated, so their audience is always signed in and this menu
            always exists for them. Blog is PUBLIC, and this menu does not
            render for anon visitors at all — HeaderBar draws a "Sign in" button
            instead. So an anonymous phone reader reaches /blog only via the
            Footer link, which is on every page. Accepted deliberately rather
            than by oversight: the alternative is a sixth tab, and the five-tab
            cap is a measured constraint. Guides joined Blog here on 2026-10-28,
            when Learn took its tab for every visitor: same gap, same Footer link.
          */}
          <Link
            href={guidesHref}
            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none sm:hidden"
          >
            <BookOpen className="h-4 w-4" aria-hidden />
            Guides
          </Link>
          {/* Learn, at EVERY width: Homework took its tab in both navs on
              2026-11-04 (owner). Since 2026-11-08 this is Learn's only way in
              (the footer and board-chapter links went: few students used it). */}
          <Link
            href={learnHref}
            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
          >
            <GraduationCap className="h-4 w-4" aria-hidden />
            Learn
          </Link>
          {isStaff && (
            <Link
              href="/dashboard/papers"
              className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none sm:hidden"
            >
              <FileText className="h-4 w-4" aria-hidden />
              Papers
            </Link>
          )}
          {isSuperadmin && (
            <Link
              href="/books"
              className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none sm:hidden"
            >
              <BookMarked className="h-4 w-4" aria-hidden />
              Book editor
            </Link>
          )}
          {/* Not role-gated, and shown at EVERY width: Blog and About left
              PrimaryNav on 2026-11-02 (owner), so this menu and the Footer
              are where a signed-in reader finds them. */}
          <Link
            href="/blog"
            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
          >
            <PenLine className="h-4 w-4" aria-hidden />
            Blog
          </Link>
          <Link
            href="/about"
            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
          >
            <User className="h-4 w-4" aria-hidden />
            About
          </Link>
          {role === null && (
            <Link
              href="/me"
              className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
            >
              <LayoutDashboard className="h-4 w-4" aria-hidden />
              Dashboard
            </Link>
          )}
          <Link
            // prefetch off for the same reason as /performance below: building
            // a drill reads this student's whole answer history, and a prefetch
            // would run it for anyone who merely opened the menu.
            prefetch={false}
            href={drillHref("menu")}
            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
          >
            <Target className="h-4 w-4" aria-hidden />
            Fix your mistakes
            {due > 0 && (
              <span className="ml-auto rounded-full bg-brand/10 px-2 py-0.5 text-xs font-semibold tabular-nums text-brand-accent">
                {due} due
              </span>
            )}
          </Link>
          <Link
            // prefetch off: /progress opens /performance or /me/map, per-user
            // server renders (one behind a ~500 ms RPC), and a prefetch would
            // run them for anyone who merely opened this menu.
            prefetch={false}
            href="/progress"
            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
          >
            <TrendingUp className="h-4 w-4" aria-hidden />
            Your progress
          </Link>
          <Link
            href="/review?list=saved"
            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
          >
            <Bookmark className="h-4 w-4" aria-hidden />
            Saved questions
          </Link>
          <Link
            // prefetch off: a per-user server render, like /performance above.
            prefetch={false}
            href="/me/answer-sheets"
            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
          >
            <FileCheck2 className="h-4 w-4" aria-hidden />
            My answer sheets
          </Link>
          <Link
            href="/account"
            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
          >
            <CreditCard className="h-4 w-4" aria-hidden />
            Account &amp; access
          </Link>
          {/* Not role-gated and at every width: the features above this line
              are the ones 149 of 193 mock-takers never found. /start is the
              page that says what they are for. */}
          <Link
            href="/start"
            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
          >
            <Lightbulb className="h-4 w-4" aria-hidden />
            How it works
          </Link>
          {/* Every signed-in role: before this, the suggestion form lived only
              at the bottom of /me and was never used. */}
          <Link
            // prefetch off: /feedback is a per-user render, and opening this
            // menu should not run it for everyone.
            prefetch={false}
            href="/feedback"
            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
          >
            <MessageSquarePlus className="h-4 w-4" aria-hidden />
            Send feedback
            {replies > 0 && (
              <span className="ml-auto rounded-full bg-brand/10 px-2 py-0.5 text-xs font-semibold tabular-nums text-brand-accent">
                {replies === 1 ? "1 reply" : `${replies} replies`}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={onSignOut}
            disabled={signingOut}
            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none disabled:opacity-50"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            {signingOut ? "Signing out…" : "Sign out"}
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function menuLabel(due: number, replies: number): string {
  const parts = [
    due > 0 ? `${due} questions to fix` : null,
    replies > 0 ? (replies === 1 ? "1 reply to your feedback" : `${replies} replies to your feedback`) : null,
  ].filter(Boolean);
  return parts.length ? `Open user menu, ${parts.join(", ")}` : "Open user menu";
}
