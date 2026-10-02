import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionMember, getSessionUser } from "@/lib/auth";
import { createSupabaseAnonClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { loadEntitlements } from "@/lib/entitlements/query";
import { hasActiveScope } from "@/lib/entitlements/access";
import { formatRupees, planLengthLabel, type Plan } from "@/lib/billing/plans";
import { listActivePlans, readFreeMockLimit } from "@/lib/billing/plansQuery";
import PricingClient from "./PricingClient";
import { afterPurchasePath, pricingHref } from "@/lib/billing/checkoutReturn";
import { logActivityOnce } from "@/lib/activity/service";
import { surfaceViewedEvent } from "@/lib/activity/views";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "The PYQ Vault Pass: unlimited timed mock tests and Word question-paper + answer-key downloads, for students and teachers. Browsing stays free.",
  // Indexable (a genuine landing surface), but it is reachable with `?plan=`
  // and `?next=`, so it declares its canonical.
  alternates: { canonical: "/pricing" },
};

/**
 * The passes come from public.plans (edited at /dashboard/pricing), so a
 * price or perk change is a save, not a deploy. `?plan=<urlKey>` highlights
 * one card — the four CTAs around the site link by that key.
 */
export default async function PricingPage({
  searchParams,
}: {
  searchParams: { plan?: string; next?: string };
}) {
  const anon = createSupabaseAnonClient();
  const [member, user, plans, freeMocks] = await Promise.all([
    getSessionMember(),
    getSessionUser(),
    listActivePlans(anon),
    readFreeMockLimit(anon),
  ]);
  const rows = user && !member ? await loadEntitlements(createSupabaseServerClient(), user.id) : [];
  if (user) {
    await logActivityOnce(createSupabaseServerClient(), user.id, surfaceViewedEvent(user.id, "pricing", new Date()));
  }
  const now = Date.now();
  // Staff already have everything a pass sells.
  const owns = (plan: Plan) => !!member || hasActiveScope(rows, plan.scope, now);
  const highlighted = searchParams.plan;
  // Where the buyer was blocked (a mock's Start button, the download gate); they
  // land back there after paying, and the sign-in round-trip keeps it.
  const returnTo = searchParams.next ? afterPurchasePath(searchParams.next) : undefined;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <header className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Pricing</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Browsing questions, guides and notes is free.{" "}
            {freeMocks === null
              ? "Mock tests are free too."
              : `Your first ${freeMocks} mock tests are free too.`}
          </p>
        </header>

        {plans.length === 0 ? (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            No passes are on sale right now.
          </p>
        ) : (
          // One pass on sale (2026-10-01) gets one centred column; two keep the
          // side-by-side grid. The catalogue is data, so the layout follows it.
          <div
            className={
              plans.length === 1
                ? "mx-auto mt-8 grid max-w-md gap-6"
                : "mt-8 grid gap-6 md:grid-cols-2"
            }
          >
            {plans.map((plan) => {
              const key = plan.urlKey;
              const isHighlighted = highlighted === key;
              const next = pricingHref(key, returnTo);
              return (
                <section
                  key={plan.id}
                  id={key}
                  aria-labelledby={`${key}-title`}
                  className={`flex flex-col rounded-2xl border-2 bg-card p-6 shadow-sm ${
                    isHighlighted ? "border-brand-accent" : "border-border"
                  }`}
                >
                  <h2 id={`${key}-title`} className="text-sm font-medium text-brand-accent">
                    {plan.label}
                  </h2>
                  <p className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight">
                      {formatRupees(plan.amountPaise)}
                    </span>
                    <span className="text-sm text-muted-foreground">/ {planLengthLabel(plan)}</span>
                  </p>
                  <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
                    {plan.blurb}
                  </p>

                  <ul className="mt-5 flex-1 space-y-2.5">
                    {plan.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    {owns(plan) ? (
                      <div className="rounded-md border border-brand-accent/30 bg-brand-accent/5 p-3 text-center text-sm">
                        You already have this.{" "}
                        <Link href="/account" className="font-medium text-brand-accent hover:underline">
                          View account
                        </Link>
                      </div>
                    ) : user ? (
                      <PricingClient
                        planId={plan.id}
                        returnTo={returnTo}
                        buttonLabel={`Buy ${plan.label}: ${formatRupees(plan.amountPaise)}`}
                      />
                    ) : (
                      <div className="space-y-2 text-center">
                        <Button href={`/login?next=${encodeURIComponent(next)}`}>Sign in to buy</Button>
                        <p className="text-xs text-muted-foreground">
                          New here?{" "}
                          <Link
                            href={`/signup?next=${encodeURIComponent(next)}`}
                            className="font-medium text-foreground hover:underline"
                          >
                            Create a free account
                          </Link>{" "}
                          first.
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        <div className="mt-8 space-y-2 text-center text-xs text-muted-foreground">
          <p>Secure payment via Razorpay · UPI, cards, netbanking</p>
          <p>
            One-time payment, no auto-renewal. By paying you agree to the{" "}
            <Link href="/terms" className="underline hover:text-foreground">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/refunds" className="underline hover:text-foreground">
              7-day refund policy
            </Link>
            .
          </p>
        </div>
      </main>
    </>
  );
}

function Button({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
    >
      {children}
    </Link>
  );
}
