import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import PlayGame from "./PlayGame";

/**
 * /play, the calculation game (owner, 2026-11-16): 60-second rounds of basic
 * whole-number sums in eight levels, the header's Play button. The owner sees
 * students slip on everyday calculation in class, and studying is a chore, so
 * this trains the skill with a game's feel: a combo, a personal best and a
 * ghost race against your own best round. No rankings, streaks or lives
 * (CLAUDE.md engagement gate).
 *
 * Static and cached: the page reads nothing about the visitor. Progress lives
 * in the browser (lib/play/progress); a signed-in round also writes
 * user_activity play_round (migration 0267). Experiment play-games.
 */
export const metadata: Metadata = {
  title: "Maths speed game: quick calculation practice",
  description:
    "Free 60-second rounds of addition, subtraction, times tables and division in eight levels. Beat your own best and get faster at the calculations every exam needs.",
  alternates: { canonical: "/play" },
};

export const revalidate = 86400;

export default function PlayPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-md px-4 py-6 sm:px-6 sm:py-8">
        <PlayGame
          intro={
            <header className="hero-soft rounded-2xl px-5 py-6 text-center">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Maths speed game</h1>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                60 seconds a round. Get enough right at 80% or better to clear a level and open the next. Race your
                own best round.
              </p>
            </header>
          }
        />
      </main>
      <Footer />
    </>
  );
}
