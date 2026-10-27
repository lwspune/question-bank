"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gem, GraduationCap, ShoppingBag } from "lucide-react";
import { trackFunnel } from "@/lib/analytics/trackFunnel";
import SignInLink from "@/components/reveal/SignInLink";
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
import { fifthTabFor } from "@/lib/nav/fifthTab";
import ReadingBeacon from "./ReadingBeacon";

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
export default function HeaderBar({
  examIds,
  notesExamSlugs,
  soleGuides,
}: {
  examIds: ExamIdMap;
  /** Exams with shipped notes — public, identical for everyone, from AppHeader. */
  notesExamSlugs: ExamSlug[];
  /** Exam → its only subject guide, from AppHeader (same reasoning). */
  soleGuides: Partial<Record<ExamSlug, string>>;
}) {
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

  const nav = resolveExamNav(examSlug, examIds, notesExamSlugs, soleGuides);
  // Board, or Fix for a graduate student. Board until the session arrives, so
  // the cached HTML is the same for everyone (see lib/nav/fifthTab).
  const fifth = fifthTabFor(session);

  return (
    <>
      <ReadingBeacon signedIn={!!session} />
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-3 sm:gap-3 sm:px-6">
          <Link
            href={resolveHomeHref(session)}
            className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight"
          >
            {/* The brand V (public/icons/mark-96.png, built by
                scripts/brand/build_icons.py). A plain <img>, not next/image:
                the repo uses no image optimisation, and this is a ~10 KB static
                file. Decorative: the wordmark beside it names the link. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/mark-96.png" alt="" aria-hidden width={24} height={24} className="h-6 w-6 shrink-0" />
            {/* The wordmark used to hide below sm so the icon row could fit; the nav
                has moved to MobileTabBar, so there is room for it again. */}
            <span>PYQ Vault</span>
            {/* The Premium Pass mark (2026-10-21). Drawn only once the session
                lands, so the cached HTML stays the same for everyone. Part of
                the brand link, not a link of its own; /account shows the pass. */}
            {session?.hasPass && (
              <span className="inline-flex shrink-0 items-center" title="Premium Pass">
                <Gem className="h-4 w-4 text-brand-accent" aria-hidden />
                <span className="sr-only">Premium Pass</span>
              </span>
            )}
          </Link>

          <PrimaryNav
            bankHref={nav.bankHref}
            guidesHref={nav.guidesHref}
            notesHref={nav.notesHref}
            mockHref={nav.mockHref}
            boardHref={nav.boardHref}
            learnHref={nav.learnHref}
            fifth={fifth}
            showPapers={!!session?.isStaff}
            showBooks={!!session?.isSuperadmin}
          />

          <div className="ml-auto flex min-w-0 items-center gap-1.5 sm:gap-2">
            {/* The ebook store (2026-10-20): its own button, apart from the study
                tabs, at every width (owner: "a separate buy section on top"). */}
            <StoreLink />
            {/* 1:1 tutoring interest check (2026-10-27), beside the store. */}
            <TutorLink />
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
                <SignInLink variant="header">Sign in</SignInLink>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Phone navigation. Rendered here so both navs share one resolution of
          the exam cookie and the session — see MobileTabBar. */}
      <MobileTabBar nav={nav} fifth={fifth} />
    </>
  );
}

/** The header's outlined buttons (Ebooks, Tutor); filled when you are on their page. */
function headerButtonClass(active: boolean): string {
  return (
    "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md border px-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
    (active ? "border-brand bg-brand text-brand-foreground" : "border-brand/40 text-brand-accent hover:bg-brand/10")
  );
}

function StoreLink() {
  const pathname = usePathname() ?? "";
  const active = pathname.startsWith("/store");
  return (
    <Link
      href="/store"
      onClick={() => trackFunnel("ebook_store_link_click", { from: pathname.split("/")[1] || "home" })}
      aria-current={active ? "page" : undefined}
      className={headerButtonClass(active)}
    >
      <ShoppingBag className="h-4 w-4 shrink-0" aria-hidden />
      <span>Ebooks</span>
    </Link>
  );
}

/** The 1:1 tutoring interest check (2026-10-27, migration 0190); `from` rides to the stored answer. */
function TutorLink() {
  const pathname = usePathname() ?? "";
  const active = pathname.startsWith("/tutor");
  const from = pathname.split("/")[1] || "home";
  return (
    <Link
      href={active ? "/tutor" : `/tutor?from=${encodeURIComponent(from)}`}
      onClick={() => trackFunnel("tutor_link_click", { from })}
      aria-current={active ? "page" : undefined}
      className={headerButtonClass(active)}
    >
      <GraduationCap className="h-4 w-4 shrink-0" aria-hidden />
      <span>Tutor</span>
    </Link>
  );
}
