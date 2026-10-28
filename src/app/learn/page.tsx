import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, GraduationCap } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { courseName } from "@/lib/learn/courseName";
import { courseHref } from "@/lib/learn/links";
import { listCourses } from "@/lib/learn/query";
import LearnComingSoon from "./LearnComingSoon";

/**
 * /learn: the Learn courses (an experiment from 2026-10-27, Concept Ladder's lessons copied in;
 * migration 0192). Cached and the same for everyone, refreshed daily.
 */
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Learn: step-by-step Maths lessons",
  description: "Learn Class 12 Maths one concept at a time: a short lesson, then questions until you have it, with the mistake behind every wrong answer explained.",
  alternates: { canonical: "/learn" },
};

export default async function LearnHub() {
  const courses = await listCourses();
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
        <ul className="grid gap-4 sm:grid-cols-2">
          {courses.map((c) => (
            <li key={c.slug}>
              <Link
                href={courseHref(c.slug)}
                className="group flex h-full items-start gap-3 rounded-2xl border bg-card p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="icon-tile grid h-10 w-10 shrink-0 place-items-center rounded-xl">
                  <GraduationCap className="h-5 w-5 text-brand-accent" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-foreground">{courseName(c)}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{c.title}, Class {c.standard}</span>
                </span>
                <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground group-hover:text-foreground" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
