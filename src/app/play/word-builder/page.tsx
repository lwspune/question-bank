import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import WordBuilder from "./WordBuilder";

/**
 * /play/word-builder (2026-11-17): rounds of real past-paper synonym and
 * antonym questions (SSC, NDA, CDS) from public/data/play-words.json
 * (`npm run play:words`). Static; progress lives in the browser.
 */
export const metadata: Metadata = {
  title: "Word Builder: learn real SSC, NDA and CDS vocabulary",
  description:
    "Free vocabulary game built from real past-paper synonym and antonym questions. Words you miss come back until you have them right on three different days.",
  alternates: { canonical: "/play/word-builder" },
};

export const revalidate = 86400;

export default function WordBuilderPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-md px-4 py-6 sm:px-6 sm:py-8">
        <WordBuilder />
      </main>
      <Footer />
    </>
  );
}
