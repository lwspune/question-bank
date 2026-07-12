"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Lock, LogIn } from "lucide-react";

/**
 * Shown in place of an answer once an anon viewer has spent their free reveals
 * (the /browse + /board meter). Free sign-in unlocks unlimited reveals; `next`
 * returns them to the exact page they were on.
 */
export default function RevealSignInPrompt() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const returnUrl = searchParams?.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname ?? "/browse";
  const next = encodeURIComponent(returnUrl);

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2 rounded-md border border-dashed border-primary/30 bg-primary/5 px-3 py-2 text-sm">
      <Lock className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
      <span className="text-muted-foreground">
        You&apos;ve used your free answer reveals. Sign in — it&apos;s free — to keep
        checking answers.
      </span>
      <Link
        href={`/login?next=${next}`}
        className="ml-auto inline-flex items-center gap-1 font-medium text-brand-accent hover:underline"
      >
        <LogIn className="h-3.5 w-3.5" aria-hidden />
        Sign in
      </Link>
    </div>
  );
}
