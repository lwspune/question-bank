import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import { getSessionSuperadmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { loadProspects } from "@/lib/institutes/query";
import BackToDashboard from "@/app/dashboard/BackToDashboard";
import InstitutesList from "./InstitutesList";

export const dynamic = "force-dynamic";

export const metadata = { title: "Institutes", robots: { index: false } };

/**
 * /dashboard/institutes: coaching classes near FC Road from Google Maps
 * (migration 0246), the owner's list for selling PYQ Vault to institutes.
 * Phone numbers and sales notes, so superadmin only, read with the service
 * role. Filtering happens in the browser: a few hundred rows.
 */
export default async function InstitutesPage() {
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const prospects = await loadProspects(createSupabaseAdminClient());

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        <BackToDashboard />
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Institutes near FC Road</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Coaching classes within 3 km of FC Road, from Google Maps. Small classes come first: they rarely have a
            question bank of their own. JEE / NEET / CET and Board tuition are a guess from the name and the search
            that found each one; mark a wrong one Not a fit. Size is the Google review count: under 50 small, 50 to 300
            medium, over 300 large.
          </p>
        </header>
        {prospects.length === 0 ? (
          <p className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
            No institutes yet. Load a Google Maps scrape with the <code>institutes:import</code> script
            (scripts/institutes/import.ts).
          </p>
        ) : (
          <InstitutesList initial={prospects} />
        )}
      </main>
    </>
  );
}
