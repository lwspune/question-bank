/**
 * GET /unsubscribe/[token] — the confirm page an email footer links to.
 *
 * This page must NOT perform the opt-out: mailbox link-scanners prefetch urls,
 * so acting on GET would unsubscribe people who never clicked. It renders a
 * button that POSTs /api/unsubscribe/[token].
 *
 * No auth: the token is the capability. noindex — it must never be crawled.
 */
import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import { Card, CardContent } from "@/components/ui/card";
import { UnsubscribeForm } from "./UnsubscribeForm";

export const metadata: Metadata = {
  title: "Unsubscribe — PYQ Vault",
  robots: { index: false, follow: false },
};

export default function UnsubscribePage({ params }: { params: { token: string } }) {
  return (
    <>
      <AppHeader />
      <main className="p-8">
        <div className="mx-auto max-w-lg">
          <Card>
            <CardContent className="space-y-4 p-6">
              <h1 className="text-xl font-semibold">Unsubscribe from mock emails</h1>
              <p className="text-sm text-muted-foreground">
                We&apos;ll stop emailing you about past-paper mock tests. This doesn&apos;t delete your
                account, and you&apos;ll still get essential emails about it (like a password reset).
              </p>
              <UnsubscribeForm token={params.token} />
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
