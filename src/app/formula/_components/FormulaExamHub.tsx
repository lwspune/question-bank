import type { Metadata } from "next";
import Link from "next/link";
import { Sigma } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { fitTitle } from "@/lib/seo/title";
import type { FormulaIndexGroup } from "@/lib/formula/chapterPages";
import FormulaChapterList from "./FormulaChapterList";

const SITE_URL = "https://www.pyqvault.com";

function counts(group: FormulaIndexGroup) {
  const pages = group.subjects.flatMap((s) => s.pages);
  return { chapters: pages.length, formulas: pages.reduce((a, p) => a + p.counts.formulas, 0) };
}

function lead(group: FormulaIndexGroup): string {
  const c = counts(group);
  const subjects = group.subjects.map((s) => s.subjectName);
  const list = subjects.length > 1 ? `${subjects.slice(0, -1).join(", ")} and ${subjects[subjects.length - 1]}` : subjects[0];
  return `${c.formulas} formulas across ${c.chapters} ${group.examDisplay} chapters in ${list}, each chapter on one page with its reference tables and common traps.`;
}

export function formulaExamHubMetadata(group: FormulaIndexGroup): Metadata {
  const title = fitTitle(`${group.examDisplay} formula sheets by chapter`);
  const description = `${lead(group)} Free to read.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${SITE_URL}/formula/${group.examSlug}` },
    openGraph: { title, description, type: "website" },
  };
}

/**
 * /formula/<exam> (2026-10-10): one exam's chapter formula pages, by subject.
 * It exists because Next pre-builds the chapter pages under the exam slugs the
 * parent /formula/[slug] folder returns, so those slugs are real pages; this
 * makes them useful ones, and the chapter pages' breadcrumb links here.
 */
export default function FormulaExamHub({ group }: { group: FormulaIndexGroup }) {
  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl p-8">
        <Breadcrumbs items={[{ href: "/formula", label: "Formulas" }, { label: group.examDisplay }]} />
        <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-brand-accent">
          <Sigma className="h-3.5 w-3.5" aria-hidden />
          Formula sheets
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">{group.examDisplay} formulas by chapter</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">{lead(group)}</p>
        <div className="mt-8">
          <FormulaChapterList group={group} headingLevel="h2" />
        </div>
        <p className="mt-10 text-sm text-muted-foreground">
          <Link href="/formula" className="underline underline-offset-2 hover:no-underline">
            Formula sheets for every exam
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
