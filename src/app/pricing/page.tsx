import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { Check } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionMember, getSessionUser } from "@/lib/auth";
import { createSupabaseAnonClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { loadEntitlements } from "@/lib/entitlements/query";
import { hasActiveScope } from "@/lib/entitlements/access";
import { formatPrice, planLengthLabel, plansForBuyer, type Plan } from "@/lib/billing/plans";
import { readCountry } from "@/lib/acquisition/country";
import { planSiteForHost } from "@/lib/sites/intl";
import { listActivePlans } from "@/lib/billing/plansQuery";
import PricingClient from "./PricingClient";
import { afterPurchasePath, pricingHref } from "@/lib/billing/checkoutReturn";
import { logActivityOnce } from "@/lib/activity/service";
import { surfaceViewedEvent } from "@/lib/activity/views";
import ResultsStrip from "@/components/results/ResultsStrip";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "The Premium Pass: unlimited timed mock tests and PDF question-paper + answer-key downloads, for students and teachers. Browsing stays free.",
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
  const [member, user, allPlans] = await Promise.all([getSessionMember(), getSessionUser(), listActivePlans(anon)]);
  // intl.pyqvault.com sells its own pass, in USD (migration 0203); www sells in INR.
  const site = planSiteForHost(headers().get("host"));
  // At the buyer's country price where one is set (0206): a visitor in India
  // sees the rupee IMAT pass in place of the dollar one.
  const plans = plansForBuyer(allPlans, site, readCountry(headers()));
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
        <header className="hero-soft rounded-2xl px-5 py-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Pricing</h1>
          {/* The owner's own words (2026-10-11), kept in the first person on purpose. */}
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            I wish I could keep all of PYQ Vault free. But maintaining and running the website costs money,
            so I charge a small fee to keep it going. I hope you understand.
          </p>
        </header>

        {site === "pyqvault" && <ResultsStrip className="mt-6" />}

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
                      {formatPrice(plan.amountPaise, plan.currency)}
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
                        buttonLabel={`Buy ${plan.label}: ${formatPrice(plan.amountPaise, plan.currency)}`}
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
          <p>
            {site === "intl"
              ? "Secure payment via Razorpay · international debit and credit cards, in US dollars"
              : "Secure payment via Razorpay · UPI, cards, netbanking"}
          </p>
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

// The signed-out twin of PricingClient's buy button: same brand fill, and a
// visible keyboard focus ring (it had none — the one primary action on the
// page a keyboard user could not see focused).
function Button({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-10 w-full items-center justify-center rounded-md bg-brand px-4 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {children}
    </Link>
  );
}
