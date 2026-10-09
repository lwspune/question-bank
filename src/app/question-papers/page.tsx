import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, FileText } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { getPublishedPapers } from "@/lib/questionPapers/query";

/**
 * /question-papers (2026-10-09): every board whose past papers we hold whole.
 * Cached for a day like /board; nothing here is per-viewer.
 */
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Board past question papers with answers",
  description:
    "Whole CBSE and Maharashtra board past papers, question by question as printed, with marks and model answers.",
  alternates: { canonical: "/question-papers" },
};

export default async function QuestionPapersIndex() {
  const papers = await getPublishedPapers();
  const exams = EXAM_REGISTRY.map((exam) => {
    const mine = papers.filter((p) => p.examName === exam.examName);
    const years = mine.map((p) => p.year);
    return {
      exam,
      papers: mine.length,
      subjects: new Set(mine.map((p) => p.subjectName)).size,
      from: Math.min(...years),
      to: Math.max(...years),
    };
  }).filter((e) => e.papers > 0);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Breadcrumbs className="mb-4" items={[{ label: "Question papers" }]} />
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Board past question papers</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Whole papers as the board printed them: every section, every choice and the marks for each question,
            with a model answer one tap away.
          </p>
        </header>

        {exams.length === 0 ? (
          <p className="rounded-lg border border-dashed bg-muted/20 px-4 py-8 text-center text-sm text-muted-foreground">
            Papers are being prepared. Check back soon.
          </p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {exams.map(({ exam, papers: n, subjects, from, to }) => (
              <li key={exam.slug}>
                <Link
                  href={`/question-papers/${exam.slug}`}
                  className="group flex h-full items-start gap-3 rounded-lg border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg icon-tile">
                    <FileText className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold tracking-tight">{exam.displayName}</span>
                    <span className="block text-xs text-muted-foreground">
                      {n} papers · {subjects} {subjects === 1 ? "subject" : "subjects"} · {from === to ? from : `${from}-${to}`}
                    </span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
}
