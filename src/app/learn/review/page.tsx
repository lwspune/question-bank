import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { ReviewList } from "@/components/learn/ReviewList";
import { LEARN_HUB } from "@/lib/learn/links";

/** A static shell: the student's due reviews load in the browser (ReviewList). */
export const metadata: Metadata = {
  title: "Review today",
  robots: { index: false },
};

export default function LearnReview() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Breadcrumbs className="mb-4" items={[{ href: LEARN_HUB, label: "Learn" }, { label: "Review today" }]} />
        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Review today</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Concepts you&apos;ve mastered come back after 1, 3, 7, 14 and 30 days. Two right answers pass a review.
          </p>
        </header>
        <ReviewList />
      </main>
      <Footer />
    </>
  );
}
