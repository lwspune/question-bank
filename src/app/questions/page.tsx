/**
 * Index of every per-chapter question landing page, grouped exam → subject.
 *
 * This is the crawl hub. Without a single page that links to all of them, the
 * landing pages are orphans that depend entirely on the sitemap for discovery —
 * and internal links are what actually distribute ranking signal between them.
 * It's also the fastest human path from "which exam am I studying" to a chapter.
 */
import Link from "next/link";
import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import {
  listChapterLandings,
  landingHref,
  type ChapterLanding,
} from "@/lib/questions/landing";

const SITE_URL = "https://www.pyqvault.com";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Question bank by chapter",
  description:
    "Every chapter in the PYQ Vault question bank — NDA, NEET, JEE Mains, MHT-CET, CDS and board exams — with past-year questions, answers and worked solutions. Free to browse.",
  alternates: { canonical: `${SITE_URL}/questions` },
};

/** exam → subject → chapters, preserving the registry's exam ordering. */
function groupLandings(landings: ChapterLanding[]) {
  const byExam = new Map<
    string,
    { examName: string; subjects: Map<string, ChapterLanding[]> }
  >();
  for (const l of landings) {
    let exam = byExam.get(l.examSlug);
    if (!exam) {
      exam = { examName: l.examName, subjects: new Map() };
      byExam.set(l.examSlug, exam);
    }
    const list = exam.subjects.get(l.subjectName) ?? [];
    list.push(l);
    exam.subjects.set(l.subjectName, list);
  }
  return byExam;
}

export default async function QuestionsIndexPage() {
  const landings = await listChapterLandings();
  const grouped = groupLandings(landings);
  const totalQuestions = landings.reduce((n, l) => n + l.questionCount, 0);

  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl p-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Question bank by chapter
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {totalQuestions.toLocaleString("en-IN")} questions across{" "}
          {landings.length} chapters, with answers and worked solutions. Pick a
          chapter to start, or{" "}
          <Link href="/browse" className="text-brand-accent hover:underline">
            filter the whole bank
          </Link>
          .
        </p>

        {landings.length === 0 && (
          <p className="mt-8 rounded-md border p-6 text-muted-foreground">
            No chapters published yet.
          </p>
        )}

        {Array.from(grouped.entries()).map(([examSlug, exam]) => (
          <section key={examSlug} className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight">
              {exam.examName}
            </h2>
            {Array.from(exam.subjects.entries()).map(([subjectName, rows]) => (
              <div key={subjectName} className="mt-5">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {subjectName}
                </h3>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {rows.map((l) => (
                    <li key={l.chapterId}>
                      <Link
                        href={landingHref(l)}
                        className="flex items-center justify-between gap-2 rounded-md border p-3 text-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span className="min-w-0 truncate">{l.chapterName}</span>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {l.questionCount}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
