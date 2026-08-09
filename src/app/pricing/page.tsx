import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionMember, getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { userHasAccess } from "@/lib/entitlements/query";
import { PLANS, formatRupees } from "@/lib/billing/plans";
import PricingClient from "./PricingClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Premium",
  description:
    "Unlock every premium notes chapter: full worked examples, practice sets, and mastery checkpoints.",
  // Kept indexable (unlike /login and /signup — a pricing page is a genuine
  // landing surface), but it needs a canonical: it is reachable with `?next=`
  // and other CTA query strings, and without this every variant is a separate
  // undeclared duplicate.
  alternates: { canonical: "/pricing" },
};

const PERKS = [
  "Every premium notes chapter, in full",
  "Worked examples, self-checks & Level-1 practice",
  "Per-subtopic mastery checkpoints",
  "The public bank, guides & free notes stay free for everyone",
];

export default async function PricingPage() {
  const plan = PLANS[0];
  const [member, user] = await Promise.all([getSessionMember(), getSessionUser()]);

  let alreadyHasAccess = false;
  if (member) {
    alreadyHasAccess = true; // staff always have access
  } else if (user) {
    alreadyHasAccess = await userHasAccess(createSupabaseServerClient(), user.id, plan.scope);
  }

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl px-6 py-12">
        <header className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Go premium</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            One payment. {plan.durationDays ? `${plan.durationDays} days` : "Lifetime"} of full access.
          </p>
        </header>

        <div className="mx-auto mt-8 max-w-md rounded-2xl border-2 border-primary/30 bg-card p-8 shadow-sm">
          <p className="text-sm font-medium text-primary">{plan.label}</p>
          <p className="mt-2 flex items-baseline gap-1">
            <span className="text-4xl font-semibold tracking-tight">
              {formatRupees(plan.amountPaise)}
            </span>
            <span className="text-sm text-muted-foreground">
              / {plan.durationDays ? `${plan.durationDays} days` : "lifetime"}
            </span>
          </p>
          <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
            {plan.blurb}
          </p>

          <ul className="mt-6 space-y-2.5">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span>{perk}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            {alreadyHasAccess ? (
              <div className="rounded-md border border-primary/30 bg-primary/5 p-3 text-center text-sm">
                You already have access.{" "}
                <Link href="/account" className="font-medium text-primary hover:underline">
                  View account
                </Link>
              </div>
            ) : user ? (
              <PricingClient planId={plan.id} />
            ) : (
              <div className="space-y-2 text-center">
                <Link
                  href="/login?next=/pricing"
                  className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Sign in to buy
                </Link>
                <p className="text-xs text-muted-foreground">
                  New here?{" "}
                  <Link href="/signup" className="font-medium text-foreground hover:underline">
                    Create a free account
                  </Link>{" "}
                  first.
                </p>
              </div>
            )}
          </div>

          <p className="mt-4 text-center text-[11px] text-muted-foreground">
            Secure payment via Razorpay · UPI, cards, netbanking
          </p>
        </div>
      </main>
    </>
  );
}
