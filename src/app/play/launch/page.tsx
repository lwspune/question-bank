import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import GameFrame from "@/components/play/GameFrame";
import Launch from "./Launch";

/**
 * /play/launch (2026-11-18): the Physics game. Projectile motion with g = 10,
 * 30 levels (towers, walls, cliffs, hoops), 3 shots each. Static and cached;
 * stars live in the browser (lib/play/launch).
 */
export const metadata: Metadata = {
  title: "Launch: a projectile motion game",
  description:
    "A free physics game: set the angle and speed, fire, and hit the target. 30 levels of projectile motion with g = 10 m/s², as in NDA, JEE and NEET.",
  alternates: { canonical: "/play/launch" },
};

export const revalidate = 86400;

export default function LaunchPage() {
  return (
    <>
      <AppHeader />
      <GameFrame title="Launch">
        <Launch />
      </GameFrame>
      <Footer />
    </>
  );
}
