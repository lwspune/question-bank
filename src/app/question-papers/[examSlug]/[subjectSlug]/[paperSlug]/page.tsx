import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { getExamBySlug } from "@/lib/exam/examContext";
import { slugify } from "@/lib/board/query";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPaperGroup, getPublishedPapers } from "@/lib/questionPapers/query";
import { groupLabel } from "@/lib/questionPapers/listing";
import PaperReader from "@/app/question-papers/_components/PaperReader";

type Params = { examSlug: string; subjectSlug: string; paperSlug: string };

/**
 * One board past paper (a CBSE group shows its sets as tabs). Rendered on
 * first visit and cached for a day, never built ahead: there are ~100 of them
 * and a build reads production (the 2026-10-04 and 10-09 outages).
 */
export const revalidate = 86400;

export function generateStaticParams(): Params[] {
  return [];
}

async function load(params: Params) {
  const exam = getExamBySlug(params.examSlug);
  if (!exam?.boardExam) return null;
  // The exam id comes from the published list itself, not the shared exam-id
  // map, whose failed read is cached as a blank (SUGGESTIONS.md backfill ledger).
  const listed = (await getPublishedPapers()).find(
    (p) => p.examName === exam.examName && p.groupSlug === params.paperSlug && slugify(p.subjectName) === params.subjectSlug
  );
  if (!listed) return null;
  const sets = await getPaperGroup(createSupabaseAnonClient(), listed.examId, params.paperSlug);
  if (sets.length === 0) return null;
  const first = sets[0];
  const name = `${exam.displayName} ${first.subjectName} ${first.year} question paper (${groupLabel(first)})`;
  return { exam, sets, first, name };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await load(params);
  if (!data) return { title: "Question paper" };
  const { first, name, sets } = data;
  return {
    title: `${name} with answers`,
    description:
      `${name}${sets.length > 1 ? `, sets ${sets.map((s) => s.setNumber).join(", ")}` : ""}. ` +
      `${first.totalMarks} marks${first.durationMinutes ? `, ${first.durationMinutes / 60} hours` : ""}. ` +
      "Every question as printed, with its marks and a model answer.",
    alternates: { canonical: `/question-papers/${params.examSlug}/${params.subjectSlug}/${params.paperSlug}` },
  };
}

function hours(minutes: number): string {
  const h = minutes / 60;
  return `${h} ${h === 1 ? "hour" : "hours"}`;
}

export default async function PaperPage({ params }: { params: Params }) {
  const data = await load(params);
  if (!data) notFound();
  const { exam, sets, first, name } = data;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Breadcrumbs
          className="mb-4"
          items={[
            { href: "/question-papers", label: "Question papers" },
            { href: `/question-papers/${params.examSlug}`, label: exam.displayName },
            { href: `/question-papers/${params.examSlug}/${params.subjectSlug}`, label: first.subjectName },
            { label: `${first.year} ${groupLabel(first)}` },
          ]}
        />
        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{name}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Maximum marks {first.totalMarks}
            {first.durationMinutes ? ` · Time ${hours(first.durationMinutes)}` : ""}
            {sets.length > 1 ? ` · ${sets.length} sets` : ""}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try each question first, then open its model answer. Where the paper offers a choice, both
            questions are shown with OR between them.
          </p>
        </header>

        <PaperReader
          examName={exam.examName}
          supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!}
          sets={sets.map((s) => ({
            slug: s.slug,
            setNumber: s.setNumber,
            paperCode: s.paperCode,
            title: s.title,
            sections: s.sections,
            items: s.items,
          }))}
        />
      </main>
      <Footer />
    </>
  );
}
