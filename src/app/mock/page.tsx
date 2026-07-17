import type { Metadata } from "next";
import Link from "next/link";
import { History } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPublishedMocks } from "@/lib/mocks/query";
import { mockSideNav } from "@/lib/mocks/mocksNav";
import MockCatalogueList from "./_components/MockCatalogueList";

// Public catalogue — anon + stable, cacheable. New mocks appear on revalidation.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "NDA & NEET Mock Tests — real PYQ papers, timed & auto-graded",
  description:
    "Take real past NDA and NEET (UG) papers as full-length, timed mock tests — the exact questions from each sitting, official marking, instant scoring. Free, from PYQ Vault.",
  alternates: { canonical: "/mock" },
};

export default async function MockCatalogue() {
  const mocks = await getPublishedMocks(createSupabaseAnonClient());

  return (
    <GuideShell
      guideTitle="Mock Tests"
      sideNav={mockSideNav()}
      breadcrumbs={[{ href: "/mock", label: "Mocks" }, { label: "All exams" }]}
    >
      <GuideHero
        eyebrow="Timed PYQ mock tests"
        title="Mock Tests"
        subtitle="Real past papers, served whole as full-length timed tests — the exact questions from each sitting, official marking, instant scoring. Sit one like the real exam."
      >
        <Link
          href="/mock/attempts"
          className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <History className="h-4 w-4" aria-hidden />
          My attempts
        </Link>
      </GuideHero>

      <MockCatalogueList mocks={mocks} />
    </GuideShell>
  );
}
