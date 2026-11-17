import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import GameFrame from "@/components/play/GameFrame";
import ElementHunt from "./ElementHunt";

/**
 * /play/element-hunt (2026-11-18): the Chemistry game. The periodic table is
 * the board; 60-second rounds of clues (names, atomic numbers, group and
 * period, families, exam facts). Static; bests live in the browser.
 */
export const metadata: Metadata = {
  title: "Element Hunt: a periodic table game",
  description:
    "A free chemistry game: find elements on the periodic table from their name, atomic number, group and period, family or a well-known fact, against the clock.",
  alternates: { canonical: "/play/element-hunt" },
};

export const revalidate = 86400;

export default function ElementHuntPage() {
  return (
    <>
      <AppHeader />
      <GameFrame title="Element Hunt">
        <ElementHunt />
      </GameFrame>
      <Footer />
    </>
  );
}
