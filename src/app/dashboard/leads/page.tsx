import { redirect } from "next/navigation";
import { getSessionMember } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import { listLeads } from "@/lib/quiz/leadsAdmin";
import { rollupLeadsByMobile } from "@/lib/quiz/leads";
import LeadsBrowser from "./LeadsBrowser";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const member = await getSessionMember();
  if (!member) redirect("/login");
  if (member.role !== "ADMIN") redirect("/browse");

  const leads = await listLeads();
  const people = rollupLeadsByMobile(leads);
  const totalAttempts = leads.reduce((s, l) => s + l.attempts, 0);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Quiz Leads</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            People who took a public quiz, rolled up by mobile. Tap a name to WhatsApp them.
            These never touch student analytics.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatCard kind="numeric" value={people.length} label="Leads (people)" />
          <StatCard kind="numeric" value={leads.length} label="Quiz touches" />
          <StatCard kind="numeric" value={totalAttempts} label="Total attempts" />
        </div>

        <LeadsBrowser people={people} leads={leads} />
      </main>
    </>
  );
}
