"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as Popover from "@radix-ui/react-popover";
import { LogOut, Moon, Sun, User } from "lucide-react";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function UserMenu({
  email,
  role,
}: {
  email: string;
  role: "ADMIN" | "TEACHER";
}) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  async function onSignOut() {
    setSigningOut(true);
    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
      toast.success("Signed out");
      router.replace("/login");
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
            <p className="mt-0.5 text-xs text-muted-foreground">{role}</p>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
          >
            {isDark ? (
              <Sun className="h-4 w-4" aria-hidden />
            ) : (
              <Moon className="h-4 w-4" aria-hidden />
            )}
            {isDark ? "Light mode" : "Dark mode"}
          </button>
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
