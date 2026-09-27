import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquarePlus } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { getSessionUser } from "@/lib/auth";
import { CONTACT_EMAIL } from "@/lib/brand";
import { FeatureCard } from "@/app/me/FeedbackCards";

/**
 * /feedback — the one address for "tell us something". Until 2026-09-27 the
 * suggestion form existed only as the last card on /me, which is reached from
 * the avatar menu alone, and it had never been used once in ~2.5 months. The
 * footer and the avatar menu now link here, and it renders the SAME card /me
 * does, so the two cannot drift.
 *
 * Anon visitors can reach it from the footer but cannot write (user_feedback
 * is own-row RLS), so they get a sign-in link and the email address instead
 * of a form that would 401.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Send feedback",
  robots: { index: false },
};

export default async function FeedbackPage() {
  const user = await getSessionUser();

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl space-y-6 px-4 py-8 sm:px-6">
        <header>
          <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
            <MessageSquarePlus className="h-6 w-6 text-brand-accent" aria-hidden />
            Send feedback
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            A missing exam or chapter, something broken, or an idea. We read every one.
          </p>
        </header>

        {user ? (
          <FeatureCard defaultOpen />
        ) : (
          <section className="rounded-xl border bg-card p-6">
            <p className="text-sm">Sign in to send feedback from here.</p>
            <Button asChild variant="brand" size="sm" className="mt-3">
              <Link href="/login?next=/feedback">Sign in</Link>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Or email us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=PYQ%20Vault%20feedback`}
                className="text-brand-accent underline-offset-2 hover:underline focus-visible:underline focus-visible:outline-none"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>
        )}

        <p className="text-sm text-muted-foreground">
          Found a wrong answer or a typo in one question? Use the flag on that question instead — it
          reaches us with the question attached.
        </p>
      </main>
    </>
  );
}
