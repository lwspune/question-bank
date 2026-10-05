import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldCheck, Clock, Sparkles } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionMember, getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { loadEntitlements } from "@/lib/entitlements/query";
import { activePassesByScope } from "@/lib/billing/checkoutReturn";
import BatchesCard from "./BatchesCard";
import {
  listPendingInvitesForEmail,
  listMyBatches,
} from "@/lib/batches/invitesAdmin";
import { getOwnProfile } from "@/lib/profile/service";
import { readFreeMockLimit } from "@/lib/billing/plansQuery";
import ProfileForm from "./ProfileForm";
import PushCard from "./PushCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your account",
  robots: { index: false },
};

/** What an active grant is called on this page, and where it leads. */
const PASS_VIEW: Record<string, { title: string; href: string; cta: string }> = {
  mocks: { title: "Premium Pass active", href: "/mock", cta: "Go to mock tests →" },
  // The retired ₹499 pass (2026-10-01). No grant holds it; kept so one would still read right.
  teacher: { title: "Teacher Pass active", href: "/browse", cta: "Download a paper →" },
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
  const freeMocks = await readFreeMockLimit(db);
  const [rows, profile, invites, myBatches] = await Promise.all([
    loadEntitlements(db, user.id),
    getOwnProfile(db, user.id),
    // Resolved by VERIFIED email on read — there is no binding step at signup,
    // so an invite sent before this account existed shows up here too.
    user.email ? listPendingInvitesForEmail(user.email) : Promise.resolve([]),
    listMyBatches(user.id),
  ]);
  const now = Date.now();
  // One line per pass held — a teacher who also bought the Mock Pass sees both.
  const passes = activePassesByScope(rows, now);
  const hasAccess = Boolean(member) || passes.length > 0;

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

        {/* The public key only: nothing on Vercel sends, so the private key never lives there. */}
        <PushCard vapidKey={process.env.VAPID_PUBLIC_KEY ?? ""} />

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
              {member ? (
                <div>
                  <p className="font-semibold">Premium active</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Included with your {member.orgName} staff account.
                  </p>
                  <Link
                    href={DEFAULT_VIEW.href}
                    className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
                  >
                    {DEFAULT_VIEW.cta}
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {passes.map((pass) => {
                    const view = PASS_VIEW[pass.scope] ?? DEFAULT_VIEW;
                    return (
                      <li key={pass.scope}>
                        <p className="font-semibold">{view.title}</p>
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" aria-hidden />
                          {pass.expiresAt
                            ? `Active until ${formatDate(pass.expiresAt)}`
                            : "Lifetime access"}
                          {pass.source === "comp" && " · complimentary"}
                        </p>
                        <Link
                          href={view.href}
                          className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                        >
                          {view.cta}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Sparkles className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-semibold">No pass yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  The question bank, guides and notes are always free
                  {freeMocks === null ? ", and so are mock tests" : `, and so are your first ${freeMocks} mock tests`}.
                  A one-time pass unlocks unlimited mocks and PDF paper downloads.
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
