import type { Metadata } from "next";
import Link from "next/link";
import { LegalH2, LegalList, LegalP, LegalPage } from "@/components/legal/LegalPage";
import { CONTACT_EMAIL } from "@/lib/brand";
import { PLANS, formatRupees } from "@/lib/billing/plans";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms for using PYQ Vault: what is free, what premium includes, payments, and your responsibilities.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  // Price and length come from the plan catalogue, so this page cannot quote
  // a price the checkout does not charge.
  const plan = PLANS[0];
  const length = plan.durationDays ? `${plan.durationDays} days` : "life";

  return (
    <LegalPage
      title="Terms of Service"
      updated="26 September 2026"
      intro={
        <>
          PYQ Vault (pyqvault.com) is run by Vilas Shinde in Pune, Maharashtra, India. By using
          the site, you agree to these terms. If you do not agree, please do not use it.
        </>
      }
    >
      <LegalH2>The service</LegalH2>
      <LegalP>
        PYQ Vault is a past-year question bank and study site for Indian entrance and board
        exams. Browsing questions, guides and free notes needs no account and is free.
      </LegalP>

      <LegalH2>Accounts</LegalH2>
      <LegalList
        items={[
          "Give accurate details when you sign up, and keep your password private.",
          "One account is for one person. Do not share or resell access.",
          "You are responsible for what happens under your account.",
          "We may suspend an account that breaks these terms.",
        ]}
      />

      <LegalH2>Premium and payment</LegalH2>
      <LegalList
        items={[
          <>
            Premium costs <strong>{formatRupees(plan.amountPaise)}</strong> (Indian rupees) as a{" "}
            <strong>one-time payment</strong> for {length} of access, starting when the payment
            succeeds.
          </>,
          <>
            It does <strong>not renew automatically</strong>. We never charge you again unless you
            choose to buy again.
          </>,
          "Payments are processed by Razorpay. We do not see or store your card, UPI or bank details.",
          "We may change the price for future purchases. A change never affects access you have already paid for.",
          <>
            Refunds are covered by our{" "}
            <Link href="/refunds" className="text-brand-accent underline">
              Refund &amp; Cancellation Policy
            </Link>
            .
          </>,
        ]}
      />

      <LegalH2>Acceptable use</LegalH2>
      <LegalP>You agree not to:</LegalP>
      <LegalList
        items={[
          "copy or download the site's content in bulk, by script or otherwise;",
          "republish or sell our questions, solutions or notes;",
          "try to break into, overload or disrupt the site;",
          "use the site for anything unlawful.",
        ]}
      />

      <LegalH2>Content and accuracy</LegalH2>
      <LegalP>
        Question papers belong to the bodies that set them. Our solutions, notes, guides and the
        way the bank is organised belong to PYQ Vault. We check answers carefully, but mistakes
        can remain. The site is a study aid; it does not promise any exam result. If you find a
        wrong answer, please report it.
      </LegalP>

      <LegalH2>Limitation of liability</LegalH2>
      <LegalP>
        The site is provided &ldquo;as is&rdquo;. To the extent the law allows, PYQ Vault is not
        liable for indirect losses from using it. Our total liability to you is limited to the
        amount you paid us in the last 12 months.
      </LegalP>

      <LegalH2>Changes</LegalH2>
      <LegalP>
        We may update these terms. The date at the top shows the latest version. Using the site
        after a change means you accept it.
      </LegalP>

      <LegalH2>Governing law</LegalH2>
      <LegalP>
        These terms are governed by the laws of India. Any dispute falls under the courts of
        Pune, Maharashtra.
      </LegalP>

      <LegalH2>Contact</LegalH2>
      <LegalP>
        Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-accent underline">
          {CONTACT_EMAIL}
        </a>{" "}
        or use the{" "}
        <Link href="/contact" className="text-brand-accent underline">
          contact page
        </Link>
        .
      </LegalP>
    </LegalPage>
  );
}
