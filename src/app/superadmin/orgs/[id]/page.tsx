import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getSessionSuperadmin } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import { getOrgDetail } from "@/lib/superadmin/admin";
import OrgDetailClient from "./OrgDetailClient";

export const dynamic = "force-dynamic";

export default async function OrgPage({ params }: { params: { id: string } }) {
  const viewer = await getSessionSuperadmin();
  if (!viewer) redirect("/browse");

  // A malformed id would make Postgres throw on the uuid cast; treat it as missing.
  if (!/^[0-9a-f-]{36}$/i.test(params.id)) notFound();
  const org = await getOrgDetail(params.id);
  if (!org) notFound();

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <Link
          href="/superadmin/orgs"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
          Organisations
        </Link>
        <OrgDetailClient org={org} viewerId={viewer.id} />
      </main>
    </>
  );
}
