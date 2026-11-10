import type { Metadata } from "next";
import Link from "next/link";
import { cookies, headers } from "next/headers";
import { Check } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionMember, getSessionUser } from "@/lib/auth";
import { createSupabaseAnonClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { loadEntitlements } from "@/lib/entitlements/query";
import { formatPrice, ownsPlan, planLengthLabel, plansForBuyer, type Plan } from "@/lib/billing/plans";
import { readCountry } from "@/lib/acquisition/country";
import { planSiteForHost } from "@/lib/sites/intl";
import { listActivePlans } from "@/lib/billing/plansQuery";
import PricingClient from "./PricingClient";
import { afterPurchasePath, pricingHref } from "@/lib/billing/checkoutReturn";
import { logActivityOnce } from "@/lib/activity/service";
import { surfaceViewedEvent } from "@/lib/activity/views";
import ResultsStrip from "@/components/results/ResultsStrip";
import { getOnboardingState } from "@/lib/profile/service";
import { isExamSlug } from "@/lib/exam/examContext";
import { passScopeForExam } from "@/lib/billing/passScope";
import { SCOPE_MOCKS } from "@/lib/entitlements/access";
import { getMockExamCardsCached } from "@/lib/mocks/examCardsCached";
import { passLineForExam } from "@/lib/mocks/mocksNav";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { readFixPoints } from "@/lib/billing/fixPointsService";
import { readReferralDiscount } from "@/lib/referrals/service";
import { passOfferNote, fixPointsView, type FixPointsView } from "@/lib/billing/fixPoints";
import { upgradeCredits } from "@/lib/billing/upgrade";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "The Practice Pass: unlimited answers, mock tests and practice. The Premium Pass adds PDF question-paper + answer-key downloads. Browsing stays free.",
  // Indexable (a genuine landing surface), but it is reachable with `?plan=`
  // and `?next=`, so it declares its canonical.
  alternates: { canonical: "/pricing" },
};

/**
 * The passes come from public.plans (edited at /dashboard/pricing), so a
 * price or perk change is a save, not a deploy. `?plan=<urlKey>` highlights
 * one card — the four CTAs around the site link by that key.
 */
export default async function PricingPage(
  props: {
    searchParams: Promise<{ plan?: string; next?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const anon = createSupabaseAnonClient();
  const [member, user, allPlans] = await Promise.all([getSessionMember(), getSessionUser(), listActivePlans(anon)]);
  // intl.pyqvault.com sells its own pass, in USD (migration 0203); www sells in INR.
  const site = planSiteForHost((await headers()).get("host"));
  // At the buyer's country price where one is set (0206): a visitor in India
  // sees the rupee IMAT pass in place of the dollar one.
  const plans = plansForBuyer(allPlans, site, readCountry(await headers()));
  const rows = user && !member ? await loadEntitlements(createSupabaseServerClient(), user.id) : [];
  if (user) {
    await logActivityOnce(createSupabaseServerClient(), user.id, surfaceViewedEvent(user.id, "pricing", new Date()));
  }
  const now = Date.now();
  // Fix Points (0245) and a friend's invite (0249) lower the rupee passes.
  // Display here; the order route reads both again and charges that price. A
  // failed read shows the plain price (points) or leaves the invite out.
  // A Practice Pass holder sees the Premium Pass at the upgrade price
  // (2026-11-11), read from the passes already loaded; a failed points read
  // still shows it (the order route charges both again).
  let fixView: FixPointsView | null = null;
  if (user && !member && site === "pyqvault") {
    const { credits, creditFrom } = upgradeCredits(rows, allPlans, now);
    let points = 0;
    let referralPct = 0;
    try {
      const admin = createSupabaseAdminClient();
      const [balance, referral] = await Promise.all([
        readFixPoints(admin, user.id, new Date(now)),
        readReferralDiscount(admin, user.id).catch((e: unknown) => {
          console.error("pricing: referral read failed", e);
          return 0;
        }),
      ]);
      points = balance.points;
      referralPct = referral;
    } catch (e) {
      console.error("pricing: fix points read failed", e);
    }
    fixView = fixPointsView({ points, plans: allPlans, hasPass: false, referralPct, credits, creditFrom });
  }
  const examLine = site === "pyqvault" ? await passLineForViewer(user?.id ?? null) : null;
  // Staff already have everything a pass sells.
  // ownsPlan, not "covers": a Practice holder covers the online checks but does
  // not own the Premium Pass, which adds downloads.
  const owns = (plan: Plan) => !!member || ownsPlan(rows, plan, now);
  const highlighted = searchParams.plan;
  // Where the buyer was blocked (a mock's Start button, the download gate); they
  // land back there after paying, and the sign-in round-trip keeps it.
  const returnTo = searchParams.next ? afterPurchasePath(searchParams.next) : undefined;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-12">
        {/* The offer leads (owner, 2026-11-02): on a phone the price used to
            sit on the third screen, under the note and the results strip. */}
        <header className="hero-soft rounded-2xl px-5 py-6 text-center sm:py-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Pricing</h1>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Every question is free to browse. The pass is for when you want more.
          </p>
        </header>

        {/* The free exams (migration 0210, owner 2026-11-02). The six are pinned
            by tests/billing-exam-pass.test.ts, so this line cannot quietly drift. */}
        {site === "pyqvault" && (
          <p className="mx-auto mt-6 max-w-md rounded-md border border-brand-accent/30 bg-brand-accent/5 p-3 text-center text-sm">
            Free for Class 9 and 10: CBSE 10, ICSE 10, Maharashtra Class 9 and 10, SPI and Foundation Course.
            PDF downloads need the Premium Pass, as for every exam.
          </p>
        )}

        {examLine && (
          <p className="mx-auto mt-6 max-w-md text-center text-sm font-medium">{examLine}</p>
        )}

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
                      {fixView?.prices[plan.id] ?? formatPrice(plan.amountPaise, plan.currency)}
                    </span>
                    {fixView?.prices[plan.id] && (
                      <s className="text-base text-muted-foreground">{formatPrice(plan.amountPaise, plan.currency)}</s>
                    )}
                    <span className="text-sm text-muted-foreground">/ {planLengthLabel(plan)}</span>
                  </p>
                  {fixView?.prices[plan.id] && !owns(plan) && (
                    <p className="mt-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      {passOfferNote(fixView, plan.id)}
                    </p>
                  )}
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
                        buttonLabel={`${fixView?.credits[plan.id] ? "Upgrade to" : "Buy"} ${plan.label}: ${fixView?.prices[plan.id] ?? formatPrice(plan.amountPaise, plan.currency)}`}
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

        {/* The owner's own words (2026-10-11), kept in the first person on
            purpose; below the offer since 2026-11-02 (owner). */}
        <p className="mx-auto mt-8 max-w-md text-center font-serif text-sm leading-relaxed text-muted-foreground">
          I wish I could keep all of PYQ Vault free. But maintaining and running the website costs money,
          so I charge a small fee to keep it going. I hope you understand.
        </p>

        {site === "pyqvault" && <ResultsStrip className="mt-6" />}

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

/**
 * The pass in the viewer's own exam (2026-11-02): a signed-in student's first
 * target exam, else the exam a visitor picked (qb_exam). Nothing for a free
 * exam, an exam with no mocks, or when the read fails: the offer stands alone.
 */
async function passLineForViewer(userId: string | null): Promise<string | null> {
  try {
    const slug = userId
      ? (await getOnboardingState(createSupabaseServerClient(), userId)).targetExams[0] ?? null
      : (await cookies()).get("qb_exam")?.value ?? null;
    if (!isExamSlug(slug) || passScopeForExam(slug) !== SCOPE_MOCKS) return null;
    const cards = await getMockExamCardsCached();
    return passLineForExam(cards.find((c) => c.slug === slug));
  } catch (e) {
    console.error("pricing exam line", e instanceof Error ? e.message : e);
    return null;
  }
}
