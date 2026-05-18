import Link from "next/link";
import { BookOpen } from "lucide-react";
import { getSessionMember } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { loadActiveExamContext } from "@/lib/exam/loadActiveExamContext";
import UserMenu from "./UserMenu";
import ThemeToggle from "./ThemeToggle";
import PrimaryNav from "./PrimaryNav";
import ExamPill from "./ExamPill";

export default async function AppHeader() {
  const [member, examContext] = await Promise.all([
    getSessionMember(),
    loadActiveExamContext(),
  ]);
  // Brand link always lands non-admins on /browse — the dashboard is admin
  // territory. Admins still get /dashboard so the brand acts as their home.
  const homeHref = member?.role === "ADMIN" ? "/dashboard" : "/browse";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-3 sm:gap-3 sm:px-6">
        <Link
          href={homeHref}
          className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <BookOpen
            className="h-5 w-5 shrink-0 text-primary"
            aria-hidden
          />
          {/* Wordmark hides on narrow phones so the 3-tab nav + pill fit
              comfortably at 360px viewport widths. The brand mark stays. */}
          <span className="hidden sm:inline">Question Bank</span>
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
          {member ? (
            <>
              {/* Hide org chip below md so brand + nav + pill + avatar all fit. */}
              <span
                className="hidden max-w-[12rem] truncate text-xs text-muted-foreground md:inline md:max-w-none"
                title={member.orgName}
              >
                {member.orgName}
              </span>
              <UserMenu email={member.user.email} role={member.role} />
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
