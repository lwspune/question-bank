import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, GraduationCap } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { courseLevel } from "@/lib/learn/courseName";
import { examAnchor, groupCoursesByExam } from "@/lib/learn/hub";
import { courseHref } from "@/lib/learn/links";
import { getAllOutlines } from "@/lib/learn/query";
import { SUBJECT_NAMES } from "@/lib/learn/subjects";
import LearnComingSoon from "./LearnComingSoon";

/**
 * /learn: the Learn courses (an experiment from 2026-10-27, Concept Ladder's lessons copied in;
 * migration 0192), grouped by exam since 2026-11-27 (every subject Concept Ladder teaches). An
 * exam with several courses links here at its group's anchor (lib/learn/hub). Cached and the same
 * for everyone, refreshed daily.
 */
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Learn: step-by-step lessons in Maths, Physics, Chemistry and Biology",
  description:
    "Learn one concept at a time for your exam: a short lesson, then questions until you have it, with the mistake behind every wrong answer explained.",
  alternates: { canonical: "/learn" },
};

export default async function LearnHub() {
  // Outlines, not the course list: a course's years come from its chapters (NDA's span Class 11 and 12).
  const groups = groupCoursesByExam(await getAllOutlines());
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Learn</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            One concept at a time: a short lesson, then questions until you have it. A wrong answer tells you the
            mistake behind it, and a mistake you repeat sends you back to the idea it comes from.
          </p>
        </header>
        <LearnComingSoon />
        <div className="space-y-8">
          {groups.map((g) => (
            <section key={g.exam} id={examAnchor(g.exam)} aria-labelledby={`learn-${g.exam}`} className="scroll-mt-20">
              <h2 id={`learn-${g.exam}`} className="section-title mb-3 text-lg font-semibold text-foreground">
                {g.name}
              </h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {g.courses.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={courseHref(c.slug)}
                      aria-label={`${g.name} ${SUBJECT_NAMES[c.subject] ?? c.subject}`}
                      className="group flex h-full items-start gap-3 rounded-2xl border bg-card p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="icon-tile grid h-10 w-10 shrink-0 place-items-center rounded-xl">
                        <GraduationCap className="h-5 w-5 text-brand-accent" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-foreground">{SUBJECT_NAMES[c.subject] ?? c.subject}</span>
                        <span className="mt-1 block text-sm text-muted-foreground">
                          {/* The group heading names the exam, so the card says only the years and the size. */}
                          {[courseLevel(c.chapters.map((ch) => ch.standard)), `${c.chapters.length} chapters`].filter(Boolean).join(", ")}
                        </span>
                      </span>
                      <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground group-hover:text-foreground" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
