import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { BOARD_EXAMS, getExamBySlug } from "@/lib/exam/examContext";
import { slugify } from "@/lib/board/query";
import { getPublishedPapers } from "@/lib/questionPapers/query";

type Params = { examSlug: string };

export const revalidate = 86400;

export function generateStaticParams(): Params[] {
  return BOARD_EXAMS.map((e) => ({ examSlug: e.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const exam = getExamBySlug(params.examSlug);
  if (!exam?.boardExam) return { title: "Question papers" };
  return {
    title: `${exam.displayName} past question papers with answers`,
    description: `Whole ${exam.displayName} board papers by subject and year, with marks and model answers.`,
    alternates: { canonical: `/question-papers/${params.examSlug}` },
  };
}

export default async function ExamPapers({ params }: { params: Params }) {
  const exam = getExamBySlug(params.examSlug);
  if (!exam?.boardExam) notFound();
  // No published papers yet is NOT a 404: this page is built ahead and cached
  // for a day, and a cached 404 would outlive the papers being published.
  const papers = (await getPublishedPapers()).filter((p) => p.examName === exam.examName);

  const subjects = [...new Set(papers.map((p) => p.subjectName))].sort().map((name) => {
    const mine = papers.filter((p) => p.subjectName === name);
    const years = mine.map((p) => p.year);
    return { name, slug: slugify(name), papers: mine.length, from: Math.min(...years), to: Math.max(...years) };
  });

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Breadcrumbs
          className="mb-4"
          items={[{ href: "/question-papers", label: "Question papers" }, { label: exam.displayName }]}
        />
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{exam.displayName} past papers</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Pick a subject to see its papers, newest first.</p>
        </header>
        {subjects.length === 0 && (
          <p className="rounded-lg border border-dashed bg-muted/20 px-4 py-8 text-center text-sm text-muted-foreground">
            Papers are being prepared. Check back soon.
          </p>
        )}
        <ul className="grid gap-3 sm:grid-cols-2">
          {subjects.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/question-papers/${params.examSlug}/${s.slug}`}
                className="group flex h-full items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold tracking-tight">{s.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {s.papers} papers · {s.from === s.to ? s.from : `${s.from}-${s.to}`}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
