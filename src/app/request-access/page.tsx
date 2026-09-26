import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import RequestAccessForm from "./RequestAccessForm";
import Link from "next/link";
import { formatRupees, getPlan } from "@/lib/billing/plans";

const TEACHER_PASS_PRICE = formatRupees(getPlan("teacher-pass-1y")?.amountPaise ?? 49900);

export const metadata: Metadata = {
  title: "Request teacher access",
  description:
    "Teachers can build and download question papers on PYQ Vault. Request a teacher account and we'll set you up.",
  alternates: { canonical: "/request-access" },
};

const PERKS = [
  "Build custom papers from the past-year question bank",
  "Download the Question Paper + Answer Key as Word files",
  "Organise by branch and batch, with per-batch no-repeat warnings",
];

export default function RequestAccessPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl space-y-6 px-6 py-10">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Request teacher access
          </h1>
          <p className="text-sm text-muted-foreground">
            Browsing, previewing and notes are free for everyone. Building and
            downloading question papers as Word files is for teacher accounts,
            which our team sets up. Tell us a bit about yourself and we&apos;ll be
            in touch.
          </p>
        </header>

        <div className="rounded-lg border-2 border-brand-accent/40 p-4 text-sm">
          <p className="font-medium">Need papers today?</p>
          <p className="mt-1 text-muted-foreground">
            The Teacher Pass gives you Word paper and answer-key downloads straight
            away: {TEACHER_PASS_PRICE} for a year, one-time payment.
          </p>
          <Link
            href="/pricing?plan=teacher"
            className="mt-2 inline-block font-medium text-brand-accent underline"
          >
            Get the Teacher Pass
          </Link>
        </div>

        <ul className="space-y-2 rounded-lg border bg-muted/30 p-4">
          {PERKS.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm">
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent"
                aria-hidden
              />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <RequestAccessForm />
      </main>
    </>
  );
}
