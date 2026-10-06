import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getSessionSuperadmin } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import { listOrgsWithStats } from "@/lib/superadmin/admin";
import OrgsListClient from "./OrgsListClient";

export const dynamic = "force-dynamic";

export default async function OrgsPage() {
  // Platform staff only: this lists every tenant.
  if (!(await getSessionSuperadmin())) redirect("/browse");
  const orgs = await listOrgsWithStats();

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <header>
          <Link
            href="/superadmin"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
            Superadmin
          </Link>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Organisations</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Every school on the platform. Open one to rename it, manage its admins and
            teachers, or delete it.
          </p>
        </header>
        <OrgsListClient orgs={orgs} />
      </main>
    </>
  );
}
