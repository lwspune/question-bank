import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Atom,
  BookOpen,
  Compass,
  FlaskConical,
  Globe,
  Landmark,
  Languages,
  Leaf,
  NotebookPen,
  Scale,
} from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getExamHomeStats } from "@/lib/exam/examHomeStats";
import { resolveBankHref } from "@/lib/exam/examContext";

export const revalidate = 3600;

const PAGE_TITLE = "NDA Preparation — Past Papers, Strategy Guides, Teaching Notes";
const PAGE_DESCRIPTION =
  "Everything you need to prepare for the NDA in one place. Browse 4,800+ past-year " +
  "questions, read evidence-led strategy guides for eight subjects, and study " +
  "concept-by-concept teaching notes. Free, no sign-up.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/nda" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
  },
};

type GuidePreview = {
  href: string;
  exam: string;
  qCount: number;
  Icon: typeof BookOpen;
};

const GUIDE_PREVIEWS: GuidePreview[] = [
  { href: "/guide/nda-maths", exam: "Mathematics", qCount: 2160, Icon: BookOpen },
  { href: "/guide/nda-english", exam: "English (GAT)", qCount: 900, Icon: Languages },
  { href: "/guide/nda-physics", exam: "Physics (Part B)", qCount: 449, Icon: Atom },
  { href: "/guide/nda-geography", exam: "Geography (Part A)", qCount: 345, Icon: Globe },
  { href: "/guide/nda-chemistry", exam: "Chemistry (Part B)", qCount: 262, Icon: FlaskConical },
  { href: "/guide/nda-history", exam: "History (Part A)", qCount: 260, Icon: Landmark },
  { href: "/guide/nda-biology", exam: "Biology (Part B)", qCount: 190, Icon: Leaf },
  { href: "/guide/nda-polity", exam: "Polity (Part A)", qCount: 90, Icon: Scale },
];

type NotesPreview = {
  href: string;
  chapter: string;
  blurb: string;
  conceptCount: number;
};

const NOTES_PREVIEWS: NotesPreview[] = [
  {
    href: "/notes/nda-maths/statistics",
    chapter: "Statistics",
    blurb:
      "Mean, median, mode, dispersion, regression — taught concept-by-concept with worked PYQ examples.",
    conceptCount: 25,
  },
  {
    href: "/notes/nda-maths/vectors",
    chapter: "Vectors",
    blurb:
      "Magnitude, dot/cross product, scalar triple, vector geometry — small but high-yield NDA Maths chapter.",
    conceptCount: 22,
  },
];

export default async function NdaHomePage() {
  const supabase = createSupabaseAnonClient();
  const stats = await getExamHomeStats(supabase, "NDA");
  const bankHref = resolveBankHref(stats.examId);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
        <GuideJsonLd
          type="CollectionPage"
          path="/nda"
          headline={PAGE_TITLE}
          description={PAGE_DESCRIPTION}
        />

        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/browse" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <ArrowRight className="h-3 w-3" aria-hidden />
              <span className="font-medium text-foreground">NDA</span>
            </li>
          </ol>
        </nav>

        <div className="mt-6 sm:mt-8">
          <GuideHero
            eyebrow="NDA Preparation"
            title="One home for NDA past papers, strategy, and concept notes"
            subtitle="Everything in one place — built from the live past-year question bank. Free, no sign-up. Anonymous-friendly."
          />
        </div>

        {/* Live stats + primary CTA */}
        <section className="mb-12 rounded-xl border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-2.5 py-1 font-semibold tabular-nums">
              {stats.totalPublicQuestions.toLocaleString("en-IN")} questions
            </span>
            <span className="text-muted-foreground">10 subjects · 2017–2026</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={bankHref}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Compass className="h-4 w-4" aria-hidden />
              Build a paper
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <Link
              href="/guide/nda"
              className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <BookOpen className="h-4 w-4" aria-hidden />
              All eight guides
            </Link>
          </div>
        </section>

        {/* Strategy Guides preview */}
        <section className="mb-12">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Strategy guides
            </h2>
            <Link
              href="/guide/nda"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              See all eight
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
          <p className="mb-5 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground">
            Evidence-led, built per subject from the live question bank — chapter
            strategy, playbooks, year-on-year drift, and the distractor traps
            NDA reuses.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDE_PREVIEWS.map(({ href, exam, qCount, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex h-full items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold tracking-tight">
                      {exam}
                    </p>
                    <p className="text-xs tabular-nums text-muted-foreground">
                      {qCount.toLocaleString("en-IN")} questions
                    </p>
                  </div>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Teaching Notes preview */}
        <section className="mb-12">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Teaching notes
            </h2>
            <Link
              href="/notes/nda-maths"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              All chapters
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
          <p className="mb-5 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground">
            Concept-by-concept notes built for both digital-board lectures and
            student self-study. Each subtopic carries intuition, formula,
            worked PYQ, and a one-click drill of every past-year question on
            that subtopic.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {NOTES_PREVIEWS.map(({ href, chapter, blurb, conceptCount }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-lg border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <NotebookPen className="h-4 w-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                        NDA Mathematics
                      </p>
                      <h3 className="text-base font-semibold tracking-tight">
                        {chapter}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">
                    {blurb}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs">
                    <span className="rounded-full border bg-background px-2 py-0.5 font-medium tabular-nums">
                      {conceptCount} concepts
                    </span>
                    <span className="inline-flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Open
                      <ArrowRight className="h-3 w-3" aria-hidden />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer banner — return to the bank */}
        <section className="rounded-xl border border-dashed bg-muted/30 p-5 sm:p-6">
          <h2 className="text-base font-semibold tracking-tight">
            Build the next paper
          </h2>
          <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground">
            Filter the bank by subject, chapter, difficulty, and PYQ year — then
            download the Question Paper + Answer Key as Word files. Two clicks.
          </p>
          <Link
            href={bankHref}
            className="mt-4 inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-semibold transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Compass className="h-4 w-4" aria-hidden />
            Open the question bank
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
