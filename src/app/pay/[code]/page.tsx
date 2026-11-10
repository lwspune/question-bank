import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Card, CardContent } from "@/components/ui/card";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { listActivePlans, readFreeLimits } from "@/lib/billing/plansQuery";
import { formatPrice, ownsPlan, planLengthLabel } from "@/lib/billing/plans";
import { upgradePricePaise } from "@/lib/billing/upgrade";
import { fillPerks } from "@/lib/billing/perkLimits";
import { loadEntitlements } from "@/lib/entitlements/query";
import { isParentCode, parentLinkState, type ParentLink, type ParentLinkState } from "@/lib/billing/parentLink";
import { readParentLink } from "@/lib/billing/parentLinkStore";
import { logActivityOnce } from "@/lib/activity/service";
import { paywallEvent } from "@/lib/activity/clientEvents";
import { istDayKey } from "@/lib/email/dueNudge";
import ParentPayButton from "./ParentPayButton";

/**
 * A parent's payment page (2026-11-09, migration 0244). A student sends this
 * link from a pass offer; the parent opens it with no account and pays, and
 * the pass goes to the student.
 *
 * Written for the PARENT: who it is for, what the pass does, what it costs,
 * and that it is a one-time payment. It shows the student's first name only,
 * never their email or how much they have practised. One copy per link, so it
 * renders on request, and it is kept out of search (noindex, robots.ts).
 */
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ code: string }> };

/** Link previews (WhatsApp fetches the URL to draw its card) are not a parent opening it. */
const PREVIEW_UA = /bot|crawl|spider|preview|whatsapp|facebookexternalhit|telegram|slack|discord|skype/i;

async function load(code: string): Promise<{ link: ParentLink | null; state: ParentLinkState | "invalid"; view: View | null }> {
  if (!isParentCode(code)) return { link: null, state: "invalid", view: null };
  const admin = createSupabaseAdminClient();
  const link = await readParentLink(admin, code);
  if (!link) return { link: null, state: "invalid", view: null };
  const [plans, limits, rows] = await Promise.all([
    listActivePlans(admin),
    readFreeLimits(admin),
    loadEntitlements(admin, link.userId),
  ]);
  const now = Date.now();
  const plan = plans.find((p) => p.id === link.planId) ?? null;
  const state = parentLinkState({ link, plan, nowMs: now, studentHasPass: plan ? ownsPlan(rows, plan, now) : false });
  const view: View | null = plan
    ? {
        planLabel: plan.label,
        // A Practice Pass holder's link to Premium shows the upgrade price, as its order charges (2026-11-11).
        price: formatPrice(upgradePricePaise(plan, rows, plans, now), plan.currency),
        length: planLengthLabel(plan),
        perks: fillPerks(plan.perks, limits),
      }
    : null;
  return { link, state, view };
}

type View = { planLabel: string; price: string; length: string; perks: string[] };

function whoFor(link: ParentLink | null): string {
  return link?.studentName ?? "a PYQ Vault student";
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { code } = await props.params;
  const robots = { index: false, follow: false };
  if (!isParentCode(code)) return { title: "Payment link", robots };
  const link = await readParentLink(createSupabaseAdminClient(), code).catch(() => null);
  const name = link?.studentName;
  return {
    title: name ? `Pay for ${name}'s PYQ Vault pass` : "Pay for a PYQ Vault pass",
    description: "A one-time payment for a PYQ Vault pass: past exam papers and practice, without the daily limits.",
    robots,
  };
}

export default async function ParentPayPage(props: Props) {
  const { code } = await props.params;
  const { link, state, view } = await load(code);

  if (link && state === "payable") {
    const ua = (await headers()).get("user-agent") ?? "";
    if (!PREVIEW_UA.test(ua)) {
      const event = paywallEvent("parent_link_opened", "parent", link.planId);
      await logActivityOnce(createSupabaseAdminClient(), link.userId, {
        ...event,
        dedupeKey: `paywall:parent_link_opened:${link.code}:${istDayKey(new Date())}`,
      });
    }
  }

  const name = whoFor(link);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-xl px-4 py-6 sm:py-12">
        {state === "invalid" && (
          <Notice title="This link isn't valid">
            Check that the whole link was copied. If it still doesn&apos;t open, ask for a new one.
          </Notice>
        )}
        {state === "expired" && (
          <Notice title="This link has expired">
            Payment links last a week. Ask {name} to send a new one from PYQ Vault.
          </Notice>
        )}
        {state === "pass_gone" && (
          <Notice title="This pass is no longer sold">Ask {name} to send a new link from PYQ Vault.</Notice>
        )}
        {state === "already_active" && (
          <Notice title={`${link?.studentName ?? "This student"} already has this pass`} ok>
            There is nothing to pay. Thank you for checking.
          </Notice>
        )}

        {state === "payable" && link && view && (
          <>
            <header className="hero-soft rounded-2xl px-5 py-6 text-center sm:py-8">
              <p className="text-sm font-medium text-brand-accent">PYQ Vault</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                {link.studentName ? `${link.studentName} has asked you for a pass` : "A student has asked you for a pass"}
              </h1>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                PYQ Vault is a website of past exam papers for Indian entrance and board exams. It is free to use
                with daily limits. The pass removes them.
              </p>
            </header>

            <Card className="mt-6">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">{view.planLabel}</p>
                <p className="mt-1 text-3xl font-bold">
                  {view.price}
                  <span className="ml-2 text-base font-normal text-muted-foreground">for {view.length}</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">One payment. It does not renew on its own.</p>

                {view.perks.length > 0 && (
                  <>
                    <h2 className="mt-5 text-sm font-semibold">What {name} gets</h2>
                    <ul className="mt-2 space-y-2 text-sm">
                      {view.perks.map((perk) => (
                        <li key={perk} className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <div className="mt-6">
                  <ParentPayButton code={link.code} price={view.price} studentName={link.studentName} />
                </div>
                <p className="mt-3 text-center text-xs text-muted-foreground">UPI, cards and net banking</p>
              </CardContent>
            </Card>

            <section className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p className="flex gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  Payment is handled by Razorpay. The pass goes to {name}&apos;s account only; you do not need an
                  account.
                </span>
              </p>
              <p className="flex gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  This link works until{" "}
                  {new Date(link.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", timeZone: "Asia/Kolkata" })}.
                </span>
              </p>
              <p>
                Questions? See the{" "}
                <Link href="/refunds" className="underline underline-offset-2 hover:text-foreground">
                  refund policy
                </Link>{" "}
                or{" "}
                <Link href="/contact" className="underline underline-offset-2 hover:text-foreground">
                  contact us
                </Link>
                .
              </p>
            </section>
          </>
        )}
      </main>
    </>
  );
}

function Notice({ title, children, ok = false }: { title: string; children: React.ReactNode; ok?: boolean }) {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        {ok && <CheckCircle2 className="mx-auto h-8 w-8 text-brand-accent" aria-hidden="true" />}
        <h1 className="mt-2 text-xl font-semibold">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{children}</p>
        <p className="mt-4 text-sm">
          <Link href="/" className="underline underline-offset-2">
            About PYQ Vault
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
