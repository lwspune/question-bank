import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquarePlus } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { getSessionUser } from "@/lib/auth";
import { CONTACT_EMAIL } from "@/lib/brand";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { listOwnRequests, type OwnRequest } from "@/lib/feedback/replyService";
import { STATUS_LABELS } from "@/lib/feedback/replies";
import FeedbackForm from "./FeedbackForm";
import RepliesSeen from "./RepliesSeen";

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
  // Their own suggestions and our replies (migration 0243), read with their
  // JWT. A failed read hides the list; the form still works.
  let requests: OwnRequest[] = [];
  if (user) {
    try {
      requests = await listOwnRequests(createSupabaseServerClient());
    } catch (e) {
      console.error("feedback list failed", e instanceof Error ? e.message : e);
    }
  }
  const anyUnread = requests.some((r) => r.reply?.unread);

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
          <FeedbackForm />
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

        {requests.length > 0 && <YourSuggestions requests={requests} />}
        {anyUnread && <RepliesSeen />}

        <p className="text-sm text-muted-foreground">
          Found a wrong answer or a typo in one question? Use the flag on that question instead — it
          reaches us with the question attached.
        </p>
      </main>
    </>
  );
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function YourSuggestions({ requests }: { requests: OwnRequest[] }) {
  return (
    <section aria-labelledby="your-suggestions" className="space-y-3">
      <h2 id="your-suggestions" className="text-sm font-semibold">
        Your suggestions
      </h2>
      <ul className="space-y-3">
        {requests.map((r) => (
          <li key={r.id} className="rounded-xl border bg-card p-4 text-sm">
            <p className="whitespace-pre-line break-words">{r.message}</p>
            <p className="mt-1 text-xs text-muted-foreground">Sent {fmtDate(r.createdAt)}</p>
            {r.reply ? (
              <div className="mt-3 border-t pt-3">
                <p className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground">Our reply:</span>
                  <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-semibold text-brand-accent">
                    {STATUS_LABELS[r.reply.status]}
                  </span>
                  {r.reply.unread && (
                    <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-brand-foreground">New</span>
                  )}
                </p>
                {r.reply.note && <p className="mt-2 whitespace-pre-line break-words">{r.reply.note}</p>}
                <p className="mt-1 text-xs text-muted-foreground">{fmtDate(r.reply.repliedAt)}</p>
              </div>
            ) : (
              <p className="mt-3 border-t pt-3 text-xs text-muted-foreground">No reply yet.</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
