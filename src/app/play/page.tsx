import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import PlayHub from "./PlayHub";

/**
 * /play, the games hub (2026-11-17): a 3D ring of subjects, the homepage
 * ring's look, with each subject's games below (Maths: the speed game at
 * /play/maths; English: Word Builder and Daily Word, real past-paper words).
 * The header's Play button. No rankings, streaks or lives (CLAUDE.md
 * engagement gate).
 *
 * Static and cached: the page reads nothing about the visitor; each card's
 * progress line comes from what the browser saved (components/play/useLocalStore).
 */
export const metadata: Metadata = {
  title: "Play: free learning games for exam prep",
  description:
    "Free games that train exam skills: a 60-second maths speed game, and English word games built from real SSC, NDA and CDS past-paper questions.",
  alternates: { canonical: "/play" },
};

export const revalidate = 86400;

export default function PlayPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-md px-4 py-6 sm:px-6 sm:py-8">
        <PlayHub />
      </main>
      <Footer />
    </>
  );
}
