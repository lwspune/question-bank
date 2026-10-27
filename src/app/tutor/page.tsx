import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import TutorInterestForm from "./TutorInterestForm";

/**
 * The 1:1 tutoring interest check (owner, 2026-10-27; migration 0190): three
 * taps that measure demand before anything is built. Kept out of search: it
 * offers nothing yet, so it should not rank for "tutoring".
 */
export const metadata: Metadata = {
  title: "1:1 tutoring",
  description: "Tell us whether you would want 1:1 tutoring, as a student or as a teacher.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/tutor" },
};

export default function TutorPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-xl px-4 py-8 sm:px-6">
        <header className="hero-soft rounded-2xl px-5 py-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">1:1 tutoring</h1>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            We are thinking of adding one-to-one tutoring. Three quick taps tell us whether to build it.
          </p>
        </header>
        <TutorInterestForm />
      </main>
      <Footer />
    </>
  );
}
