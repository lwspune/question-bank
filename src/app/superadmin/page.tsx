import { redirect } from "next/navigation";
import { getSessionSuperadmin } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import { listOrgsWithStats } from "@/lib/superadmin/admin";
import SuperadminClient from "./SuperadminClient";

export const dynamic = "force-dynamic";

export default async function SuperadminPage() {
  // Platform staff only — the cross-org console.
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const orgs = await listOrgsWithStats();

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Superadmin</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Every organization on the platform. Onboard a new school and provision
            its admin — that admin then manages their own branches, teachers, and
            papers. Content is added + edited by you (via the ingestion scripts).
          </p>
        </header>

        <SuperadminClient initialOrgs={orgs} />
      </main>
    </>
  );
}
