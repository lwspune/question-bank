/**
 * /exams/<slug> — one home page per exam, built from data.
 *
 * Only NDA had a home (/nda, hand-authored with curated previews; it stays,
 * and /exams/nda redirects to it). Every other exam had a guide hub, a notes
 * hub, a mock catalogue and chapter landings, but no page that says "this is
 * JEE Mains on PYQ Vault, here is what we hold" — the page a student or an AI
 * search engine cites for "where can I practise JEE Main PYQs". This route
 * renders that page for every registry exam with public content, from the
 * registry entry, the chapter-landing index and the catalogue count.
 *
 * Cacheable by construction: anon client only, no cookies, no searchParams.
 * The view-model is pure (src/lib/exam/examHome.ts, tests/exam-home.test.ts).
 */
import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPapers } from "@/lib/questionPapers/query";
import { notFound, redirect } from "next/navigation";
import { ArrowRight, BookOpen, ClipboardCheck, Compass, FileText, Library, NotebookPen } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { EXAM_REGISTRY, getExamBySlug } from "@/lib/exam/examContext";
import { getCachedExamCatalog } from "@/lib/exam/allExamStats";
import { defaultViewCount } from "@/lib/exam/questionCounts";
import { getNotesExamGroup } from "@/lib/notes/notesNav";
import { listChapterLandings } from "@/lib/questions/landing";
import {
  buildExamHome,
  examHomeDescription,
  examHomeHref,
  type ExamHomeModel,
} from "@/lib/exam/examHome";
import { fitTitle } from "@/lib/seo/title";
import { withArticle } from "@/lib/text/article";
import Breadcrumbs from "@/components/nav/Breadcrumbs";

const SITE_URL = "https://www.pyqvault.com";

export const revalidate = 86400;

type Params = { params: { examSlug: string } };

/** Every exam with public content, except NDA (its own hand-built home). */
export function generateStaticParams() {
  return EXAM_REGISTRY.filter((e) => !e.noPublicContent && e.slug !== "nda").map(
    (e) => ({ examSlug: e.slug })
  );
}

async function loadModel(slug: string): Promise<ExamHomeModel | null> {
  const entry = getExamBySlug(slug);
  if (!entry || entry.noPublicContent) return null;
  const [catalog, landings] = await Promise.all([
    getCachedExamCatalog(),
    listChapterLandings(),
  ]);
  const item = catalog.exams.find((e) => e.slug === entry.slug);
  const notes = getNotesExamGroup(entry.slug);
  return buildExamHome(entry, landings, {
    examId: item?.examId ?? null,
    // The count the page LABELS (past-year, or practice for a practice-only
    // exam) and the bank button lands on — never the every-kind total, which
    // this page used to call "past-year questions" (UX_REVIEW_TRIAGE.md A1).
    totalPublicQuestions: item ? defaultViewCount(item.counts, item.practiceOnly) : 0,
    hasShippedNotes: (notes?.subjects.length ?? 0) > 0,
  });
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const model = await loadModel(params.examSlug);
  if (!model) return { title: "Exam not found" };
  const title = fitTitle(
    `${model.displayName} ${model.practiceOnly ? "Practice Questions" : "Past Year Questions"} — Papers, Mocks, Notes`
  );
  const description = examHomeDescription(model);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${SITE_URL}${examHomeHref(model.slug)}` },
    openGraph: { title, description, type: "website" },
  };
}

export default async function ExamHomePage({ params }: Params) {
  if (params.examSlug === "nda") redirect("/nda");
  const model = await loadModel(params.examSlug);
  if (!model) notFound();

  const path = examHomeHref(model.slug);
  const description = examHomeDescription(model);
  const kind = model.practiceOnly ? "practice questions" : "past-year questions";

  // Whole board past papers (/question-papers). A failed read only drops the
  // link; the rest of the page does not depend on it.
  const papers = await getPublishedPapers().catch((err) => {
    console.error("exam home: past papers unavailable", err);
    return [];
  });
  const exam = getExamBySlug(model.slug);
  const hasPapers = !!exam && papers.some((p) => p.examName === exam.examName);

  const quickLinks = [
    hasPapers && {
      href: `/question-papers/${model.slug}`,
      label: "Whole past question papers, with marks and answers",
      Icon: FileText,
    },
    model.links.mocks && {
      href: model.links.mocks,
      label: `Sit ${withArticle(model.displayName)} paper as a timed mock`,
      Icon: ClipboardCheck,
    },
    model.links.notes && {
      href: model.links.notes,
      label: `${model.displayName} chapter notes`,
      Icon: NotebookPen,
    },
    model.links.guide && {
      href: model.links.guide,
      label: `${model.displayName} strategy guides`,
      Icon: BookOpen,
    },
    model.links.board && {
      href: model.links.board,
      label: "Textbook solutions, exercise by exercise",
      Icon: Library,
    },
  ].filter((l): l is { href: string; label: string; Icon: typeof BookOpen } => Boolean(l));

  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl p-8">
        <GuideJsonLd
          type="CollectionPage"
          path={path}
          headline={`${model.displayName} on PYQ Vault`}
          description={description}
        />

        <Breadcrumbs items={[{ href: "/questions", label: "Questions" }, { label: model.displayName }]} />

        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          {model.examName}
        </h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">{description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button asChild variant="brand" size="wrap">
            <Link href={model.links.bank}>
              <Compass className="mr-1.5 h-4 w-4 shrink-0" />
              Filter all {model.totalQuestions.toLocaleString("en-IN")} {kind}
              <ArrowRight className="ml-1.5 h-4 w-4 shrink-0" />
            </Link>
          </Button>
          {quickLinks.map(({ href, label, Icon }) => (
            <Button key={href} asChild variant="outline" size="wrap">
              <Link href={href}>
                <Icon className="mr-1.5 h-4 w-4 shrink-0" />
                {label}
              </Link>
            </Button>
          ))}
        </div>

        {model.subjects.length === 0 ? (
          <p className="mt-10 rounded-md border p-6 text-muted-foreground">
            Chapter pages appear once a chapter holds at least 15 public
            questions. Until then, the whole bank is one click away above.
          </p>
        ) : (
          model.subjects.map((subject) => (
            <section key={subject.name} className="mt-10">
              <h2 className="text-xl font-semibold tracking-tight">
                {subject.name}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  {subject.questionCount.toLocaleString("en-IN")} {kind} across{" "}
                  {subject.chapters.length}{" "}
                  {subject.chapters.length === 1 ? "chapter" : "chapters"}
                </span>
              </h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {subject.chapters.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      className="flex items-center justify-between gap-2 rounded-md border p-3 text-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="min-w-0 truncate">{c.name}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {c.questionCount}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </main>
      <Footer />
    </>
  );
}
