import Link from "next/link";
import { BookOpen } from "lucide-react";
import { getSessionMember } from "@/lib/auth";
import UserMenu from "./UserMenu";

export default async function AppHeader() {
  const member = await getSessionMember();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <BookOpen className="h-5 w-5 text-primary" aria-hidden />
          <span>Question Bank</span>
        </Link>

        {member && (
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:inline">
              {member.orgName}
            </span>
            <UserMenu email={member.user.email} role={member.role} />
          </div>
        )}
      </div>
    </header>
  );
}
