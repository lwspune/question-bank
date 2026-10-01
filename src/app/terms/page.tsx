import type { Metadata } from "next";
import Link from "next/link";
import { LegalH2, LegalList, LegalP, LegalPage } from "@/components/legal/LegalPage";
import { CONTACT_EMAIL } from "@/lib/brand";
import { formatRupees, planLengthLabel } from "@/lib/billing/plans";
import { listActivePlans, readFreeMockLimit } from "@/lib/billing/plansQuery";
import { createSupabaseAnonClient } from "@/lib/supabase/server";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms for using PYQ Vault: what is free, what the paid passes include, payments, and your responsibilities.",
  alternates: { canonical: "/terms" },
};

export default async function TermsPage() {
  // Prices and lengths come from public.plans, so this page cannot quote a
  // price the checkout does not charge. Cached a day; the admin save
  // revalidates it.
  const anon = createSupabaseAnonClient();
  const [plans, freeMocks] = await Promise.all([listActivePlans(anon), readFreeMockLimit(anon)]);

  return (
    <LegalPage
      title="Terms of Service"
      updated="27 September 2026"
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
        exams. Browsing questions, guides and notes needs no account and is free.{" "}
        {freeMocks === null
          ? "With a free account you can take timed mock tests; Word paper downloads need a paid pass."
          : `With a free account you can take ${freeMocks} timed mock tests; more mock tests and Word paper downloads need a paid pass.`}
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

      <LegalH2>Passes and payment</LegalH2>
      <LegalP>
        {plans.length === 0
          ? "No passes are on sale at the moment. When they are, they are priced in Indian rupees:"
          : "We sell these passes, priced in Indian rupees:"}
      </LegalP>
      <LegalList
        items={plans.map((p) => (
          <>
            <strong>{p.label}</strong>: {formatRupees(p.amountPaise)} for{" "}
            {planLengthLabel(p)}. {p.blurb}
          </>
        ))}
      />
      <LegalList
        items={[
          <>
            Each pass is a <strong>one-time payment</strong>. Access starts when the payment
            succeeds and lasts for the period shown.
          </>,
          "A pass is for one person's own use. Papers you download may be printed for your own study or, if you teach, handed out to your own students; they may not be resold or republished, and the PYQ Vault watermark and footer must stay on them.",
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
