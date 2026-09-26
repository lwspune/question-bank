import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/app/about/ContactForm";
import { LegalH2, LegalP, LegalPage } from "@/components/legal/LegalPage";
import { CONTACT_EMAIL } from "@/lib/brand";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact PYQ Vault about your account, a payment or refund, or a wrong answer in the question bank.",
  alternates: { canonical: "/contact" },
};

/**
 * /contact — a payment gateway's site review looks for a page by this name.
 * It reuses the /about ContactForm (one form, one /api/contact endpoint)
 * rather than building a second one.
 */
export default function ContactPage() {
  return (
    <LegalPage
      title="Contact us"
      intro={
        <>
          Questions about your account, a payment or a refund? Found a wrong answer? Write to us
          and we will reply by email, usually within 2–3 working days.
        </>
      }
    >
      <div className="mt-8 rounded-xl border bg-card p-5 sm:p-6">
        <ContactForm />
      </div>

      <LegalH2>Other ways to reach us</LegalH2>
      <LegalP>
        Email:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-accent underline">
          {CONTACT_EMAIL}
        </a>
        <br />
        PYQ Vault · Vilas Shinde · Pune, Maharashtra, India
      </LegalP>
      <LegalP>
        For refunds, see the{" "}
        <Link href="/refunds" className="text-brand-accent underline">
          Refund &amp; Cancellation Policy
        </Link>
        .
      </LegalP>
    </LegalPage>
  );
}
