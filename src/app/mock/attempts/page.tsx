import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getUserAttempts } from "@/lib/mocks/query";
import { defaultTrendSubject, subjectKey, subjectOptions, trendFor } from "@/lib/mocks/attemptHistory";
import AttemptsList from "../_components/AttemptsList";
import AttemptsTrend from "./AttemptsTrend";

export const metadata: Metadata = { title: "My mock attempts", robots: { index: false } };

export default async function MyAttemptsPage({ searchParams }: { searchParams: { subject?: string } }) {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/mock/attempts");

  const db = createSupabaseServerClient();
  const attempts = await getUserAttempts(db, user.id);

  // Subject = exam + paper (lib/mocks/attemptHistory). The filter lives in the
  // URL so back and refresh keep it; an unknown key falls back to All.
  const options = subjectOptions(attempts);
  const selected = options.find((o) => o.key === searchParams.subject) ?? null;
  const shown = selected ? attempts.filter((a) => subjectKey(a) === selected.key) : attempts;
  const trendKey = selected?.key ?? defaultTrendSubject(attempts);
  const trend = trendKey ? trendFor(attempts, trendKey) : null;
  const trendLabel = options.find((o) => o.key === trendKey)?.label ?? "";

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <Link
          href="/mock"
          className="inline-flex items-center gap-1 rounded-sm text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
          All mock tests
        </Link>
        <h1 className="mt-4 text-2xl font-bold tracking-tight">My attempts</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {attempts.length === 0
            ? "Every mock you take shows up here."
            : `${attempts.length} ${attempts.length === 1 ? "mock" : "mocks"} taken. Tap one to review your answers.`}
        </p>

        {attempts.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed p-8 text-center">
            <p className="text-sm text-muted-foreground">You haven&apos;t taken a mock yet.</p>
            <Button asChild variant="brand" className="mt-3">
              <Link href="/mock">Browse mock tests</Link>
            </Button>
          </div>
        ) : (
          <>
            {options.length > 1 && (
              <nav aria-label="Filter by subject" className="mt-5 flex flex-wrap gap-2">
                <FilterChip href="/mock/attempts" active={!selected} label="All" count={attempts.length} />
                {options.map((o) => (
                  <FilterChip
                    key={o.key}
                    href={`/mock/attempts?subject=${encodeURIComponent(o.key)}`}
                    active={selected?.key === o.key}
                    label={o.label}
                    count={o.count}
                  />
                ))}
              </nav>
            )}

            {trend && <AttemptsTrend label={trendLabel} trend={trend} />}

            <div className="mt-5">
              <AttemptsList attempts={shown} />
            </div>
          </>
        )}
      </main>
    </>
  );
}

/**
 * prefetch={false}: these are links to this same DYNAMIC page, and a
 * prefetched query-param link is a full server render each (the 2026-09-15
 * /performance outage, CLAUDE.md pitfalls).
 */
function FilterChip({ href, active, label, count }: { href: string; active: boolean; label: string; count: number }) {
  return (
    <Link
      href={href}
      prefetch={false}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        active ? "border-foreground bg-foreground text-background" : "bg-card hover:bg-accent"
      )}
    >
      {label}
      <span className={cn("ml-1.5 tabular-nums", active ? "opacity-75" : "text-muted-foreground")}>{count}</span>
    </Link>
  );
}
