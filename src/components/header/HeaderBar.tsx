"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserMenu from "@/components/UserMenu";
import ThemeToggle from "@/components/ThemeToggle";
import PrimaryNav from "@/components/PrimaryNav";
import MobileTabBar from "@/components/MobileTabBar";
import {
  resolveExamNav,
  readExamSlugFromCookieString,
  type ExamIdMap,
} from "@/lib/exam/examNav";
import { type ExamSlug } from "@/lib/exam/examContext";
import { resolveHomeHref } from "@/lib/header-session";
import { useViewerSession } from "@/lib/viewer/useViewerSession";
import { usePulse } from "@/lib/viewer/usePulse";

/**
 * The whole per-visitor half of the site header, resolved in the BROWSER.
 *
 * Why: AppHeader is on every page, and it used to resolve the session and read
 * the `qb_exam` cookie during server render. Both are per-request operations, so
 * Next refused to cache any page on the site — 77 notes chapters, 10 guides, the
 * homepage and the new landing pages all carried a `revalidate` that could never
 * take effect, and every visit paid for a full server render.
 *
 * Moving this here means the server-rendered HTML contains NO user data and NO
 * cookie-dependent output, so it is safe to build once and hand to everyone.
 * That is a correctness requirement, not just an optimisation: a cached page
 * containing one visitor's email would serve it to the next visitor.
 *
 * The only thing still resolved on the server is `examIds`, which is public
 * taxonomy identical for every visitor — see examIdMap.ts.
 */
export default function HeaderBar({ examIds }: { examIds: ExamIdMap }) {
  // Start at null (= no exam chosen) so the server HTML and the first client
  // render agree (no hydration mismatch); the cookie is applied immediately
  // after. Null is also the resting state for every anonymous visitor, since
  // only /welcome and /account write the cookie now.
  const [examSlug, setExamSlug] = useState<ExamSlug | null>(null);

  useEffect(() => {
    setExamSlug(readExamSlugFromCookieString(document.cookie));
  }, []);

  // The identity fetch (anon cookie short-circuit included) moved to
  // useViewerSession so the header is no longer its only possible caller: the
  // classroom-projection button needs the same `isStaff` on ISR-cached pages
  // that hold no server identity. The hook memoises one request per page load,
  // so adding that caller costs nothing here.
  const { session, loading: sessionLoading } = useViewerSession();

  // The due-drill count + weekly sittings, for the avatar badge. Fetched only
  // once a session exists (anon pays nothing) and cached for ten minutes —
  // see usePulse. It goes on the AVATAR rather than a new nav tab because the
  // audience is on phones, where the tab bar is a fixed five and the header
  // is brand + theme + avatar; a badge there is the one place a count fits at
  // every width without adding chrome.
  const pulse = usePulse(!!session);

  const nav = resolveExamNav(examSlug, examIds);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-3 sm:gap-3 sm:px-6">
          <Link
            href={resolveHomeHref(session)}
            className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight"
          >
            <BookOpen className="h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
            {/* The wordmark used to hide below sm so the icon row could fit; the nav
                has moved to MobileTabBar, so there is room for it again. */}
            <span>PYQ Vault</span>
          </Link>

          <PrimaryNav
            bankHref={nav.bankHref}
            guidesHref={nav.guidesHref}
            notesHref={nav.notesHref}
            boardHref={nav.boardHref}
            showPapers={!!session?.isStaff}
            showBooks={!!session?.isSuperadmin}
          />

          <div className="ml-auto flex min-w-0 items-center gap-1.5 sm:gap-2">
            {/* Theme toggle is visible to everyone, anon included. */}
            <ThemeToggle />
            {sessionLoading ? (
              // Fixed-size placeholder so the row doesn't jump when identity lands.
              <div
                className="h-9 w-9 shrink-0 rounded-full bg-muted/60"
                aria-hidden
              />
            ) : session ? (
              <>
                {/* Org chip only for org members; hidden below md so brand + nav
                    + avatar all fit. */}
                {session.orgName && (
                  <span
                    className="hidden max-w-[12rem] truncate text-xs text-muted-foreground md:inline md:max-w-none"
                    title={session.orgName}
                  >
                    {session.orgName}
                  </span>
                )}
                <UserMenu
                  email={session.email}
                  role={session.role}
                  isStaff={session.isStaff}
                  isSuperadmin={session.isSuperadmin}
                  pulse={pulse}
                />
              </>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link href="/login">Sign in</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Phone navigation. Rendered here so both navs share one resolution of
          the exam cookie and the session — see MobileTabBar. */}
      <MobileTabBar nav={nav} />
    </>
  );
}
