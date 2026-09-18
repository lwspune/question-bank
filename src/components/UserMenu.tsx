"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Popover from "@radix-ui/react-popover";
import { BookMarked, Bookmark, CreditCard, FileText, LayoutDashboard, LogOut, PenLine, ShieldCheck, TrendingUp, User } from "lucide-react";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function UserMenu({
  email,
  role,
  isStaff = false,
  isSuperadmin = false,
}: {
  email: string;
  // null = signed-in student (no org membership).
  role: "ADMIN" | "TEACHER" | null;
  /** Holds an org_members row — same source PrimaryNav uses for the Papers tab. */
  isStaff?: boolean;
  isSuperadmin?: boolean;
}) {
  const router = useRouter();
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
          aria-label="Open user menu"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-input bg-background text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span aria-hidden>{initial}</span>
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
            </p>
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
          {/*
            Papers, Books and Blog are PHONE-ONLY entries (`sm:hidden`): from sm
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
            cap is a measured constraint.
          */}
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
              Books
            </Link>
          )}
          {/* Not role-gated — public surfaces, unlike the two above. */}
          <Link
            href="/blog"
            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none sm:hidden"
          >
            <PenLine className="h-4 w-4" aria-hidden />
            Blog
          </Link>
          <Link
            href="/about"
            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none sm:hidden"
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
            // prefetch off: /performance is a per-user server render behind a
            // ~500 ms RPC, and a prefetch would run it for anyone who merely
            // opened this menu.
            prefetch={false}
            href="/performance"
            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
          >
            <TrendingUp className="h-4 w-4" aria-hidden />
            Your performance
          </Link>
          <Link
            href="/saved"
            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
          >
            <Bookmark className="h-4 w-4" aria-hidden />
            Saved questions
          </Link>
          <Link
            href="/account"
            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
          >
            <CreditCard className="h-4 w-4" aria-hidden />
            Account &amp; access
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
