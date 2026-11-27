/**
 * /school-exams: pick the class a child is in now and see every exam they can
 * sit (owner, 2026-11-27, for the parents who ask the institute). Each class
 * is its own page (./[classSlug]); this one is the picker plus a one-line count
 * per class. Static: it reads nothing about the visitor.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Info } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { NTSE_NOTE } from "@/lib/schoolExams/catalog";
import { SCHOOL_CLASSES, classHref, examsForClass, shortNames } from "@/lib/schoolExams/select";
import ClassPicker from "./_components/ClassPicker";

export const revalidate = 86400;

const PAGE_TITLE = "Exams for school students, Class 1 to Class 10";
const PAGE_DESCRIPTION =
  "Pick your child's class and see every admission test, government scholarship and olympiad " +
  "they can sit: Sainik School, Navodaya, RIMC, NMMS, Maharashtra Scholarship, Homi Bhabha, IOQM and more.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/school-exams" },
  openGraph: { title: PAGE_TITLE, description: PAGE_DESCRIPTION, type: "website" },
};

const LINK = "rounded-sm underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default function SchoolExamsPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{PAGE_TITLE}</h1>
        <p className="mt-3 max-w-2xl font-serif text-base leading-relaxed text-muted-foreground">
          Pick the class your child is in now. You will see every admission test, government
          scholarship and science or maths competition they can sit this year, across India and in
          Maharashtra, with who can apply, when, and the official site.
        </p>

        <div className="mt-6">
          <ClassPicker />
        </div>

        <section className="mt-10" aria-labelledby="by-class">
          <h2 id="by-class" className="text-lg font-semibold tracking-tight sm:text-xl">
            What each class can sit
          </h2>
          <ul className="mt-4 divide-y rounded-xl border bg-card">
            {SCHOOL_CLASSES.map((n) => {
              const exams = examsForClass(n);
              return (
                <li key={n}>
                  <Link
                    href={classHref(n)}
                    className="flex items-center gap-3 p-4 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                  >
                    <span className="w-16 shrink-0 font-medium">Class {n}</span>
                    <span className="min-w-0 flex-1 text-sm text-muted-foreground">
                      {exams.length === 0
                        ? "No exams yet at this age"
                        : `${exams.length} exam${exams.length === 1 ? "" : "s"}: ${shortNames(exams).join(", ")}`}
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <aside className="mt-10 rounded-xl border bg-muted/40 p-4 text-sm leading-relaxed text-muted-foreground">
          <p className="flex gap-2">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>
              {NTSE_NOTE.text}{" "}
              <a href={NTSE_NOTE.sourceUrl} target="_blank" rel="noopener noreferrer" className={`text-brand-accent ${LINK}`}>
                NCERT
              </a>
            </span>
          </p>
        </aside>
      </main>
      <Footer />
    </>
  );
}
