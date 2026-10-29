"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";
import SignInLink from "@/components/reveal/SignInLink";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { intlNavFor } from "@/lib/sites/intl";

/**
 * The header on intl.pyqvault.com (2026-10-30): the brand, the current exam's
 * Notes · Mocks · Questions, and sign-in. None of PYQ Vault's Indian surfaces
 * (Guides, Board, drill, ebooks, tutor) appear here; the owner's rule is that
 * an international student sees no Indian exam.
 */
export default function IntlHeaderBar({
  email,
  sessionLoading,
}: {
  email: string | null;
  sessionLoading: boolean;
}) {
  const pathname = usePathname() ?? "/";
  const links = intlNavFor(pathname);

  const tabs = (
    <nav aria-label="Main" className="flex items-center gap-1">
      {links.map((l) => (
        <Link
          key={l.label}
          href={l.href}
          aria-current={l.active ? "page" : undefined}
          className={
            "rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
            (l.active ? "bg-brand/10 text-brand-accent" : "text-muted-foreground hover:text-foreground")
          }
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/mark-96.png" alt="" aria-hidden width={24} height={24} className="h-6 w-6 shrink-0" />
          <span>PYQ Vault</span>
          <span className="hidden rounded border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground sm:inline">
            International
          </span>
        </Link>
        <div className="hidden sm:block">{tabs}</div>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          {sessionLoading ? (
            <div className="h-9 w-9 shrink-0 rounded-full bg-muted/60" aria-hidden />
          ) : email ? (
            <IntlAccountLinks email={email} />
          ) : (
            <Button asChild variant="outline" size="sm">
              <SignInLink variant="header">Sign in</SignInLink>
            </Button>
          )}
        </div>
      </div>
      <div className="border-t px-2 py-1 sm:hidden">{tabs}</div>
    </header>
  );
}

function IntlAccountLinks({ email }: { email: string }) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function onSignOut() {
    setSigningOut(true);
    try {
      await createSupabaseBrowserClient().auth.signOut();
      toast.success("Signed out");
      router.replace("/");
      router.refresh();
    } catch (err) {
      setSigningOut(false);
      toast.error(err instanceof Error ? err.message : "Sign-out failed");
    }
  }

  return (
    <>
      <Button asChild variant="ghost" size="sm" title={email}>
        <Link href="/account" aria-label={`Account (${email})`}>
          <User className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">Account</span>
        </Link>
      </Button>
      <Button variant="ghost" size="sm" onClick={onSignOut} disabled={signingOut} aria-label="Sign out">
        <LogOut className="h-4 w-4" aria-hidden />
        <span className="hidden sm:inline">Sign out</span>
      </Button>
    </>
  );
}
