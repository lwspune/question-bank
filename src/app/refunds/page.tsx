import type { Metadata } from "next";
import Link from "next/link";
import { LegalH2, LegalList, LegalP, LegalPage } from "@/components/legal/LegalPage";
import { CONTACT_EMAIL } from "@/lib/brand";
import { PLANS, formatRupees, planLengthLabel } from "@/lib/billing/plans";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "PYQ Vault pass refunds: a full refund within 7 days of payment, how to ask, and how access is delivered.",
  alternates: { canonical: "/refunds" },
};

/** The refund window. Chosen by the owner, 2026-09-26. */
const REFUND_DAYS = 7;

export default function RefundsPage() {
  const passes = PLANS.map(
    (p) => `the ${p.label} (${formatRupees(p.amountPaise)} for ${planLengthLabel(p)})`
  ).join(" and ");

  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      updated="27 September 2026"
      intro={
        <>
          This policy covers {passes}. Each is a one-time payment. If a pass is not right for
          you, you can get your money back within {REFUND_DAYS} days.
        </>
      }
    >
      <LegalH2>{REFUND_DAYS}-day refund</LegalH2>
      <LegalP>
        Ask within <strong>{REFUND_DAYS} days</strong> of your payment and we refund the full
        amount. You do not need to give a reason. The pass ends when the refund is made.
      </LegalP>

      <LegalH2>Always refunded</LegalH2>
      <LegalP>Whenever you ask, even after {REFUND_DAYS} days, we refund:</LegalP>
      <LegalList
        items={[
          "a duplicate payment for the same purchase;",
          "a payment that succeeded but did not unlock your pass, if we cannot fix it.",
        ]}
      />

      <LegalH2>After {REFUND_DAYS} days</LegalH2>
      <LegalP>
        After {REFUND_DAYS} days, a payment is not refundable, except in the cases above. Access
        continues until your pass ends.
      </LegalP>

      <LegalH2>How to ask</LegalH2>
      <LegalP>
        Email{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=Refund%20request`}
          className="text-brand-accent underline"
        >
          {CONTACT_EMAIL}
        </a>{" "}
        from the email on your account, or use the{" "}
        <Link href="/contact" className="text-brand-accent underline">
          contact page
        </Link>
        . Add the payment date, and the Razorpay payment ID if you have it.
      </LegalP>

      <LegalH2>When the money arrives</LegalH2>
      <LegalP>
        We process an approved refund within 2 working days. It goes back to the same card, UPI
        or bank account you paid from, usually within 5–7 working days. Your bank may take
        longer.
      </LegalP>

      <LegalH2>Cancellation</LegalH2>
      <LegalP>
        There is nothing to cancel. A pass does not renew automatically, so you are never
        charged again unless you buy again.
      </LegalP>

      <LegalH2>Delivery</LegalH2>
      <LegalP>
        A pass is a digital service. Nothing is shipped. Access is added to your PYQ Vault
        account as soon as the payment succeeds, usually within a minute. If it has not appeared
        after 30 minutes, email us and we will fix it.
      </LegalP>
    </LegalPage>
  );
}
