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
  preview,
}: {
  children: ReactNode;
  variant?: "full" | "compact";
  label?: string;
  /** Static, non-interactive look at what sign-in opens, shown blurred behind
   *  the full wall. A dashed empty box read as a placeholder, not a reward. */
  preview?: ReactNode;
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

  return <PracticeSignInWall variant={variant} label={label} preview={preview} />;
}

function PracticeSignInWall({
  variant,
  label,
  preview,
}: {
  variant: "full" | "compact";
  label: string;
  preview?: ReactNode;
}) {
  const pathname = usePathname();
  const next = encodeURIComponent(pathname ?? "/notes");
  const loginHref = `/login?next=${next}`;
  const signupHref = `/signup?next=${next}`;

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap items-center gap-2 rounded-md border border-dashed border-brand/30 bg-brand/5 px-3 py-2 text-sm">
        <Lock className="h-3.5 w-3.5 shrink-0 text-brand-accent" aria-hidden />
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

  const card = (
    <div className="flex flex-col items-center gap-4 p-8 text-center">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand-accent">
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
  );

  return (
    <section
      aria-label="Sign in to practice"
      className="relative my-8 overflow-hidden rounded-2xl border bg-card shadow-sm"
    >
      {preview && (
        <>
          {/* Decorative: the real questions are behind sign-in, so the preview
              is hidden from assistive tech and holds no controls. It fills in
              BEHIND the card, which sets the height, so a phone's taller card
              is never clipped. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 select-none overflow-hidden p-6 blur-[3px]">
            {preview}
          </div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-card/30 via-card/85 to-card" />
        </>
      )}
      <div className="relative">{card}</div>
    </section>
  );
}
