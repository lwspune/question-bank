import { redirect } from "next/navigation";
import { getSessionSuperadmin } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import { listOrgsWithStats } from "@/lib/superadmin/admin";
import { listTeacherAccessRequests } from "@/lib/teacherAccess/service";
import { listContactMessages } from "@/lib/contact/service";
import SuperadminConsole from "./SuperadminConsole";

export const dynamic = "force-dynamic";

export default async function SuperadminPage() {
  // Platform staff only — the cross-org console.
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const [orgs, teacherRequests, contactMessages] = await Promise.all([
    listOrgsWithStats(),
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
            The cross-org console: every organization on the platform, plus the two
            inbound queues. Onboard a new school and provision its admin — that
            admin then manages their own branches, teachers, and papers. Content is
            added + edited by you (via the ingestion scripts).
          </p>
        </header>

        {/* All three datasets are fetched above in parallel and handed over as
            plain data; the console is a client shell only so the tab badges can
            track each queue's live untriaged count. */}
        <SuperadminConsole
          orgs={orgs}
          teacherRequests={teacherRequests}
          contactMessages={contactMessages}
        />
      </main>
    </>
  );
}
