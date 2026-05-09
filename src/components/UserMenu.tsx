"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export default function UserMenu({
  email,
  role,
}: {
  email: string;
  role: "ADMIN" | "TEACHER";
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

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
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-input bg-background text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <span aria-hidden>{initial}</span>
        <span className="sr-only">Open user menu</span>
      </button>

      <div
        role="menu"
        className={cn(
          "absolute right-0 mt-2 w-64 origin-top-right rounded-md border bg-popover p-1 text-popover-foreground shadow-md transition",
          open
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        )}
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
          role="menuitem"
          onClick={onSignOut}
          disabled={signingOut}
          className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent disabled:opacity-50"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          {signingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </div>
  );
}
