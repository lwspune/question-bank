import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { getExamBySlug } from "@/lib/exam/examContext";
import { slugify } from "@/lib/board/query";
import { getPublishedPapers } from "@/lib/questionPapers/query";
import { subjectListing } from "@/lib/questionPapers/listing";

type Params = { examSlug: string; subjectSlug: string };

/** Rendered on first visit, then cached for a day (not built ahead). */
export const revalidate = 86400;

export function generateStaticParams(): Params[] {
  return [];
}

async function load(params: Params) {
  const exam = getExamBySlug(params.examSlug);
  if (!exam?.boardExam) return null;
  const papers = (await getPublishedPapers()).filter(
    (p) => p.examName === exam.examName && slugify(p.subjectName) === params.subjectSlug
  );
  if (papers.length === 0) return null;
  return { exam, subjectName: papers[0].subjectName, years: subjectListing(papers), count: papers.length };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await load(params);
  if (!data) return { title: "Question papers" };
  return {
    title: `${data.exam.displayName} ${data.subjectName} past question papers with answers`,
    description: `${data.count} whole ${data.exam.displayName} ${data.subjectName} board papers, newest first, with marks and model answers.`,
    alternates: { canonical: `/question-papers/${params.examSlug}/${params.subjectSlug}` },
  };
}

export default async function SubjectPapers({ params }: { params: Params }) {
  const data = await load(params);
  if (!data) notFound();
  const { exam, subjectName, years } = data;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Breadcrumbs
          className="mb-4"
          items={[
            { href: "/question-papers", label: "Question papers" },
            { href: `/question-papers/${params.examSlug}`, label: exam.displayName },
            { label: subjectName },
          ]}
        />
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {exam.displayName} {subjectName} past papers
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Each paper as printed, with marks and a model answer for every question.
          </p>
        </header>

        <div className="space-y-8">
          {years.map((y) => (
            <section key={y.year} aria-labelledby={`year-${y.year}`}>
              <h2 id={`year-${y.year}`} className="section-title mb-3 text-lg font-semibold tracking-tight">
                {y.year}
              </h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {y.groups.map((g) => (
                  <li key={g.groupSlug}>
                    <Link
                      href={`/question-papers/${params.examSlug}/${params.subjectSlug}/${g.groupSlug}`}
                      className="group flex items-center gap-3 rounded-lg border bg-card px-4 py-3 transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold tracking-tight">{g.label}</span>
                        {g.sets.length > 1 && (
                          <span className="block text-xs text-muted-foreground">
                            Sets {g.sets.map((s) => s.setNumber).join(", ")}
                          </span>
                        )}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
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
