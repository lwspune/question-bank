import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Shield, Sigma } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";

export const metadata: Metadata = {
  title: "Strategy Guides — NDA and MHT-CET, built from the past-year bank",
  description:
    "Evidence-led exam strategy guides. Every claim is measured against the live past-year question bank rather than a syllabus summary. Pick your exam.",
  alternates: { canonical: "/guide" },
};

/**
 * /guide is the cross-exam entry point.
 *
 * Until 2026-08-22 this was a bare redirect to /guide/nda, with a comment
 * saying it should become a real picker "when a second exam ships". MHT-CET is
 * that second exam.
 *
 * The LIST is derived from EXAM_REGISTRY (every entry whose `guidesPath` is
 * non-null), so shipping a third exam's guides is a one-line registry change
 * and this page updates itself. COPY is looked up per slug below; an exam with
 * guides but no copy entry still renders, with its display name and a neutral
 * blurb, because silently omitting a shipped guide is the worse failure.
 */
type GuideCopy = {
  title: string;
  blurb: string;
  meta: string;
  icon: typeof BookOpen;
};

const COPY: Record<string, GuideCopy> = {
  nda: {
    title: "NDA — ten subject guides",
    blurb:
      "Mathematics, English (GAT), Physics, Chemistry, Biology, Geography, History, Polity, Economics and Current Affairs. Principles, per-chapter playbooks, year-on-year drift and the distractor traps NDA reuses.",
    meta: "8,259 questions · 2017-2026",
    icon: Shield,
  },
  "mht-cet": {
    title: "MHT-CET — Mathematics",
    blurb:
      "Six chapters carry 47% of the Maths paper, there is no negative marking, and you get 1.8 minutes per question — so the guide is built around order and time rather than what to skip.",
    meta: "2,228 questions · 45 shifts · 2021-2025",
    icon: Sigma,
  },
};

export default function GuideIndex() {
  const exams = EXAM_REGISTRY.filter((e) => e.guidesPath !== null);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
        <GuideJsonLd
          type="CollectionPage"
          path="/guide"
          headline="Strategy Guides — NDA and MHT-CET"
          description="Evidence-led exam strategy guides. Every claim is measured against the live past-year question bank rather than a syllabus summary."
        />
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <ArrowRight className="h-3 w-3" aria-hidden />
              <span className="font-medium text-foreground">Guides</span>
            </li>
          </ol>
        </nav>

        <div className="mt-6 sm:mt-8">
          <GuideHero
            eyebrow="Strategy Guides"
            title="Guides built from real past papers, not a syllabus summary"
            subtitle="Every weightage, difficulty split and trend on these pages is measured against the live past-year question bank. Pick your exam."
          />
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {exams.map((exam) => {
            const copy = COPY[exam.slug];
            const Icon = copy?.icon ?? BookOpen;
            return (
              <li key={exam.slug}>
                <Link
                  href={exam.guidesPath!}
                  className="group flex h-full flex-col rounded-lg border bg-card p-6 transition-colors hover:border-primary/40 hover:bg-accent"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {exam.displayName}
                      </p>
                      <h2 className="text-lg font-semibold leading-tight">
                        {copy?.title ?? `${exam.displayName} guides`}
                      </h2>
                    </div>
                  </div>

                  <p className="mt-4 flex-1 text-sm text-muted-foreground">
                    {copy?.blurb ??
                      `Strategy guides for ${exam.displayName}, built from the live past-year question bank.`}
                  </p>

                  {copy?.meta ? (
                    <p className="mt-4 text-xs font-medium text-muted-foreground">
                      {copy.meta}
                    </p>
                  ) : null}

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent">
                    Open {exam.displayName} guides
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
      <Footer />
    </>
  );
}
