import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import GameFrame from "@/components/play/GameFrame";
import NumberRain from "./NumberRain";

/**
 * /play/maths: Number Rain (2026-11-18), the arcade game that replaced the
 * 60-second speed game here. Sums fall; typing an answer blasts the sum; 3
 * lives, combos, gold drops, a rain that speeds up. The speed game's eight
 * levels are its worlds. The owner sees students slip on everyday calculation
 * in class. Static and cached: progress lives in the browser (lib/play/rain);
 * a signed-in game also writes user_activity play_round. Experiment play-games.
 */
export const metadata: Metadata = {
  title: "Number Rain: a quick-calculation game",
  description:
    "Free arcade maths game: sums fall, type the answers to blast them before they land. Eight worlds from simple adding to two-digit times tables.",
  alternates: { canonical: "/play/maths" },
};

export const revalidate = 86400;

export default function PlayMathsPage() {
  return (
    <>
      <AppHeader />
      <GameFrame title="Number Rain">
        <NumberRain />
      </GameFrame>
      <Footer />
    </>
  );
}
