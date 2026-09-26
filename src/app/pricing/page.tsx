import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionMember, getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { loadEntitlements } from "@/lib/entitlements/query";
import { hasActiveScope } from "@/lib/entitlements/access";
import { PLANS, formatRupees, planLengthLabel, type Plan } from "@/lib/billing/plans";
import { FREE_MOCK_LIMIT } from "@/lib/mocks/quota";
import PricingClient from "./PricingClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "PYQ Vault passes: unlimited timed mock tests for students, and Word question-paper downloads for teachers. Browsing stays free.",
  // Indexable (a genuine landing surface), but it is reachable with `?plan=`
  // and `?next=`, so it declares its canonical.
  alternates: { canonical: "/pricing" },
};

/** What each pass gives, keyed by plan id. */
const PERKS: Record<string, string[]> = {
  "mock-pass-6m": [
    "Unlimited full-length timed mock tests",
    "Instant scores and question-by-question review",
    "Your mistakes, ready to drill",
  ],
  "teacher-pass-1y": [
    "Word Question Paper + Answer Key downloads",
    "Build papers from any filter, up to 200 questions",
    "Includes unlimited mock tests",
  ],
};

/** Short URL keys, so /pricing?plan=teacher can highlight a card. */
const PLAN_KEY: Record<string, string> = {
  "mock-pass-6m": "mocks",
  "teacher-pass-1y": "teacher",
};

export default async function PricingPage({
  searchParams,
}: {
  searchParams: { plan?: string };
}) {
  const [member, user] = await Promise.all([getSessionMember(), getSessionUser()]);
  const rows = user && !member ? await loadEntitlements(createSupabaseServerClient(), user.id) : [];
  const now = Date.now();
  // Staff already have everything a pass sells.
  const owns = (plan: Plan) => !!member || hasActiveScope(rows, plan.scope, now);
  const highlighted = searchParams.plan;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <header className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Pricing</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Browsing questions, guides and notes is free. Your first {FREE_MOCK_LIMIT} mock tests are free too.
          </p>
        </header>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {PLANS.map((plan) => {
            const key = PLAN_KEY[plan.id];
            const isHighlighted = highlighted === key;
            const next = `/pricing?plan=${key}`;
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
                  {(PERKS[plan.id] ?? []).map((perk) => (
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
          <p>
            An institute with several teachers?{" "}
            <Link href="/request-access" className="underline hover:text-foreground">
              Talk to us
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
