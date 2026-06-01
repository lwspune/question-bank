import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldCheck, Clock, Sparkles } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionMember, getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { loadEntitlements } from "@/lib/entitlements/query";
import { isEntitlementActive } from "@/lib/entitlements/access";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your account — Question Bank",
  robots: { index: false },
};

function formatDate(iso: string | null): string {
  if (!iso) return "no expiry";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? "—"
    : d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export default async function AccountPage() {
  const [member, user] = await Promise.all([getSessionMember(), getSessionUser()]);
  if (!user) redirect("/login?next=/account");

  const rows = await loadEntitlements(createSupabaseServerClient(), user.id);
  const now = Date.now();
  const active = rows
    .filter((r) => isEntitlementActive(r, now))
    // Show the longest-lasting active grant (null expiry sorts last = best).
    .sort((a, b) => {
      if (!a.expiresAt) return -1;
      if (!b.expiresAt) return 1;
      return new Date(b.expiresAt).getTime() - new Date(a.expiresAt).getTime();
    })[0];

  const hasAccess = Boolean(member) || Boolean(active);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl px-6 py-12">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
        </header>

        <div className="rounded-xl border bg-card p-6">
          {hasAccess ? (
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-semibold">Premium active</p>
                {member ? (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Included with your {member.orgName} staff account.
                  </p>
                ) : active ? (
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {active.expiresAt
                      ? `Active until ${formatDate(active.expiresAt)}`
                      : "Lifetime access"}
                    {active.source === "comp" && " · complimentary"}
                  </p>
                ) : null}
                <Link
                  href="/notes"
                  className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
                >
                  Go to notes →
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Sparkles className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-semibold">No premium access</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  The public bank, guides, and free notes are always open. Unlock
                  the premium chapters with a one-time pass.
                </p>
                <Link
                  href="/pricing"
                  className="mt-3 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  See premium
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
