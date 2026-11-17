import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import GameFrame from "@/components/play/GameFrame";
import Timeline from "./Timeline";

/**
 * /play/timeline (2026-11-18): the History game. Place events in order, 3
 * lives; four decks (ancient and medieval India, modern India, India after
 * 1947, world history). Static; bests live in the browser.
 */
export const metadata: Metadata = {
  title: "Timeline: a history dates game",
  description:
    "A free history game: put events from Indian and world history in order. Four decks, from the Mauryas to Chandrayaan-3, with the dates exams ask.",
  alternates: { canonical: "/play/timeline" },
};

export const revalidate = 86400;

export default function TimelinePage() {
  return (
    <>
      <AppHeader />
      <GameFrame title="Timeline">
        <Timeline />
      </GameFrame>
      <Footer />
    </>
  );
}
