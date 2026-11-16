/**
 * /exams/<exam>/syllabus: the exam's pattern, syllabus and marks, one page per
 * exam at a year-less address so it keeps its search ranking across years and
 * is updated rather than re-written (owner, 2026-11-16).
 *
 * Exists only once the exam's evergreen article (migration 0263) is
 * published; until then it 404s. Cacheable by construction: the anon client
 * only, no cookies, no searchParams. Publish (/api/admin/blog) clears this
 * path, so a new or edited page shows at once.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideShell from "@/app/guide/_components/GuideShell";
import { EvergreenArticleJsonLd, FaqJsonLdAt } from "@/app/blog/_components/BlogJsonLd";
import SyllabusView from "../../_components/SyllabusView";
import { syllabusHref } from "@/lib/blog/paths";
import { getEvergreenArticle, getPublishedArticles } from "@/lib/blog/articles";
import { getExamBySlug } from "@/lib/exam/examContext";
import { examHomeHref } from "@/lib/exam/examHome";
import { canonicalFor } from "@/lib/sites/intl";

export const revalidate = 86400;

type Params = { examSlug: string };

export async function generateStaticParams(): Promise<Params[]> {
  try {
    return (await getPublishedArticles())
      .filter((a) => a.kind === "evergreen" && a.examSlug && getExamBySlug(a.examSlug))
      .map((a) => ({ examSlug: a.examSlug }));
  } catch (e) {
    console.error("syllabus generateStaticParams: articles read failed", e instanceof Error ? e.message : e);
    return [];
  }
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const { examSlug } = await props.params;
  const exam = getExamBySlug(examSlug);
  const article = exam ? await getEvergreenArticle(exam.slug) : null;
  if (!exam || !article) return {};
  const path = syllabusHref(exam.slug);
  return {
    title: { absolute: article.title },
    description: article.description,
    alternates: { canonical: canonicalFor(path) },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: path,
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified ?? article.datePublished,
    },
  };
}

export default async function ExamSyllabusPage(props: { params: Promise<Params> }) {
  const { examSlug } = await props.params;
  const exam = getExamBySlug(examSlug);
  const article = exam ? await getEvergreenArticle(exam.slug) : null;
  if (!exam || !article) notFound();
  const path = syllabusHref(exam.slug);

  return (
    <GuideShell
      guideTitle={exam.displayName}
      sideNav={[
        { href: examHomeHref(exam.slug), label: `${exam.displayName} home` },
        { href: path, label: "Pattern and syllabus" },
      ]}
      breadcrumbs={[
        // There is no /exams index; the exam home's own trail starts at /questions.
        { href: "/questions", label: "Questions" },
        { href: examHomeHref(exam.slug), label: exam.displayName },
        { label: "Pattern and syllabus" },
      ]}
    >
      <EvergreenArticleJsonLd post={article} path={path} />
      <FaqJsonLdAt post={article} path={path} />
      <SyllabusView exam={exam} article={article} />
    </GuideShell>
  );
}
