import Link from "next/link";
import { BookOpen } from "lucide-react";
import { getSessionMember } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import UserMenu from "./UserMenu";

export default async function AppHeader() {
  const member = await getSessionMember();
  const homeHref = member ? "/dashboard" : "/browse";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href={homeHref}
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <BookOpen className="h-5 w-5 text-primary" aria-hidden />
          <span>Question Bank</span>
        </Link>

        {member ? (
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span
              className="max-w-[7rem] truncate text-xs text-muted-foreground sm:max-w-[12rem] md:max-w-none"
              title={member.orgName}
            >
              {member.orgName}
            </span>
            <UserMenu email={member.user.email} role={member.role} />
          </div>
        ) : (
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Sign in</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
