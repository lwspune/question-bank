import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import ClassInterestForm from "./ClassInterestForm";

/**
 * Offline classes in Pune (owner, 2026-11-16; migration 0265): the header's
 * Classes button lands here. A visitor picks courses, Pune or another city,
 * and leaves a number; the team calls back. It replaced the 1:1 tutoring check
 * at /tutor, which now redirects here.
 *
 * Cached: the page reads nothing about the visitor (the form asks the browser,
 * like /tutor did, tests/home-tutor-stay-static.test.ts). Kept out of search
 * until the team has seen the first leads.
 */
export const metadata: Metadata = {
  title: "Offline classes in Pune",
  description:
    "Classroom coaching in Pune for NDA, CDS, AFCAT, SPI, MHT-CET, JEE, 10th and 12th Boards and SSC CGL. Leave your number and our team will call you.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/classes" },
};

export const revalidate = 86400;

export default function ClassesPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-xl px-4 py-8 sm:px-6">
        <header className="hero-soft rounded-2xl px-5 py-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Offline classes in Pune</h1>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Classroom coaching for NDA, CDS, AFCAT, SPI, MHT-CET, JEE, 10th and 12th Boards and SSC CGL. Leave
            your number and our team will call you.
          </p>
        </header>
        <ClassInterestForm />
      </main>
      <Footer />
    </>
  );
}
