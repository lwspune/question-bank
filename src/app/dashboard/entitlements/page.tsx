import { redirect } from "next/navigation";
import { getSessionMember } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import { listEntitlements } from "@/lib/entitlements/admin";
import EntitlementsClient from "./EntitlementsClient";

export const dynamic = "force-dynamic";

export default async function EntitlementsPage() {
  const member = await getSessionMember();
  if (!member) redirect("/login");
  if (member.role !== "ADMIN") redirect("/browse");

  const result = await listEntitlements();
  const rows = result.kind === "ok" ? result.rows : [];
  const loadError = result.kind === "error" ? result.message : null;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Access</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Grant free premium access to students by email. The student must
            sign up first, then you can comp their account here.
          </p>
        </header>

        <EntitlementsClient initialRows={rows} loadError={loadError} />
      </main>
    </>
  );
}
