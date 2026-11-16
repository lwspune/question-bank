/**
 * /score-calculator: every answer-key score calculator. Static; lists the live
 * ones and says which are coming, so a link to the list never dead-ends.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { Calculator } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { SCORE_CALCULATORS } from "@/lib/scoreCalc/score";

export const revalidate = 86400;

const TITLE = "Answer Key Score Calculators";
const DESCRIPTION =
  "Free score calculators for JEE Main and SSC exams: bring your response sheet and get your marks on the official answer key, part by part, with negative marking.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/score-calculator" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
};

export default function ScoreCalculatorsPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight">Score calculators</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Bring your response sheet and see your marks on the official answer key, part by part, with negative marking.
        </p>
        <ul className="mt-6 flex flex-col gap-3">
          {SCORE_CALCULATORS.map((c) => (
            <li key={c.slug}>
              {c.live ? (
                <Link
                  href={`/score-calculator/${c.slug}`}
                  className="flex items-center gap-3 rounded-xl border bg-card p-4 hover:border-brand-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
                >
                  <Calculator className="h-5 w-5 text-brand-accent" aria-hidden />
                  <span className="font-semibold">{c.title}</span>
                </Link>
              ) : (
                <div className="flex items-center gap-3 rounded-xl border border-dashed p-4 text-muted-foreground">
                  <Calculator className="h-5 w-5" aria-hidden />
                  <span>{c.title}: coming before the next answer key</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
