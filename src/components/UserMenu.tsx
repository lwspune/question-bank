"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Popover from "@radix-ui/react-popover";
import { Bookmark, CreditCard, LayoutDashboard, LogOut, ShieldCheck, User } from "lucide-react";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function UserMenu({
  email,
  role,
  isSuperadmin = false,
}: {
  email: string;
  // null = signed-in student (no org membership).
  role: "ADMIN" | "TEACHER" | null;
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
          {/* Papers (the collaborative builder) is reached from the primary
              nav tab now — org members get it there. */}
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
