import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ANON_IDENTITY } from "@/lib/auth-identity";
import { getExamBySlug, isExamSlug } from "@/lib/exam/examContext";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { LANDING_COUNTRY, LANDING_HOST } from "@/lib/questions/browseLandingRoute";
import renderBrowse from "@/app/browse/renderBrowse";

/**
 * The bare /browse landing, cached (2026-11-07). Middleware serves this at
 * /browse (a rewrite: the address bar keeps /browse) to signed-out visitors in
 * India; see lib/questions/browseLandingRoute for exactly who. It is the live
 * page's own render (browse/renderBrowse) given a fixed request: no filters,
 * signed out, www, India, and the chosen exam (`all` = none chosen).
 *
 * Crawlers get `all`, so that copy carries /browse's own metadata. The
 * per-exam copies are reachable by URL too, so they are kept out of search.
 */
export const revalidate = 3600;

export function generateStaticParams(): { exam: string }[] {
  return [];
}

const BROWSE_METADATA: Metadata = {
  title: "Browse questions",
  description:
    "Filter previous year questions by exam, chapter, difficulty, and year, and preview them free. Download the Question Paper + Answer Key as PDF files with the Premium Pass.",
  alternates: { canonical: "/browse" },
};

/** `all`, or an exam that is not practice-only (those stay on the live page). */
function chosenExam(exam: string): string | null | undefined {
  if (exam === "all") return null;
  if (isExamSlug(exam) && !getExamBySlug(exam)?.practiceOnly) return exam;
  return undefined;
}

export async function generateMetadata(props: { params: Promise<{ exam: string }> }): Promise<Metadata> {
  const { exam } = await props.params;
  return exam === "all" ? BROWSE_METADATA : { ...BROWSE_METADATA, robots: { index: false, follow: true } };
}

export default async function BrowseStart(props: { params: Promise<{ exam: string }> }) {
  const { exam } = await props.params;
  const chosen = chosenExam(exam);
  if (chosen === undefined) notFound();

  return renderBrowse({
    searchParams: {},
    identity: ANON_IDENTITY,
    host: LANDING_HOST,
    country: LANDING_COUNTRY,
    qbExam: chosen ?? undefined,
    supabase: createSupabaseAnonClient(),
    hasDownloadPass: false,
    paperFree: null,
  });
}
