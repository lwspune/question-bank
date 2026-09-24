/**
 * /start — how PYQ Vault works, on one public page.
 *
 * WHY IT EXISTS. Measured 2026-09-24: 149 of 193 mock-takers had used a mock
 * and nothing else, 2 students had ever finished a drill, and nothing on the
 * site said what happens after a mock. There was no help, FAQ or start page
 * at all. This is the page the welcome email, the footer, the account menu and
 * the /me hero point at. STUDENT_EDUCATION_SPEC.md §4 item 3.
 *
 * STATIC AND INDEXABLE. It reads nothing per-visitor, so it prerenders and is
 * served from cache to everyone, signed in or not. The loop text comes from
 * lib/education/howItWorks.ts — the same objects the welcome step and the
 * email render — so this page cannot describe a loop the app does not have.
 *
 * Deliberately NOT a tour and NOT a feature list. Two loops, then one line per
 * tab. A student who wants more taps a link.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Compass, Library, NotebookPen, Timer } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import { loopFor } from "@/lib/education/howItWorks";
import { getExamBySlug } from "@/lib/exam/examContext";

export const revalidate = 86400;

const PAGE_TITLE = "How PYQ Vault works";
const PAGE_DESCRIPTION =
  "Sit a real past paper, fix what you missed five questions at a time, and watch your " +
  "chapter map fill. How to use PYQ Vault for NDA, CDS, NEET, MHT-CET, JEE Mains and " +
  "the board exams, in five minutes a day.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/start" },
  openGraph: { title: PAGE_TITLE, description: PAGE_DESCRIPTION, type: "website" },
};

const TABS = [
  {
    Icon: Compass,
    label: "Bank",
    href: "/browse",
    line: "Every past-year question, filtered by exam, chapter and year. Tap a question to attempt it, then reveal the answer.",
  },
  {
    Icon: Timer,
    label: "Mocks",
    href: "/mock",
    line: "Real past papers served whole as timed tests. Your score, section split and every question reviewable.",
  },
  {
    Icon: NotebookPen,
    label: "Notes",
    href: "/notes",
    line: "A chapter taught from scratch: the ideas, worked examples, a self-check and a mastery checkpoint.",
  },
  {
    Icon: BookOpen,
    label: "Guides",
    href: "/guide",
    line: "Which chapters carry the marks in each exam, and the order to study them in.",
  },
  {
    Icon: Library,
    label: "Board",
    href: "/board",
    line: "The textbook, exercise by exercise, with every answer worked. For State Board and CBSE classes.",
  },
] as const;

export default function StartPage() {
  // The general mock loop (any exam with papers) and one board exam's loop,
  // named so the reader sees which one is theirs.
  const mock = loopFor(null);
  const board = loopFor(getExamBySlug("mh-hsc-12"));

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{PAGE_TITLE}</h1>
        <p className="mt-3 max-w-2xl font-serif text-base leading-relaxed text-muted-foreground">
          Most students sit one paper and stop there. The score is the least useful thing
          on that page. The loop below is what moves it, and it takes about five minutes a
          day after the first sitting.
        </p>

        <section className="mt-10" aria-labelledby="loop-mock">
          <h2 id="loop-mock" className="text-lg font-semibold tracking-tight sm:text-xl">
            For an entrance exam
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            NDA, CDS, NEET, MHT-CET, JEE Mains, IPMAT.
          </p>
          <div className="mt-4">
            <HowItWorks loop={mock} />
          </div>
        </section>

        <section className="mt-10" aria-labelledby="loop-board">
          <h2 id="loop-board" className="text-lg font-semibold tracking-tight sm:text-xl">
            For a board or school exam
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Maharashtra State Board, CBSE, the Foundation course and the worksheets. No
            mocks here, so the loop is the book.
          </p>
          <div className="mt-4">
            <HowItWorks loop={board} />
          </div>
        </section>

        <section className="mt-10" aria-labelledby="tabs">
          <h2 id="tabs" className="text-lg font-semibold tracking-tight sm:text-xl">
            Every tab, one line each
          </h2>
          <ul className="mt-4 divide-y rounded-xl border bg-card">
            {TABS.map(({ Icon, label, href, line }) => (
              <li key={href} className="flex gap-3 p-4">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                <div className="min-w-0">
                  <Link
                    href={href}
                    className="font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    {label}
                  </Link>
                  <p className="mt-0.5 font-serif text-sm leading-relaxed text-muted-foreground">
                    {line}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Signed in, your initial at the top right opens the rest: the number on it is how
            many mistakes are waiting, and the menu holds Fix your mistakes, Your performance,
            Saved questions and your dashboard.
          </p>
        </section>

        <section className="mt-10 rounded-xl border bg-card p-6">
          <p className="font-semibold">Free to use</p>
          <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">
            Browsing, mocks, the drill and the map need only a free account. Teachers who
            want Word downloads of a paper can{" "}
            <Link href="/request-access" className="text-brand-accent underline">
              request teacher access
            </Link>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
