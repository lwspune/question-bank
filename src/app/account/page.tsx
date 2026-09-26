import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldCheck, Clock, Sparkles } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionMember, getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { loadEntitlements } from "@/lib/entitlements/query";
import { isEntitlementActive } from "@/lib/entitlements/access";
import BatchesCard from "./BatchesCard";
import {
  listPendingInvitesForEmail,
  listMyBatches,
} from "@/lib/batches/invitesAdmin";
import { getOwnProfile } from "@/lib/profile/service";
import { FREE_MOCK_LIMIT } from "@/lib/mocks/quota";
import ProfileForm from "./ProfileForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your account",
  robots: { index: false },
};

/** What an active grant is called on this page, and where it leads. */
const PASS_VIEW: Record<string, { title: string; href: string; cta: string }> = {
  mocks: { title: "Mock Pass active", href: "/mock", cta: "Go to mock tests →" },
  teacher: { title: "Teacher Pass active", href: "/browse", cta: "Build a paper →" },
};
const DEFAULT_VIEW = { title: "Premium active", href: "/mock", cta: "Go to mock tests →" };

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

  const db = createSupabaseServerClient();
  const [rows, profile, invites, myBatches] = await Promise.all([
    loadEntitlements(db, user.id),
    getOwnProfile(db, user.id),
    // Resolved by VERIFIED email on read — there is no binding step at signup,
    // so an invite sent before this account existed shows up here too.
    user.email ? listPendingInvitesForEmail(user.email) : Promise.resolve([]),
    listMyBatches(user.id),
  ]);
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
  const view = (active && PASS_VIEW[active.scope]) || DEFAULT_VIEW;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl px-6 py-12">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
        </header>

        <div className="mb-6">
          <ProfileForm profile={profile} />
        </div>

        <div className="mb-6">
          <BatchesCard
            invites={invites.map((i) => ({
              id: i.id,
              batchName: i.batchName,
              orgName: i.orgName,
            }))}
            batches={myBatches.map((b) => ({
              batchId: b.batchId,
              batchName: b.batchName,
              orgName: b.orgName,
            }))}
          />
        </div>

        <div className="rounded-xl border bg-card p-6">
          {hasAccess ? (
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-semibold">{member ? "Premium active" : view.title}</p>
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
                  href={view.href}
                  className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
                >
                  {view.cta}
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Sparkles className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-semibold">No pass yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  The question bank, guides and notes are always free, and so are
                  your first {FREE_MOCK_LIMIT} mock tests. A one-time pass unlocks unlimited mocks,
                  or Word paper downloads for teachers.
                </p>
                <Link
                  href="/pricing"
                  className="mt-3 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  See passes
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
