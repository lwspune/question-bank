import Link from "next/link";
import { redirect } from "next/navigation";
import { Building2, ChevronRight } from "lucide-react";
import { getSessionSuperadmin } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import { countOrgs } from "@/lib/superadmin/admin";
import { listTeacherAccessRequests } from "@/lib/teacherAccess/service";
import { listContactMessages } from "@/lib/contact/service";
import SuperadminConsole from "./SuperadminConsole";

export const dynamic = "force-dynamic";

export default async function SuperadminPage() {
  // Platform staff only — the cross-org console.
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const [orgCount, teacherRequests, contactMessages] = await Promise.all([
    countOrgs(),
    listTeacherAccessRequests(),
    listContactMessages(),
  ]);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Superadmin</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            The cross-org console: the two inbound queues, and every organization
            on its own page. Content is added and edited by you (via the ingestion
            scripts).
          </p>
        </header>

        <Link
          href="/superadmin/orgs"
          className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Building2 className="h-5 w-5 text-brand-accent" aria-hidden />
          <span className="min-w-0 flex-1">
            <span className="block font-medium">Organisations</span>
            <span className="block text-sm text-muted-foreground">
              {orgCount} on the platform. Onboard a school, rename, manage members, delete.
            </span>
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />
        </Link>

        {/* Both queues are fetched above in parallel and handed over as plain
            data; the console is a client shell only so the tab badges can track
            each queue's live untriaged count. */}
        <SuperadminConsole
          teacherRequests={teacherRequests}
          contactMessages={contactMessages}
        />
      </main>
    </>
  );
}
