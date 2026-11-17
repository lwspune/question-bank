import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import DailyWord from "./DailyWord";

/**
 * /play/daily-word (2026-11-17): one past-paper word a day, the same for
 * everyone, from public/data/play-daily-words.json (`npm run play:words`).
 * Static; guesses live in the browser.
 */
export const metadata: Metadata = {
  title: "Daily Word: guess today's exam word",
  description:
    "A free daily word game. Guess today's word from a real SSC, NDA or CDS past paper in six tries, then answer the exam question it came from.",
  alternates: { canonical: "/play/daily-word" },
};

export const revalidate = 86400;

export default function DailyWordPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-md px-4 py-6 sm:px-6 sm:py-8">
        <DailyWord />
      </main>
      <Footer />
    </>
  );
}
