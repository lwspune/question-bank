import Link from "next/link";
import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import { getSessionSuperadmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { loadClassLeads } from "@/lib/classes/leads";
import { sortClassLeads, summariseClassLeads } from "@/lib/classes/interest";
import BackToDashboard from "@/app/dashboard/BackToDashboard";
import ClassLeadsTable from "./ClassLeadsTable";

export const dynamic = "force-dynamic";

/**
 * /dashboard/classes: leads for offline classes in Pune (migration 0265), Pune
 * first, newest first, with a WhatsApp link (never a phone-call link, tests/whatsapp-links.test.ts), a "Called" tick and a CSV.
 * Names and phone numbers, so superadmin only (owner, 2026-11-16).
 */
export default async function ClassLeadsPage() {
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const leads = sortClassLeads(await loadClassLeads(createSupabaseAdminClient()));
  const s = summariseClassLeads(leads);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        <BackToDashboard />
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Class leads</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            People who asked for a call about offline classes on{" "}
            <Link href="/classes" className="underline underline-offset-2 hover:text-foreground">
              /classes
            </Link>
            . Pune first, newest first. The old 1:1 tutoring answers are on{" "}
            <Link href="/dashboard/tutor" className="underline underline-offset-2 hover:text-foreground">
              Tutor interest
            </Link>
            .
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-3" aria-label="Summary">
          {[
            { label: "Leads", value: s.total },
            { label: "In Pune", value: s.pune },
            { label: "Not called yet", value: s.notCalled },
          ].map((t) => (
            <div key={t.label} className="rounded-xl border bg-card p-4">
              <p className="text-xs text-muted-foreground">{t.label}</p>
              <p className="stat-gradient mt-1 text-2xl font-semibold tabular-nums">{t.value}</p>
            </div>
          ))}
        </section>

        {s.byCourse.length > 0 && (
          <section className="rounded-xl border bg-card p-4">
            <h2 className="text-sm font-semibold">By course</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {s.byCourse.map((c) => `${c.label} ${c.leads} (${c.pune} Pune)`).join(" · ")}
            </p>
          </section>
        )}

        <ClassLeadsTable leads={leads} />
      </main>
    </>
  );
}
