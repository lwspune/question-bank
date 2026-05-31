import Link from "next/link";
import { Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Preview-gate wall shown in place of the locked concepts + practice depth on a
 * paid /notes chapter. Server component — the CTA differs by sign-in state:
 *   - anon          → sign up / sign in (then they can buy or be comped)
 *   - signed-in     → upgrade (Razorpay checkout lands in a later phase; the
 *                     /pricing target is the placeholder until then)
 * Staff + entitled students never see this — they get the full content.
 */
export default function NotesPaywall({
  lockedCount,
  isSignedIn,
  subjectDisplay,
}: {
  lockedCount: number;
  isSignedIn: boolean;
  subjectDisplay: string;
}) {
  return (
    <section
      aria-label="Premium content"
      className="my-10 overflow-hidden rounded-xl border-2 border-primary/30 bg-gradient-to-b from-primary/5 to-background"
    >
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Lock className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <h2 className="flex items-center justify-center gap-2 text-lg font-semibold tracking-tight">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden />
            {lockedCount > 0
              ? `${lockedCount} more concept${lockedCount === 1 ? "" : "s"} + practice locked`
              : "Premium content locked"}
          </h2>
          <p className="mx-auto mt-2 max-w-md font-serif text-sm leading-relaxed text-muted-foreground">
            This is a premium {subjectDisplay} chapter. Unlock the full worked
            examples, self-checks, practice sets, and the mastery checkpoint.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {isSignedIn ? (
            <Button asChild>
              <Link href="/pricing">Upgrade to unlock</Link>
            </Button>
          ) : (
            <>
              <Button asChild>
                <Link href="/signup">Sign up to unlock</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/login">Sign in</Link>
              </Button>
            </>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Already have access? It unlocks automatically once you&apos;re signed
          in.
        </p>
      </div>
    </section>
  );
}
