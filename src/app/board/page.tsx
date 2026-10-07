import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { boardIndexGroups } from "@/lib/board/examIndex";
import BoardFeedList from "./BoardFeedList";

export const metadata: Metadata = {
  title: "Board textbook solutions",
  description:
    "Read school-board textbooks chapter by chapter: solved examples, exercises, and miscellaneous questions with model answers, in book order. Free.",
  alternates: { canonical: "/board" },
};

export default function BoardIndex() {
  // Grouped by board, classes ascending. Derived from the registry's board/std
  // fields — NOT from the exam name, which does not sort into families
  // ("Maharashtra HSC Class 12" files under …H, away from its …State Board
  // siblings). See lib/exam/examFamily for the three rules.
  const groups = boardIndexGroups();

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Textbook Solutions</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Your board textbook, chapter by chapter, laid out the way the book teaches it. Every solved example,
            exercise and miscellaneous question has a model answer.
          </p>
        </header>

        <BoardFeedList groups={groups} />
      </main>
      <Footer />
    </>
  );
}
