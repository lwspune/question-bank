"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { practiceGateState } from "@/lib/notes/access";
import { useSignedIn } from "@/components/auth/useSignedIn";

/**
 * Client-side gate for the interactive practice on /notes — self-check, Level-1
 * reps, and the mastery checkpoint. Signed-in students get the real interaction
 * (and their progress is tracked); anon sees a sign-in wall. Rendered in the
 * browser so the surrounding notes page stays ISR-static (see useSignedIn) — the
 * gated PYQs are public, so this is a conversion nudge, not a security boundary.
 *
 * - `variant="full"` — a standalone section wall (used for the mastery checkpoint).
 * - `variant="compact"` — a slim inline row (used inside each concept's collapsed
 *   "Practice this concept" accordion, so per-concept gating isn't noisy).
 *
 * While auth resolves we render a neutral skeleton (never the children), so a
 * signed-in student never sees a flash of the wall.
 */
export default function PracticeGate({
  children,
  variant = "full",
  label = "practice",
}: {
  children: ReactNode;
  variant?: "full" | "compact";
  label?: string;
}) {
  const { signedIn, loading } = useSignedIn();
  const state = practiceGateState({ signedIn, loading });

  if (state === "open") return <>{children}</>;

  if (state === "loading") {
    return (
      <div
        aria-hidden
        className={
          variant === "compact"
            ? "h-9 animate-pulse rounded-md bg-muted"
            : "my-6 h-32 animate-pulse rounded-lg bg-muted"
        }
      />
    );
  }

  return <PracticeSignInWall variant={variant} label={label} />;
}

function PracticeSignInWall({
  variant,
  label,
}: {
  variant: "full" | "compact";
  label: string;
}) {
  const pathname = usePathname();
  const next = encodeURIComponent(pathname ?? "/notes");
  const loginHref = `/login?next=${next}`;
  const signupHref = `/signup?next=${next}`;

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap items-center gap-2 rounded-md border border-dashed border-primary/30 bg-primary/5 px-3 py-2 text-sm">
        <Lock className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
        <span className="text-muted-foreground">
          Sign in to {label} — free, and it tracks your progress.
        </span>
        <Link
          href={loginHref}
          className="ml-auto font-medium text-brand-accent hover:underline"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <section
      aria-label="Sign in to practice"
      className="my-8 overflow-hidden rounded-xl border-2 border-dashed border-primary/30 bg-gradient-to-b from-primary/5 to-background"
    >
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Lock className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Sign in to {label}
          </h2>
          <p className="mx-auto mt-2 max-w-md font-serif text-sm leading-relaxed text-muted-foreground">
            The teaching notes are free to read. Create a free account to attempt
            the mastery checkpoint, save your score, mark the chapter mastered,
            and pick up where you left off.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button asChild>
            <Link href={signupHref}>Create a free account</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={loginHref}>
              <LogIn className="h-4 w-4" aria-hidden />
              Sign in
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
