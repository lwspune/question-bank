import Link from "next/link";
import { BookOpen } from "lucide-react";
import { getSessionMember, getSessionUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { loadActiveExamContext } from "@/lib/exam/loadActiveExamContext";
import UserMenu from "./UserMenu";
import ThemeToggle from "./ThemeToggle";
import PrimaryNav from "./PrimaryNav";
import ExamPill from "./ExamPill";

export default async function AppHeader() {
  const [member, user, examContext] = await Promise.all([
    getSessionMember(),
    getSessionUser(),
    loadActiveExamContext(),
  ]);
  // A signed-in user with no org_members row is a self-serve student — they
  // still get the account menu (so they can sign out), just no org chip/role.
  const account = member
    ? { email: member.user.email, role: member.role }
    : user
      ? { email: user.email, role: null }
      : null;
  // Brand link lands ADMINs on /dashboard (their home for upload/reports/
  // members tooling); everyone else (TEACHER + anon) lands on /browse,
  // which is the surface where editor + reader workflows actually live.
  const homeHref = member?.role === "ADMIN" ? "/dashboard" : "/browse";

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
        />

        <div className="ml-auto flex min-w-0 items-center gap-1.5 sm:gap-2">
          <ExamPill activeSlug={examContext.slug} />
          {/* Theme toggle is visible to everyone, anon included. */}
          <ThemeToggle />
          {account ? (
            <>
              {/* Org chip only for org members; hidden below md so brand +
                  nav + pill + avatar all fit. */}
              {member && (
                <span
                  className="hidden max-w-[12rem] truncate text-xs text-muted-foreground md:inline md:max-w-none"
                  title={member.orgName}
                >
                  {member.orgName}
                </span>
              )}
              <UserMenu email={account.email} role={account.role} />
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
