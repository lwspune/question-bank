import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, ChevronRight } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { listPublishedPlans } from "@/lib/homework/query";

// Plans change only when the plan builder runs; a day is plenty.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Daily Homework from Board Papers",
  description:
    "Five past board questions a day, as a Word or PDF file to hand out. The questions the board asked again come first, highest count first.",
  alternates: { canonical: "/homework" },
};

/**
 * Every published homework plan (2026-10-09). A cached page: nothing on it
 * depends on who is looking; the download boxes on each plan ask the browser.
 */
export default async function HomeworkIndex() {
  const plans = await listPublishedPlans(createSupabaseAnonClient());

  return (
    <GuideShell
      guideTitle="Daily Homework"
      sideNav={[
        { href: "/homework", label: "All plans" },
        ...plans.map((p) => ({ href: `/homework/${p.slug}`, label: p.title })),
      ]}
      breadcrumbs={[{ label: "Daily Homework" }]}
    >
      <GuideHero
        eyebrow="Daily homework"
        title="Daily homework from board papers"
        subtitle="Five past board questions a day, as a file to hand out. The questions the board asked again come first, highest count first."
      />

      {plans.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          Homework plans are coming soon. Check back shortly.
        </p>
      ) : (
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {plans.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/homework/${p.slug}`}
                className="group flex h-full items-center justify-between gap-3 rounded-lg border bg-card p-4 transition-colors hover:border-brand-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="min-w-0">
                  <p className="font-semibold leading-snug group-hover:text-brand-accent">{p.title}</p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                    {p.days} days · {p.questions} questions · {p.perDay} a day
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </GuideShell>
  );
}
