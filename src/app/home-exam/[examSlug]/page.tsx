import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeLanding, { HOME_METADATA } from "@/components/home/HomeLanding";
import { isExamSlug } from "@/lib/exam/examContext";

/**
 * The homepage with one exam put first (2026-11-06). Middleware serves this at
 * `/` (a rewrite, so the address bar still says `/`) to a signed-out visitor
 * whose qb_exam cookie names an exam. One cached copy per exam, built on first
 * visit, so the homepage stays cached and the chosen exam still comes first.
 *
 * Reachable by its own URL too, so it is kept out of search and points search
 * engines at `/`.
 */
export const revalidate = 86400;

export function generateStaticParams(): { examSlug: string }[] {
  return [];
}

export const metadata: Metadata = {
  ...HOME_METADATA,
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

export default async function HomeForExam(props: { params: Promise<{ examSlug: string }> }) {
  const { examSlug } = await props.params;
  if (!isExamSlug(examSlug)) notFound();
  return <HomeLanding chosen={examSlug} />;
}
