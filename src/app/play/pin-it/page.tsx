import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import GameFrame from "@/components/play/GameFrame";
import PinIt from "./PinIt";

/**
 * /play/pin-it (2026-11-18): the Geography game. Tap where national parks,
 * dams, passes, heritage sites and ports are on the map of India (Survey of
 * India's official outline). Static; bests live in the browser.
 */
export const metadata: Metadata = {
  title: "Pin It: an India map game",
  description:
    "A free geography game: tap where national parks, dams, passes, heritage sites and ports are on the map of India. The places GK papers ask about.",
  alternates: { canonical: "/play/pin-it" },
};

export const revalidate = 86400;

export default function PinItPage() {
  return (
    <>
      <AppHeader />
      <GameFrame title="Pin It">
        <PinIt />
      </GameFrame>
      <Footer />
    </>
  );
}
