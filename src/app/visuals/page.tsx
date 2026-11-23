import type { Metadata } from "next";
import Link from "next/link";
import { Images } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { getExamBySlug } from "@/lib/exam/examContext";
import { GALLERY_SUBJECTS } from "@/lib/gallery/galleryIndex.generated";

/**
 * /visuals (owner, 2026-11-23): every notes visual, by exam and subject. The
 * header's Visuals link goes straight to the student's exam
 * (/visuals/<subject>); this list is for a visitor with no exam chosen.
 * Cached; kept out of search while the pages repeat the notes' visuals.
 */
export const metadata: Metadata = {
  title: "Visuals",
  description: "Every picture and interactive diagram from the PYQ Vault notes, by exam, subject and chapter.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/visuals" },
};

export const revalidate = 86400;

export default function VisualsIndexPage() {
  const exams = new Map<string, typeof GALLERY_SUBJECTS[number][]>();
  for (const s of GALLERY_SUBJECTS) exams.set(s.examSlug, [...(exams.get(s.examSlug) ?? []), s]);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <header className="hero-soft rounded-2xl px-5 py-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Visuals</h1>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Every picture and diagram from the notes, by subject and chapter. Open one to see the idea, try it, then
            practise 3 questions on it.
          </p>
        </header>
        <div className="mt-8 space-y-6">
          {[...exams].map(([examSlug, subjects]) => (
            <section key={examSlug} aria-labelledby={`visuals-${examSlug}`}>
              <h2 id={`visuals-${examSlug}`} className="section-title text-lg font-semibold">
                {getExamBySlug(examSlug)?.displayName ?? subjects[0].examName}
              </h2>
              <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {subjects.map((s) => (
                  <li key={s.subjectRoute}>
                    <Link
                      href={`/visuals/${s.subjectRoute}`}
                      className="flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="icon-tile inline-flex h-9 w-9 items-center justify-center rounded-lg">
                        <Images className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-semibold">{s.subjectDisplay}</span>
                        <span className="text-sm text-muted-foreground">
                          {s.count} {s.count === 1 ? "visual" : "visuals"}
                        </span>
                      </span>
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
