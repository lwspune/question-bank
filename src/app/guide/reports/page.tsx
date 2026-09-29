/**
 * /guide/reports — the trends pages listed as dated, citable reports.
 *
 * Each `/guide/<subject>/trends` page is original analysis of the bank, but
 * framed as a guide sub-page it was findable only from its own guide. This
 * index lists all of them with the claim each makes, the sitting its data
 * runs through and when it was last updated — the shape another site, or an
 * AI search engine, needs to cite one. Registry: src/lib/guide/trendsReports.ts.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { buildGuideSideNav } from "@/lib/guide/guidesNav";
import { TRENDS_REPORTS, reportUpdatedIso } from "@/lib/guide/trendsReports";
import { fitTitle } from "@/lib/seo/title";

const SITE_URL = "https://www.pyqvault.com";
const PAGE_TITLE = "Trend reports — how each exam's papers changed";
const PAGE_DESCRIPTION =
  "Year-by-year analyses of NDA and MHT-CET past papers, subject by subject: which chapters grew, which faded, and how hard each sitting was. Every count is a public question in the PYQ Vault bank.";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: { absolute: fitTitle(PAGE_TITLE) },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guide/reports` },
  openGraph: { title: PAGE_TITLE, description: PAGE_DESCRIPTION, type: "website" },
};

function longDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

export default function ReportsIndexPage() {
  const byExam = new Map<string, typeof TRENDS_REPORTS>();
  for (const r of TRENDS_REPORTS) {
    byExam.set(r.exam, [...(byExam.get(r.exam) ?? []), r]);
  }

  return (
    <GuideShell
      guideTitle="Strategy Guides"
      sideNav={buildGuideSideNav()}
      breadcrumbs={[{ href: "/guide", label: "Guides" }, { label: "Trend reports" }]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path="/guide/reports"
        headline={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
      />
      <GuideHero
        eyebrow="Trend reports"
        title="How each exam's papers changed, counted"
        subtitle={PAGE_DESCRIPTION}
      />

      {[...byExam.entries()].map(([exam, reports]) => (
        <section key={exam} className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight">{exam}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {reports.map((r) => {
              const updated = reportUpdatedIso(r.route);
              return (
                <li key={r.route}>
                  <Link
                    href={r.route}
                    className="group flex h-full flex-col rounded-lg border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {r.exam} · {r.subject}
                    </p>
                    <h3 className="mt-1 text-base font-semibold leading-snug">{r.claim}</h3>
                    <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span>Data through {r.dataThrough}</span>
                      {updated && (
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" aria-hidden />
                          Updated {longDate(updated)}
                        </span>
                      )}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent">
                      Read the report
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </GuideShell>
  );
}
