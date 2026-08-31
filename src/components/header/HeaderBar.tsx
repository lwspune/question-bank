"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserMenu from "@/components/UserMenu";
import ThemeToggle from "@/components/ThemeToggle";
import PrimaryNav from "@/components/PrimaryNav";
import {
  resolveExamNav,
  readExamSlugFromCookieString,
  type ExamIdMap,
} from "@/lib/exam/examNav";
import { type ExamSlug } from "@/lib/exam/examContext";
import { resolveHomeHref, type HeaderSession } from "@/lib/header-session";
import { isSupabaseAuthCookieName } from "@/lib/auth-identity";

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
  const [session, setSession] = useState<HeaderSession | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  useEffect(() => {
    setExamSlug(readExamSlugFromCookieString(document.cookie));
  }, []);

  useEffect(() => {
    // Anon short-circuit, mirroring the server helper: no Supabase cookie means
    // no session, so don't spend a request finding that out. Most visitors.
    const hasAuthCookie = document.cookie
      .split(";")
      .some((c) => isSupabaseAuthCookieName(c.trim().split("=")[0] ?? ""));
    if (!hasAuthCookie) {
      setSessionLoading(false);
      return;
    }

    let active = true;
    fetch("/api/me/header", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { session: null }))
      .catch(() => ({ session: null }))
      .then((data: { session: HeaderSession | null }) => {
        if (!active) return;
        setSession(data.session ?? null);
        setSessionLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const nav = resolveExamNav(examSlug, examIds);

  return (
    <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-3 sm:gap-3 sm:px-6">
      <Link
        href={resolveHomeHref(session)}
        className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight"
      >
        <BookOpen className="h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
        {/* Wordmark hides on narrow phones so the nav + account fit at 360px. */}
        <span className="hidden sm:inline">PYQ Vault</span>
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
              isSuperadmin={session.isSuperadmin}
            />
          </>
        ) : (
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Sign in</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
