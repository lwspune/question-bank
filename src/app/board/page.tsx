import Link from "next/link";
import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { BOARD_EXAMS } from "@/lib/exam/examContext";

export const metadata: Metadata = {
  title: "Board textbook solutions",
  description:
    "Read school-board textbooks chapter by chapter — solved examples, exercises, and miscellaneous questions with model answers, in book order. Free.",
  alternates: { canonical: "/board" },
};

export default function BoardIndex() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Textbook Solutions</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Your board textbook, chapter by chapter — every solved example, exercise, and miscellaneous question with
            a model answer, laid out the way the book teaches it.
          </p>
        </header>

        <ul className="grid gap-3">
          {BOARD_EXAMS.map((exam) => (
            <li key={exam.slug}>
              <Link
                href={`/board/${exam.slug}`}
                className="group flex items-center gap-3 rounded-lg border bg-card px-4 py-4 transition-colors hover:border-brand-accent/40 hover:bg-brand-accent/5"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-accent/10 text-brand-accent">
                  <GraduationCap className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-medium text-foreground">{exam.displayName}</span>
                  <span className="block text-xs text-muted-foreground">Textbook chapters with model answers</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
