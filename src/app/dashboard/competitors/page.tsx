import Link from "next/link";
import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import { getSessionSuperadmin } from "@/lib/auth";
import { AUDIENCES } from "@/lib/competitors";
import AudienceView, { linkClass } from "./AudienceView";

/**
 * /dashboard/competitors: the competitor analysis, one audience at a time.
 *
 * READ-ONLY, like /dashboard/growth: everything here is data in
 * lib/competitors and changes by commit. The shortlist order is computed by
 * rankIdeas, never typed. Superadmin-only and dynamic, so `next build` never
 * renders it; the data rules are proven by tests/competitors-registry.test.ts,
 * the layout only in a browser.
 */
export const dynamic = "force-dynamic";

export const metadata = { title: "Competitors", robots: { index: false } };

export default async function CompetitorsPage({ searchParams }: { searchParams: { audience?: string } }) {
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const current = AUDIENCES.find((a) => a.id === searchParams.audience) ?? AUDIENCES[0];

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Competitors</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Who else our students use, what they offer, where we stand, and which gaps are worth closing. Read-only:
            the data lives in lib/competitors and changes by commit. Live prices of our own pass are on{" "}
            <Link href="/dashboard/pricing" prefetch={false} className={linkClass}>
              Pricing
            </Link>
            .
          </p>
        </header>

        {AUDIENCES.length > 1 && (
          <nav aria-label="Audience" className="flex flex-wrap gap-2">
            {AUDIENCES.map((a) => (
              <Link
                key={a.id}
                href={`/dashboard/competitors?audience=${a.id}`}
                prefetch={false}
                aria-current={a.id === current.id ? "page" : undefined}
                className={`rounded-full border px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  a.id === current.id ? "border-brand bg-brand text-brand-foreground" : "hover:bg-muted"
                }`}
              >
                {a.name}
              </Link>
            ))}
          </nav>
        )}

        <AudienceView a={current} />
      </main>
    </>
  );
}
