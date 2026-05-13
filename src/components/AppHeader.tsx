import Link from "next/link";
import { BookOpen } from "lucide-react";
import { getSessionMember } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import UserMenu from "./UserMenu";
import ThemeToggle from "./ThemeToggle";

export default async function AppHeader() {
  const member = await getSessionMember();
  // Brand link always lands non-admins on /browse — the dashboard is admin
  // territory. Admins still get /dashboard so the brand acts as their home.
  const homeHref = member?.role === "ADMIN" ? "/dashboard" : "/browse";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href={homeHref}
          className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <BookOpen
            className="h-5 w-5 shrink-0 text-primary"
            aria-hidden
          />
          <span>Question Bank</span>
        </Link>

        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {/* Theme toggle is visible to everyone, anon included. */}
          <ThemeToggle />
          {member ? (
            <>
              {/* Hide org chip on very narrow phones so brand + avatar never
                  collide. From sm: up, the org chip returns at progressively
                  larger max-widths. */}
              <span
                className="hidden max-w-[7rem] truncate text-xs text-muted-foreground sm:inline sm:max-w-[12rem] md:max-w-none"
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
