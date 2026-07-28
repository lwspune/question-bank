import Link from "next/link";
import { BookOpen } from "lucide-react";
import { getHeaderSession } from "@/lib/auth";
import { resolveHomeHref } from "@/lib/header-session";
import { Button } from "@/components/ui/button";
import { loadActiveExamContext } from "@/lib/exam/loadActiveExamContext";
import UserMenu from "./UserMenu";
import ThemeToggle from "./ThemeToggle";
import PrimaryNav from "./PrimaryNav";
import ExamPill from "./ExamPill";

export default async function AppHeader() {
  // ONE session resolution (was three — member + user + superadmin, each with
  // its own client and its own auth.getUser(), on every page of the site).
  // A signed-in user with no org_members row is a self-serve student: they get
  // the account menu so they can sign out, just no org chip or role.
  const [session, examContext] = await Promise.all([
    getHeaderSession(),
    loadActiveExamContext(),
  ]);
  const homeHref = resolveHomeHref(session);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-3 sm:gap-3 sm:px-6">
        <Link
          href={homeHref}
          className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <BookOpen
            className="h-5 w-5 shrink-0 text-brand-accent"
            aria-hidden
          />
          {/* Wordmark hides on narrow phones so the 3-tab nav + pill fit
              comfortably at 360px viewport widths. The brand mark stays. */}
          <span className="hidden sm:inline">PYQ Vault</span>
        </Link>

        <PrimaryNav
          bankHref={examContext.bankHref}
          guidesHref={examContext.guidesHref}
          notesHref={examContext.notesHref}
          boardHref={examContext.boardHref}
          showMocks={examContext.showMocks}
          showPapers={!!session?.isStaff}
        />

        <div className="ml-auto flex min-w-0 items-center gap-1.5 sm:gap-2">
          <ExamPill activeSlug={examContext.slug} />
          {/* Theme toggle is visible to everyone, anon included. */}
          <ThemeToggle />
          {session ? (
            <>
              {/* Org chip only for org members; hidden below md so brand +
                  nav + pill + avatar all fit. */}
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
    </header>
  );
}
