import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import GameFrame from "@/components/play/GameFrame";
import WordGroups from "./WordGroups";

/**
 * /play/word-groups (2026-11-18): the English grouping puzzle. 16 words, 4
 * groups of synonyms built around real past-paper vocabulary, 4 mistakes.
 * Static and cached; results live in the browser (lib/play/groups).
 */
export const metadata: Metadata = {
  title: "Word Groups: a daily vocabulary puzzle",
  description:
    "A free daily word puzzle: sort 16 words into four groups that mean the same thing. Built around vocabulary from real SSC, NDA and CDS papers.",
  alternates: { canonical: "/play/word-groups" },
};

export const revalidate = 86400;

export default function WordGroupsPage() {
  return (
    <>
      <AppHeader />
      <GameFrame title="Word Groups">
        <WordGroups />
      </GameFrame>
      <Footer />
    </>
  );
}
