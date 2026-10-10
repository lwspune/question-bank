import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import GuideHero from "@/app/guide/_components/GuideHero";
import { getPublishedResults } from "@/lib/results/query";
import { STAGE_LABEL, groupResults, initialsOf } from "@/lib/results/summary";

export const revalidate = 86400;

const TITLE = "Results: PYQ Vault students who cleared their exams";
const DESCRIPTION = "PYQ Vault students who cleared the NDA and other exams, shown with their permission.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/results" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
};

/**
 * The results wall (migration 0149). Names in alphabetical order inside each
 * result: it celebrates everyone who cleared and ranks no one.
 */
export default async function ResultsPage() {
  const groups = groupResults(await getPublishedResults().catch(() => []));

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
        <GuideHero
          eyebrow="Results"
          title="Our students' results"
        />

        {groups.length === 0 ? (
          <p className="rounded-xl border bg-card p-6 text-muted-foreground">
            Results will appear here after each exam&apos;s announcement.
          </p>
        ) : (
          <div className="space-y-10">
            {groups.map((g) => (
              <section key={`${g.examSlug}-${g.sitting}-${g.stage}`} aria-labelledby={`r-${g.examSlug}-${g.stage}-${g.sitting}`}>
                <h2
                  id={`r-${g.examSlug}-${g.stage}-${g.sitting}`}
                  className="section-title text-xl font-semibold tracking-tight sm:text-2xl"
                >
                  {g.sitting}: {STAGE_LABEL[g.stage].toLowerCase()}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {g.names.length} {g.names.length === 1 ? "student" : "students"}, listed alphabetically.
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {g.names.map((name) => (
                    <li key={name} className="flex items-center gap-3 rounded-xl border bg-card p-4">
                      <span
                        aria-hidden
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand-accent"
                      >
                        {initialsOf(name)}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-semibold text-foreground">{name}</span>
                        <span className="block text-xs text-muted-foreground">Practised on PYQ Vault</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
