import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import PlayHub from "./PlayHub";

/**
 * /play, the games hub (2026-11-17; arcade rebuild 2026-11-18): a 3D ring of
 * six subjects; tapping one opens its games. The games borrow the mechanics of
 * well-known arcade and puzzle games (owner: "games should resemble originals")
 * with our own names and look, and play with lives and scores: inside /play
 * the engagement gate is looser than in the study app (CLAUDE.md).
 *
 * Static and cached: the page reads nothing about the visitor; each game's
 * progress line comes from what the browser saved (components/play/useLocalStore).
 */
export const metadata: Metadata = {
  title: "Play: free learning games for exam prep",
  description:
    "Free games that train exam skills: Number Rain for quick sums, Word Groups and Daily Word for vocabulary, Launch for projectiles, Element Hunt for the periodic table, Timeline for history dates and Pin It for the map of India.",
  alternates: { canonical: "/play" },
};

export const revalidate = 86400;

export default function PlayPage() {
  return (
    <>
      <AppHeader />
      <main className="arcade w-full">
        <div className="mx-auto w-full max-w-md px-4 pb-12 pt-6 sm:px-6 sm:pt-8">
          <PlayHub />
        </div>
      </main>
      <Footer />
    </>
  );
}
